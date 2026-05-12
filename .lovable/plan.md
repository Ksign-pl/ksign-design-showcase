## Cel

Przygotować spójny zestaw treści do wklejenia w dialog „Opublikowany" w Lovable oraz zaktualizować meta tagi w kodzie, żeby strona udostępniana w mediach społecznościowych prezentowała tę samą treść co dialog publikacji.

## Wartości do wpisania w dialog publikacji

- **Ikona i tytuł** (44/60): `KSIGN — Premium web design dla małych firm`
- **Opis** (138/160): `Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online.`
- **Wizerunek społeczny**: wgrać nowo wygenerowany plik `og-image.jpg` (1200×630) — zostanie zapisany w `public/og-image.jpg` i dodatkowo udostępniony do pobrania z `/mnt/documents/og-image.jpg`.

## Kroki implementacji

### 1. Wygenerować nowy obraz OG 1200×630

Plik: `public/og-image.jpg`

Brief dla generatora (premium, jpg, bez przezroczystości):
- Tło w kolorze `cream` (jasny beż) z subtelnym szumem/papierowym tekstem.
- Lewa strona: duże, czarne, mocno waflowe lettering „KSIGN" (blackface, geometryczny grotesk) + pod spodem cienka linia akcentu w kolorze `lime`.
- Prawa strona: nagłówek „Premium strona za **999 zł** netto" + podtytuł „Realizacja 3–7 dni" — typografia czysta, kontrastowa, ink/cream/lime, układ inspirowany editorial / Swiss design.
- Małe, dyskretne `ksign.pl` w prawym dolnym rogu.
- Bez stockowych zdjęć, bez efektów AI-glow; estetyka zgodna z paletą strony (cream / ink / lime).

Skopiować plik również do `/mnt/documents/og-image.jpg` i wystawić jako `<lov-artifact>` żeby user mógł pobrać i wgrać do dialogu.

### 2. Zaktualizować meta tagi w `src/routes/index.tsx`

W bloku `head().meta`:
- `{ title: "KSIGN — Premium web design dla małych firm" }` (zamiast obecnego „Premium strona za 999 zł netto")
- `description`, `og:title`, `og:description`, `twitter:title`, `twitter:description` — zmienione na nowy opis.
- `og:image` i `twitter:image` — przepiąć ze starego URL Google Storage (`a45b5b3c…`) na `https://ksign.pl/og-image.jpg`.
- Dodać `{ property: "og:image:width", content: "1200" }`, `{ property: "og:image:height", content: "630" }`, `{ property: "og:image:type", content: "image/jpeg" }`, `{ property: "og:image:alt", content: "KSIGN — premium web design, strona za 999 zł netto" }` (ułatwia parserom typu LinkedIn dobry crop).

### 3. Zaktualizować JSON-LD w `src/routes/index.tsx`

W bloku `ProfessionalService` zmienić `image` z URL Google Storage na `https://ksign.pl/og-image.jpg`, żeby Schema.org wskazywała na trwały zasób na własnej domenie.

### 4. Spójność z istniejącą domeną

W całym pliku trzymać kanonicznie `https://ksign.pl` (zgodnie z dodaną wcześniej regułą domeny i custom domain `ksign.pl` na projekcie). Pozostawić bez zmian `__root.tsx` (Organization/WebSite już używa właściwej domeny ksign-design-showcase, opcjonalnie ujednolicić — patrz „Otwarte pytanie" niżej).

## Co dostanie użytkownik na koniec

1. Plik `og-image.jpg` do pobrania (artifact) — wgrywa do pola „Wizerunek społeczny" w dialogu.
2. Gotowe do skopiowania:
   - Tytuł: `KSIGN — Premium web design dla małych firm`
   - Opis: `Nowoczesna strona one-page w 3–7 dni za 999 zł netto. KSIGN — premium web design dla firm, które chcą wyglądać profesjonalnie online.`
3. Spójne meta na stronie — po opublikowaniu Facebook/LinkedIn/Slack będą pokazywać ten sam tytuł, opis i obraz.

## Otwarte pytanie (do potwierdzenia po implementacji)

W `__root.tsx` Organization/WebSite JSON-LD nadal używa domeny `ksign-design-showcase.lovable.app` zamiast `ksign.pl`. Mogę zmienić to przy okazji — daj znać, czy to ujednolicić.
