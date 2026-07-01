import { useEffect, useState } from "react";
import { CONSENT_EVENT, getConsent, isConsentDebug, clearConsent, consentLog } from "@/lib/consent";

const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined) || "G-GQT4Y20Z0B";
const GOOGLE_ADS_ID =
  (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined) || "AW-18158941733";
const META_PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || "";
const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined) || "GTM-MHKNMPZ3";

type Status = "active" | "blocked" | "not-loaded" | "n/a";

type Diag = {
  consent: { analytics: boolean; marketing: boolean; stored: boolean };
  ga4: { id: string; scriptLoaded: boolean; disabled: boolean; status: Status };
  ads: { id: string; scriptLoaded: boolean; disabled: boolean; status: Status };
  pixel: { id: string; scriptLoaded: boolean; fbqDefined: boolean; status: Status };
  gtm: { id: string; scriptLoaded: boolean; status: Status };
  cookies: string[];
};

function readDiag(): Diag {
  const c = getConsent();
  const w = window as unknown as Record<string, unknown>;

  const ga4Loaded = !!document.getElementById("ga4-script");
  const ga4Disabled = w[`ga-disable-${GA4_ID}`] === true;
  const adsLoaded = !!document.getElementById("google-ads-script");
  const adsDisabled = w[`ga-disable-${GOOGLE_ADS_ID}`] === true;
  const pixelLoaded = !!document.getElementById("meta-pixel-script");
  const fbqDefined = typeof (window as { fbq?: unknown }).fbq === "function";
  const gtmLoaded = !!document.getElementById("gtm-script");

  const status = (loaded: boolean, allowed: boolean, disabled: boolean): Status => {
    if (!loaded) return "not-loaded";
    if (disabled || !allowed) return "blocked";
    return "active";
  };

  return {
    consent: {
      analytics: !!c?.analytics,
      marketing: !!c?.marketing,
      stored: !!c,
    },
    ga4: {
      id: GA4_ID,
      scriptLoaded: ga4Loaded,
      disabled: ga4Disabled,
      status: status(ga4Loaded, !!c?.analytics, ga4Disabled),
    },
    ads: {
      id: GOOGLE_ADS_ID,
      scriptLoaded: adsLoaded,
      disabled: adsDisabled,
      // Base script intentionally loads pre-consent for tag detection,
      // but conversions are gated by Consent Mode (marketing).
      status: status(adsLoaded, !!c?.marketing, adsDisabled),
    },
    pixel: {
      id: META_PIXEL_ID || "—",
      scriptLoaded: pixelLoaded,
      fbqDefined,
      status: !META_PIXEL_ID
        ? "n/a"
        : !pixelLoaded
          ? "not-loaded"
          : !c?.marketing
            ? "blocked"
            : "active",
    },
    gtm: {
      id: GTM_ID,
      scriptLoaded: gtmLoaded,
      status: gtmLoaded ? "active" : "not-loaded",
    },
    cookies: document.cookie
      .split(";")
      .map((s) => s.split("=")[0]?.trim() ?? "")
      .filter(Boolean)
      .sort(),
  };
}

const dot: Record<Status, string> = {
  active: "bg-emerald-500",
  blocked: "bg-amber-500",
  "not-loaded": "bg-zinc-500",
  "n/a": "bg-zinc-700",
};

const statusLabel: Record<Status, string> = {
  active: "ACTIVE",
  blocked: "BLOCKED",
  "not-loaded": "NOT LOADED",
  "n/a": "N/A",
};

export function ConsentDebugPanel() {
  const [show, setShow] = useState(false);
  const [diag, setDiag] = useState<Diag | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isConsentDebug()) return;
    setShow(true);
    const refresh = () => setDiag(readDiag());
    refresh();
    const onConsent = () => refresh();
    window.addEventListener(CONSENT_EVENT, onConsent);
    const id = window.setInterval(refresh, 1500);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.clearInterval(id);
    };
  }, []);

  if (!show || !diag) return null;

  return (
    <div
      role="region"
      aria-label="Consent diagnostics"
      className="fixed bottom-4 right-4 z-[9999] max-w-sm rounded-lg border border-border bg-background/95 p-3 text-xs font-mono shadow-lg backdrop-blur"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <strong className="text-foreground">Consent Diagnostics</strong>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
          aria-label={collapsed ? "Rozwiń" : "Zwiń"}
        >
          {collapsed ? "▸" : "▾"}
        </button>
      </div>
      {!collapsed && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span>
              consent:{" "}
              <span className={diag.consent.stored ? "text-foreground" : "text-muted-foreground"}>
                {diag.consent.stored ? "stored" : "default-denied"}
              </span>
            </span>
            <span>
              analytics:{" "}
              <span className={diag.consent.analytics ? "text-emerald-500" : "text-amber-500"}>
                {diag.consent.analytics ? "granted" : "denied"}
              </span>
            </span>
            <span>
              marketing:{" "}
              <span className={diag.consent.marketing ? "text-emerald-500" : "text-amber-500"}>
                {diag.consent.marketing ? "granted" : "denied"}
              </span>
            </span>
          </div>

          <Row label="GTM" id={diag.gtm.id} status={diag.gtm.status} />
          <Row
            label="GA4"
            id={diag.ga4.id}
            status={diag.ga4.status}
            extra={diag.ga4.disabled ? "ga-disable=true" : undefined}
          />
          <Row
            label="Google Ads"
            id={diag.ads.id}
            status={diag.ads.status}
            extra={diag.ads.disabled ? "ga-disable=true" : undefined}
          />
          <Row
            label="Meta Pixel"
            id={diag.pixel.id}
            status={diag.pixel.status}
            extra={diag.pixel.fbqDefined ? "fbq()" : undefined}
          />

          <details className="mt-1">
            <summary className="cursor-pointer text-muted-foreground">
              cookies ({diag.cookies.length})
            </summary>
            <div className="mt-1 break-all text-muted-foreground">
              {diag.cookies.length ? diag.cookies.join(", ") : "—"}
            </div>
          </details>

          <button
            type="button"
            onClick={() => {
              const w = window as unknown as Record<string, unknown>;
              // Re-set Consent Mode v2 defaults to denied for this session.
              if (typeof (w.gtag as unknown) === "function") {
                (w.gtag as (...a: unknown[]) => void)("consent", "update", {
                  ad_storage: "denied",
                  ad_user_data: "denied",
                  ad_personalization: "denied",
                  analytics_storage: "denied",
                });
              }
              // Re-enable ga-disable flags so any later consent grant can re-activate.
              w[`ga-disable-${GA4_ID}`] = true;
              w[`ga-disable-${GOOGLE_ADS_ID}`] = true;
              // Tell Pixel to revoke consent.
              const fbq = (window as { fbq?: (...a: unknown[]) => void }).fbq;
              if (typeof fbq === "function") {
                try {
                  fbq("consent", "revoke");
                } catch {
                  /* noop */
                }
              }
              // Clear stored consent → triggers CONSENT_EVENT → applyConsent()
              // clears analytics + marketing cookies and re-shows the banner.
              clearConsent();
              consentLog("Consent reset to default-denied via debug panel");
            }}
            className="mt-2 w-full rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-500 hover:bg-amber-500/20 transition"
          >
            Resetuj zgodę → default-denied
          </button>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  id,
  status,
  extra,
}: {
  label: string;
  id: string;
  status: Status;
  extra?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block h-2 w-2 rounded-full ${dot[status]}`} aria-hidden />
      <span className="w-20 shrink-0 text-foreground">{label}</span>
      <span className="shrink-0 text-muted-foreground">{id}</span>
      <span className="ml-auto shrink-0 text-foreground">{statusLabel[status]}</span>
      {extra && <span className="text-amber-500">{extra}</span>}
    </div>
  );
}
