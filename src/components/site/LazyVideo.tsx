import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  /** IntersectionObserver rootMargin — how early to start loading */
  rootMargin?: string;
  /** Extra "hue-rotate/saturate/blur" etc. filter applied to <video> */
  filter?: string;
};

/**
 * Renders a lightweight poster/gradient placeholder until the element
 * is close to the viewport, then mounts a real <video> that autoplays
 * muted-loop. Also respects prefers-reduced-motion and Save-Data.
 */
export function LazyVideo({
  src,
  poster,
  className = "",
  style,
  rootMargin = "400px",
  filter,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error non-standard connection API
    const saveData = navigator.connection?.saveData === true;
    if (reduce || saveData) setAllowVideo(false);
  }, []);

  useEffect(() => {
    if (!allowVideo) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allowVideo, rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {/* Poster / gradient placeholder — always rendered so no CLS */}
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}
      {visible && allowVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={filter ? { filter } : undefined}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
