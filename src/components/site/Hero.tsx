import { useEffect, useRef } from "react";

const FLOATING = [
  { label: "999 zł netto",         pos: "top-[8%] left-[4%]",       tilt: -6, color: "bg-white",            depth: 0.6 },
  { label: "Realizacja 3–7 dni",   pos: "top-[14%] right-[6%]",     tilt:  5, color: "bg-lime",             depth: 0.9 },
  { label: "Mobile ready",         pos: "top-[42%] left-[2%]",      tilt:  3, color: "bg-white",            depth: 0.4 },
  { label: "SEO startowe",         pos: "top-[55%] right-[3%]",     tilt: -4, color: "bg-violet text-ink",  depth: 0.7 },
  { label: "Formularz kontaktowy", pos: "bottom-[22%] left-[6%]",   tilt:  4, color: "bg-white",            depth: 0.5 },
  { label: "One-page",             pos: "bottom-[28%] right-[8%]",  tilt: -3, color: "bg-white",            depth: 0.8 },
  { label: "Premium look",         pos: "top-[28%] right-[18%]",    tilt:  6, color: "bg-lime",             depth: 0.3 },
  { label: "Bez chaosu",           pos: "bottom-[10%] right-[24%]", tilt: -2, color: "bg-white",            depth: 0.55 },
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
    // Lighter motion on mobile
    const scrollFactor = isMobile ? 0.04 : 0.08;
    const pointerFactor = isMobile ? 0.45 : 1; // touch is gentler than mouse

    let inView = true;
    let ticking = false;
    // target pointer offset (-0.5..0.5) and smoothed values for damping
    let tx = 0, ty = 0;
    let mx = 0, my = 0;
    let animating = false;

    const apply = () => {
      ticking = false;
      // Damp toward target — same easing for mouse and touch
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;

      const rect = scene.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -1;
      const py = offset * scrollFactor;

      mockup.style.transform = `translate3d(${mx * 8}px, ${py}px, 0)`;
      cards.style.setProperty("--px", `${mx * 12}px`);
      cards.style.setProperty("--py", `${py * 0.4 + my * 8}px`);

      // Continue smoothing until close enough
      const settled = Math.abs(tx - mx) < 0.001 && Math.abs(ty - my) < 0.001;
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
      tx = ((clientX - r.left) / r.width - 0.5) * pointerFactor;
      ty = ((clientY - r.top) / r.height - 0.5) * pointerFactor;
      if (!animating) requestTick();
    };

    const onMouse = (e: MouseEvent) => setTargetFromPoint(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTargetFromPoint(t.clientX, t.clientY);
    };
    // Slowly recenter when finger lifts
    const onTouchEnd = () => { tx = 0; ty = 0; requestTick(); };

    const io = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; if (inView) requestTick(); },
      { threshold: 0 }
    );
    io.observe(scene);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (isMobile) {
      scene.addEventListener("touchmove", onTouch, { passive: true });
      scene.addEventListener("touchend", onTouchEnd, { passive: true });
      scene.addEventListener("touchcancel", onTouchEnd, { passive: true });
    } else {
      scene.addEventListener("mousemove", onMouse);
    }
    apply();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      scene.removeEventListener("mousemove", onMouse);
      scene.removeEventListener("touchmove", onTouch);
      scene.removeEventListener("touchend", onTouchEnd);
      scene.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <section ref={sceneRef} className="relative min-h-screen pt-24 md:pt-28 pb-32 overflow-hidden grid-bg">
      {/* radial wash — pure gradient (no blur filter) for cheap GPU compositing */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(closest-side, var(--lime) 0%, color-mix(in oklab, var(--lime) 0%, transparent) 70%)",
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
          STRONY,
        </h1>

        {/* Mockup + floating cards */}
        <div className="relative my-6 md:my-10 h-[420px] md:h-[480px] lg:h-[520px]">
          {/* Floating cards layer (parallax via CSS vars) */}
          <div ref={cardsRef} className="absolute inset-0" style={{ ["--px" as never]: "0px", ["--py" as never]: "0px", contain: "layout paint" }}>
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
            <PhoneMockup />
          </div>
        </div>

        {/* Bottom huge text with inline 999 */}
        <div className="flex items-end justify-between gap-6 flex-wrap animate-fade-up">
          <h2 className="text-display-tight text-[18vw] md:text-[12vw] lg:text-[11rem]">
            ZA{" "}
            <span className="inline-block px-4 md:px-6 bg-lime rounded-2xl md:rounded-3xl">
              999
            </span>{" "}
            ZŁ
          </h2>
        </div>

        {/* Subhead + CTAs */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-12 items-end">
          <p className="text-lg md:text-xl text-ink/70 max-w-xl leading-snug">
            Projektujemy nowoczesne strony internetowe dla firm, które chcą wyglądać
            profesjonalnie od pierwszego kliknięcia.
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-4 rounded-full font-semibold hover:bg-violet hover:text-ink transition-all"
            >
              Zamów stronę za 999 zł →
            </a>
            <a
              href="#pakiet"
              className="inline-flex items-center gap-2 bg-white border border-ink/15 px-6 py-4 rounded-full font-semibold hover:border-ink transition-all"
            >
              Zobacz pakiet Start
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  label, pos, tilt, color, depth, index,
}: { label: string; pos: string; tilt: number; color: string; depth: number; index: number }) {
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
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink rounded-b-2xl z-10" />
      <div className="w-full h-full rounded-[32px] bg-cream overflow-hidden relative">
        <div className="px-4 pt-8 pb-4 flex items-center justify-between">
          <div className="text-[10px] font-black tracking-tighter">KSIGN.</div>
          <div className="w-6 h-1.5 bg-ink rounded" />
        </div>
        <div className="px-4 mt-4">
          <div className="text-[22px] leading-[0.9] font-black tracking-tighter">
            STRONA<br/>ZA 999<br/>ZŁ.
          </div>
          <div className="mt-3 text-[8px] text-ink/60 leading-tight">
            Premium web design dla małych firm i marek osobistych.
          </div>
          <div className="mt-3 inline-flex items-center gap-1 bg-ink text-cream text-[8px] px-2.5 py-1.5 rounded-full font-semibold">
            Zamów →
          </div>
        </div>
        <div className="px-4 mt-4 grid grid-cols-2 gap-2">
          <div className="aspect-square rounded-xl bg-lime flex items-end p-2 text-[8px] font-bold">3–7 dni</div>
          <div className="aspect-square rounded-xl bg-violet flex items-end p-2 text-[8px] font-bold">Mobile</div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-cream to-transparent" />
      </div>
    </div>
  );
}
