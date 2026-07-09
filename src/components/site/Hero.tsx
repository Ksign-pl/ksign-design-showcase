import { useEffect, useRef } from "react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lightweight pointer parallax for the dark tilted card — desktop only.
  useEffect(() => {
    const scene = heroRef.current;
    const card = cardRef.current;
    if (!scene || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0;
    const loop = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      card.style.transform = `translate3d(${mx * 18}px, ${my * 18}px, 0) rotate(3deg)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5);
      ty = ((e.clientY - r.top) / r.height - 0.5);
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
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-5 md:px-12 pt-28 pb-24 overflow-hidden grid-bg"
    >
      {/* faint radial wash */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, var(--lime) 0%, color-mix(in oklab, var(--lime) 0%, transparent) 70%)",
        }}
      />

      {/* top status row */}
      <div className="relative z-10 flex items-center justify-between mb-8 md:mb-14">
        <div className="pill">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          Pakiet Start dostępny teraz
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-ink/60">
          <span>[ 01 / Hero ]</span>
          <span>—</span>
          <span>Premium 2026</span>
        </div>
      </div>

      {/* headline broken grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col gap-0">
          <h2 className="font-heading font-bold text-[22vw] md:text-[13vw] uppercase">
            Strony
          </h2>

          <div className="flex items-center gap-3 md:gap-6 -mt-[2vw] flex-wrap">
            <div className="hidden lg:block w-32 xl:w-48 h-[2px] bg-ink" />
            <h2 className="font-heading font-bold text-[22vw] md:text-[13vw] uppercase">
              Które
            </h2>
            <div className="bg-lime px-4 md:px-6 py-2 -rotate-2 shadow-[6px_6px_0_0_var(--ink)]">
              <span className="font-heading font-bold text-2xl md:text-4xl uppercase">
                Premium
              </span>
            </div>
          </div>

          <h1 className="font-heading font-bold text-[26vw] md:text-[18vw] uppercase leading-[0.8] text-outline mt-1">
            <span className="sr-only">KSIGN — premium strony internetowe za 999 zł</span>
            <span aria-hidden="true">ZA 999 ZŁ</span>
          </h1>
        </div>
      </div>

      {/* dark tilted card — broken-grid overlap */}
      <div
        ref={cardRef}
        className="hidden md:flex absolute right-[-4%] lg:right-[2%] top-[38%] w-[38%] lg:w-[28%] aspect-[3/4] bg-ink rotate-3 shadow-2xl overflow-hidden z-20 rounded-md"
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet/25 via-transparent to-lime/10" />
        <div className="relative p-6 lg:p-8 flex flex-col h-full justify-between text-cream">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center text-xl">
              →
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              KSIGN / 2026
            </span>
          </div>
          <div className="font-heading text-xl lg:text-2xl uppercase tracking-tight leading-[0.95]">
            Design<br />przyszłości<br />
            <span className="text-lime">dostępny dziś.</span>
          </div>
        </div>
      </div>

      {/* Sub + CTA row */}
      <div className="relative z-10 mt-12 md:mt-20 grid md:grid-cols-2 gap-8 items-end max-w-[1400px] mx-auto w-full">
        <p className="text-lg md:text-xl text-ink/70 max-w-xl leading-snug">
          Projektujemy nowoczesne strony internetowe dla firm, które chcą wyglądać
          profesjonalnie od pierwszego kliknięcia.
        </p>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href="#kontakt"
            title="Zamów stronę za 999 zł — przejdź do formularza"
            aria-label="Zamów stronę za 999 zł — przejdź do formularza kontaktowego"
            className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-4 rounded-full font-semibold hover:bg-violet hover:text-ink transition-all"
          >
            Zamów stronę za 999 zł <span aria-hidden="true">→</span>
          </a>
          <a
            href="#pakiet"
            title="Zobacz, co zawiera pakiet Start"
            aria-label="Zobacz, co zawiera pakiet Start za 999 zł"
            className="inline-flex items-center gap-2 bg-white border border-ink/15 px-6 py-4 rounded-full font-semibold hover:border-ink transition-all"
          >
            Zobacz pakiet Start
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="hidden md:flex absolute bottom-8 left-12 items-center gap-4 z-10">
        <div className="w-1 h-12 bg-ink/20 overflow-hidden flex flex-col justify-end">
          <div className="w-full h-1/2 bg-lime animate-pulse" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink/70">
          Scroll — Manifest
        </span>
      </div>
    </section>
  );
}
