# AI POLECA KONKURENCJĘ – manuskrypt, strony 1–17

> Wersja robocza v0.1 · fakty sprawdzone 25.09.2026 · stopka na okładce i stronach: ksign.pl
>
> **Numery „Str. N” to układ roboczy (40 stron, z plakatami rozdziałów jak w poprzednich e-bookach).** W składzie
> numery i odsyłacze liczą się automatycznie.
>
> **Tabele z liczbami wstawia skrypt** – nie poprawiaj ich ręcznie. Po zmianie danych w `kalkulator.mjs`:
> `node kalkulator.mjs --wstaw manuskrypt/rozdzialy-01-03.md && prettier --write manuskrypt/rozdzialy-01-03.md`
>
> **[DO DECYZJI]** – do ustalenia z Karolem. **[SPRAWDZIĆ]** – do potwierdzenia tuż przed publikacją.
>
> Formy grzecznościowe jak w poprzednich e-bookach: „Ty”, „Twój”, „Ciebie” wielką literą. Bez form rodzajowych
> w czasie przeszłym w zwrotach do czytelnika. Przykłady pytań dotyczą lampy – tego samego produktu co w e-booku
> „Allegro to nie twój sklep.”.

---

## Str. 1 · Okładka

- **Tag:** E-BOOK KSIGN · 40 STRON · 20 MINUT **[liczba stron po składzie]**
- **Tytuł:** AI POLECA KONKURENCJĘ.
- **Podtytuł:** Jak trafić do odpowiedzi ChatGPT, Gemini i Google AI. Test pytań zakupowych, dane produktów, opinie
  i pomiar ruchu z asystentów AI.
- **Stopka:** ksign.pl
- **Grafika (scena 3D):** marmurowa dłoń z wyciągniętym palcem wskazującym, jak w posągach mówców. Wskazuje obok –
  na turkusową szklaną torbę zakupową. Przez dłoń biegną świecące turkusowe pęknięcia (kintsugi).

---

## Str. 2 · Dla kogo i jak czytać

**Nagłówek:** DLA KOGO I JAK CZYTAĆ

**Ten e-book jest dla Ciebie, jeśli:**

- Twój sklep dostaje ruch z Google i ma szeroką ofertę – na Shoperze, IdoSell, WooCommerce albo innej platformie,
- klienci coraz częściej przychodzą z pytaniami „ChatGPT mi polecił…”, a Ty nie wiesz, co asystenci mówią o Twojej
  kategorii,
- chcesz wiedzieć, co da się zrobić, a co jest tylko modą.

**Nie jest dla Ciebie, jeśli** szukasz sposobu, żeby kupić miejsce w odpowiedzi asystenta. Tego się nie da – o
reklamach w ChatGPT jest e-book „Nie ma cię w rozmowie”.

**Jak czytać – 20 minut:**

1. **5 minut – rozdziały 01–02.** Kto pyta AI o zakupy i jak w godzinę sprawdzić, czy asystenci polecają Twój sklep.
2. **10 minut – rozdziały 03–05.** Boty, dane produktów, opinie i wzmianki – co widzą asystenci.
3. **5 minut – rozdziały 06–08.** Pomiar w GA4, Search Console i Bing, 9 błędów i test sklepu.
4. **Na koniec – ściąga ze str. 38.** Wydrukuj ją dla osoby, która prowadzi SEO.

Każdy rozdział kończy się ramką **„Do zrobienia dziś”** – od 1 do 3 działań na ten sam dzień.

**Stan wiedzy:** 25.09.2026 (data sprawdzenia faktów – przy premierze sprawdzić ponownie i zaktualizować). Zasady
sprawdziliśmy w dokumentacji Google, OpenAI, Microsoft Bing i Perplexity. Źródła z datami są na str. 40.

**Nota:** Asystenci AI zmieniają się co kilka tygodni. Opisujemy zasady, które producenci podają oficjalnie, a nie
„sztuczki”. Dane w przykładach (arkusz testu, raport z GA4) są umowne.

---

## Str. 3 · Spis treści

| Nr  | Rozdział                              | Co z niego wyniesiesz                                        | Str. |
| --- | ------------------------------------- | ------------------------------------------------------------ | ---- |
| 01  | AI poleca konkurencję                 | Kto pyta AI o zakupy, skąd asystenci biorą sklepy i produkty | 4    |
| 02  | Test pytań                            | 10 pytań w 4 asystentach, arkusz i wynik widoczności         | 8    |
| 03  | Czy AI widzi Twój sklep               | Boty, robots.txt, ochrona przed botami, test techniczny      | 13   |
| 04  | Dane produktów                        | Karta produktu, dane strukturalne, Merchant Center, feed     | 18   |
| 05  | Opinie i wzmianki                     | Opinie, źródła poza sklepem i czego nie robić                | 23   |
| 06  | Pomiar                                | Kanał Asystent AI w GA4, Search Console, raport Bing         | 27   |
| 07  | 9 błędów                              | Co wycina sklep z odpowiedzi i co zrobić zamiast tego        | 32   |
| 08  | Badanie                               | Test sklepu w 10 punktach i 50 pytań w 4 asystentach         | 35   |
| –   | Ściąga · 3 kolejne kroki · Słowniczek | Wersja do wydruku, oferta KSIGN, pojęcia i źródła z datami   | 38   |

---

# ROZDZIAŁ 01 · AI POLECA KONKURENCJĘ

## Str. 4 · Plakat rozdziału

- **Numer:** 01
- **Tytuł:** AI poleca konkurencję.
- **Lead:** Klient pyta asystenta, co kupić. Dostaje odpowiedź z nazwami sklepów – i nie słyszy Twojej.
- **W tym rozdziale:** Klienci już pytają AI · 4 asystenty, 4 źródła · Polecenie to nie reklama
- **Scena 3D:** marmurowa dłoń wskazuje turkusową szklaną torbę (jak na okładce, z innej strony).

---

## Str. 5 · Klienci już pytają AI

**Marker:** [ 01 / AI POLECA KONKURENCJĘ ]
**Nagłówek:** KLIENCI JUŻ PYTAJĄ AI

**Lead:** Ponad połowa badanych internautów korzysta z czatbotów AI. Co czwarty z nich porównuje w nich produkty.

**Kto korzysta z AI (Gemius, „E-commerce w Polsce 2025”):**

- **53% badanych** deklaruje korzystanie z czatbotów i narzędzi AI.
- Z nich **85% korzysta z ChatGPT**, 24% z Gemini, 9% z Copilota, 5% z Perplexity.

**Do czego używają AI przy zakupach (w ciągu 12 miesięcy, osoby korzystające z AI):**

| Cel                                           | Odsetek |
| --------------------------------------------- | ------- |
| Szczegółowe pytania o konkretne produkty      | 33%     |
| Ogólne informacje o kategoriach produktów     | 29%     |
| Inspiracje i pomysły na produkty              | 29%     |
| Porównywanie cech różnych produktów           | 25%     |
| Szukanie najlepszych ofert lub promocji       | 23%     |
| Propozycje alternatywnych produktów lub marek | 20%     |
| Planowanie zakupów (lista, budżet)            | 14%     |

**Co z tego wynika:** co dziesiąty badany internauta prosi AI o alternatywne produkty albo marki (53% × 20%, nasze
wyliczenie). Jeśli asystent nie zna Twojego sklepu, w tej rozmowie wygrywa ktoś inny.

_Gemius, „E-commerce w Polsce 2025”, s. 259–262. Deklaracje badanych, nie pomiar zachowań._

---

## Str. 6 · 4 asystenty, 4 źródła

**Marker:** [ 01 / AI POLECA KONKURENCJĘ ]
**Nagłówek:** 4 ASYSTENTY, 4 ŹRÓDŁA

**Lead:** Każdy asystent bierze strony i produkty z innego miejsca. Dlatego ten sam sklep bywa w jednym, a w innym nie.

| Asystent                             | Skąd bierze strony                                                               | Skąd bierze produkty                                                                   |
| ------------------------------------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **ChatGPT**                          | Własna wyszukiwarka – bot OAI-SearchBot                                          | Dane o produktach i sklepach od zewnętrznych dostawców albo bezpośrednio od sklepów    |
| **Gemini**                           | Indeks wyszukiwarki Google – tzw. grounding, kontrolowany wpisem Google-Extended | Bezpłatne informacje o produktach z Merchant Center mogą się wyświetlać także w Gemini |
| **Google: przegląd od AI i Tryb AI** | Indeks wyszukiwarki Google – te same zasady co w zwykłych wynikach               | Google radzi pilnować aktualności danych w Merchant Center i w profilu firmy           |
| **Copilot**                          | Indeks wyszukiwarki Bing – cytowania widać w Bing Webmaster Tools                | –                                                                                      |

**Co z tego wynika:**

- **Google to 2 z 4 asystentów.** Dobre SEO i Merchant Center pracują i na przegląd od AI, i na Gemini.
- **ChatGPT ma własnego bota.** Jeśli go zablokujesz, Twojej strony nie będzie w odpowiedziach ChatGPT (str. 14).
- **Tryb AI działa w Polsce od 8.10.2025**, przegląd od AI – także po polsku.

_Źródła: dokumentacja Google (funkcje AI, Google-Extended, bezpłatne informacje o produktach), OpenAI (boty, zakupy
w ChatGPT), Bing Webmaster Tools. Gemius 2025: Perplexity używa 5% osób korzystających z AI, więc w teście go
pomijamy._

---

## Str. 7 · Polecenie to nie reklama

**Marker:** [ 01 / AI POLECA KONKURENCJĘ ]
**Nagłówek:** POLECENIE TO NIE REKLAMA

**Lead:** Za miejsce w odpowiedzi asystenta nie zapłacisz. Możesz za to dać mu powody, żeby wybrał Twój sklep.

**Co mówi OpenAI o zakupach w ChatGPT:**

- **Wyniki produktowe ChatGPT wybiera sam** – nie są reklamami ani efektem partnerstw OpenAI.
- **Sklepy układa według:** dostępności, ceny, jakości i tego, czy sklep jest producentem albo głównym sprzedawcą
  produktu.
- **Dane bierze od zewnętrznych dostawców albo od sklepów.** Tytuły i opisy może uprościć.
- **Cena w pierwszej odpowiedzi** to zwykle cena pierwszego sklepu na liście – niekoniecznie najniższa.

**Co mówi Google:** Tryb AI korzysta z tych samych podstawowych systemów jakości i rankingu co wyszukiwarka. Do
przeglądu od AI i Trybu AI „nie ma żadnych dodatkowych wymagań”.

**Reklamy w ChatGPT** są oddzielone od odpowiedzi i oznaczone jako sponsorowane – o nich jest e-book „Nie ma cię
w rozmowie”.

**Wniosek:** asystent wybierze Twój sklep, jeśli zna Twoje produkty, cenę i dostępność, ma sygnały jakości (opinie,
wzmianki) i widzi, że jesteś producentem albo głównym sprzedawcą. Temu służą rozdziały 03–05.

> **Do zrobienia dziś**
>
> 1. Zadaj w ChatGPT jedno pytanie: „Gdzie kupić [Twój najlepiej sprzedający się produkt]?”. Zapisz, kogo poleca.
> 2. Zrób to samo w Google i sprawdź, czy pojawia się przegląd od AI.

---

# ROZDZIAŁ 02 · TEST PYTAŃ

## Str. 8 · Plakat rozdziału

- **Numer:** 02
- **Tytuł:** Test pytań.
- **Lead:** Zanim cokolwiek poprawisz, sprawdź, co asystenci mówią dziś o Twojej kategorii. To zajmie godzinę.
- **W tym rozdziale:** Test w godzinę · 10 typów pytań · Arkusz testu · Wynik widoczności
- **Scena 3D:** marmurowa waga szalkowa, na szalkach turkusowe szklane znaki zapytania.

---

## Str. 9 · Test w godzinę

**Marker:** [ 02 / TEST PYTAŃ ]
**Nagłówek:** TEST W GODZINĘ

**Lead:** 10 pytań, 4 asystenty, 40 odpowiedzi. Wystarczy arkusz i przeglądarka.

1. **Wybierz 10 pytań** – takich, jakie zadają Twoi klienci. Typy pytań są na str. 10.
2. **Zadaj je tego samego dnia w 4 asystentach:** ChatGPT, Gemini, Google (przegląd od AI albo Tryb AI) i Copilot.
3. **Użyj okna prywatnego albo konta bez historii.** ChatGPT bierze pod uwagę kontekst rozmowy, np. pamięć
   i instrukcje użytkownika – Twoje wcześniejsze rozmowy o sklepie zafałszują wynik.
4. **Zapisz dla każdej odpowiedzi kod:** P – poleca Twój sklep albo produkt z linkiem, W – wymienia go bez linku,
   Z – Twoja strona jest tylko w źródłach, 0 – brak.
5. **Zapisz, kto jest zamiast Ciebie:** sklep, marketplace, porównywarka, producent, media.
6. **Powtarzaj co miesiąc** z tym samym zestawem pytań.

**Uwaga:** odpowiedzi się zmieniają – nawet Google pisze, że przegląd od AI i Tryb AI mogą pokazywać różne odpowiedzi
i linki. Jeden test to zdjęcie, nie wyrok. Porównuj trend z kolejnych miesięcy.

---

## Str. 10 · 10 typów pytań

**Marker:** [ 02 / TEST PYTAŃ ]
**Nagłówek:** 10 TYPÓW PYTAŃ

**Lead:** Mieszaj pytania ogólne i te z nazwą marki. Tylko wtedy zobaczysz, czy AI zna Twoją kategorię, czy tylko
Ciebie.

| Typ         | Przykład (lampa)                       | Co sprawdza                                         |
| ----------- | -------------------------------------- | --------------------------------------------------- |
| Potrzeba    | „Jaka lampa do czytania w łóżku?”      | Czy AI kojarzy Cię z problemem klienta              |
| Budżet      | „Lampa stołowa do 200 zł – co wybrać?” | Czy AI zna Twoje ceny i dostępność                  |
| Kategoria   | „Lampa z ciepłym światłem do salonu”   | Widoczność w całej kategorii                        |
| Marka       | „[Twoja marka] lampy – opinie”         | Co AI wie o Twojej marce i skąd                     |
| Porównanie  | „[Twoja marka] czy [konkurent]?”       | Jak AI Cię opisuje na tle konkurencji               |
| Gdzie kupić | „Gdzie kupić lampę [model]?”           | Czy linkuje do Twojego sklepu, czy do marketplace'u |
| Ranking     | „Najlepsze lampy biurkowe 2027”        | Czy jesteś w rankingach, z których AI korzysta      |
| Porada      | „Jaka żarówka do lampy do czytania?”   | Czy Twoje poradniki są źródłem odpowiedzi           |
| Problem     | „Lampa, która nie męczy oczu”          | Czy opisujesz korzyści, a nie tylko parametry       |
| Pochodzenie | „Lampy polskich producentów”           | Czy AI wie, kim jesteś i skąd                       |

**Najważniejsze są pytania bez nazwy marki.** Na pytanie z Twoją nazwą asystent zwykle Cię znajdzie. Na pytanie
o potrzebę – już niekoniecznie.

---

## Str. 11 · Arkusz testu

**Marker:** [ 02 / TEST PYTAŃ ]
**Nagłówek:** ARKUSZ TESTU

**Lead:** Tak wygląda wypełniony arkusz. Jedna kolumna na asystenta, jeden kod na odpowiedź.

<!-- tabela:arkusz -->

| Pytanie                              | Typ         | ChatGPT | Gemini | Google | Copilot |
| ------------------------------------ | ----------- | ------- | ------ | ------ | ------- |
| Jaka lampa do czytania w łóżku?      | potrzeba    | –       | Z      | W      | –       |
| Lampa stołowa do 200 zł – co wybrać? | budżet      | –       | –      | Z      | –       |
| Lampa z ciepłym światłem do salonu   | kategoria   | W       | Z      | P      | –       |
| [Twoja marka] lampy – opinie         | marka       | P       | P      | P      | W       |
| [Twoja marka] czy [konkurent]?       | porównanie  | W       | W      | P      | Z       |
| Gdzie kupić lampę [model]?           | gdzie kupić | Z       | W      | P      | –       |
| Najlepsze lampy biurkowe 2027        | ranking     | –       | –      | Z      | –       |
| Jaka żarówka do lampy do czytania?   | porada      | –       | Z      | Z      | –       |
| Lampa, która nie męczy oczu          | problem     | –       | –      | –      | –       |
| Lampy polskich producentów           | pochodzenie | W       | –      | W      | –       |

<!-- /tabela:arkusz -->

**Kody:** P – poleca z linkiem (3 pkt) · W – wymienia bez linku (2 pkt) · Z – strona w źródłach pod odpowiedzią
(1 pkt) · – – brak (0 pkt).

**W osobnej kolumnie zapisz, kto jest zamiast Ciebie.** To ważniejsze niż sam wynik – pokazuje, skąd asystent bierze
wiedzę o Twojej kategorii.

_Przykład – dane umowne. Arkusz do pobrania: **[DO DECYZJI: wersja w Google Sheets]**._

---

## Str. 12 · Wynik widoczności

**Marker:** [ 02 / TEST PYTAŃ ]
**Nagłówek:** WYNIK WIDOCZNOŚCI

**Lead:** Suma punktów podzielona przez najwyższy możliwy wynik. Jedna liczba, którą porównasz za miesiąc.

<!-- tabela:wynik -->

| Asystent                         | Poleca (3 pkt) | Wymienia (2 pkt) | Źródło (1 pkt) | Brak | Wynik widoczności |
| -------------------------------- | -------------- | ---------------- | -------------- | ---- | ----------------- |
| ChatGPT                          | 1              | 3                | 1              | 5    | 33%               |
| Gemini                           | 1              | 2                | 3              | 4    | 33%               |
| Google: przegląd od AI i Tryb AI | 4              | 2                | 3              | 1    | 63%               |
| Copilot                          | 0              | 1                | 1              | 8    | 10%               |
| **Razem**                        |                |                  |                |      | **35%**           |

<!-- /tabela:wynik -->

**Wzór:**

> Wynik widoczności = suma punktów ÷ (3 pkt × liczba pytań)

**Kto jest zamiast Ciebie – i co z tym zrobić:**

- **Marketplace (Allegro, Amazon).** AI zna Twój produkt, ale nie Twój sklep. Zadbaj o dane i markę we własnym sklepie
  (rozdział 04 i e-book „Allegro to nie twój sklep.”).
- **Porównywarka.** AI korzysta z danych o cenach i dostępności. Sprawdź swój feed i Merchant Center (str. 21).
- **Producent albo marka.** AI woli źródło, które „wie najwięcej”. Pokaż, że jesteś producentem albo oficjalnym
  sprzedawcą (str. 19).
- **Media i rankingi.** AI cytuje artykuły „najlepsze…”. Potrzebujesz wzmianek poza sklepem (str. 25).

> **Do zrobienia dziś**
>
> 1. Wybierz 10 pytań z Twojej kategorii (po jednym z każdego typu).
> 2. Zrób test w jednym asystencie i policz wynik. Pozostałe 3 – w tym tygodniu.

---

# ROZDZIAŁ 03 · CZY AI WIDZI TWÓJ SKLEP

## Str. 13 · Plakat rozdziału

- **Numer:** 03
- **Tytuł:** Czy AI widzi Twój sklep.
- **Lead:** Asystent nie poleci strony, której jego bot nie może odwiedzić. Najczęściej blokuje go ktoś we własnej
  firmie – i nawet o tym nie wie.
- **W tym rozdziale:** Boty i robots.txt · Ochrona przed botami · Test techniczny · Treść, którą da się zacytować
- **Scena 3D:** marmurowe drzwi z zamkiem z turkusowego szkła, uchylone.

---

## Str. 14 · Boty i robots.txt

**Marker:** [ 03 / CZY AI WIDZI TWÓJ SKLEP ]
**Nagłówek:** BOTY I ROBOTS.TXT

**Lead:** Każdy asystent ma osobne boty: do wyszukiwania, do treningu modeli i do wizyt na prośbę użytkownika.
Blokujesz je niezależnie.

| Bot             | Czyj       | Do czego służy                                                                     | Co ustawić                                                                      |
| --------------- | ---------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| OAI-SearchBot   | OpenAI     | Pokazuje strony w wyszukiwaniu ChatGPT                                             | Wpuść – bez niego nie ma Cię w odpowiedziach                                    |
| GPTBot          | OpenAI     | Zbiera treści do trenowania modeli                                                 | Twoja decyzja – nie wpływa na wyszukiwanie                                      |
| ChatGPT-User    | OpenAI     | Wizyty na prośbę użytkownika; robots.txt może go nie dotyczyć                      | Nie blokuj w firewallu                                                          |
| Googlebot       | Google     | Wyszukiwarka, także przegląd od AI i Tryb AI                                       | Wpuść                                                                           |
| Google-Extended | Google     | Trening modeli Gemini i grounding w aplikacjach Gemini; nie wpływa na wyszukiwarkę | Blokada = Twoje treści nie trafią do odpowiedzi Gemini opartych na wyszukiwarce |
| Bingbot         | Microsoft  | Wyszukiwarka Bing, na której opiera się Copilot                                    | Wpuść                                                                           |
| PerplexityBot   | Perplexity | Pokazuje strony w wynikach Perplexity; nie służy do treningu                       | Wpuść                                                                           |

**Przykład robots.txt (fragment):**

```
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# tylko jeśli nie chcesz, żeby Twoje treści trafiały do treningu modeli OpenAI:
User-agent: GPTBot
Disallow: /
```

**Ile to trwa:** OpenAI uwzględnia zmianę w robots.txt po około 24 godzinach, Perplexity – do 24 godzin.

**Treści w odpowiedziach Google ograniczysz** tylko tak jak w wyszukiwarce: `nosnippet`, `data-nosnippet`,
`max-snippet` albo `noindex`. Nie rób tego na kartach produktów.

---

## Str. 15 · Firewall i ochrona przed botami

**Marker:** [ 03 / CZY AI WIDZI TWÓJ SKLEP ]
**Nagłówek:** FIREWALL I OCHRONA PRZED BOTAMI

**Lead:** Robots.txt to nie wszystko. Ochrona przed botami potrafi zatrzymać bota, zanim ten przeczyta robots.txt.

**Co zobaczyliśmy w badaniu:** 24 ze 100 polskich sklepów zatrzymały nasz automat ochroną przed botami (badanie
z 24.09.2026 do e-booka „Nie ma cię w rozmowie”). Ta sama ochrona może zatrzymać boty wyszukiwarek AI.

**Co zalecają producenci:**

- **OpenAI:** wpuść OAI-SearchBot w robots.txt i dopuść żądania z opublikowanej listy adresów IP
  (openai.com/searchbot.json).
- **Perplexity:** jeśli używasz firewalla aplikacji (WAF), dodaj PerplexityBot do wyjątków; adresy IP publikuje
  na perplexity.com/perplexitybot.json.
- **Google:** sprawdź, czy indeksowania nie blokuje robots.txt ani sieć CDN czy hosting.
- **Cloudflare:** dzieli boty AI na 3 grupy: wyszukiwanie, agenci i trening. Od 15.09.2026 nowe domeny mają domyślnie
  zablokowane boty treningowe i agentów na stronach z reklamami, a boty wyszukiwania – dozwolone. Sprawdź ustawienia
  swojej domeny.

**Pytanie do hostingu albo informatyka:** „Czy nasza ochrona przed botami przepuszcza OAI-SearchBot, Googlebota,
Bingbota i PerplexityBot – z ich oficjalnych adresów IP?”

---

## Str. 16 · Test techniczny w 15 minut

**Marker:** [ 03 / CZY AI WIDZI TWÓJ SKLEP ]
**Nagłówek:** TEST TECHNICZNY W 15 MINUT

**Lead:** 8 punktów, które sprawdzisz bez programisty. Każde „nie” to powód, dla którego asystent może Cię pominąć.

1. ☐ **robots.txt** (twojsklep.pl/robots.txt) nie blokuje OAI-SearchBot, Googlebota, Bingbota ani PerplexityBot.
2. ☐ **Google-Extended** – decyzja o blokadzie jest świadoma (str. 14).
3. ☐ **Search Console:** narzędzie do sprawdzania adresów URL pokazuje, że Google widzi kartę produktu z ceną
   i opisem.
4. ☐ **Bing Webmaster Tools:** sklep jest dodany i zweryfikowany – bez tego nie zobaczysz cytowań w Copilot (str. 30).
5. ☐ **Karty produktów** nie mają `noindex` ani `nosnippet`.
6. ☐ **Cena, dostępność i dostawa** są w tekście strony, nie tylko w obrazku albo skrypcie.
7. ☐ **Ochrona przed botami** przepuszcza boty wyszukiwarek AI (str. 15).
8. ☐ **Mapa witryny** (sitemap.xml) zawiera karty produktów i jest zgłoszona w Search Console i Bing.

**Wynik:** 8 × „tak” – przejdź do danych produktów (rozdział 04). Każde „nie” – popraw najpierw to.

---

## Str. 17 · Treść, którą da się zacytować

**Marker:** [ 03 / CZY AI WIDZI TWÓJ SKLEP ]
**Nagłówek:** TREŚĆ, KTÓRĄ DA SIĘ ZACYTOWAĆ

**Lead:** Asystent cytuje zdania. Jeśli najważniejsze informacje są w grafice albo w zwiniętej zakładce, nie ma czego
cytować.

**Co zaleca Google (dla przeglądu od AI i Trybu AI):**

- ważne treści w formie tekstowej,
- linki wewnętrzne, dzięki którym treść łatwo znaleźć,
- zdjęcia i filmy dobrej jakości jako uzupełnienie tekstu,
- dane strukturalne zgodne z tekstem widocznym na stronie,
- aktualne informacje w Merchant Center i w profilu firmy.

**Czego nie potrzebujesz:** Google pisze wprost, że do funkcji AI w wyszukiwarce nie trzeba tworzyć nowych plików
„dla AI” ani specjalnych znaczników schema.org. Zamiast tego popraw treść, którą już masz.

**3 zdania, które każda karta produktu powinna mieć w tekście:**

1. Dla kogo jest produkt i jaki problem rozwiązuje („lampa do czytania, która nie oślepia osoby obok”).
2. Najważniejsze parametry w liczbach (moc, barwa światła, wymiary, materiał).
3. Warunki zakupu: cena, dostępność, czas i koszt dostawy, zwroty.

> **Do zrobienia dziś**
>
> 1. Otwórz twojsklep.pl/robots.txt i sprawdź wpisy dla botów z tabeli na str. 14.
> 2. Zapytaj hosting, czy ochrona przed botami przepuszcza boty wyszukiwarek AI.
> 3. Zrób test techniczny ze str. 16.

---

## Źródła do rozdziałów 01–03 (trafią na str. 40)

| Fakt                                                                                                                                                              | Źródło                                                                                                                                                                                   | Data dostępu |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 53% badanych korzysta z AI; ChatGPT 85%, Gemini 24%, Copilot 9%, Perplexity 5%; cele zakupowe                                                                     | Gemius, „E-commerce w Polsce 2025”, s. 259–262 (wszyscy respondenci N=1629; korzystający z AI N=840): https://gemius.com/documents/81/RAPORT_E-COMMERCE_2025.pdf                         | 25.09.2026   |
| Brak dodatkowych wymagań dla przeglądu od AI i Trybu AI; zalecenia; brak potrzeby plików „dla AI”; nosnippet i noindex; Google-Extended                           | Google Search Central, „Funkcje oparte na AI a Twoja witryna” (ostatnia aktualizacja 10.12.2025): https://developers.google.com/search/docs/appearance/ai-features?hl=pl                 | 25.09.2026   |
| Google-Extended: trening Gemini i grounding w aplikacjach Gemini                                                                                                  | Google, „Google's common crawlers”: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers                                                                   | 25.09.2026   |
| Tryb AI w Polsce od 8.10.2025; korzysta z podstawowych systemów jakości i rankingu                                                                                | Blog Google Polska, „Wyszukiwarka Google: wprowadzamy Tryb AI w Polsce” (8.10.2025): https://blog.google/intl/pl-pl/nowosci-produktowe/wyszukiwarka-google-wprowadzamy-tryb-ai-w-polsce/ | 25.09.2026   |
| Przegląd od AI dostępny w Polsce i po polsku                                                                                                                      | Pomoc Google, „Przegląd od AI w wyszukiwarce Google”: https://support.google.com/websearch/answer/14901683?hl=pl                                                                         | 25.09.2026   |
| Bezpłatne informacje o produktach także w Gemini                                                                                                                  | Pomoc Google Merchant Center, „Bezpłatne informacje o produktach”: https://support.google.com/merchants/answer/9199328?hl=pl                                                             | 25.09.2026   |
| Boty OpenAI: OAI-SearchBot, GPTBot, ChatGPT-User; około 24 godzin; adresy IP                                                                                      | OpenAI, „Overview of OpenAI Crawlers”: https://platform.openai.com/docs/bots                                                                                                             | 25.09.2026   |
| Zakupy w ChatGPT: wyniki nie są reklamami; kryteria kolejności sklepów; dane od dostawców i sklepów; uproszczone tytuły; cena pierwszego sklepu; kontekst rozmowy | OpenAI Help Center, „Shopping with ChatGPT Search”: https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search **[SPRAWDZIĆ ręcznie]**                                    | 25.09.2026   |
| Boty Perplexity: PerplexityBot, Perplexity-User; do 24 godzin; WAF i adresy IP                                                                                    | Perplexity, „Perplexity Crawlers”: https://docs.perplexity.ai/docs/resources/perplexity-crawlers                                                                                         | 25.09.2026   |
| Copilot i odpowiedzi AI w Bing – cytowania w raporcie AI Performance                                                                                              | Bing Webmaster Tools, „AI Performance”: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c                                                                                     | 25.09.2026   |
| Cloudflare: kategorie botów AI i nowe ustawienia domyślne od 15.09.2026                                                                                           | Cloudflare Docs, „Block AI Bots” (ostatnia aktualizacja 1.07.2026): https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/                                      | 25.09.2026   |
| 24 ze 100 sklepów zatrzymało automat ochroną przed botami                                                                                                         | Badanie KSIGN z 24.09.2026 (e-book „Nie ma cię w rozmowie”, str. 35–36; dane w `ebook/chatgpt-ads/badanie/`)                                                                             | 24.09.2026   |
| Arkusz testu i wynik widoczności                                                                                                                                  | Przykład w `kalkulator.mjs` – dane umowne                                                                                                                                                | –            |

**Uwagi redakcyjne:**

- **OpenAI Help Center** blokował 25.09.2026 automatyczne pobieranie (403 i strona weryfikacji). Treść artykułu
  „Shopping with ChatGPT Search” potwierdziliśmy w cytatach z wyników wyszukiwania. Przed publikacją otworzyć stronę
  w przeglądarce i sprawdzić każde zdanie ze str. 7. **[SPRAWDZIĆ]**
- **„Co dziesiąty internauta”** (str. 5) to nasze wyliczenie: 53% × 20%. Opiera się na deklaracjach.
- **Copilot – skąd bierze produkty:** Microsoft nie opisuje tego w materiałach, które sprawdziliśmy – w tabeli
  zostawiamy kreskę.
- **Tabela botów (str. 14)** – kolumna „Co ustawić” to nasza rekomendacja. Decyzja o GPTBot i Google-Extended należy do
  właściciela sklepu (trening modeli), ale blokada Google-Extended wyłącza też grounding w aplikacjach Gemini.
