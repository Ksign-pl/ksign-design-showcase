# E-book „Rabat zjada zysk.” – Black Friday bez utraty marży

Drugi e-book serii KSIGN, temat #098 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla sklepów, które przygotowują Black Friday w kilku kanałach: sklep internetowy, marketplace, salon. Format jak
e-book #01 (`../chatgpt-ads/`): 4:5, ok. 40 stron z plakatami rozdziałów.

## Status – v0.1, stan na 25.09.2026

| Co                                                     | Gdzie                                      |
| ------------------------------------------------------ | ------------------------------------------ |
| Karta e-booka, plan 40 stron, oferta, badanie, decyzje | `manuskrypt/plan.md`                       |
| Tekst stron 1–19: wstęp i rozdziały 01–03, źródła      | `manuskrypt/rozdzialy-01-03.md`            |
| Kalkulator: wzory i tabele z liczbami do e-booka       | `kalkulator.mjs`                           |
| Rozdziały 04–08, ściąga, oferta, słowniczek            | do napisania (plan w `manuskrypt/plan.md`) |
| Skład HTML, sceny 3D, PDF i PNG                        | po decyzji o kolorze serii                 |

## Kalkulator

Wszystkie liczby w tabelach e-booka liczy `kalkulator.mjs`. Tabele w manuskrypcie stoją między znacznikami
`<!-- tabela:nazwa -->` i `<!-- /tabela:nazwa -->` – nie poprawiaj ich ręcznie.

```bash
node ebook/rabat-zjada-zysk/kalkulator.mjs                        # wypisuje tabele
node ebook/rabat-zjada-zysk/kalkulator.mjs --wstaw ebook/rabat-zjada-zysk/manuskrypt/rozdzialy-01-03.md
prettier --write ebook/rabat-zjada-zysk/manuskrypt/rozdzialy-01-03.md
```

Wzory:

- potrzebny wzrost sprzedaży = rabat ÷ (marża − rabat),
- maksymalny rabat = marża × spodziewany wzrost ÷ (1 + spodziewany wzrost),
- obniżka do pokazania = 1 − cena promocyjna ÷ najniższa cena z 30 dni przed obniżką.

Marża to zysk ze sztuki po kosztach zmiennych, podzielony przez cenę netto (bez VAT).

## Zasady

- **Przepisy tylko ze źródeł pierwotnych:** tekst ustawy (API Sejmu) i wyjaśnienia Prezesa UOKiK. Każdy fakt ma w
  manuskrypcie źródło z datą dostępu.
- **Decyzje UOKiK zawsze z zastrzeżeniem,** że są nieprawomocne, dopóki sąd ich nie utrzyma.
- **Bez form rodzajowych w czasie przeszłym** („sprzedaż wyglądała”, nie „sprzedałeś”). Zwroty do czytelnika jak
  w e-booku #01: „Ty”, „Twój” wielką literą.
- **Przykłady to założenia, nie benchmarki.** Każdy przykład z liczbami jest tak podpisany.
