// Catalog of products available for online checkout (Stripe price IDs).
// Update here when adding new packages; UI + checkout page read from this.

export interface CatalogItem {
  priceId: string;
  name: string;
  amountPln: number;        // grosze converted to PLN integer for display
  recurring: boolean;
  blurb: string;
  features: string[];
  highlight?: boolean;
}

export const CATALOG: Record<string, CatalogItem> = {
  pakiet_start_one_time: {
    priceId: "pakiet_start_one_time",
    name: "Pakiet Start",
    amountPln: 999,
    recurring: false,
    blurb: "Prosta strona one-page, która wygląda profesjonalnie.",
    features: [
      "Strona one-page",
      "Sekcja HERO + oferta + kontakt",
      "Wersja mobilna i podstawowe SEO",
      "Realizacja 3–7 dni roboczych",
    ],
    highlight: true,
  },
  pakiet_business_one_time: {
    priceId: "pakiet_business_one_time",
    name: "Pakiet Business",
    amountPln: 2499,
    recurring: false,
    blurb: "Rozbudowana strona firmowa do 5 podstron.",
    features: [
      "Do 5 podstron",
      "Sekcja zespołu i realizacji",
      "Formularze + integracja z mailem",
      "SEO on-page + Google Analytics",
      "Realizacja 7–14 dni",
    ],
  },
  pakiet_premium_one_time: {
    priceId: "pakiet_premium_one_time",
    name: "Pakiet Premium",
    amountPln: 4999,
    recurring: false,
    blurb: "Strategia, copy, branding, animacje.",
    features: [
      "Strategia i copywriting",
      "Branding (logo + paleta)",
      "Animacje i mikrointerakcje",
      "Pełne SEO on-page",
      "Realizacja 2–3 tygodnie",
    ],
  },
  pakiet_ecommerce_one_time: {
    priceId: "pakiet_ecommerce_one_time",
    name: "Pakiet E-commerce",
    amountPln: 6000,
    recurring: false,
    blurb: "Sklep z płatnościami i dostawami.",
    features: [
      "Sklep Shoper / WooCommerce / Shopify",
      "Konfiguracja płatności i wysyłek",
      "Karty produktów + koszyk",
      "Integracje z analityką",
      "Realizacja 3–4 tygodnie",
    ],
  },
  opieka_miesiac: {
    priceId: "opieka_miesiac",
    name: "Opieka techniczna",
    amountPln: 99,
    recurring: true,
    blurb: "Aktualizacje, backup, drobne zmiany.",
    features: [
      "Aktualizacje + monitoring",
      "Kopie zapasowe",
      "Drobne zmiany do 1h/mies.",
      "Priorytetowe wsparcie",
    ],
  },
};

export function getCatalogItem(priceId: string): CatalogItem | undefined {
  return CATALOG[priceId];
}
