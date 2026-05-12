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
    ],
    links: [
      { rel: "canonical", href: "https://ksign-design-showcase.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
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
