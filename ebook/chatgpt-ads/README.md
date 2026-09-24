# E-book „Nie ma cię w rozmowie” – ChatGPT Ads dla polskich firm

Lead magnet KSIGN: 31 stron w formacie 4:5 (1080 × 1350 px). Składany w HTML, eksportowany do PDF i do PNG
każdej strony (pod LinkedIn i karuzele na Instagramie).

## Status – v1.0 (skład 24.09.2026, „stan na 28.09.2026”)

| Co                           | Gdzie                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| PDF do pobrania (2,6 MB)     | `export/ebook/ebook.pdf`                                           |
| 31 stron jako PNG            | `export/ebook/01-okladka.png` … `31-slowniczek-zrodla.png`         |
| Mockup okładki na landing    | `export/ebook/mockup-okladka.png` (1080 × 1080, przezroczyste tło) |
| Tekst finalny 1:1 ze składem | `manuskrypt/tekst-v1.0.md` (generowany)                            |
| Badanie 100 sklepów          | `badanie/` – skrypty, surowe wyniki, podsumowanie                  |

## Struktura

```
ebook/chatgpt-ads/
├── manuskrypt/      rozdzialy-*.md – teksty robocze z notatkami i źródłami; tekst-v1.0.md – tekst ze składu
├── research/        weryfikacja materiałów i źródeł
├── badanie/         badanie 100 polskich sklepów (robots.txt, boty OpenAI, pixele) – str. 27–28
├── src/
│   ├── strony/      strony e-booka w HTML, po 1 pliku na rozdział (źródło prawdy dla treści)
│   ├── szablon.html szkielet dokumentu (style, typografia)
│   ├── ebook.css    system bazowy: kolory, siatka, okładka, nagłówki
│   ├── komponenty.css  bloki stron: otwarcia rozdziałów, tabele, checklisty, ćwiczenia
│   ├── typografia.js   polska typografia (twarde spacje)
│   ├── mockup.html  wachlarz 3 stron do mockupu okładki
│   └── ebook.html   złożony e-book (generowany przez zloz.mjs – nie edytuj ręcznie)
├── assets/          posągi (CC0) z wyciętym tłem
├── fonts/           Anton, Inter Tight, JetBrains Mono – lokalnie, z licencjami OFL
├── export/ebook/    gotowe PNG, PDF i mockup
├── zloz.mjs         src/strony/*.html → src/ebook.html
├── render.mjs       HTML → PNG każdej strony + PDF
├── tekst.mjs        src/ebook.html → manuskrypt/tekst-v1.0.md
└── pdf_kompresja.py zmniejsza PDF (14 MB → 2,6 MB) i uzupełnia metadane
```

## Jak zbudować

```bash
npm install                                         # raz – Playwright z devDependencies
cd ebook/chatgpt-ads
node zloz.mjs                                       # składa strony w src/ebook.html
node render.mjs                                     # → export/ebook: 31 × PNG + ebook.pdf
python pdf_kompresja.py export/ebook/ebook.pdf      # wymaga: pip install pymupdf pillow
node render.mjs src/mockup.html export/ebook        # → export/ebook/mockup-okladka.png
node tekst.mjs                                      # → manuskrypt/tekst-v1.0.md
```

Render nie korzysta z sieci: fonty i grafiki są w repo, a skrypt blokuje zapytania zewnętrzne. Przerywa pracę, jeśli
któryś font się nie załaduje, więc polskie znaki zawsze wychodzą poprawnie. `pdf_kompresja.py` można uruchomić
ponownie – drugi przebieg niczego nie pogarsza.

## Zasady składu

- **Okładka i otwarcia rozdziałów:** pomarańcz `#E8940C`, marmurowy posąg, nagłówki Anton, duży numer rozdziału
  w konturze i jeden surrealistyczny akcent (dymek, drzwi, klawisz START, linijka budżetu, pęknięcia, rozdarty papier).
- **Strony treści:** jasne tło `#F6F2EA`, czarny tekst, pomarańczowe akcenty. Na górze marker `[ 02 / JAK TO DZIAŁA ]`
  i numer strony, na dole „KSIGN.”, odesłanie do źródeł, wersja i data. Ściąga (str. 29) ma białe tło do druku.
- **Tekst pomarańczowy** tylko na czarnym tle (kontrast 8:1). Na jasnym tle pomarańcz jest tłem, nie kolorem tekstu.
- **Anton i polskie znaki:** ogonek „Ę”/„Ą” schodzi 0,31 em pod linię pisma. Tytuły dwuwierszowe z ogonkiem w pierwszej
  linii potrzebują interlinii min. 1,22 (okładka). Tytuł strony z ogonkiem dostaje klasę `h1--ogonek` (zapas pod
  literą). Tytuły stron trzymamy w jednym wierszu.
- **Twarde spacje** po jednoliterowych słowach, przed półpauzą, między liczbą a jednostką i w nazwie „Test drzwi”
  wstawia `src/typografia.js`. Pojedyncze krótkie słowa na końcu akapitu wiążemy ręcznie przez `&nbsp;`.
- **Bloki kodu** zawsze jako `<pre class="code">` – Prettier nie zmienia ich zawartości (w `<div>` scaliłby wiersze).
- **Kontrola:** po każdej zmianie sprawdzić, czy treść nie wchodzi na stopkę ani na ramkę „Do zrobienia dziś”
  (wszystkie 31 stron mieszczą się w v1.0).
- **Bez imitacji ChatGPT:** żadnych dymków czatu z logo, logo OpenAI ani interfejsu ChatGPT w grafikach (zasada
  z polityki reklam OpenAI, stosujemy ją też w e-booku).

## Grafika i licencje

Wszystkie posągi pochodzą z otwartych zbiorów muzeów – domena publiczna, **CC0**. Tło wycięte modelem BiRefNet
(licencja MIT).

| Plik                       | Obiekt                                                           | Źródło                                                 |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| `posag-okladka.webp`       | Marble portrait bust of the emperor Gaius (Caligula), 37–41 n.e. | https://www.metmuseum.org/art/collection/search/248851 |
| `posag-01-aleksander.webp` | Head of Alexander the Great                                      | https://clevelandart.org/art/1927.209                  |
| `posag-02-apollo.webp`     | Marble head of Apollo, ok. 27 p.n.e.–68 n.e.                     | https://www.metmuseum.org/art/collection/search/255057 |
| `posag-03-epikur.webp`     | Marble head of Epikouros, II w. n.e.                             | https://www.metmuseum.org/art/collection/search/248475 |
| `posag-04-popiersie.webp`  | Marble portrait bust of a man, 81–96 n.e.                        | https://www.metmuseum.org/art/collection/search/248142 |
| `posag-06-starzec.webp`    | Marble bust of a man, poł. I w. n.e.                             | https://www.metmuseum.org/art/collection/search/248722 |
| `posag-07-karakalla.webp`  | Marble portrait of the emperor Caracalla, 212–217 n.e.           | https://www.metmuseum.org/art/collection/search/253592 |
| `posag-08-oczy.webp`       | Marble head of an athlete, ok. 138–192 n.e. (kadr oczu)          | https://www.metmuseum.org/art/collection/search/248579 |

Fonty: SIL Open Font License 1.1 – teksty licencji w `fonts/OFL-*.txt`.

## Do zrobienia przed publikacją

- Wstawić nazwę produktu w miejsce **[Generator]** (str. 30) i potwierdzić opisy trzech kroków oraz cenę 249 zł.
- Pozycje **[SPRAWDZIĆ]** z `manuskrypt/rozdzialy-01-02.md` potwierdzić w panelu Ads Manager (konto KSIGN):
  dostępność karuzeli z feedu na koncie w PLN, samoobsługa od 31.08.2026.
- Uzupełnić link do komunikatu Gemius/PBI (marzec 2026) w źródłach.
- Zdecydować, czy na str. 27 wymieniamy z nazwy 5 sklepów z pixelem OpenAI.
- Przegląd faktów w dniu publikacji (okładka: „stan na 28.09.2026”) i ponowny eksport.
