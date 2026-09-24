# Kierunek v2 – próbka do akceptacji

Odpowiedź na inspiracje Karola z 24.09.2026: torba-sklep z drzwiami, laptop-sklep, perfumy Dior, astronauta na jajku,
hetman „Make Every Move Count”. Wspólny klimat: jedna scena 3D jako metafora, jasne tło, dużo powietrza, nowoczesny
grotesk w zdaniach (nie wersaliki), jeden kolor akcentu. U nas akcentem jest pomarańcz KSIGN `#E8940C`.

| Plik                                | Co to jest                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `export/v2-01-okladka.png`          | okładka: dymek rozmowy jako sklep z otwartymi drzwiami                             |
| `export/v2-22-rozdzial-06.png`      | otwarcie rozdziału 06 jako plakat: pomarańczowy hetman wśród przewróconych pionków |
| `export/v2-23-kalkulator.png`       | strona treści w nowym stylu (karta z tabelą, ramka „Do zrobienia dziś”)            |
| `probka.html`, `v2.css`             | skład próbki; fonty z `../fonts/` (Inter Tight)                                    |
| `3d/okladka.html`, `3d/szachy.html` | sceny three.js – modele, światło, cienie, głębia ostrości                          |
| `grafiki/`                          | wyrenderowane sceny: 2160 × 2700 (`*.jpg`) i 1080 × 1350 (`*-1x.jpg`)              |

## Jak odtworzyć

```bash
cd ebook/chatgpt-ads/kierunek-v2/3d
npm install                                   # three.js
NODE_PATH=$(npm root -g) node render3d.cjs okladka.html okladka.png 1080 1350 2   # → PNG 2160 × 2700
cd ../..
node render.mjs kierunek-v2/probka.html kierunek-v2/export
```

Sceny renderuje Chromium bez karty graficznej (SwiftShader), ok. 30 s na scenę.

## Czego sceny 3D w kodzie nie zrobią

Ludzi, dłoni, fotorealistycznych ulic ani astronauty. Takie kadry (jak wzory 1, 3 i 4) wymagają generatora obrazów AI:
kredytów w Higgsfield albo połączenia Figma Weave. Wersja 1.0 z posągami zostaje w `../export/ebook/` do czasu decyzji.
