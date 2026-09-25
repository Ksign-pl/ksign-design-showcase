# E-book „Lista mailowa bez rabatu -10%.” – zapisy, które kupują w pełnej cenie

Ósmy e-book serii KSIGN, temat #023 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla marek D2C i sklepów lifestyle, które zbierają adresy za kod rabatowy. Premiera w maju 2027 – przed Dniem Matki.
40 stron w formacie 4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–17 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 18–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – koszt kodu, próg bez rabatu, zachęty, test A/B       |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Przepisy sprawdzone w tekstach jednolitych (API Sejmu) i w EUR-Lex: Prawo komunikacji elektronicznej (zgoda na
informację handlową), RODO (warunki zgody), ustawa o grach hazardowych (loteria promocyjna wymaga zezwolenia),
ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym i ustawa o świadczeniu usług drogą elektroniczną. Zasady dla
okien zapisu: Google Search Central. Wymagania dla nadawców: pomoc Gmaila. Tabela źródeł z datami dostępu jest na
końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/lista-bez-rabatu
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok      | Strona | Co liczy                                                                 |
| --------- | ------ | ------------------------------------------------------------------------ |
| `kod`     | 5      | Zamówienie 123 zł bez kodu i z kodem −10%: zysk, część zysku, +33%       |
| `prog`    | 7      | Ilu kupujących wystarczy bez rabatu (rabat 5–20%, marża 30–50%)          |
| `zachety` | 11     | Koszt kodu, darmowej dostawy, próbki i poradnika przy koszyku 123–369 zł |
| `wartosc` | 24     | Kartka A–G: zysk z pierwszych zamówień i zysk na zapis dla 2 zachęt      |
| `proba`   | 25     | Liczba zapisów na grupę w teście A/B (istotność 5%, moc 80%)             |

Przykład jak w całej serii: zamówienie 123 zł z VAT, marża 40%. Liczby zapisów i odsetki kupujących są umowne –
pokazują metodę, nie wyniki rynku. Tak są podpisane w tekście.
