import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";

const LEFT = [
  "wygląda przypadkowo",
  "nie budzi zaufania",
  "chaos w ofercie",
  "słaby mobile",
  "brak jasnego CTA",
];
const RIGHT = [
  "wygląda profesjonalnie",
  "prowadzi do kontaktu",
  "porządkuje ofertę",
  "działa dobrze na telefonie",
  "buduje pierwsze wrażenie",
];

export function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(15); // 0-100, initial "before" heavy
  const [reduce, setReduce] = useState(false);
  const dragging = useRef(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    if (m.matches) setSplit(50);
  }, []);

  // Scroll-driven split: as user scrolls through the section, divider slides 15% → 85%
  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (dragging.current) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 when top of section reaches bottom of viewport,
        // 1 when bottom of section reaches top of viewport
        const total = rect.height + vh;
        const passed = vh - rect.top;
        const p = Math.max(0, Math.min(1, passed / total));
        // ease into range 15–85
        const eased = 15 + p * 70;
        setSplit(eased);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  // Optional drag to compare (desktop nicety)
  const compareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = compareRef.current;
    if (!el) return;

    const setFromClientX = (clientX: number) => {
      const r = el.getBoundingClientRect();
      const p = ((clientX - r.left) / r.width) * 100;
      setSplit(Math.max(0, Math.min(100, p)));
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setFromClientX(e.clientX);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onPointerUp = () => {
      dragging.current = false;
    };
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8" ref={sectionRef}>
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/70 mb-8">
          [ 04 / Różnica ]
        </div>
        <h2 className="text-display-tight text-[12vw] md:text-[7vw] lg:text-[6.5rem] mb-16 md:mb-20">
          RÓŻNICA
          <br />
          JEST
          <br />W <span className="bg-lime px-3 rounded-2xl">ODBIORZE.</span>
        <h2 className="text-display-tight text-[12vw] md:text-[7vw] lg:text-[6.5rem] mb-10 md:mb-16">
          RÓŻNICA<br />JEST<br />
          W <span className="bg-lime px-3 rounded-2xl">ODBIORZE.</span>
        </h2>

        {/* Scroll-scrubbed video compare */}
        <div
          ref={compareRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-ink border border-ink/10 shadow-2xl cursor-ew-resize select-none touch-none"
          role="img"
          aria-label="Porównanie: strona typowa vs. strona KSIGN. Przesuń, żeby porównać."
        >
          {/* AFTER — full layer underneath */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 72% 28%, color-mix(in oklab, var(--violet) 52%, transparent), transparent 66%), radial-gradient(54% 48% at 22% 86%, color-mix(in oklab, var(--lime) 28%, transparent), transparent 70%), linear-gradient(135deg, color-mix(in oklab, var(--ink) 92%, var(--cream)), var(--ink))",
            }}
          />
          <div aria-hidden className="absolute inset-0 grid-bg-dark opacity-25" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 30%, oklch(0.74 0.16 300 / 0.35) 0%, transparent 60%)",
            }}
          />

          {/* BEFORE — clipped by split */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - split}% 0 0)`,
              transition: dragging.current ? "none" : "clip-path 120ms linear",
            }}
            aria-hidden
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--ink) 86%, var(--cream)), var(--ink))",
                filter: "grayscale(0.85) brightness(0.55) contrast(0.9)",
              }}
            />
            <div aria-hidden className="absolute inset-0 grid-bg-dark opacity-20" />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(10,10,12,0.35)" }}
            />
          </div>

          {/* Labels */}
          <div className="pointer-events-none absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/80 bg-ink/60 backdrop-blur px-3 py-1.5 rounded-full">
            <X size={12} aria-hidden /> Przed
          </div>
          <div className="pointer-events-none absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-ink bg-lime px-3 py-1.5 rounded-full">
            <Check size={12} aria-hidden /> KSIGN
          </div>

          {/* Divider handle */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-px bg-lime"
            style={{
              left: `${split}%`,
              boxShadow: "0 0 24px oklch(0.93 0.21 122 / 0.6)",
            }}
            aria-hidden
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-lime text-ink flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xl">
              <span className="flex items-center gap-0.5">
                <span aria-hidden>‹</span>
                <span aria-hidden>›</span>
              </span>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="pointer-events-none absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/70 bg-ink/60 backdrop-blur px-3 py-1.5 rounded-full">
            Scroll — porównaj · przeciągnij handle
          </div>
        </div>

        {/* Pros/cons summary below */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-10 md:mt-14">
          <div className="bg-white border border-ink/10 rounded-3xl p-7 md:p-10 opacity-70">
            <div className="text-xs font-mono uppercase tracking-widest text-ink/80 mb-4">
              Tak
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6 text-ink/80">
              Strona, która tylko istnieje
            </h3>
            <ul className="space-y-3">
              {LEFT.map((l) => (
                <li key={l} className="flex items-start gap-3 text-ink/80">
                  <span className="mt-0.5 w-5 h-5 rounded-full border border-ink/20 flex items-center justify-center">
                    <X size={12} className="stroke-2" />
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-ink text-cream rounded-3xl p-7 md:p-10 glow-lime">
            <div className="absolute -top-3 -right-3 pill bg-lime text-ink font-bold rotate-3">
              KSIGN ✓
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-lime mb-4">
              Inaczej
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Strona KSIGN</h3>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
              Strona KSIGN
            </h3>
            <ul className="space-y-3">
              {RIGHT.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-lime flex items-center justify-center">
                    <Check size={12} className="text-ink stroke-[3]" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
