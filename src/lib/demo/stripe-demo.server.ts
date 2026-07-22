// Stripe Checkout dla demo — hosted session tworzona na żądanie (link w mailu
// prowadzi do /d/$slug/aktywuj, który wywołuje createDemoCheckout — dzięki temu
// link nigdy nie wygasa, a sesja Stripe powstaje świeża przy każdym kliknięciu).
//
// Price ID pochodzą WYŁĄCZNIE ze zmiennych środowiskowych:
//   STRIPE_PRICE_ID_START / _BUSINESS / _PREMIUM / _ECOMMERCE
// Klucz API: STRIPE_SECRET_KEY (bezpośrednio) albo istniejąca integracja Lovable
// (STRIPE_SANDBOX_API_KEY / STRIPE_LIVE_API_KEY + LOVABLE_API_KEY).

import Stripe from "stripe";
import { createStripeClient, type StripeEnv } from "@/lib/stripe.server";
import { getPackage, type PackageId } from "./schema";

export function stripePriceEnvName(packageId: PackageId): string {
  return getPackage(packageId).stripePriceEnv;
}

export function getStripePriceId(packageId: PackageId): string | undefined {
  return process.env[stripePriceEnvName(packageId)] || undefined;
}

function hasDirectKey(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

function hasGatewayKeys(): boolean {
  return Boolean(
    (process.env.STRIPE_LIVE_API_KEY || process.env.STRIPE_SANDBOX_API_KEY) &&
    process.env.LOVABLE_API_KEY,
  );
}

export function stripeMissingEnv(packageId?: PackageId): string[] {
  const missing: string[] = [];
  if (!hasDirectKey() && !hasGatewayKeys()) {
    missing.push("STRIPE_SECRET_KEY");
  }
  if (packageId) {
    if (!getStripePriceId(packageId)) missing.push(stripePriceEnvName(packageId));
  } else {
    for (const pkgEnv of [
      "STRIPE_PRICE_ID_START",
      "STRIPE_PRICE_ID_BUSINESS",
      "STRIPE_PRICE_ID_PREMIUM",
      "STRIPE_PRICE_ID_ECOMMERCE",
    ]) {
      if (!process.env[pkgEnv]) missing.push(pkgEnv);
    }
  }
  return missing;
}

export function isStripeConfigured(packageId: PackageId): boolean {
  return stripeMissingEnv(packageId).length === 0;
}

function resolveEnvironment(): StripeEnv {
  const override = process.env.PAYMENTS_ENVIRONMENT;
  if (override === "sandbox" || override === "live") return override;
  const direct = process.env.STRIPE_SECRET_KEY;
  if (direct) return direct.startsWith("sk_test") ? "sandbox" : "live";
  return process.env.STRIPE_LIVE_API_KEY ? "live" : "sandbox";
}

function createDemoStripeClient(): { stripe: Stripe; environment: StripeEnv } {
  const environment = resolveEnvironment();
  const directKey = process.env.STRIPE_SECRET_KEY;
  if (directKey) {
    return {
      stripe: new Stripe(directKey, {
        apiVersion: "2026-03-25.dahlia",
        httpClient: Stripe.createFetchHttpClient(),
      }),
      environment,
    };
  }
  return { stripe: createStripeClient(environment), environment };
}

export interface DemoCheckoutInput {
  demoId: string;
  slug: string;
  packageId: PackageId;
  clientEmail: string;
  companyName: string;
  baseUrl: string;
}

/**
 * Tworzy hosted Checkout Session dla danego dema i zwraca URL Stripe.
 * metadata.demo_id pozwala webhookowi przestawić status dema na `paid`.
 */
export async function createDemoCheckoutSession(
  input: DemoCheckoutInput,
): Promise<{ url: string; sessionId: string; environment: StripeEnv }> {
  const priceRef = getStripePriceId(input.packageId);
  if (!priceRef) {
    throw new Error(`Missing env ${stripePriceEnvName(input.packageId)}`);
  }
  const { stripe, environment } = createDemoStripeClient();

  // Env może zawierać pełne price ID (price_...) albo lookup key.
  let priceId = priceRef;
  if (!priceRef.startsWith("price_")) {
    const prices = await stripe.prices.list({ lookup_keys: [priceRef] });
    if (!prices.data.length) throw new Error(`Stripe price not found for lookup key "${priceRef}"`);
    priceId = prices.data[0].id;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: input.clientEmail,
    success_url: `${input.baseUrl}/d/${input.slug}?payment=success`,
    cancel_url: `${input.baseUrl}/d/${input.slug}/aktywuj?payment=canceled`,
    metadata: {
      demo_id: input.demoId,
      demo_slug: input.slug,
      company_name: input.companyName.slice(0, 200),
    },
  });

  if (!session.url) throw new Error("Stripe session has no URL");
  return { url: session.url, sessionId: session.id, environment };
}
