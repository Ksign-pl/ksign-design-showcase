import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — No Limits Web Design" },
      {
        name: "description",
        content:
          "Premium web design studio portfolio. Cinematic dark aesthetic, editorial typography, no limits.",
      },
      { property: "og:title", content: "Studio — No Limits Web Design" },
      {
        property: "og:description",
        content:
          "Premium web design studio portfolio. Cinematic dark aesthetic, editorial typography, no limits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: StudioPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#7C5CFF";

// Inline SVG grain
const GRAIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>`,
)}`;

function StudioPage() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative min-h-screen text-white overflow-x-clip"
      style={{
        background: "#0A0A0A",
        fontFamily: "'Inter', system-ui, sans-serif",
        scrollBehavior: "smooth",
      }}
    >
      {/* Film grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          opacity: 0.04,
        }}
      />
      <Nav />
      <Hero reduce={!!reduce} />
      <Manifesto reduce={!!reduce} />
      <WorkGrid reduce={!!reduce} />
      <NoLimits reduce={!!reduce} />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="flex items-center gap-1 md:gap-2 rounded-full border border-white/10 px-2 py-2 backdrop-blur-xl"
        style={{ background: "rgba(20,20,22,0.55)" }}
      >
        <span
          className="px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium tracking-tight"
          style={{ color: ACCENT }}
        >
          ● Studio
        </span>
        {["Work", "Manifesto", "Contact"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="rounded-full px-3 md:px-4 py-1.5 text-xs md:text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            {l}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ reduce }: { reduce: boolean }) {
  const headline = "Design without gravity.";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-10 pt-32 pb-16 overflow-hidden">
      {/* Radial violet glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[80vw] h-[120vw] md:h-[80vw] rounded-full"
        style={{
          background: `radial-gradient(circle, ${ACCENT}55 0%, ${ACCENT}22 30%, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />

      <h1
        className="relative text-center font-normal leading-[0.95] tracking-tight text-[13vw] md:text-[7.5vw] max-w-6xl"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              className="inline-block"
              initial={reduce ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.12,
                ease: EASE,
              }}
              style={{
                fontStyle: i === words.length - 1 ? "italic" : "normal",
                color: i === words.length - 1 ? ACCENT : "white",
                paddingRight: "0.25em",
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        className="relative mt-6 md:mt-8 max-w-md text-center text-sm md:text-base text-white/50"
      >
        An independent studio crafting cinematic web experiences for brands that
        refuse to blend in.
      </motion.p>

      {/* Video */}
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
        className="relative mt-12 md:mt-16 w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden"
        style={{
          boxShadow: `0 40px 120px -20px ${ACCENT}55, 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80"
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/10/07/183021-872881864_large.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.6) 100%)",
          }}
        />
      </motion.div>

      <div className="relative mt-10 flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/40">
        <span className="w-8 h-px bg-white/30" />
        Scroll
        <span className="w-8 h-px bg-white/30" />
      </div>
    </section>
  );
}

/* ---------------- MANIFESTO ---------------- */
function Manifesto({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  const text =
    "We believe great design is a form of respect — for time, attention, and the imagination of the person on the other side of the screen. We don't ship templates. We build worlds.";
  const words = text.split(" ");

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative px-5 md:px-10 py-32 md:py-48 max-w-5xl mx-auto"
    >
      <div className="mb-10 md:mb-14 text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40">
        [ Manifesto / 01 ]
      </div>
      <p
        className="text-[7.5vw] md:text-[3.4vw] leading-[1.15] tracking-tight"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
      >
        {words.map((w, i) => (
          <ManifestWord
            key={i}
            word={w}
            index={i}
            total={words.length}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}
      </p>
    </section>
  );
}

function ManifestWord({
  word,
  index,
  total,
  progress,
  reduce,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity, paddingRight: "0.28em" }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

/* ---------------- WORK GRID ---------------- */
const PROJECTS = [
  {
    title: "Aurora Studios",
    tag: "Brand · Web",
    img: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1400&q=80",
    video:
      "https://cdn.pixabay.com/video/2022/12/11/142348-780429796_large.mp4",
  },
  {
    title: "Meridian",
    tag: "E-commerce",
    img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1400&q=80",
    video:
      "https://cdn.pixabay.com/video/2020/09/08/49375-459823152_large.mp4",
  },
  {
    title: "Void & Form",
    tag: "Editorial",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80",
    video:
      "https://cdn.pixabay.com/video/2021/10/12/91744-635195953_large.mp4",
  },
  {
    title: "Northline",
    tag: "SaaS · Product",
    img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1400&q=80",
    video:
      "https://cdn.pixabay.com/video/2023/06/26/168269-841127723_large.mp4",
  },
];

function WorkGrid({ reduce }: { reduce: boolean }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  return (
    <section
      id="work"
      className="relative px-5 md:px-10 py-24 md:py-32 max-w-7xl mx-auto"
      onMouseMove={(e) => setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))}
    >
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <h2
          className="text-4xl md:text-6xl"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        >
          Selected <em style={{ color: ACCENT }}>work</em>
        </h2>
        <span className="hidden md:block text-xs uppercase tracking-[0.35em] text-white/40">
          2024 — 2026
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.title}
            {...p}
            index={i}
            reduce={reduce}
            onHover={(a) => setCursor((c) => ({ ...c, active: a }))}
          />
        ))}
      </div>

      {/* Custom cursor label */}
      <motion.div
        className="pointer-events-none fixed z-[55] hidden md:flex items-center justify-center rounded-full text-[11px] uppercase tracking-[0.25em] font-medium"
        animate={{
          x: cursor.x - 40,
          y: cursor.y - 40,
          opacity: cursor.active ? 1 : 0,
          scale: cursor.active ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.4 }}
        style={{
          width: 80,
          height: 80,
          background: ACCENT,
          color: "#0A0A0A",
        }}
      >
        View →
      </motion.div>
    </section>
  );
}

function ProjectCard({
  title,
  tag,
  img,
  video,
  index,
  reduce,
  onHover,
}: {
  title: string;
  tag: string;
  img: string;
  video: string;
  index: number;
  reduce: boolean;
  onHover: (a: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const offset = index % 2 === 1 ? "md:mt-16" : "";

  return (
    <motion.article
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/5 cursor-none ${offset}`}
      onMouseEnter={() => {
        setHover(true);
        onHover(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHover(false);
        onHover(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hover ? 1.05 : 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.video
          ref={videoRef}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <source src={video} type="video/mp4" />
        </motion.video>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 mb-2">
              {tag}
            </div>
            <h3
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
            >
              {title}
            </h3>
          </div>
          <span className="text-xs text-white/40 tabular-nums">
            0{index + 1}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- NO LIMITS ---------------- */
function NoLimits({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-55%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <motion.div
        style={reduce ? undefined : { x }}
        className="whitespace-nowrap flex items-center gap-12"
      >
        <span
          className="text-[22vw] leading-none tracking-tighter"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        >
          no <em style={{ color: ACCENT }}>limits</em> — no <em>limits</em> —
        </span>
      </motion.div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer
      id="contact"
      className="relative px-5 md:px-10 py-24 md:py-32 max-w-6xl mx-auto text-center"
    >
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8">
        Let's build something
      </div>
      <h2
        className="text-5xl md:text-8xl leading-[0.95] mb-12"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
      >
        Start a <em style={{ color: ACCENT }}>project</em>.
      </h2>
      <MagneticButton />
      <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 border-t border-white/5 pt-8">
        <span>© 2026 Studio. All rights reserved.</span>
        <span>Crafted with intention in the dark.</span>
      </div>
    </footer>
  );
}

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const RADIUS = 80; // trigger radius; movement clamped to ~20px
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS) {
        const strength = 20 / RADIUS;
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, x, y]);

  return (
    <motion.a
      ref={ref}
      href="mailto:hello@studio.com"
      style={{ x: sx, y: sy, background: ACCENT }}
      className="inline-flex items-center gap-3 rounded-full px-8 py-4 md:px-10 md:py-5 text-sm md:text-base font-medium text-black hover:brightness-110 transition-[filter]"
    >
      Get in touch
      <span aria-hidden>→</span>
    </motion.a>
  );
}
