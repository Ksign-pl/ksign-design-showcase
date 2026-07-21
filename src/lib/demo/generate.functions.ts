// Generator treści demo — Anthropic API (oficjalne SDK) za walidacją Zod.
// Wywoływany WYŁĄCZNIE ręcznym kliknięciem „Generuj treści demo" w panelu doradcy;
// podgląd na żywo korzysta z fallbacku z briefu i nie dotyka tego endpointu.

import { createServerFn } from "@tanstack/react-start";
import Anthropic from "@anthropic-ai/sdk";
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

// Luźniejszy schemat odpowiedzi modelu (structured outputs nie wspiera min/max/length) —
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

// JSON Schema przekazywany do output_config.format — API wymusza kształt odpowiedzi.
const AI_OUTPUT_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "heroTitle",
    "heroSubtitle",
    "cta",
    "aboutText",
    "services",
    "trustPoints",
    "offerIntro",
    "contactHeading",
  ],
  properties: {
    heroTitle: { type: "string", description: "Krótki, mocny nagłówek hero (max 8 słów)" },
    heroSubtitle: { type: "string", description: "1–2 zdania o realnej korzyści" },
    cta: { type: "string", description: "2–4 słowa, tryb rozkazujący" },
    aboutText: { type: "string", description: "3–5 zdań o firmie" },
    services: {
      type: "array",
      description: "Dokładnie 3 usługi",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "description"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    trustPoints: {
      type: "array",
      description: "Dokładnie 3 krótkie powody zaufania",
      items: { type: "string" },
    },
    offerIntro: { type: "string", description: "2–3 zdania wprowadzenia do oferty" },
    contactHeading: { type: "string", description: "Nagłówek sekcji kontaktu" },
  },
};

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
      "- Konkretnie i rzeczowo. Zero pustych obietnic, frazesów („najlepsi na rynku”, „lider branży”) i wykrzykników.",
      "- Nie wymyślaj danych, których nie ma w briefie (liczb klientów, lat doświadczenia, certyfikatów, adresów, cen).",
      "- heroTitle: krótki, mocny nagłówek (max 8 słów). heroSubtitle: 1–2 zdania o realnej korzyści.",
      "- cta: 2–4 słowa, tryb rozkazujący (np. „Zamów wycenę”).",
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
      const response = await client.messages.create({
        model,
        max_tokens: 4096,
        system: prompt.system,
        messages: [{ role: "user", content: prompt.user }],
        output_config: {
          format: {
            type: "json_schema",
            schema: AI_OUTPUT_JSON_SCHEMA,
          },
        },
      });

      if (response.stop_reason === "refusal") {
        return {
          ok: false,
          error:
            "Model odmówił wygenerowania treści dla tego briefu. Zmień opis i spróbuj ponownie.",
        };
      }

      const textBlock = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === "text",
      );
      if (!textBlock?.text) {
        return { ok: false, error: "Model nie zwrócił treści. Spróbuj ponownie." };
      }

      const raw = AiContentSchema.parse(JSON.parse(textBlock.text));
      return { ok: true, content: normalizeAiContent(raw), model };
    } catch (err) {
      if (err instanceof z.ZodError || err instanceof SyntaxError) {
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
        return {
          ok: false,
          error: "Limit zapytań do Anthropic API przekroczony. Odczekaj chwilę i spróbuj ponownie.",
        };
      }
      if (err instanceof Anthropic.APIError) {
        console.error("[demo:generate] Anthropic API error:", err.status, err.message);
        return { ok: false, error: "Błąd Anthropic API. Spróbuj ponownie za chwilę." };
      }
      console.error("[demo:generate] unexpected error:", err);
      return { ok: false, error: "Nie udało się wygenerować treści. Spróbuj ponownie." };
    }
  });
