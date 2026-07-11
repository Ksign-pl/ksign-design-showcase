import { useCallback, useEffect, useRef, useState } from "react";

type Frame = {
  kicker: string;
  title: string;
  caption: string;
  bg: string;
  fg: string;
  motif: "arch" | "column" | "cornice" | "circle" | "sun" | "grid";
};

const FRAMES: Frame[] = [
  {
    kicker: "01 / Identyfikacja",
    title: "Editorial\nspokój.",
    caption: "Dużo powietrza, jeden mocny motyw w kadrze.",
    bg: "var(--violet)",
    fg: "var(--cream)",
    motif: "arch",
  },
  {
    kicker: "02 / Kolor",
    title: "Blok\nturkusu.",
    caption: "Nasycone plamy koloru zamiast dekoracji.",
    bg: "var(--lime)",
    fg: "var(--cream)",
    motif: "circle",
  },
  {
    kicker: "03 / Motyw",
    title: "Klasyka\nw kadrze.",
    caption: "Detale antycznej architektury jako sygnatura.",
    bg: "var(--cream)",
    fg: "var(--ink)",
    motif: "column",
  },
  {
    kicker: "04 / Kompozycja",
    title: "Asymetria.\nCiężar.",
    caption: "Kadr wycięty jak z magazynu — bez kompromisów.",
    bg: "var(--ink)",
    fg: "var(--cream)",
    motif: "cornice",
  },
  {
    kicker: "05 / Światło",
    title: "Kinematyczne\nramy.",
    caption: "Kontrast światła i cienia buduje głębię.",
    bg: "var(--violet)",
    fg: "var(--cream)",
    motif: "sun",
  },
  {
    kicker: "06 / Rytm",
    title: "Siatka\ni chaos.",
    caption: "Uporządkowany chaos — precyzja z charakterem.",
    bg: "var(--lime)",
    fg: "var(--cream)",
    motif: "grid",
  },
  {
    kicker: "07 / Typografia",
    title: "Serif\nmówi.",
    caption: "Instrument Serif jako główny bohater sekcji.",
    bg: "var(--cream)",
    fg: "var(--ink)",
    motif: "arch",
  },
];

function Motif({ kind, color }: { kind: Frame["motif"]; color: string }) {
  const c = color;
  const stroke = { stroke: c, strokeWidth: 1.25, fill: "none" as const };
  switch (kind) {
    case "arch":
      return (
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden>
          <path d="M40 250 V120 A60 60 0 0 1 160 120 V250" {...stroke} />
          <path d="M55 250 V125 A45 45 0 0 1 145 125 V250" {...stroke} />
          <line x1="20" y1="250" x2="180" y2="250" {...stroke} />
        </svg>
      );
    case "column":
      return (
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden>
          <rect x="30" y="30" width="140" height="12" {...stroke} />
          <rect x="40" y="42" width="120" height="180" {...stroke} />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={55 + i * 18} y1="42" x2={55 + i * 18} y2="222" {...stroke} />
          ))}
          <rect x="30" y="222" width="140" height="14" {...stroke} />
        </svg>
      );
    case "cornice":
      return (
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden>
          <path d="M10 80 L100 20 L190 80" {...stroke} />
          <line x1="10" y1="95" x2="190" y2="95" {...stroke} />
          <line x1="30" y1="110" x2="170" y2="110" {...stroke} />
          <rect x="40" y="120" width="120" height="120" {...stroke} />
        </svg>
      );
    case "circle":
      return (
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden>
          <circle cx="100" cy="130" r="90" {...stroke} />
          <circle cx="100" cy="130" r="60" {...stroke} />
          <circle cx="100" cy="130" r="30" {...stroke} />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden>
          <circle cx="100" cy="140" r="55" {...stroke} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = 100 + Math.cos(a) * 70;
            const y1 = 140 + Math.sin(a) * 70;
            const x2 = 100 + Math.cos(a) * 95;
            const y2 = 140 + Math.sin(a) * 95;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />;
          })}
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={40 + i * 36} x2="180" y2={40 + i * 36} {...stroke} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 30} y1="40" x2={40 + i * 30} y2="220" {...stroke} />
          ))}
        </svg>
      );
  }
}

export function Moodboard() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollTo = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = el.querySelectorAll<HTMLElement>("[data-frame]")[idx];
    if (!target) return;
    el.scrollTo({
      left: target.offsetLeft - 24,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      const frames = el.querySelectorAll<HTMLElement>("[data-frame]");
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      frames.forEach((f, i) => {
        const c = f.offsetLeft + f.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Drag-to-scroll (mouse). Touch already works natively.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section
      id="moodboard"
      aria-label="Moodboard identyfikacji"
      className="relative bg-cream text-ink py-20 md:py-28"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.3em] uppercase text-ink/60 font-medium">
              Moodboard · SM Identity
            </div>
            <h2
              className="font-heading mt-3 text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] tracking-[-0.03em]"
            >
              Kadry, które
              <br />
              <em className="italic text-violet">niosą markę.</em>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-ink/60">
            <span>Przeciągnij</span>
            <span className="inline-block h-px w-10 bg-ink/40" />
            <span>albo strzałki ←→</span>
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Moodboard — przewijalna galeria"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollTo(Math.min(active + 1, FRAMES.length - 1));
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollTo(Math.max(active - 1, 0));
          }
        }}
        className="no-scrollbar mt-12 flex gap-5 overflow-x-auto overflow-y-hidden px-6 md:px-10 pb-4 cursor-grab select-none [scroll-snap-type:x_mandatory] [scrollbar-width:none]"
        style={{ scrollPaddingLeft: "24px", scrollPaddingRight: "24px" }}
      >
        {FRAMES.map((frame, i) => {
          const isActive = i === active;
          return (
            <article
              key={i}
              data-frame
              className="relative shrink-0 [scroll-snap-align:center] overflow-hidden rounded-[6px] transition-[transform,filter] duration-500 ease-out"
              style={{
                width: "min(78vw, 620px)",
                aspectRatio: "3 / 4",
                background: frame.bg,
                color: frame.fg,
                transform: isActive ? "scale(1)" : "scale(0.94)",
                filter: isActive ? "none" : "brightness(0.82) saturate(0.85)",
              }}
            >
              {/* Motif — one silent element per frame */}
              <div
                aria-hidden
                className="absolute inset-y-0 right-[-8%] w-[70%] opacity-[0.35] pointer-events-none"
                style={{
                  transform: `translateX(${(progress - i / (FRAMES.length - 1)) * -60}px)`,
                  transition: "transform 200ms linear",
                }}
              >
                <Motif kind={frame.motif} color={frame.fg} />
              </div>

              {/* Grain */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15), transparent 60%)",
                }}
              />

              {/* Chrome + type */}
              <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between text-[11px] tracking-[0.28em] uppercase font-medium opacity-80">
                  <span>{frame.kicker}</span>
                  <span>{String(i + 1).padStart(2, "0")}/{String(FRAMES.length).padStart(2, "0")}</span>
                </div>

                <div>
                  <h3
                    className="font-heading text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] tracking-[-0.03em] whitespace-pre-line"
                  >
                    {frame.title}
                  </h3>
                  <p className="mt-4 max-w-[36ch] text-sm md:text-base leading-snug opacity-85">
                    {frame.caption}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
        {/* trailing spacer so last frame can center */}
        <div aria-hidden className="shrink-0 w-[10vw]" />
      </div>

      {/* Controls */}
      <div className="mx-auto mt-8 max-w-[1600px] px-6 md:px-10">
        <div className="flex items-center gap-6">
          {/* Progress bar */}
          <div className="relative h-px flex-1 bg-ink/15">
            <div
              className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>

          {/* Counter */}
          <div className="font-heading text-lg tabular-nums tracking-tight">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span className="opacity-40"> / {String(FRAMES.length).padStart(2, "0")}</span>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Poprzedni kadr"
              onClick={() => scrollTo(Math.max(active - 1, 0))}
              disabled={active === 0}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-cream text-ink transition hover:bg-ink hover:text-cream disabled:opacity-30 disabled:hover:bg-cream disabled:hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Następny kadr"
              onClick={() => scrollTo(Math.min(active + 1, FRAMES.length - 1))}
              disabled={active === FRAMES.length - 1}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-ink text-cream transition hover:bg-violet disabled:opacity-30 disabled:hover:bg-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots (mobile-friendly jump) */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {FRAMES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Kadr ${i + 1}`}
              onClick={() => scrollTo(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 28 : 12,
                background: i === active ? "var(--ink)" : "color-mix(in oklab, var(--ink) 20%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
