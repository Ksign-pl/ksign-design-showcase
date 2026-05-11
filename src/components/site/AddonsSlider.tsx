import { useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import imgSeo from "@/assets/addon-seo.jpg";
import imgBlog from "@/assets/addon-blog.jpg";
import imgBranding from "@/assets/addon-branding.jpg";
import imgShop from "@/assets/addon-shop.jpg";
import imgAutomation from "@/assets/addon-automation.jpg";
import imgChatbot from "@/assets/addon-chatbot.jpg";
import imgAds from "@/assets/addon-ads.jpg";
import imgLanding from "@/assets/addon-landing.jpg";

const ADDONS = [
  { num: "01", title: "SEO", desc: "Pozycjonowanie i optymalizacja techniczna.", color: "bg-lime", img: imgSeo, alt: "Analityka SEO na ekranie laptopa", caption: "Audyt + Core Web Vitals" },
  { num: "02", title: "Blog", desc: "Sekcja artykułów z systemem CMS.", color: "bg-white", img: imgBlog, alt: "Notatnik z piórem i kawą", caption: "CMS + edytor treści" },
  { num: "03", title: "Branding", desc: "Logo, kolory, identyfikacja wizualna.", color: "bg-violet", img: imgBranding, alt: "Wizytówki i próbki kolorów", caption: "Logo + brandbook" },
  { num: "04", title: "Sklep", desc: "WooCommerce, Shoper lub Shopify.", color: "bg-ink text-cream", img: imgShop, alt: "Pakiet wysyłkowy e-commerce", caption: "Płatności + wysyłki" },
  { num: "05", title: "Automatyzacje", desc: "Make, Zapier, n8n, integracje API.", color: "bg-white", img: imgAutomation, alt: "Schemat automatyzacji procesów", caption: "Integracje no-code" },
  { num: "06", title: "Chatbot AI", desc: "Asystent AI dopasowany do firmy.", color: "bg-lime", img: imgChatbot, alt: "Telefon z konwersacją chatbota", caption: "Trenowany na Twoich danych" },
  { num: "07", title: "Reklamy", desc: "Kampanie Google i Meta Ads.", color: "bg-violet", img: imgAds, alt: "Billboard reklamowy w mieście", caption: "Google + Meta Ads" },
  { num: "08", title: "Landing", desc: "Strony sprzedażowe pod kampanie.", color: "bg-white", img: imgLanding, alt: "Laptop z landing page na biurku", caption: "A/B testy konwersji" },
];

export function AddonsSlider() {
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  // Duplicate the list so the translateX(-50%) loop is seamless.
  const loop = [...ADDONS, ...ADDONS];

  return (
    <section
      id="rozbudowa"
      className="py-24 md:py-32 bg-cream overflow-hidden scroll-mt-24"
      aria-labelledby="addons-heading"
      aria-roledescription="carousel"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div>
            <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/50 mb-4">
              [ 06 / Rozbudowa ]
            </div>
            <h2
              id="addons-heading"
              className="text-display-tight text-[10vw] md:text-[6vw] lg:text-[5.5rem] max-w-4xl"
            >
              CO MOŻESZ<br/>DODAĆ <span className="text-violet">PÓŹNIEJ?</span>
            </h2>
          </div>
          <div className="flex gap-2" role="group" aria-label="Sterowanie karuzelą">
            <button
              onClick={() => setDirection("right")}
              aria-label="Przewijaj w lewo"
              aria-pressed={direction === "right"}
              className={`w-12 h-12 rounded-full border border-ink/15 flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${direction === "right" ? "bg-ink text-cream" : "bg-white hover:bg-ink hover:text-cream"}`}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Wznów przewijanie" : "Zatrzymaj przewijanie"}
              className="w-12 h-12 rounded-full bg-white border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
            <button
              onClick={() => setDirection("left")}
              aria-label="Przewijaj w prawo"
              aria-pressed={direction === "left"}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${direction === "left" ? "bg-ink text-cream" : "bg-white border border-ink/15 hover:bg-ink hover:text-cream"}`}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee viewport */}
      <div
        className="addons-marquee relative w-full overflow-hidden"
        data-paused={paused ? "true" : "false"}
        data-direction={direction}
        onMouseEnter={() => undefined /* hover pause handled in CSS */}
        aria-roledescription="carousel"
        aria-label="Dodatkowe usługi – nieskończona karuzela"
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-cream to-transparent" />

        <div className="addons-track flex gap-5 w-max py-2">
          {loop.map((a, i) => {
            const isClone = i >= ADDONS.length;
            return (
              <div
                key={`${a.num}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-hidden={isClone ? "true" : undefined}
                aria-label={!isClone ? `${(i % ADDONS.length) + 1} z ${ADDONS.length}: ${a.title}` : undefined}
                tabIndex={isClone ? -1 : 0}
                onPointerMove={(e) => {
                  if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
                  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
                  const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
                  el.style.setProperty("--px", px.toFixed(3));
                  el.style.setProperty("--py", py.toFixed(3));
                  el.style.setProperty("--tilt", "1");
                }}
                onPointerLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.setProperty("--px", "0");
                  el.style.setProperty("--py", "0");
                  el.style.setProperty("--tilt", "0");
                }}
                className={`${a.color} group flex-shrink-0 w-[280px] md:w-[340px] aspect-[3/4] rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-cream [--px:0] [--py:0] [--tilt:0]`}
              >
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ perspective: "800px" }}>
                  <img
                    src={a.img}
                    alt=""
                    width={768}
                    height={1024}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding={i < 3 ? "sync" : "async"}
                    // @ts-expect-error - fetchpriority is a valid HTML attribute
                    fetchpriority={i === 0 ? "high" : i < 3 ? "auto" : "low"}
                    sizes="(max-width: 768px) 280px, 340px"
                    style={{
                      transform:
                        "translate3d(calc(var(--px) * -10px), calc(var(--py) * -10px), 0) scale(calc(1 + var(--tilt) * 0.04)) rotateX(calc(var(--py) * -2deg)) rotateY(calc(var(--px) * 2deg))",
                      transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms",
                      willChange: "transform",
                      transformOrigin: "center",
                    }}
                    className="w-full h-full object-cover opacity-55 group-hover:opacity-70"
                  />
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
                </div>
                <div className="relative flex items-start justify-between p-7 text-white">
                  <span className="text-sm font-mono opacity-90 drop-shadow-md" aria-hidden="true">{a.num}</span>
                  <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center" aria-hidden="true">
                    <ArrowRight size={14} />
                  </span>
                </div>
                <div className="relative p-7 text-white">
                  <span
                    className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/15 backdrop-blur-sm border border-white/30 text-white opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/80" aria-hidden="true" />
                    {a.caption}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">{a.title}</h3>
                  <p className="text-sm leading-snug text-white/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">{a.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
