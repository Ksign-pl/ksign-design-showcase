const BG_VIDEO = "https://cdn.pixabay.com/video/2023/10/16/185338-877842799_large.mp4";

const STATS = [
  { num: "999 zł", desc: "startowy pakiet strony" },
  { num: "3–7 dni", desc: "standardowy czas realizacji" },
  { num: "1 page", desc: "prosta struktura, jasny przekaz" },
  { num: "100%", desc: "dopasowanie do telefonu" },
];

export function BigNumbers() {
  return (
    <section className="relative py-24 md:py-32 bg-ink text-cream overflow-hidden">
      {/* Ambient video background */}
      <div className="absolute inset-0 z-0">
        <video
          src={BG_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hidden md:block w-full h-full object-cover opacity-25"
          style={{ filter: "hue-rotate(220deg) saturate(1.4) blur(2px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 30%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(190,242,100,0.15), transparent 60%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/50 mb-8">
          [ 05 / Liczby ]
        </div>
        <h2 className="text-display-tight text-[12vw] md:text-[7vw] lg:text-[6rem] mb-16 md:mb-24 max-w-5xl">
          MAŁA CENA.<br/>
          <span className="text-lime">DUŻY EFEKT.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.num}
              className="group border-t border-cream/20 pt-6 md:pt-8 transition-colors hover:border-lime"
            >
              <div className="text-xs font-mono text-cream/40 mb-3">0{i + 1}</div>
              <div className="text-display text-5xl md:text-6xl lg:text-7xl mb-3 transition-colors group-hover:text-lime">
                {s.num}
              </div>
              <div className="text-base md:text-lg text-cream/70 leading-tight">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
