// Widok „Nowe demo" — licznik 15:00, brief, generowanie treści i live preview.

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { DemoBuilder } from "@/components/demo/DemoBuilder";

export const Route = createFileRoute("/_authenticated/doradca/nowe")({
  head: () => ({
    meta: [
      { title: "Nowe demo — Ksign Demo Generator" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: NoweDemoPage,
});

function NoweDemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-5 py-3.5">
          <Link
            to="/doradca"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-semibold text-ink/70 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Panel
          </Link>
          <div className="h-5 w-px bg-ink/15" aria-hidden="true" />
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink/60">
              Ksign Demo Generator
            </div>
            <h1 className="text-[15px] font-black leading-tight tracking-tight">Nowe demo</h1>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-5 py-5">
        <DemoBuilder />
      </main>
    </div>
  );
}
