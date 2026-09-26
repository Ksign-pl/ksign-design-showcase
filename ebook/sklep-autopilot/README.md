# E-book „Sklep na autopilocie.” – automatyzacje i AI, które oddają właścicielowi godziny

Jedenasty e-book serii KSIGN, temat #002 z raportu „100 tematów na e-booki o marketingu e-commerce”
(`../plan-serii/`). Dla małych sklepów, w których właściciel robi prawie wszystko sam. Premiera w sierpniu 2027 –
automatyzacje wdrożone latem odciążą właściciela przed szczytem Q4. 40 stron w formacie 4:5 (1080 × 1350 px), w tym
8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 26.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–19 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 20–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – mapa 10 zadań, wartość godzin, zwrot wdrożenia       |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Narzędzia: cenniki i dokumentacja Zapier, n8n i Make (Centrum pomocy – strona cennika Make blokuje automatyczne
pobieranie, ceny do ręcznego sprawdzenia), katalogi integracji, dokumentacja IdoSell API, umowy powierzenia (DPA)
Zapier, Make i n8n. Przepisy: akt w sprawie sztucznej inteligencji (art. 50, 113) ze zmianami z lipca 2026 r.
(rozporządzenie (UE) 2026/1744), ustawa o prawach konsumenta (art. 7a, 32), RODO (art. 5, 13, 22, 28), ustawa
o przeciwdziałaniu nieuczciwym praktykom rynkowym (art. 5, art. 7 pkt 26), harmonogram KSeF Ministerstwa Finansów.
Dane: Eurostat o AI w firmach (2025), Google Search Central o treściach z AI. Tabela źródeł z datami dostępu jest na
końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/sklep-autopilot
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok      | Strona | Co liczy                                                                            |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| `mapa`    | 6      | Godziny 10 zadań w miesiącu, możliwa oszczędność, tryb (automat albo AI + człowiek) |
| `wartosc` | 7      | Wartość 10–40 odzyskanych godzin przy stawce 50–120 zł, po koszcie narzędzi         |
| `zwrot`   | 8      | Po ilu miesiącach zwraca się 8–32 godzin wdrożenia                                  |

Czasy zadań, odsetki oszczędności, stawka godzinowa i koszt narzędzi (200 zł miesięcznie) są umowne – pokazują
metodę, nie wyniki rynku. Tak są podpisane w tekście. Właściciel wpisuje własne liczby z tygodnia pomiaru (str. 5).
