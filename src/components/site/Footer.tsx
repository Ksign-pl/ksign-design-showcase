import { Link } from "@tanstack/react-router";
import { openConsentSettings } from "@/lib/consent";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-ink/10 pt-16 pb-28 md:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              KSIGN<span className="text-violet">.</span>
            </div>
            <p className="text-ink/60 max-w-sm leading-snug">
              Premium web design dla firm, które chcą wyglądać lepiej od konkurencji.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Nawigacja</div>
            <ul className="space-y-2">
              {[
                { href: "#oferta", label: "Oferta", title: "Zobacz ofertę KSIGN" },
                { href: "#pakiet", label: "Pakiet Start 999 zł", title: "Pakiet Start — strona one-page za 999 zł" },
                { href: "#proces", label: "Proces realizacji", title: "Jak wygląda proces realizacji" },
                { href: "#realizacje", label: "Realizacje i cennik", title: "Zobacz realizacje i cennik" },
                { href: "#faq", label: "FAQ", title: "Najczęściej zadawane pytania" },
                { href: "#kontakt", label: "Kontakt", title: "Skontaktuj się z KSIGN" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} title={l.title} aria-label={l.title} className="font-medium hover:text-violet transition">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Kontakt</div>
            <ul className="space-y-2 mb-6">
              <li><a href="mailto:hello@ksign.pl" className="font-medium hover:text-violet transition">hello@ksign.pl</a></li>
            </ul>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/ksign2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KSIGN na Facebooku"
                title="KSIGN na Facebooku"
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor">
                  <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.27-1.46 1.52-1.46H16.5V4.44C16.21 4.4 15.31 4.32 14.27 4.32c-2.18 0-3.67 1.33-3.67 3.77V10.5H8v3h2.6V21h2.9z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/50">
          <div>© {new Date().getFullYear()} KSIGN. Wszelkie prawa zastrzeżone.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/polityka-prywatnosci" className="hover:text-violet transition">Polityka prywatności</Link>
            <Link to="/polityka-cookies" className="hover:text-violet transition">Polityka cookies</Link>
            <button
              type="button"
              onClick={() => openConsentSettings()}
              className="hover:text-violet transition underline-offset-2 hover:underline"
            >
              Ustawienia cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
