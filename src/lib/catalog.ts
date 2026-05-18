// Catalog of products available for online checkout (Stripe price IDs).
// Update here when adding new packages; UI + checkout page read from this.

export interface CatalogItem {
  priceId: string;
  name: string;
  amountPln: number;        // grosze converted to PLN integer for display
  recurring: boolean;
  blurb: string;
  features: string[];
  nextSteps: string[];
  /** Steps shown after brief is completed — "what happens next" timeline. */
  postBriefSteps?: string[];
  /** Estimated working-day range for the first preview. */
  deliveryDays?: [number, number];
  /** Items the client should prepare before work starts (shown after brief). */
  preparationChecklist?: string[];
  highlight?: boolean;
}

const DEFAULT_PREPARATION_CHECKLIST = [
  "Dostęp do domeny (panel rejestratora lub kontakt do administratora).",
  "Logo w wersji wektorowej (SVG/AI/PDF) lub w wysokiej rozdzielczości.",
  "Teksty na stronę — albo notatki, na bazie których je napiszemy.",
  "Zdjęcia / grafiki firmowe (jeśli mają być użyte).",
  "Dane kontaktowe i firmowe do stopki (adres, NIP, telefon).",
];

export function getPreparationChecklist(item: CatalogItem | undefined): string[] {
  return item?.preparationChecklist ?? DEFAULT_PREPARATION_CHECKLIST;
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
    nextSteps: [
      "Wypełnij krótki brief (logo, kolory, treści) — link niżej.",
      "W ciągu 24h odzywam się mailowo z planem realizacji.",
      "Pierwsza wersja strony w 3–7 dni roboczych.",
      "Maks. 2 rundy poprawek i publikacja na Twojej domenie.",
    ],
    postBriefSteps: [
      "Brief odebrany — analizuję treści i inspiracje (do 24h).",
      "Wysyłam mailem plan realizacji i potwierdzenie terminu.",
      "Pierwsza wersja strony w 3–7 dni roboczych.",
      "Runda uwag → publikacja na Twojej domenie.",
    ],
    deliveryDays: [3, 7],
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
    nextSteps: [
      "Wypełnij brief — opisz strukturę podstron i cele.",
      "Krótka rozmowa (15 min) z ustaleniem zakresu.",
      "Projekt + realizacja w 7–14 dni.",
      "Publikacja, szkolenie z edycji i podstawowe SEO.",
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
    nextSteps: [
      "Wypełnij brief — strategia, branding, inspiracje.",
      "Warsztat strategiczny (30–60 min).",
      "Branding + projekt + realizacja w 2–3 tygodnie.",
      "Publikacja, optymalizacja SEO i analityka.",
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
    nextSteps: [
      "Wypełnij brief — produkty, dostawy, płatności.",
      "Wybieramy platformę (Shoper / Woo / Shopify).",
      "Realizacja sklepu w 3–4 tygodnie.",
      "Konfiguracja integracji i szkolenie z obsługi.",
    ],
    preparationChecklist: [
      "Dostęp do domeny (panel rejestratora).",
      "Logo + materiały brandowe (kolory, font, ikony).",
      "Lista produktów: nazwy, opisy, ceny, warianty.",
      "Zdjęcia produktów (min. 1000×1000 px na białym tle).",
      "Konto/umowa z operatorem płatności (Stripe, Przelewy24, PayU).",
      "Dane do integracji wysyłki (InPost, kurierzy, własne strefy).",
      "Regulamin sklepu i polityka prywatności (lub zlecenie ich przygotowania).",
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
    nextSteps: [
      "Dostajesz mailowo dane kontaktowe do zgłoszeń.",
      "Pierwszy backup i audyt w ciągu 48h.",
      "Drobne zmiany do 1h/miesiąc — zgłaszasz mailem.",
      "Subskrypcję możesz anulować w każdej chwili.",
    ],
    preparationChecklist: [
      "Dostęp administratora do strony (CMS, hosting, FTP).",
      "Kontakt do osoby decyzyjnej po Twojej stronie.",
      "Lista bieżących integracji (analytics, formularze, płatności).",
      "Aktualna kopia zapasowa (jeśli posiadasz) — albo zlecimy nową.",
    ],
  },
};

export function getCatalogItem(priceId: string): CatalogItem | undefined {
  return CATALOG[priceId];
}
