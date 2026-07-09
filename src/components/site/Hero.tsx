import { useEffect, useRef, useState } from "react";
import { trackCta } from "@/lib/analytics";


const HERO_VIDEO =
  "https://cdn.pixabay.com/video/2023/10/07/183021-872881864_large.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70";

export function Hero() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduce) videoRef.current?.pause();
  }, [reduce]);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-between px-5 md:px-10 pt-24 md:pt-28 pb-10 md:pb-16 overflow-hidden bg-ink text-cream"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark gradient overlay for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.35) 40%, rgba(10,10,12,0.85) 100%)",
        }}
      />

      {/* Violet radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 md:top-1/3 md:-right-40 w-[80vw] md:w-[55vw] h-[80vw] md:h-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.16 300 / 0.55) 0%, oklch(0.74 0.16 300 / 0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* editorial grid ticks */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--cream) 1px, transparent 1px)",
          backgroundSize: "8.333% 100%",
        }}
      />

      {/* TOP: status row */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-8 md:mb-0">
        <span className="inline-flex items-center gap-2 px-3 py-1 border border-cream/20 bg-cream/5 backdrop-blur text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          Premium Studio · 2026
        </span>
        <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50">
          <span>[ 01 / Hero ]</span>
          <span>PL · Web · Motion</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid md:grid-cols-12 gap-y-10 md:gap-x-8 items-end">
        {/* Left: mega wordmark + tagline */}
        <div className="md:col-span-8">
          <h1 className="font-heading font-bold uppercase leading-[0.82] tracking-tighter text-[22vw] md:text-[15vw]">
            <span className="sr-only">
              KSIGN — premium strony internetowe za 999 zł netto w 7 dni
            </span>
            <span aria-hidden="true" className="block">
              Strony
            </span>
            <span aria-hidden="true" className="block">
              które<span className="text-violet">.</span>
            </span>
            <span
              aria-hidden="true"
              className="block italic font-light text-cream/25"
              style={{ fontStyle: "italic" }}
            >
              sprzedają
            </span>
          </h1>

          <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-2xl leading-snug text-cream/80">
            One-page, który{" "}
            <span className="bg-lime px-2 py-0.5 font-semibold text-ink">
              sprzedaje designem
            </span>
            , nie tylko kodem. Nowy standard web 2026 — dla firm, które nie
            wyglądają jak wszyscy.
          </p>
        </div>

        {/* Right: price card */}
        <div className="md:col-span-4 relative min-h-[300px] md:min-h-[420px] flex items-end">
          <div className="w-full bg-cream text-ink p-6 md:p-8 relative z-20 shadow-[0_40px_80px_-20px_oklch(0.74_0.16_300_/_0.5)] border border-cream/10">
            <div className="flex items-start justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/60">
                / Inwestycja
              </span>
              <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
            </div>
            <div className="font-heading font-bold text-6xl md:text-7xl leading-none tracking-tighter">
              999<span className="text-violet">.</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2 text-ink/70">
              <span className="font-mono text-xs uppercase tracking-widest">
                PLN netto
              </span>
              <span className="text-xs">·</span>
              <span className="font-mono text-xs uppercase tracking-widest">
                one-page
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-ink/70">
              <span>Dostawa</span>
              <span className="font-bold text-ink">3–7 dni</span>
            </div>

            <a
              href="#kontakt"
              title="Zamów stronę za 999 zł — przejdź do formularza"
              aria-label="Zamów stronę za 999 zł — przejdź do formularza kontaktowego"
              onClick={() => trackCta({ location: "hero", label: "Zamów stronę", href: "#kontakt", variant: "primary" })}
              className="group mt-6 md:mt-8 flex items-center justify-between gap-3 bg-ink text-cream px-5 py-4 font-heading font-bold uppercase tracking-tight text-sm md:text-base transition-colors hover:bg-violet hover:text-ink"
            >

              <span>Zamów stronę</span>
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-full bg-lime text-ink flex items-center justify-center transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        aria-hidden
        className="relative z-10 mt-10 md:mt-16 border-y border-cream/15 py-3 md:py-4 overflow-hidden backdrop-blur-sm"
      >
        <div
          className="whitespace-nowrap flex gap-10"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-10 shrink-0">
              {[
                "Motion-first",
                "Video design",
                "Awwwards-level",
                "3–7 dni roboczych",
                "999 PLN netto",
                "Bez szablonów",
                "Core Web Vitals 2026",
              ].map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="flex items-center gap-10 shrink-0"
                >
                  <span className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-cream/90">
                    {t}
                  </span>
                  <span className="text-violet text-xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM: scroll cue + secondary link */}
      <div className="relative z-10 mt-8 md:mt-10 flex items-center justify-between gap-4 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center">
            <span className="block w-2 h-2 rounded-full bg-cream animate-bounce" />
          </span>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/60">
            Scroll — Manifest
          </span>
        </div>
        <a
          href="#pakiet"
          title="Zobacz, co zawiera pakiet Start"
          className="group inline-flex items-center gap-2 border-b border-cream/60 pb-1 font-heading font-bold uppercase text-xs md:text-sm tracking-tight"
        >
          Zobacz pakiet Start
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
