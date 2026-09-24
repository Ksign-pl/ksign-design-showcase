# E-book „Nie ma cię w rozmowie” – ChatGPT Ads dla polskich firm

Lead magnet KSIGN: 31 stron w formacie 4:5 (1080 × 1350 px). Składany w HTML, eksportowany do PDF i do PNG
każdej strony (pod LinkedIn i Instagram).

## Status

| Etap                                  | Stan                                                      |
| ------------------------------------- | --------------------------------------------------------- |
| Fakty (krok 2) i konspekt (krok 3)    | zaakceptowane                                             |
| Manuskrypt str. 1–9 (rozdziały 01–02) | `manuskrypt/rozdzialy-01-02.md` – do akceptacji           |
| Próbka graficzna                      | okładka + str. 8 w `export/probka/` – do akceptacji stylu |
| Str. 10–31                            | po akceptacji próbki                                      |

## Struktura

```
ebook/chatgpt-ads/
├── manuskrypt/      tekst stron (źródło prawdy dla treści)
├── src/             HTML stron, style (ebook.css) i polska typografia (typografia.js)
├── assets/          grafiki (posąg na okładkę)
├── fonts/           Anton, Inter Tight, JetBrains Mono – lokalnie, z licencjami OFL
├── export/          gotowe PNG i PDF
└── render.mjs       render HTML → PNG + PDF
```

## Render

```bash
npm install                                  # raz – instaluje Playwright z devDependencies
node ebook/chatgpt-ads/render.mjs            # domyślnie src/probka.html → export/probka/
node ebook/chatgpt-ads/render.mjs src/plik.html export/katalog
```

Render nie korzysta z sieci: fonty i grafiki są w repo, a skrypt blokuje zapytania zewnętrzne. Skrypt przerywa
pracę, jeśli któryś font się nie załaduje, więc polskie znaki zawsze wychodzą poprawnie.

## Zasady składu

- **Okładka i otwarcia rozdziałów:** pomarańcz `#E8940C`, marmurowy posąg, nagłówki Anton.
- **Strony treści:** jasne tło `#F6F2EA`, czarny tekst, pomarańczowe akcenty. Na górze marker `[ 02 / JAK TO DZIAŁA ]`
  i numer strony, na dole „KSIGN.”, odesłanie do źródeł, wersja i data.
- **Tekst pomarańczowy** tylko na czarnym tle (kontrast 8:1). Na jasnym tle pomarańcz jest tłem, nie kolorem tekstu.
- **Anton i polskie znaki:** ogonek „Ę” schodzi 0,31 em pod linię pisma. Tytuły dwuwierszowe z „Ę”/„Ą” w pierwszej
  linii potrzebują interlinii min. 1,22 – inaczej ogonek wchodzi w literę poniżej.
- **Twarde spacje** po jednoliterowych słowach, przed półpauzą i między liczbą a jednostką wstawia `src/typografia.js`.
- **Bez imitacji ChatGPT:** żadnych dymków czatu, logo OpenAI ani interfejsu ChatGPT w grafikach (zasada z polityki
  reklam OpenAI, stosujemy ją też w e-booku).

## Grafika i licencje

- **Posąg na okładce:** _Marble portrait bust of the emperor Gaius (Caligula)_, Rzym, 37–41 n.e., The Metropolitan
  Museum of Art, nr obiektu 248851 – domena publiczna, Open Access **CC0**
  (https://www.metmuseum.org/art/collection/search/248851). Tło wycięte modelem BiRefNet (licencja MIT), obraz
  przycięty na wysokości piersi.
- **Fonty:** SIL Open Font License 1.1 – teksty licencji w `fonts/OFL-*.txt`.

## Do zrobienia przed publikacją

- Pozycje oznaczone w manuskrypcie **[SPRAWDZIĆ]** potwierdzić w panelu Ads Manager (konto KSIGN).
- Wstawić nazwę produktu w miejsce **[Generator]**.
- Uzupełnić dokładne adresy dokumentacji OpenAI i komunikatu Gemius/PBI na str. 31.
- Przegląd faktów w dniu publikacji (na okładce: „stan na 28.09.2026”).
- PDF próbki waży ok. 3,3 MB, prawie w całości przez grafikę posągu z przezroczystością. W wersji finalnej
  zmniejszyć grafiki do rozdzielczości druku (ok. 1400 px wysokości).
