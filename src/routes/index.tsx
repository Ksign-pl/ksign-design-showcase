import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { StickyBar } from "@/components/site/StickyBar";
import { Manifest } from "@/components/site/Manifest";
import { Moodboard } from "@/components/site/Moodboard";
import { PackageStart } from "@/components/site/PackageStart";
import { StartSlider } from "@/components/site/StartSlider";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { BigNumbers } from "@/components/site/BigNumbers";
import { AddonsSlider } from "@/components/site/AddonsSlider";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { BlogPreview } from "@/components/site/BlogPreview";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSIGN — Premium web design dla małych firm" },
      {
        name: "description",
        content:
          "Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online.",
      },
      { property: "og:title", content: "KSIGN — Premium web design dla małych firm" },
      {
        property: "og:description",
        content:
          "Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ksign.pl/" },
      { property: "og:image", content: "https://ksign.pl/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: "KSIGN — premium web design, strona za 999 zł netto" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KSIGN — Premium web design dla małych firm" },
      {
        name: "twitter:description",
        content:
          "Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online.",
      },
      { name: "twitter:image", content: "https://ksign.pl/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ksign.pl/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              "@id": "https://ksign.pl/#faq",
              mainEntity: [
                {
                  q: "Czy za 999 zł dostanę sklep internetowy?",
                  a: "Nie. Pakiet Start obejmuje prostą stronę one-page. Sklep internetowy wyceniamy osobno.",
                },
                {
                  q: "Czy strona będzie responsywna?",
                  a: "Tak. Strona będzie dopasowana do telefonu, tabletu i komputera.",
                },
                {
                  q: "Ile trwa realizacja?",
                  a: "Standardowo od 3 do 7 dni roboczych po otrzymaniu materiałów.",
                },
                {
                  q: "Czy pomagacie z tekstami?",
                  a: "Tak. Pomagamy uporządkować podstawowe treści i ułożyć je sprzedażowo.",
                },
                {
                  q: "Czy mogę później rozbudować stronę?",
                  a: "Tak. Pakiet Start może być bazą do większej strony, SEO, bloga, sklepu lub automatyzacji.",
                },
                { q: "Czy cena 999 zł jest netto?", a: "Tak. Cena pakietu Start to 999 zł netto." },
              ].map((x) => ({
                "@type": "Question",
                name: x.q,
                acceptedAnswer: { "@type": "Answer", text: x.a },
              })),
            },
            {
              "@type": ["LocalBusiness", "ProfessionalService"],
              "@id": "https://ksign.pl/#business",
              name: "KSIGN",
              description:
                "Premium strony internetowe dla małych firm. Pakiet Start — one-page za 999 zł netto, realizacja 3–7 dni roboczych.",
              url: "https://ksign.pl/",
              image: "https://ksign.pl/og-image.jpg",
              email: CONTACT.email,
              priceRange: "999–6000 PLN",
              areaServed: { "@type": "Country", name: "Poland" },
              address: { "@type": "PostalAddress", addressCountry: "PL" },
              sameAs: ["https://www.facebook.com/ksign2026", "https://www.instagram.com/ksign.pl/"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: CONTACT.email,
                  availableLanguage: ["Polish", "English"],
                  areaServed: "PL",
                },
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: CONTACT.email,
                  availableLanguage: ["Polish", "English"],
                  areaServed: "PL",
                },
              ],
            },
            {
              "@type": "Service",
              "@id": "https://ksign.pl/#pakiet-start",
              name: "Pakiet Start — strona one-page",
              serviceType: "Web design",
              provider: { "@id": "https://ksign.pl/#business" },
              areaServed: { "@type": "Country", name: "Poland" },
              description:
                "Nowoczesna, responsywna strona one-page w premium designie. Realizacja 3–7 dni roboczych.",
              offers: {
                "@type": "Offer",
                price: "999",
                priceCurrency: "PLN",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  price: "999",
                  priceCurrency: "PLN",
                  valueAddedTaxIncluded: false,
                },
                availability: "https://schema.org/InStock",
                url: "https://ksign.pl/#pakiet",
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Strona główna",
                  item: "https://ksign.pl/",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const GRAIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
)}`;

function Index() {
  return (
    <div className="bg-cream text-ink min-h-screen overflow-x-clip relative">
      {/* Global film grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_SVG}")`, opacity: 0.04 }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Manifest />
        <Moodboard />
        <PackageStart />
        <StartSlider />
        <BeforeAfter />
        <BigNumbers />
        <AddonsSlider />
        <Process />
        <Pricing />
        <FAQ />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
      <StickyBar />
      <BackToTop />
    </div>
  );
}
