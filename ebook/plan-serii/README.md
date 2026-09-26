# Plan serii e-booków KSIGN – raport „100 tematów na e-booki o marketingu e-commerce”

Raport PDF (A4, 40 stron) dla serii e-booków KSIGN: 100 tematów w 5 filarach, TOP 10 na pierwszy rok i szablon planu
wydawniczego. Pierwszy e-book serii („Nie ma cię w rozmowie.”) jest w `../chatgpt-ads/`.

## Status – stan na 24.09.2026

| Co                                       | Gdzie                                   |
| ---------------------------------------- | --------------------------------------- |
| Raport PDF (1,2 MB, zakładki, tagi)      | `export/raport-100-tematow-ebookow.pdf` |
| Dane: 100 tematów, filary, kalendarz     | `src/tematy.json` (źródło prawdy)       |
| Złożony HTML (generowany przez zloz.mjs) | `src/raport.html` – nie edytuj ręcznie  |

## Zawartość raportu

1. Okładka i spis treści.
2. Podsumowanie: pięć wniosków z danych o polskim e-commerce (Gemius 2025, TikTok) i rekomendacja startu.
3. Jak powstał spis: kryteria wyboru tematów i mapa „filary × grupy docelowe”.
4. TOP 10 na pierwszy rok: dwa tematy z każdego filaru, ułożone pod sezon (październik 2026 – sierpień 2027).
5. Pięć filarów po 20 tematów: strona otwierająca z danymi i listą tematów, potem karty po 4 na stronę. Każda karta ma
   tytuł i podtytuł, grupę docelową, problem czytelnika i 3 kluczowe rozdziały.
   - 01 AI i automatyzacja (001–020)
   - 02 Marketing relacyjny i retention (021–040)
   - 03 Social commerce i livestreaming (041–060)
   - 04 First-party data i prywatność (061–080)
   - 05 E-commerce omnichannel (081–100)
6. Szablon planu wydawniczego: plan na 12 miesięcy, karta e-booka, harmonogram produkcji, KPI i „silnik treści”.
7. Metodologia, źródła i zastrzeżenia.

## Jak zbudować

```bash
cd ebook/plan-serii
node zloz.mjs                                   # src/tematy.json → src/raport.html
NODE_PATH=$(npm root -g) node render.mjs        # → export/raport-100-tematow-ebookow.pdf
python metadane.py                              # autor, temat, czytelne zakładki; wymaga: pip install pymupdf
node render.mjs --png /tmp/podglad              # opcjonalnie: podgląd każdej strony w PNG
```

`render.mjs` przerywa pracę, jeśli nie wczyta się font, treść wyjdzie poza kartę albo stronę, bloki na stronie nachodzą
na siebie lub strona zgłosi błąd. Render nie korzysta z sieci.

## Zasady

- **Zmiany treści tylko w `src/tematy.json`.** Numeracja 001–100, spis treści, mapa tematów i odsyłacze „s. N” liczą się
  przy składaniu. Filar ma zawsze 20 tematów (5 stron po 4 karty).
- **TOP 10 i plan 12 miesięcy** biorą się z listy `kalendarz` w tym samym pliku (pole `nr` = numer tematu).
- **Limity tekstu na karcie:** tytuł do ok. 45 znaków, podtytuł do ok. 75, „dla kogo” do ok. 80, problem do ok. 175,
  rozdział do ok. 60. Dłuższy tekst zatrzyma render (kontrola przepełnienia).
- **Problem czytelnika** pisany w czasie teraźniejszym, bez form rodzajowych („nie wiem”, „płacę”), żeby pasował do
  każdego czytelnika.
- **Liczby tylko ze źródeł wymienionych w raporcie** (Gemius „E-commerce w Polsce 2025”, TikTok Newsroom, przepisy).
- **Polska typografia** przy składaniu: twarde spacje po jednoliterowych słowach i przy liczbach, ostatnie krótkie słowo
  akapitu razem z poprzednim, zakresy („001–020”) i słowa z „e-” bez łamania.

## Styl

Kolory i fonty jak na stronie ksign.pl: krem `#EDE4D3`, atrament `#0A0A0C`, turkus `#1F8F87` (drobny tekst: `#14655F`),
Instrument Serif w tytułach, Work Sans w tekście. Fonty lokalnie w `fonts/` (SIL OFL 1.1, licencje obok).
