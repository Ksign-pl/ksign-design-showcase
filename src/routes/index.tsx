import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { StickyBar } from "@/components/site/StickyBar";
import { Manifest } from "@/components/site/Manifest";
import { PackageStart } from "@/components/site/PackageStart";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { BigNumbers } from "@/components/site/BigNumbers";
import { AddonsSlider } from "@/components/site/AddonsSlider";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { SeoStatus } from "@/components/site/SeoStatus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSIGN — Premium web design dla małych firm" },
      { name: "description", content: "Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online." },
      { property: "og:title", content: "KSIGN — Premium web design dla małych firm" },
      { property: "og:description", content: "Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ksign.pl/" },
      { property: "og:image", content: "https://ksign.pl/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: "KSIGN — premium web design, strona za 999 zł netto" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KSIGN — Premium web design dla małych firm" },
      { name: "twitter:description", content: "Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online." },
      { name: "twitter:image", content: "https://ksign.pl/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://ksign.pl/" },
    ],
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
                { q: "Czy za 999 zł dostanę sklep internetowy?", a: "Nie. Pakiet Start obejmuje prostą stronę one-page. Sklep internetowy wyceniamy osobno." },
                { q: "Czy strona będzie responsywna?", a: "Tak. Strona będzie dopasowana do telefonu, tabletu i komputera." },
                { q: "Ile trwa realizacja?", a: "Standardowo od 3 do 7 dni roboczych po otrzymaniu materiałów." },
                { q: "Czy pomagacie z tekstami?", a: "Tak. Pomagamy uporządkować podstawowe treści i ułożyć je sprzedażowo." },
                { q: "Czy mogę później rozbudować stronę?", a: "Tak. Pakiet Start może być bazą do większej strony, SEO, bloga, sklepu lub automatyzacji." },
                { q: "Czy cena 999 zł jest netto?", a: "Tak. Cena pakietu Start to 999 zł netto." },
              ].map((x) => ({
                "@type": "Question",
                name: x.q,
                acceptedAnswer: { "@type": "Answer", text: x.a },
              })),
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://ksign.pl/#business",
              name: "KSIGN",
              description: "Studio premium web design — strony internetowe, sklepy i systemy AI dla małych firm i marek osobistych.",
              url: "https://ksign.pl/",
              image: "https://ksign.pl/og-image.jpg",
              email: "hello@ksign.pl",
              priceRange: "999 PLN - 9999 PLN",
              areaServed: { "@type": "Country", name: "Poland" },
              address: { "@type": "PostalAddress", addressCountry: "PL" },
              sameAs: ["https://www.facebook.com/ksign2026"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "hello@ksign.pl",
                  availableLanguage: ["Polish", "English"],
                  areaServed: "PL",
                },
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "hello@ksign.pl",
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
              description: "Nowoczesna, responsywna strona one-page w premium designie. Realizacja 3–7 dni roboczych.",
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

function Index() {
  return (
    <div className="bg-cream text-ink min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Manifest />
        <PackageStart />
        <BeforeAfter />
        <BigNumbers />
        <AddonsSlider />
        <Process />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <SeoStatus />
      </main>
      <Footer />
      <StickyBar />
      <BackToTop />
    </div>
  );
}
