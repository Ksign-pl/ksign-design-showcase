// Paleta marki klienta wyliczana z jednego koloru bazowego (brief lub domyślny
// dla typu strony). Czyste funkcje — używane w podglądzie i na publicznym demo.

import { getSiteType, type Brief } from "./schema";

export interface BrandPalette {
  /** Kolor bazowy marki (przyciski, akcenty). */
  base: string;
  /** Przyciemniona wersja — ciemne sekcje, stopka. */
  dark: string;
  /** Bardzo jasny odcień — tła sekcji. */
  soft: string;
  /** Delikatny odcień na obramowania/ikony. */
  tint: string;
  /** Kolor tekstu na kolorze bazowym (czarny lub biały wg kontrastu). */
  onBase: string;
  /** Kolor tekstu na ciemnym tle. */
  onDark: string;
  /** Neutralne tło strony klienta. */
  paper: string;
  /** Neutralny kolor tekstu. */
  ink: string;
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const to = (n: number) => clamp(n).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** Miesza kolor z bielą (amount > 0) lub czernią (amount < 0). */
function mix(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const target = amount >= 0 ? 255 : 0;
  const t = Math.abs(amount);
  return rgbToHex([r + (target - r) * t, g + (target - g) * t, b + (target - b) * t]);
}

/** Relatywna luminancja WCAG — do wyboru czytelnego koloru tekstu. */
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function readableOn(hex: string): string {
  return luminance(hex) > 0.42 ? "#141414" : "#FFFFFF";
}

export function resolveBrandColor(brief: Pick<Brief, "brandColor" | "siteType">): string {
  const custom = brief.brandColor?.trim();
  if (custom && /^#[0-9a-fA-F]{6}$/.test(custom)) return custom;
  return getSiteType(brief.siteType).defaultColor;
}

export function buildBrandPalette(baseColor: string): BrandPalette {
  const base = baseColor;
  const dark = mix(base, -0.72);
  return {
    base,
    dark,
    soft: mix(base, 0.93),
    tint: mix(base, 0.78),
    onBase: readableOn(base),
    onDark: readableOn(dark),
    paper: "#FCFAF6",
    ink: "#171512",
  };
}

/** Inicjały do tymczasowego znaku firmowego (1–2 litery). */
export function companyInitials(companyName: string): string {
  const words = companyName
    .trim()
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w));
  if (words.length === 0) return "•";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
