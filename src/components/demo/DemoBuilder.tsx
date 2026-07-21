// Budowniczy dema: formularz briefu (lewa strona) + podgląd na żywo (prawa).
// Podgląd renderuje się z aktualnych danych briefu natychmiast (fallback bez AI);
// płatny model Anthropic uruchamia się WYŁĄCZNIE przyciskiem „Generuj treści demo".

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { z } from "zod";
import {
  AlertTriangle,
  Check,
  Copy,
  ExternalLink,
  ImageIcon,
  Loader2,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

import {
  BriefSchema,
  DEMO_PACKAGES,
  SITE_TYPES,
  formatPricePln,
  getSiteType,
  type Brief,
  type DemoContent,
} from "@/lib/demo/schema";
import { buildFallbackContent } from "@/lib/demo/fallback-content";
import { resolveBrandColor } from "@/lib/demo/branding";
import { generateDemoContent } from "@/lib/demo/generate.functions";
import {
  createAndSendDemo,
  sendDemo,
  updateDemo,
  type SendOutcome,
} from "@/lib/demo/demos.functions";

import { CallTimer } from "./CallTimer";
import { DemoPreviewFrame, type PreviewMode } from "./DemoPreviewFrame";
import { DemoSite, type DemoPage } from "./DemoSite";

type BriefFormValues = z.input<typeof BriefSchema>;

export interface DemoBuilderInitial {
  demoId: string;
  brief: Brief;
  content: DemoContent | null;
  status: string;
  slug: string;
  publicUrl: string;
}

interface DemoBuilderProps {
  /** Tryb edycji istniejącego dema (prefill + zapisz/wyślij zamiast utwórz). */
  initial?: DemoBuilderInitial;
}

interface SendResultState extends SendOutcome {
  publicUrl: string;
  demoId: string;
}

const EMPTY_VALUES: BriefFormValues = {
  companyName: "",
  mainService: "",
  targetAudience: "",
  city: "",
  clientEmail: "",
  advisorName: "",
  logoUrl: "",
  brandColor: "",
  siteType: "local",
  packageId: "start",
};

function MonoHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60">
      {children}
    </div>
  );
}

export function DemoBuilder({ initial }: DemoBuilderProps) {
  const form = useForm<BriefFormValues, unknown, Brief>({
    resolver: zodResolver(BriefSchema),
    mode: "onChange",
    defaultValues: initial
      ? {
          companyName: initial.brief.companyName,
          mainService: initial.brief.mainService,
          targetAudience: initial.brief.targetAudience,
          city: initial.brief.city,
          clientEmail: initial.brief.clientEmail,
          advisorName: initial.brief.advisorName ?? "",
          logoUrl: initial.brief.logoUrl ?? "",
          brandColor: initial.brief.brandColor ?? "",
          siteType: initial.brief.siteType,
          packageId: initial.brief.packageId,
        }
      : EMPTY_VALUES,
  });

  const [aiContent, setAiContent] = useState<DemoContent | null>(initial?.content ?? null);
  const [generatedWith, setGeneratedWith] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<SendResultState | null>(initial ? null : null);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [previewPage, setPreviewPage] = useState<DemoPage>("home");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const values = form.watch();
  const parsedBrief = useMemo(() => BriefSchema.safeParse(values), [values]);
  const requiredFilled = parsedBrief.success;

  // Podgląd korzysta z aktualnych danych briefu również przed generowaniem AI.
  const previewBrief: Brief = useMemo(
    () => ({
      companyName: values.companyName?.trim() || "Nazwa Firmy",
      mainService: values.mainService?.trim() || "Główna usługa Twojej firmy",
      targetAudience: values.targetAudience?.trim() || "klienci indywidualni",
      city: values.city?.trim() || "Twoje miasto",
      clientEmail: values.clientEmail?.trim() || "klient@example.com",
      advisorName: values.advisorName ?? "",
      logoUrl: values.logoUrl ?? "",
      brandColor: values.brandColor ?? "",
      siteType: values.siteType ?? "local",
      packageId: values.packageId ?? "start",
    }),
    [values],
  );

  const previewContent = useMemo(
    () => aiContent ?? buildFallbackContent(previewBrief),
    [aiContent, previewBrief],
  );

  const multiPage = previewBrief.packageId === "business" || previewBrief.packageId === "premium";
  const effectivePage: DemoPage = multiPage ? previewPage : "home";

  const handleGenerate = async () => {
    const parsed = BriefSchema.safeParse(form.getValues());
    if (!parsed.success) {
      form.trigger();
      toast.error("Uzupełnij wymagane pola briefu.");
      return;
    }
    setGenerating(true);
    setConfigError(null);
    try {
      const result = await generateDemoContent({ data: parsed.data });
      if (result.ok) {
        setAiContent(result.content);
        setGeneratedWith(result.model);
        toast.success("Treści demo wygenerowane.");
      } else if (result.configError) {
        setConfigError(result.configError.message);
      } else {
        toast.error(result.error ?? "Nie udało się wygenerować treści.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Błąd generowania treści.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCreateAndSend = form.handleSubmit(async (brief) => {
    if (!aiContent) {
      toast.error("Najpierw wygeneruj treści demo.");
      return;
    }
    setSending(true);
    try {
      const result = await createAndSendDemo({
        data: { brief, content: aiContent, generatedWith },
      });
      setSendResult({
        publicUrl: result.publicUrl,
        demoId: result.id,
        emailSent: result.emailSent,
        emailError: result.emailError,
        sheetsAppended: result.sheetsAppended,
        sheetsError: result.sheetsError,
        configError: result.configError,
      });
      if (result.emailSent) toast.success("Demo utworzone i wysłane do klienta.");
      else toast.warning("Demo utworzone — e-mail nie został wysłany.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nie udało się utworzyć dema.");
    } finally {
      setSending(false);
    }
  });

  const handleSaveEdit = form.handleSubmit(async (brief) => {
    if (!initial) return;
    setSending(true);
    try {
      await updateDemo({
        data: { demoId: initial.demoId, brief, content: aiContent, generatedWith },
      });
      toast.success("Zmiany zapisane — publiczne demo zaktualizowane.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nie udało się zapisać zmian.");
    } finally {
      setSending(false);
    }
  });

  const handleSendExisting = async () => {
    if (!initial) return;
    setSending(true);
    try {
      const result = await sendDemo({ data: { demoId: initial.demoId } });
      setSendResult({
        publicUrl: result.publicUrl,
        demoId: initial.demoId,
        emailSent: result.emailSent,
        emailError: result.emailError,
        sheetsAppended: result.sheetsAppended,
        sheetsError: result.sheetsError,
        configError: result.configError,
      });
      if (result.emailSent) toast.success("E-mail z demem wysłany do klienta.");
      else toast.warning("E-mail nie został wysłany.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nie udało się wysłać dema.");
    } finally {
      setSending(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Logo musi być plikiem graficznym (PNG, JPG, SVG, WebP).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo może mieć maksymalnie 2 MB.");
      return;
    }
    setUploadingLogo(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("Sesja wygasła — zaloguj się ponownie.");
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-60);
      const path = `${userData.user.id}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage.from("demo-logos").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw new Error(`Upload nieudany: ${error.message}`);
      const { data: pub } = supabase.storage.from("demo-logos").getPublicUrl(path);
      form.setValue("logoUrl", pub.publicUrl, { shouldValidate: true });
      toast.success("Logo wgrane.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nie udało się wgrać logo.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link skopiowany.");
    } catch {
      toast.error("Nie udało się skopiować linku.");
    }
  };

  const currentBrandColor =
    values.brandColor && /^#[0-9a-fA-F]{6}$/.test(values.brandColor)
      ? values.brandColor
      : resolveBrandColor({ brandColor: "", siteType: previewBrief.siteType });

  const addressLabel = initial
    ? initial.publicUrl
    : `demo.ksing.pl/${
        (values.companyName || "twoja-firma")
          .toLowerCase()
          .replace(/[^a-z0-9ąćęłńóśźż]+/gi, "-")
          .replace(/^-+|-+$/g, "") || "twoja-firma"
      }-xxxxxxx`;

  return (
    <div className="grid min-h-0 flex-1 gap-6 xl:grid-cols-[minmax(360px,440px)_1fr]">
      <Toaster position="top-center" />
      {/* ==================== LEWA KOLUMNA: BRIEF ==================== */}
      <div className="min-h-0 space-y-5 overflow-y-auto pb-8 pr-1">
        <CallTimer />

        {configError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Wymagana konfiguracja (widoczne tylko dla doradcy)</AlertTitle>
            <AlertDescription>{configError}</AlertDescription>
          </Alert>
        ) : null}

        {sendResult ? (
          <Alert className="border-lime/40 bg-lime/10">
            <Check className="h-4 w-4" />
            <AlertTitle>
              {sendResult.emailSent
                ? "Demo wysłane do klienta"
                : "Demo utworzone (bez wysyłki e-maila)"}
            </AlertTitle>
            <AlertDescription>
              <div className="mt-1 space-y-2 text-[13px]">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={sendResult.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-2"
                  >
                    {sendResult.publicUrl} <ExternalLink className="h-3 w-3" />
                  </a>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 px-2 text-[11px]"
                    onClick={() => copyLink(sendResult.publicUrl)}
                  >
                    <Copy className="h-3 w-3" /> Kopiuj
                  </Button>
                </div>
                {sendResult.configError ? (
                  <p className="text-destructive">{sendResult.configError}</p>
                ) : null}
                {sendResult.emailError ? (
                  <p className="text-destructive">Błąd wysyłki e-maila: {sendResult.emailError}</p>
                ) : null}
                <p className="text-ink/70">
                  Google Sheets:{" "}
                  {sendResult.sheetsAppended
                    ? "lead dopisany."
                    : `nie dopisano (${sendResult.sheetsError ?? "wyłączone"}) — nie blokuje wysyłki.`}
                </p>
                <p>
                  <Link
                    to="/doradca/demo/$demoId"
                    params={{ demoId: sendResult.demoId }}
                    className="font-semibold underline underline-offset-2"
                  >
                    Otwórz demo w panelu →
                  </Link>
                </p>
              </div>
            </AlertDescription>
          </Alert>
        ) : null}

        <Form {...form}>
          <form
            onSubmit={initial ? handleSaveEdit : handleCreateAndSend}
            className="space-y-5"
            noValidate
          >
            <section className="rounded-2xl border border-ink/10 bg-white p-4">
              <MonoHeading>01 · Brief klienta</MonoHeading>
              <div className="space-y-3.5">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa firmy *</FormLabel>
                      <FormControl>
                        <Input placeholder="np. Hydro-Mar" autoComplete="organization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mainService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Główna usługa / oferta *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="np. Instalacje hydrauliczne i pompy ciepła"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grupa docelowa *</FormLabel>
                      <FormControl>
                        <Input placeholder="np. właściciele domów jednorodzinnych" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Miasto / obszar *</FormLabel>
                        <FormControl>
                          <Input placeholder="np. Poznań i okolice" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail klienta *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="klient@firma.pl"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="advisorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa doradcy</FormLabel>
                      <FormControl>
                        <Input placeholder="np. Karol z KSIGN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white p-4">
              <MonoHeading>02 · Branding</MonoHeading>
              <div className="space-y-4">
                <div>
                  <Label className="mb-1.5 block">Logo (opcjonalne)</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      className="sr-only"
                      id="demo-logo-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleLogoUpload(file);
                        e.target.value = "";
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      disabled={uploadingLogo}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadingLogo ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <ImageIcon className="h-3.5 w-3.5" />
                      )}
                      {values.logoUrl ? "Zmień logo" : "Wgraj logo"}
                    </Button>
                    {values.logoUrl ? (
                      <span className="flex items-center gap-2">
                        <img
                          src={values.logoUrl}
                          alt="Podgląd logo"
                          className="h-8 w-auto max-w-[110px] rounded border border-ink/10 bg-white object-contain p-0.5"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          aria-label="Usuń logo"
                          onClick={() => form.setValue("logoUrl", "")}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </span>
                    ) : (
                      <span className="text-[12px] text-muted-foreground">
                        Brak logo → tymczasowy wordmark z nazwy firmy
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="demo-brand-color" className="mb-1.5 block">
                    Kolor marki
                  </Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="demo-brand-color"
                      type="color"
                      value={currentBrandColor}
                      onChange={(e) => form.setValue("brandColor", e.target.value)}
                      className="h-9 w-14 cursor-pointer rounded-lg border border-ink/15 bg-white p-1"
                      aria-label="Kolor marki klienta"
                    />
                    <code className="font-mono text-[12px] text-ink/70">{currentBrandColor}</code>
                    {values.brandColor ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-[11px]"
                        onClick={() => form.setValue("brandColor", "")}
                      >
                        Domyślny dla branży
                      </Button>
                    ) : (
                      <span className="text-[12px] text-muted-foreground">
                        domyślny dla typu strony
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white p-4">
              <MonoHeading>03 · Typ strony</MonoHeading>
              <FormField
                control={form.control}
                name="siteType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-2 gap-2"
                      >
                        {SITE_TYPES.map((type) => (
                          <label
                            key={type.id}
                            htmlFor={`site-type-${type.id}`}
                            className={`flex cursor-pointer items-start gap-2 rounded-xl border p-2.5 transition-colors ${
                              field.value === type.id
                                ? "border-ink bg-ink/[0.04]"
                                : "border-ink/10 hover:border-ink/30"
                            }`}
                          >
                            <RadioGroupItem
                              value={type.id}
                              id={`site-type-${type.id}`}
                              className="mt-0.5"
                            />
                            <span className="min-w-0">
                              <span className="block text-[13px] font-bold leading-tight">
                                {type.label}
                              </span>
                              <span className="block truncate text-[11px] text-muted-foreground">
                                {type.hint}
                              </span>
                            </span>
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white p-4">
              <MonoHeading>04 · Pakiet</MonoHeading>
              <FormField
                control={form.control}
                name="packageId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                          setPreviewPage("home");
                        }}
                        className="grid gap-2"
                      >
                        {DEMO_PACKAGES.map((pkg) => (
                          <label
                            key={pkg.id}
                            htmlFor={`pkg-${pkg.id}`}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                              field.value === pkg.id
                                ? "border-ink bg-ink/[0.04]"
                                : "border-ink/10 hover:border-ink/30"
                            }`}
                          >
                            <RadioGroupItem value={pkg.id} id={`pkg-${pkg.id}`} />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-baseline justify-between gap-2">
                                <span className="text-[14px] font-extrabold tracking-tight">
                                  {pkg.name}
                                </span>
                                <span className="font-mono text-[13px] font-bold text-lime">
                                  {formatPricePln(pkg.pricePln)}
                                </span>
                              </span>
                              <span className="block text-[12px] text-muted-foreground">
                                {pkg.description}
                              </span>
                            </span>
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="sticky bottom-0 -mx-1 space-y-2 rounded-2xl border border-ink/10 bg-cream/95 p-4 backdrop-blur">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 border-violet/40 text-ink hover:bg-violet/10"
                disabled={!requiredFilled || generating}
                onClick={handleGenerate}
              >
                {generating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 text-violet" />
                )}
                {aiContent ? "Generuj treści ponownie" : "Generuj treści demo"}
              </Button>
              {initial ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button type="submit" className="gap-2" disabled={sending}>
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    Zapisz zmiany
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="gap-2"
                    disabled={sending || initial.status === "paid" || !aiContent}
                    onClick={handleSendExisting}
                  >
                    <Send className="h-4 w-4" />
                    {initial.status === "sent" ? "Wyślij ponownie" : "Wyślij demo"}
                  </Button>
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full gap-2 bg-lime text-white hover:bg-lime/90"
                  disabled={!aiContent || sending || !requiredFilled}
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Utwórz i wyślij demo
                </Button>
              )}
              {!aiContent ? (
                <p className="text-center text-[11px] text-muted-foreground">
                  Wysyłka będzie możliwa po wygenerowaniu treści demo.
                </p>
              ) : (
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  Treści: AI{generatedWith ? ` · ${generatedWith}` : ""}
                </p>
              )}
            </section>
          </form>
        </Form>
      </div>

      {/* ==================== PRAWA KOLUMNA: PODGLĄD ==================== */}
      <div className="min-h-[520px] xl:sticky xl:top-4 xl:h-[calc(100vh-6rem)]">
        <DemoPreviewFrame
          mode={previewMode}
          onModeChange={setPreviewMode}
          addressLabel={addressLabel}
        >
          <DemoSite
            data={{
              companyName: previewBrief.companyName,
              mainService: previewBrief.mainService,
              city: previewBrief.city,
              siteType: previewBrief.siteType,
              packageId: previewBrief.packageId,
              brandColor: previewBrief.brandColor || null,
              logoUrl: previewBrief.logoUrl || null,
            }}
            content={previewContent}
            nav={{ page: effectivePage, onNavigate: multiPage ? setPreviewPage : undefined }}
          />
        </DemoPreviewFrame>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Typ: {getSiteType(previewBrief.siteType).label} · Pakiet:{" "}
          {DEMO_PACKAGES.find((p) => p.id === previewBrief.packageId)?.name}
          {multiPage
            ? " · nawigacja Home / Oferta / Kontakt działa jak na stronie klienta"
            : " · one-page z kotwicami"}
        </p>
      </div>
    </div>
  );
}
