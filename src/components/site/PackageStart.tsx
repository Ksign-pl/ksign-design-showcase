import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { trackCta } from "@/lib/analytics";



const FEATURES = [
  "strona one-page",
  "sekcja główna HERO",
  "prezentacja firmy",
  "oferta / usługi",
  "sekcja zaufania",
  "formularz kontaktowy",
  "wersja mobilna",
  "podstawowe SEO",
  "podpięcie domeny",
  "realizacja 3–7 dni roboczych",
];

export function PackageStart() {
  return (
    <section id="pakiet" className="relative py-24 md:py-32 grid-bg overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex items-center gap-3 mb-8 text-xs md:text-sm font-mono uppercase tracking-widest text-ink/50">
          <span>[ 03 / Pakiet ]</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Big number + video reel */}
          <div className="lg:col-span-7 relative">
            <div className="relative">
              <div className="text-[28vw] md:text-[28vw] lg:text-[22rem] leading-[0.8] font-black tracking-tighter text-ink">
                999
              </div>
              <div className="absolute -top-2 right-0 md:top-6 md:right-12 pill bg-violet text-ink font-bold rotate-[-6deg]">
                ★ Najlepszy start
              </div>
              <div className="absolute bottom-2 right-0 md:right-12 text-xl md:text-3xl font-bold text-ink/60">
                zł
              </div>

              {/* Floating video reel — desktop only */}
              <div className="hidden xl:block absolute -left-8 -top-16 w-[16%] max-w-[150px] aspect-[3/4] rounded-2xl overflow-hidden border border-ink/10 shadow-2xl rotate-[-6deg] bg-ink pointer-events-none z-10">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(70% 58% at 78% 20%, color-mix(in oklab, var(--violet) 58%, transparent), transparent 64%), radial-gradient(56% 48% at 18% 84%, color-mix(in oklab, var(--lime) 24%, transparent), transparent 70%), linear-gradient(135deg, color-mix(in oklab, var(--ink) 82%, var(--cream)), var(--ink))",
                  }}
                />
                <div aria-hidden className="absolute inset-0 grid-bg-dark opacity-35" />

                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(10,10,12,0.85) 100%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-cream/80">
                  <span>● Live preview</span>
                  <span className="text-lime">3–7 dni</span>
                </div>
              </div>
            </div>

            {/* Mobile poster/gradient fallback for the reel — matches desktop aspect + tilt */}
            <div className="md:hidden mt-8 flex justify-center">
              <div
                aria-hidden
                className="relative w-[62%] max-w-[240px] aspect-[3/4] rounded-2xl overflow-hidden border border-ink/10 bg-ink shadow-2xl rotate-[-4deg]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(70% 60% at 80% 20%, oklch(0.74 0.16 300 / 0.55), transparent 60%), radial-gradient(60% 55% at 12% 86%, color-mix(in oklab, var(--lime) 22%, transparent), transparent 68%), linear-gradient(180deg, rgba(10,10,12,0.25) 0%, rgba(10,10,12,0.9) 100%)",
                  }}
                />
                <div aria-hidden className="absolute inset-0 grid-bg-dark opacity-30" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-cream/80">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    Live preview
                  </span>
                  <span className="text-lime">3–7 dni</span>
                </div>
              </div>
            </div>




            <div className="mt-6 max-w-md">
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Pakiet Start</h3>
              <p className="text-lg text-ink/70 leading-snug">
                Prosta strona internetowa, która wygląda profesjonalnie i prowadzi klienta
                do kontaktu.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="lg:col-span-5">
            <div className="bg-ink text-cream rounded-3xl p-7 md:p-9 shadow-2xl glow-violet">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-cream/50">
                  W pakiecie
                </span>
                <span className="text-xs font-bold uppercase tracking-widest bg-lime text-ink px-2.5 py-1 rounded-full">
                  Start
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-lime flex items-center justify-center">
                      <Check size={12} className="text-ink stroke-[3]" />
                    </span>
                    <span className="text-cream/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/checkout"
                title="Zapłać za pakiet Start — 999 zł"
                onClick={() => trackCta({ location: "pakiet_start_card", label: "Zapłać online — 999 zł", href: "/checkout", variant: "primary" })}
                className="w-full inline-flex items-center justify-center gap-2 bg-lime text-ink px-6 py-4 rounded-full font-bold hover:scale-[1.02] transition-transform"
              >
                Zapłać online — 999 zł <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#kontakt"
                onClick={() => trackCta({ location: "pakiet_start_card", label: "Wolę najpierw porozmawiać", href: "#kontakt", variant: "secondary" })}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-transparent border border-cream/20 text-cream px-6 py-3 rounded-full font-medium hover:bg-white/5 transition"
              >
                Wolę najpierw porozmawiać
              </a>

              <p className="mt-4 text-xs text-cream/50 text-center">
                Cena finalna. Bez VAT, bez ukrytych kosztów.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
