const STEPS = [
  { n: "01", title: "Brief", desc: "Mówisz, czym się zajmujesz i czego potrzebujesz." },
  { n: "02", title: "Struktura", desc: "Układamy ofertę tak, żeby klient szybko ją zrozumiał." },
  { n: "03", title: "Design", desc: "Tworzymy wygląd, który buduje zaufanie." },
  { n: "04", title: "Publikacja", desc: "Podpinamy domenę i oddajemy gotową stronę." },
];

export function Process() {
  return (
    <section id="proces" className="py-24 md:py-32 bg-ink text-cream grid-bg-dark">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/50 mb-8">
          [ 07 / Proces ]
        </div>
        <h2 className="text-display-tight text-[10vw] md:text-[6vw] lg:text-[5.5rem] max-w-5xl mb-16 md:mb-24">
          OD POMYSŁU<br/>DO GOTOWEJ<br/><span className="text-lime">STRONY.</span>
        </h2>

        <div className="space-y-0">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="group grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-t border-cream/15 hover:border-lime transition-colors"
            >
              <div className="md:col-span-2 text-lime font-mono text-lg md:text-xl">{s.n}</div>
              <div className="md:col-span-4">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter group-hover:translate-x-2 transition-transform">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-6 flex items-center">
                <p className="text-lg md:text-xl text-cream/70 leading-snug">{s.desc}</p>
              </div>
              {i === STEPS.length - 1 && <div className="hidden" />}
            </div>
          ))}
          <div className="border-t border-cream/15" />
        </div>
      </div>
    </section>
  );
}
