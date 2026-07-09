
# Video-first KSIGN homepage

Cała obecna treść (Hero, Manifest, PackageStart, BeforeAfter, BigNumbers, AddonsSlider, Process, Pricing, FAQ, BlogPreview, FinalCTA) **zostaje bez zmian merytorycznych** — przebudowa jest wyłącznie wizualna: każda sekcja dostaje warstwę wideo/motion jako główny nośnik designu.

## Kierunek wizualny

- **Tło**: głęboka czerń `#0A0A0A` z subtelnym film grain (SVG noise, opacity ~4%)
- **Akcenty**: violet `#7C5CFF` + lime `#C6FF3D` (kontynuacja obecnej palety KSIGN)
- **Typografia**: obecny Fraunces (serif, editorial) do headlinów + Inter/mono do body
- **Motion**: wszystko z easingiem `[0.22, 1, 0.36, 1]`, 0.6–0.9s
- Obecna paleta cream/ink → wersja "dark cinema" (tło ink, akcent cream tylko w tekście)

## Struktura sekcji (kolejność zachowana)

1. **Hero** — full-viewport looping video jako tło (subtelny dark gradient overlay), editorial headline nad nim, video preview thumb w rogu
2. **Manifest** — 3 filary z krótkimi mini-clipami video/motion loop przy każdym numerze (01/02/03), reveal na scroll
3. **PackageStart** — video split (lewo: motion loop pokazujący "stronę w akcji", prawo: bulletlist)
4. **BeforeAfter** — zamiast statycznego before/after: video scrub na scroll (przewijanie strony)
5. **BigNumbers** — liczby (3–7 dni, 999 zł, itd.) z video-loop w tle każdej liczby (bardzo subtelny)
6. **AddonsSlider** — obecny slider + mikro-video loopy w kartach zamiast statycznych ikon
7. **Process** — timeline z animowanymi video-etapami (kursor rysuje layout, code appears, deploy)
8. **Pricing** — dark card z violet glow, subtelny motion border
9. **FAQ** — accordion z motion reveal (bez wideo — czytelność)
10. **BlogPreview** — karty z video hover-preview (jak w portfolio, ale wpisane w brand KSIGN)
11. **FinalCTA** — huge editorial "Zbudujmy Twoją stronę" + magnetic button + video loop w tle

## Wideo — źródło

Używamy **statycznych plików video (mp4)** — 4–6 krótkich, subtelnych loopów (5–10 s każdy, ~1–2 MB):

- hero-bg (abstrakcyjny motion, ciemny)
- pillar-01, pillar-02, pillar-03 (mini-loopy do manifestu)
- process-loop (kursor/kod/deploy)
- cta-bg (ambient loop)

Nie generujemy ich w tej iteracji — używamy Pixabay/Coverr CDN (darmowe, jak w /studio) lub placeholderów. Jeśli chcesz, wygeneruję potem własne przez `videogen`.

## Zakres zmian w plikach

- `src/components/site/Hero.tsx` — video background + editorial headline
- `src/components/site/Manifest.tsx` — video przy każdym filarze
- `src/components/site/PackageStart.tsx` — video split layout
- `src/components/site/BeforeAfter.tsx` — video scrub
- `src/components/site/BigNumbers.tsx` — video-behind-numbers
- `src/components/site/AddonsSlider.tsx` — video w kartach
- `src/components/site/Process.tsx` — animowana timeline
- `src/components/site/Pricing.tsx` — dark treatment
- `src/components/site/BlogPreview.tsx` — video hover
- `src/components/site/FinalCTA.tsx` — video bg + magnetic button
- `src/components/site/Header.tsx` — dark pill nav (jak w /studio)
- `src/components/site/Footer.tsx` — dark treatment
- `src/routes/index.tsx` — zmiana wrappera z `bg-cream text-ink` na `bg-ink text-cream`
- `src/styles.css` — jeśli trzeba, doprecyzowanie violet/lime tokenów pod dark
- `/studio` route — usunięcie (nie jest już potrzebne)

## Uwagi techniczne (dla developera)

- Wszystkie video: `<video autoPlay muted loop playsInline preload="metadata">` — nie blokuje LCP
- `useReducedMotion` z framer-motion → wyłącza autoplay wideo i redukuje motion na urządzeniach z `prefers-reduced-motion`
- Mobile: hero video zastąpione poster image (oszczędność transferu), pozostałe sekcje mają video ale mniejsze
- SEO: cała treść zostaje w DOM, structured data bez zmian, LCP kontrolujemy przez poster + preload metadata

## Poza zakresem

- Nie ruszamy: `/pakiety`, `/brief`, `/blog`, `/checkout`, admin, auth, backend, structured data
- Nie generujemy jeszcze własnych wideo (użyjemy zewnętrznych CDN placeholderów — możesz je potem wymienić lub poprosić o generowanie)
