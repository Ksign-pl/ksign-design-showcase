import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { trackCta } from "@/lib/analytics";

type Card = {
  num: string;
  kicker: string;
  title: string;
  desc: string;
  bullets: string[];
  accent: "violet" | "lime" | "ink";
  cta: { label: string; href: string; external?: boolean };
};

const CARDS: Card[] = [
  {
    num: "01",
    kicker: "Fundament",
    title: "Strona one-page",
    desc: "Jedna spójna narracja — od hero do kontaktu. Wszystko czego potrzebujesz, żeby wystartować.",
    bullets: ["HERO + oferta", "Sekcja zaufania", "Formularz kontaktowy", "Wersja mobilna"],
    accent: "violet",
    cta: { label: "Zapłać online — 999 zł", href: "/checkout" },
  },
  {
    num: "02",
    kicker: "Widoczność",
    title: "SEO na start",
    desc: "Podstawowe SEO techniczne i on-page, dzięki któremu Google znajdzie Cię szybciej.",
    bullets: ["Meta tagi + OG", "Sitemap + robots.txt", "Core Web Vitals", "Struktura nagłówków"],
    accent: "lime",
    cta: { label: "Zapytaj o SEO", href: "#kontakt", external: true },
  },
  {
    num: "03",
    kicker: "Realizacja",
    title: "3–7 dni roboczych",
    desc: "Ekspresowy proces bez zbędnych spotkań. Dostajesz gotową stronę zanim konkurencja wyśle ofertę.",
    bullets: ["Brief w 15 minut", "Podgląd live", "Poprawki w cenie", "Podpięcie domeny"],
    accent: "ink",
    cta: { label: "Zobacz proces", href: "#proces", external: true },
  },
];

export function StartSlider() {
  const [active, setActive] = useState(0);
  const trackId = "start-slider-track";
  const total = CARDS.length;
  const rootRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback((i: number) => Math.max(0, Math.min(total - 1, i)), [total]);
  const go = useCallback((d: number) => setActive((i) => clamp(i + d)), [clamp]);
  const goTo = useCallback((i: number) => setActive(clamp(i)), [clamp]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        go(-1);
        break;
      case "ArrowRight":
      case "PageDown":
        e.preventDefault();
        go(1);
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(total - 1);
        break;
    }
  };

  // Touch swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
    touch.current = null;
  };

  const progress = ((active + 1) / total) * 100;

  return (
    <section
      id="pakiet-slider"
      aria-labelledby="start-slider-heading"
      aria-roledescription="karuzela"
      className="relative py-24 md:py-32 bg-cream overflow-hidden scroll-mt-24"
    >
      <div
        aria-hidden
        className="absolute right-0 top-8 font-heading italic text-[14vw] text-ink/[0.05] pointer-events-none select-none leading-none whitespace-nowrap"
      >
        Start
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div>
            <div className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-ink/70 mb-4">
              [ 03b / Slider ]
            </div>
            <h2
              id="start-slider-heading"
              className="font-heading text-5xl md:text-7xl leading-[0.9] max-w-3xl"
            >
              Co dostajesz <span className="italic text-violet">w pakiecie Start?</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tabular-nums text-ink/60">
              <span className="font-bold text-ink">{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              {String(total).padStart(2, "0")}
            </span>
            <div className="flex gap-2" role="group" aria-label="Sterowanie karuzelą pakietu Start">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={active === 0}
                aria-label="Poprzednia karta"
                aria-controls={trackId}
                className="w-12 h-12 rounded-full bg-white border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={active === total - 1}
                aria-label="Następna karta"
                aria-controls={trackId}
                className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-violet hover:text-cream disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="relative h-[3px] bg-ink/10 rounded-full mb-8 overflow-hidden"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={active + 1}
          aria-label={`Postęp: karta ${active + 1} z ${total}`}
        >
          <div
            className="absolute inset-y-0 left-0 bg-ink rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Track */}
        <div
          ref={rootRef}
          id={trackId}
          role="group"
          aria-roledescription="karuzela"
          aria-label="Karty pakietu Start"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
        >
          <div
            className="flex"
            style={{
              width: `${total * 100}%`,
              transform: `translateX(-${active * (100 / total)}%)`,
              transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {CARDS.map((c, i) => {
              const isActive = i === active;
              const accentBg =
                c.accent === "violet"
                  ? "bg-violet text-cream"
                  : c.accent === "lime"
                    ? "bg-lime text-ink"
                    : "bg-ink text-cream";
              const bulletDot =
                c.accent === "lime" ? "bg-ink" : "bg-lime";
              return (
                <div
                  key={c.num}
                  role="group"
                  aria-roledescription="slajd"
                  aria-label={`Karta ${i + 1} z ${total}: ${c.title}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-hidden={!isActive}
                  style={{ width: `${100 / total}%` }}
                  className="flex-shrink-0 px-1"
                >
                  <article
                    className={`${accentBg} rounded-3xl p-8 md:p-12 lg:p-14 min-h-[520px] md:min-h-[560px] grid md:grid-cols-12 gap-8 md:gap-12 relative overflow-hidden`}
                  >
                    <div
                      aria-hidden
                      className="absolute -right-10 -bottom-16 font-heading italic text-[22rem] leading-none opacity-[0.08] pointer-events-none select-none"
                    >
                      {c.num}
                    </div>

                    <div className="md:col-span-5 flex flex-col justify-between relative">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-70 mb-4">
                          {c.num} · {c.kicker}
                        </div>
                        <h3 className="font-heading text-5xl md:text-6xl leading-[0.95]">
                          {c.title}
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl leading-snug opacity-90 mt-8 max-w-md">
                        {c.desc}
                      </p>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-between relative">
                      <ul className="space-y-4 mb-8">
                        {c.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-lg">
                            <span className={`mt-1.5 flex-shrink-0 w-5 h-5 rounded-full ${bulletDot} flex items-center justify-center`}>
                              <Check size={12} className={c.accent === "lime" ? "text-cream stroke-[3]" : "text-ink stroke-[3]"} />
                            </span>
                            <span className="opacity-95">{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div>
                        {c.cta.external ? (
                          <a
                            href={c.cta.href}
                            onClick={() => trackCta({ location: "start_slider", label: c.cta.label, href: c.cta.href, variant: "secondary" })}
                            className="inline-flex items-center gap-2 bg-cream text-ink px-6 py-4 rounded-full font-bold hover:scale-[1.02] transition-transform"
                          >
                            {c.cta.label} <ArrowRight size={16} aria-hidden="true" />
                          </a>
                        ) : (
                          <Link
                            to={c.cta.href}
                            onClick={() => trackCta({ location: "start_slider", label: c.cta.label, href: c.cta.href, variant: "primary" })}
                            className="inline-flex items-center gap-2 bg-cream text-ink px-6 py-4 rounded-full font-bold hover:scale-[1.02] transition-transform"
                          >
                            {c.cta.label} <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-1" role="group" aria-label="Wybór karty">
          {CARDS.map((c, i) => {
            const isCurrent = i === active;
            return (
              <button
                key={c.num}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Przejdź do karty ${i + 1}: ${c.title}`}
                aria-current={isCurrent ? "true" : undefined}
                aria-controls={trackId}
                className="group inline-flex items-center justify-center min-h-11 min-w-11 p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all ${
                    isCurrent ? "w-10 bg-ink" : "w-4 bg-ink/25 group-hover:bg-ink/50"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs font-mono uppercase tracking-widest text-ink/70">
          ← → nawigacja klawiaturą · swipe na mobile
        </p>
      </div>
    </section>
  );
}
