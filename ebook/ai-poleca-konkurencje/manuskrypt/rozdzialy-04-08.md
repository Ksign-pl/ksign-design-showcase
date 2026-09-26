# AI POLECA KONKURENCJĘ – manuskrypt, strony 18–40

> Wersja robocza v0.1 · fakty sprawdzone 25.09.2026 · stopka na okładce i stronach: ksign.pl
>
> Zasady pracy z plikiem jak w `rozdzialy-01-03.md`. Tabela na str. 28 pochodzi z `kalkulator.mjs`.

---

# ROZDZIAŁ 04 · DANE PRODUKTÓW

## Str. 18 · Plakat rozdziału

- **Numer:** 04
- **Tytuł:** Dane produktów.
- **Lead:** Asystent poleca produkty, o których wie dość, żeby odpowiedzieć klientowi: co to jest, ile kosztuje, czy
  jest dostępne i kto to sprzedaje.
- **W tym rozdziale:** Karta produktu · Dane strukturalne · Merchant Center · Feed dla ChatGPT
- **Scena 3D:** marmurowa etykieta produktu z polami z turkusowego szkła.

---

## Str. 19 · Karta produktu dla ludzi i dla AI

**Marker:** [ 04 / DANE PRODUKTÓW ]
**Nagłówek:** KARTA PRODUKTU DLA LUDZI I DLA AI

**Lead:** Nie potrzebujesz osobnej wersji dla asystentów. Potrzebujesz kompletnej karty produktu – dla klienta.

1. **Tytuł:** marka + typ produktu + najważniejsza cecha + wariant, np. „Lampa stołowa [Marka] Nova, ciepłe światło
   2700 K, czarna”.
2. **Marka i producent.** Jeśli jesteś producentem albo oficjalnym sprzedawcą, napisz to. ChatGPT bierze to pod uwagę,
   gdy układa listę sklepów (str. 7).
3. **Identyfikatory:** kod GTIN (EAN) i kod producenta.
4. **Cena i cena promocyjna** – te same na stronie, w danych strukturalnych i w feedzie.
5. **Dostępność** – aktualna, także dla wariantów.
6. **Dostawa i zwroty:** koszt, czas, zasady – w tekście, nie tylko w regulaminie.
7. **Parametry w liczbach** – w tabeli z tekstem, nie na obrazku.
8. **Własny opis:** dla kogo jest produkt i jaki problem rozwiązuje. Nie kopiuj opisu producenta, który ma 50 innych
   sklepów.
9. **Zdjęcia i film** – jako uzupełnienie tekstu.
10. **Opinie i pytania klientów** z odpowiedziami (str. 24).

**Obowiązkowo także:** dane producenta i ostrzeżenia z GPSR (art. 19 rozporządzenia 2023/988) – każda oferta
sprzedaży na odległość musi je mieć.

---

## Str. 20 · Dane strukturalne Product

**Marker:** [ 04 / DANE PRODUKTÓW ]
**Nagłówek:** DANE STRUKTURALNE PRODUCT

**Lead:** Dane strukturalne mówią wyszukiwarce wprost, co jest nazwą, ceną i dostępnością produktu. Nie są
obowiązkowe dla funkcji AI, ale pomagają Google zrozumieć i sprawdzić Twoje dane.

**Co mówi Google:**

- Szczegółowe dane o produkcie udostępnisz na 2 sposoby: uporządkowanymi danymi Product na stronie i plikiem danych
  w Merchant Center. Najlepiej oba – wtedy Google może je połączyć i porównać.
- Jeśli w danych na stronie nie ma ceny, Google może ją wziąć z pliku danych Merchant Center.
- Dane strukturalne muszą się zgadzać z tekstem widocznym na stronie.
- Do przeglądu od AI i Trybu AI nie trzeba dodawać żadnych specjalnych danych schema.org.

**Co zrobić w praktyce:**

1. Sprawdź 3 karty produktów w teście wyników z elementami rozszerzonymi (Google) – czy są cena, dostępność,
   marka i GTIN.
2. Na Shoperze, IdoSell i WooCommerce dane Product zwykle generuje platforma albo wtyczka. Sprawdź, czy po zmianie
   ceny w panelu zmieniają się też w danych.
3. Dodaj zasady zwrotów i dostawy – Google ma dla nich osobne typy danych dla sprzedawców.

---

## Str. 21 · Merchant Center

**Marker:** [ 04 / DANE PRODUKTÓW ]
**Nagłówek:** MERCHANT CENTER: BEZPŁATNE INFORMACJE O PRODUKTACH

**Lead:** Plik produktów w Google Merchant Center to dziś paliwo dla wyszukiwarki, zakupów i Gemini – bez opłat.

**Gdzie mogą się wyświetlać Twoje produkty bez płacenia:** wyszukiwarka Google, Mapy Google, Gemini, Grafika Google,
Obiektyw Google, YouTube i karta Zakupy.

**Co zrobić:**

1. **Włącz bezpłatne informacje o produktach** – w nowych kontach są włączone domyślnie. Sprawdzisz to w Merchant
   Center: Marketing → Metody marketingowe.
2. **Dodaj zasady zwrotów** na stronie i w Merchant Center oraz koszty dostawy.
3. **Dopasuj dane w Merchant Center do sklepu** – te same ceny i dostępność.
4. **Połącz Merchant Center z profilem firmy** w Google, jeśli masz sklep stacjonarny.
5. **Napraw błędy produktów** – produkt odrzucony w Merchant Center nie pokaże się w bezpłatnych informacjach.

**Uwaga:** Google zastrzega, że włączone bezpłatne informacje nie gwarantują wyświetlania – produkty dopasowuje do
zapytań na podstawie Twoich danych. Dlatego jakość danych (str. 19) jest ważniejsza niż sam plik.

---

## Str. 22 · Feed dla ChatGPT

**Marker:** [ 04 / DANE PRODUKTÓW ]
**Nagłówek:** FEED DLA CHATGPT

**Lead:** OpenAI ma własną specyfikację pliku produktów. Na razie standardowy plik jest kierowany na rynek USA –
w Polsce liczą się dane, które ChatGPT znajdzie sam.

**Co wymaga specyfikacja OpenAI (9 pól):** identyfikator produktu, tytuł, opis, adres strony produktu, marka, nazwa
sprzedawcy, zdjęcie, dostępność i cena. Dodatkowe pola to m.in. warianty, dostawa, zwroty i opinie.

**Gdzie jest haczyk:**

- Standardowy plik w formacie OpenAI jest dziś kierowany na USA. Inne rynki OpenAI uruchamia po potwierdzeniu
  integracji.
- ChatGPT bierze dane o produktach od zewnętrznych dostawców albo bezpośrednio od sklepów.
- OpenAI obsługuje też pliki zgodne z formatem Google.

**Co zrobić w Polsce już teraz:**

1. **Kompletny plik w Merchant Center** (str. 21) – pracuje na Google i jest gotowy, gdy OpenAI otworzy Polskę.
2. **Wpuść OAI-SearchBot** (str. 14) – bez niego ChatGPT nie znajdzie Twoich kart produktów.
3. **Karty produktów z ceną, dostępnością i marką w tekście** (str. 19).
4. **Obserwuj specyfikację OpenAI** – sprawdzaj co kwartał, czy obejmuje Polskę.

**Reklamy produktowe w ChatGPT** (karuzela z feedu) to osobny temat – e-book „Nie ma cię w rozmowie”.

> **Do zrobienia dziś**
>
> 1. Sprawdź w Merchant Center, ile produktów ma błędy, i czy bezpłatne informacje są włączone.
> 2. Popraw tytuły i opisy 5 najlepiej sprzedających się produktów według listy ze str. 19.

---

# ROZDZIAŁ 05 · OPINIE I WZMIANKI

## Str. 23 · Plakat rozdziału

- **Numer:** 05
- **Tytuł:** Opinie i wzmianki.
- **Lead:** Asystent ocenia jakość tak jak klient – po opiniach i po tym, co mówią o Tobie inni.
- **W tym rozdziale:** Opinie o produktach · Wzmianki poza sklepem · Czego nie robić
- **Scena 3D:** marmurowe usta, z których wychodzą dymki z turkusowego szkła.

---

## Str. 24 · Opinie o produktach

**Marker:** [ 05 / OPINIE I WZMIANKI ]
**Nagłówek:** OPINIE O PRODUKTACH

**Lead:** Opinie to dla asystenta sygnał jakości, a dla klienta powód, żeby zaufać poleceniu.

**Jak pokazywać opinie:**

- **Na karcie produktu, jako tekst** – tak jak inne ważne treści (str. 17).
- **Osobno opinie o produkcie i o sklepie.** Specyfikacja feedu OpenAI rozdziela je na osobne pola: liczba i średnia
  ocen produktu oraz liczba i średnia ocen sklepu.
- **Z informacją, czy i jak sprawdzasz, że opinie pochodzą od kupujących.** To obowiązek, jeśli udostępniasz opinie
  (art. 6 ust. 4 pkt 7 ustawy o przeciwdziałaniu nieuczciwym praktykom rynkowym).

**Jak zbierać opinie:**

- prośba po dostawie – z zachowaniem zasad zgody na wiadomości (e-book „Drugi zakup jest najtańszy.”, str. 9 i 15),
- pytania klientów z obsługi jako „Pytania i odpowiedzi” na karcie produktu,
- odpowiedzi na negatywne opinie – rzeczowo, z rozwiązaniem.

**Zakazane w każdej sytuacji:** twierdzenie, że opinie są od kupujących, bez rozsądnych kroków, żeby to sprawdzić;
zamieszczanie lub zlecanie fałszywych opinii; zniekształcanie opinii, np. publikowanie tylko pozytywnych (art. 7
pkt 25–26 tej ustawy, motyw 49 dyrektywy 2019/2161).

---

## Str. 25 · Wzmianki poza sklepem

**Marker:** [ 05 / OPINIE I WZMIANKI ]
**Nagłówek:** WZMIANKI POZA SKLEPEM

**Lead:** Asystenci cytują strony z indeksu wyszukiwarek. Jeśli o Twoim sklepie piszą tylko w Twoim sklepie, cytować
nie mają czego.

**5 źródeł wzmianek, które możesz zbudować:**

1. **Poradniki i rankingi w mediach branżowych.** Najlepiej z Twoimi danymi: badanie, zestawienie, sezonowe trendy
   ze sprzedaży.
2. **Porównywarki i marketplace'y** – spójna nazwa, opis i dane produktów wszędzie.
3. **Recenzje twórców na YouTube i w social mediach** – z oznaczeniem współpracy (rekomendacje UOKiK, e-book „TikTok
   Shop od pierwszego dnia.”).
4. **Fora i społeczności** – odpowiedzi eksperta ze sklepu, podpisane, bez linków w każdym wpisie.
5. **Profil firmy w Google i katalogi branżowe** – te same dane kontaktowe i opis.

**Skąd wiedzieć, co działa:** raport AI Performance w Bing Webmaster Tools pokazuje, które Twoje strony są cytowane
w odpowiedziach Copilota i przy jakich zapytaniach (str. 30). Pod przeglądem od AI w Google widać linki do źródeł –
zapisuj je w arkuszu testu (str. 11).

---

## Str. 26 · Czego nie robić

**Marker:** [ 05 / OPINIE I WZMIANKI ]
**Nagłówek:** CZEGO NIE ROBIĆ

**Lead:** Skróty, które mają „przekonać AI”, zwykle łamią prawo albo zasady wyszukiwarek. Kara jest zwykle większa niż
zysk.

1. **Fałszywe albo kupione opinie.** Praktyka zakazana w każdej sytuacji (art. 7 pkt 25–26 ustawy o przeciwdziałaniu
   nieuczciwym praktykom rynkowym).
2. **Artykuły sponsorowane bez oznaczenia.** Płatna promocja w treściach publicystycznych, która nie wynika wyraźnie
   z treści, to kryptoreklama (art. 7 pkt 11 tej ustawy).
3. **Maskowanie** – inna treść dla botów, a inna dla ludzi, np. osobna „strona dla AI” z hasłami. Google traktuje to
   jako spam.
4. **Masowe treści z AI.** Setki stron wygenerowanych bez wartości dla klienta to według Google nadużywanie treści na
   dużą skalę – niezależnie od tego, jak powstały.
5. **Spam na forach i w komentarzach.** Moderatorzy usuwają takie wpisy, a klienci zapamiętują markę, która spamuje.

**Zasada:** rób to, co pomogłoby klientowi nawet bez AI – kompletne dane, prawdziwe opinie, przydatne treści.

> **Do zrobienia dziś**
>
> 1. Sprawdź, czy przy opiniach w sklepie jest informacja, jak je weryfikujesz.
> 2. Wypisz 3 media branżowe, w których chcesz się pojawić w tym kwartale.

---

# ROZDZIAŁ 06 · POMIAR

## Str. 27 · Plakat rozdziału

- **Numer:** 06
- **Tytuł:** Pomiar.
- **Lead:** Ruch z asystentów AI da się już zmierzyć – w GA4, Search Console i Bing. Każde narzędzie widzi inny
  kawałek.
- **W tym rozdziale:** Kanał Asystent AI w GA4 · Search Console · Bing AI Performance · Raport co miesiąc
- **Scena 3D:** marmurowy kompas z igłą z turkusowego szkła.

---

## Str. 28 · GA4: kanał Asystent AI

**Marker:** [ 06 / POMIAR ]
**Nagłówek:** GA4: KANAŁ ASYSTENT AI

**Lead:** Od 13.05.2026 GA4 ma w domyślnej grupie kanałów osobny kanał „Asystent AI”. Nie musisz niczego ustawiać.

**Jak działa:**

- Wizyty z rozpoznanych asystentów AI – np. ChatGPT, Gemini, Copilot – trafiają do kanału „Asystent AI”, z medium
  `ai-assistant` i kampanią `(ai-assistant)`.
- **Kanał nie obejmuje przeglądu od AI ani Trybu AI w Google** – ten ruch jest w bezpłatnych wynikach wyszukiwania
  (str. 29).
- ChatGPT dodaje do linków parametr `utm_source=chatgpt.com`. **[SPRAWDZIĆ]**

**Przykład: kanały w GA4 za miesiąc**

<!-- tabela:kanaly -->

| Kanał w GA4                   | Sesje  | Udział w sesjach | Konwersja | Przychód na sesję |
| ----------------------------- | ------ | ---------------- | --------- | ----------------- |
| Bezpłatne wyniki wyszukiwania | 18 000 | 66,9%            | 2,0%      | 4,92 zł           |
| Asystent AI                   | 400    | 1,5%             | 2,5%      | 6,15 zł           |
| Bezpośrednie                  | 6000   | 22,3%            | 2,5%      | 6,15 zł           |
| E-mail                        | 2500   | 9,3%             | 3,0%      | 6,89 zł           |

<!-- /tabela:kanaly -->

**Jak czytać:** ruchu z AI jest mało, więc porównuj **przychód na sesję**, a nie liczbę sesji. Jeśli jest wyższy niż
w bezpłatnych wynikach, każda nowa wzmianka w odpowiedziach AI jest warta więcej, niż sugeruje liczba odwiedzin.

_Przykład – dane umowne. Starsze dane (sprzed 13.05.2026) policzysz niestandardową grupą kanałów – pomoc GA4 podaje
gotowe wyrażenie regularne._

---

## Str. 29 · Search Console

**Marker:** [ 06 / POMIAR ]
**Nagłówek:** SEARCH CONSOLE: PRZEGLĄD OD AI I TRYB AI

**Lead:** Wyświetlenia i kliknięcia z przeglądu od AI i Trybu AI Google wlicza do raportu skuteczności – do typu
wyszukiwania „Sieć”. Osobno ich nie zobaczysz.

**Co możesz zrobić:**

1. **Filtruj zapytania-pytania.** W raporcie skuteczności ustaw filtr zapytań z wyrażeniem regularnym, np.
   `^(jak|jaki|jaka|jakie|czy|co|gdzie|ile|najlepsze)\b` – to pytania, przy których najczęściej pojawia się przegląd
   od AI.
2. **Porównuj kliknięcia do wyświetleń miesiąc do miesiąca** dla tych zapytań.
3. **Łącz z GA4:** strony wejścia z bezpłatnych wyników i ich przychód na sesję.

**Co mówi Google:** kliknięcia ze stron wyników z przeglądem od AI mają „lepszą jakość” – użytkownicy spędzają
wtedy na stronach więcej czasu. To deklaracja Google – sprawdź na własnych danych.

---

## Str. 30 · Bing: AI Performance

**Marker:** [ 06 / POMIAR ]
**Nagłówek:** BING WEBMASTER TOOLS: AI PERFORMANCE

**Lead:** Jedyny raport, który pokazuje wprost, które Twoje strony asystent cytuje. Dotyczy Copilota i odpowiedzi AI
w Bing.

**Co pokazuje raport:**

- **Cytowane strony** – jak często konkretny adres jest widocznie cytowany w odpowiedzi AI.
- **Średnia liczba cytowanych stron** dziennie.
- **Zapytania, przy których AI korzysta z Twoich treści** (grounding queries).
- **Trend w czasie.**

**Od 16.06.2026 (wersja zapoznawcza):** intencje zapytań, tematy, porównanie okresów i **udział w cytowaniach** – jaki
odsetek wszystkich cytowań przy danym zapytaniu przypada na Twoją stronę.

**Jak wykorzystać:** strony z największą liczbą cytowań to wzór dla pozostałych kart i poradników. Zapytania, przy
których Cię nie ma, to lista tematów do napisania.

---

## Str. 31 · Raport co miesiąc

**Marker:** [ 06 / POMIAR ]
**Nagłówek:** RAPORT CO MIESIĄC

**Lead:** 8 liczb w jednym arkuszu, raz w miesiącu. Oceniaj trend z 3 miesięcy, nie pojedynczy wynik.

| Liczba                                            | Skąd                      | Na co patrzysz                                   |
| ------------------------------------------------- | ------------------------- | ------------------------------------------------ |
| Wynik widoczności z testu 10 pytań                | arkusz testu (str. 11–12) | Rośnie z miesiąca na miesiąc                     |
| Sesje z kanału Asystent AI                        | GA4                       | Rosną                                            |
| Przychód na sesję: Asystent AI i bezpłatne wyniki | GA4                       | Czy ruch z AI jest wart więcej                   |
| Wyświetlenia i kliknięcia zapytań-pytań           | Search Console            | Kliknięcia nie spadają szybciej niż wyświetlenia |
| Cytowane strony i zapytania                       | Bing Webmaster Tools      | Przybywa stron i zapytań                         |
| Liczba opinii o produktach                        | system sklepu             | Przybywa co tydzień                              |
| Produkty z błędami w Merchant Center              | Merchant Center           | Blisko zera                                      |
| Boty AI wpuszczone                                | test techniczny (str. 16) | Bez zmian po wdrożeniach i zmianach hostingu     |

> **Do zrobienia dziś**
>
> 1. W GA4 otwórz Pozyskiwanie ruchu i sprawdź kanał „Asystent AI” za ostatnie 3 miesiące.
> 2. Dodaj sklep do Bing Webmaster Tools.

---

# ROZDZIAŁ 07 · 9 BŁĘDÓW

## Str. 32 · Plakat rozdziału

- **Numer:** 07
- **Tytuł:** 9 błędów.
- **Lead:** Najczęściej sklep znika z odpowiedzi AI nie przez konkurencję, tylko przez własny robots.txt, firewall
  albo niekompletne dane.
- **W tym rozdziale:** Błędy 1–5 · Błędy 6–9
- **Scena 3D:** marmurowy megafon z pękniętą tubą z turkusowego szkła.

---

## Str. 33 · Błędy 1–5

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** BŁĘDY 1–5

1. **Blokada wszystkich botów AI „na wszelki wypadek”.**
   **Zamiast tego:** zablokuj GPTBot, jeśli chcesz, ale wpuść OAI-SearchBot i PerplexityBot (str. 14).
2. **Mylenie GPTBot z OAI-SearchBot.** Blokada treningu to nie blokada wyszukiwania – i odwrotnie.
   **Zamiast tego:** osobny wpis dla każdego bota (str. 14).
3. **Blokada Google-Extended bez sprawdzenia skutków.**
   **Zamiast tego:** zdecyduj świadomie – blokada wyłącza też grounding w aplikacjach Gemini (str. 14).
4. **Ochrona przed botami, która zatrzymuje także boty wyszukiwarek.**
   **Zamiast tego:** wyjątki dla oficjalnych adresów IP i ustawienia Cloudflare (str. 15).
5. **Cena i dostępność tylko w grafice albo w skrypcie.**
   **Zamiast tego:** kluczowe informacje w tekście strony (str. 17).

---

## Str. 34 · Błędy 6–9

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** BŁĘDY 6–9

6. **Pliki „dla AI” zamiast porządnych kart produktów.**
   **Zamiast tego:** kompletna karta produktu (str. 19). Google pisze, że takich plików nie potrzebuje.
7. **Opis producenta skopiowany jak w 50 innych sklepach.**
   **Zamiast tego:** własny opis: dla kogo i jaki problem rozwiązuje (str. 19).
8. **Kupowanie opinii albo artykułów bez oznaczenia.**
   **Zamiast tego:** prawdziwe opinie i oznaczone współprace (str. 24–26).
9. **Ocena po jednym teście albo po liczbie sesji.**
   **Zamiast tego:** test co miesiąc i przychód na sesję z kanału Asystent AI (str. 28 i 31).

---

# ROZDZIAŁ 08 · BADANIE

## Str. 35 · Plakat rozdziału

- **Numer:** 08
- **Tytuł:** Badanie.
- **Lead:** Sprawdź swój sklep w 10 punktach i zobacz, kogo asystenci AI polecają Polakom w 5 kategoriach.
- **W tym rozdziale:** Test sklepu w 10 punktach · 50 pytań w 4 asystentach
- **Scena 3D:** marmurowa lupa nad dymkami z turkusowego szkła.

---

## Str. 36 · Test sklepu w 10 punktach

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** TEST SKLEPU W 10 PUNKTACH

**Lead:** Odhacz każdy punkt. Pierwsze 4 to widoczność techniczna, kolejne 6 – dane, opinie i pomiar.

1. ☐ OAI-SearchBot, Googlebot, Bingbot i PerplexityBot są wpuszczone w robots.txt i w ochronie przed botami.
2. ☐ Decyzja o GPTBot i Google-Extended jest świadoma i zapisana.
3. ☐ Karty produktów nie mają `noindex` ani `nosnippet`.
4. ☐ Cena, dostępność i dostawa są w tekście karty produktu.
5. ☐ 20 najlepiej sprzedających się produktów ma tytuły z marką i cechą, GTIN i własny opis.
6. ☐ Dane strukturalne Product zgadzają się z tekstem na stronie.
7. ☐ Merchant Center nie ma błędów, a bezpłatne informacje o produktach są włączone.
8. ☐ Opinie są na kartach produktów, z informacją o weryfikacji.
9. ☐ Kanał „Asystent AI” w GA4 jest sprawdzony, a sklep – dodany do Bing Webmaster Tools.
10. ☐ Test 10 pytań jest w kalendarzu co miesiąc.

**Wynik:** brak w punktach 1–4 – popraw najpierw technikę. Brak w punktach 5–10 – to plan na najbliższy kwartał.

---

## Str. 37 · 50 pytań w 4 asystentach

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** NASZE BADANIE: 50 PYTAŃ W 4 ASYSTENTACH

**Lead:** Kogo asystenci AI polecają, gdy Polak pyta o zakup – sklepy, marketplace'y, porównywarki czy producentów?

**Metoda:**

- **Pytania:** 50 w 5 kategoriach (dom i ogród, sport, uroda, dziecko, elektronika), według 10 typów ze str. 10.
- **Asystenci:** ChatGPT, Gemini, Google (przegląd od AI albo Tryb AI) i Copilot – 200 odpowiedzi.
- **Jak:** ręcznie, w zwykłych aplikacjach, bez historii rozmów, w jednym tygodniu. Każde pytanie zadane 2 razy, bo
  odpowiedzi się zmieniają.
- **Co zapisujemy:** wymienione sklepy i marki, linki, źródła pod odpowiedzią, czy padła cena i dostępność.
- **Kiedy:** 1–12.03.2027.
- **Ograniczenia:** odpowiedzi zależą od dnia, konta i wersji modelu – wynik to zdjęcie z jednego tygodnia.

**Wyniki:** **[DO UZUPEŁNIENIA]** – udział sklepów internetowych, marketplace'ów, porównywarek i producentów
w poleceniach oraz odsetek odpowiedzi z linkiem do sklepu.

**[DO DECYZJI do 15.02.2027]:** czy robimy badanie i kto zadaje pytania. Bez badania ta strona zmienia się w „Jak
powtarzać test co miesiąc”.

---

## Str. 38 · Ściąga na 1 stronę

**Nagłówek:** ŚCIĄGA
**Lead:** Wydrukuj i odhaczaj. Numery stron prowadzą do szczegółów.

**Test**

- 10 pytań w 4 asystentach, kody P, W, Z, 0 (str. 9–11)
- Wynik widoczności co miesiąc (str. 12)

**Technika**

- Boty wyszukiwarek AI wpuszczone, decyzja o GPTBot i Google-Extended (str. 14)
- Ochrona przed botami z wyjątkami (str. 15)
- Test techniczny w 8 punktach (str. 16)

**Dane i opinie**

- Karta produktu w 10 punktach (str. 19)
- Dane strukturalne i Merchant Center (str. 20–21)
- Opinie z informacją o weryfikacji (str. 24)

**Pomiar**

- Kanał „Asystent AI” w GA4, Search Console, Bing AI Performance (str. 28–30)
- 8 liczb co miesiąc (str. 31)

**Moje liczby:** wynik widoczności …… % · sesje z AI …… · przychód na sesję z AI …… zł · cytowane strony w Bing ……

---

## Str. 39 · 3 kolejne kroki

**Nagłówek:** CO DALEJ · 3 KOLEJNE KROKI
**Lead:** Sprawdź sam albo zrób to z nami.

1. **Test widoczności w AI · 0 zł.** 10 pytań z Twojej kategorii w 4 asystentach i przegląd robots.txt oraz ochrony
   przed botami. **[DO DECYZJI: nazwa, termin odpowiedzi]**
2. **Audyt SEO.** Technika, dane produktów, Merchant Center i dane strukturalne – z listą poprawek według ważności.
   **[DO DECYZJI: cena]**
3. **SEO on-page.** Karty produktów, kategorie i poradniki, które odpowiadają na pytania klientów. **[DO DECYZJI: cena
   lub „wycena po audycie”]**

**Kontakt:** ksign.pl · hello@ksign.pl · 606 576 517
**Przycisk:** Zamów test widoczności w AI

---

## Str. 40 · Słowniczek i źródła

**Nagłówek:** SŁOWNICZEK I ŹRÓDŁA

**Słowniczek:**

- **Asystent AI** – czatbot, który odpowiada na pytania i poleca strony, np. ChatGPT, Gemini, Copilot.
- **Przegląd od AI** – odpowiedź AI nad wynikami wyszukiwania Google, z linkami do źródeł.
- **Tryb AI** – osobny tryb wyszukiwarki Google do złożonych pytań, z odpowiedzią AI i linkami.
- **Grounding** – oparcie odpowiedzi AI na stronach znalezionych w wyszukiwarce w chwili pytania.
- **robots.txt** – plik z zasadami dla botów: które mogą odwiedzać stronę, a które nie.
- **OAI-SearchBot** – bot OpenAI, dzięki któremu strona może się pojawić w wyszukiwaniu ChatGPT.
- **Google-Extended** – wpis w robots.txt, którym decydujesz o użyciu treści do treningu Gemini i grounding w Gemini.
- **Merchant Center** – narzędzie Google do przesyłania danych o produktach.
- **Bezpłatne informacje o produktach** – wyświetlanie produktów z Merchant Center w usługach Google bez opłat.
- **Dane strukturalne** – kod na stronie, który opisuje produkt w sposób zrozumiały dla wyszukiwarek.
- **Wynik widoczności** – suma punktów z testu pytań podzielona przez najwyższy możliwy wynik.

**Źródła:** tabela źródeł z obu części manuskryptu, z datami dostępu (niżej i w `rozdzialy-01-03.md`).

---

## Źródła do rozdziałów 04–08 (trafią na str. 40)

| Fakt                                                                                                        | Źródło                                                                                                                                                                                                                 | Data dostępu |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Dane Product na stronie i plik w Merchant Center; łączenie danych; cena z pliku, gdy brak na stronie        | Google Search Central, „Wprowadzenie do uporządkowanych danych dotyczących produktów”: https://developers.google.com/search/docs/appearance/structured-data/product?hl=pl                                              | 25.09.2026   |
| Bez specjalnych danych schema.org dla funkcji AI; zgodność danych z tekstem                                 | Google Search Central, „Funkcje oparte na AI a Twoja witryna”: https://developers.google.com/search/docs/appearance/ai-features?hl=pl                                                                                  | 25.09.2026   |
| Bezpłatne informacje o produktach: gdzie się wyświetlają, zwroty, dostawa, brak gwarancji wyświetlania      | Pomoc Google Merchant Center, „Bezpłatne informacje o produktach”: https://support.google.com/merchants/answer/9199328?hl=pl                                                                                           | 25.09.2026   |
| Specyfikacja feedu OpenAI: 9 wymaganych pól, opinie o produkcie i sklepie, rynek USA, pliki zgodne z Google | OpenAI Developers, „Products – Agentic Commerce”: https://developers.openai.com/commerce/product-feeds/spec                                                                                                            | 25.09.2026   |
| Dane o produktach od zewnętrznych dostawców albo od sklepów                                                 | OpenAI Help Center, „Shopping with ChatGPT Search” **[SPRAWDZIĆ ręcznie]**                                                                                                                                             | 25.09.2026   |
| GPSR: dane w ofercie sprzedaży na odległość                                                                 | Rozporządzenie (UE) 2023/988, art. 19: https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32023R0988                                                                                                       | 25.09.2026   |
| Opinie: informacja o weryfikacji; zakazane fałszywe i niesprawdzone opinie; kryptoreklama                   | Ustawa z 23.08.2007 r. o przeciwdziałaniu nieuczciwym praktykom rynkowym, t.j. Dz.U. 2023 poz. 845, art. 6 ust. 4 pkt 7, art. 7 pkt 11, 25 i 26                                                                        | 25.09.2026   |
| Zniekształcanie opinii – publikowanie tylko pozytywnych                                                     | Dyrektywa (UE) 2019/2161, motyw 49: https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32019L2161                                                                                                          | 25.09.2026   |
| Oznaczanie współpracy z twórcami                                                                            | „Rekomendacje Prezesa UOKiK dotyczące oznaczania treści reklamowych przez influencerów w mediach społecznościowych”, 2022 (jak w e-booku „TikTok Shop od pierwszego dnia.”)                                            | 25.09.2026   |
| Maskowanie; nadużywanie treści na dużą skalę, także z generatywną AI                                        | Google Search Central, „Zasady dotyczące spamu w wyszukiwarce Google” (ostatnia aktualizacja 2.09.2026): https://developers.google.com/search/docs/essentials/spam-policies?hl=pl                                      | 25.09.2026   |
| GA4: kanał Asystent AI od 13.05.2026; medium ai-assistant; kampania (ai-assistant)                          | Pomoc Google Analytics, „Nowości w Google Analytics”: https://support.google.com/analytics/answer/9164320?hl=pl                                                                                                        | 25.09.2026   |
| Kanał Asystent AI: ChatGPT, Gemini, Deepseek, Copilot, Grok; bez przeglądu od AI i Trybu AI                 | Pomoc Google Analytics, „Domyślna grupa kanałów”: https://support.google.com/analytics/answer/9756891?hl=pl                                                                                                            | 25.09.2026   |
| Niestandardowa grupa kanałów „Asystenci AI” z wyrażeniem regularnym                                         | Pomoc Google Analytics, „Niestandardowe grupy kanałów”: https://support.google.com/analytics/answer/13051316?hl=pl                                                                                                     | 25.09.2026   |
| `utm_source=chatgpt.com` w linkach z ChatGPT                                                                | OpenAI Help Center, „Publishers and Developers – FAQ”: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq **[SPRAWDZIĆ ręcznie]**                                                              | 25.09.2026   |
| Przegląd od AI i Tryb AI w raporcie skuteczności („Sieć”); „lepsza jakość” kliknięć                         | Google Search Central, „Funkcje oparte na AI a Twoja witryna”                                                                                                                                                          | 25.09.2026   |
| Raport AI Performance: cytowane strony, zapytania, trend                                                    | Bing Webmaster Tools, „AI Performance”: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c                                                                                                                   | 25.09.2026   |
| Intencje, tematy, udział w cytowaniach, porównanie – wersja zapoznawcza od 16.06.2026                       | Microsoft Bing Blog, „New AI Visibility Insights in Bing Webmaster Tools” (16.06.2026): https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/ | 25.09.2026   |
| Kanały w GA4 – przykład                                                                                     | `kalkulator.mjs` – dane umowne                                                                                                                                                                                         | –            |

**Uwagi redakcyjne:**

- **Feed OpenAI (str. 22):** specyfikacja zmienia się często – przed premierą sprawdzić, czy standardowy plik objął
  Polskę albo UE. **[SPRAWDZIĆ]**
- **Filtr zapytań-pytań (str. 29)** to przykład redakcji, nie zalecenie Google.
- **Str. 25, pkt 4 i str. 26, pkt 5** – rekomendacje redakcji, bez osobnego źródła.
- **Str. 37** zależy od decyzji o badaniu (plan.md). Przed startem sprawdzić regulaminy asystentów – badanie tylko
  ręczne.
- Kontakt na str. 39 taki sam jak w poprzednich e-bookach.
