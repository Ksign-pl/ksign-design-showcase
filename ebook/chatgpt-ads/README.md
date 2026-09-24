# E-book „Nie ma cię w rozmowie” – ChatGPT Ads dla polskich firm

Lead magnet KSIGN: 39 stron w formacie 4:5 (1080 × 1350 px), w tym 8 plakatów otwierających rozdziały. Składany
w HTML, eksportowany do PDF i do PNG każdej strony (LinkedIn, karuzele na Instagramie).

## Status – v1.0, styl v2 (skład 24.09.2026, „stan na 28.09.2026”)

| Co                           | Gdzie                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| PDF do pobrania (3,3 MB)     | `export/ebook/ebook.pdf`                                           |
| 39 stron jako PNG            | `export/ebook/01-okladka.png` … `39-slowniczek-zrodla.png`         |
| Mockup okładki na landing    | `export/ebook/mockup-okladka.png` (1080 × 1080, przezroczyste tło) |
| Tekst finalny 1:1 ze składem | `manuskrypt/tekst-v1.0.md` (generowany)                            |
| Badanie 100 sklepów          | `badanie/` – skrypty, surowe wyniki, podsumowanie                  |

Klimat v2 (według inspiracji Karola z 24.09): jedna scena 3D jako metafora na każdym plakacie, jasne tło, dużo
powietrza, grotesk Inter Tight w zdaniach, jeden akcent – pomarańcz KSIGN `#E8940C` (podświetlone słowo jak „Count.”).

## Struktura

```
ebook/chatgpt-ads/
├── 3d/              sceny three.js (okładka + 8 rozdziałów), wspólne studio, render do PNG
├── assets/3d/       wyrenderowane sceny 2160 × 2700 (JPG) używane w e-booku
├── manuskrypt/      rozdzialy-*.md – teksty robocze z notatkami i źródłami; tekst-v1.0.md – tekst ze składu
├── research/        weryfikacja materiałów i źródeł
├── badanie/         badanie 100 polskich sklepów (robots.txt, boty OpenAI, pixele)
├── src/
│   ├── strony/      strony w HTML, po 1 pliku na rozdział (źródło prawdy dla treści)
│   ├── szablon.html szkielet dokumentu
│   ├── styl.css     cały system stylów v2: okładka, plakaty, strony treści, komponenty
│   ├── numeracja.js numery stron i odsyłacze „str. N” liczone automatycznie
│   ├── typografia.js polska typografia (twarde spacje)
│   ├── mockup.html  wachlarz 3 stron do mockupu okładki
│   └── ebook.html   złożony e-book (generowany przez zloz.mjs – nie edytuj ręcznie)
├── fonts/           Inter Tight, JetBrains Mono (i Anton z wersji 1) – lokalnie, z licencjami OFL
├── export/ebook/    gotowe PNG, PDF i mockup
├── zloz.mjs         src/strony/*.html → src/ebook.html
├── render.mjs       HTML → PNG każdej strony + PDF
├── tekst.mjs        src/ebook.html → manuskrypt/tekst-v1.0.md
└── pdf_kompresja.py przelicza duże obrazy w PDF na JPEG i uzupełnia metadane
```

## Jak zbudować

```bash
npm install                                         # raz – Playwright z devDependencies
cd ebook/chatgpt-ads
node zloz.mjs                                       # składa strony w src/ebook.html
node render.mjs                                     # → export/ebook: 39 × PNG + ebook.pdf
python pdf_kompresja.py export/ebook/ebook.pdf      # opcjonalnie; wymaga: pip install pymupdf pillow
node render.mjs src/mockup.html export/ebook        # → export/ebook/mockup-okladka.png
node tekst.mjs                                      # → manuskrypt/tekst-v1.0.md
```

Render nie korzysta z sieci: fonty i grafiki są w repo, a skrypt blokuje zapytania zewnętrzne. Przerywa pracę, jeśli
któryś font się nie załaduje, skrypt na stronie zgłosi błąd albo zostanie pusty numer strony lub odsyłacz.

### Sceny 3D (tylko przy zmianie grafik)

```bash
cd ebook/chatgpt-ads/3d
npm install                                                          # three.js
NODE_PATH=$(npm root -g) node render3d.cjs 03-waga ../assets/3d/rozdzial-03.png 1080 1350 2
# okładka i szachy to samodzielne pliki: render3d.cjs okladka.html … / szachy.html …
```

Sceny renderuje Chromium bez karty graficznej (SwiftShader), ok. 30–50 s na scenę w 2160 × 2700. PNG zamień na JPG
(jakość 90) i zapisz jako `assets/3d/rozdzial-NN.jpg` albo `assets/3d/okladka.jpg`.

| Plakat      | Scena (plik w `3d/`) | Metafora                                               |
| ----------- | -------------------- | ------------------------------------------------------ |
| Okładka     | `okladka.html`       | dymek rozmowy jako sklep z otwartymi drzwiami          |
| Rozdział 01 | `01-rozmowa.js`      | z ekranu laptopa wychodzi dymek, na laptopie stoi sofa |
| Rozdział 02 | `02-klik.js`         | pytanie → karta reklamy → kliknięcie kursorem          |
| Rozdział 03 | `03-waga.js`         | waga: torba zakupowa kontra monety                     |
| Rozdział 04 | `04-drzwi.js`        | samotne drzwi ze światłem i mały robot                 |
| Rozdział 05 | `05-rakieta.js`      | rakieta startuje z kłębów dymu                         |
| Rozdział 06 | `szachy.html`        | pomarańczowy hetman wśród przewróconych pionków        |
| Rozdział 07 | `07-domino.js`       | kaskada domina, pomarańczowa kostka jest następna      |
| Rozdział 08 | `08-lupa.js`         | lupa nad 100 sklepikami, 5 pomarańczowych              |

## Zasady składu

- **Numeracja:** nie wpisuj numerów stron ręcznie. Nagłówek ma pusty `<span class="pnum"></span>`, a odsyłacz
  to `str. <span data-str="nazwa-strony"></span>` (nazwa = `data-name` strony docelowej). Po dodaniu strony wszystko
  przelicza się samo.
- **Plakat rozdziału:** scena 3D na całą stronę, górne ~40% wolne na tytuł. Opis obok drugiego wiersza tytułu, a gdy
  drugi wiersz jest długi – pod tytułem (`poster__aside--pod`). Na dole ciemny gradient z listą stron rozdziału.
- **Podświetlenie słowa (`<mark>`):** pomarańczowy prostokąt od linii pisma do wysokości wersalików, z zapasem nad
  ogonkami „ę/ą” z wiersza wyżej.
- **Strony treści:** jasne tło `#F5F3EF`, karty z zaokrągleniem 18 px, pomarańcz tylko jako akcent i tło wyróżnień,
  tekst pomarańczowy wyłącznie na czarnym tle. Strony z dużym zapasem mają klasę `przestrzen` (większa skala, ostatni
  blok `kotwica` dopięty do dołu).
- **Twarde spacje** po jednoliterowych słowach, przed półpauzą, przy liczbach i jednostkach, w „Test drzwi” i „Dzień 14”
  wstawia `src/typografia.js`. Pojedyncze krótkie słowa na końcu akapitu wiążemy ręcznie przez `&nbsp;`.
- **Bloki kodu** zawsze jako `<pre class="code">` – Prettier nie zmienia ich zawartości.
- **Bez imitacji ChatGPT:** żadnych logo OpenAI ani interfejsu ChatGPT w grafikach (dymki rozmowy są ogólne).

## Grafika i licencje

- Sceny 3D: modele i render KSIGN w three.js (licencja MIT biblioteki). Font znaku „?” w scenie 02: Helvetiker
  z przykładów three.js.
- Fonty: SIL Open Font License 1.1 – teksty licencji w `fonts/OFL-*.txt`.

## Do zrobienia przed publikacją

- Wstawić nazwę produktu w miejsce **[Generator]** (str. 38) i potwierdzić opisy trzech kroków oraz cenę 249 zł.
- Pozycje **[SPRAWDZIĆ]** z `manuskrypt/rozdzialy-01-02.md` potwierdzić w panelu Ads Manager (konto KSIGN):
  dostępność karuzeli z feedu na koncie w PLN, samoobsługa od 31.08.2026.
- Uzupełnić link do komunikatu Gemius/PBI (marzec 2026) w źródłach.
- Zdecydować, czy na str. 35 wymieniamy z nazwy 5 sklepów z pixelem OpenAI.
- Przegląd faktów w dniu publikacji (okładka: „stan na 28.09.2026”) i ponowny eksport.
