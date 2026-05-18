import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { generateOrderPdf } from "@/lib/order-pdf";

const InputSchema = z.object({
  orderId: z.string().uuid(),
  sessionId: z
    .string()
    .min(10)
    .max(255)
    .regex(/^[a-zA-Z0-9_]+$/),
  deliveryDays: z
    .tuple([z.number().int().min(1).max(120), z.number().int().min(1).max(120)])
    .optional(),
  etaRange: z.string().min(1).max(200).optional(),
  steps: z.array(z.string().min(1).max(500)).max(20).optional(),
});

const BUCKET = "order-pdfs";
const EXPIRES_IN_SEC = 15 * 60; // 15 min

/**
 * Generate the order summary PDF on the server, upload it to a private
 * storage bucket and return a time-limited signed URL.
 *
 * Ownership is proven by matching the Stripe session id stored on the order,
 * mirroring the resend-confirmation pattern.
 */
export const generateOrderPdfLink = createServerFn({ method: "POST" })
  .inputValidator((input) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .select(
        "id, product_name, amount_cents, currency, brief_completed, stripe_session_id, customer_email, customer_name",
      )
      .eq("id", data.orderId)
      .maybeSingle();

    if (orderErr || !order) {
      throw new Error("Nie znaleziono zamówienia.");
    }
    if (order.stripe_session_id !== data.sessionId) {
      throw new Error("Brak uprawnień do tego zamówienia.");
    }

    const doc = generateOrderPdf({
      orderId: order.id,
      productName: order.product_name,
      amountCents: order.amount_cents,
      currency: order.currency,
      briefCompleted: order.brief_completed,
      deliveryDays: data.deliveryDays,
      etaRange: data.etaRange,
      steps: data.steps,
      customerEmail: order.customer_email,
      customerName: order.customer_name,
    });

    const bytes = doc.output("arraybuffer");
    const path = `${order.id}/${Date.now()}.pdf`;

    const { error: uploadErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, new Uint8Array(bytes), {
        contentType: "application/pdf",
        upsert: false,
      });
    if (uploadErr) {
      throw new Error(`Błąd zapisu pliku: ${uploadErr.message}`);
    }

    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(path, EXPIRES_IN_SEC, {
        download: `ksign-zamowienie-${order.id.slice(0, 8)}.pdf`,
      });
    if (signErr || !signed) {
      throw new Error("Nie udało się utworzyć linku do pobrania.");
    }

    return {
      url: signed.signedUrl,
      expiresAt: new Date(Date.now() + EXPIRES_IN_SEC * 1000).toISOString(),
      expiresInSec: EXPIRES_IN_SEC,
    };
  });
