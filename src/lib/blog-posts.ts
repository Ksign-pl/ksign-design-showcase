export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  author: string;
  content: string[]; // paragraphs (HTML allowed)
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ile-kosztuje-strona-one-page",
    title: "Ile kosztuje strona one-page? Cennik i co wchodzi w cenę [2026]",
    excerpt:
      "Ile kosztuje strona one-page w Polsce w 2026? Realne ceny, co wchodzi w zakres i kiedy warto zapłacić więcej — bez agencyjnego żargonu.",
    category: "Web design",
    date: "2026-06-04",
    readingTime: "5 min",
    author: "KSIGN",
    content: [
      "Jeśli szukasz konkretnych liczb — dobrze trafiłeś. Ten artykuł nie ma marketingowego „to zależy”. Ma tabelę cenową i uczciwe wyjaśnienie, co za te pieniądze dostajesz.",
      "<strong>Ile kosztuje strona one-page w Polsce? Przegląd rynku.</strong> Na rynku znajdziesz ceny w szerokim przedziale. Oto jak naprawdę wygląda segmentacja:",
      "<strong>Platformy DIY (Wix, Squarespace) — 0–50 zł/mies.</strong> Szablon, ograniczone SEO, Twój czas. Ryzyko: wygląd jak tysiąc innych stron.",
      "<strong>Freelancer „za 400 zł” — 300–800 zł.</strong> Szablon WordPress, brak wsparcia. Ryzyko: zniknie po projekcie, trudna aktualizacja.",
      "<strong>Freelancer doświadczony — 1 000–3 000 zł.</strong> Custom lub pół-custom, różna jakość. Ryzyko: bez gwarancji terminu, zmienna jakość.",
      "<strong>Studio web design (małe) — 1 500–5 000 zł.</strong> Custom design, projekt, kod. Ryzyko: kolejka, dłuższy czas.",
      "<strong>Agencja marketingowa — 5 000–15 000 zł.</strong> Custom + strategia + treści. Ryzyko: przerost formy nad treścią dla małej firmy.",
      "<strong>Gdzie jest KSIGN?</strong> Pakiet Start kosztuje <strong>999 zł netto</strong> — ze wszystkim, czego mała firma potrzebuje, bez tego, za co nie warto przepłacać.",
      "<strong>Co kosztuje naprawdę — i dlaczego.</strong> Cena strony one-page to suma kilku składowych: projekt graficzny, programowanie, mobile-first, podstawy SEO oraz hosting i domena.",
      "<strong>1. Projekt graficzny.</strong> To największy koszt i największa wartość. Dobry projekt buduje zaufanie w 5 sekund, wyróżnia Cię od konkurencji i prowadzi użytkownika do działania (CTA). Zły projekt (szablon) kosztuje Cię klientów, nawet jeśli zaoszczędziłeś 500 zł na wykonaniu.",
      "<strong>2. Programowanie (frontend).</strong> Zamiana projektu w działającą stronę. Dla one-page to 1–2 dni pracy developera. Strona zakodowana ręcznie (bez WordPress) ładuje się szybciej, jest bezpieczniejsza i łatwiejsza w utrzymaniu.",
      "<strong>3. Mobile-first.</strong> W 2026 strona, która nie działa idealnie na telefonie, nie istnieje. To nie opcja — to podstawa. Każda strona KSIGN jest projektowana od mobile w górę.",
      "<strong>4. SEO basics.</strong> Tytuły stron, meta opisy, alt texty, szybkość ładowania, struktura nagłówków. Nie zastąpi pełnej strategii SEO, ale sprawi, że Google w ogóle zauważy Twoją stronę.",
      "<strong>5. Hosting i domena.</strong> Sprawdź, czy cena strony zawiera hosting. U nas nie zawiera, ale podajemy rekomendacje i pomagamy skonfigurować (od ~30 zł/mies. na dobrym hostingu).",
      "<strong>Kiedy 999 zł wystarczy?</strong> Gdy prowadzisz lokalną firmę usługową (fryzjer, kosmetyczka, mechanik, prawnik, terapeuta), jesteś freelancerem lub konsultantem z jedną ofertą, budujesz markę osobistą lub potrzebujesz wizytówki online z numerem telefonu i formularzem — a sprzedaż odbywa się przez telefon, nie przez koszyk.",
      "<strong>Kiedy potrzebujesz więcej?</strong> Rozbudowana oferta (10+ usług z indywidualnymi opisami) → Business 2 499 zł. Blog lub sekcja artykułów → Business / Premium. Sprzedaż produktów online → E-commerce od 6 000 zł. Integracje z systemami (CRM, ERP, rezerwacje) → indywidualna wycena.",
      "<strong>Co dostajesz za 999 zł w KSIGN.</strong> Projekt graficzny custom (nie szablon, nie Canva), strona one-page z kluczowymi sekcjami (hero, oferta, o firmie, kontakt), mobile-first, szybkość ładowania, podstawy SEO, działający formularz kontaktowy z powiadomieniami mailowymi, certyfikat SSL w standardzie — gotowe w 3–7 dni roboczych.",
      "<strong>Czego nie zawiera:</strong> copywriting (możemy pomóc, dodatkowa wycena), hosting i domena (rekomendujemy i pomagamy skonfigurować), zdjęcia stockowe premium (możemy wykorzystać darmowe lub Twoje).",
      "<strong>Najczęstsze pytania o cenę.</strong> <em>Czy 999 zł to cena netto czy brutto?</em> Netto. Jeśli jesteś VAT-owcem — dolicz 23%. Jeśli nie — to Twoja cena końcowa. <em>Płatność w ratach?</em> 50% zaliczki przed startem, 50% po akceptacji projektu. <em>Czy cena się zmieni w trakcie?</em> Nie, jeśli zakres się nie zmienia. <em>Ile kosztuje utrzymanie?</em> Pakiet Opieka Tech — 99 zł/mies. (aktualizacje, backupy, monitoring, drobne poprawki treści).",
      "<strong>Jak zamówić:</strong> wejdź na ksign.pl i kliknij „Zamów stronę”, wypełnij krótki formularz (5 minut), a my skontaktujemy się w ciągu 24 godzin z potwierdzeniem i harmonogramem. Strona gotowa w 3–7 dni — bez kolejki, bez agencyjnych procedur.",
    ],
  },
  {
    slug: "ile-trwa-zrobienie-strony-internetowej",
    title: "Ile trwa zrobienie strony internetowej dla małej firmy? [2026]",
    excerpt:
      "Ile trwa zrobienie strony internetowej? Realny czas realizacji strony one-page, multi-page i e-commerce — bez ściemy i marketingowych obietnic.",
    category: "Web design",
    date: "2026-06-02",
    readingTime: "4 min",
    author: "KSIGN",
    content: [
      "Jedno z pierwszych pytań, jakie dostajemy od klientów: „No dobra, ale ile to wszystko potrwa?”. Dobre pytanie. I zasługuje na konkretną odpowiedź — nie marketingowe „to zależy”.",
      "<strong>Krótka wersja: od 3 do 90 dni.</strong> Czas realizacji strony internetowej zależy od jednej głównej zmiennej: złożoności projektu.",
      "<strong>Strona one-page — 3–7 dni.</strong> Dla małych firm, freelancerów i usługodawców.",
      "<strong>Strona wielostronicowa (5–10 podstron) — 2–4 tygodnie.</strong> Dla firm z rozbudowaną ofertą.",
      "<strong>Sklep e-commerce — 4–8 tygodni.</strong> Sprzedaż online, katalogi produktów.",
      "<strong>Portal / aplikacja webowa — 2–6 miesięcy.</strong> Zaawansowane funkcje, integracje.",
      "Jeśli prowadzisz małą firmę, fryzjernię, gabinet kosmetyczny, kancelarię czy studio fitnessu — najprawdopodobniej potrzebujesz strony one-page. I ona naprawdę może być gotowa w tydzień.",
      "<strong>Dlaczego strona one-page trwa tylko 3–7 dni?</strong> Nie ma tu żadnej magii. Krótki czas wynika z prostoty procesu.",
      "<strong>Dzień 1–2: Brief i projekt.</strong> Zbieramy informacje o Twojej firmie — co robisz, dla kogo, co Cię wyróżnia. Na tej podstawie przygotowujemy projekt graficzny.",
      "<strong>Dzień 2–3: Feedback i korekty.</strong> Pokazujemy projekt. Zwykle 1–2 rundy poprawek wystarczą. Większość klientów akceptuje projekt od razu.",
      "<strong>Dzień 3–5: Kodowanie.</strong> Strona one-page to ograniczona liczba sekcji. Dobry developer zaimplementuje ją w 1–2 dni.",
      "<strong>Dzień 5–7: Testy, treści, uruchomienie.</strong> Sprawdzamy działanie na telefonie, tablecie, komputerze. Wgrywamy Twoje zdjęcia i teksty. Uruchamiamy stronę.",
      "<strong>Co spowalnia realizację?</strong> W 90% przypadków opóźnienia nie leżą po stronie wykonawcy — leżą po stronie klienta.",
      "<strong>1. Brak gotowych treści.</strong> Jeśli w dniu zamówienia nie masz przygotowanych tekstów ani zdjęć, projekt staje. Przygotuj je przed startem lub poproś o copywriting w pakiecie.",
      "<strong>2. Zbyt wielu decydentów.</strong> „Muszę jeszcze pokazać wspólnikowi / mamie / znajomemu”. Każda dodatkowa osoba w procesie akceptacji dodaje 2–5 dni.",
      "<strong>3. Ciągłe zmiany zakresu.</strong> „A właściwie to chcę jeszcze galerię, formularz rejestracji i kalkulator”. Każda zmiana zakresu po starcie wydłuża czas realizacji.",
      "<strong>Jak tego uniknąć?</strong> Przygotuj się na rozmowę wstępną. Zbierz zdjęcia i podstawowy tekst o firmie. Zdecyduj, kto ma ostatnie słowo w akceptacji projektu.",
      "<strong>A co z agencjami, które mówią „6–12 tygodni”?</strong> Nie zawsze kłamią — dla dużych projektów to realistyczny czas. Ale dla małej firmy, która potrzebuje strony prezentacyjnej, taki czas to najczęściej wynik długich procedur wewnętrznych, kolejki projektów, nadmiernie rozbudowanego procesu discovery i pracy nad wieloma klientami jednocześnie. Małe studia działają szybciej — bo muszą. My robimy to samo.",
      "<strong>KSIGN: strona one-page gotowa w 3–7 dni.</strong> Specjalizujemy się w stronach dla małych firm. Nie bierzemy 20 projektów naraz. Każda strona dostaje pełną uwagę. <strong>Pakiet Start — 999 zł netto:</strong> projekt graficzny custom (nie szablon), strona one-page mobile-first, podstawy SEO wbudowane, gotowa w 3–7 dni roboczych.",
    ],
  },

  {
    slug: "strona-internetowa-dla-malej-firmy-od-czego-zaczac",
    title: "Strona internetowa dla małej firmy — od czego zacząć?",
    excerpt:
      "Przewodnik krok po kroku: co przygotować przed zleceniem strony, jakie treści zebrać i jak uniknąć najczęstszych błędów na starcie.",
    category: "Web design",
    date: "2026-05-02",
    readingTime: "6 min",
    author: "KSIGN",
    content: [
      "Większość małych firm zaczyna projekt strony od pytania <em>„ile to kosztuje?”</em>. To naturalne, ale dużo ważniejsze jest pytanie: <strong>co ta strona ma robić?</strong> Strona, która ma generować zapytania, wygląda inaczej niż wizytówka informacyjna.",
      "Zanim zlecisz projekt, zbierz trzy rzeczy: opis oferty (3–5 zdań), zdjęcia (firma, zespół, realizacje) i dane kontaktowe. To 80% materiałów, które realnie potrzebne są na one-page.",
      "Drugi etap to <strong>jasny cel konwersji</strong>. Czy klient ma zadzwonić, wypełnić formularz, czy umówić się na spotkanie? Każda sekcja na stronie powinna pchać użytkownika w stronę tego jednego działania.",
      "Najczęstsze błędy: zbyt długie teksty „o nas”, brak realnych zdjęć, ukryty kontakt i brak responsywności mobilnej. Mobile to dziś 70% ruchu — strona musi się świetnie ładować na telefonie.",
      "Pakiet Start KSIGN (999 zł netto) zakłada gotową strukturę, w którą wpinamy Twoje treści — to skraca realizację do 3–7 dni i eliminuje paraliż „nie wiem od czego zacząć”.",
    ],
  },
  {
    slug: "ile-kosztuje-strona-internetowa-w-2026",
    title: "Ile kosztuje strona internetowa w 2026?",
    excerpt:
      "Realne widełki cenowe: od one-page za 1 000 zł, przez sklep WooCommerce, po custom design. Co wpływa na koszt i na czym nie warto oszczędzać.",
    category: "Marketing",
    date: "2026-04-18",
    readingTime: "5 min",
    author: "KSIGN",
    content: [
      "Cena strony internetowej w Polsce w 2026 zaczyna się od ok. <strong>900 zł za prosty one-page</strong> i sięga 30 000+ zł za rozbudowane platformy z integracjami.",
      "Najważniejsze czynniki kosztu to: liczba podstron, indywidualny design vs. szablon, copywriting, integracje (CRM, płatności, rezerwacje) i SEO techniczne na starcie.",
      "<strong>Na czym warto oszczędzić:</strong> stockowe ikony, gotowe komponenty UI, brak animacji „dla animacji”. <strong>Na czym nie warto:</strong> zdjęcia (sesja własna podnosi konwersję o 20–40%), copywriting i hosting o przyzwoitym TTFB.",
      "W KSIGN trzymamy ceny na widełkach 999–6000 zł netto, bo pracujemy w powtarzalnym procesie i własnym systemie komponentów — bez ukrytych kosztów „od godziny”.",
    ],
  },
  {
    slug: "seo-dla-malej-firmy-5-rzeczy-ktore-mozesz-zrobic-sam",
    title: "SEO dla małej firmy — 5 rzeczy, które możesz zrobić sam",
    excerpt:
      "Praktyczna checklista: tytuły, meta opisy, Google Business Profile, prędkość strony i lokalne słowa kluczowe — bez płacenia agencji.",
    category: "SEO",
    date: "2026-03-30",
    readingTime: "7 min",
    author: "KSIGN",
    content: [
      "SEO brzmi groźnie, ale dla małej firmy 80% efektu daje pięć podstawowych ruchów, które możesz zrobić w jedno popołudnie.",
      "<strong>1. Tytuły i meta opisy.</strong> Każda podstrona powinna mieć unikalny <code>&lt;title&gt;</code> (do 60 znaków) i <code>&lt;meta description&gt;</code> (do 155 znaków) z lokalnym słowem kluczowym, np. „fryzjer Wrocław Krzyki”.",
      "<strong>2. Google Business Profile.</strong> Dla firm lokalnych to dziś ważniejsze niż klasyczne SEO. Uzupełnij adres, godziny, kategorie, zdjęcia i poproś klientów o opinie.",
      "<strong>3. Prędkość strony.</strong> Sprawdź <a href='https://pagespeed.web.dev' target='_blank' rel='noopener'>PageSpeed Insights</a>. Cel: LCP poniżej 2.5 s, CLS poniżej 0.1. Najczęstszy winowajca to za duże zdjęcia — używaj WebP/AVIF.",
      "<strong>4. Treści lokalne.</strong> Dodaj na stronie nazwę miasta/dzielnicy w nagłówkach H1/H2, opis dojazdu, mapę. To sygnał dla Google, że jesteś relewantny lokalnie.",
      "<strong>5. Linki z zaufanych miejsc.</strong> Lokalne katalogi (Panorama Firm, Yelp, branżowe stowarzyszenia) — to bezpłatny boost autorytetu domeny.",
      "Jeśli chcesz, żeby ktoś to za Ciebie skonfigurował — dodaj pakiet SEO do strony KSIGN.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
