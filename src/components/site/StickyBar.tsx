import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 md:gap-2 bg-ink text-cream rounded-full pl-2 pr-2 py-2 shadow-2xl border border-white/10">
        <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-lime" />
          Pakiet Start
        </span>
        <span className="px-3 py-1.5 text-sm font-black">999 zł</span>
        <span className="hidden sm:inline px-3 py-1.5 text-xs font-medium text-cream/60 uppercase tracking-wider">
          3–7 dni
        </span>
        <Link
          to="/checkout"
          search={{ price: "pakiet_start_one_time" }}
          title="Zapłać online za pakiet Start — 999 zł"
          aria-label="Zapłać online za pakiet Start — 999 zł"
          className="ml-1 inline-flex items-center gap-1.5 bg-lime text-ink px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          Zapłać <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
