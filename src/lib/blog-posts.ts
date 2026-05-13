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
  return [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
