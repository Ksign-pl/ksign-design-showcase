// Ramka podglądu z przełącznikiem desktop / mobile. Szablon DemoSite używa
// container queries, więc szerokość ramki w pełni steruje responsywnością.

import type { ReactNode } from "react";
import { Monitor, Smartphone } from "lucide-react";

export type PreviewMode = "desktop" | "mobile";

interface DemoPreviewFrameProps {
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  /** Adres pokazywany w pasku „przeglądarki" (informacyjnie). */
  addressLabel: string;
  children: ReactNode;
}

export function DemoPreviewFrame({
  mode,
  onModeChange,
  addressLabel,
  children,
}: DemoPreviewFrameProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 pb-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60">
          Podgląd na żywo
        </div>
        <div
          role="group"
          aria-label="Tryb podglądu"
          className="flex items-center rounded-full border border-ink/15 bg-white p-1"
        >
          <button
            type="button"
            onClick={() => onModeChange("desktop")}
            aria-pressed={mode === "desktop"}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
              mode === "desktop" ? "bg-ink text-cream" : "text-ink/70 hover:text-ink"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => onModeChange("mobile")}
            aria-pressed={mode === "mobile"}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
              mode === "mobile" ? "bg-ink text-cream" : "text-ink/70 hover:text-ink"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> Mobile
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 rounded-2xl border border-ink/15 bg-ink/90 p-2 shadow-[0_24px_60px_-30px_rgba(10,10,12,0.5)]">
        <div
          className={`mx-auto flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white transition-[max-width] duration-300 ${
            mode === "mobile" ? "max-w-[390px]" : "max-w-full"
          }`}
        >
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#F4F1EA] px-3 py-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0564F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E8B93E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#57A85C]" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md bg-white px-2.5 py-1 font-mono text-[10px] text-ink/60">
              {addressLabel}
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        </div>
      </div>
    </div>
  );
}
