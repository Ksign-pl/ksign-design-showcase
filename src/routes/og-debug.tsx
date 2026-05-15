import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/og-debug")({
  head: () => ({
    meta: [
      { title: "OG Debug — KSIGN" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: OgDebugPage,
});

type DebugResult = {
  ok: boolean;
  status: number;
  url: string;
  scrape: boolean;
  data: unknown;
};

function OgDebugPage() {
  const [url, setUrl] = useState("https://ksign.pl/");
  const [scrape, setScrape] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DebugResult | { error: string } | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/public/og-debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, scrape }),
      });
      setResult(await res.json());
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  const og =
    result && "data" in result && result.data && typeof result.data === "object"
      ? (result.data as Record<string, unknown>)
      : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Meta OG Debug</h1>
        <p className="text-muted-foreground mb-8">
          Sprawdza, jak Meta widzi tagi Open Graph dla podanego URL (Sharing Debugger API).
          Z opcją <code>scrape=true</code> wymusza odświeżenie cache Meta.
        </p>

        <form onSubmit={run} className="space-y-4 mb-8">
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ksign.pl/"
              required
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={scrape}
              onChange={(e) => setScrape(e.target.checked)}
            />
            Wymuś re-scrape (odśwież cache Meta)
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? "Sprawdzam…" : "Sprawdź"}
          </Button>
        </form>

        {og && (
          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 text-sm border border-border rounded-lg p-4 mb-6">
            {[
              ["og:title", og["og_object"] && (og["og_object"] as Record<string, unknown>)["title"], og["title"]],
              ["og:description", og["og_object"] && (og["og_object"] as Record<string, unknown>)["description"], og["description"]],
              ["og:type", og["og_object"] && (og["og_object"] as Record<string, unknown>)["type"], og["type"]],
              ["og:image", og["image"] && Array.isArray(og["image"]) ? (og["image"] as Array<Record<string, unknown>>)[0]?.["url"] : undefined, undefined],
              ["url", og["url"], undefined],
              ["updated_time", og["updated_time"], undefined],
            ].map(([k, a, b]) => {
              const v = (a ?? b) as unknown;
              if (v == null) return null;
              return (
                <div key={k as string} className="contents">
                  <div className="font-mono text-muted-foreground">{k as string}</div>
                  <div className="break-all">{String(v)}</div>
                </div>
              );
            })}
          </div>
        )}

        {result && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Surowa odpowiedź</h2>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-[600px]">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
