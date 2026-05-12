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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSIGN — Premium strona za 999 zł netto" },
      { name: "description", content: "Premium web design dla małych firm i marek osobistych. Pakiet Start: nowoczesna strona one-page za 999 zł netto. Realizacja 3–7 dni." },
      { property: "og:title", content: "KSIGN — Premium strona za 999 zł" },
      { property: "og:description", content: "Nowoczesne strony internetowe od 999 zł netto. Pakiet Start KSIGN — szybka realizacja, premium wygląd." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ksign-design-showcase.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KSIGN — Premium strona za 999 zł" },
      { name: "twitter:description", content: "Pakiet Start: nowoczesna strona one-page za 999 zł netto. Realizacja 3–7 dni." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a45b5b3c-7d87-4858-accc-cfbeed557deb" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a45b5b3c-7d87-4858-accc-cfbeed557deb" },
    ],
    links: [
      { rel: "canonical", href: "https://ksign-design-showcase.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              "@id": "https://ksign-design-showcase.lovable.app/#faq",
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
              "@id": "https://ksign-design-showcase.lovable.app/#business",
              name: "KSIGN",
              description: "Studio premium web design — strony internetowe, sklepy i systemy AI dla małych firm i marek osobistych.",
              url: "https://ksign-design-showcase.lovable.app/",
              image: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a45b5b3c-7d87-4858-accc-cfbeed557deb",
              email: "hello@ksign.pl",
              priceRange: "999 PLN - 9999 PLN",
              areaServed: { "@type": "Country", name: "Poland" },
              address: { "@type": "PostalAddress", addressCountry: "PL" },
            },
            {
              "@type": "Service",
              "@id": "https://ksign-design-showcase.lovable.app/#pakiet-start",
              name: "Pakiet Start — strona one-page",
              serviceType: "Web design",
              provider: { "@id": "https://ksign-design-showcase.lovable.app/#business" },
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
                url: "https://ksign-design-showcase.lovable.app/#pakiet",
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Strona główna",
                  item: "https://ksign-design-showcase.lovable.app/",
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
      </main>
      <Footer />
      <StickyBar />
      <BackToTop />
    </div>
  );
}
