# E-book „ROAS kłamie.” – ile naprawdę zarabia Twoja reklama

Piąty e-book serii KSIGN, temat #061 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla sklepów, które wydają na reklamy kilkanaście tysięcy złotych miesięcznie i więcej. Premiera w lutym 2027. 40 stron
w formacie 4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–19 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 20–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – próg ROAS, MER, zysk po reklamie, test geograficzny  |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (ankieta, oferta, data premiery) |

Zasady atrybucji pochodzą z oficjalnej pomocy Google Ads, Google Analytics (GA4) i Meta (stan na 25.09.2026). Tabela
źródeł z datami dostępu jest na końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/roas-klamie
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok      | Strona | Co liczy                                                                           |
| --------- | ------ | ---------------------------------------------------------------------------------- |
| `miesiac` | 6      | Miesiąc sklepu: ROAS w panelach, suma przypisanej sprzedaży, MER, zysk po reklamie |
| `prog`    | 10     | Próg ROAS dla marży 20–60%: wartość bez VAT i z VAT, ROAS dla 10% zysku            |
| `test`    | 26     | Test geograficzny: sprzedaż dzięki reklamie i ROAS przyrostowy                     |

Wszystkie liczby w przykładach to założenia, nie benchmark – tak są podpisane w tekście. Próg ROAS dla marży 40%
z VAT (3,08) zgadza się z e-bookiem „Rabat zjada zysk.”.
