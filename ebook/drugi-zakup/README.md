# E-book „Drugi zakup jest najtańszy.” – e-mail, SMS i 5 automatów po pierwszym zamówieniu

Trzeci e-book serii KSIGN, temat #021 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla sklepów ze stałą sprzedażą, w których większość klientów kupuje tylko raz. 40 stron w formacie 4:5
(1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak e-booki #01 i #098.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–23 ze źródłami  | `manuskrypt/rozdzialy-01-04.md`                                         |
| Tekst stron 24–40 ze źródłami | `manuskrypt/rozdzialy-05-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – próg powrotów, cykl zakupowy, SMS, grupa kontrolna   |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Fakty sprawdzone 25.09.2026 w źródłach pierwotnych: Prawo komunikacji elektronicznej, ustawa o świadczeniu usług
drogą elektroniczną, ustawa o prawach konsumenta, ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym (teksty
z API Sejmu), raport Gemius „E-commerce w Polsce 2025”, raport Omnisend 2026, cennik i regulamin SMSAPI. Tabela
źródeł z datami dostępu jest na końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/drugi-zakup
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

`--wstaw` podmienia bloki `<!-- tabela:nazwa -->` … `<!-- /tabela:nazwa -->`. Plik `.md` dostaje tabelę
w Markdown, plik `.html` – `<table class="tbl">` do składu (jak w e-booku #098).

| Blok             | Strona | Co liczy                                                          |
| ---------------- | ------ | ----------------------------------------------------------------- |
| `zamowienia`     | 5      | Wynik pierwszego i drugiego zamówienia (123 zł, reklama 55 zł)    |
| `scenariusze`    | 6      | Wynik na 100 nowych klientach przy 10–50 powrotach                |
| `cykl`           | 21     | Kwartyle i mediana dni do drugiego zakupu, terminy przypomnień    |
| `sms`            | 23     | Limity znaków i koszt 1000 wysyłek w SMSAPI                       |
| `rabat-na-drugi` | 26     | Jak rabat na drugie zamówienie podnosi próg powrotów              |
| `sms-przyklady`  | 30     | Znaki i części gotowych SMS-ów (liczone według regulaminu SMSAPI) |
| `proba`          | 31     | Ilu klientów potrzeba w grupie kontrolnej (α = 5%, moc 80%)       |

Wszystkie liczby w przykładach to założenia, nie benchmark – tak są podpisane w tekście.
