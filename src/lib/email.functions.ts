import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// In-memory rate limit: max N sends per order in the rolling window.
// Resets on server restart — good enough as a soft abuse guard alongside
// the stripe_session_id ownership proof.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1h
const attemptLog = new Map<string, number[]>();

function checkRateLimit(orderId: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const recent = (attemptLog.get(orderId) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - recent[0])) / 1000);
    return { ok: false, retryAfterSec };
  }
  recent.push(now);
  attemptLog.set(orderId, recent);
  return { ok: true };
}

const InputSchema = z.object({
  orderId: z.string().uuid(),
  sessionId: z
    .string()
    .min(10)
    .max(255)
    .regex(/^[a-zA-Z0-9_]+$/),
});

/**
 * Resend the order confirmation email.
 *
 * Security model:
 *  - Ownership is proven by passing the Stripe `session_id` (unguessable,
 *    issued by Stripe to the buyer in the return URL) that must match the
 *    order's `stripe_session_id`. This avoids requiring user accounts while
 *    preventing third parties from triggering sends to arbitrary orders.
 *  - Only orders with status = `paid` are eligible.
 *  - Per-order rate limit (5/hour) to prevent abuse.
 *  - The actual email is enqueued via the Lovable transactional email
 *    server route, which deduplicates by `idempotencyKey` and handles
 *    automatic retries / DLQ.
 */
export const resendOrderConfirmation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, stripe_session_id, customer_email, customer_name, product_name, amount_cents, currency, status",
      )
      .eq("id", data.orderId)
      .maybeSingle();

    if (error || !order) {
      throw new Error("Nie znaleziono zamówienia.");
    }
    if (order.stripe_session_id !== data.sessionId) {
      // Generic message — do not leak whether the order exists.
      throw new Error("Brak uprawnień do tego zamówienia.");
    }
    if (order.status !== "paid") {
      throw new Error("Potwierdzenie można wysłać dopiero po opłaceniu zamówienia.");
    }
    if (!order.customer_email) {
      throw new Error("Do tego zamówienia nie przypisano adresu e-mail.");
    }

    const rate = checkRateLimit(order.id);
    if (!rate.ok) {
      const mins = Math.ceil((rate.retryAfterSec ?? 60) / 60);
      throw new Error(`Zbyt wiele prób. Spróbuj ponownie za ok. ${mins} min.`);
    }

    // Bucket idempotency key by minute so a manual click does not silently
    // deduplicate with a system-triggered send from the same minute.
    const bucket = Math.floor(Date.now() / 60_000);
    const idempotencyKey = `order-confirm-${order.id}-${bucket}`;

    // Log the attempt as pending — we update to sent/error below.
    const { data: attempt } = await supabaseAdmin
      .from("email_resend_attempts")
      .insert({
        order_id: order.id,
        email_type: "order-confirmation",
        recipient_email: order.customer_email,
        status: "pending",
        idempotency_key: idempotencyKey,
      })
      .select("id")
      .single();

    const markError = async (msg: string) => {
      if (attempt?.id) {
        await supabaseAdmin
          .from("email_resend_attempts")
          .update({ status: "error", error_message: msg })
          .eq("id", attempt.id);
      }
    };

    const host = getRequestHost();
    const proto = host.includes("localhost") ? "http" : "https";
    const sendUrl = `${proto}://${host}/lovable/email/transactional/send`;

    let res: Response;
    try {
      res = await fetch(sendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
        },
        body: JSON.stringify({
          templateName: "order-confirmation",
          recipientEmail: order.customer_email,
          idempotencyKey,
          templateData: {
            orderId: order.id,
            customerName: order.customer_name ?? undefined,
            productName: order.product_name,
            amountFormatted: `${(order.amount_cents / 100).toLocaleString("pl-PL")} ${order.currency.toUpperCase()}`,
            deliveryDays: "3–7",
          },
        }),
      });
    } catch (err) {
      console.error("resendOrderConfirmation fetch error:", err);
      await markError("network_error");
      throw new Error("Wysyłka e-maila chwilowo niedostępna. Spróbuj później.");
    }

    if (res.status === 404) {
      await markError("email_infra_not_configured");
      throw new Error(
        "Wysyłka e-maili nie jest jeszcze skonfigurowana. Skonfiguruj domenę nadawczą w ustawieniach.",
      );
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("resendOrderConfirmation send failed:", res.status, body);
      await markError(`send_failed_${res.status}`);
      throw new Error("Nie udało się zlecić wysyłki. Spróbuj ponownie za chwilę.");
    }

    if (attempt?.id) {
      await supabaseAdmin
        .from("email_resend_attempts")
        .update({ status: "sent" })
        .eq("id", attempt.id);
    }

    return {
      ok: true,
      message: "Potwierdzenie zostało zlecone do wysyłki.",
      orderId: order.id,
      recipientEmail: order.customer_email,
    };
  });
