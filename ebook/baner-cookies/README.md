# E-book „Baner cookies, który nie zabija danych.” – zgody i Consent Mode v2 w praktyce

Dziesiąty e-book serii KSIGN, temat #062 z raportu „100 tematów na e-booki o marketingu e-commerce”
(`../plan-serii/`). Dla sklepów z Google Ads, GA4 i reklamami w Meta. Premiera w lipcu 2027 – spokojniejszy sezon na
porządek w danych przed Q4. 40 stron w formacie 4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak
poprzednie e-booki.

## Status – v0.1, tekst 26.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–18 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 19–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – widoczne dane, progi modelowania, test banera        |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Przepisy: Prawo komunikacji elektronicznej (art. 399, 400, 444, 446), RODO (art. 4 pkt 11, 7, 83, motyw 32), wyrok
TSUE Planet49 (C-673/17), wytyczne EROD 05/2020 i raport grupy zadaniowej EROD o banerach (17.01.2023). Technika:
dokumentacja trybu uzyskiwania zgody Google (tryby, parametry, wdrożenie, Tag Assistant), pomoc Google Ads i Google
Analytics (modelowanie, progi, wymogi dla EOG), dokumentacja piksela Meta. Tabela źródeł z datami dostępu jest na
końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/baner-cookies
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok         | Strona | Co liczy                                                                  |
| ------------ | ------ | ------------------------------------------------------------------------- |
| `widocznosc` | 10     | Widoczne sesje i konwersje przy 40–80% zgód (przewaga 2–5× według Google) |
| `progi_ga4`  | 16     | Czy sklep ma 1000 użytkowników ze zgodą dziennie (modelowanie w GA4)      |
| `progi_ads`  | 16     | Budżet na 700 kliknięć w 7 dni (modelowanie w Google Ads)                 |
| `test`       | 28     | Odwiedzający na wersję banera, żeby wykryć wzrost odsetka zgód            |

Odsetki zgód, liczba użytkowników i koszt kliknięcia są umowne – pokazują metodę, nie wyniki rynku. Tak są
podpisane w tekście.
