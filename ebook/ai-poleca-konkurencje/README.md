# E-book „AI poleca konkurencję.” – jak trafić do odpowiedzi ChatGPT, Gemini i Google AI

Siódmy e-book serii KSIGN, temat #001 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla sklepów z ruchem z Google i szeroką ofertą (Shoper, IdoSell, WooCommerce). Premiera w kwietniu 2027 –
kontynuacja e-booka #01 „Nie ma cię w rozmowie” (tam reklamy w ChatGPT, tu bezpłatne polecenia AI). 40 stron
w formacie 4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–17 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 18–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – wynik widoczności z testu pytań, kanały w GA4        |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Zasady pochodzą z oficjalnej dokumentacji: Google Search Central (funkcje AI, dane produktów, spam, boty), pomoc
Google Analytics (kanał „Asystent AI” od 13.05.2026) i Merchant Center, OpenAI (boty, specyfikacja feedu, zakupy
w ChatGPT), Bing Webmaster Tools (AI Performance), Perplexity i Cloudflare. Dane o użyciu AI: Gemius „E-commerce
w Polsce 2025”. Asystenci AI zmieniają się szybko – listę rzeczy do sprawdzenia przed premierą ma `plan.md`.
Tabela źródeł z datami dostępu jest na końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/ai-poleca-konkurencje
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok     | Strona | Co liczy                                                         |
| -------- | ------ | ---------------------------------------------------------------- |
| `arkusz` | 11     | Przykład wypełnionego arkusza testu: 10 pytań × 4 asystenty      |
| `wynik`  | 12     | Wynik widoczności dla każdego asystenta i razem (punkty P, W, Z) |
| `kanaly` | 28     | Kanały w GA4: udział w sesjach, konwersja i przychód na sesję    |

Dane w przykładach są umowne – pokazują metodę, nie wyniki rynku. Tak są podpisane w tekście.
