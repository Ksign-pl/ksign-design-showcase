import { useState } from "react";

export function FinalCTA() {
  const [sent, setSent] = useState(false);
  return (
    <section id="kontakt" className="py-24 md:py-32 bg-ink text-cream grid-bg-dark">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/50 mb-8">
          [ 10 / Zamów ]
        </div>
        <h2 className="text-display-tight text-[11vw] md:text-[6.5vw] lg:text-[6.5rem] max-w-6xl">
          ZRÓB STRONĘ,<br/>KTÓRA <span className="text-lime">NIE WYGLĄDA</span><br/>NA 999 ZŁ.
        </h2>
        <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-2xl leading-snug">
          Pakiet Start KSIGN to szybki sposób, żeby Twoja firma wyglądała nowocześnie,
          profesjonalnie i wiarygodnie online.
        </p>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">e-mail</div>
              <a href="mailto:hello@ksign.pl" className="text-2xl font-bold hover:text-lime transition">hello@ksign.pl</a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">telefon</div>
              <a href="tel:+48000000000" className="text-2xl font-bold hover:text-lime transition">+48 000 000 000</a>
            </div>
            <div className="bg-lime text-ink rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">odpowiadamy</div>
              <div className="text-2xl font-bold">w 24h</div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-7 bg-cream text-ink rounded-3xl p-7 md:p-10"
          >
            {sent ? (
              <div className="py-16 text-center">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-3xl font-black tracking-tight mb-2">Dzięki!</h3>
                <p className="text-ink/60">Odezwiemy się w ciągu 24h.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Imię" name="name" />
                  <Field label="E-mail" name="email" type="email" />
                  <Field label="Telefon" name="phone" type="tel" />
                  <Field label="Nazwa firmy" name="company" />
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
                    Wybór pakietu
                  </label>
                  <select
                    name="package"
                    className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink"
                  >
                    <option>Start — 999 zł</option>
                    <option>Business — od 2 499 zł</option>
                    <option>Premium — od 4 999 zł</option>
                    <option>E-commerce — od 6 000 zł</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink resize-none"
                    placeholder="Opowiedz krótko o swoim projekcie..."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition-all"
                >
                  Zamawiam stronę za 999 zł →
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink"
      />
    </div>
  );
}
