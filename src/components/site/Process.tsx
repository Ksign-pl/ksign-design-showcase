const STEPS = [
  {
    n: "01",
    title: "Brief",
    desc: "Mówisz, czym się zajmujesz i czego potrzebujesz.",
    video:
      "https://cdn.pixabay.com/video/2023/10/07/183021-872881864_large.mp4",
  },
  {
    n: "02",
    title: "Struktura",
    desc: "Układamy ofertę tak, żeby klient szybko ją zrozumiał.",
    video:
      "https://cdn.pixabay.com/video/2020/09/08/49375-459823152_large.mp4",
  },
  {
    n: "03",
    title: "Design",
    desc: "Tworzymy wygląd, który buduje zaufanie.",
    video:
      "https://cdn.pixabay.com/video/2021/10/12/91744-635195953_large.mp4",
  },
  {
    n: "04",
    title: "Publikacja",
    desc: "Podpinamy domenę i oddajemy gotową stronę.",
    video:
      "https://cdn.pixabay.com/video/2023/06/26/168269-841127723_large.mp4",
  },
];

export function Process() {
  return (
    <section id="proces" className="relative py-24 md:py-32 bg-ink text-cream grid-bg-dark overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/50 mb-8">
          [ 07 / Proces ]
        </div>
        <h2 className="text-display-tight text-[10vw] md:text-[6vw] lg:text-[5.5rem] max-w-5xl mb-16 md:mb-24">
          OD POMYSŁU<br />DO GOTOWEJ<br /><span className="text-lime">STRONY.</span>
        </h2>

        {/* Timeline with scroll-driven progress rail */}
        <div className="relative">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-0 md:left-[16.6667%] top-0 bottom-0 w-px bg-cream/15 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute left-0 md:left-[16.6667%] top-0 w-px bg-lime pointer-events-none origin-top"
            style={{
              height: "100%",
              animation: "processRailGrow linear both",
              animationTimeline: "view()",
              animationRange: "entry 5% cover 90%",
              transform: "scaleY(0)",
            } as React.CSSProperties}
          />

          {STEPS.map((s) => (
            <article
              key={s.n}
              className="group relative grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-14 border-t border-cream/15 hover:border-lime/60 transition-colors"
            >
              {/* Node on rail */}
              <span
                aria-hidden
                className="absolute left-0 md:left-[16.6667%] top-8 md:top-14 -translate-x-1/2 w-3 h-3 rounded-full bg-ink border border-cream/40 group-hover:bg-lime group-hover:border-lime transition-colors z-10"
              />

              <div className="md:col-span-2 pl-6 md:pl-0 text-lime font-mono text-lg md:text-xl">
                {s.n}
              </div>
              <div className="md:col-span-4 pl-6 md:pl-8">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter group-hover:translate-x-2 transition-transform">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-4 flex items-center pl-6 md:pl-0">
                <p className="text-lg md:text-xl text-cream/70 leading-snug">
                  {s.desc}
                </p>
              </div>

              {/* Video reel — desktop only, reveal on hover */}
              <div className="md:col-span-2 hidden md:block">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-cream/10 bg-cream/[0.03]">
                  <video
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-90 transition-opacity duration-700"
                  >
                    <source src={s.video} type="video/mp4" />
                  </video>
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 45%, rgba(10,10,12,0.9) 100%)",
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-cream/70">
                    <span>{s.n}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className="border-t border-cream/15" />
        </div>

        <div className="mt-12 md:mt-16 flex flex-wrap gap-4">
          <a
            href="#realizacje"
            title="Zobacz realizacje i cennik pakietów"
            className="inline-flex items-center gap-2 bg-lime text-ink px-6 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
          >
            Zobacz realizacje i cennik <span aria-hidden="true">→</span>
          </a>
          <a
            href="#kontakt"
            title="Umów rozmowę z KSIGN"
            className="inline-flex items-center gap-2 border border-cream/30 text-cream px-6 py-3.5 rounded-full font-bold text-sm hover:bg-cream hover:text-ink transition-colors"
          >
            Umów rozmowę
          </a>
        </div>
      </div>

      <style>{`
        @keyframes processRailGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
