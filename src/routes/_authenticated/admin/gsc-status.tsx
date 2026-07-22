import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { runGscVerification, type GscStep } from "@/lib/gsc.functions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/gsc-status")({
  component: GscStatusPage,
  head: () => ({
    meta: [{ title: "Status weryfikacji GSC — KSIGN" }, { name: "robots", content: "noindex" }],
  }),
});

function GscStatusPage() {
  const run = useServerFn(runGscVerification);
  const [steps, setSteps] = useState<GscStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    setSteps([]);
    setSuccess(null);
    try {
      const res = await run();
      setSteps(res.steps);
      setSuccess(res.success);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  // Auto-run on mount (re-check after publish)
  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Google Search Console — status weryfikacji</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Weryfikacja META i rejestracja właściwości <code>https://www.ksign.pl/</code> z
            automatycznym ponawianiem (3 próby).
          </p>
        </div>
        <Button onClick={execute} disabled={loading} variant="outline">
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Uruchom ponownie
        </Button>
      </div>

      {error && (
        <Card className="p-4 mb-4 border-destructive">
          <p className="text-sm text-destructive">Błąd: {error}</p>
        </Card>
      )}

      <div className="space-y-3">
        {loading && steps.length === 0 && (
          <Card className="p-6 flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sprawdzam meta tag, weryfikuję własność, rejestruję właściwość…</span>
          </Card>
        )}

        {steps.map((s, i) => (
          <Card key={s.key} className="p-4 flex items-start gap-3">
            <div className="mt-0.5">
              {s.status === "ok" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : s.status === "fail" ? (
                <XCircle className="w-5 h-5 text-destructive" />
              ) : (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  Krok {i + 1}: {s.label}
                </h3>
                {s.attempts && s.attempts > 1 && (
                  <span className="text-xs text-muted-foreground">próby: {s.attempts}/3</span>
                )}
              </div>
              {s.detail && (
                <p className="text-sm text-muted-foreground mt-1 break-words">{s.detail}</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {success === true && (
        <Card className="p-4 mt-6 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
          <p className="text-sm font-medium text-green-900 dark:text-green-100">
            ✅ Weryfikacja zakończona sukcesem. Właściwość jest aktywna w Google Search Console.
          </p>
        </Card>
      )}
      {success === false && (
        <Card className="p-4 mt-6 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-900">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
            ⚠️ Weryfikacja nieudana. Najczęstsza przyczyna: meta tag w opublikowanej wersji jest
            nieaktualny po rotacji tokenu. Kliknij <strong>Publish → Update</strong>, poczekaj 30
            sekund, a panel automatycznie sprawdzi ponownie.
          </p>
        </Card>
      )}
    </div>
  );
}
