// RODO / ePrivacy consent management
// Stored in localStorage. Categories: necessary (always), analytics, marketing.

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: number;
};

const STORAGE_KEY = "ksign_consent_v1";
const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "ksign:consent-change";

export function isConsentDebug(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).get("consent-debug") === "1") {
      localStorage.setItem("ksign_consent_debug", "1");
    }
    return localStorage.getItem("ksign_consent_debug") === "1";
  } catch {
    return false;
  }
}

export function consentLog(...args: unknown[]) {
  if (isConsentDebug()) console.log("%c[consent]", "color:#a3e635;font-weight:bold", ...args);
}

export const DEFAULT_DENIED: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(partial: { analytics: boolean; marketing: boolean }) {
  if (typeof window === "undefined") return;
  const next: ConsentState = {
    necessary: true,
    analytics: partial.analytics,
    marketing: partial.marketing,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  consentLog("saveConsent →", { analytics: next.analytics, marketing: next.marketing });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  consentLog("clearConsent");
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ksign:open-consent"));
}
