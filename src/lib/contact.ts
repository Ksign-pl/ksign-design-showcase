/**
 * Central contact-info config. Values come from build-time env vars
 * (VITE_*) so they can be changed without editing code. Defaults preserve
 * the current production setup.
 *
 * To override, set in Workspace Settings → Build Secrets (or local .env):
 *   VITE_CONTACT_EMAIL          — e.g. hello@ksign.pl
 *   VITE_CONTACT_PHONE          — international format, e.g. +48000000000
 *   VITE_CONTACT_WHATSAPP_URL   — full wa.me / chat.whatsapp.com URL
 *   VITE_CALENDAR_SHORT_URL     — short call (~15 min) booking link
 *   VITE_CALENDAR_LONG_URL      — long call / workshop booking link
 *   VITE_CONTACT_HOURS          — human-readable office hours line
 */

const env = (import.meta.env ?? {}) as Record<string, string | undefined>;

const fallback = {
  email: "hello@ksign.pl",
  phone: "+48606576517",
  whatsappUrl: "https://wa.me/48606576517",
  calendarShortUrl: "https://cal.com/ksign/15min",
  calendarLongUrl: "https://cal.com/ksign/30min",
  hours: "Odpowiadam pon–pt, 9:00–17:00 (zwykle szybciej).",
};

function pick(key: string, def: string): string {
  const v = env[key];
  return v && v.trim().length > 0 ? v.trim() : def;
}

export const CONTACT = {
  email: pick("VITE_CONTACT_EMAIL", fallback.email),
  phone: pick("VITE_CONTACT_PHONE", fallback.phone),
  whatsappUrl: pick("VITE_CONTACT_WHATSAPP_URL", fallback.whatsappUrl),
  calendarShortUrl: pick("VITE_CALENDAR_SHORT_URL", fallback.calendarShortUrl),
  calendarLongUrl: pick("VITE_CALENDAR_LONG_URL", fallback.calendarLongUrl),
  hours: pick("VITE_CONTACT_HOURS", fallback.hours),
} as const;

/** Convenience: build a mailto: link with an optional subject. */
export function mailto(subject?: string): string {
  return subject
    ? `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT.email}`;
}
