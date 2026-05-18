import { createFileRoute } from "@tanstack/react-router";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getCatalogItem } from "@/lib/catalog";

// Verify Stripe webhook signature using HMAC-SHA256 (no SDK dependency, works in Worker).
async function verifyWebhook(req: Request, env: StripeEnv): Promise<{ type: string; data: { object: any } }> {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const secret =
    env === "sandbox"
      ? process.env.PAYMENTS_SANDBOX_WEBHOOK_SECRET
      : process.env.PAYMENTS_LIVE_WEBHOOK_SECRET;
  if (!secret) throw new Error("Webhook secret not configured");
  if (!signature || !body) throw new Error("Missing signature or body");

  let timestamp: string | undefined;
  const v1: string[] = [];
  for (const part of signature.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k === "t") timestamp = v;
    if (k === "v1") v1.push(v);
  }
  if (!timestamp || v1.length === 0) throw new Error("Invalid signature format");

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) throw new Error("Webhook timestamp too old");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${body}`)
  );
  const expected = Buffer.from(new Uint8Array(signed)).toString("hex");
  if (!v1.includes(expected)) throw new Error("Invalid webhook signature");

  return JSON.parse(body);
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  // Re-fetch session with line items expanded to get the price id (Stripe ID, then translated to lookup_key).
  const stripe = createStripeClient(env);
  const full = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price"],
  });
  const item = full.line_items?.data?.[0];
  const priceObj = item?.price as any;
  const priceLookup = priceObj?.lookup_key as string | undefined;
  const catalogItem = priceLookup ? getCatalogItem(priceLookup) : undefined;

  await supabaseAdmin.from("orders").upsert(
    {
      stripe_session_id: full.id,
      stripe_payment_intent_id:
        typeof full.payment_intent === "string" ? full.payment_intent : null,
      stripe_customer_id:
        typeof full.customer === "string" ? full.customer : null,
      customer_email: full.customer_details?.email || full.customer_email || null,
      customer_name: full.customer_details?.name || null,
      price_id: priceLookup || priceObj?.id || "unknown",
      product_name: catalogItem?.name || "Zamówienie KSIGN",
      amount_cents: full.amount_total ?? 0,
      currency: (full.currency || "pln").toLowerCase(),
      status: "paid",
      environment: env,
    },
    { onConflict: "stripe_session_id" }
  );

  console.log(
    `[order] paid env=${env} session=${full.id} price=${priceLookup} amount=${full.amount_total}`
  );
}

async function handleSubscriptionEvent(sub: any, env: StripeEnv, eventType: string) {
  // For now just log subscription lifecycle — opieka_techniczna doesn't unlock features.
  console.log(`[subscription] ${eventType} env=${env} id=${sub.id} status=${sub.status}`);
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          return Response.json({ received: true, ignored: "invalid env" });
        }
        const env: StripeEnv = rawEnv;
        try {
          const event = await verifyWebhook(request, env);
          switch (event.type) {
            case "checkout.session.completed":
            case "transaction.completed":
              await handleCheckoutCompleted(event.data.object, env);
              break;
            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "customer.subscription.deleted":
            case "subscription.created":
            case "subscription.updated":
            case "subscription.canceled":
              await handleSubscriptionEvent(event.data.object, env, event.type);
              break;
            default:
              console.log("[webhook] unhandled:", event.type);
          }
          return Response.json({ received: true });
        } catch (e) {
          console.error("[webhook] error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
