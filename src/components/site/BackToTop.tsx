import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Wróć na górę strony"
      title="Wróć na górę"
      className={`fixed z-40 right-5 md:right-8 bottom-24 md:bottom-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink text-cream flex items-center justify-center shadow-[0_12px_30px_-10px_color-mix(in_oklab,var(--ink)_60%,transparent)] hover:bg-violet hover:text-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
