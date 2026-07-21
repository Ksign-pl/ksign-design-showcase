// Generator treści demo — Anthropic API (oficjalne SDK) za walidacją Zod.
// Wywoływany WYŁĄCZNIE ręcznym kliknięciem „Generuj treści demo" w panelu doradcy;
// podgląd na żywo korzysta z fallbacku z briefu i nie dotyka tego endpointu.

import { createServerFn } from "@tanstack/react-start";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  BriefSchema,
  DemoContentSchema,
  getPackage,
  getSiteType,
  type Brief,
  type DemoContent,
} from "./schema";

const DEFAULT_MODEL = "claude-opus-4-8";

export type GenerateResult =
  | { ok: true; content: DemoContent; model: string }
  | {
      ok: false;
      /** Komunikat konfiguracyjny widoczny wyłącznie dla doradcy. */
      configError?: { missingEnv: string; message: string };
      error?: string;
    };

// Luźniejszy schemat dla structured outputs (API nie wspiera min/max/length),
// po odpowiedzi normalizujemy i walidujemy ściśle przez DemoContentSchema.
const AiContentSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  cta: z.string(),
  aboutText: z.string(),
  services: z.array(z.object({ title: z.string(), description: z.string() })),
  trustPoints: z.array(z.string()),
  offerIntro: z.string(),
  contactHeading: z.string(),
});

const clamp = (value: string, max: number) => {
  const trimmed = value.trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max - 1).trimEnd()}…`;
};

function normalizeAiContent(raw: z.infer<typeof AiContentSchema>): DemoContent {
  return DemoContentSchema.parse({
    heroTitle: clamp(raw.heroTitle, 90),
    heroSubtitle: clamp(raw.heroSubtitle, 260),
    cta: clamp(raw.cta, 40),
    aboutText: clamp(raw.aboutText, 700),
    services: raw.services.slice(0, 3).map((s) => ({
      title: clamp(s.title, 60),
      description: clamp(s.description, 220),
    })),
    trustPoints: raw.trustPoints.slice(0, 3).map((t) => clamp(t, 120)),
    offerIntro: clamp(raw.offerIntro, 400),
    contactHeading: clamp(raw.contactHeading, 90),
  });
}

function buildPrompt(brief: Brief): { system: string; user: string } {
  const siteType = getSiteType(brief.siteType);
  const pkg = getPackage(brief.packageId);
  return {
    system: [
      "Jesteś doświadczonym polskim copywriterem tworzącym treści na strony internetowe małych firm.",
      "Piszesz WYŁĄCZNIE po polsku, poprawną polszczyzną.",
      "Zasady:",
      "- Konkretnie i rzeczowo. Zero pustych obietnic, frazesów („najlepsi na rynku", „lider branży") i wykrzykników.",
      "- Nie wymyślaj danych, których nie ma w briefie (liczb klientów, lat doświadczenia, certyfikatów, adresów, cen).",
      "- heroTitle: krótki, mocny nagłówek (max 8 słów). heroSubtitle: 1–2 zdania o realnej korzyści.",
      "- cta: 2–4 słowa, tryb rozkazujący (np. „Zamów wycenę").",
      "- aboutText: 3–5 zdań o firmie, pisane naturalnie, w pierwszej osobie liczby mnogiej.",
      "- services: dokładnie 3 usługi wynikające z briefu — tytuł + opis 1–2 zdania.",
      "- trustPoints: dokładnie 3 krótkie, weryfikowalne powody zaufania (proces, gwarancja, komunikacja — nie superlatywy).",
      "- offerIntro: 2–3 zdania wprowadzające do sekcji oferty.",
      "- contactHeading: krótki nagłówek sekcji kontaktu zachęcający do działania.",
    ].join("\n"),
    user: [
      "Przygotuj treści strony demo dla klienta na podstawie briefu:",
      `- Nazwa firmy: ${brief.companyName}`,
      `- Główna usługa / oferta: ${brief.mainService}`,
      `- Grupa docelowa: ${brief.targetAudience}`,
      `- Miasto / obszar działania: ${brief.city}`,
      `- Typ strony: ${siteType.label}`,
      `- Wybrany pakiet: ${pkg.name} (${pkg.description})`,
    ].join("\n"),
  };
}

export const generateDemoContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => BriefSchema.parse(input))
  .handler(async ({ data }): Promise<GenerateResult> => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        configError: {
          missingEnv: "ANTHROPIC_API_KEY",
          message:
            "Generator AI nie jest skonfigurowany. Ustaw zmienną środowiskową ANTHROPIC_API_KEY (oraz opcjonalnie ANTHROPIC_MODEL), aby włączyć generowanie treści.",
        },
      };
    }

    const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
    const client = new Anthropic({ apiKey });
    const prompt = buildPrompt(data);

    try {
      const response = await client.messages.parse({
        model,
        max_tokens: 4096,
        system: prompt.system,
        messages: [{ role: "user", content: prompt.user }],
        output_config: { format: zodOutputFormat(AiContentSchema) },
      });

      if (response.stop_reason === "refusal" || !response.parsed_output) {
        return {
          ok: false,
          error: "Model nie zwrócił poprawnych treści. Spróbuj ponownie.",
        };
      }

      return { ok: true, content: normalizeAiContent(response.parsed_output), model };
    } catch (err) {
      if (err instanceof z.ZodError) {
        return {
          ok: false,
          error: "Model zwrócił niekompletne treści (walidacja nie przeszła). Spróbuj ponownie.",
        };
      }
      if (err instanceof Anthropic.AuthenticationError) {
        return {
          ok: false,
          configError: {
            missingEnv: "ANTHROPIC_API_KEY",
            message: "Klucz ANTHROPIC_API_KEY jest nieprawidłowy lub wygasł.",
          },
        };
      }
      if (err instanceof Anthropic.NotFoundError) {
        return {
          ok: false,
          configError: {
            missingEnv: "ANTHROPIC_MODEL",
            message: `Model „${model}" nie istnieje. Popraw zmienną środowiskową ANTHROPIC_MODEL.`,
          },
        };
      }
      if (err instanceof Anthropic.RateLimitError) {
        return { ok: false, error: "Limit zapytań do Anthropic API przekroczony. Odczekaj chwilę i spróbuj ponownie." };
      }
      if (err instanceof Anthropic.APIError) {
        console.error("[demo:generate] Anthropic API error:", err.status, err.message);
        return { ok: false, error: "Błąd Anthropic API. Spróbuj ponownie za chwilę." };
      }
      console.error("[demo:generate] unexpected error:", err);
      return { ok: false, error: "Nie udało się wygenerować treści. Spróbuj ponownie." };
    }
  });
