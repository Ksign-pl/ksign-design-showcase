import { useEffect, useRef } from "react";

const FLOATING = [
  { label: "999 zł netto", pos: "top-[8%] left-[4%]", tilt: -6, color: "bg-white", depth: 0.6 },
  {
    label: "Realizacja 3–7 dni",
    pos: "top-[14%] right-[6%]",
    tilt: 5,
    color: "bg-lime",
    depth: 0.9,
  },
  { label: "Mobile ready", pos: "top-[42%] left-[2%]", tilt: 3, color: "bg-white", depth: 0.4 },
  {
    label: "SEO startowe",
    pos: "top-[55%] right-[3%]",
    tilt: -4,
    color: "bg-violet text-ink",
    depth: 0.7,
  },
  {
    label: "Formularz kontaktowy",
    pos: "bottom-[22%] left-[6%]",
    tilt: 4,
    color: "bg-white",
    depth: 0.5,
  },
  { label: "One-page", pos: "bottom-[28%] right-[8%]", tilt: -3, color: "bg-white", depth: 0.8 },
  { label: "Premium look", pos: "top-[28%] right-[18%]", tilt: 6, color: "bg-lime", depth: 0.3 },
  {
    label: "Bez chaosu",
    pos: "bottom-[10%] right-[24%]",
    tilt: -2,
    color: "bg-white",
    depth: 0.55,
  },
];

export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const mockup = mockupRef.current;
    const cards = cardsRef.current;
    if (!scene || !mockup || !cards) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    // Skip all scroll/touch-driven motion on mobile — biggest INP/TBT win.
    if (isMobile) return;
    const scrollFactor = 0.08;
    const pointerFactor = 1;

    let inView = true;
    let ticking = false;
    // target pointer offset (-0.5..0.5) and smoothed values for damping
    let tx = 0,
      ty = 0;
    let mx = 0,
      my = 0;
    let animating = false;

    const apply = () => {
      ticking = false;
      // Two-speed easing: snappy on the way out (follow finger),
      // slow & gentle on the way back to center (no abrupt snap).
      const recentering = tx === 0 && ty === 0;
      // Use eased lerp factor — smaller when recentering, frame-rate independent enough at 60fps.
      const ease = recentering ? 0.05 : 0.14;
      mx += (tx - mx) * ease;
      my += (ty - my) * ease;
      // Hard snap once virtually at rest to stop the rAF loop cleanly
      if (recentering) {
        if (Math.abs(mx) < 0.0008) mx = 0;
        if (Math.abs(my) < 0.0008) my = 0;
      }

      const rect = scene.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -1;
      const py = offset * scrollFactor;

      mockup.style.transform = `translate3d(${mx * 8}px, ${py}px, 0)`;
      cards.style.setProperty("--px", `${mx * 12}px`);
      cards.style.setProperty("--py", `${py * 0.4 + my * 8}px`);

      const settled = mx === tx && my === ty;
      if (!settled && inView) {
        ticking = true;
        animating = true;
        requestAnimationFrame(apply);
      } else {
        animating = false;
      }
    };

    const requestTick = () => {
      if (!ticking && inView) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const onScroll = () => requestTick();

    const setTargetFromPoint = (clientX: number, clientY: number) => {
      const r = scene.getBoundingClientRect();
      // Only react when the pointer is actually over the hero; outside → recenter
      const inside =
        clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
      if (!inside) {
        tx = 0;
        ty = 0;
      } else {
        tx = ((clientX - r.left) / r.width - 0.5) * pointerFactor;
        ty = ((clientY - r.top) / r.height - 0.5) * pointerFactor;
      }
      if (!animating) requestTick();
    };

    const onMouse = (e: MouseEvent) => setTargetFromPoint(e.clientX, e.clientY);
    const onMouseLeave = () => {
      tx = 0;
      ty = 0;
      requestTick();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTargetFromPoint(t.clientX, t.clientY);
    };
    // Slowly recenter when finger lifts
    const onTouchEnd = () => {
      tx = 0;
      ty = 0;
      requestTick();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) requestTick();
      },
      { threshold: 0 },
    );
    io.observe(scene);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (isMobile) {
      // Listen on window so we still get updates (and recenter) when the
      // finger drifts outside the hero while the gesture is ongoing.
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    } else {
      scene.addEventListener("mousemove", onMouse);
      scene.addEventListener("mouseleave", onMouseLeave);
    }
    apply();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      scene.removeEventListener("mousemove", onMouse);
      scene.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className="relative min-h-screen pt-24 md:pt-28 pb-32 overflow-hidden grid-bg"
    >
      {/* radial wash — pure gradient (no blur filter) for cheap GPU compositing */}
import { trackCta } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-cream text-ink">
      {/* subtle grid ticks */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(closest-side, var(--lime) 0%, color-mix(in oklab, var(--lime) 0%, transparent) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Top label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12 animate-fade-in">
          <div className="pill">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            Pakiet Start dostępny teraz
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-ink/60">
            <span className="font-mono">[ 01 / HERO ]</span>
            <span>—</span>
            <span>premium web design</span>
          </div>
        </div>

        {/* Top huge text */}
        <h1 className="text-display-tight text-[18vw] md:text-[12vw] lg:text-[11rem] animate-fade-up">
          <span className="sr-only">KSIGN — premium strony internetowe za 999 zł</span>
          <span aria-hidden="true">STRONY,</span>
        </h1>

        {/* Mockup + floating cards */}
        <div className="relative my-6 md:my-10 h-[420px] md:h-[480px] lg:h-[520px]">
          {/* Floating cards layer (parallax via CSS vars) */}
          <div
            ref={cardsRef}
            className="absolute inset-0"
            style={{ ["--px" as never]: "0px", ["--py" as never]: "0px", contain: "layout paint" }}
          >
            {FLOATING.map((f, i) => (
              <FloatingCard key={f.label} index={i} {...f} />
            ))}
          </div>

          {/* Phone mockup */}
          <div
            ref={mockupRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-scale-in"
            style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
          >
            <div className="phone-tilt origin-center rotate-[10deg] md:rotate-[22deg] lg:rotate-[30deg]">
              <PhoneMockup />
            </div>
          </div>
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

        {/* Subhead + CTAs */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-12 items-end">
          <p className="text-lg md:text-xl text-ink/70 max-w-xl leading-snug">
            Projektujemy nowoczesne strony internetowe dla firm, które chcą wyglądać profesjonalnie
            od pierwszego kliknięcia.
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

function FloatingCard({
  label,
  pos,
  tilt,
  color,
  depth,
  index,
}: {
  label: string;
  pos: string;
  tilt: number;
  color: string;
  depth: number;
  index: number;
}) {
  const duration = 6 + (index % 4) * 0.8;
  const delay = (index * 0.35) % 2.5;
  return (
    <div
      className={`absolute pill pill-light ${color} ${pos}`}
      style={{
        transform: `translate3d(calc(var(--px) * ${depth}), calc(var(--py) * ${depth}), 0) rotate(${tilt}deg)`,
        animation: `heroDrift ${duration}s ease-in-out ${delay}s infinite`,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {label}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-mockup relative w-[260px] md:w-[300px] aspect-[9/19] rounded-[42px] bg-ink p-3">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink rounded-b-2xl z-20" />
      {/* Side button hints */}
      <div className="absolute left-[-2px] top-[120px] w-[2px] h-10 bg-ink/80 rounded-l" />
      <div className="absolute right-[-2px] top-[150px] w-[2px] h-14 bg-ink/80 rounded-r" />
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
        </div>

        {/* Scrolling content */}
        <div className="absolute inset-x-0 top-[44px] bottom-0 overflow-hidden">
          <div className="phone-scroll flex flex-col">
            {/* Hero */}
            <div className="px-4 pt-3 pb-4">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">
                [ 01 / Hero ]
              </div>
              <div className="text-[22px] leading-[0.9] font-black tracking-tighter">
                STRONA
                <br />
                ZA 999
                <br />
                ZŁ.
              </div>
              <div className="mt-2.5 text-[8px] text-ink/60 leading-tight">
                Premium web design dla małych firm i marek osobistych.
              </div>
              <div className="mt-3 inline-flex items-center gap-1 bg-ink text-cream text-[8px] px-2.5 py-1.5 rounded-full font-semibold">
                Zamów →
              </div>
            </div>

            {/* Tiles */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-xl bg-lime flex items-end p-2 text-[8px] font-bold">
                3–7 dni
              </div>
              <div className="aspect-square rounded-xl bg-violet flex items-end p-2 text-[8px] font-bold">
                Mobile
              </div>
            </div>

            {/* Co dostajesz */}
            <div className="px-4 py-4 bg-white">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">
                [ 02 / Pakiet ]
              </div>
              <div className="text-[14px] font-black tracking-tight leading-tight mb-2">
                CO DOSTAJESZ?
              </div>
              <ul className="space-y-1 text-[8px]">
                {[
                  "One-page premium",
                  "Mobile ready",
                  "SEO startowe",
                  "Formularz kontaktowy",
                  "Hosting na rok",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-lime" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="px-4 py-4">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">
                [ 03 / Proces ]
              </div>
              <div className="space-y-1.5">
                {[
                  ["01", "Brief"],
                  ["02", "Projekt"],
                  ["03", "Wdrożenie"],
                  ["04", "Launch"],
                ].map(([n, t]) => (
                  <div
                    key={n}
                    className="flex items-center justify-between border-b border-ink/10 pb-1 text-[9px]"
                  >
                    <span className="font-mono text-ink/50">{n}</span>
                    <span className="font-bold">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div className="px-4 py-4">
              <div className="rounded-xl bg-ink text-cream p-3">
                <div className="text-[7px] font-mono uppercase tracking-widest opacity-60 mb-1">
                  [ 04 / Cena ]
                </div>
                <div className="text-[24px] font-black tracking-tighter leading-none">
                  999 <span className="text-lime">ZŁ</span>
                </div>
                <div className="text-[7px] opacity-70 mt-1">Jednorazowo, netto.</div>
                <div className="mt-2 inline-flex items-center gap-1 bg-lime text-ink text-[8px] px-2 py-1 rounded-full font-bold">
                  Zamawiam →
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="px-4 py-4 bg-white">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">
                [ 05 / FAQ ]
              </div>
              {["Ile trwa realizacja?", "Co jeśli nie mam treści?", "Czy mogę rozbudować?"].map(
                (q) => (
                  <div
                    key={q}
                    className="flex items-center justify-between border-b border-ink/10 py-1.5 text-[9px]"
                  >
                    <span>{q}</span>
                    <span className="font-mono text-ink/40">+</span>
                  </div>
                ),
              )}
            </div>

            {/* CTA */}
            <div className="px-4 py-5 bg-lime">
              <div className="text-[14px] font-black tracking-tight leading-tight">
                ZACZNIJMY
                <br />
                TWOJĄ STRONĘ.
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-ink text-cream text-[8px] px-2.5 py-1.5 rounded-full font-semibold">
                Napisz do nas →
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-ink text-cream text-[7px] flex items-center justify-between">
              <span className="font-black">KSIGN.</span>
              <span className="opacity-60">© 2026</span>
            </div>
          <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.35em] text-cream/70">
            Motion · Editorial · 2026
          </div>
        </div>
      </div>
    </section>
  );
}
