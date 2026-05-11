import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ADDONS = [
  { num: "01", title: "SEO", desc: "Pozycjonowanie i optymalizacja techniczna.", color: "bg-lime" },
  { num: "02", title: "Blog", desc: "Sekcja artykułów z systemem CMS.", color: "bg-white" },
  { num: "03", title: "Branding", desc: "Logo, kolory, identyfikacja wizualna.", color: "bg-violet" },
  { num: "04", title: "Sklep", desc: "WooCommerce, Shoper lub Shopify.", color: "bg-ink text-cream" },
  { num: "05", title: "Automatyzacje", desc: "Make, Zapier, n8n, integracje API.", color: "bg-white" },
  { num: "06", title: "Chatbot AI", desc: "Asystent AI dopasowany do firmy.", color: "bg-lime" },
  { num: "07", title: "Reklamy", desc: "Kampanie Google i Meta Ads.", color: "bg-violet" },
  { num: "08", title: "Landing", desc: "Strony sprzedażowe pod kampanie.", color: "bg-white" },
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
            <button onClick={() => scroll(-1)} className="w-12 h-12 rounded-full bg-white border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream transition">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-violet hover:text-ink transition">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div ref={ref} className="flex gap-5 overflow-x-auto no-scrollbar px-5 md:px-8 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] snap-x snap-mandatory">
        {ADDONS.map((a) => (
          <div
            key={a.num}
            className={`${a.color} flex-shrink-0 w-[280px] md:w-[340px] aspect-[3/4] rounded-3xl p-7 flex flex-col justify-between snap-start hover:scale-[1.02] transition-transform cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-mono opacity-60">{a.num}</span>
              <span className="w-8 h-8 rounded-full border border-current/30 flex items-center justify-center">
                <ArrowRight size={14} />
              </span>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">{a.title}</h3>
              <p className="text-sm opacity-70 leading-snug">{a.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-5" />
      </div>
    </section>
  );
}
