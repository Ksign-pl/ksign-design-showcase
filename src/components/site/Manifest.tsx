const PILLARS = [
  {
    n: "01",
    h: "Estetyka brutalna",
    p: "Nie robimy ładnych obrazków. Tworzymy cyfrowe rzeźby, które wymuszają uwagę. Jeśli Twoja strona nie wywołuje emocji — jest niewidzialna.",
    accent: "cream",
    video:
      "https://cdn.pixabay.com/video/2021/10/12/91744-635195953_large.mp4",
  },
  {
    n: "02",
    h: "Prędkość to waluta",
    p: "3–7 dni roboczych. To nie obietnica, to proces. Optymalizujemy każdy ruch myszki, żebyś Ty mógł optymalizować swój biznes.",
    accent: "violet",
    video:
      "https://cdn.pixabay.com/video/2023/06/26/168269-841127723_large.mp4",
  },
  {
    n: "03",
    h: "Zero kompromisów",
    p: "999 zł netto to cena wejścia do świata designu premium. Usuwamy zbędne spotkania, zostawiamy czystą esencję Twojej marki.",
    accent: "lime",
    video:
      "https://cdn.pixabay.com/video/2020/09/08/49375-459823152_large.mp4",
  },
] as const;

export function Manifest() {
  return (
    <section
      id="oferta"
      className="relative bg-ink text-cream py-24 md:py-40 overflow-hidden"
    >
      {/* Kinetic marquee background — huge, low opacity */}
      <div
        aria-hidden
        className="absolute top-16 md:top-24 left-0 w-full overflow-hidden pointer-events-none select-none"
      >
        <div
          className="whitespace-nowrap font-heading font-bold uppercase text-cream/[0.06] leading-none"
          style={{
            fontSize: "18vw",
            animation: "marquee 45s linear infinite",
            width: "max-content",
          }}
        >
          MANIFESTO&nbsp;·&nbsp;MANIFESTO&nbsp;·&nbsp;MANIFESTO&nbsp;·&nbsp;MANIFESTO&nbsp;·&nbsp;
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section header */}
        <div className="flex items-start justify-between gap-6 mb-16 md:mb-24 flex-wrap">
          <div className="max-w-3xl">
            <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-lime mb-6">
              [ 02 / Filozofia pracy ]
            </div>
            <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
              Nie robimy stron.<br />
              Budujemy{" "}
              <span className="italic font-light text-cream/50">cyfrowe</span>{" "}
              <span className="text-lime">imperia<span className="text-violet">.</span></span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 pt-4">
            <span>KSIGN / MANIFEST</span>
            <span>03 zasady</span>
          </div>
        </div>

        {/* Three pillars — asymmetric */}
        <div className="space-y-16 md:space-y-24">
          {PILLARS.map((c, i) => {
            const accentText =
              c.accent === "violet"
                ? "text-violet"
                : c.accent === "lime"
                ? "text-lime"
                : "text-cream";
            const indent =
              i === 0 ? "md:pl-0" : i === 1 ? "md:pl-[16%]" : "md:pl-[8%]";
            return (
              <article
                key={c.n}
                className={`reveal-up group ${indent} border-t border-cream/15 pt-8 md:pt-10`}
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span
                    className={`font-heading font-light italic text-6xl md:text-7xl opacity-40 group-hover:opacity-100 transition-opacity ${accentText}`}
                  >
                    {c.n}
                  </span>
                  <div className="flex-1 mx-6 md:mx-10 h-px bg-cream/15 relative overflow-hidden">
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 ${
                        c.accent === "violet"
                          ? "bg-violet"
                          : c.accent === "lime"
                          ? "bg-lime"
                          : "bg-cream"
                      }`}
                      style={{
                        width: "0%",
                        animation: "manifestGrow linear both",
                        animationTimeline: "view()",
                        animationRange: "entry 10% cover 40%",
                      } as React.CSSProperties}
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
                    Filar
                  </span>
                </div>

                <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                  <h3
                    className={`md:col-span-5 font-heading font-bold text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9] ${
                      c.accent === "violet" ? "text-violet" : ""
                    }`}
                  >
                    {c.h}
                  </h3>

                  <p className="md:col-span-4 text-base md:text-lg leading-relaxed text-cream/75 max-w-xl">
                    {c.p}
                  </p>

                  {/* Video reel — visual anchor per pillar */}
                  <div className="md:col-span-3 relative aspect-[4/5] rounded-2xl overflow-hidden border border-cream/10 bg-cream/[0.03]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700"
                    >
                      <source src={c.video} type="video/mp4" />
                    </video>
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(10,10,12,0.9) 100%)",
                      }}
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70">
                      <span>Reel · {c.n}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          c.accent === "violet"
                            ? "bg-violet"
                            : c.accent === "lime"
                            ? "bg-lime"
                            : "bg-cream"
                        } animate-pulse`}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes manifestGrow {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
