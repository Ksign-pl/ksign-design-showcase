# E-book „Allegro to nie twój sklep.” – własny kanał sprzedaży bez rezygnacji z Allegro

Szósty e-book serii KSIGN, temat #081 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla sprzedawców, dla których Allegro to ponad połowa sprzedaży. Premiera w marcu 2027. 40 stron w formacie 4:5
(1080 × 1350 px), w tym 8 plakatów otwierających rozdziały – jak poprzednie e-booki.

## Status – v0.1, tekst 25.09.2026

| Co                            | Gdzie                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| Karta e-booka, plan, oferta   | `manuskrypt/plan.md`                                                    |
| Tekst stron 1–16 ze źródłami  | `manuskrypt/rozdzialy-01-03.md`                                         |
| Tekst stron 17–40 ze źródłami | `manuskrypt/rozdzialy-04-08.md`                                         |
| Kalkulator (liczby i tabele)  | `kalkulator.mjs` – marża kanał po kanale, próg kosztu pozyskania        |
| Skład, sceny 3D, PDF i PNG    | jeszcze nie – po decyzjach z `plan.md` (badanie, oferta, data premiery) |

Zasady i opłaty Allegro pochodzą z Regulaminu Allegro obowiązującego od 5.05.2026 (m.in. art. 8.4, 13.3–13.4, 14.1,
załączniki nr 2, 4, 12 i 21), z PDF-u ze stawkami prowizji obowiązującymi od 2.03.2026 i ze stron pomocy Allegro dla
sprzedających (stan na 25.09.2026). Allegro zmienia cennik zwykle raz w roku (3.03.2025, 2.03.2026), dlatego wszystkie
stawki są w jednym miejscu – w `kalkulator.mjs` (`ALLEGRO`, `SKLEP`) – i trzeba je sprawdzić przed premierą. Płatności
w sklepie: tabela prowizji Przelewy24. Przepisy: GPSR (rozporządzenie 2023/988) i Prawo komunikacji elektronicznej.
Tabela źródeł z datami dostępu jest na końcu każdego pliku z tekstem.

## Kalkulator

```bash
cd ebook/allegro-nie-twoj-sklep
node kalkulator.mjs                                   # wszystkie tabele w Markdown + podsumowanie
for f in manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write manuskrypt/                          # wyrównuje wstawione tabele
```

| Blok       | Strona | Co liczy                                                                       |
| ---------- | ------ | ------------------------------------------------------------------------------ |
| `allegro`  | 9      | Zysk z zamówienia 123 zł na Allegro: prowizja 11%, opłata Smart!               |
| `sklep`    | 10     | To samo zamówienie we własnym sklepie: płatność Przelewy24, własna wysyłka     |
| `kanaly`   | 11     | Zysk z zamówienia z 5 źródeł: Allegro, Wyróżnienie, reklama, newsletter, marka |
| `smart`    | 12     | Opłaty sprzedawcy za przesyłki Smart! według wartości zamówienia               |
| `prog`     | 14     | Próg kosztu pozyskania dla koszyka 49,90–492 zł i 1–5 zakupów w roku           |
| `klient`   | 15     | Zysk z klienta, który kupuje 3 razy w roku, w każdym kanale                    |
| `podwyzka` | 16     | Skutki zmian cennika przy 1000 zamówień miesięcznie                            |

Wszystkie liczby w przykładach to założenia, nie benchmark – tak są podpisane w tekście.
