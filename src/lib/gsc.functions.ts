import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { GSC_SITE_URL, GSC_META_TOKEN } from "./gsc-config";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

type StepStatus = "ok" | "fail" | "skipped";
export type GscStep = {
  key: string;
  label: string;
  status: StepStatus;
  detail?: string;
  attempts?: number;
};

async function gscFetch(path: string, init: RequestInit = {}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY missing");
  if (!gscKey) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY missing");
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text };
}

async function withRetry<T>(
  fn: () => Promise<T>,
  max = 3,
  delayMs = 1500,
): Promise<{ result: T; attempts: number }> {
  let lastErr: unknown;
  for (let i = 1; i <= max; i++) {
    try {
      const result = await fn();
      return { result, attempts: i };
    } catch (e) {
      lastErr = e;
      if (i < max) await new Promise((r) => setTimeout(r, delayMs * i));
    }
  }
  throw lastErr;
}

export const runGscVerification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async (): Promise<{ steps: GscStep[]; success: boolean }> => {
    const steps: GscStep[] = [];

    // Step 1: confirm meta tag is live
    try {
      const r = await fetch(GSC_SITE_URL, { headers: { "User-Agent": "KSIGN-GSC-Verifier/1.0" } });
      const html = await r.text();
      const present =
        html.includes(`content="${GSC_META_TOKEN}"`) ||
        html.includes(`content='${GSC_META_TOKEN}'`);
      steps.push({
        key: "meta",
        label: "Meta tag obecny w opublikowanym HTML",
        status: present ? "ok" : "fail",
        detail: present
          ? `Token ${GSC_META_TOKEN.slice(0, 8)}… znaleziony pod ${GSC_SITE_URL}`
          : `Nie znaleziono tokenu w HTML. Opublikuj ponownie projekt, aby zaktualizować meta tag.`,
      });
      if (!present) return { steps, success: false };
    } catch (e) {
      steps.push({
        key: "meta",
        label: "Meta tag obecny w opublikowanym HTML",
        status: "fail",
        detail: String(e),
      });
      return { steps, success: false };
    }

    // Step 2: verify ownership (with retries)
    try {
      const { attempts } = await withRetry(async () => {
        const res = await gscFetch("/siteVerification/v1/webResource?verificationMethod=META", {
          method: "POST",
          body: JSON.stringify({ site: { identifier: GSC_SITE_URL, type: "SITE" } }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.body}`);
        return res;
      });
      steps.push({
        key: "verify",
        label: "Weryfikacja własności (META)",
        status: "ok",
        attempts,
        detail: `Google potwierdziło własność po ${attempts} próbie/-ach.`,
      });
    } catch (e) {
      steps.push({
        key: "verify",
        label: "Weryfikacja własności (META)",
        status: "fail",
        attempts: 3,
        detail: `Niepowodzenie po 3 próbach: ${String(e)}`,
      });
      return { steps, success: false };
    }

    // Step 3: add site to Search Console
    try {
      const { attempts } = await withRetry(async () => {
        const res = await gscFetch(`/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}`, {
          method: "PUT",
        });
        // 204 No Content on success; 409/200 if already present is also fine
        if (!res.ok && res.status !== 204 && res.status !== 409) {
          throw new Error(`HTTP ${res.status}: ${res.body}`);
        }
        return res;
      });
      steps.push({
        key: "addSite",
        label: "Dodanie właściwości do Search Console",
        status: "ok",
        attempts,
        detail: `Właściwość ${GSC_SITE_URL} zarejestrowana.`,
      });
    } catch (e) {
      steps.push({
        key: "addSite",
        label: "Dodanie właściwości do Search Console",
        status: "fail",
        attempts: 3,
        detail: `Niepowodzenie po 3 próbach: ${String(e)}`,
      });
      return { steps, success: false };
    }

    return { steps, success: true };
  });
