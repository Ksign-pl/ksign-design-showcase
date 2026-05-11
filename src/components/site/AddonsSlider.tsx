import { useCallback, useEffect, useRef, useState } from "react";
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
  { num: "01", title: "SEO", desc: "Pozycjonowanie i optymalizacja techniczna.", color: "bg-lime", img: imgSeo, alt: "Analityka SEO na ekranie laptopa" },
  { num: "02", title: "Blog", desc: "Sekcja artykułów z systemem CMS.", color: "bg-white", img: imgBlog, alt: "Notatnik z piórem i kawą" },
  { num: "03", title: "Branding", desc: "Logo, kolory, identyfikacja wizualna.", color: "bg-violet", img: imgBranding, alt: "Wizytówki i próbki kolorów" },
  { num: "04", title: "Sklep", desc: "WooCommerce, Shoper lub Shopify.", color: "bg-ink text-cream", img: imgShop, alt: "Pakiet wysyłkowy e-commerce" },
  { num: "05", title: "Automatyzacje", desc: "Make, Zapier, n8n, integracje API.", color: "bg-white", img: imgAutomation, alt: "Schemat automatyzacji procesów" },
  { num: "06", title: "Chatbot AI", desc: "Asystent AI dopasowany do firmy.", color: "bg-lime", img: imgChatbot, alt: "Telefon z konwersacją chatbota" },
  { num: "07", title: "Reklamy", desc: "Kampanie Google i Meta Ads.", color: "bg-violet", img: imgAds, alt: "Billboard reklamowy w mieście" },
  { num: "08", title: "Landing", desc: "Strony sprzedażowe pod kampanie.", color: "bg-white", img: imgLanding, alt: "Laptop z landing page na biurku" },
];

export function AddonsSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [announce, setAnnounce] = useState("");
  const total = ADDONS.length;

  const goTo = useCallback(
    (idx: number, focus = true) => {
      const clamped = Math.max(0, Math.min(total - 1, idx));
      const el = cardRefs.current[clamped];
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setActive(clamped);
      setAnnounce(`Karta ${clamped + 1} z ${total}: ${ADDONS[clamped].title}. ${ADDONS[clamped].desc}`);
      if (focus) {
        // Focus after smooth scroll initiates; preventScroll avoids double-jump.
        window.setTimeout(() => el.focus({ preventScroll: true }), 60);
      }
    },
    [total],
  );

  const scrollByArrow = (dir: number) => goTo(active + dir, false);

  // Track which card is most visible to keep `active` in sync with manual scrolling.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = cardRefs.current.indexOf(visible.target as HTMLDivElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { root, threshold: [0.5, 0.75, 1] },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        goTo(active + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        goTo(active - 1);
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(total - 1);
        break;
      case "PageDown":
        e.preventDefault();
        goTo(active + 3);
        break;
      case "PageUp":
        e.preventDefault();
        goTo(active - 3);
        break;
    }
  };

  return (
    <section
      className="py-24 md:py-32 bg-cream overflow-hidden"
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
          <div className="flex gap-2" role="group" aria-label="Nawigacja karuzeli">
            <button
              onClick={() => scrollByArrow(-1)}
              aria-label="Poprzednia karta"
              aria-controls="addons-carousel"
              disabled={active === 0}
              className="w-12 h-12 rounded-full bg-white border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream transition disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollByArrow(1)}
              aria-label="Następna karta"
              aria-controls="addons-carousel"
              disabled={active === total - 1}
              className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-violet hover:text-ink transition disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        id="addons-carousel"
        role="group"
        aria-label="Dodatkowe usługi – karuzela"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        className="flex gap-5 overflow-x-auto no-scrollbar px-5 md:px-8 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] snap-x snap-mandatory focus:outline-none"
      >
        {ADDONS.map((a, i) => (
          <div
            key={a.num}
            ref={(el) => { cardRefs.current[i] = el; }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} z ${total}: ${a.title}`}
            tabIndex={i === active ? 0 : -1}
            aria-current={i === active ? "true" : undefined}
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
            className={`${a.color} group flex-shrink-0 w-[280px] md:w-[340px] aspect-[3/4] rounded-3xl overflow-hidden flex flex-col justify-between snap-start hover:scale-[1.02] transition-transform cursor-pointer relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-cream [--px:0] [--py:0] [--tilt:0]`}
          >
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ perspective: "800px" }}>
              <img
                src={a.img}
                alt=""
                width={768}
                height={1024}
                loading={i < 2 ? "eager" : "lazy"}
                decoding={i < 2 ? "sync" : "async"}
                // @ts-expect-error - fetchpriority is a valid HTML attribute
                fetchpriority={i === 0 ? "high" : i < 2 ? "auto" : "low"}
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
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">{a.title}</h3>
              <p className="text-sm leading-snug text-white/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">{a.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-5" aria-hidden="true" />
      </div>

      {/* Live region for screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </div>
    </section>
  );
}
