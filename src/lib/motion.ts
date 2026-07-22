/**
 * Runtime motion capability detector.
 *
 * Wywoływane na kliencie (useEffect w RootComponent). Ustawia dwa
 * atrybuty na <html>, z których korzysta styles.css:
 *
 *  - data-scroll-anim="off" — brak wsparcia dla scroll-driven animacji
 *    LUB użytkownik ma prefers-reduced-motion, LUB WebKit z buggy
 *    implementacją (rail/reveal niewidoczne). Wtedy CSS przywraca
 *    statyczny stan końcowy.
 *  - data-marquee="off" — silnik ma problem z wydajnością animacji
 *    (fallback: statyczny marquee).
 *
 * Detekcja jest zachowawcza: gdy tylko mamy jakiekolwiek wątpliwości,
 * wybieramy bezpieczny fallback zamiast dziwnie działającej animacji.
 */

type MotionFlags = {
  scrollAnim: "on" | "off";
  marquee: "on" | "off";
};

const isWebKit = (ua: string) =>
  /AppleWebKit/i.test(ua) && !/Chrome|Chromium|Edg\//i.test(ua);

const detect = (): MotionFlags => {
  if (typeof window === "undefined") return { scrollAnim: "on", marquee: "on" };

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return { scrollAnim: "off", marquee: "off" };

  const mobileLike =
    window.matchMedia?.("(max-width: 767px)").matches ||
    window.matchMedia?.("(pointer: coarse)").matches;

  // Na telefonach problem był widoczny jako puste karty / skoki przy
  // scroll-driven animacjach i marquee. Wybieramy statyczny układ: bez CLS,
  // bez zależności od jakości implementacji WebView/Safari/Chrome Mobile.
  if (mobileLike) return { scrollAnim: "off", marquee: "off" };

  const supportsScrollTimeline =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("animation-timeline: view()");

  const ua = navigator.userAgent || "";
  const webkit = isWebKit(ua);

  // Safari 26+ wspiera scroll-timeline. Starsze — nie.
  // Jeżeli @supports mówi false → fallback pewny.
  // Dla WebKit bez wsparcia dodatkowo uprościmy marquee (zmniejsza
  // kompozycję warstw i chroni przed jankowaniem na słabym GPU).
  if (!supportsScrollTimeline) {
    return { scrollAnim: "off", marquee: webkit ? "off" : "on" };
  }

  return { scrollAnim: "on", marquee: "on" };
};

/**
 * Uruchamia detekcję i, opcjonalnie, obserwuje wydajność:
 * jeżeli w pierwszych 3s od załadowania trafimy na długie klatki
 * (long tasks > 200 ms), degradujemy marquee do statycznego.
 */
export function initMotionFallbacks() {
  if (typeof window === "undefined") return;

  const flags = detect();
  const root = document.documentElement;
  root.setAttribute("data-scroll-anim", flags.scrollAnim);
  root.setAttribute("data-marquee", flags.marquee);

  if (flags.marquee === "off") return;

  // Runtime performance guard — TYLKO w WebKit, bo tam scroll-driven
  // efekty i długie animacje historycznie jankują. W Chromium/Firefox
  // long tasks mogą wynikać z devowego bundle lub 404 zewnętrznych
  // zasobów i nie oznaczają problemu z samym marquee.
  const ua = navigator.userAgent || "";
  if (!isWebKit(ua)) return;

  try {
    const obs = new PerformanceObserver((list) => {
      const longest = list
        .getEntries()
        .reduce((m, e) => Math.max(m, e.duration), 0);
      if (longest > 250) {
        root.setAttribute("data-marquee", "off");
        obs.disconnect();
      }
    });
    obs.observe({ type: "longtask", buffered: true });
    window.setTimeout(() => obs.disconnect(), 3000);
  } catch {
    /* PerformanceObserver longtask może nie być wspierany */
  }
}

