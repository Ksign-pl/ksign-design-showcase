# Ksign Demo Generator

Wewnętrzna aplikacja dla doradców KSIGN: podczas maks. 15-minutowej rozmowy doradca
wypełnia brief, system natychmiast pokazuje klikalny prototyp strony w brandingu
klienta, a po rozmowie wysyła klientowi tymczasowy link do demo (72 h) oraz
indywidualny link płatności Stripe za wybrany pakiet.

Zbudowane na istniejącym stosie repo: **TanStack Start (Vite) + React 19 +
TypeScript + Tailwind CSS 4 + shadcn/ui + Supabase** — bez zmian w stronie
marketingowej.

## Mapa funkcji

| Ścieżka                         | Co robi                                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/doradca`                      | Panel doradcy: lista dem (RLS: swoje; admin — wszystkie) + status konfiguracji integracji                                              |
| `/doradca/nowe`                 | Licznik 15:00, brief, „Generuj treści demo" (Anthropic), live preview desktop/mobile, „Utwórz i wyślij demo"                           |
| `/doradca/demo/:id`             | Edycja briefu/brandingu, ponowne generowanie, wysyłka, historia zdarzeń                                                                |
| `/d/:slug`                      | Publiczne demo (Start/E-commerce: one-page z kotwicami; Business/Premium: osobne route'y `/oferta`, `/kontakt`)                        |
| `/d/:slug/aktywuj`              | Ekran aktywacji — tworzy sesję Stripe Checkout na żądanie (link z maila nigdy nie wygasa)                                              |
| `POST /api/public/demos/expire` | Okresowe wygaszanie (sekret `CRON_SECRET`); reguły 72 h/30 dni są też egzekwowane przy każdym wejściu, więc działa poprawnie bez crona |

Cykl życia dema: `draft → sent → paid` / `expired` (po 72 h), a po 30 dniach link
przestaje prezentować dane klienta. Zdarzenia (`generated`, `sent`, `visited`,
`paid`, `expired` + błędy integracji) trafiają do `demo_events`.

## Konfiguracja krok po kroku

### 1. Supabase (wymagane)

1. Zastosuj migrację `supabase/migrations/20260721160000_demo_generator.sql`
   (Lovable Cloud robi to automatycznie przy deployu; ręcznie: SQL Editor →
   wklej plik → Run). Tworzy: enum `demo_status`, tabele `demos` i `demo_events`
   z politykami RLS (doradca widzi swoje dema, `admin` z `user_roles` — wszystkie)
   oraz publiczny bucket `demo-logos` (upload tylko do własnego folderu).
2. Zmienne: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   (+ warianty `VITE_*`) — w tym repo już skonfigurowane.
3. Konta doradców: rejestracja/logowanie na `/login` (istniejący auth).
   Rola admin: `insert into user_roles (user_id, role) values ('<uuid>', 'admin');`

### 2. Anthropic (generator treści)

- `ANTHROPIC_API_KEY` — klucz z console.anthropic.com.
- `ANTHROPIC_MODEL` — ID modelu (domyślnie `claude-opus-4-8`).
- Endpoint jest chroniony loginem doradcy + walidacją Zod; wywoływany wyłącznie
  przyciskiem „Generuj treści demo" (nigdy przy wpisywaniu). Zwraca ściśle
  walidowany JSON (`heroTitle`, `heroSubtitle`, `cta`, `aboutText`, `services[3]`,
  `trustPoints[3]`, `offerIntro`, `contactHeading`).

### 3. Resend (e-mail do klienta)

- `RESEND_API_KEY` + `RESEND_FROM_EMAIL` (np. `KSIGN <demo@ksign.pl>`).
- Produkcyjnie zweryfikuj domenę nadawczą w panelu Resend (DNS: SPF + DKIM).
- E-mail zawiera: nazwę firmy, link do demo, pakiet z ceną, indywidualny link
  aktywacji (Stripe) i informację o dostępności przez 72 h.

### 4. Stripe Checkout (aktywacja pakietu)

1. Utwórz 4 produkty/ceny i ustaw: `STRIPE_PRICE_ID_START` (999 zł),
   `STRIPE_PRICE_ID_BUSINESS` (2 499 zł), `STRIPE_PRICE_ID_PREMIUM` (4 999 zł),
   `STRIPE_PRICE_ID_ECOMMERCE` (6 000 zł). Akceptowane jest pełne `price_...`
   albo lookup key.
2. Klucz API: `STRIPE_SECRET_KEY` **lub** dotychczasowa integracja Lovable
   (`STRIPE_SANDBOX_API_KEY`/`STRIPE_LIVE_API_KEY` + `LOVABLE_API_KEY`).
3. Webhook: endpoint `POST /api/public/payments/webhook?env=sandbox|live`
   (współdzielony z istniejącym sklepem) — zdarzenie `checkout.session.completed`
   z `metadata.demo_id` przestawia demo na `paid`. Sekrety:
   `PAYMENTS_SANDBOX_WEBHOOK_SECRET` / `PAYMENTS_LIVE_WEBHOOK_SECRET`.

### 5. Google Sheets (leady)

1. Google Cloud → utwórz Service Account → wygeneruj klucz JSON.
2. Udostępnij arkusz adresowi `client_email` konta serwisowego (uprawnienie „Edytujący").
3. Zmienne: `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`
   (PKCS8, `\n` jako `\n`), `GOOGLE_SHEETS_SPREADSHEET_ID`, opcjonalnie
   `GOOGLE_SHEETS_RANGE` (domyślnie `Leady!A:I`).
4. Kolumny wiersza: data, firma, e-mail, pakiet, cena, miasto, typ strony, link, doradca.
   Błąd arkusza jest logowany w `demo_events` i **nie blokuje** wysyłki dema.

### 6. Hosting (Vercel / obecny deployment)

Repo deployuje się przez istniejący pipeline (Lovable → Cloudflare Workers).
Na Vercel: import repo → build `bun run build` → ustaw wszystkie zmienne z
`.env.example`. Dodatkowo:

- `PUBLIC_DEMO_BASE_URL` — np. `https://demo.ksing.pl` po skonfigurowaniu
  subdomeny (rekord CNAME na hosting + domena w projekcie). Bez tej zmiennej
  linki demo używają bieżącej domeny (`https://ksign.pl/d/...`).
- Cron wygaszania (opcjonalny, statusy i tak są egzekwowane przy wejściu):
  `vercel.json` → `{"crons":[{"path":"/api/public/demos/expire?secret=...","schedule":"0 * * * *"}]}`
  albo dowolny scheduler wywołujący
  `curl -X POST -H "x-cron-secret: $CRON_SECRET" https://<domena>/api/public/demos/expire`.

## Uczciwość integracji

Bez skonfigurowanego klucza aplikacja **nie udaje** działania: doradca widzi
komunikat z nazwą brakującej zmiennej (panel `/doradca` + alerty w budowniczym),
demo zapisuje się jako `draft` z linkiem do ręcznego przekazania, a publiczny
ekran płatności pokazuje neutralną informację o niedostępności płatności online.
Formularz kontaktowy w demo po wysłaniu pokazuje komunikat:
„To jest demonstracja — formularz zostanie uruchomiony po realizacji projektu."

## Rozwój lokalny

```bash
bun install
bun run dev        # http://localhost:8080 (marketing + /doradca + /d/:slug)
bun run lint
bun run build
bun run test:e2e   # Playwright (build + preview)
```
