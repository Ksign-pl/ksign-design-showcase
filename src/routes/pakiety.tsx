import { createFileRoute, Link } from "@tanstack/react-router";
import { CATALOG } from "@/lib/catalog";

export const Route = createFileRoute("/pakiety")({
  head: () => {
    const title = "Pakiety stron internetowych | KSIGN";
    const description =
      "Wybierz pakiet: Start 999 zł, Business 2 499 zł, Premium 4 999 zł, E-commerce 6 000 zł. Opieka techniczna 99 zł/mies. Płatność online.";
    const url = "https://ksign.pl/pakiety";
    const offers = ONE_TIME_ORDER.map((id) => {
      const p = CATALOG[id];
      return {
        "@type": "Service",
        name: p.name,
        description: p.blurb,
        provider: { "@type": "Organization", name: "KSIGN", url: "https://ksign.pl" },
        offers: {
          "@type": "Offer",
          price: p.amountPln,
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
          url,
        },
      };
    });
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "KSIGN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": offers,
          }),
        },
      ],
    };
  },
  component: PaczkiPage,
});

const ONE_TIME_ORDER = [
  "pakiet_start_one_time",
  "pakiet_business_one_time",
  "pakiet_premium_one_time",
  "pakiet_ecommerce_one_time",
];

function PaczkiPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="font-black tracking-tight text-xl">
            KSIGN
          </Link>
          <Link to="/" className="text-sm text-ink/60 hover:text-ink">
            ← Strona główna
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 md:px-8 py-12 md:py-20">
        <h1 className="text-display-tight text-[10vw] md:text-[5.5rem] mb-4">PAKIETY.</h1>
        <p className="text-lg text-ink/60 max-w-2xl mb-12">
          Stałe ceny, brak ukrytych kosztów. Zapłać online, a my odezwiemy się w 24h, żeby rozpocząć
          realizację.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ONE_TIME_ORDER.map((id) => {
            const p = CATALOG[id];
            const highlight = p.highlight;
            return (
              <div
                key={id}
                className={`rounded-3xl p-7 flex flex-col ${
                  highlight ? "bg-ink text-cream glow-lime" : "bg-white border border-ink/10"
                }`}
              >
                <div
                  className={`text-xs font-mono uppercase tracking-widest mb-3 ${highlight ? "text-cream/50" : "text-ink/40"}`}
                >
                  {p.name}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-black tracking-tighter">
                    {p.amountPln.toLocaleString("pl-PL")}
                  </span>
                  <span className={`text-sm ${highlight ? "text-cream/60" : "text-ink/50"}`}>
                    zł
                  </span>
                </div>
                <p className={`text-sm mb-5 ${highlight ? "text-cream/70" : "text-ink/60"}`}>
                  {p.blurb}
                </p>
                <ul
                  className={`space-y-2 text-sm mb-7 flex-1 ${highlight ? "text-cream/90" : "text-ink/80"}`}
                >
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className={highlight ? "text-lime" : "text-ink/40"}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/checkout"
                  search={{ price: id }}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition ${
                    highlight
                      ? "bg-lime text-ink hover:scale-[1.02]"
                      : "bg-ink text-cream hover:bg-violet hover:text-ink"
                  }`}
                >
                  Zapłać online →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl bg-violet/40 border border-ink/10 p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
              Opcjonalnie — abonament
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              {CATALOG.opieka_miesiac.name} — {CATALOG.opieka_miesiac.amountPln} zł/mies.
            </h2>
            <p className="text-ink/70 mt-2 max-w-xl">{CATALOG.opieka_miesiac.blurb}</p>
          </div>
          <Link
            to="/checkout"
            search={{ price: "opieka_miesiac" }}
            className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3 rounded-full font-bold hover:bg-violet hover:text-ink transition whitespace-nowrap"
          >
            Wykup opiekę →
          </Link>
        </div>

        <p className="mt-10 text-xs text-ink/50 max-w-2xl">
          Wszystkie ceny są cenami finalnymi. KSIGN korzysta ze zwolnienia podmiotowego z VAT (art.
          113 ust. 1 ustawy o VAT) — faktura wystawiana jest bez VAT.
        </p>
      </main>
    </div>
  );
}
