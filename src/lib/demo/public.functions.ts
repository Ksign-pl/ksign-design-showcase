// Publiczne server functions dla /d/$slug — bez logowania.
// Slug jest losowy i trudny do odgadnięcia; reguły 72h/30 dni egzekwowane
// przy KAŻDYM odczycie (działają poprawnie także bez skonfigurowanego crona).

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  DemoContentSchema,
  formatPricePln,
  getPackage,
  type PackageId,
  type PublicDemo,
  type SiteTypeId,
} from "./schema";
import { getPublicBaseUrl } from "./base-url.server";
import { createDemoCheckoutSession, stripeMissingEnv } from "./stripe-demo.server";

const SlugSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
});

export type PublicDemoState =
  | { state: "active"; demo: PublicDemo; justPaid?: boolean }
  | { state: "expired"; slug: string }
  | { state: "gone" };

async function markExpired(demoId: string) {
  const { error } = await supabaseAdmin
    .from("demos")
    .update({ status: "expired", expired_at: new Date().toISOString() })
    .eq("id", demoId)
    .in("status", ["draft", "sent"]);
  if (!error) {
    await supabaseAdmin.from("demo_events").insert({
      demo_id: demoId,
      event_type: "expired",
      metadata: { via: "public_visit" },
    });
  }
}

/** Pobiera demo po slugu i egzekwuje okno życia linku. Loguje wejście na aktywne demo. */
export const getPublicDemo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SlugSchema.parse(input))
  .handler(async ({ data }): Promise<PublicDemoState> => {
    const { data: demo, error } = await supabaseAdmin
      .from("demos")
      .select(
        "id, slug, company_name, main_service, target_audience, city, site_type, package_id, brand_color, logo_url, content, status, expires_at, purge_after",
      )
      .eq("slug", data.slug)
      .maybeSingle();

    if (error) {
      console.error("[demo:public] fetch failed:", error.message);
      return { state: "gone" };
    }
    if (!demo) return { state: "gone" };

    const now = Date.now();
    const isPaid = demo.status === "paid";

    // Po 30 dniach link przestaje prezentować dane klienta (nie dotyczy opłaconych).
    if (!isPaid && demo.purge_after && now > Date.parse(demo.purge_after)) {
      return { state: "gone" };
    }

    // Po 72 godzinach aktywne demo przechodzi w expired (lazy sweep przy wejściu).
    const isExpired =
      !isPaid &&
      (demo.status === "expired" ||
        (demo.expires_at !== null && now > Date.parse(demo.expires_at)));
    if (isExpired) {
      if (demo.status !== "expired") await markExpired(demo.id);
      return { state: "expired", slug: demo.slug };
    }

    // Historia zdarzeń: wejście na demo.
    await supabaseAdmin.from("demo_events").insert({
      demo_id: demo.id,
      event_type: "visited",
      metadata: {},
    });

    const parsedContent = demo.content ? DemoContentSchema.safeParse(demo.content) : null;

    return {
      state: "active",
      demo: {
        slug: demo.slug,
        companyName: demo.company_name,
        mainService: demo.main_service,
        targetAudience: demo.target_audience,
        city: demo.city,
        siteType: demo.site_type as SiteTypeId,
        packageId: demo.package_id as PackageId,
        brandColor: demo.brand_color,
        logoUrl: demo.logo_url,
        content: parsedContent?.success ? parsedContent.data : null,
        status: demo.status,
      },
    };
  });

export type ActivateInfo =
  | {
      state: "ready";
      companyName: string;
      packageName: string;
      priceLabel: string;
      alreadyPaid: false;
      paymentsAvailable: boolean;
    }
  | { state: "paid"; companyName: string }
  | { state: "gone" };

/** Dane do ekranu „Aktywuj projekt" — minimalny zakres (pakiet + cena). */
export const getActivateInfo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SlugSchema.parse(input))
  .handler(async ({ data }): Promise<ActivateInfo> => {
    const { data: demo } = await supabaseAdmin
      .from("demos")
      .select("id, company_name, package_id, status, purge_after")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!demo) return { state: "gone" };
    if (demo.status !== "paid" && demo.purge_after && Date.now() > Date.parse(demo.purge_after)) {
      return { state: "gone" };
    }
    if (demo.status === "paid") return { state: "paid", companyName: demo.company_name };
    const pkg = getPackage(demo.package_id);
    return {
      state: "ready",
      companyName: demo.company_name,
      packageName: pkg.name,
      priceLabel: formatPricePln(pkg.pricePln),
      alreadyPaid: false,
      paymentsAvailable: stripeMissingEnv(demo.package_id as PackageId).length === 0,
    };
  });

/** Tworzy sesję Stripe Checkout dla dema i zwraca URL przekierowania. */
export const createDemoCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SlugSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: demo } = await supabaseAdmin
      .from("demos")
      .select("id, slug, company_name, client_email, package_id, status, purge_after")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!demo) throw new Error("Nie znaleziono projektu.");
    if (demo.status === "paid") throw new Error("Ten projekt jest już opłacony.");
    if (demo.purge_after && Date.now() > Date.parse(demo.purge_after)) {
      throw new Error("Ten link nie jest już aktywny.");
    }
    const missing = stripeMissingEnv(demo.package_id as PackageId);
    if (missing.length > 0) {
      // Klient widzi neutralny komunikat; szczegóły konfiguracji tylko w logach.
      console.error("[demo:checkout] Stripe not configured, missing:", missing.join(", "));
      throw new Error("Płatność online jest chwilowo niedostępna. Skontaktuj się z nami mailowo.");
    }

    const session = await createDemoCheckoutSession({
      demoId: demo.id,
      slug: demo.slug,
      packageId: demo.package_id as PackageId,
      clientEmail: demo.client_email,
      companyName: demo.company_name,
      baseUrl: getPublicBaseUrl(),
    });

    await supabaseAdmin
      .from("demos")
      .update({ stripe_session_id: session.sessionId })
      .eq("id", demo.id);

    return { url: session.url };
  });
