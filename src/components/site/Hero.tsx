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
        clientX >= r.left && clientX <= r.right &&
        clientY >= r.top  && clientY <= r.bottom;
      if (!inside) {
        tx = 0; ty = 0;
      } else {
        tx = ((clientX - r.left) / r.width  - 0.5) * pointerFactor;
        ty = ((clientY - r.top)  / r.height - 0.5) * pointerFactor;
      }
      if (!animating) requestTick();
    };

    const onMouse = (e: MouseEvent) => setTargetFromPoint(e.clientX, e.clientY);
    const onMouseLeave = () => { tx = 0; ty = 0; requestTick(); };
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
            <div
              className="origin-center rotate-[10deg] md:rotate-[22deg] lg:rotate-[30deg]"
              style={{ filter: "drop-shadow(0 30px 40px color-mix(in oklab, var(--ink) 25%, transparent))" }}
            >
              <PhoneMockup />
            </div>
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
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink rounded-b-2xl z-20" />
      {/* Side button hints */}
      <div className="absolute left-[-2px] top-[120px] w-[2px] h-10 bg-ink/80 rounded-l" />
      <div className="absolute right-[-2px] top-[150px] w-[2px] h-14 bg-ink/80 rounded-r" />

      <div className="w-full h-full rounded-[32px] bg-cream overflow-hidden relative">
        {/* Status bar */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 pt-1.5 text-[7px] font-bold z-10">
          <span>9:41</span>
          <span className="flex items-center gap-[3px]">
            <span className="w-[6px] h-[6px] rounded-full bg-ink/80" />
            <span className="w-3 h-1.5 border border-ink/80 rounded-[2px]" />
          </span>
        </div>

        {/* Sticky header */}
        <div className="absolute top-5 inset-x-0 px-4 py-2 flex items-center justify-between bg-cream/90 backdrop-blur-sm z-10 border-b border-ink/5">
          <div className="text-[10px] font-black tracking-tighter">KSIGN.</div>
          <div className="flex flex-col gap-[2px]">
            <span className="w-3 h-[1.5px] bg-ink" />
            <span className="w-3 h-[1.5px] bg-ink" />
          </div>
        </div>

        {/* Scrolling content */}
        <div className="absolute inset-x-0 top-[44px] bottom-0 overflow-hidden">
          <div className="phone-scroll flex flex-col">
            {/* Hero */}
            <div className="px-4 pt-3 pb-4">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">[ 01 / Hero ]</div>
              <div className="text-[22px] leading-[0.9] font-black tracking-tighter">
                STRONA<br/>ZA 999<br/>ZŁ.
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
              <div className="aspect-square rounded-xl bg-lime flex items-end p-2 text-[8px] font-bold">3–7 dni</div>
              <div className="aspect-square rounded-xl bg-violet flex items-end p-2 text-[8px] font-bold">Mobile</div>
            </div>

            {/* Co dostajesz */}
            <div className="px-4 py-4 bg-white">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">[ 02 / Pakiet ]</div>
              <div className="text-[14px] font-black tracking-tight leading-tight mb-2">CO DOSTAJESZ?</div>
              <ul className="space-y-1 text-[8px]">
                {["One-page premium", "Mobile ready", "SEO startowe", "Formularz kontaktowy", "Hosting na rok"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-lime" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="px-4 py-4">
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">[ 03 / Proces ]</div>
              <div className="space-y-1.5">
                {[
                  ["01", "Brief"],
                  ["02", "Projekt"],
                  ["03", "Wdrożenie"],
                  ["04", "Launch"],
                ].map(([n, t]) => (
                  <div key={n} className="flex items-center justify-between border-b border-ink/10 pb-1 text-[9px]">
                    <span className="font-mono text-ink/50">{n}</span>
                    <span className="font-bold">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div className="px-4 py-4">
              <div className="rounded-xl bg-ink text-cream p-3">
                <div className="text-[7px] font-mono uppercase tracking-widest opacity-60 mb-1">[ 04 / Cena ]</div>
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
              <div className="text-[7px] font-mono uppercase tracking-widest text-ink/50 mb-2">[ 05 / FAQ ]</div>
              {["Ile trwa realizacja?", "Co jeśli nie mam treści?", "Czy mogę rozbudować?"].map((q) => (
                <div key={q} className="flex items-center justify-between border-b border-ink/10 py-1.5 text-[9px]">
                  <span>{q}</span>
                  <span className="font-mono text-ink/40">+</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-4 py-5 bg-lime">
              <div className="text-[14px] font-black tracking-tight leading-tight">
                ZACZNIJMY<br/>TWOJĄ STRONĘ.
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
          </div>
        </div>

        {/* Fades */}
        <div className="absolute top-[44px] inset-x-0 h-3 bg-gradient-to-b from-cream to-transparent pointer-events-none z-[5]" />
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-ink/15 to-transparent pointer-events-none" />

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-[3px] rounded-full bg-ink/70 z-10" />
      </div>
    </div>
  );
}
