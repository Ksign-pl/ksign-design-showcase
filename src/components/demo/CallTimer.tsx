// Licznik rozmowy 15:00 — start / pauza / reset. Czysto kliencki.

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALL_SECONDS = 15 * 60;

export function CallTimer() {
  const [secondsLeft, setSecondsLeft] = useState(CALL_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const critical = secondsLeft <= 120;
  const finished = secondsLeft === 0;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-2.5 shadow-sm">
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/60">
          Czas rozmowy
        </div>
        <div
          role="timer"
          aria-live={finished ? "assertive" : "off"}
          aria-label={`Pozostały czas rozmowy: ${minutes} minut ${seconds} sekund`}
          className={`font-mono text-2xl font-bold tabular-nums leading-none ${
            finished ? "text-destructive" : critical ? "text-destructive" : "text-ink"
          }`}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          size="icon"
          variant={running ? "secondary" : "default"}
          className="h-8 w-8 rounded-full"
          onClick={() => setRunning((r) => !r && secondsLeft > 0)}
          aria-label={running ? "Wstrzymaj licznik" : "Uruchom licznik"}
          disabled={finished && !running}
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => {
            setRunning(false);
            setSecondsLeft(CALL_SECONDS);
          }}
          aria-label="Zresetuj licznik do 15:00"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
      {finished ? (
        <span className="text-[11px] font-semibold text-destructive">Czas minął</span>
      ) : null}
    </div>
  );
}
