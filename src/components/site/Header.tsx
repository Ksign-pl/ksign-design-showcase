import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "#oferta", label: "Oferta" },
  { href: "#pakiet", label: "Pakiet 999 zł" },
  { href: "#proces", label: "Proces" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-xl border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter">
          KSIGN<span className="text-violet">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakt"
          className="hidden lg:inline-flex items-center gap-2 bg-ink text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-violet hover:text-ink transition-all"
        >
          Zamów stronę
          <span className="inline-block">→</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 -mr-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-ink/10 animate-fade-in">
          <div className="px-5 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-bold tracking-tight"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-ink text-cream px-5 py-3 rounded-full font-semibold"
            >
              Zamów stronę →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
