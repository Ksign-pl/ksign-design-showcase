import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "#oferta", label: "Oferta", title: "Zobacz ofertę KSIGN" },
  { href: "#pakiet", label: "Pakiet 999 zł", title: "Pakiet Start — strona one-page za 999 zł" },
  { href: "#proces", label: "Proces", title: "Jak wygląda proces realizacji" },
  { href: "#realizacje", label: "Realizacje", title: "Zobacz realizacje i cennik" },
  { href: "/blog", label: "Blog", title: "Blog KSIGN — web design, SEO, marketing" },
  { href: "#faq", label: "FAQ", title: "Najczęściej zadawane pytania" },
  { href: "#kontakt", label: "Kontakt", title: "Skontaktuj się z KSIGN" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-3 md:top-5 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Wordmark pill */}
        <Link
          to="/"
          className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border border-cream/15 backdrop-blur-xl px-4 py-2 text-base md:text-lg font-black tracking-tighter text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
            scrolled ? "bg-ink/80" : "bg-ink/50"
          }`}
          aria-label="KSIGN — strona główna"
        >
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"
          />
          KSIGN<span className="text-violet">.</span>
        </Link>

        {/* Center nav pill */}
        <nav
          className={`pointer-events-auto hidden lg:flex items-center gap-1 rounded-full border border-cream/15 backdrop-blur-xl px-2 py-2 transition-colors ${
            scrolled ? "bg-ink/80" : "bg-ink/50"
          }`}
          aria-label="Główna nawigacja"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              title={n.title}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-cream/70 hover:text-cream hover:bg-cream/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* CTA pill */}
        <a
          href="#kontakt"
          aria-label="Zamów stronę — przejdź do formularza kontaktowego"
          title="Przejdź do formularza kontaktowego"
          className="pointer-events-auto hidden lg:inline-flex items-center gap-2 bg-lime text-ink px-5 py-2.5 rounded-full text-sm font-bold hover:bg-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Zamów
          <span aria-hidden="true">→</span>
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`pointer-events-auto lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-cream/15 backdrop-blur-xl text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
            scrolled ? "bg-ink/80" : "bg-ink/50"
          }`}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="pointer-events-auto lg:hidden mx-4 mt-3 rounded-3xl border border-cream/15 bg-ink/95 backdrop-blur-xl text-cream animate-fade-in overflow-hidden"
        >
          <nav
            className="px-5 py-6 flex flex-col gap-3"
            aria-label="Menu mobilne"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                title={n.title}
                onClick={() => setOpen(false)}
                className="text-xl font-bold tracking-tight text-cream/90 hover:text-lime transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#kontakt"
              aria-label="Zamów stronę — przejdź do formularza kontaktowego"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-lime text-ink px-5 py-3 rounded-full font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Zamów stronę <span aria-hidden="true">→</span>
            </a>
          </nav>
        </div>
      )}

    </header>
  );
}
