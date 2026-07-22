// Abstrakcyjne, deterministyczne grafiki SVG w kolorach marki klienta.
// Zero zewnętrznych obrazów — wszystko rysowane lokalnie, per typ strony.

import type { SiteTypeId } from "@/lib/demo/schema";

interface MotifProps {
  type: SiteTypeId;
  base: string;
  tint: string;
  className?: string;
}

/** Duża grafika hero — spójna z typem działalności, czysto dekoracyjna. */
export function HeroMotif({ type, base, tint, className }: MotifProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {type === "local" && (
        <g fill="none" strokeWidth="2.5">
          <circle cx="200" cy="200" r="170" stroke={tint} />
          <circle cx="200" cy="200" r="130" stroke={tint} />
          <circle cx="200" cy="200" r="90" stroke={base} strokeWidth="3" />
          <circle cx="200" cy="200" r="50" stroke={base} strokeWidth="3" />
          <circle cx="200" cy="200" r="14" fill={base} stroke="none" />
          <path d="M200 16v52M200 332v52M16 200h52M332 200h52" stroke={base} strokeWidth="3" />
        </g>
      )}
      {type === "b2b" && (
        <g>
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((__, col) => {
              const emphasized = (row + col) % 3 === 0;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={30 + col * 58}
                  y={30 + row * 58}
                  width={emphasized ? 34 : 12}
                  height={emphasized ? 34 : 12}
                  rx={emphasized ? 6 : 3}
                  fill={emphasized ? base : tint}
                  opacity={emphasized ? 0.95 : 0.8}
                />
              );
            }),
          )}
        </g>
      )}
      {type === "beauty" && (
        <g fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="200"
              rx={165 - i * 8}
              ry={70 + i * 14}
              stroke={i % 2 === 0 ? base : tint}
              strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
              transform={`rotate(${i * 26} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="10" fill={base} />
        </g>
      )}
      {type === "construction" && (
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x={40 + i * 40}
              y={360 - (i % 4) * 70 - 90}
              width="26"
              height={(i % 4) * 70 + 90}
              fill={i % 2 === 0 ? base : tint}
              rx="4"
            />
          ))}
          <path d="M24 372h352" stroke={base} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {type === "gastro" && (
        <g fill="none">
          <circle cx="200" cy="200" r="150" stroke={tint} strokeWidth="26" />
          <circle cx="200" cy="200" r="102" stroke={base} strokeWidth="3" />
          <circle cx="200" cy="200" r="88" stroke={base} strokeWidth="1.5" strokeDasharray="2 8" />
          <circle cx="200" cy="200" r="34" fill={base} stroke="none" />
          <path
            d="M330 60c14 26 14 54 0 80M356 44c22 38 22 74 0 112"
            stroke={base}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}
      {type === "realestate" && (
        <g fill="none" strokeWidth="2.5">
          <path d="M60 340V180l90-70 90 70v160" stroke={base} strokeWidth="3" />
          <path d="M240 340V150l100-60 40 24" stroke={tint} />
          <rect x="96" y="220" width="34" height="34" stroke={base} />
          <rect x="170" y="220" width="34" height="34" stroke={base} />
          <rect x="96" y="284" width="34" height="56" stroke={base} />
          <rect x="276" y="200" width="30" height="30" stroke={tint} />
          <rect x="276" y="260" width="30" height="30" stroke={tint} />
          <path d="M28 340h344" stroke={base} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/** Mniejsza wstawka dekoracyjna do sekcji „O nas". */
export function SectionMotif({ type, base, tint, className }: MotifProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {(type === "local" || type === "construction") && (
        <g>
          <path d="M20 180L180 20" stroke={tint} strokeWidth="14" strokeLinecap="round" />
          <path d="M20 120L120 20" stroke={base} strokeWidth="14" strokeLinecap="round" />
          <path
            d="M80 180L180 80"
            stroke={base}
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      )}
      {(type === "b2b" || type === "realestate") && (
        <g fill="none" strokeWidth="2.5">
          <rect x="24" y="24" width="152" height="152" rx="10" stroke={tint} />
          <rect x="52" y="52" width="96" height="96" rx="8" stroke={base} />
          <circle cx="100" cy="100" r="22" fill={base} />
        </g>
      )}
      {(type === "beauty" || type === "gastro") && (
        <g fill="none">
          <path
            d="M100 24c42 30 60 62 60 96a60 60 0 01-120 0c0-34 18-66 60-96z"
            stroke={base}
            strokeWidth="3"
          />
          <path
            d="M100 60c24 20 36 40 36 60a36 36 0 01-72 0c0-20 12-40 36-60z"
            stroke={tint}
            strokeWidth="2"
          />
        </g>
      )}
    </svg>
  );
}

/** Abstrakcyjna „fotografia" produktu/usługi do kart (bez zewnętrznych zdjęć). */
export function CardMotif({ type, base, tint, index, className }: MotifProps & { index: number }) {
  const variant = index % 3;
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="320" height="200" fill={tint} opacity="0.5" />
      {variant === 0 && (
        <g>
          <circle cx={90 + (index % 2) * 30} cy="100" r="64" fill={base} opacity="0.9" />
          <circle cx="220" cy="72" r="30" fill="none" stroke={base} strokeWidth="3" />
          <path d="M180 168h110" stroke={base} strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {variant === 1 && (
        <g>
          <rect x="46" y="46" width="108" height="108" rx="14" fill={base} opacity="0.9" />
          <rect
            x="180"
            y="76"
            width="78"
            height="78"
            rx="12"
            fill="none"
            stroke={base}
            strokeWidth="3"
          />
          <circle cx="270" cy="52" r="12" fill={base} />
        </g>
      )}
      {variant === 2 && (
        <g fill="none" stroke={base}>
          <path
            d="M30 160C90 60 150 60 200 120s90 50 90-20"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="120" r="10" fill={base} stroke="none" />
          <circle cx="30" cy="160" r="8" fill={base} stroke="none" />
        </g>
      )}
      {type === "gastro" && <circle cx="286" cy="170" r="16" fill={base} opacity="0.6" />}
    </svg>
  );
}
