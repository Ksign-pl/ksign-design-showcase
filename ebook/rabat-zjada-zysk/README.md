# E-book „Rabat zjada zysk.” – Black Friday bez utraty marży

Drugi e-book serii KSIGN, temat #098 z raportu „100 tematów na e-booki o marketingu e-commerce” (`../plan-serii/`).
Dla sklepów, które przygotowują Black Friday w kilku kanałach: sklep internetowy, marketplace, salon. 40 stron
w formacie 4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały. Składany w HTML, eksportowany do PDF
i do PNG każdej strony (LinkedIn, karuzele na Instagramie).

## Status – v1.0, skład 25.09.2026

| Co                           | Gdzie                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| PDF do pobrania (2,8 MB)     | `export/ebook/ebook.pdf`                                           |
| 40 stron jako PNG            | `export/ebook/01-okladka.png` … `40-slowniczek-zrodla.png`         |
| Mockup okładki na landing    | `export/ebook/mockup-okladka.png` (1080 × 1080, przezroczyste tło) |
| Tekst finalny 1:1 ze składem | `manuskrypt/tekst-v1.0.md` (generowany)                            |
| Karta e-booka, plan, oferta  | `manuskrypt/plan.md`                                               |
| Manuskrypt z notatkami       | `manuskrypt/rozdzialy-01-03.md`, `manuskrypt/rozdzialy-04-08.md`   |
| Kalkulator (liczby i tabele) | `kalkulator.mjs`                                                   |

Stopka na okładce i stronach: tylko `ksign.pl` (bez wersji i daty). Data sprawdzenia faktów stoi w ramce
„Stan wiedzy” na str. 2.

Klimat (według inspiracji Karola z 25.09): styl v2 serii – jasne tło, dużo powietrza, grotesk Inter Tight,
jedna scena 3D na plakat – z akcentem **turkus `#2EC4B6`**. Sceny łączą marmur, szkło i świecące turkusowe
pęknięcia (kintsugi) z codziennymi przedmiotami e-commerce: metką, kartonem, klawiszem, kalendarzem.

## Struktura

```
ebook/rabat-zjada-zysk/
├── 3d/              sceny three.js (okładka + 8 rozdziałów), wspólne studio, render do PNG
├── assets/3d/       wyrenderowane sceny 2160 × 2700 (JPG) używane w e-booku
├── manuskrypt/      plan.md, rozdzialy-*.md (teksty robocze ze źródłami), tekst-v1.0.md (tekst ze składu)
├── src/
│   ├── strony/      strony w HTML, po 1 pliku na rozdział (źródło prawdy dla treści)
│   ├── szablon.html szkielet dokumentu
│   ├── styl.css     system stylów v2 w turkusie
│   ├── numeracja.js numery stron i odsyłacze „str. N” liczone automatycznie
│   ├── typografia.js polska typografia (twarde spacje, bez sierotek)
│   ├── mockup.html  wachlarz 3 stron do mockupu okładki
│   └── ebook.html   złożony e-book (generowany przez zloz.mjs – nie edytuj ręcznie)
├── fonts/           Inter Tight 500–900 – lokalnie, z licencją OFL
├── export/ebook/    gotowe PNG, PDF i mockup
├── kalkulator.mjs   wzory i tabele z liczbami (Markdown do manuskryptu, HTML do składu)
├── zloz.mjs         src/strony/*.html → src/ebook.html
├── render.mjs       HTML → PNG każdej strony + PDF
├── tekst.mjs        src/ebook.html → manuskrypt/tekst-v1.0.md
└── pdf_kompresja.py metadane PDF (i kompresja dużych obrazów, jeśli się pojawią)
```

## Jak zbudować

```bash
npm install                                          # raz – Playwright z devDependencies
cd ebook/rabat-zjada-zysk
for f in src/strony/*.html manuskrypt/rozdzialy-0*.md; do node kalkulator.mjs --wstaw "$f"; done
prettier --write src/strony/ manuskrypt/             # wyrównuje wstawione tabele
node zloz.mjs                                        # składa strony w src/ebook.html
node render.mjs                                      # → export/ebook: 40 × PNG + ebook.pdf
python pdf_kompresja.py export/ebook/ebook.pdf       # metadane; wymaga: pip install pymupdf pillow
node render.mjs src/mockup.html export/ebook         # → export/ebook/mockup-okladka.png
node tekst.mjs                                       # → manuskrypt/tekst-v1.0.md
```

Render nie korzysta z sieci: fonty i grafiki są w repo, a skrypt blokuje zapytania zewnętrzne. Przerywa pracę, jeśli
font się nie załaduje, skrypt na stronie zgłosi błąd albo zostanie pusty numer strony lub odsyłacz.

## Kalkulator

Wszystkie liczby w tabelach e-booka liczy `kalkulator.mjs`. Tabele stoją między znacznikami
`<!-- tabela:nazwa -->` i `<!-- /tabela:nazwa -->` – w manuskrypcie (Markdown) i w składzie (HTML). Nie poprawiaj
ich ręcznie: zmień założenia w skrypcie i wstaw tabele ponownie (polecenia wyżej).

| Blok                 | Strona | Co liczy                                                       |
| -------------------- | ------ | -------------------------------------------------------------- |
| `fotel`              | 6      | zamówienie fotela: cena, koszty, zysk przed i po reklamie      |
| `prog`               | 10     | potrzebny wzrost sprzedaży dla marży × rabatu                  |
| `kartka`             | 11     | kalkulator na kartce A–J z przykładem                          |
| `maks-rabat`         | 12     | największy rabat dla marży × spodziewanego wzrostu             |
| `os-czasu`           | 16     | Black Week → Black Friday: obniżka od najniższej ceny z 30 dni |
| `prezent`            | 26     | rabat 20% kontra prezent do fotela                             |
| `trzy-w-cenie-dwoch` | 26     | „3 w cenie 2” na poduszce                                      |
| `roas`               | 30     | próg ROAS w cenie regularnej i po rabacie                      |

Wzory:

- potrzebny wzrost sprzedaży = rabat ÷ (marża − rabat),
- maksymalny rabat = marża × spodziewany wzrost ÷ (1 + spodziewany wzrost),
- obniżka do pokazania = 1 − cena promocyjna ÷ najniższa cena z 30 dni przed obniżką,
- próg ROAS = cena brutto ÷ zysk ze sztuki przed reklamą (gdy wartość konwersji to cena brutto).

Marża to zysk ze sztuki po kosztach zmiennych, podzielony przez cenę netto (bez VAT).

### Sceny 3D (tylko przy zmianie grafik)

```bash
cd ebook/rabat-zjada-zysk/3d
npm install                                                              # three.js
SZYBKO=1 NODE_PATH=$(npm root -g) node render3d.cjs 00-okladka podglad.png 1080 1350 0.5   # podgląd, kilka sekund
NODE_PATH=$(npm root -g) node render3d.cjs 00-okladka ../assets/3d/okladka.png 1080 1350 2  # 2160 × 2700
```

Sceny renderuje Chromium bez karty graficznej (SwiftShader), ok. 30–50 s na scenę w 2160 × 2700. PNG zamień na JPG
(jakość 90) i zapisz jako `assets/3d/okladka.jpg` albo `assets/3d/rozdzial-NN.jpg`. Wspólne materiały i kształty są
w `3d/studio.js`: marmur (tekstura z szumu), szkło, turkus, metka z otworem i ugryzieniem, pęknięcia kintsugi
z wybiórczą poświatą (świeci tylko to, co oznaczone `swieci()`).

| Strona      | Scena (plik w `3d/`) | Metafora                                                                  |
| ----------- | -------------------- | ------------------------------------------------------------------------- |
| Okładka     | `00-okladka.js`      | marmurowa metka „−20%” z odgryzionym rogiem, turkusowe pęknięcia, okruchy |
| Rozdział 01 | `01-sprzedaz.js`     | kartony rosną schodami, stosy monet maleją; ostatnia moneta turkusowa     |
| Rozdział 02 | `02-klawisz.js`      | biała klawiatura, szklany turkusowy klawisz ze świecącym %                |
| Rozdział 03 | `03-kalendarz.js`    | bloczek kalendarza „30 dni” z turkusową metką                             |
| Rozdział 04 | `04-kanaly.js`       | 3 identyczne metki: torba, karton, półka – jedna nitka                    |
| Rozdział 05 | `05-prezent.js`      | pudełko z turkusową kokardą, obok przewrócony marmurowy %                 |
| Rozdział 06 | `06-klepsydra.js`    | szklana klepsydra, w której przesypują się metki                          |
| Rozdział 07 | `07-pulapka.js`      | pułapka na myszy z turkusową metką % zamiast sera                         |
| Rozdział 08 | `08-lupa.js`         | lupa nad rzędami metek, pod szkłem jedna turkusowa                        |

## Zasady składu

- **Numeracja:** nie wpisuj numerów stron ręcznie. Nagłówek ma pusty `<span class="pnum"></span>`, a odsyłacz
  to `str. <span data-str="nazwa-strony"></span>` (nazwa = `data-name` strony docelowej).
- **Turkus:** `--akcent` (`#2EC4B6`) jako tło wyróżnień (czarny tekst, kontrast 8,7:1) i jako tekst wyłącznie na
  czarnym tle. Tekst w turkusie na jasnym tle tylko w `--akcent-ciemny` (`#0F766E`).
- **Strony z zapasem:** klasa `wieksze` powiększa listy, tabele i opisy (czytelność na telefonie), `przestrzen`
  daje większą skalę i dopina ostatni blok (`kotwica`) do dołu.
- **Twarde spacje i sierotki:** `src/typografia.js` wiąże jednoliterowe słowa, liczby z jednostkami i z następnym
  słowem, nazwy akcji („Black Friday”) oraz dwa ostatnie słowa każdego akapitu i punktu listy.
- **Kontrola przed eksportem:** każda strona treści musi się zmieścić nad ramką „Do zrobienia dziś” i stopką.
- **Przepisy tylko ze źródeł pierwotnych** (tekst ustawy z API Sejmu, wyjaśnienia Prezesa UOKiK), każdy fakt ma
  w manuskrypcie źródło z datą dostępu. **Decyzje UOKiK zawsze z zastrzeżeniem,** że są nieprawomocne.
- **Bez form rodzajowych w czasie przeszłym;** zwroty do czytelnika „Ty”, „Twój” wielką literą.
- **Przykłady to założenia, nie benchmarki.** Każdy przykład z liczbami jest tak podpisany.

## Grafika i licencje

- Sceny 3D: modele i render KSIGN w three.js (licencja MIT biblioteki). Font w napisach 3D („−20%”, „30 DNI”, „%”):
  Helvetiker z przykładów three.js.
- Font: Inter Tight, SIL Open Font License 1.1 – tekst licencji w `fonts/OFL-intertight.txt`.

## Do zrobienia przed publikacją

- **Badanie cen (str. 37) – decyzja do 1.10.2026.** Czy uruchamiamy codzienny odczyt cen ze 100 sklepów i gdzie
  (GitHub Actions albo serwer KSIGN). Na str. 37 stoi ramka „[Do uzupełnienia przed premierą]” na pierwsze wyniki.
  Bez badania: zastąpić stronę albo połączyć str. 36–37 (propozycje w `manuskrypt/plan.md`).
- **Oferta (str. 39):** potwierdzić nazwy trzech kroków i ceny. Teraz: „Przegląd cen Black Friday · 0 zł”, przy
  kampaniach i newsletterze „Wycena po przeglądzie cen”.
- **Data premiery** (propozycja w planie: 8.10.2026) – przed nią ponownie sprawdzić fakty i zmienić datę w ramce
  „Stan wiedzy” na str. 2.
- **Allegro:** warunki i daty Black Weeks 2026 w Pomocy Allegro (str. 22 i 29 opisują zasady z 2025 r.).
- **UOKiK:** nowsza wersja wyjaśnień o obniżkach i stan 6 postępowań z komunikatu z 12.01.2026 (str. 19).
- **Gemius:** jeśli wyjdzie raport „E-commerce w Polsce 2026” – podmienić dane na str. 25 i 27.
- **Do rozważenia:** kalkulator z rozdziału 02 jako arkusz Google Sheets (logika jest w `kalkulator.mjs`).
