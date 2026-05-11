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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSIGN — Strony, które wyglądają drożej niż kosztują. Pakiet Start 999 zł" },
      { name: "description", content: "Premium web design dla małych firm i marek osobistych. Pakiet Start: nowoczesna strona one-page za 999 zł netto. Realizacja 3–7 dni." },
      { property: "og:title", content: "KSIGN — Premium strona za 999 zł" },
      { property: "og:description", content: "Nowoczesne strony internetowe od 999 zł netto. Pakiet Start KSIGN — szybka realizacja, premium wygląd." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    </div>
  );
}
