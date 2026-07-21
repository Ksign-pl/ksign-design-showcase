// Deterministyczne treści podglądu budowane z briefu — zanim doradca kliknie
// „Generuj treści demo". Zero wywołań AI; czysta funkcja używana po obu stronach.

import type { Brief, DemoContent, SiteTypeId } from "./schema";

interface TypeCopy {
  heroTitle: (b: Brief) => string;
  heroSubtitle: (b: Brief) => string;
  cta: string;
  aboutText: (b: Brief) => string;
  services: (b: Brief) => Array<{ title: string; description: string }>;
  trustPoints: (b: Brief) => string[];
  offerIntro: (b: Brief) => string;
  contactHeading: (b: Brief) => string;
}

const short = (value: string, max: number) =>
  value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;

const COPY: Record<SiteTypeId, TypeCopy> = {
  local: {
    heroTitle: (b) => short(`${b.mainService} — ${b.city}`, 90),
    heroSubtitle: (b) =>
      `Konkretna wycena, ustalony termin i czysto po robocie. Działamy dla ${b.targetAudience.toLowerCase()} w ${b.city} i okolicach.`,
    cta: "Zamów wycenę",
    aboutText: (b) =>
      `${b.companyName} to lokalna firma z ${b.city}. Zajmujemy się: ${b.mainService.toLowerCase()}. Pracujemy na sprawdzonych materiałach, trzymamy się ustaleń i odbieramy telefon — także po zakończeniu zlecenia.`,
    services: (b) => [
      {
        title: short(b.mainService, 60),
        description: "Pełen zakres prac z wyceną przed startem i ustalonym terminem realizacji.",
      },
      {
        title: "Pilne interwencje",
        description: `Szybki dojazd na terenie: ${short(b.city, 60)}. Jasna stawka bez ukrytych kosztów.`,
      },
      {
        title: "Doradztwo i przegląd",
        description: "Sprawdzimy stan, doradzimy zakres i podpowiemy, co można zrobić taniej.",
      },
    ],
    trustPoints: (b) => [
      `Dojazd i wycena na terenie: ${short(b.city, 80)}`,
      "Termin potwierdzamy przed rozpoczęciem prac",
      "Faktura VAT i gwarancja na wykonaną pracę",
    ],
    offerIntro: (b) =>
      `Zakres usług dopasowujemy do potrzeb — od drobnych zleceń po kompleksowe realizacje. Ceny ustalamy przed startem, bez niespodzianek. Obszar działania: ${b.city} i okolice.`,
    contactHeading: () => "Umów wycenę",
  },
  b2b: {
    heroTitle: (b) => short(`${b.mainService} dla wymagających firm`, 90),
    heroSubtitle: (b) =>
      `${b.companyName} wspiera ${b.targetAudience.toLowerCase()} — od analizy potrzeb po wdrożenie i mierzalne rezultaty. Obszar działania: ${b.city}.`,
    cta: "Umów konsultację",
    aboutText: (b) =>
      `${b.companyName} specjalizuje się w obszarze: ${b.mainService.toLowerCase()}. Pracujemy w ustalonym procesie: audyt, plan działania, wdrożenie i raport z efektów. Klienci wybierają nas za terminowość i partnerską komunikację.`,
    services: (b) => [
      {
        title: "Analiza i strategia",
        description: "Zaczynamy od danych: audyt sytuacji, cele i plan działania z terminami.",
      },
      {
        title: short(b.mainService, 60),
        description: "Realizacja w ustalonym zakresie, z jedną osobą kontaktową po naszej stronie.",
      },
      {
        title: "Wsparcie i rozwój",
        description: "Stała opieka po wdrożeniu: raporty, rekomendacje i szybkie odpowiedzi.",
      },
    ],
    trustPoints: () => [
      "Umowa i NDA przed rozpoczęciem współpracy",
      "Jedna osoba kontaktowa i stały rytm raportów",
      "Rozliczenie za ustalony zakres — bez niespodzianek",
    ],
    offerIntro: (b) =>
      `Współpracę zaczynamy od rozmowy o celach. Potem przedstawiamy zakres, harmonogram i wycenę. ${b.companyName} pracuje z klientami z ${b.city} i całej Polski.`,
    contactHeading: () => "Porozmawiajmy o współpracy",
  },
  beauty: {
    heroTitle: (b) => short(`${b.mainService} w ${b.city}`, 90),
    heroSubtitle: (b) =>
      `Zadbaj o siebie w miejscu, które traktuje Cię indywidualnie. ${b.companyName} — profesjonalne zabiegi dla ${b.targetAudience.toLowerCase()}.`,
    cta: "Zarezerwuj wizytę",
    aboutText: (b) =>
      `${b.companyName} to gabinet w ${b.city}, w którym najważniejszy jest efekt i komfort wizyty. Pracujemy na certyfikowanych produktach, a każdy zabieg poprzedza krótka konsultacja i plan dopasowany do potrzeb.`,
    services: (b) => [
      {
        title: short(b.mainService, 60),
        description: "Zabieg dopasowany do potrzeb — z konsultacją i zaleceniami po wizycie.",
      },
      {
        title: "Konsultacja i plan",
        description: "Ocena stanu i szczery plan działania: co, w jakiej kolejności i za ile.",
      },
      {
        title: "Pielęgnacja domowa",
        description: "Dobór produktów i wskazówki, dzięki którym efekt utrzymuje się dłużej.",
      },
    ],
    trustPoints: () => [
      "Certyfikowane produkty i sterylne stanowisko pracy",
      "Zapisy online i przypomnienia o wizycie",
      "Indywidualne podejście — bez zabiegów „z automatu”",
    ],
    offerIntro: (b) =>
      `Cennik jest jawny, a zakres zabiegu zawsze ustalamy przed rozpoczęciem. Nowym klientkom i klientom pomagamy dobrać pierwszy zabieg podczas krótkiej konsultacji w ${b.city}.`,
    contactHeading: () => "Zarezerwuj termin",
  },
  construction: {
    heroTitle: (b) => short(`${b.mainService}. Terminowo i z gwarancją.`, 90),
    heroSubtitle: (b) =>
      `${b.companyName} realizuje prace dla ${b.targetAudience.toLowerCase()} w ${b.city} i okolicach. Harmonogram, budżet i zakres — wszystko na piśmie.`,
    cta: "Poproś o wycenę",
    aboutText: (b) =>
      `${b.companyName} to ekipa, która kończy budowy w terminie. Specjalizacja: ${b.mainService.toLowerCase()}. Przed startem dostajesz harmonogram i kosztorys, w trakcie — zdjęcia z postępów, po zakończeniu — protokół odbioru i gwarancję.`,
    services: (b) => [
      {
        title: short(b.mainService, 60),
        description: "Kompleksowa realizacja z kosztorysem i harmonogramem przed startem.",
      },
      {
        title: "Wykończenia pod klucz",
        description:
          "Od stanu surowego po gotowe wnętrze — jeden wykonawca, jedna odpowiedzialność.",
      },
      {
        title: "Nadzór i doradztwo",
        description: "Pomagamy uniknąć kosztownych błędów: materiały, technologia, kolejność prac.",
      },
    ],
    trustPoints: () => [
      "Kosztorys i harmonogram na piśmie przed startem",
      "Zdjęcia z postępu prac co tydzień",
      "Protokół odbioru i gwarancja na roboty",
    ],
    offerIntro: (b) =>
      `Wyceniamy na podstawie wizji lokalnej lub dokumentacji. Odpowiadamy w 48 h roboczych. Obszar działania: ${b.city} i okolice — większe realizacje także dalej.`,
    contactHeading: () => "Zamów bezpłatną wycenę",
  },
  gastro: {
    heroTitle: (b) => short(`${b.companyName} — ${b.city}`, 90),
    heroSubtitle: (b) =>
      `${short(b.mainService, 140)}. Sezonowe składniki, stała jakość i obsługa, do której chce się wracać.`,
    cta: "Zarezerwuj stolik",
    aboutText: (b) =>
      `${b.companyName} to miejsce w ${b.city} stworzone z myślą o ${b.targetAudience.toLowerCase()}. Nasza specjalność: ${b.mainService.toLowerCase()}. Gotujemy na świeżych składnikach i pilnujemy, żeby każda wizyta smakowała tak samo dobrze.`,
    services: (b) => [
      {
        title: "Menu",
        description: `Nasza specjalność: ${short(b.mainService, 120)}. Karta zmienia się z sezonem.`,
      },
      {
        title: "Rezerwacje i wydarzenia",
        description: "Kolacje firmowe, urodziny, spotkania — przygotujemy menu pod Twoją okazję.",
      },
      {
        title: "Zamówienia na wynos",
        description: "Odbiór osobisty w umówionej godzinie. Pakujemy tak, żeby dojechało idealne.",
      },
    ],
    trustPoints: (b) => [
      "Świeże, sezonowe składniki od lokalnych dostawców",
      `Dogodna lokalizacja: ${short(b.city, 80)}`,
      "Rezerwacja online i potwierdzenie w 5 minut",
    ],
    offerIntro: () =>
      "Zajrzyj do menu i wybierz coś dla siebie. Grupy powyżej 6 osób prosimy o wcześniejszą rezerwację — zadbamy o wspólny stół i sprawną obsługę.",
    contactHeading: () => "Rezerwacje i kontakt",
  },
  realestate: {
    heroTitle: (b) => short(`${b.mainService} — ${b.city}`, 90),
    heroSubtitle: (b) =>
      `${b.companyName} prowadzi ${b.targetAudience.toLowerCase()} przez cały proces: od wyceny i przygotowania oferty po bezpieczną umowę.`,
    cta: "Umów rozmowę",
    aboutText: (b) =>
      `${b.companyName} działa na rynku nieruchomości w ${b.city}. Zakres: ${b.mainService.toLowerCase()}. Pracujemy na sprawdzonych danych z rynku, przygotowujemy nieruchomości do sprzedaży i negocjujemy w interesie klienta — nie „na szybko".`,
    services: (b) => [
      {
        title: short(b.mainService, 60),
        description: "Pełna obsługa transakcji: wycena, oferta, prezentacje, negocjacje, umowa.",
      },
      {
        title: "Przygotowanie oferty",
        description: "Home staging, sesja zdjęciowa i opis, który wyróżnia ofertę na portalach.",
      },
      {
        title: "Bezpieczna transakcja",
        description: "Weryfikacja stanu prawnego i wsparcie do momentu przekazania kluczy.",
      },
    ],
    trustPoints: (b) => [
      `Znamy rynek lokalny: ${short(b.city, 80)}`,
      "Jasna umowa i prowizja ustalona z góry",
      "Raport z działań co tydzień — wiesz, co się dzieje",
    ],
    offerIntro: (b) =>
      `Zaczynamy od bezpłatnej rozmowy i wyceny nieruchomości. Potem przedstawiamy plan sprzedaży lub poszukiwań — z konkretnymi terminami. Działamy w ${b.city} i okolicach.`,
    contactHeading: () => "Bezpłatna wycena",
  },
};

export function buildFallbackContent(brief: Brief): DemoContent {
  const copy = COPY[brief.siteType];
  return {
    heroTitle: copy.heroTitle(brief),
    heroSubtitle: short(copy.heroSubtitle(brief), 260),
    cta: copy.cta,
    aboutText: short(copy.aboutText(brief), 700),
    services: copy.services(brief).map((s) => ({
      title: short(s.title, 60),
      description: short(s.description, 220),
    })),
    trustPoints: copy.trustPoints(brief).map((t) => short(t, 120)),
    offerIntro: short(copy.offerIntro(brief), 400),
    contactHeading: short(copy.contactHeading(brief), 90),
  };
}
