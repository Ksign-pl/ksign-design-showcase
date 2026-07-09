import { Link } from "@tanstack/react-router";
import { openConsentSettings } from "@/lib/consent";
import { CONTACT } from "@/lib/contact";

const FOOTER_VIDEO = "https://cdn.pixabay.com/video/2023/10/16/185338-877842799_large.mp4";

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream border-t border-cream/10 pt-16 pb-28 md:pb-16 overflow-hidden">
      {/* Ambient video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          src={FOOTER_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hidden md:block w-full h-full object-cover opacity-20"
          style={{ filter: "hue-rotate(220deg) saturate(1.4) blur(2px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 15% 0%, color-mix(in oklab, var(--violet) 45%, transparent), transparent 65%), radial-gradient(40% 50% at 95% 100%, color-mix(in oklab, var(--lime) 20%, transparent), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              KSIGN<span className="text-lime">.</span>
            </div>
            <p className="text-cream/60 max-w-sm leading-snug">
              Premium web design dla firm, które chcą wyglądać lepiej od konkurencji.
            </p>
          </div>


          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cream/40 mb-4">Nawigacja</div>
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
                  <a href={l.href} title={l.title} aria-label={l.title} className="font-medium hover:text-lime transition">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-widest text-cream/40 mb-4">Kontakt</div>
            <ul className="space-y-2 mb-6">
              <li><a href={`mailto:${CONTACT.email}`} className="font-medium hover:text-lime transition">{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phone}`} className="font-medium hover:text-lime transition">606 576 517</a></li>
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
              <a
                href="https://www.instagram.com/ksign.pl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KSIGN na Instagramie"
                title="KSIGN na Instagramie"
                className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:opacity-90 transition"
                style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 5.6a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zm0 6.93a2.73 2.73 0 110-5.46 2.73 2.73 0 010 5.46zm5.34-7.1a.98.98 0 11-1.96 0 .98.98 0 011.96 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-wrap items-center justify-between gap-4 text-sm text-cream/50">
          <div>© {new Date().getFullYear()} KSIGN. Wszelkie prawa zastrzeżone.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/polityka-prywatnosci" className="hover:text-lime transition">Polityka prywatności</Link>
            <Link to="/polityka-cookies" className="hover:text-lime transition">Polityka cookies</Link>
            <Link to="/sitemap" className="hover:text-lime transition">Mapa witryny</Link>
            <button
              type="button"
              onClick={() => openConsentSettings()}
              className="hover:text-lime transition underline-offset-2 hover:underline"
            >
              Ustawienia cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
