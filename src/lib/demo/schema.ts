// Ksign Demo Generator — wspólne schematy i katalogi (client + server).
// Brak importów serwerowych: ten moduł trafia też do bundla przeglądarki.

import { z } from "zod";

export const SITE_TYPE_IDS = [
  "local",
  "b2b",
  "beauty",
  "construction",
  "gastro",
  "realestate",
] as const;

export type SiteTypeId = (typeof SITE_TYPE_IDS)[number];

export interface SiteType {
  id: SiteTypeId;
  label: string;
  /** Domyślny kolor marki (nadpisywany przez brandColor z briefu). */
  defaultColor: string;
  /** Krótki opis pomagający doradcy wybrać typ podczas rozmowy. */
  hint: string;
}

export const SITE_TYPES: SiteType[] = [
  {
    id: "local",
    label: "Usługi lokalne",
    defaultColor: "#1F8F87",
    hint: "Hydraulik, elektryk, serwis, warsztat",
  },
  {
    id: "b2b",
    label: "Firma premium B2B",
    defaultColor: "#1E3A5F",
    hint: "Doradztwo, produkcja, usługi dla firm",
  },
  {
    id: "beauty",
    label: "Beauty / zdrowie",
    defaultColor: "#A2626C",
    hint: "Salon, gabinet, fizjoterapia",
  },
  {
    id: "construction",
    label: "Budownictwo / remonty",
    defaultColor: "#B4551A",
    hint: "Ekipa remontowa, deweloper, instalacje",
  },
  {
    id: "gastro",
    label: "Gastronomia",
    defaultColor: "#7A3B2E",
    hint: "Restauracja, catering, kawiarnia",
  },
  {
    id: "realestate",
    label: "Nieruchomości",
    defaultColor: "#2E5339",
    hint: "Biuro nieruchomości, zarządzanie najmem",
  },
];

export function getSiteType(id: string): SiteType {
  return SITE_TYPES.find((t) => t.id === id) ?? SITE_TYPES[0];
}

export const PACKAGE_IDS = ["start", "business", "premium", "ecommerce"] as const;

export type PackageId = (typeof PACKAGE_IDS)[number];

export interface DemoPackage {
  id: PackageId;
  name: string;
  pricePln: number;
  description: string;
  /** Nazwa zmiennej środowiskowej ze Stripe price ID dla tego pakietu. */
  stripePriceEnv: string;
  /** Czy publiczne demo ma osobne route'y (Home/Oferta/Kontakt) zamiast kotwic. */
  multiPage: boolean;
}

export const DEMO_PACKAGES: DemoPackage[] = [
  {
    id: "start",
    name: "Start",
    pricePln: 999,
    description: "Prosta strona one-page",
    stripePriceEnv: "STRIPE_PRICE_ID_START",
    multiPage: false,
  },
  {
    id: "business",
    name: "Business",
    pricePln: 2499,
    description: "Strona z 3–5 podstronami",
    stripePriceEnv: "STRIPE_PRICE_ID_BUSINESS",
    multiPage: true,
  },
  {
    id: "premium",
    name: "Premium",
    pricePln: 4999,
    description: "Strategia, copywriting, branding i animacje",
    stripePriceEnv: "STRIPE_PRICE_ID_PREMIUM",
    multiPage: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    pricePln: 6000,
    description: "Sklep Shoper / WooCommerce / Shopify",
    stripePriceEnv: "STRIPE_PRICE_ID_ECOMMERCE",
    multiPage: false,
  },
];

export function getPackage(id: string): DemoPackage {
  return DEMO_PACKAGES.find((p) => p.id === id) ?? DEMO_PACKAGES[0];
}

export function formatPricePln(price: number): string {
  return `${price.toLocaleString("pl-PL")} zł`;
}

/** Brief wypełniany przez doradcę podczas rozmowy z klientem. */
export const BriefSchema = z.object({
  companyName: z.string().trim().min(2, "Podaj nazwę firmy").max(120),
  mainService: z.string().trim().min(3, "Opisz główną usługę").max(300),
  targetAudience: z.string().trim().min(3, "Opisz grupę docelową").max(300),
  city: z.string().trim().min(2, "Podaj miasto lub obszar").max(120),
  clientEmail: z.string().trim().email("Podaj poprawny e-mail klienta").max(254),
  advisorName: z.string().trim().max(120).optional().default(""),
  logoUrl: z.string().url().max(600).optional().or(z.literal("")).default(""),
  brandColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Kolor w formacie #RRGGBB")
    .optional()
    .or(z.literal(""))
    .default(""),
  siteType: z.enum(SITE_TYPE_IDS),
  packageId: z.enum(PACKAGE_IDS),
});

export type Brief = z.infer<typeof BriefSchema>;

/** Ściśle walidowana struktura treści demo (generowana przez AI lub fallback z briefu). */
export const DemoContentSchema = z
  .object({
    heroTitle: z.string().trim().min(3).max(90),
    heroSubtitle: z.string().trim().min(10).max(260),
    cta: z.string().trim().min(2).max(40),
    aboutText: z.string().trim().min(40).max(700),
    services: z
      .array(
        z
          .object({
            title: z.string().trim().min(2).max(60),
            description: z.string().trim().min(10).max(220),
          })
          .strict(),
      )
      .length(3),
    trustPoints: z.array(z.string().trim().min(3).max(120)).length(3),
    offerIntro: z.string().trim().min(20).max(400),
    contactHeading: z.string().trim().min(3).max(90),
  })
  .strict();

export type DemoContent = z.infer<typeof DemoContentSchema>;

export type DemoStatus = "draft" | "sent" | "paid" | "expired";

/** Publiczny kształt dema serwowany na /d/$slug — bez danych doradcy. */
export interface PublicDemo {
  slug: string;
  companyName: string;
  mainService: string;
  targetAudience: string;
  city: string;
  siteType: SiteTypeId;
  packageId: PackageId;
  brandColor: string | null;
  logoUrl: string | null;
  content: DemoContent | null;
  status: DemoStatus;
}
