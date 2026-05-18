const PLANS = [
  {
    name: "START",
    price: "999",
    unit: "zł",
    desc: "Prosta strona one-page.",
    cta: "Wybieram Start",
    priceId: "pakiet_start_one_time",
    featured: true,
  },
  {
    name: "BUSINESS",
    price: "2 499",
    unit: "zł",
    desc: "Strona 3–5 podstron.",
    cta: "Wybieram Business",
    priceId: "pakiet_business_one_time",
  },
  {
    name: "PREMIUM",
    price: "4 999",
    unit: "zł",
    desc: "Strategia, copywriting, branding, animacje.",
    cta: "Wybieram Premium",
    priceId: "pakiet_premium_one_time",
  },
  {
    name: "E-COMMERCE",
    price: "6 000",
    unit: "zł",
    desc: "Sklep Shoper / WooCommerce / Shopify.",
    cta: "Wybieram sklep",
    priceId: "pakiet_ecommerce_one_time",
  },
];

import { Link } from "@tanstack/react-router";

export function Pricing() {
  return (
    <section id="realizacje" className="py-24 md:py-32 bg-cream grid-bg">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/50 mb-8">
          [ 08 / Pakiety ]
        </div>
        <h2 className="text-display-tight text-[10vw] md:text-[6vw] lg:text-[5.5rem] mb-14 md:mb-20">
          WYBIERZ POZIOM<br/><span className="bg-violet px-3 rounded-2xl">STARTU.</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`${
                p.featured
                  ? "lg:col-span-6 bg-ink text-cream glow-lime md:row-span-2"
                  : "lg:col-span-3 bg-white border border-ink/10"
              } rounded-3xl p-7 md:p-9 flex flex-col justify-between relative hover:scale-[1.01] transition-transform`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-7 pill bg-lime text-ink font-bold">
                  ★ Najlepszy start
                </div>
              )}
              <div>
                <div className={`text-xs font-mono uppercase tracking-widest mb-4 ${p.featured ? "text-cream/50" : "text-ink/40"}`}>
                  {p.name}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className={`font-black tracking-tighter ${p.featured ? "text-7xl md:text-8xl" : "text-4xl md:text-5xl"}`}>
                    {p.price}
                  </span>
                  <span className={`text-sm ${p.featured ? "text-cream/60" : "text-ink/50"}`}>
                    {p.unit}
                  </span>
                </div>
                <p className={`${p.featured ? "text-lg md:text-xl text-cream/70" : "text-sm text-ink/60"} leading-snug mb-6`}>
                  {p.desc}
                </p>
              </div>
              <Link
                to="/checkout"
                search={{ price: p.priceId }}
                title={`${p.cta} — przejdź do płatności online`}
                aria-label={`${p.cta} — płatność online`}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all ${
                  p.featured
                    ? "bg-lime text-ink hover:scale-105"
                    : "bg-ink text-cream hover:bg-violet hover:text-ink"
                }`}
              >
                {p.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}

          {/* Karta: pozostałe usługi */}
          <a
            href="#rozbudowa"
            title="Zobacz dodatkowe usługi i rozbudowę strony"
            aria-label="Zobacz dodatkowe usługi i rozbudowę strony"
            className="lg:col-span-3 group relative rounded-3xl p-7 md:p-9 bg-violet text-ink overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform"
          >
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-ink/10 group-hover:scale-125 transition-transform duration-700" aria-hidden="true" />
            <div className="absolute right-6 top-6 w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center group-hover:rotate-45 transition-transform" aria-hidden="true">
              →
            </div>
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-ink/50 mb-4">
                EXTRA
              </div>
              <div className="text-3xl md:text-4xl font-black tracking-tighter leading-[0.9] mb-3">
                ZOBACZ<br/>POZOSTAŁE<br/>USŁUGI
              </div>
              <p className="text-sm text-ink/70 leading-snug">
                SEO, blog, branding, automatyzacje, chatbot AI i więcej.
              </p>
            </div>
            <div className="relative inline-flex items-center gap-2 mt-6 font-bold text-sm">
              <span className="underline underline-offset-4 decoration-2">Zobacz dodatki</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
