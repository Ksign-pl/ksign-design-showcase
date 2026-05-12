import { useEffect } from "react";
import { CONSENT_EVENT, getConsent } from "@/lib/consent";

// Tracking IDs. Override per-environment via VITE_GA4_ID / VITE_META_PIXEL_ID.
const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined) || "G-GQT4Y20Z0B";
const META_PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || "";
const GOOGLE_ADS_ID = (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined) || "AW-18158941733";
const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined) || "GTM-MHKNMPZ3";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: (...args: unknown[]) => void };
    _fbq: unknown;
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

function applyConsent() {
  const c = getConsent();
  const analytics = c?.analytics ? "granted" : "denied";
  const marketing = c?.marketing ? "granted" : "denied";

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: analytics,
      ad_storage: marketing,
      ad_user_data: marketing,
      ad_personalization: marketing,
    });
  }

  if (c?.analytics || c?.marketing) loadGTM();
  if (c?.analytics) loadGA4();
  if (c?.marketing) {
    loadGoogleAds();
    loadMetaPixel();
  }
}

export function ConsentScripts() {
  useEffect(() => {
    initConsentMode();
    applyConsent();
    const handler = () => applyConsent();
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);
  return null;
}
