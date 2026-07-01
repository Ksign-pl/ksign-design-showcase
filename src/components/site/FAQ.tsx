import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const QA = [
  {
    q: "Czy za 999 zł dostanę sklep internetowy?",
    a: "Nie. Pakiet Start obejmuje prostą stronę one-page. Sklep internetowy wyceniamy osobno.",
  },
  {
    q: "Czy strona będzie responsywna?",
    a: "Tak. Strona będzie dopasowana do telefonu, tabletu i komputera.",
  },
  { q: "Ile trwa realizacja?", a: "Standardowo od 3 do 7 dni roboczych po otrzymaniu materiałów." },
  {
    q: "Czy pomagacie z tekstami?",
    a: "Tak. Pomagamy uporządkować podstawowe treści i ułożyć je sprzedażowo.",
  },
  {
    q: "Czy mogę później rozbudować stronę?",
    a: "Tak. Pakiet Start może być bazą do większej strony, SEO, bloga, sklepu lub automatyzacji.",
  },
  { q: "Czy cena 999 zł jest netto?", a: "Tak. Cena pakietu Start to 999 zł netto." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/50 mb-8">
              [ 09 / FAQ ]
            </div>
            <h2 className="text-display-tight text-[10vw] md:text-[5vw] lg:text-[5rem]">
              MASZ
              <br />
              PYTANIA?
            </h2>
            <p className="mt-6 text-ink/60 max-w-xs">
              Najczęściej zadawane pytania o pakiet Start i współpracę.
            </p>
          </div>

          <div className="lg:col-span-8">
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-t border-ink/10 last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left group"
                  >
                    <span className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-violet transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-lime rotate-180" : "bg-ink text-cream"}`}
                    >
                      {isOpen ? <Minus size={16} className="text-ink" /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6 md:pb-8" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base md:text-lg text-ink/70 max-w-2xl leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <p className="mt-10 text-base md:text-lg text-ink/70">
              Nie znalazłeś odpowiedzi?{" "}
              <a
                href="#kontakt"
                title="Skontaktuj się z KSIGN"
                aria-label="Napisz do KSIGN — formularz kontaktowy"
                className="font-bold text-ink underline underline-offset-4 decoration-2 decoration-lime hover:text-violet transition-colors"
              >
                Napisz do nas →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
