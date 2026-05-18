import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function safeRedirect(url: unknown): string {
  const fallback = "/admin/zamowienia";
  if (typeof url !== "string" || url.length === 0) return fallback;
  // Only allow internal, root-relative paths. Reject protocol-relative URLs
  // ("//evil.com"), absolute URLs ("https://..."), and backslash tricks.
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith("/\\")) return fallback;
  return url;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: safeRedirect(search.redirect),
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      throw redirect({ to: safeRedirect(search.redirect) });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: safeRedirect(search.redirect) });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, search.redirect]);

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin/zamowienia" },
        });
        if (error) throw error;
        toast.success("Konto utworzone. Możesz się zalogować.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        toast.success("Sprawdź skrzynkę — wysłaliśmy link do resetu hasła.");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/login",
    });
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← KSIGN
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            {mode === "signin"
              ? "Zaloguj się"
              : mode === "signup"
                ? "Utwórz konto"
                : "Resetuj hasło"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "forgot"
              ? "Wyślemy link do ustawienia nowego hasła."
              : "Panel administracyjny zamówień"}
          </p>
        </div>

        {mode !== "forgot" && (
          <>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogle}
              disabled={loading}
            >
              Kontynuuj z Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">lub</span>
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {mode !== "forgot" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Hasło</Label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Zapomniałem hasła
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {mode === "signin"
              ? "Zaloguj się"
              : mode === "signup"
                ? "Zarejestruj"
                : "Wyślij link"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() =>
            setMode(mode === "signin" ? "signup" : "signin")
          }
          className="block w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "signin"
            ? "Nie masz konta? Zarejestruj się"
            : mode === "signup"
              ? "Masz już konto? Zaloguj się"
              : "← Wróć do logowania"}
        </button>
      </div>
    </div>
  );
}
