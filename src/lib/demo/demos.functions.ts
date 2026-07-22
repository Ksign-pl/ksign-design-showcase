// Server functions panelu doradcy (wymagają zalogowanego użytkownika Supabase).
// Zapisy dem idą przez context.supabase (token użytkownika + RLS: doradca widzi
// tylko swoje dema, admin wszystkie). Zdarzenia loguje service role.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Json, Tables } from "@/integrations/supabase/types";
import {
  BriefSchema,
  DemoContentSchema,
  getPackage,
  getSiteType,
  type DemoContent,
  type PackageId,
} from "./schema";
import { buildDemoSlug } from "./slug";
import { getPublicBaseUrl } from "./base-url.server";
import { isResendConfigured, resendMissingEnv, sendDemoEmail } from "./resend.server";
import { appendLeadToSheet, isSheetsConfigured, sheetsMissingEnv } from "./sheets.server";
import { stripeMissingEnv } from "./stripe-demo.server";

export type DemoRow = Tables<"demos">;

const DEMO_LIFETIME_MS = 72 * 60 * 60 * 1000; // 72h aktywności
const DEMO_PURGE_MS = 30 * 24 * 60 * 60 * 1000; // po 30 dniach link nie prezentuje danych

async function logDemoEvent(
  demoId: string,
  eventType: "generated" | "sent" | "visited" | "paid" | "expired" | "sheets_error" | "email_error",
  metadata: Json = {},
) {
  const { error } = await supabaseAdmin.from("demo_events").insert({
    demo_id: demoId,
    event_type: eventType,
    metadata,
  });
  if (error) console.error(`[demo:event] ${eventType} failed:`, error.message);
}

export function demoPublicPath(slug: string): string {
  return `/d/${slug}`;
}

/** Status konfiguracji integracji — wyłącznie dla zalogowanego doradcy. */
export const getIntegrationsStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    return {
      anthropic: {
        configured: Boolean(process.env.ANTHROPIC_API_KEY),
        missing: process.env.ANTHROPIC_API_KEY ? [] : ["ANTHROPIC_API_KEY"],
        model: process.env.ANTHROPIC_MODEL || "claude-opus-4-8 (domyślny)",
      },
      resend: { configured: isResendConfigured(), missing: resendMissingEnv() },
      sheets: { configured: isSheetsConfigured(), missing: sheetsMissingEnv() },
      stripe: {
        configured: stripeMissingEnv().length === 0,
        missing: stripeMissingEnv(),
      },
      publicBaseUrl: process.env.PUBLIC_DEMO_BASE_URL || null,
    };
  });

const CreateDemoSchema = z.object({
  brief: BriefSchema,
  content: DemoContentSchema.nullable(),
  /** Model AI użyty do generowania (informacyjnie, do historii zdarzeń). */
  generatedWith: z.string().max(100).optional(),
});

export interface SendOutcome {
  emailSent: boolean;
  emailError?: string;
  sheetsAppended: boolean;
  sheetsError?: string;
  configError?: string;
}

async function sendDemoToClient(demo: DemoRow): Promise<SendOutcome> {
  const outcome: SendOutcome = { emailSent: false, sheetsAppended: false };
  const baseUrl = getPublicBaseUrl();
  const demoUrl = `${baseUrl}${demoPublicPath(demo.slug)}`;
  const pkg = getPackage(demo.package_id);

  // Google Sheets — odporne na błąd: porażka arkusza nie blokuje wysyłki.
  if (isSheetsConfigured()) {
    try {
      await appendLeadToSheet({
        createdAt: new Date().toISOString(),
        companyName: demo.company_name,
        clientEmail: demo.client_email,
        packageName: pkg.name,
        pricePln: pkg.pricePln,
        city: demo.city,
        siteTypeLabel: getSiteType(demo.site_type).label,
        demoUrl,
        advisorName: demo.advisor_name ?? "",
      });
      outcome.sheetsAppended = true;
    } catch (err) {
      outcome.sheetsError = err instanceof Error ? err.message : String(err);
      console.error("[demo:sheets] append failed:", outcome.sheetsError);
      await logDemoEvent(demo.id, "sheets_error", { message: outcome.sheetsError ?? "unknown" });
    }
  } else {
    outcome.sheetsError = `Brak konfiguracji: ${sheetsMissingEnv().join(", ")}`;
  }

  // Resend — bez klucza nie udajemy wysyłki; demo zostaje w statusie draft.
  if (!isResendConfigured()) {
    outcome.configError = `E-mail nie został wysłany — brak zmiennej środowiskowej RESEND_API_KEY. Możesz przekazać klientowi link ręcznie: ${demoUrl}`;
    return outcome;
  }

  const emailResult = await sendDemoEmail({
    to: demo.client_email,
    companyName: demo.company_name,
    demoUrl,
    activateUrl: `${demoUrl}/aktywuj`,
    packageId: demo.package_id as PackageId,
    advisorName: demo.advisor_name ?? undefined,
  });

  if (!emailResult.ok) {
    outcome.emailError = emailResult.error;
    await logDemoEvent(demo.id, "email_error", { message: emailResult.error ?? "unknown" });
    return outcome;
  }

  outcome.emailSent = true;
  const { error } = await supabaseAdmin
    .from("demos")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", demo.id);
  if (error) console.error("[demo:send] status update failed:", error.message);
  await logDemoEvent(demo.id, "sent", { to: demo.client_email, resendId: emailResult.id ?? null });
  return outcome;
}

/** Tworzy rekord demo i (jeśli Resend skonfigurowany) wysyła e-mail do klienta. */
export const createAndSendDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CreateDemoSchema.parse(input))
  .handler(async ({ data, context }) => {
    if (!data.content) {
      throw new Error("Najpierw wygeneruj treści demo — wysyłka wymaga wygenerowanych treści.");
    }
    const now = Date.now();
    const slug = buildDemoSlug(data.brief.companyName);

    const { data: demo, error } = await context.supabase
      .from("demos")
      .insert({
        advisor_id: context.userId,
        advisor_name: data.brief.advisorName || null,
        slug,
        company_name: data.brief.companyName,
        main_service: data.brief.mainService,
        target_audience: data.brief.targetAudience,
        city: data.brief.city,
        client_email: data.brief.clientEmail,
        site_type: data.brief.siteType,
        package_id: data.brief.packageId,
        brand_color: data.brief.brandColor || null,
        logo_url: data.brief.logoUrl || null,
        content: data.content,
        status: "draft",
        generated_at: new Date(now).toISOString(),
        expires_at: new Date(now + DEMO_LIFETIME_MS).toISOString(),
        purge_after: new Date(now + DEMO_PURGE_MS).toISOString(),
      })
      .select("*")
      .single();

    if (error || !demo) {
      console.error("[demo:create] insert failed:", error?.message);
      throw new Error("Nie udało się utworzyć dema w bazie danych.");
    }

    await logDemoEvent(demo.id, "generated", { model: data.generatedWith ?? null });
    const outcome = await sendDemoToClient(demo);

    return {
      id: demo.id,
      slug: demo.slug,
      publicPath: demoPublicPath(demo.slug),
      publicUrl: `${getPublicBaseUrl()}${demoPublicPath(demo.slug)}`,
      status: outcome.emailSent ? "sent" : "draft",
      ...outcome,
    };
  });

const UpdateDemoSchema = z.object({
  demoId: z.string().uuid(),
  brief: BriefSchema,
  content: DemoContentSchema.nullable(),
  generatedWith: z.string().max(100).optional(),
});

/** Aktualizuje brief/treści istniejącego dema (podgląd publiczny odświeża się natychmiast). */
export const updateDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpdateDemoSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: demo, error } = await context.supabase
      .from("demos")
      .update({
        advisor_name: data.brief.advisorName || null,
        company_name: data.brief.companyName,
        main_service: data.brief.mainService,
        target_audience: data.brief.targetAudience,
        city: data.brief.city,
        client_email: data.brief.clientEmail,
        site_type: data.brief.siteType,
        package_id: data.brief.packageId,
        brand_color: data.brief.brandColor || null,
        logo_url: data.brief.logoUrl || null,
        ...(data.content ? { content: data.content, generated_at: new Date().toISOString() } : {}),
      })
      .eq("id", data.demoId)
      .select("*")
      .single();

    if (error || !demo) {
      console.error("[demo:update] failed:", error?.message);
      throw new Error("Nie udało się zapisać zmian (sprawdź, czy demo należy do Ciebie).");
    }
    if (data.content && data.generatedWith) {
      await logDemoEvent(demo.id, "generated", { model: data.generatedWith, update: true });
    }
    return { id: demo.id, slug: demo.slug, status: demo.status };
  });

/** Wysyła (lub ponawia wysyłkę) e-maila dla istniejącego dema w statusie draft/sent. */
export const sendDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { demoId: string }) =>
    z.object({ demoId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: demo, error } = await context.supabase
      .from("demos")
      .select("*")
      .eq("id", data.demoId)
      .maybeSingle();
    if (error || !demo) throw new Error("Nie znaleziono dema.");
    if (demo.status === "paid") throw new Error("To demo jest już opłacone.");
    if (!demo.content) throw new Error("Demo nie ma wygenerowanych treści.");

    const outcome = await sendDemoToClient(demo);
    return {
      id: demo.id,
      slug: demo.slug,
      publicUrl: `${getPublicBaseUrl()}${demoPublicPath(demo.slug)}`,
      ...outcome,
    };
  });

/** Lista dem — RLS: doradca widzi swoje, admin wszystkie. */
export const listDemos = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("demos")
      .select(
        "id, slug, company_name, client_email, package_id, site_type, status, created_at, sent_at, expires_at, advisor_id, advisor_name",
      )
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("[demo:list] failed:", error.message);
      throw new Error("Nie udało się pobrać listy dem.");
    }
    return { demos: data ?? [], userId: context.userId };
  });

/** Pojedyncze demo z historią zdarzeń (do edycji w panelu). */
export const getDemoForAdvisor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { demoId: string }) =>
    z.object({ demoId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: demo, error } = await context.supabase
      .from("demos")
      .select("*")
      .eq("id", data.demoId)
      .maybeSingle();
    if (error || !demo) throw new Error("Nie znaleziono dema.");

    const { data: events } = await context.supabase
      .from("demo_events")
      .select("id, event_type, metadata, created_at")
      .eq("demo_id", demo.id)
      .order("created_at", { ascending: false })
      .limit(50);

    let content: DemoContent | null = null;
    if (demo.content) {
      const parsed = DemoContentSchema.safeParse(demo.content);
      content = parsed.success ? parsed.data : null;
    }
    return { demo, content, events: events ?? [] };
  });
