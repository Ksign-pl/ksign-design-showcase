import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { trackMetaEvent } from "@/lib/meta-capi";
import { trackFormSubmit, trackFormError } from "@/lib/analytics";
import { CONTACT } from "@/lib/contact";


export function FinalCTA() {
  const [sent, setSent] = useState(false);
  const [rodo, setRodo] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rodo) {
      const msg = "Aby wysłać zapytanie, musisz wyrazić zgodę na przetwarzanie danych (RODO).";
      setError(msg);
      trackFormError({
        form: "kontakt_final_cta",
        field: "rodo",
        reason: "rodo_required",
        message: msg,
      });
      return;
    }
    setError(null);

    // Map form fields → Meta CAPI user_data. Email/phone/name are hashed
    // server-side (SHA-256) in /api/public/meta-capi before forwarding to Meta.
    const fd = new FormData(e.currentTarget);
    const fullName = (fd.get("name")?.toString() ?? "").trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    const lastName = rest.join(" ");
    const pkg = fd.get("package")?.toString() || "";
    void trackMetaEvent("Lead", {
      userData: {
        email: fd.get("email")?.toString() || undefined,
        phone: fd.get("phone")?.toString() || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        country: "pl",
      },
      customData: {
        content_name: "Kontakt KSIGN",
        package: pkg,
        marketing_consent: marketing,
      },
    });
    trackFormSubmit({
      form: "kontakt_final_cta",
      package: pkg,
      marketingConsent: marketing,
    });

    setSent(true);
  };

  return (
    <section id="kontakt" className="relative py-24 md:py-32 bg-ink text-cream grid-bg-dark overflow-hidden">
      {/* Ambient video loop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/12/11/142348-780429796_large.mp4"
          type="video/mp4"
        />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, oklch(0.74 0.16 300 / 0.35) 0%, transparent 55%), linear-gradient(180deg, rgba(10,10,12,0.4), rgba(10,10,12,0.85))",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-10 bottom-10 font-heading font-bold text-[25vw] opacity-[0.04] pointer-events-none select-none uppercase whitespace-nowrap"
      >
        999 ZŁ
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-cream/50 mb-8">
          [ 10 / Zamów ]
        </div>
        <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] max-w-6xl">
          Przestań być<br />
          <span className="text-violet">standardowy.</span><br />
          Zamów za <span className="bg-lime text-ink px-3 -rotate-1 inline-block">999 zł</span>
        </h2>
        <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-2xl leading-snug">
          Pakiet Start KSIGN to szybki sposób, żeby Twoja firma wyglądała nowocześnie,
          profesjonalnie i wiarygodnie online.
        </p>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">e-mail</div>
              <a href={`mailto:${CONTACT.email}`} className="text-2xl font-bold hover:text-lime transition">{CONTACT.email}</a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">telefon</div>
              <a href={`tel:${CONTACT.phone}`} className="text-2xl font-bold hover:text-lime transition">606 576 517</a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">facebook</div>
              <a href="https://www.facebook.com/ksign2026" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold hover:text-lime transition">/ksign2026</a>
            </div>
            <div className="bg-lime text-ink rounded-3xl p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">odpowiadamy</div>
              <div className="text-2xl font-bold">w 24h</div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
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
                  <label htmlFor="field-package" className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
                    Wybór pakietu
                  </label>
                  <select
                    id="field-package"
                    name="package"
                    className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink"
                  >
                    <option>Start — 999 zł</option>
                    <option>Business — 2 499 zł</option>
                    <option>Premium — 4 999 zł</option>
                    <option>E-commerce — 6 000 zł</option>
                    <option>Opieka techniczna — 99 zł/mies.</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label htmlFor="field-message" className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    id="field-message"
                    rows={4}
                    name="message"
                    className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink resize-none"
                    placeholder="Opowiedz krótko o swoim projekcie..."
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <label className="flex items-start gap-3 text-sm text-ink/75 leading-snug cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={rodo}
                      onChange={(e) => setRodo(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      <span className="text-red-600">*</span> Wyrażam zgodę na przetwarzanie moich danych osobowych
                      (imię, e-mail, telefon, treść wiadomości) przez KSIGN w celu odpowiedzi na zapytanie, zgodnie
                      z{" "}
                      <Link to="/polityka-prywatnosci" className="underline hover:text-violet">Polityką prywatności</Link>.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-ink/75 leading-snug cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      Wyrażam zgodę na otrzymywanie informacji handlowych i marketingowych drogą elektroniczną oraz
                      telefoniczną od KSIGN (zgoda dobrowolna, można ją wycofać w każdej chwili).
                    </span>
                  </label>
                </div>
                {error && (
                  <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>
                )}
                <p className="mt-4 text-xs text-ink/50 leading-relaxed">
                  Administratorem danych jest KSIGN. Masz prawo dostępu do danych, ich sprostowania, usunięcia,
                  ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz wniesienia skargi do Prezesa UODO.
                  Szczegóły w{" "}
                  <Link to="/polityka-prywatnosci" className="underline hover:text-violet">Polityce prywatności</Link>.
                </p>
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
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required
        className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink"
      />
    </div>
  );
}
