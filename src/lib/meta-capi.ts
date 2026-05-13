// Client helper for Meta Pixel + Conversions API with deduplication.
//
// Always pass the SAME event_id to fbq() and to our /api/public/meta-capi route
// — Meta uses it to dedupe browser-side and server-side events.
//
// PII (email/phone) is sent in plaintext over HTTPS to our own server route,
// which hashes it (SHA-256) before forwarding to Meta. Hashing on the client
// would bypass our server-side normalization and prevent _fbp/_fbc enrichment.

import { getConsent } from "@/lib/consent";

export type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  externalId?: string;
};

export type MetaEventName =
  | "PageView"
  | "Lead"
  | "Contact"
  | "CompleteRegistration"
  | "ViewContent"
  | "InitiateCheckout"
  | "Purchase"
  | "Subscribe";

export type TrackOptions = {
  userData?: MetaUserData;
  customData?: Record<string, string | number | boolean>;
};

function newEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function trackMetaEvent(eventName: MetaEventName, opts: TrackOptions = {}) {
  // Respect RODO marketing consent.
  const consent = getConsent();
  if (!consent?.marketing) return;

  const eventId = newEventId();

  // Browser-side via Pixel (uses _fbp/_fbc cookies automatically).
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", eventName, opts.customData ?? {}, { eventID: eventId });
    }
  } catch (err) {
    console.warn("fbq track failed", err);
  }

  // Server-side via CAPI (PII hashed in the route handler).
  try {
    await fetch("/api/public/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // forward _fbp/_fbc cookies
      keepalive: true,
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        userData: opts.userData,
        customData: opts.customData,
      }),
    });
  } catch (err) {
    console.warn("CAPI request failed", err);
  }
}
