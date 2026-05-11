import { useEffect, useState } from "react";

const FLOATING = [
  { label: "999 zł netto", style: "top-[8%] left-[4%] rotate-[-6deg]", color: "bg-white" },
  { label: "Realizacja 3–7 dni", style: "top-[14%] right-[6%] rotate-[5deg]", color: "bg-lime" },
  { label: "Mobile ready", style: "top-[42%] left-[2%] rotate-[3deg]", color: "bg-white" },
  { label: "SEO startowe", style: "top-[55%] right-[3%] rotate-[-4deg]", color: "bg-violet text-ink" },
  { label: "Formularz kontaktowy", style: "bottom-[22%] left-[6%] rotate-[4deg]", color: "bg-white" },
  { label: "One-page", style: "bottom-[28%] right-[8%] rotate-[-3deg]", color: "bg-white" },
  { label: "Premium look", style: "top-[28%] right-[18%] rotate-[6deg]", color: "bg-lime" },
  { label: "Bez chaosu", style: "bottom-[10%] right-[24%] rotate-[-2deg]", color: "bg-white" },
];

export function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 md:pt-28 pb-32 overflow-hidden grid-bg">
      {/* radial wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 60%)" }} />
      </div>

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
          {/* Floating cards */}
          {FLOATING.map((f, i) => (
            <div
              key={f.label}
              className={`absolute pill ${f.color} ${f.style} animate-float`}
              style={{
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${5 + (i % 4)}s`,
              }}
            >
              {f.label}
            </div>
          ))}

          {/* Phone mockup */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-scale-in"
            style={{ transform: `translate(-50%, calc(-50% + ${y * 0.05}px))` }}
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

function PhoneMockup() {
  return (
    <div className="relative w-[260px] md:w-[300px] aspect-[9/19] rounded-[42px] bg-ink p-3 shadow-2xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink rounded-b-2xl z-10" />
      <div className="w-full h-full rounded-[32px] bg-cream overflow-hidden relative">
        {/* fake site */}
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
