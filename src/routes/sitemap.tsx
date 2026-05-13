import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

type SitemapLink = {
  to: string;
  label: string;
  description: string;
  hash?: string;
};

const PRIMARY_LINKS: SitemapLink[] = [
  { to: "/", label: "Strona główna", description: "Premium web design dla małych firm — pakiet startowy 999 zł netto." },
  { to: "/blog", label: "Blog", description: "Artykuły o web design, SEO i marketingu online." },
];

const BLOG_LINKS: SitemapLink[] = BLOG_POSTS.map((p) => ({
  to: `/blog/${p.slug}`,
  label: p.title,
  description: p.excerpt,
}));

const HOME_SECTIONS: SitemapLink[] = [
  { to: "/", hash: "oferta", label: "Oferta / Manifest", description: "Nasze podejście do projektowania stron." },
  { to: "/", hash: "pakiet", label: "Pakiet startowy", description: "Co wchodzi w skład strony za 999 zł netto." },
  { to: "/", hash: "rozbudowa", label: "Dodatki i rozbudowa", description: "Rozszerzenia i opcje dodatkowe." },
  { to: "/", hash: "proces", label: "Proces", description: "Jak wygląda współpraca krok po kroku." },
  { to: "/", hash: "realizacje", label: "Realizacje / Cennik", description: "Przykłady wdrożeń i przejrzyste ceny." },
  { to: "/", hash: "faq", label: "FAQ", description: "Najczęściej zadawane pytania." },
  { to: "/", hash: "kontakt", label: "Kontakt", description: "Napisz do nas: hello@ksign.pl" },
];

const LEGAL_LINKS: SitemapLink[] = [
  { to: "/polityka-prywatnosci", label: "Polityka prywatności", description: "Jak przetwarzamy Twoje dane osobowe (RODO)." },
  { to: "/polityka-cookies", label: "Polityka cookies", description: "Informacje o plikach cookies i zgodach." },
];

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Mapa witryny — KSIGN" },
      { name: "description", content: "Pełna mapa witryny KSIGN: strona główna, sekcje oferty, cennik i dokumenty prawne." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Mapa witryny — KSIGN" },
      { property: "og:description", content: "Wszystkie strony i sekcje serwisu KSIGN w jednym miejscu." },
      { property: "og:image", content: "https://ksign.pl/og-image.jpg" },
      { property: "og:url", content: "https://ksign.pl/sitemap" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "KSIGN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mapa witryny — KSIGN" },
      { name: "twitter:description", content: "Wszystkie strony i sekcje serwisu KSIGN w jednym miejscu." },
      { name: "twitter:image", content: "https://ksign.pl/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ksign.pl/sitemap" }],
  }),
  component: SitemapPage,
});

function LinkRow({ item }: { item: SitemapLink }) {
  const href = item.hash ? `${item.to === "/" ? "" : item.to}#${item.hash}` : item.to;
  return (
    <li className="border-b border-border py-3 last:border-b-0">
      <Link
        to={item.to}
        hash={item.hash}
        className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
      >
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {item.label}
        </span>
        <span className="text-sm text-muted-foreground sm:text-right sm:max-w-md">
          {item.description}
        </span>
        <span className="sr-only">{href}</span>
      </Link>
    </li>
  );
}

function Section({ title, items }: { title: string; items: SitemapLink[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      <ul>
        {items.map((it) => (
          <LinkRow key={`${it.to}${it.hash ?? ""}`} item={it} />
        ))}
      </ul>
    </section>
  );
}

function SitemapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Mapa witryny
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Wszystkie strony i sekcje serwisu KSIGN w jednym miejscu. Wersja XML dla
            wyszukiwarek dostępna jest pod adresem{" "}
            <a
              href="/sitemap.xml"
              className="underline underline-offset-4 hover:text-foreground"
            >
              /sitemap.xml
            </a>
            .
          </p>
        </header>

        <div className="space-y-6">
          <Section title="Strony" items={PRIMARY_LINKS} />
          <Section title="Sekcje strony głównej" items={HOME_SECTIONS} />
          <Section title="Wpisy bloga" items={BLOG_LINKS} />
          <Section title="Dokumenty prawne" items={LEGAL_LINKS} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
