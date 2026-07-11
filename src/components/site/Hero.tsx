import { trackCta } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-cream text-ink">
      {/* subtle grid ticks */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink) 1px, transparent 1px)",
          backgroundSize: "8.333% 100%",
        }}
      />

      {/* ── COLOR BLOCK ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-[38%] w-full md:h-full md:w-[42%] bg-violet"
      >
        {/* motyw — pojedynczy łuk/arch w kadrze */}
        <svg
          viewBox="0 0 400 700"
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="archG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.965 0.012 90)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="oklch(0.965 0.012 90)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* archway */}
          <path
            d="M 90 700 L 90 260 A 110 110 0 0 1 310 260 L 310 700 Z"
            fill="url(#archG)"
            stroke="oklch(0.965 0.012 90 / 0.35)"
            strokeWidth="1.5"
          />
          {/* inner line */}
          <path
            d="M 130 700 L 130 275 A 70 70 0 0 1 270 275 L 270 700"
            fill="none"
            stroke="oklch(0.965 0.012 90 / 0.22)"
            strokeWidth="1"
          />
        </svg>

        {/* vertical caption */}
        <div className="absolute top-8 right-6 md:right-8 rotate-180 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/70" style={{ writingMode: "vertical-rl" }}>
          KSIGN · MMXXVI · Studio
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[100svh] px-5 md:px-10 lg:px-16 pt-28 md:pt-32 pb-16 flex flex-col justify-between max-w-[1500px] mx-auto">
        {/* top row */}
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-ink/70">
            <span className="w-1.5 h-1.5 rounded-full bg-ink" />
            Premium web · Kraków / PL
          </span>
          <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.35em] text-cream/70">
            [ 01 — Hero ]
          </span>
        </div>

        {/* headline — dużo negatywnej przestrzeni */}
        <div className="mt-16 md:mt-0 md:absolute md:left-10 lg:left-16 md:top-1/2 md:-translate-y-1/2 md:max-w-[58%]">
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-ink/70 mb-6 md:mb-10">
            № 01 / Manifest
          </div>
          <h1 className="font-heading font-normal leading-[0.9] tracking-tight text-[13vw] md:text-[8.5vw] lg:text-[7.5vw]">
            <span className="sr-only">
              KSIGN — premium strony internetowe za 999 zł netto w 7 dni
            </span>
            <span aria-hidden className="block">Strony</span>
            <span aria-hidden className="block italic font-light text-ink/70">które</span>
            <span aria-hidden className="block">
              sprzedają<span className="text-violet">.</span>
            </span>
          </h1>

          <p className="mt-8 md:mt-10 max-w-md text-base md:text-lg leading-snug text-ink/70">
            One-page w klasie premium.{" "}
            <span className="bg-ink text-cream px-2 py-0.5 font-medium">3–7 dni</span>{" "}
            realizacji. Bez szablonów.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="#kontakt"
              onClick={() => trackCta({ location: "hero", label: "Zamów stronę", href: "#kontakt", variant: "primary" })}
              className="group inline-flex items-center gap-3 bg-ink text-cream px-6 py-4 font-heading uppercase tracking-tight text-sm md:text-base transition-colors hover:bg-violet hover:text-cream"
            >
              <span>Zamów stronę</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#pakiet"
              className="font-mono text-xs uppercase tracking-[0.3em] border-b border-ink/40 pb-1 hover:border-ink"
            >
              Zobacz pakiet
            </a>
          </div>
        </div>

        {/* price — pojedynczy motyw w bloku koloru */}
        <div className="hidden md:flex absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 flex-col items-end text-cream">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/70">
            / Inwestycja
          </div>
          <div className="font-heading font-normal text-[11vw] lg:text-[10vw] leading-none tracking-tighter mt-3">
            999<span className="text-lime">.</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/70 mt-3">
            PLN netto · one-page
          </div>
        </div>

        {/* mobile price */}
        <div className="md:hidden mt-12 pt-6 border-t border-ink/15 flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60">/ Inwestycja</span>
          <span className="font-heading text-5xl tracking-tighter">
            999<span className="text-violet">.</span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 align-top">PLN</span>
          </span>
        </div>

        {/* bottom row */}
        <div className="mt-12 md:mt-0 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full border border-ink/40 flex items-center justify-center">
              <span className="block w-1.5 h-1.5 rounded-full bg-ink animate-bounce" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60">
              Scroll
            </span>
          </div>
          <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.35em] text-cream/70">
            Motion · Editorial · 2026
          </div>
        </div>
      </div>
    </section>
  );
}
