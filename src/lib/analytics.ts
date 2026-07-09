/**
 * Cienka warstwa event-tracking — pcha zdarzenia do dataLayer (GTM/GA4)
 * i lustruje je do fbq (Meta) gdy dostępne. Wszystko przechodzi przez
 * Consent Mode v2 skonfigurowany w ConsentScripts.tsx, więc zdarzenia
 * są automatycznie blokowane, jeżeli użytkownik odrzucił zgody.
 *
 * W GTM utwórz triggery po nazwach: `cta_click`, `form_submit`, `form_error`.
 */

type Primitive = string | number | boolean | null | undefined;
type EventParams = Record<string, Primitive>;

function push(event: string, params: EventParams) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    // Duplikuj do GA4 gdy gtag dostępny (Consent Mode zdecyduje czy wyśle).
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  } catch {
    /* noop — analytics nigdy nie może wywrócić UI */
  }
}

/** Kliknięcie CTA (przycisk / link do zamówienia / kontaktu). */
export function trackCta(params: {
  location: string; // np. "hero", "pakiet_start_card", "sticky_bar"
  label: string;    // widoczny tekst przycisku
  href?: string;    // cel: "/checkout", "#kontakt"
  variant?: string; // "primary" | "secondary"
}) {
  push("cta_click", {
    cta_location: params.location,
    cta_label: params.label,
    cta_href: params.href ?? null,
    cta_variant: params.variant ?? "primary",
  });
  // Meta lustro: traktujemy jako Lead intent (bez PII).
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", "CtaClick", {
        location: params.location,
        label: params.label,
      });
    } catch { /* noop */ }
  }
}

/** Udana wysyłka formularza kontaktowego. */
export function trackFormSubmit(params: {
  form: string;          // np. "kontakt_final_cta"
  package?: string;
  marketingConsent?: boolean;
}) {
  push("form_submit", {
    form_name: params.form,
    form_package: params.package ?? null,
    form_marketing_consent: params.marketingConsent ?? null,
  });
}

/** Błąd walidacji formularza (nie wysłano). */
export function trackFormError(params: {
  form: string;
  field?: string;   // które pole (jeśli wiemy)
  reason: string;   // krótki, techniczny powód: "rodo_required", "email_invalid" itd.
  message?: string; // treść komunikatu pokazanego użytkownikowi
}) {
  push("form_error", {
    form_name: params.form,
    form_field: params.field ?? null,
    form_error_reason: params.reason,
    form_error_message: params.message ?? null,
  });
}
