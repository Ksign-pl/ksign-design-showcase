const PILLS = [
  { label: "Zaufanie", color: "bg-lime text-ink" },
  { label: "Design", color: "bg-violet text-ink" },
  { label: "Kontakt", color: "bg-white text-ink" },
  { label: "Sprzedaż", color: "bg-lime text-ink" },
  { label: "Mobile", color: "bg-white text-ink" },
  { label: "Oferta", color: "bg-violet text-ink" },
];

export function Manifest() {
  return (
    <section id="oferta" className="relative bg-ink text-cream py-24 md:py-40 overflow-hidden grid-bg-dark">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/50 mb-8">
          [ 02 / Manifest ]
        </div>
        <h2 className="text-display-tight text-[14vw] md:text-[9vw] lg:text-[8.5rem]">
          PIERWSZE<br/>
          WRAŻENIE<br/>
          <span className="text-lime">NIE CZEKA.</span>
        </h2>

        <div className="mt-12 md:mt-20 grid lg:grid-cols-2 gap-10 items-end">
          <p className="text-2xl md:text-3xl lg:text-4xl leading-tight text-cream/80 max-w-2xl font-light tracking-tight">
            Klient ocenia Twoją firmę w kilka sekund. Strona może od razu budować zaufanie
            — albo sprawić, że <span className="text-cream font-medium">wyglądasz jak firma, która została w tyle.</span>
          </p>

          <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
            {PILLS.map((p, i) => (
              <span
                key={p.label}
                className={`${p.color} px-5 py-3 rounded-full font-bold text-sm md:text-base animate-float`}
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${5 + i}s` }}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
