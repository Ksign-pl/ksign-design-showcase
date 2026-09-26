# SKLEP NA AUTOPILOCIE – manuskrypt, strony 20–40

> Wersja robocza v0.1 · fakty sprawdzone 26.09.2026 · zasady jak w `rozdzialy-01-03.md`.

---

# ROZDZIAŁ 04 · AI W SKLEPIE

## Str. 20 · Plakat rozdziału

- **Numer:** 04
- **Tytuł:** AI w sklepie.
- **Lead:** AI pisze szybko, ale nie zna Twojego produktu. Daj jej fakty, szablon i zasady – a ostatnie słowo zostaw
  sobie.
- **W tym rozdziale:** Opisy i treści z AI · Chatbot zgodnie z prawem · Gotowe prompty
- **Scena 3D:** marmurowa dłoń trzymająca turkusowe szklane pióro.

---

## Str. 21 · Opisy i treści z AI

**Marker:** [ 04 / AI W SKLEPIE ]
**Nagłówek:** OPISY I TREŚCI Z AI

**Lead:** Google nie ocenia tekstu po tym, czy napisała go AI. Ocenia jakość – a treści tworzone głównie pod ranking
uznaje za spam.

**Co pisze Google (8.02.2023):**

- skupia się na jakości treści, a nie na sposobie ich tworzenia,
- nagradza oryginalne treści wysokiej jakości, tworzone z myślą o użytkownikach,
- automatyzacja, także AI, użyta głównie do manipulowania rankingiem narusza zasady Google dotyczące spamu.

**Co mówi prawo:** nieprawdziwa informacja o cechach produktu – np. jakości, składnikach, sposobie wykonania albo
spodziewanych efektach – to działanie wprowadzające w błąd, jeśli może skłonić klienta do zakupu, którego inaczej by
nie zrobił (art. 5 ust. 1, ust. 2 pkt 1 i ust. 3 pkt 2 ustawy o przeciwdziałaniu nieuczciwym praktykom rynkowym). Za
opis odpowiada sklep, nie narzędzie, które go napisało.

**Lista akceptacji opisu – 5 pytań:**

1. Czy każda cecha jest w danych produktu?
2. Czy wymiary, materiał i skład zgadzają się z kartą od producenta?
3. Czy nie ma obietnic, których nie udowodnisz, np. efektów zdrowotnych?
4. Czy nie ma „najlepszy na rynku” bez dowodu?
5. Czy tekst brzmi jak Twoja marka i ma jedno wezwanie do działania?

**Nasza zasada:** publikuj tylko opisy, które przeszły te 5 pytań. Setki opisów bez sprawdzenia to ryzyko dla
klientów i dla pozycji w Google.

---

## Str. 22 · Chatbot AI zgodnie z prawem

**Marker:** [ 04 / AI W SKLEPIE ]
**Nagłówek:** CHATBOT AI ZGODNIE Z PRAWEM

**Lead:** Chatbot odpowiada w nocy i w weekend. Musi jednak mówić, że jest AI, i oddawać trudne sprawy człowiekowi.

**Co mówi unijny akt w sprawie sztucznej inteligencji:**

- **Systemy AI do rozmowy z ludźmi** mają być zaprojektowane tak, żeby rozmówca wiedział, że rozmawia z AI – chyba
  że to oczywiste (art. 50 ust. 1).
- **Informacja jasna i wyraźna**, najpóźniej przy pierwszej interakcji (art. 50 ust. 5).
- **Od 2.08.2026** (art. 113). Zmiany w akcie z lipca 2026 r. (rozporządzenie (UE) 2026/1744) nie przesunęły tego
  obowiązku.

**Kto odpowiada:** art. 50 ust. 1 dotyczy dostawcy systemu. Sprawdź, czy Twoje narzędzie informuje o AI samo. Jeśli
budujesz bota samodzielnie, np. na API modelu AI, możesz być dostawcą. **[SPRAWDZIĆ z prawnikiem]**

**5 zasad bota – nasza rekomendacja:**

1. **Pierwsza wiadomość:** „Jestem asystentem AI sklepu [Sklep]. Pomogę z dostawą, płatnościami i doborem produktu.
   W trudnych sprawach połączę Cię z człowiekiem.”
2. **Odpowiedzi tylko z bazy wiedzy:** regulamin, dostawa, zwroty, najczęstsze pytania.
3. **Bez obietnic spoza regulaminu:** rabatów, terminów, wyjątków.
4. **Reklamacje, zwroty i skargi** – od razu do człowieka (str. 25).
5. **Przegląd 20 rozmów co tydzień** – popraw bazę wiedzy tam, gdzie bot się pomylił.

**RODO:** rozmowa z botem to dane osobowe. Dodaj informację o przetwarzaniu (art. 13 RODO) i sprawdź umowę z
dostawcą (str. 30).

---

## Str. 23 · Gotowe prompty

**Marker:** [ 04 / AI W SKLEPIE ]
**Nagłówek:** GOTOWE PROMPTY

**Lead:** 3 prompty do scenariuszy z rozdziału 03. Każdy ma zakaz dopisywania faktów i „wyjście awaryjne”.

**Prompt 1 – opis produktu (scenariusz 3):**

> Jesteś copywriterem sklepu [Sklep], który sprzedaje [kategoria]. Napisz opis produktu na podstawie danych poniżej.
> Zasady: używaj tylko cech z danych – niczego nie dopisuj. 3 akapity po 2–3 zdania. Na początku korzyść dla klienta,
> potem lista: wymiary, materiał, pielęgnacja. Bez słów „najlepszy”, „rewelacyjny”, „idealny”. Ton: [styl marki].
> Jeśli czegoś brakuje w danych, wpisz „[BRAK DANYCH: …]”. Dane: [wklej wiersz z arkusza]

**Prompt 2 – szkic odpowiedzi klientowi (scenariusze 1 i 10):**

> Przygotuj szkic odpowiedzi na wiadomość klienta. Korzystaj tylko z regulaminu i danych zamówienia poniżej. Jeśli
> wiadomość dotyczy reklamacji, zwrotu pieniędzy albo skargi, nie odpowiadaj merytorycznie – napisz tylko „PRZEKAŻ DO
> WŁAŚCICIELA”. Ton: uprzejmy i konkretny, bez obietnic. Wiadomość: […] Dane zamówienia: […] Regulamin: […]

**Prompt 3 – podsumowanie tygodnia (scenariusz 7):**

> Na podstawie tabeli poniżej napisz 5 zdań dla właściciela sklepu: sprzedaż, zmiana do poprzedniego tygodnia,
> najlepszy produkt, największy problem, jedna rekomendacja. Nie licz nowych liczb – używaj tylko liczb z tabeli.
> Tabela: […]

**Zasada danych:** do narzędzia AI wklejaj tylko to, czego potrzebuje zadanie. Imię, adres i telefon klienta zwykle
nie są potrzebne (str. 30).

> **Do zrobienia dziś**
>
> 1. Przetestuj prompt 1 na 3 produktach i sprawdź opisy listą ze str. 21.
> 2. Sprawdź, czy Twój chatbot mówi w pierwszej wiadomości, że jest AI.

---

# ROZDZIAŁ 05 · CZEGO NIE AUTOMATYZOWAĆ

## Str. 24 · Plakat rozdziału

- **Numer:** 05
- **Tytuł:** Czego nie automatyzować.
- **Lead:** Automat nie przeprasza i nie rozumie wyjątków. Tam, gdzie chodzi o pieniądze klienta i jego zaufanie,
  decyduje człowiek.
- **W tym rozdziale:** Reklamacje i zwroty · Opinie i trudne rozmowy · Człowiek w pętli
- **Scena 3D:** marmurowy przycisk „STOP” w turkusowym szklanym pierścieniu.

---

## Str. 25 · Reklamacje i zwroty

**Marker:** [ 05 / CZEGO NIE AUTOMATYZOWAĆ ]
**Nagłówek:** REKLAMACJE I ZWROTY

**Lead:** Tu błąd automatu kosztuje podwójnie: pieniądze i klienta. Prawo wyznacza też twarde terminy.

**Co mówi ustawa o prawach konsumenta:**

- **Odpowiedź na reklamację – w 14 dni** od jej otrzymania, jeśli przepisy odrębne nie mówią inaczej (art. 7a
  ust. 1).
- **Brak odpowiedzi w terminie = reklamacja uznana** (art. 7a ust. 2).
- **Odpowiedź na papierze albo innym trwałym nośniku**, np. mailem (art. 7a ust. 3).
- **Zwrot pieniędzy po odstąpieniu od umowy** – niezwłocznie, najpóźniej w 14 dni od otrzymania oświadczenia
  klienta, razem z kosztem dostawy do klienta (art. 32 ust. 1). Jeśli nie odbierasz towaru sam, możesz wstrzymać
  zwrot do chwili, gdy towar wróci albo klient pokaże dowód nadania (art. 32 ust. 3).

**RODO:** klient ma prawo nie podlegać decyzji, która opiera się wyłącznie na zautomatyzowanym przetwarzaniu
i wywołuje wobec niego skutki prawne lub w podobny sposób istotnie na niego wpływa – z wyjątkami (art. 22). Dlatego
o reklamacji decyduje człowiek (nasza rekomendacja).

| Automat robi                                     | Człowiek robi                               |
| ------------------------------------------------ | ------------------------------------------- |
| rejestr i termin odpowiedzi (scenariusz 10)      | decyzję: uznać czy odrzucić                 |
| przypomnienia na 7 i 2 dni przed terminem        | treść odpowiedzi                            |
| zbiera zdjęcia, numer zamówienia i opis problemu | zlecenie zwrotu pieniędzy                   |
| szkic odpowiedzi z AI                            | rozmowę z klientem, który jest zdenerwowany |

---

## Str. 26 · Opinie i trudne rozmowy

**Marker:** [ 05 / CZEGO NIE AUTOMATYZOWAĆ ]
**Nagłówek:** OPINIE I TRUDNE ROZMOWY

**Lead:** Opinie budują zaufanie tylko wtedy, gdy są prawdziwe. Tego nie da się zautomatyzować.

**Zakazane w każdej sytuacji:** zamieszczanie lub zlecanie innej osobie zamieszczania nieprawdziwych opinii lub
rekomendacji konsumentów albo zniekształcanie ich w celu promowania produktów (art. 7 pkt 26 ustawy
o przeciwdziałaniu nieuczciwym praktykom rynkowym). Opinia „napisana przez AI” w imieniu klienta jest nieprawdziwa.

**Odpowiedzi na opinie:**

- **AI może przygotować szkic** odpowiedzi na opinię – publikuje człowiek, po przeczytaniu.
- **Nie usuwaj negatywnych opinii** tylko dlatego, że są negatywne. Publikowanie tylko pozytywnych i usuwanie
  negatywnych to przykład zniekształcania opinii z dyrektywy Omnibus (e-book „Drugi zakup jest najtańszy.”, str. 11).

**Sytuacje kryzysowe – wyłącz automaty marketingowe:**

- błąd w cenie albo w opisie promocji,
- opóźnienia wysyłek, awaria płatności,
- sytuacja, w której wesoły post z harmonogramu byłby nie na miejscu.

_Lista kryzysów i „wyłącznik” to nasza rekomendacja – przygotuj je, zanim będą potrzebne (str. 27)._

---

## Str. 27 · Człowiek w pętli

**Marker:** [ 05 / CZEGO NIE AUTOMATYZOWAĆ ]
**Nagłówek:** CZŁOWIEK W PĘTLI

**Lead:** 5 punktów kontroli. Zajmą Ci 30 minut w tygodniu i uchronią przed błędem, który zobaczą wszyscy klienci.

1. **Akceptacja przed publikacją** – opisy, posty i odpowiedzi klientom wychodzą dopiero po Twoim kliknięciu.
2. **Limity** – najwyżej tyle maili z automatu dziennie, ile planujesz. Zwroty pieniędzy zawsze po akceptacji.
3. **Alerty o błędach** – każdy scenariusz zgłasza błąd na Twój telefon (str. 31).
4. **Przegląd tygodniowy** – 10 losowych wyników automatów: czy są poprawne?
5. **Wyłącznik** – lista scenariuszy i instrukcja, jak zatrzymać każdy w minutę.

> **Do zrobienia dziś**
>
> 1. Oznacz na mapie zadań (str. 6) te, które zostają przy człowieku.
> 2. Ustaw przypomnienia o terminie 14 dni dla każdej nowej reklamacji.

---

# ROZDZIAŁ 06 · BEZPIECZEŃSTWO I DANE

## Str. 28 · Plakat rozdziału

- **Numer:** 06
- **Tytuł:** Bezpieczeństwo i dane.
- **Lead:** Automat ma dostęp do sklepu, poczty i danych klientów. Traktuj go jak nowego pracownika: najmniejsze
  uprawnienia i nadzór.
- **W tym rozdziale:** Dostępy i klucze API · Dane osobowe · Gdy scenariusz padnie
- **Scena 3D:** marmurowy sejf z turkusowym szklanym pokrętłem.

---

## Str. 29 · Dostępy i klucze API

**Marker:** [ 06 / BEZPIECZEŃSTWO I DANE ]
**Nagłówek:** DOSTĘPY I KLUCZE API

**Lead:** Klucz API to klucz do sklepu. Kto go ma, może czytać zamówienia albo zmieniać ceny – zależnie od uprawnień.

**6 zasad – nasza rekomendacja:**

1. **Konto firmowe, nie prywatne** – w narzędziu do automatyzacji i w narzędziu AI.
2. **Weryfikacja dwuetapowa** wszędzie, gdzie jest dostępna.
3. **Osobny klucz dla każdego narzędzia i najmniejsze uprawnienia** – klucz do raportu tylko czyta zamówienia. Tak
   zaleca np. dokumentacja IdoSell: jeden klucz na jedną aplikację i odpowiednie uprawnienia do zasobów API.
4. **Lista dostępów:** narzędzie, klucz, uprawnienia, kto ma dostęp, data wydania.
5. **Nowe klucze po odejściu współpracownika** albo agencji.
6. **Klucze nigdy w promptach, arkuszach i mailach.**

---

## Str. 30 · Dane osobowe w automatyzacjach

**Marker:** [ 06 / BEZPIECZEŃSTWO I DANE ]
**Nagłówek:** DANE OSOBOWE W AUTOMATYZACJACH

**Lead:** Każde narzędzie, przez które płyną dane klientów, przetwarza je w Twoim imieniu. RODO wymaga na to umowy.

**Co mówi RODO:**

- **Podmiot przetwarzający** – korzystasz tylko z takich, które dają wystarczające gwarancje ochrony danych
  (art. 28 ust. 1).
- **Umowa powierzenia** – określa m.in. przedmiot, czas, cel i rodzaj danych (art. 28 ust. 3).
- **Minimalizacja danych** – tylko dane niezbędne do celu (art. 5 ust. 1 lit. c).

**Umowy powierzenia narzędzi (stan na 26.09.2026):**

- **Zapier** – umowa (DPA) jest częścią regulaminu; podpisaną kopię wygenerujesz na stronie Zapiera.
- **Make** – umowa jest częścią umowy o korzystanie z usług Make.
- **n8n w chmurze** – gotowa umowa do pobrania, podpisania i odesłania.

**Jak to zrobić w praktyce:**

1. **Sprawdź umowę powierzenia** każdego narzędzia w scenariuszach, także narzędzia AI – i gdzie przetwarza dane.
2. **W scenariuszach używaj numeru zamówienia** zamiast imienia, adresu i telefonu, jeśli wystarczy.
3. **Dopisz narzędzia do polityki prywatności** jako odbiorców danych.
4. **n8n na własnym serwerze** trzyma dane u Ciebie – ale wtedy za bezpieczeństwo serwera odpowiadasz Ty, a umowę
   powierzenia podpisujesz z firmą, u której stoi serwer (nasza ocena).

---

## Str. 31 · Gdy scenariusz padnie

**Marker:** [ 06 / BEZPIECZEŃSTWO I DANE ]
**Nagłówek:** GDY SCENARIUSZ PADNIE

**Lead:** Scenariusz, który przestał działać po cichu, jest gorszy niż brak scenariusza. Ustaw alarm, zanim coś
się zepsuje.

**Co ustawić:**

- **Powiadomienia o błędach:**
  - **Zapier** – własne powiadomienia o błędach we wszystkich płatnych planach.
  - **Make** – mail o błędzie, którego nie przechwyciła obsługa błędów w scenariuszu. Po błędach w kilku
    uruchomieniach z rzędu Make sam wyłącza harmonogram scenariusza – i też wysyła maila.
  - **n8n** – osobny scenariusz błędów (zaczyna się od wyzwalacza Error Trigger), który wysyła Ci maila albo
    wiadomość.
- **Historia uruchomień** – raz w tygodniu sprawdź, czy scenariusze działały i ile zużyły.
- **Limit planu** – w Zapierze po wyczerpaniu zadań scenariusze stają do nowego okresu rozliczeniowego, chyba że
  włączysz dopłatę za każde dodatkowe zadanie (drożej niż w planie). W Make dokupisz kredyty drożej o 25%.
- **Plan B** – na każdy scenariusz jedna kartka: jak zrobić to ręcznie.

**Uwaga na zmiany w sklepie:** nowe pole, nowa wtyczka albo zmiana nazwy statusu mogą zatrzymać scenariusz. Po
każdej takiej zmianie przepuść przez scenariusz 1 testowe zamówienie (nasza rekomendacja).

> **Do zrobienia dziś**
>
> 1. Zrób listę dostępów i sprawdź uprawnienia kluczy API.
> 2. Włącz powiadomienia o błędach dla każdego działającego scenariusza.

---

# ROZDZIAŁ 07 · 9 BŁĘDÓW

## Str. 32 · Plakat rozdziału

- **Numer:** 07
- **Tytuł:** 9 błędów.
- **Lead:** Automat powtarza błąd setki razy – szybciej, niż zdążysz go zauważyć.
- **W tym rozdziale:** Błędy 1–5 · Błędy 6–9
- **Scena 3D:** marmurowe koło zębate z wyłamanym turkusowym szklanym zębem.

---

## Str. 33 · Błędy 1–5

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** BŁĘDY 1–5

1. **Automatyzowanie bałaganu.** Zadanie bez reguły daje automat bez reguły. **Zamiast tego:** najpierw proces
   (str. 8).
2. **10 scenariuszy w tydzień.** Nie wiesz, który działa, a który psuje dane. **Zamiast tego:** 3 na start i miesiąc
   pomiaru (str. 12).
3. **Publikacja bez akceptacji.** Opis z cechą, której produkt nie ma, widzi każdy klient. **Zamiast tego:** lista
   akceptacji (str. 21 i 27).
4. **Chatbot, który nie mówi, że jest AI.** Od 2.08.2026 to wymóg prawa. **Zamiast tego:** informacja w pierwszej
   wiadomości (str. 22).
5. **Reklamacje zamykane przez automat.** Brak odpowiedzi w 14 dni oznacza uznanie reklamacji. **Zamiast tego:**
   automat pilnuje terminu, decyduje człowiek (str. 25).

---

## Str. 34 · Błędy 6–9

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** BŁĘDY 6–9

6. **Opinie pisane przez AI.** Nieprawdziwe opinie to praktyka zakazana w każdej sytuacji. **Zamiast tego:** prośba
   o opinię do prawdziwych klientów (str. 16 i 26).
7. **Klucz API z pełnymi uprawnieniami na prywatnym koncie.** **Zamiast tego:** konto firmowe i najmniejsze
   uprawnienia (str. 29).
8. **Dane klientów w narzędziu bez umowy powierzenia.** **Zamiast tego:** umowa i minimum danych (str. 30).
9. **Brak alertów o błędach.** Scenariusz nie działa od tygodni, a Ty o tym nie wiesz. **Zamiast tego:** powiadomienia
   i przegląd tygodniowy (str. 31).

> **Do zrobienia dziś**
>
> 1. Zaznacz na ściądze ze str. 38 błędy, które masz.
> 2. Zacznij od błędów 4 i 5 – dotyczą aktu o SI i prawa konsumenta.

---

# ROZDZIAŁ 08 · BADANIE

## Str. 35 · Plakat rozdziału

- **Numer:** 08
- **Tytuł:** Badanie.
- **Lead:** Sprawdź, czy sklep jest gotowy na automaty. Potem zobacz, ile czasu naprawdę oszczędzają.
- **W tym rozdziale:** Test gotowości w 10 punktach · Czas 10 zadań: ręcznie i z AI
- **Scena 3D:** marmurowy stoper z turkusową szklaną tarczą.

---

## Str. 36 · Test gotowości w 10 punktach

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** TEST GOTOWOŚCI W 10 PUNKTACH

**Lead:** 10 minut, długopis i mapa zadań. Każde „nie” to zadanie na ten tydzień.

| Nr  | Pytanie                                                               | Tak / nie | Str.   |
| --- | --------------------------------------------------------------------- | --------- | ------ |
| 1   | Czy masz mapę zadań z czasem z tygodnia pomiaru?                      |           | 5–6    |
| 2   | Czy wiesz, ile warta jest Twoja godzina?                              |           | 7      |
| 3   | Czy wybrane zadania mają jasną regułę?                                |           | 8      |
| 4   | Czy narzędzie ma integrację z Twoją platformą?                        |           | 11     |
| 5   | Czy pierwszy scenariusz przeszedł test na 5 przykładach?              |           | 19     |
| 6   | Czy treści z AI przechodzą akceptację przed publikacją?               |           | 21, 27 |
| 7   | Czy chatbot mówi, że jest AI, i przekazuje trudne sprawy człowiekowi? |           | 22     |
| 8   | Czy reklamacje mają przypomnienia o terminie 14 dni?                  |           | 18, 25 |
| 9   | Czy masz listę dostępów i umowy powierzenia?                          |           | 29–30  |
| 10  | Czy dostajesz powiadomienia o błędach scenariuszy?                    |           | 31     |

**Wynik:**

- **9–10 × „tak”** – możesz dodać kolejne scenariusze z mapy.
- **6–8 × „tak”** – najpierw popraw odpowiedzi „nie” w punktach 7–10: prawo i bezpieczeństwo.
- **0–5 × „tak”** – zacznij od tygodnia pomiaru (str. 5).

---

## Str. 37 · Czas 10 zadań: ręcznie i z AI

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** CZAS 10 ZADAŃ: RĘCZNIE I Z AI

**Lead:** Ile czasu naprawdę oszczędzają automaty i AI w małym sklepie – i ile przy tym jest poprawek.
**[DO DECYZJI do 15.06.2027: czy robimy badanie]**

**Metoda:**

- **Zadania:** 10 zadań z mapy (str. 6).
- **Próba:** 10 małych sklepów, które zgodzą się na pomiar.
- **Pomiar:** każde zadanie ręcznie i z automatem albo AI – na tych samych danych. Mierzymy czas, liczbę poprawek
  i błędy znalezione przy sprawdzeniu.
- **Termin:** 1–14.07.2027.

**Wyniki: [DO UZUPEŁNIENIA po badaniu]**

| Zadanie                       | Ręcznie (min)     | Z automatem albo AI (min) | Poprawki          |
| ----------------------------- | ----------------- | ------------------------- | ----------------- |
| Opis nowego produktu          | [DO UZUPEŁNIENIA] | [DO UZUPEŁNIENIA]         | [DO UZUPEŁNIENIA] |
| Odpowiedź na pytanie o paczkę | [DO UZUPEŁNIENIA] | [DO UZUPEŁNIENIA]         | [DO UZUPEŁNIENIA] |
| Raport tygodniowy             | [DO UZUPEŁNIENIA] | [DO UZUPEŁNIENIA]         | [DO UZUPEŁNIENIA] |
| Pozostałe 7 zadań             | [DO UZUPEŁNIENIA] | [DO UZUPEŁNIENIA]         | [DO UZUPEŁNIENIA] |

**Wersja bez badania:** „Tydzień pomiaru w 3 sklepach” – mapa zadań z prawdziwymi czasami od 3 klientów KSIGN (za
zgodą, bez nazw).

---

## Str. 38 · Ściąga na 1 stronę

**Nagłówek:** ŚCIĄGA
**Lead:** Wydrukuj i powieś obok biurka. Numery stron prowadzą do szczegółów.

**Mapa**

- Tydzień pomiaru, mapa 10 zadań (str. 5–6)
- Wartość godziny i zwrot wdrożenia (str. 7–8)

**Narzędzia**

- Zapier, Make czy n8n – model rozliczenia i integracje (str. 10–12)

**Scenariusze**

- 3 scenariusze na start, np. zamówienia do arkusza, status paczki, alert magazynowy (str. 14 i 16)
- Pierwszy scenariusz w 60 minut (str. 19)

**AI i granice**

- Opisy z listą akceptacji, chatbot mówi, że jest AI (str. 21–22)
- Reklamacje: automat pilnuje terminu, decyduje człowiek (str. 25)
- 5 punktów kontroli (str. 27)

**Bezpieczeństwo**

- Konto firmowe, 2FA, najmniejsze uprawnienia, umowy powierzenia, alerty (str. 29–31)

**Moje liczby:** godzin w tygodniu na 10 zadań …… · odzyskane godziny w miesiącu …… · wartość godziny …… zł ·
narzędzie …… · koszt …… zł

---

## Str. 39 · 3 kolejne kroki

**Nagłówek:** CO DALEJ · 3 KOLEJNE KROKI
**Lead:** Zrób to sam albo z nami.

1. **Mapa zadań · 0 zł.** Godzina rozmowy i mapa 10 zadań z wyceną odzyskanych godzin. **[DO DECYZJI: nazwa, termin
   odpowiedzi]**
2. **3 automatyzacje pod klucz.** Wybrane z mapy, w Make albo Zapierze, z alertami o błędach i instrukcją.
   **[DO DECYZJI: cena]**
3. **Chatbot AI dla sklepu.** Baza wiedzy z regulaminu, informacja „rozmawiasz z AI”, przekazanie do człowieka.
   **[DO DECYZJI: cena lub abonament]**

**Kontakt:** ksign.pl · hello@ksign.pl · 606 576 517
**Przycisk:** Zamów mapę zadań

---

## Str. 40 · Słowniczek i źródła

**Nagłówek:** SŁOWNICZEK I ŹRÓDŁA

**Słowniczek:**

- **Scenariusz** – automatyzacja: wyzwalacz i kroki, które wykonują się same.
- **Wyzwalacz** – zdarzenie, które uruchamia scenariusz, np. nowe zamówienie.
- **Krok** – pojedyncza czynność w scenariuszu, np. dodanie wiersza do arkusza.
- **Webhook** – powiadomienie, które sklep wysyła do narzędzia, gdy coś się wydarzy.
- **API** – sposób, w jaki programy wymieniają dane, np. narzędzie pobiera zamówienia ze sklepu.
- **Klucz API** – hasło dla programu, z określonymi uprawnieniami.
- **Zadanie (Zapier)** – jednostka rozliczenia; zadaniem jest każda udana akcja scenariusza, wyzwalacz się nie liczy.
- **Kredyt (Make)** – jednostka rozliczenia; zwykle 1 operacja modułu to 1 kredyt.
- **Wykonanie (n8n)** – jedno pełne uruchomienie scenariusza, bez względu na liczbę kroków.
- **Człowiek w pętli** – zasada, że wynik automatu zatwierdza człowiek przed publikacją lub decyzją.
- **KSeF** – Krajowy System e-Faktur, przez który wystawia się faktury ustrukturyzowane.

**Źródła:** tabela źródeł z obu części manuskryptu, z datami dostępu (niżej i w `rozdzialy-01-03.md`).

---

## Źródła do rozdziałów 04–08 (trafią na str. 40)

| Fakt                                                                                                                                                                       | Źródło                                                                                                                                                                                               | Data dostępu |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Jakość treści, a nie sposób tworzenia; automatyzacja do manipulowania rankingiem to spam                                                                                   | Google Search Central Blog, „Wskazówki wyszukiwarki Google dotyczące treści generowanych przez AI”, 8.02.2023: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content?hl=pl  | 26.09.2026   |
| Nieprawdziwe informacje o cechach produktu jako działanie wprowadzające w błąd; nieprawdziwe i zniekształcone opinie – praktyka zakazana                                   | Ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym, t.j. Dz.U. 2023 poz. 845, art. 5 ust. 1, ust. 2 pkt 1, ust. 3 pkt 2 i art. 7 pkt 26: https://api.sejm.gov.pl/eli/acts/DU/2023/845/text.pdf | 26.09.2026   |
| Informacja o interakcji z AI (art. 50 ust. 1 i 5); stosowanie od 2.08.2026 (art. 113)                                                                                      | Rozporządzenie (UE) 2024/1689 (akt w sprawie sztucznej inteligencji): https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32024R1689                                                      | 26.09.2026   |
| Zmiany w akcie o SI z 8.07.2026 (Dz.U. UE L z 24.07.2026): zmieniony art. 50 ust. 7, okres przejściowy do 2.12.2026 tylko dla art. 50 ust. 2; art. 50 ust. 1 i 5 bez zmian | Rozporządzenie (UE) 2026/1744 (akt zbiorczy prawa cyfrowego dotyczący AI): https://eur-lex.europa.eu/eli/reg/2026/1744/oj/pol                                                                        | 26.09.2026   |
| Odpowiedź na reklamację w 14 dni; brak odpowiedzi = uznanie; trwały nośnik; zwrot płatności w 14 dni; wstrzymanie zwrotu do otrzymania towaru lub dowodu odesłania         | Ustawa z 30.05.2014 r. o prawach konsumenta, t.j. Dz.U. 2026 poz. 1244, art. 7a i art. 32 ust. 1 i 3: https://api.sejm.gov.pl/eli/acts/DU/2026/1244/text.pdf                                         | 26.09.2026   |
| Decyzje oparte wyłącznie na zautomatyzowanym przetwarzaniu; podmiot przetwarzający i umowa; minimalizacja danych; informacja o przetwarzaniu                               | RODO, art. 5 ust. 1 lit. c, art. 13, art. 22, art. 28 ust. 1 i 3: https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32016R0679                                                          | 26.09.2026   |
| Zniekształcanie opinii: publikowanie tylko pozytywnych, usuwanie negatywnych                                                                                               | Dyrektywa (UE) 2019/2161 (Omnibus), motyw 49 – za e-bookiem „Drugi zakup jest najtańszy.”, str. 11                                                                                                   | 26.09.2026   |
| Osobny klucz API dla każdej aplikacji, uprawnienia do zasobów API                                                                                                          | Dokumentacja IdoSell, „Access to the API”: https://idosell.readme.io/docs/access-to-the-api                                                                                                          | 26.09.2026   |
| Zapier: DPA częścią regulaminu, podpisana kopia na żądanie (wersja z 27.08.2026)                                                                                           | Zapier, „Data Processing Addendum”: https://zapier.com/legal/data-processing-addendum                                                                                                                | 26.09.2026   |
| Make: umowa powierzenia częścią umowy o usługi Make (wersja z 3.05.2024)                                                                                                   | Celonis, „Data Processing Agreement for Make”: https://www.make.com/data-processing-agreement.pdf                                                                                                    | 26.09.2026   |
| n8n: umowa powierzenia podpisana przez n8n – do pobrania, podpisania przez klienta i odesłania                                                                             | n8n, „Legal”: https://n8n.io/legal/                                                                                                                                                                  | 26.09.2026   |
| Zapier: powiadomienia o błędach we wszystkich płatnych planach; po wyczerpaniu zadań pauza albo droższe zadania dodatkowe                                                  | Zapier, „Plans & Pricing” (lista funkcji i FAQ): https://zapier.com/pricing                                                                                                                          | 26.09.2026   |
| Make: mail o nieobsłużonym błędzie; wyłączenie harmonogramu po błędach w kolejnych uruchomieniach                                                                          | Centrum pomocy Make, „Introduction to errors and warnings”: https://help.make.com/Introduction-to-errors-and-warnings                                                                                | 26.09.2026   |
| Make: dodatkowe kredyty droższe o 25% niż w planie (od 6.11.2025)                                                                                                          | Centrum pomocy Make, „Adjustments to plans and pricing”: https://help.make.com/adjustments-to-plans-and-pricing                                                                                      | 26.09.2026   |
| n8n: scenariusz błędów z wyzwalaczem Error Trigger, np. alert mailem                                                                                                       | Dokumentacja n8n, „Handle errors gracefully”: https://docs.n8n.io/flow-logic/error-handling/                                                                                                         | 26.09.2026   |

**Uwagi redakcyjne:**

- **Kto jest dostawcą chatbota w rozumieniu aktu o SI (str. 22)** – zależy od wdrożenia. **[SPRAWDZIĆ z prawnikiem]**
- **Zasady bota, 5 punktów kontroli, lista kryzysów, zasady dostępów** – nasze rekomendacje.
- **Umowa z firmą hostingową przy n8n na własnym serwerze (str. 30)** – nasza ocena. **[SPRAWDZIĆ z prawnikiem]**
- **Umowy powierzenia narzędzi AI** (np. przy chatbocie i promptach) – sprawdzić dla narzędzia, które wybierzesz; nie
  weryfikowaliśmy ich w tym e-booku.
- **Prompty (str. 23)** – nasze szablony; przetestować na 3 produktach przed publikacją e-booka.
- **Badanie (str. 37)** – wymaga zgody sklepów na pomiar; bez nazw.
