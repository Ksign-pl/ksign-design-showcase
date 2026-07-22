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
  const blockedRemoteVideo = /cdn\.pixabay\.com\/video\//i.test(src);
  const [visible, setVisible] = useState(false);
  const [allowVideo, setAllowVideo] = useState(!blockedRemoteVideo);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (blockedRemoteVideo) {
      setAllowVideo(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error non-standard connection API
    const saveData = navigator.connection?.saveData === true;
    if (reduce || saveData) setAllowVideo(false);
  }, [blockedRemoteVideo]);

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

  useEffect(() => {
    if (!visible || !allowVideo || ready || failed) return;
    const timeout = window.setTimeout(() => setFailed(true), 4500);
    return () => window.clearTimeout(timeout);
  }, [allowVideo, failed, ready, visible, src]);

  return (
    <div ref={ref} className={className} style={style}>
      {/* Poster / gradient placeholder — always rendered so no CLS or black gaps */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 18%, color-mix(in oklab, var(--violet) 42%, transparent), transparent 64%), radial-gradient(56% 50% at 14% 86%, color-mix(in oklab, var(--lime) 18%, transparent), transparent 68%), linear-gradient(135deg, color-mix(in oklab, var(--cream) 8%, transparent), color-mix(in oklab, var(--ink) 96%, black))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--cream) 16%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--cream) 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
        />
      ) : null}
      {visible && allowVideo && !failed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
          onCanPlay={() => setReady(true)}
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          style={filter ? { filter } : undefined}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
