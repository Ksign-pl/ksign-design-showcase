const STATS = [
  { num: "999 zł", desc: "startowy pakiet strony" },
  { num: "3–7 dni", desc: "standardowy czas realizacji" },
  { num: "1 page", desc: "prosta struktura, jasny przekaz" },
  { num: "100%", desc: "dopasowanie do telefonu" },
];

export function BigNumbers() {
  return (
    <section className="relative py-24 md:py-32 bg-violet text-ink overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/60 mb-8">
          [ 05 / Liczby ]
        </div>
        <h2 className="text-display-tight text-[12vw] md:text-[7vw] lg:text-[6rem] mb-16 md:mb-24 max-w-5xl">
          MAŁA CENA.<br/>DUŻY EFEKT.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
          {STATS.map((s, i) => (
            <div key={s.num} className="border-t border-ink/20 pt-6 md:pt-8">
              <div className="text-xs font-mono text-ink/50 mb-3">0{i + 1}</div>
              <div className="text-display text-5xl md:text-6xl lg:text-7xl mb-3">
                {s.num}
              </div>
              <div className="text-base md:text-lg text-ink/70 leading-tight">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
