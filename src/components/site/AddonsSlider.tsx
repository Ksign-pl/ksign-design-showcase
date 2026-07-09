import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import imgSeo from "@/assets/addon-seo.jpg";
import imgBlog from "@/assets/addon-blog.jpg";
import imgBranding from "@/assets/addon-branding.jpg";
import imgShop from "@/assets/addon-shop.jpg";
import imgAutomation from "@/assets/addon-automation.jpg";
import imgChatbot from "@/assets/addon-chatbot.jpg";
import imgAds from "@/assets/addon-ads.jpg";
import imgLanding from "@/assets/addon-landing.jpg";

const ADDONS = [
  { num: "01", title: "SEO", desc: "Pozycjonowanie i optymalizacja techniczna.", img: imgSeo, alt: "Audyt SEO i optymalizacja Core Web Vitals", caption: "Audyt + Core Web Vitals" },
  { num: "02", title: "Blog", desc: "Sekcja artykułów z systemem CMS.", img: imgBlog, alt: "System blogowy CMS z edytorem treści", caption: "CMS + edytor treści" },
  { num: "03", title: "Branding", desc: "Logo, kolory, identyfikacja wizualna.", img: imgBranding, alt: "Branding — logo, kolory, identyfikacja", caption: "Logo + brandbook" },
  { num: "04", title: "Sklep", desc: "WooCommerce, Shoper lub Shopify.", img: imgShop, alt: "Sklep internetowy z płatnościami online", caption: "Płatności + wysyłki" },
  { num: "05", title: "Automatyzacje", desc: "Make, Zapier, n8n, integracje API.", img: imgAutomation, alt: "Automatyzacje no-code — Make, Zapier", caption: "Integracje no-code" },
  { num: "06", title: "Chatbot AI", desc: "Asystent AI dopasowany do firmy.", img: imgChatbot, alt: "Chatbot AI trenowany na danych firmy", caption: "Trenowany na Twoich danych" },
  { num: "07", title: "Reklamy", desc: "Kampanie Google i Meta Ads.", img: imgAds, alt: "Kampanie reklamowe Google i Meta Ads", caption: "Google + Meta Ads" },
  { num: "08", title: "Landing", desc: "Strony sprzedażowe pod kampanie.", img: imgLanding, alt: "Landing page z testami A/B", caption: "A/B testy konwersji" },
];

const CARD_W = 340; // px
const GAP = 24;
const STEP = CARD_W + GAP;

export function AddonsSlider() {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0); // live pointer drag offset
  const [pointer, setPointer] = useState({ x: 0, y: 0 }); // -0.5..0.5 for parallax
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<{ startX: number; startY: number; captured: boolean } | null>(null);
  const trackId = "addons-slider-track";
  const liveMessage = `Slajd ${active + 1} z ${ADDONS.length}: ${ADDONS[active].title}`;

  const clamp = useCallback((i: number) => Math.max(0, Math.min(ADDONS.length - 1, i)), []);
  const go = useCallback((delta: number) => setActive((i) => clamp(i + delta)), [clamp]);
  const goTo = useCallback((i: number) => setActive(clamp(i)), [clamp]);

  // Keyboard nav on the track (Left/Right/Home/End/PageUp/PageDown)
  const onTrackKeyDown = (e: React.KeyboardEvent) => {
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
        goTo(ADDONS.length - 1);
        break;
    }
  };

  // Pointer parallax over the whole stage
  const onStageMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };
  const onStageLeave = () => setPointer({ x: 0, y: 0 });

  // Drag to swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = { startX: e.clientX, startY: e.clientY, captured: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.captured) {
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return;
      d.captured = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    setDragX(dx);
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    if (d.captured) {
      const threshold = 60;
      if (dragX < -threshold) go(1);
      else if (dragX > threshold) go(-1);
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    }
    dragging.current = null;
    setDragX(0);
  };

  return (
    <section
      id="rozbudowa"
      className="relative py-24 md:py-32 bg-cream overflow-hidden scroll-mt-24"
      aria-labelledby="addons-heading"
      aria-roledescription="karuzela"
    >
      {/* huge watermark */}
      <div
        aria-hidden
        className="absolute -left-6 top-6 font-heading font-bold text-[18vw] uppercase text-ink/[0.04] pointer-events-none select-none leading-none whitespace-nowrap"
      >
        Rozbudowa
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div>
            <div className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-ink/50 mb-4">
              [ 06 / Rozbudowa ]
            </div>
            <h2
              id="addons-heading"
              className="font-heading font-bold text-5xl md:text-7xl uppercase leading-[0.85] max-w-4xl"
            >
              CO MOŻESZ<br/>DODAĆ <span className="text-violet">PÓŹNIEJ?</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tabular-nums text-ink/60" aria-hidden="true">
              <span className="font-bold text-ink">{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              {String(ADDONS.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2" role="group" aria-label="Sterowanie karuzelą dodatków">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={active === 0}
                aria-label="Poprzedni dodatek"
                aria-controls={trackId}
                className="w-12 h-12 rounded-full bg-white border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={active === ADDONS.length - 1}
                aria-label="Następny dodatek"
                aria-controls={trackId}
                className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-violet hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative select-none"
        onPointerMove={onStageMove}
        onPointerLeave={onStageLeave}
        style={{ perspective: "1600px" }}
      >
        <div
          id={trackId}
          ref={trackRef}
          role="group"
          aria-roledescription="karuzela"
          aria-label="Dodatkowe usługi"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
          onKeyDown={onTrackKeyDown}
          className="relative mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-cream rounded-3xl"
          style={{ height: 520 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span className="sr-only">{liveMessage}</span>
          {ADDONS.map((a, i) => {
            const offset = i - active;
            const isActive = offset === 0;
            const abs = Math.abs(offset);
            // Base horizontal position: card slides + drag preview + parallax
            const parallaxX = pointer.x * (isActive ? 18 : 8);
            const parallaxY = pointer.y * (isActive ? 12 : 6);
            const translateX =
              offset * STEP * 0.72 + dragX + parallaxX;
            const scale = isActive ? 1 : Math.max(0.72, 1 - abs * 0.12);
            const rotateY = offset * -8 + pointer.x * (isActive ? 4 : 0);
            const rotateX = pointer.y * (isActive ? -3 : 0);
            const opacity = abs > 3 ? 0 : Math.max(0.25, 1 - abs * 0.22);
            const z = 100 - abs;

            return (
              <button
                key={a.num}
                type="button"
                onClick={() => !isActive && setActive(i)}
                role="group"
                aria-roledescription="slajd"
                aria-label={`Slajd ${i + 1} z ${ADDONS.length}: ${a.title}. ${a.desc}`}
                aria-current={isActive ? "true" : undefined}
                aria-hidden={abs > 1 ? "true" : undefined}
                tabIndex={isActive ? 0 : -1}
                className="absolute left-1/2 top-1/2 rounded-3xl overflow-hidden bg-ink text-cream text-left cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime"
                style={{
                  width: CARD_W,
                  height: 460,
                  marginLeft: -CARD_W / 2,
                  marginTop: -230,
                  transform: `translate3d(${translateX}px, ${parallaxY}px, 0) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                  transition:
                    dragging.current?.captured
                      ? "opacity 300ms ease"
                      : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
                  transformStyle: "preserve-3d",
                  opacity,
                  zIndex: z,
                  boxShadow: isActive
                    ? "0 40px 80px -30px color-mix(in oklab, var(--ink) 55%, transparent), 0 10px 25px -10px color-mix(in oklab, var(--ink) 40%, transparent)"
                    : "0 20px 40px -20px color-mix(in oklab, var(--ink) 40%, transparent)",
                  willChange: "transform, opacity",
                }}
              >
                {/* image with inner parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.alt}
                    width={768}
                    height={1024}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="340px"
                    className="w-full h-full object-cover"
                    style={{
                      transform: `translate3d(${pointer.x * -22}px, ${pointer.y * -22}px, 0) scale(${isActive ? 1.12 : 1.05})`,
                      transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                      opacity: isActive ? 0.75 : 0.5,
                      willChange: "transform",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--violet) 60%, transparent), transparent 55%)",
                    }}
                  />
                </div>

                {/* top row */}
                <div className="relative flex items-start justify-between p-6">
                  <span className="font-mono text-sm opacity-90">{a.num}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/15 border border-white/30 backdrop-blur-sm">
                    <span className="w-1 h-1 rounded-full bg-lime" aria-hidden="true" />
                    {a.caption}
                  </span>
                </div>

                {/* bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 p-6"
                  style={{
                    transform: `translateZ(40px) translateY(${isActive ? 0 : 6}px)`,
                  }}
                >
                  <h3 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-tight mb-2 leading-[0.9]">
                    {a.title}
                  </h3>
                  <p className="text-sm text-cream/85 leading-snug max-w-[85%]">{a.desc}</p>
                  <div
                    className={`mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${
                      isActive ? "opacity-100 translate-x-0 text-lime" : "opacity-0 -translate-x-2"
                    }`}
                  >
                    Zapytaj o dodatek <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* dots */}
        <div className="relative mt-10 flex justify-center gap-2" role="tablist" aria-label="Wybór slajdu">
          {ADDONS.map((a, i) => (
            <button
              key={a.num}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Przejdź do ${a.title}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-ink" : "w-4 bg-ink/25 hover:bg-ink/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
