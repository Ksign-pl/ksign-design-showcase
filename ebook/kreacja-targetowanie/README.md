# E-book „Kreacja to nowe targetowanie.” – reklamy Meta, które algorytm dowozi do klientów

Dziewiąty e-book serii KSIGN, temat #041 z raportu „100 tematów na e-booki o marketingu e-commerce”
(`../plan-serii/`). Dla sklepów, które wydają na reklamy w Meta kilka tysięcy złotych miesięcznie. Premiera
w czerwcu 2027 – przy planowaniu kreacji na drugą połowę roku i Q4. 40 stron w formacie 4:5 (1080 × 1350 px), w tym
8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–19 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 20–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – faza uczenia się, wielkość testów, wyniki kreacji    |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Zasady pochodzą z polskiej wersji Centrum pomocy dla firm Meta (faza uczenia się, liczba reklam, test materiału
reklamowego, test A/B, zmęczenie, format elastyczny, bezpieczna strefa, reklamy partnerskie, etykieta „Informacje
o SI”), z bloga Engineering at Meta (Andromeda, GEM) i ze Standardów reklamowych Meta (cechy osobowe). Przepisy:
prawo autorskie (wizerunek, licencja), ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym, DSA (repozytorium
reklam), akt w sprawie sztucznej inteligencji (deepfake), rekomendacje UOKiK o oznaczaniu reklam. Tabela źródeł
z datami dostępu jest na końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/kreacja-targetowanie
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok      | Strona | Co liczy                                                                   |
| --------- | ------ | -------------------------------------------------------------------------- |
| `nauka`   | 9      | Zakupy w tygodniu przy budżecie 3–10 tys. zł i koszcie zakupu 30–90 zł     |
| `sygnaly` | 26     | Wyświetlenia na wersję, żeby porównać 3-sekundowe odtworzenia, i ich koszt |
| `zakupy`  | 27     | Kliknięcia na wersję, żeby porównać zakupy, i ich koszt                    |
| `wyniki`  | 30     | 4 kreacje: hak, CTR, koszt zakupu i decyzja wobec progu 40 zł              |

Przykład jak w całej serii: zamówienie 123 zł z VAT, marża 40%, zakup może kosztować najwyżej 40 zł. CPM 25 zł,
koszt kliknięcia 1,50 zł i wyniki 4 kreacji są umowne – pokazują metodę, nie wyniki rynku. Tak są podpisane
w tekście.
