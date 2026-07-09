import { useEffect, useRef } from "react";

export function Hero() {
  const sceneRef = useRef<HTMLElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  // Pointer parallax — desktop only, single RAF loop, respects prefers-reduced-motion.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0;
    const loop = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      if (cardARef.current)
        cardARef.current.style.transform = `translate3d(${mx * 22}px, ${my * 22}px, 0) rotate(-6deg)`;
      if (cardBRef.current)
        cardBRef.current.style.transform = `translate3d(${mx * -18}px, ${my * -18}px, 0) rotate(12deg)`;
      if (blobRef.current)
        blobRef.current.style.transform = `translate3d(${mx * 40}px, ${my * 40}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className="relative min-h-[100svh] flex flex-col justify-between px-5 md:px-10 pt-24 md:pt-28 pb-10 md:pb-16 overflow-hidden"
    >
      {/* lime blob */}
      <div
        ref={blobRef}
        aria-hidden
        className="absolute -top-24 -right-24 md:-top-32 md:-right-20 w-[70vw] md:w-[46vw] h-[70vw] md:h-[46vw] rounded-full pointer-events-none"
        style={{
          background: "var(--lime)",
          filter: "blur(120px)",
          opacity: 0.45,
          willChange: "transform",
        }}
      />
      {/* editorial grid ticks */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink) 1px, transparent 1px)",
          backgroundSize: "8.333% 100%",
        }}
      />

      {/* TOP: status row */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-8 md:mb-0">
        <span className="inline-block px-3 py-1 bg-violet text-cream text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
          Premium Studio · 2026
        </span>
        <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
          <span>[ 01 / Hero ]</span>
          <span>PL · Web · One-page</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid md:grid-cols-12 gap-y-10 md:gap-x-8 items-end">
        {/* Left: mega wordmark + tagline */}
        <div className="md:col-span-8">
          <h1 className="font-heading font-bold uppercase leading-[0.82] tracking-tighter text-[22vw] md:text-[15vw]">
            <span className="sr-only">KSIGN — premium strony internetowe za 999 zł netto w 7 dni</span>
            <span aria-hidden="true" className="block">Strony</span>
            <span aria-hidden="true" className="block">
              które<span className="text-violet">.</span>
            </span>
            <span
              aria-hidden="true"
              className="block italic font-light text-ink/25"
              style={{ fontStyle: "italic" }}
            >
              sprzedają
            </span>
          </h1>

          <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-2xl leading-snug text-ink/80">
            One-page, który{" "}
            <span className="bg-lime px-2 py-0.5 font-semibold text-ink">
              sprzedaje designem
            </span>
            , nie tylko kodem. Nowy standard web 2026 — dla firm, które nie
            wyglądają jak wszyscy.
          </p>
        </div>

        {/* Right: price + floating cards */}
        <div className="md:col-span-4 relative min-h-[300px] md:min-h-[420px]">
          {/* Price block */}
          <div className="reveal-up bg-ink text-cream p-6 md:p-8 md:-mr-4 md:-mt-8 md:ml-4 relative z-20 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cream/60">
                / Inwestycja
              </span>
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            </div>
            <div className="font-heading font-bold text-6xl md:text-7xl leading-none tracking-tighter">
              999<span className="text-violet">.</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2 text-cream/70">
              <span className="font-mono text-xs uppercase tracking-widest">PLN netto</span>
              <span className="text-xs">·</span>
              <span className="font-mono text-xs uppercase tracking-widest">one-page</span>
            </div>

            <a
              href="#kontakt"
              title="Zamów stronę za 999 zł — przejdź do formularza"
              aria-label="Zamów stronę za 999 zł — przejdź do formularza kontaktowego"
              className="group mt-6 md:mt-8 flex items-center justify-between gap-3 bg-lime text-ink px-5 py-4 font-heading font-bold uppercase tracking-tight text-sm md:text-base transition-colors hover:bg-cream"
            >
              <span>Zamów stronę</span>
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-full bg-ink text-lime flex items-center justify-center transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          {/* Floating card A: 3-7 dni — cream, tilted */}
          <div
            ref={cardARef}
            className="hidden md:block absolute -left-6 top-[70%] w-[220px] bg-cream border border-ink p-4 z-10 shadow-[8px_8px_0_0_var(--ink)]"
            style={{ transform: "rotate(-6deg)", willChange: "transform" }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
              / Dostawa
            </span>
            <span className="block font-heading font-bold text-3xl italic mt-1 tracking-tight">
              3–7 dni
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-ink/60 mt-1">
              roboczych
            </span>
          </div>

          {/* Floating card B: violet stamp */}
          <div
            ref={cardBRef}
            className="hidden md:flex absolute right-0 -bottom-4 w-32 h-32 bg-violet text-cream rounded-full items-center justify-center text-center leading-tight p-4 z-10"
            style={{ transform: "rotate(12deg)", willChange: "transform" }}
          >
            <span className="font-heading font-bold text-[11px] uppercase tracking-[0.2em]">
              Nowy<br />Standard<br />2026
            </span>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        aria-hidden
        className="relative z-10 mt-10 md:mt-16 border-y-2 border-ink py-3 md:py-4 overflow-hidden bg-cream"
      >
        <div
          className="whitespace-nowrap flex gap-10"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-10 shrink-0">
              {[
                "Broken grid",
                "Scroll-driven CSS",
                "Awwwards-level",
                "3–7 dni roboczych",
                "999 PLN netto",
                "Bez szablonów",
                "Core Web Vitals 2026",
              ].map((t) => (
                <span key={`${dup}-${t}`} className="flex items-center gap-10 shrink-0">
                  <span className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight">
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
          <span className="w-10 h-10 rounded-full border border-ink flex items-center justify-center">
            <span className="block w-2 h-2 rounded-full bg-ink animate-bounce" />
          </span>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-ink/60">
            Scroll — Manifest
          </span>
        </div>
        <a
          href="#pakiet"
          title="Zobacz, co zawiera pakiet Start"
          className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-heading font-bold uppercase text-xs md:text-sm tracking-tight"
        >
          Zobacz pakiet Start
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
