# E-book „TikTok Shop od pierwszego dnia.” – katalog, filmy, LIVE i afiliacja z policzonymi kosztami

Czwarty e-book serii KSIGN, temat #051 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla marek D2C i sklepów z produktami dla klientów w wieku 18–34 lata. Premiera w styczniu 2027. 40 stron w formacie
4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–19 ze źródłami  | `manuskrypt/rozdzialy-01-04.md`                                         |
| Tekst stron 20–40 ze źródłami | `manuskrypt/rozdzialy-05-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – zysk z zamówienia, stawka dla twórcy, wysyłka        |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Stawki i zasady TikTok Shop pochodzą z oficjalnych stron Seller University dla Polski (stan na 25.09.2026). Zmieniają
się często, dlatego wszystkie są w jednym miejscu – w `kalkulator.mjs` (`STAWKI`, `WYSYLKA`) – i trzeba je sprawdzić
przed premierą. Przepisy: rekomendacje UOKiK o oznaczaniu reklam, ustawa o przeciwdziałaniu nieuczciwym praktykom
rynkowym, GPSR i DSA. Tabela źródeł z datami dostępu jest na końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/tiktok-shop
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok         | Strona | Co liczy                                                                  |
| ------------ | ------ | ------------------------------------------------------------------------- |
| `wysylka`    | 14     | Koszt wysyłki przez platformę (PL → PL): gdy klient płaci i przy darmowej |
| `zamowienie` | 15     | Zysk z zamówienia 123 zł: prowizja 2%, 9% i 9% + twórca 15%               |
| `afiliacja`  | 30     | Zysk z zamówienia przy prowizji twórcy 0–30%, także w okresie prowizji 2% |

Wszystkie liczby w przykładach to założenia, nie benchmark – tak są podpisane w tekście.
