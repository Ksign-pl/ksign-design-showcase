import { X, Check } from "lucide-react";

const LEFT = [
  "wygląda przypadkowo",
  "nie budzi zaufania",
  "chaos w ofercie",
  "słaby mobile",
  "brak jasnego CTA",
];
const RIGHT = [
  "wygląda profesjonalnie",
  "prowadzi do kontaktu",
  "porządkuje ofertę",
  "działa dobrze na telefonie",
  "buduje pierwsze wrażenie",
];

export function BeforeAfter() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-ink/50 mb-8">
          [ 04 / Różnica ]
        </div>
        <h2 className="text-display-tight text-[12vw] md:text-[7vw] lg:text-[6.5rem] mb-16 md:mb-20">
          RÓŻNICA
          <br />
          JEST
          <br />W <span className="bg-lime px-3 rounded-2xl">ODBIORZE.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          <div className="bg-white border border-ink/10 rounded-3xl p-7 md:p-10 opacity-70">
            <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Tak</div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6 text-ink/60">
              Strona, która tylko istnieje
            </h3>
            <ul className="space-y-3">
              {LEFT.map((l) => (
                <li key={l} className="flex items-start gap-3 text-ink/60">
                  <span className="mt-0.5 w-5 h-5 rounded-full border border-ink/20 flex items-center justify-center">
                    <X size={12} className="stroke-2" />
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-ink text-cream rounded-3xl p-7 md:p-10 glow-lime">
            <div className="absolute -top-3 -right-3 pill bg-lime text-ink font-bold rotate-3">
              KSIGN ✓
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-lime mb-4">
              Inaczej
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Strona KSIGN</h3>
            <ul className="space-y-3">
              {RIGHT.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-lime flex items-center justify-center">
                    <Check size={12} className="text-ink stroke-[3]" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
