import { useRef } from "react";
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
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div>
            <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/50 mb-4">
              [ 06 / Rozbudowa ]
            </div>
            <h2 className="text-display-tight text-[10vw] md:text-[6vw] lg:text-[5.5rem] max-w-4xl">
              CO MOŻESZ<br/>DODAĆ <span className="text-violet">PÓŹNIEJ?</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Poprzednia karta" className="w-12 h-12 rounded-full bg-white border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream transition">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Następna karta" className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-violet hover:text-ink transition">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div ref={ref} className="flex gap-5 overflow-x-auto no-scrollbar px-5 md:px-8 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] snap-x snap-mandatory">
        {ADDONS.map((a) => (
          <div
            key={a.num}
            className={`${a.color} group flex-shrink-0 w-[280px] md:w-[340px] aspect-[3/4] rounded-3xl overflow-hidden flex flex-col justify-between snap-start hover:scale-[1.02] transition-transform cursor-pointer relative`}
          >
            <div className="absolute inset-0">
              <img
                src={a.img}
                alt={a.alt}
                width={768}
                height={1024}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 mix-blend-multiply group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-current/40 via-transparent to-transparent opacity-30" />
            </div>
            <div className="relative flex items-start justify-between p-7">
              <span className="text-sm font-mono opacity-80">{a.num}</span>
              <span className="w-8 h-8 rounded-full bg-current/10 backdrop-blur-sm border border-current/30 flex items-center justify-center">
                <ArrowRight size={14} />
              </span>
            </div>
            <div className="relative p-7">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 drop-shadow-sm">{a.title}</h3>
              <p className="text-sm opacity-80 leading-snug">{a.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-5" />
      </div>
    </section>
  );
}
