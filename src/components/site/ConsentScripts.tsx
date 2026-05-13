import { useEffect } from "react";
import { CONSENT_EVENT, getConsent, consentLog, isConsentDebug } from "@/lib/consent";

// Tracking IDs. Override per-environment via VITE_GA4_ID / VITE_META_PIXEL_ID.
const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined) || "G-GQT4Y20Z0B";
const META_PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || "1466352945238692";
const GOOGLE_ADS_ID = (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined) || "AW-18158941733";
const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined) || "GTM-MHKNMPZ3";
const CLARITY_ID = (import.meta.env.VITE_CLARITY_ID as string | undefined) || "wq5q06lx8l";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: (...args: unknown[]) => void };
    _fbq: unknown;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function initConsentMode() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  // Google Consent Mode v2 — default to denied for EU
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
    region: ["EEA", "PL"],
  });
}

function loadGA4() {
  if (!GA4_ID || document.getElementById("ga4-script")) return;
  const s = document.createElement("script");
  s.id = "ga4-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, { anonymize_ip: true });
}

function loadGoogleAds() {
  if (!GOOGLE_ADS_ID || document.getElementById("google-ads-script")) return;
  const s = document.createElement("script");
  s.id = "google-ads-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
}

function loadGTM() {
  if (!GTM_ID || document.getElementById("gtm-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);

  if (!document.getElementById("gtm-noscript")) {
    const noscript = document.createElement("noscript");
    noscript.id = "gtm-noscript";
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}

function loadClarity() {
  if (!CLARITY_ID || document.getElementById("clarity-script")) return;
  /* eslint-disable */
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    const t = l.createElement(r) as HTMLScriptElement;
    t.id = "clarity-script";
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  /* eslint-enable */
  try { window.clarity?.("consent"); } catch { /* noop */ }
}

function deactivateClarity() {
  if (typeof window.clarity !== "function") return;
  try {
    // Microsoft Clarity: revoke cookie-based tracking for the session.
    window.clarity("consent", false);
    consentLog("Clarity: clarity('consent', false) sent");
  } catch (err) {
    consentLog("Clarity revoke failed:", err);
  }
}

function loadMetaPixel() {
  if (!META_PIXEL_ID || document.getElementById("meta-pixel-script")) return;
  // Standard Meta Pixel snippet
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.id = "meta-pixel-script";
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

// Cookies set by GA4 / Google Ads / Meta Pixel that should be removed when consent is withdrawn.
const ANALYTICS_COOKIE_PATTERNS = [/^_ga(_.*)?$/, /^_gid$/, /^_gat(_.*)?$/, /^_clck$/, /^_clsk$/, /^CLID$/, /^MUID$/, /^ANONCHK$/, /^SM$/];
const MARKETING_COOKIE_PATTERNS = [/^_gcl_(au|aw|dc|gb|gf|ha)$/, /^_fbp$/, /^_fbc$/, /^fr$/];

function listCookieNames(): string[] {
  return document.cookie
    .split(";")
    .map((raw) => raw.split("=")[0]?.trim() ?? "")
    .filter(Boolean);
}

function matchByPatterns(names: string[], patterns: RegExp[]): string[] {
  return names.filter((n) => patterns.some((re) => re.test(n)));
}

function deleteCookie(name: string) {
  const host = window.location.hostname;
  // Build candidate domains: exact host + all parent domains with leading dot.
  const parts = host.split(".");
  const domains = new Set<string>([""]);
  for (let i = 0; i < parts.length - 1; i++) {
    domains.add("." + parts.slice(i).join("."));
  }
  domains.add("." + host);
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  for (const d of domains) {
    document.cookie = `${name}=; ${expires}; path=/${d ? `; domain=${d}` : ""}`;
  }
}

type ClearReport = {
  category: "analytics" | "marketing";
  matched: string[];
  before: string[];
  after: string[];
  removed: string[];
  stillPresent: string[];
};

function clearCategory(
  category: "analytics" | "marketing",
  patterns: RegExp[],
): ClearReport {
  const beforeAll = listCookieNames();
  const matched = matchByPatterns(beforeAll, patterns);
  for (const name of matched) deleteCookie(name);
  const afterAll = listCookieNames();
  const afterMatched = matchByPatterns(afterAll, patterns);
  const removed = matched.filter((n) => !afterMatched.includes(n));
  const stillPresent = afterMatched;
  return { category, matched, before: beforeAll, after: afterAll, removed, stillPresent };
}

function logClearReport(r: ClearReport) {
  if (r.matched.length === 0) {
    consentLog(
      `[${r.category}] no matching cookies (scanned ${r.before.length}: ${r.before.join(", ") || "—"})`,
    );
    return;
  }
  consentLog(
    `[${r.category}] cleared ${r.removed.length}/${r.matched.length} cookies`,
    {
      matched: r.matched,
      removed: r.removed,
      stillPresent: r.stillPresent,
      host: window.location.hostname,
      cookiesBefore: r.before.length,
      cookiesAfter: r.after.length,
    },
  );
  if (r.stillPresent.length) {
    consentLog(
      `[${r.category}] ⚠ still present (likely httpOnly or wrong domain/path):`,
      r.stillPresent,
    );
  }
}

function deactivateGA4() {
  if (!GA4_ID) return;
  // Official GA4 opt-out flag — any subsequent gtag('event'/'config') for this
  // measurement ID becomes a no-op for the rest of the page lifetime.
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = true;
  consentLog(`GA4 disabled in-session via ga-disable-${GA4_ID}=true`);
}

function deactivateGoogleAds() {
  if (!GOOGLE_ADS_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GOOGLE_ADS_ID}`] = true;
  consentLog(`Google Ads disabled in-session via ga-disable-${GOOGLE_ADS_ID}=true`);
}

function deactivateMetaPixel() {
  if (typeof window.fbq !== "function") return;
  try {
    // Tells Pixel to stop firing events for this session.
    window.fbq("consent", "revoke");
    consentLog("Meta Pixel: fbq('consent','revoke') sent");
  } catch (err) {
    consentLog("Meta Pixel revoke failed:", err);
  }
}

function applyConsent() {
  const c = getConsent();
  const analytics = c?.analytics ? "granted" : "denied";
  const marketing = c?.marketing ? "granted" : "denied";

  // Clear cookies for any category that is now denied.
  if (!c?.analytics) logClearReport(clearCategory("analytics", ANALYTICS_COOKIE_PATTERNS));
  if (!c?.marketing) logClearReport(clearCategory("marketing", MARKETING_COOKIE_PATTERNS));

  const update = {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", update);
  }

  consentLog("applyConsent →", update, c ? "(stored)" : "(default denied)");

  if (c?.analytics) {
    // Re-enable in case it was disabled earlier in the same session.
    if (GA4_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = false;
    loadGA4();
    consentLog("GA4 loaded:", GA4_ID);
    loadClarity();
    if (typeof window.clarity === "function") {
      try { window.clarity("consent"); } catch { /* noop */ }
    }
    if (CLARITY_ID) consentLog("Clarity loaded:", CLARITY_ID);
  } else {
    deactivateGA4();
    deactivateClarity();
  }

  if (c?.marketing) {
    if (GOOGLE_ADS_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GOOGLE_ADS_ID}`] = false;
    loadGoogleAds();
    consentLog("Google Ads loaded:", GOOGLE_ADS_ID);
    loadMetaPixel();
    if (typeof window.fbq === "function") {
      try { window.fbq("consent", "grant"); } catch { /* noop */ }
    }
    if (META_PIXEL_ID) consentLog("Meta Pixel loaded:", META_PIXEL_ID);
  } else {
    deactivateGoogleAds();
    deactivateMetaPixel();
  }
}


// ───────── Debug-only instrumentation: log every gtag/fbq event sample ─────────

type EventSample = {
  ts: number;
  api: "gtag" | "fbq";
  command: string;
  args: unknown[];
  consent: { analytics: boolean; marketing: boolean; stored: boolean };
  blockedBy: string[];
};

function summarizeBlockers(api: "gtag" | "fbq", command: string, args: unknown[]): string[] {
  const w = window as unknown as Record<string, unknown>;
  const blockers: string[] = [];
  const c = getConsent();

  if (api === "gtag" && command === "event") {
    // Determine target id (send_to) if present.
    const params = (args[1] as Record<string, unknown> | undefined) ?? {};
    const sendTo = (params.send_to as string | undefined) ?? "";
    const targets = sendTo ? sendTo.split(",").map((s) => s.trim()) : [GA4_ID, GOOGLE_ADS_ID];
    for (const id of targets) {
      if (!id) continue;
      if (w[`ga-disable-${id}`] === true) blockers.push(`ga-disable-${id}=true`);
    }
    // Consent gating
    if (targets.some((id) => id?.startsWith("G-")) && !c?.analytics) {
      blockers.push("consent.analytics=denied (analytics_storage=denied)");
    }
    if (targets.some((id) => id?.startsWith("AW-")) && !c?.marketing) {
      blockers.push("consent.marketing=denied (ad_storage=denied)");
    }
  }
  if (api === "fbq" && (command === "track" || command === "trackCustom")) {
    if (!c?.marketing) blockers.push("consent.marketing=denied (fbq consent revoked)");
  }
  return blockers;
}

function logEventSample(s: EventSample) {
  const tag = s.blockedBy.length ? "🚫 BLOCKED" : "✓ SENT";
  consentLog(
    `[event-sample] ${tag} ${s.api}('${s.command}', …)`,
    {
      args: s.args,
      consent: s.consent,
      blockedBy: s.blockedBy,
      time: new Date(s.ts).toISOString(),
    },
  );
}

function instrumentGtag() {
  const original = window.gtag;
  if (!original || (original as unknown as { __ksignWrapped?: boolean }).__ksignWrapped) return;
  const wrapped = function gtag(...args: unknown[]) {
    try {
      const command = String(args[0] ?? "");
      // Sample only events / config — skip noisy 'js'/'set'/'consent' default pushes.
      if (command === "event" || command === "config" || command === "consent") {
        const c = getConsent();
        logEventSample({
          ts: Date.now(),
          api: "gtag",
          command,
          args: args.slice(1),
          consent: { analytics: !!c?.analytics, marketing: !!c?.marketing, stored: !!c },
          blockedBy: summarizeBlockers("gtag", command, args.slice(1)),
        });
      }
    } catch { /* noop */ }
    return (original as (...a: unknown[]) => unknown)(...args);
  } as typeof window.gtag;
  (wrapped as unknown as { __ksignWrapped: boolean }).__ksignWrapped = true;
  window.gtag = wrapped;
  consentLog("instrumentation: window.gtag wrapped for event sampling");
}

function instrumentFbq() {
  const original = window.fbq;
  if (typeof original !== "function") return;
  if ((original as unknown as { __ksignWrapped?: boolean }).__ksignWrapped) return;
  const wrapped = function fbq(...args: unknown[]) {
    try {
      const command = String(args[0] ?? "");
      if (command === "track" || command === "trackCustom" || command === "consent") {
        const c = getConsent();
        logEventSample({
          ts: Date.now(),
          api: "fbq",
          command,
          args: args.slice(1),
          consent: { analytics: !!c?.analytics, marketing: !!c?.marketing, stored: !!c },
          blockedBy: summarizeBlockers("fbq", command, args.slice(1)),
        });
      }
    } catch { /* noop */ }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (original as any).apply(window, args);
  } as typeof window.fbq;
  // Preserve fbq internals (queue, callMethod, loaded, version)
  Object.assign(wrapped, original);
  (wrapped as unknown as { __ksignWrapped: boolean }).__ksignWrapped = true;
  window.fbq = wrapped;
  consentLog("instrumentation: window.fbq wrapped for event sampling");
}

export function ConsentScripts() {
  useEffect(() => {
    initConsentMode();
    consentLog("Consent Mode v2 initialized (default: denied for EEA/PL)");
    if (isConsentDebug()) instrumentGtag();
    loadGTM();
    consentLog("GTM loaded:", GTM_ID);
    // Load Google Ads gtag.js unconditionally so Google can detect the tag.
    // Cookies/conversions are still gated by Consent Mode v2 (ad_storage).
    loadGoogleAds();
    consentLog("Google Ads base tag loaded (gated by Consent Mode):", GOOGLE_ADS_ID);
    applyConsent();
    // Instrument fbq once it gets defined (after marketing consent + Pixel load).
    if (isConsentDebug()) {
      const tryFbq = window.setInterval(() => {
        if (typeof window.fbq === "function") {
          instrumentFbq();
          window.clearInterval(tryFbq);
        }
      }, 500);
      window.setTimeout(() => window.clearInterval(tryFbq), 30_000);
    }
    const handler = (e: Event) => {
      consentLog("CONSENT_EVENT received", (e as CustomEvent).detail);
      applyConsent();
      if (isConsentDebug()) instrumentFbq();
    };
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);
  return null;
}
