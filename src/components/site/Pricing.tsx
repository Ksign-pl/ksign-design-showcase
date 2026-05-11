const PLANS = [
  {
    name: "START",
    price: "999",
    unit: "zł netto",
    desc: "Prosta strona one-page.",
    cta: "Wybieram Start",
    featured: true,
  },
  {
    name: "BUSINESS",
    price: "od 2 499",
    unit: "zł netto",
    desc: "Strona 3–5 podstron.",
    cta: "Zapytaj o Business",
  },
  {
    name: "PREMIUM",
    price: "od 4 999",
    unit: "zł netto",
    desc: "Strategia, copywriting, branding, animacje.",
    cta: "Zapytaj o Premium",
  },
  {
    name: "E-COMMERCE",
    price: "od 6 000",
    unit: "zł netto",
    desc: "Sklep Shoper / WooCommerce / Shopify.",
    cta: "Zapytaj o sklep",
  },
];

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
                <div className={`flex items-baseline gap-2 mb-3 ${p.featured ? "" : ""}`}>
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
              <a
                href="#kontakt"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all ${
                  p.featured
                    ? "bg-lime text-ink hover:scale-105"
                    : "bg-ink text-cream hover:bg-violet hover:text-ink"
                }`}
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
