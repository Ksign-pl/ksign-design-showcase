export function Manifest() {
  return (
    <section
      id="oferta"
      className="relative bg-ink text-cream py-24 md:py-40 overflow-hidden grid-bg-dark"
    >
      {/* huge KSIGN watermark */}
      <div
        aria-hidden
        className="absolute -right-10 top-1/2 -translate-y-1/2 font-heading font-bold text-[30vw] opacity-[0.04] pointer-events-none select-none uppercase whitespace-nowrap"
      >
        KSIGN
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-cream/50 mb-8">
          [ 02 / Manifest ]
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8 reveal-up">
            <span className="inline-block bg-violet text-ink px-3 py-1 font-bold text-sm tracking-tight uppercase">
              Nasz Manifest
            </span>
            <h2 className="font-heading font-bold text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Nie robimy stron.<br />
              Budujemy <span className="text-lime">cyfrowe imperia.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:pt-24 reveal-up">
            <p className="text-xl md:text-2xl leading-relaxed text-cream/80">
              W branży pełnej szablonów i przeciętności stawiamy na bezczelną jakość.
              Broken-grid, kinetyczna typografia i technologie 2026 — po to,
              żeby Twój biznes nie tylko był widoczny,{" "}
              <span className="text-cream font-medium">ale dominował.</span>
            </p>
            <div className="h-1 w-24 bg-lime" />
          </div>
        </div>

        {/* three pillars */}
        <div className="mt-20 md:mt-32 grid md:grid-cols-3 gap-8">
          {[
            { n: "01", h: "Bez szablonów", p: "Każdy pixel projektujemy od zera pod Twoje DNA marki." },
            { n: "02", h: "Ultra-szybkość", p: "Optymalizacja pod Core Web Vitals 2026. Google to kocha." },
            { n: "03", h: "Broken grid", p: "Awwwards-level kompozycja. Wyróżnij się z pierwszego kliknięcia." },
          ].map((c, i) => (
            <div
              key={c.n}
              className={`reveal-up ${i === 1 ? "md:mt-12" : i === 2 ? "md:mt-24" : ""}`}
            >
              <div className="font-heading font-bold text-6xl text-lime mb-4">{c.n}</div>
              <h3 className="font-heading font-bold text-2xl uppercase mb-3 tracking-tight">
                {c.h}
              </h3>
              <p className="text-cream/70 leading-relaxed">{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
