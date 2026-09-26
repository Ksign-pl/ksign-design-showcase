# SKLEP NA AUTOPILOCIE – manuskrypt, strony 1–19

> Wersja robocza v0.1 · fakty sprawdzone 26.09.2026 · stopka na okładce i stronach: ksign.pl
>
> **Numery „Str. N” to układ roboczy (40 stron, z plakatami rozdziałów jak w poprzednich e-bookach).** W składzie
> numery i odsyłacze liczą się automatycznie.
>
> **Tabele z liczbami wstawia skrypt** – nie poprawiaj ich ręcznie. Po zmianie założeń w `kalkulator.mjs`:
> `node kalkulator.mjs --wstaw manuskrypt/rozdzialy-01-03.md && prettier --write manuskrypt/rozdzialy-01-03.md`
>
> **[DO DECYZJI]** – do ustalenia z Karolem. **[SPRAWDZIĆ]** – do potwierdzenia tuż przed publikacją.
>
> Formy grzecznościowe jak w poprzednich e-bookach: „Ty”, „Twój”, „Ciebie” wielką literą. Bez form rodzajowych
> w czasie przeszłym w zwrotach do czytelnika. Ceny narzędzi w dolarach, jak w cennikach, na dzień 26.09.2026.

---

## Str. 1 · Okładka

- **Tag:** E-BOOK KSIGN · 40 STRON · 20 MINUT **[liczba stron po składzie]**
- **Tytuł:** SKLEP NA AUTOPILOCIE.
- **Podtytuł:** Automatyzacje i AI, które oddają właścicielowi godziny. Mapa zadań, 10 gotowych scenariuszy i granice
  automatyzacji.
- **Stopka:** ksign.pl
- **Grafika (scena 3D):** marmurowe koła zębate zazębione ze sobą. Jedno koło jest z turkusowego szkła, a przez
  marmur biegną świecące turkusowe pęknięcia (kintsugi).

---

## Str. 2 · Dla kogo i jak czytać

**Nagłówek:** DLA KOGO I JAK CZYTAĆ

**Ten e-book jest dla Ciebie, jeśli:**

- prowadzisz mały sklep i robisz prawie wszystko sam,
- opisy, zdjęcia, maile i raporty zjadają Ci dzień, a na marketing brakuje czasu,
- nie masz budżetu na kolejnego pracownika.

**Nie jest dla Ciebie, jeśli** szukasz sposobu, żeby AI prowadziła sklep bez Ciebie. Automaty przejmą powtarzalne
zadania – decyzje zostają przy Tobie.

**Jak czytać – 20 minut:**

1. **5 minut – rozdział 01.** Mapa zadań i to, ile godzin możesz odzyskać.
2. **10 minut – rozdziały 02–04.** Narzędzia, 10 scenariuszy i AI w sklepie.
3. **5 minut – rozdziały 05–08.** Czego nie automatyzować, bezpieczeństwo, 9 błędów i test gotowości.
4. **Na koniec – ściąga ze str. 38.** Powieś ją obok biurka.

Każdy rozdział kończy się ramką **„Do zrobienia dziś”** – od 1 do 3 działań na ten sam dzień.

**Stan wiedzy:** 26.09.2026 (data sprawdzenia faktów – przy premierze sprawdzić ponownie, zwłaszcza cenniki). Źródła
z datami są na str. 40.

**Nota:** Czasy zadań w przykładach to założenia – swoje zmierzysz w tygodniu pomiaru (str. 5). To nie jest porada
prawna ani podatkowa.

---

## Str. 3 · Spis treści

| Nr  | Rozdział                              | Co z niego wyniesiesz                                      | Str. |
| --- | ------------------------------------- | ---------------------------------------------------------- | ---- |
| 01  | Mapa zadań                            | Co automatyzować najpierw i ile godzin odzyskasz           | 4    |
| 02  | Narzędzia                             | Zapier, Make i n8n: ceny, integracje, wybór                | 9    |
| 03  | 10 scenariuszy                        | Gotowe automatyzacje i pierwszy scenariusz w 60 minut      | 13   |
| 04  | AI w sklepie                          | Opisy, chatbot i gotowe prompty                            | 20   |
| 05  | Czego nie automatyzować               | Reklamacje, opinie i człowiek w pętli                      | 24   |
| 06  | Bezpieczeństwo i dane                 | Dostępy, dane osobowe, awarie                              | 28   |
| 07  | 9 błędów                              | Co psuje automatyzacje i co zrobić zamiast tego            | 32   |
| 08  | Badanie                               | Test gotowości w 10 punktach i czas 10 zadań               | 35   |
| –   | Ściąga · 3 kolejne kroki · Słowniczek | Wersja do wydruku, oferta KSIGN, pojęcia i źródła z datami | 38   |

---

# ROZDZIAŁ 01 · MAPA ZADAŃ

## Str. 4 · Plakat rozdziału

- **Numer:** 01
- **Tytuł:** Mapa zadań.
- **Lead:** Nie zaczynaj od narzędzia. Zacznij od tygodnia z notesem – zobaczysz, gdzie naprawdę uciekają godziny.
- **W tym rozdziale:** Tydzień pomiaru · Mapa 10 zadań · Ile to warte · Najpierw proces
- **Scena 3D:** marmurowa tarcza zegara. Zamiast wskazówek obracają się na niej turkusowe szklane trybiki.

---

## Str. 5 · Tydzień pomiaru

**Marker:** [ 01 / MAPA ZADAŃ ]
**Nagłówek:** TYDZIEŃ POMIARU

**Lead:** Przez 5 dni roboczych zapisuj każde zadanie, które powtarzasz. Dopiero wtedy wiesz, co automatyzować.

**Jak zapisywać:**

1. **Co** – nazwa zadania, np. „odpowiedź na pytanie o paczkę”.
2. **Ile razy** – licz kreskami w ciągu dnia.
3. **Ile minut** – zmierz 3 razy i weź średnią.
4. **Reguła** – czy robisz to zawsze tak samo? Tak, nie, czasem.
5. **Ryzyko** – co się stanie, jeśli automat się pomyli? Nic, klient będzie zły, strata pieniędzy.

**Dlaczego warto:** w 2025 r. technologie AI stosowało 20% firm w UE zatrudniających co najmniej 10 osób. W Polsce –
8,4%, jeden z najniższych wyników w UE (Eurostat). Mały sklep, który dobrze wdroży automaty, ma przewagę nad
konkurencją, która tego jeszcze nie robi.

_Dane Eurostatu dotyczą firm od 10 osób. O mikrofirmach Eurostat nie podaje tych danych w tej publikacji._

---

## Str. 6 · Mapa 10 zadań

**Marker:** [ 01 / MAPA ZADAŃ ]
**Nagłówek:** MAPA 10 ZADAŃ

**Lead:** Przykład sklepu, w którym właściciel robi prawie wszystko sam. Zadania ułożone od największej oszczędności.

<!-- tabela:mapa -->

| Zadanie                                | W tygodniu | Godzin w miesiącu | Oszczędność | Odzyskane godziny | Tryb          |
| -------------------------------------- | ---------- | ----------------- | ----------- | ----------------- | ------------- |
| Odpowiedzi „gdzie jest paczka?”        | 40 × 3 min | 8,7 h             | 80%         | 6,9 h             | automat       |
| Zamówienia do arkusza i raport dzienny | 7 × 15 min | 7,6 h             | 90%         | 6,8 h             | automat       |
| Opis nowego produktu                   | 5 × 30 min | 10,8 h            | 60%         | 6,5 h             | AI + człowiek |
| Faktury do programu księgowego         | 50 × 2 min | 7,2 h             | 90%         | 6,5 h             | automat       |
| Kontrola stanów magazynu               | 7 × 10 min | 5,1 h             | 90%         | 4,5 h             | automat       |
| Posty w mediach społecznościowych      | 4 × 30 min | 8,7 h             | 50%         | 4,3 h             | AI + człowiek |
| Prośba o opinię po dostawie            | 60 × 1 min | 4,3 h             | 100%        | 4,3 h             | automat       |
| Raport tygodniowy                      | 1 × 60 min | 4,3 h             | 80%         | 3,5 h             | automat       |
| Zdjęcia: kadr i tło                    | 10 × 6 min | 4,3 h             | 60%         | 2,6 h             | AI + człowiek |
| Reklamacje i zwroty                    | 3 × 20 min | 4,3 h             | 30%         | 1,3 h             | AI + człowiek |
| **Razem**                              |            | **65,4 h**        |             | **47,3 h**        |               |

<!-- /tabela:mapa -->

**Jak czytać tabelę:**

- **„Automat”** – zadanie z jasną regułą; po wdrożeniu działa samo, a Ty sprawdzasz tylko alerty.
- **„AI + człowiek”** – AI przygotowuje szkic, Ty zatwierdzasz. Oszczędność jest mniejsza, ale bezpieczna.
- **Reklamacje i zwroty** automat tylko pilnuje terminów i porządkuje dane. Decyzja zostaje przy Tobie (str. 25).

_Czasy i odsetki oszczędności są umowne. Wpisz swoje z tygodnia pomiaru i przelicz w `kalkulator.mjs`._

---

## Str. 7 · Ile warte są odzyskane godziny

**Marker:** [ 01 / MAPA ZADAŃ ]
**Nagłówek:** ILE WARTE SĄ ODZYSKANE GODZINY

**Lead:** Godzina właściciela ma cenę – to czas, który możesz dać marketingowi, klientom albo sobie.

<!-- tabela:wartosc -->

| Odzyskane godziny w miesiącu | Godzina = 50 zł | Godzina = 80 zł | Godzina = 120 zł |
| ---------------------------- | --------------- | --------------- | ---------------- |
| 10 h                         | 300 zł          | 600 zł          | 1000 zł          |
| 20 h                         | 800 zł          | 1400 zł         | 2200 zł          |
| 40 h                         | 1800 zł         | 3000 zł         | 4600 zł          |

<!-- /tabela:wartosc -->

**Jak czytać tabelę:** kwoty to wartość odzyskanych godzin po odjęciu 200 zł miesięcznie na narzędzie do
automatyzacji i AI. Przy 20 godzinach i stawce 80 zł zostaje 1400 zł miesięcznie.

**Jak wycenić swoją godzinę:** ile zapłacisz osobie, która zrobi to zadanie za Ciebie, albo ile przynosi Ci godzina
pracy nad sprzedażą. Weź niższą z tych dwóch liczb.

_Stawki i koszt narzędzi to założenia. Koszt narzędzi sprawdzisz na str. 10._

---

## Str. 8 · Najpierw proces, potem narzędzie

**Marker:** [ 01 / MAPA ZADAŃ ]
**Nagłówek:** NAJPIERW PROCES, POTEM NARZĘDZIE

**Lead:** Wdrożenie kosztuje godziny. Sprawdź, po ilu miesiącach się zwróci – i czy zadanie w ogóle nadaje się do
automatu.

<!-- tabela:zwrot -->

| Odzyskane godziny w miesiącu | Wdrożenie 8 h | Wdrożenie 16 h | Wdrożenie 32 h |
| ---------------------------- | ------------- | -------------- | -------------- |
| 10 h                         | 1,1 mies.     | 2,1 mies.      | 4,3 mies.      |
| 20 h                         | 0,5 mies.     | 0,9 mies.      | 1,8 mies.      |
| 40 h                         | 0,2 mies.     | 0,4 mies.      | 0,9 mies.      |

<!-- /tabela:zwrot -->

**Jak czytać tabelę:** przy 10 odzyskanych godzinach miesięcznie i 16 godzinach wdrożenia inwestycja zwraca się po
ok. 2 miesiącach (godzina = 80 zł, narzędzia 200 zł miesięcznie).

**3 pytania przed automatyzacją:**

1. **Czy to się powtarza?** Co najmniej raz w tygodniu – inaczej zwrot potrwa zbyt długo.
2. **Czy jest reguła?** Jeśli za każdym razem decydujesz inaczej, zacznij od szkicu z AI, nie od automatu.
3. **Co się stanie przy błędzie?** Jeśli klient straci pieniądze albo prawa – zostaw decyzję człowiekowi
   (rozdział 05).

> **Do zrobienia dziś**
>
> 1. Zacznij tydzień pomiaru: notes albo arkusz z 5 kolumnami ze str. 5.
> 2. Zaznacz 3 zadania, które zabierają najwięcej czasu i mają jasną regułę.

---

# ROZDZIAŁ 02 · NARZĘDZIA

## Str. 9 · Plakat rozdziału

- **Numer:** 02
- **Tytuł:** Narzędzia.
- **Lead:** Zapier, Make i n8n robią to samo – łączą aplikacje. Różnią się tym, za co płacisz i kto utrzymuje
  system.
- **W tym rozdziale:** Porównanie narzędzi · Co z czym się łączy · Jak wybrać
- **Scena 3D:** marmurowy stół warsztatowy, na nim trzy turkusowe szklane narzędzia: klucz, śrubokręt i młotek.

---

## Str. 10 · Zapier, Make, n8n

**Marker:** [ 02 / NARZĘDZIA ]
**Nagłówek:** ZAPIER, MAKE, N8N

**Lead:** Najważniejsza różnica to jednostka rozliczenia. Ten sam scenariusz może kosztować zupełnie inaczej.

|                 | Zapier                                                           | Make                                          | n8n                                                        |
| --------------- | ---------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Za co płacisz   | zadania – każda wykonana akcja; wyzwalacz i filtry się nie liczą | kredyty – zwykle 1 operacja modułu = 1 kredyt | wykonania – cały przebieg, bez względu na liczbę kroków    |
| Plan darmowy    | 100 zadań miesięcznie, scenariusze 2-krokowe                     | 1000 kredytów miesięcznie **[SPRAWDZIĆ]**     | wersja Community do samodzielnej instalacji                |
| Pierwszy płatny | od 29,99 USD mies. (19,99 USD przy płatności rocznej)            | Core od 9 USD mies. **[SPRAWDZIĆ]**           | Starter 20 USD mies. przy płatności rocznej – 2500 wykonań |
| Gdzie działa    | w chmurze Zapiera                                                | w chmurze Make                                | w chmurze n8n albo na Twoim serwerze                       |

**Co to znaczy w praktyce:** scenariusz z 5 krokami uruchomiony 1000 razy to w n8n 1000 wykonań, a w Zapierze
i Make – kilka tysięcy zadań albo kredytów. Przy dużej liczbie kroków n8n bywa tańszy; przy prostych scenariuszach
różnica jest mała.

**AI kosztuje dodatkowo:** w Make kroki z AI mogą zużywać więcej kredytów, zależnie od liczby tokenów. W Zapierze
kroki z AI też zużywają zadania według stawek zależnych od modelu.

_Ceny ze stron Zapier i n8n oraz z Centrum pomocy Make na 26.09.2026. Strona cennika Make blokuje automatyczne
pobieranie – ceny Make sprawdzić ręcznie przed publikacją._

---

## Str. 11 · Co z czym się łączy

**Marker:** [ 02 / NARZĘDZIA ]
**Nagłówek:** CO Z CZYM SIĘ ŁĄCZY

**Lead:** Zanim wybierzesz narzędzie, sprawdź, czy ma gotową integrację z Twoją platformą sklepu.

| Platforma albo system | Stan na 26.09.2026                                                                  |
| --------------------- | ----------------------------------------------------------------------------------- |
| WooCommerce           | gotowa integracja w Zapierze i w n8n                                                |
| Shopify               | gotowa integracja w n8n                                                             |
| BaseLinker            | gotowa integracja w Zapierze, np. nowe zamówienia do arkusza Google                 |
| IdoSell               | API i webhooki dla aplikacji IdoSell                                                |
| Shoper                | nie znaleźliśmy aplikacji w katalogu Zapiera – połączenie przez API **[SPRAWDZIĆ]** |

**Brak gotowej integracji to nie koniec:**

- **Webhook** – sklep sam wysyła powiadomienie, np. o nowym zamówieniu, a narzędzie je odbiera.
- **Moduł HTTP i API** – narzędzie pyta sklep o dane. Potrzebny jest klucz API z możliwie najmniejszymi uprawnieniami
  (str. 29).
- **BaseLinker jako pośrednik** – jeśli sklep jest z nim połączony, automat może pracować na danych z BaseLinkera.

_Katalogi integracji zmieniają się często. Przed wyborem wpisz nazwę swojej platformy w katalogu każdego narzędzia._

---

## Str. 12 · Jak wybrać w 5 pytaniach

**Marker:** [ 02 / NARZĘDZIA ]
**Nagłówek:** JAK WYBRAĆ W 5 PYTANIACH

**Lead:** Nie ma najlepszego narzędzia. Jest takie, które pasuje do Twojego sklepu i Twojego czasu.

1. **Ile uruchomień miesięcznie?** Policz zamówienia, maile i raporty z mapy zadań (str. 6). Przy wielu krokach
   liczy się model rozliczenia (str. 10).
2. **Kto będzie to utrzymywać?** Zapier jest najprostszy na start. Make daje więcej kontroli w edytorze. n8n na
   własnym serwerze wymaga osoby technicznej.
3. **Gdzie mają być dane?** Dane klientów w automatach to przetwarzanie danych osobowych – sprawdź umowę z dostawcą
   (str. 30). Własny serwer n8n trzyma dane u Ciebie.
4. **Czy jest integracja?** Tabela ze str. 11 – gotowa integracja skraca wdrożenie z dni do godzin.
5. **Jaki budżet?** Zacznij od planu darmowego albo najtańszego i zmierz zużycie przez miesiąc.

**Nasza rekomendacja na start:** jedno narzędzie, 3 scenariusze, miesiąc pomiaru. Dopiero potem rozbudowa.

> **Do zrobienia dziś**
>
> 1. Wpisz nazwę swojej platformy w katalogach integracji Zapier, Make i n8n.
> 2. Załóż darmowe konto w narzędziu, które ma gotową integrację.

---

# ROZDZIAŁ 03 · 10 SCENARIUSZY

## Str. 13 · Plakat rozdziału

- **Numer:** 03
- **Tytuł:** 10 scenariuszy.
- **Lead:** Każdy scenariusz to wyzwalacz i kilka kroków. Zacznij od tych, które dotyczą zamówień – dają najwięcej
  godzin.
- **W tym rozdziale:** Scenariusze 1–10 · Pierwszy scenariusz w 60 minut
- **Scena 3D:** marmurowy tor, po którym toczy się 10 turkusowych szklanych kulek.

---

## Str. 14 · Scenariusze 1–2

**Marker:** [ 03 / 10 SCENARIUSZY ]
**Nagłówek:** SCENARIUSZE 1–2

**1. Status paczki bez pytań**

- **Wyzwalacz:** zmiana statusu zamówienia na „wysłane”.
- **Kroki:** mail albo SMS z numerem przesyłki i linkiem do śledzenia; przy „dostarczone” – krótkie podziękowanie.
- **Efekt:** mniej pytań „gdzie jest paczka?”. Pytania, które i tak przyjdą, AI oznacza i przygotowuje szkic
  odpowiedzi z numerem przesyłki.
- **Uwaga:** to wiadomości obsługowe – bez promocji w treści. Z reklamą w środku stają się informacją handlową
  (e-book „Drugi zakup jest najtańszy.”, str. 9).

**2. Zamówienia do arkusza i raport dzienny**

- **Wyzwalacz:** nowe zamówienie.
- **Kroki:** wiersz w arkuszu (data, wartość, produkty, źródło); o 8:00 mail z podsumowaniem wczorajszego dnia.
- **Efekt:** koniec z ręcznym przepisywaniem. Arkusz zasila raport tygodniowy (scenariusz 7).
- **Uwaga:** nie przepisuj do arkusza danych osobowych, których nie potrzebujesz – wystarczy numer zamówienia.

---

## Str. 15 · Scenariusze 3–4

**Marker:** [ 03 / 10 SCENARIUSZY ]
**Nagłówek:** SCENARIUSZE 3–4

**3. Opis nowego produktu – szkic z AI do akceptacji**

- **Wyzwalacz:** nowy wiersz w arkuszu produktów (nazwa, cechy, wymiary, materiał).
- **Kroki:** AI pisze szkic opisu według Twojego szablonu (str. 23); szkic trafia do Ciebie do akceptacji; po
  akceptacji – do sklepu.
- **Efekt:** zamiast pisać od zera, poprawiasz gotowy tekst.
- **Uwaga:** tylko cechy z arkusza – AI nie może dopisywać cech, których produkt nie ma (str. 21).

**4. Faktury i KSeF**

- **Wyzwalacz:** zamówienie opłacone.
- **Kroki:** faktura w programie księgowym albo w module sklepu; przy sprzedaży firmom – wysyłka do KSeF przez
  program, który go obsługuje.
- **Efekt:** faktury bez przepisywania danych.
- **Obowiązek KSeF (Ministerstwo Finansów):** od 1.02.2026 dla największych podatników, od 1.04.2026 dla pozostałych,
  a dla najmniejszych – z fakturami do 450 zł i sprzedażą do 10 tys. zł miesięcznie – od 1.01.2027.

_Szczegóły obowiązku KSeF i faktur dla konsumentów sprawdź z księgową. **[SPRAWDZIĆ]**_

---

## Str. 16 · Scenariusze 5–6

**Marker:** [ 03 / 10 SCENARIUSZY ]
**Nagłówek:** SCENARIUSZE 5–6

**5. Alert o stanie magazynu**

- **Wyzwalacz:** stan produktu spada poniżej progu, np. 5 sztuk.
- **Kroki:** wiadomość do Ciebie z nazwą produktu, stanem i średnią sprzedażą z ostatnich 30 dni.
- **Efekt:** zamawiasz towar, zanim zabraknie bestsellera.
- **Próg:** sprzedaż dzienna × czas dostawy od dostawcy + zapas na kilka dni (nasza rekomendacja).

**6. Prośba o opinię po dostawie**

- **Wyzwalacz:** status „dostarczone” + kilka dni.
- **Kroki:** mail z prośbą o opinię – tylko do klientów, którzy się na to zgodzili.
- **Efekt:** więcej opinii bez ręcznego wysyłania.
- **Uwaga:** prośbę o opinię bezpieczniej traktować jak wiadomość marketingową i wysyłać za zgodą. Opinie muszą być
  prawdziwe – szczegóły w e-booku „Drugi zakup jest najtańszy.”, str. 9–11.

---

## Str. 17 · Scenariusze 7–8

**Marker:** [ 03 / 10 SCENARIUSZY ]
**Nagłówek:** SCENARIUSZE 7–8

**7. Raport tygodniowy**

- **Wyzwalacz:** poniedziałek, 7:00.
- **Kroki:** dane z arkusza zamówień (scenariusz 2) i z paneli reklamowych; AI pisze 5 zdań podsumowania; mail do
  Ciebie.
- **Efekt:** jedna wiadomość zamiast godziny w panelach.
- **Uwaga:** sprzedaż licz z danych sklepu, nie z paneli reklamowych (e-book „ROAS kłamie.”). AI podsumowuje liczby,
  ale nie liczy ich za Ciebie – sprawdzaj sumy.

**8. Zdjęcia: kadr i tło**

- **Wyzwalacz:** nowe zdjęcia w folderze „do obróbki”.
- **Kroki:** kadr do formatów sklepu i mediów społecznościowych, usunięcie tła, zmiana nazwy pliku według produktu.
- **Efekt:** zdjęcia gotowe do wgrania bez ręcznej obróbki każdego.
- **Uwaga:** sprawdź każde zdjęcie – produkt musi wyglądać jak w rzeczywistości (kolor, rozmiar). Inaczej zdjęcie
  wprowadza w błąd (str. 21).

---

## Str. 18 · Scenariusze 9–10

**Marker:** [ 03 / 10 SCENARIUSZY ]
**Nagłówek:** SCENARIUSZE 9–10

**9. Posty z arkusza**

- **Wyzwalacz:** nowy wiersz w arkuszu planu treści (data, temat, produkt).
- **Kroki:** AI pisze szkic posta w Twoim stylu; Ty poprawiasz i zatwierdzasz; po akceptacji post trafia do
  harmonogramu publikacji.
- **Efekt:** plan na miesiąc w jedno popołudnie.
- **Uwaga:** publikuj dopiero po akceptacji – post z błędem widzą wszyscy obserwujący.

**10. Rejestr reklamacji z terminem 14 dni**

- **Wyzwalacz:** nowa reklamacja z formularza albo maila.
- **Kroki:** wiersz w rejestrze z datą otrzymania i terminem odpowiedzi (+14 dni); przypomnienia na 7 i 2 dni przed
  terminem; szkic odpowiedzi z AI do Twojej decyzji.
- **Efekt:** żadna reklamacja nie przepada.
- **Dlaczego to ważne:** reklamację konsumenta bez odpowiedzi w 14 dni uważa się za uznaną (art. 7a ustawy o prawach
  konsumenta, str. 25).

---

## Str. 19 · Pierwszy scenariusz w 60 minut

**Marker:** [ 03 / 10 SCENARIUSZY ]
**Nagłówek:** PIERWSZY SCENARIUSZ W 60 MINUT

**Lead:** 7 kroków. Zacznij od scenariusza 2 – jest prosty, bezpieczny i od razu widać efekt.

1. **Wybierz 1 zadanie z mapy** – z jasną regułą i małym ryzykiem błędu (str. 8).
2. **Opisz go na kartce:** wyzwalacz, kroki, wynik. Jedno zdanie na krok.
3. **Połącz aplikacje** w narzędziu – najpierw sklep, potem arkusz.
4. **Zbuduj scenariusz** i przepuść przez niego 5 prawdziwych zamówień z przeszłości.
5. **Sprawdź wynik** na tych 5 przykładach – każde pole po kolei.
6. **Włącz powiadomienie o błędzie** na swój mail albo telefon (str. 31).
7. **Zapisz instrukcję:** co robi scenariusz, gdzie go wyłączyć, kto jest właścicielem.

**Po tygodniu:** sprawdź, ile zadań albo kredytów zużył scenariusz, i porównaj z planem narzędzia (str. 10).

> **Do zrobienia dziś**
>
> 1. Zbuduj scenariusz 2: zamówienia do arkusza.
> 2. Zaplanuj kolejne 2 scenariusze z mapy zadań na następne 2 tygodnie.

---

## Źródła do rozdziałów 01–03 (trafią na str. 40)

| Fakt                                                                                                                                                                                                                               | Źródło                                                                                                                                            | Data dostępu |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| AI w firmach w 2025 r.: 20% w UE, 8,4% w Polsce (firmy od 10 osób)                                                                                                                                                                 | Eurostat, „20% of EU enterprises use AI technologies”, 11.12.2025: https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2      | 26.09.2026   |
| Zapier: plan darmowy 100 zadań, scenariusze 2-krokowe; Professional 29,99 USD mies. albo 19,99 USD przy płatności rocznej; zadanie = udana akcja, wyzwalacze i wbudowane narzędzia (np. filtr) bez zadań; kroki z AI według stawek | Zapier, „Plans & Pricing”: https://zapier.com/pricing                                                                                             | 26.09.2026   |
| n8n: Starter 20 USD mies. (rocznie) – 2500 wykonań, Pro 50 USD – 10 000 wykonań; płatność za całe wykonania; wersja Community do samodzielnej instalacji                                                                           | n8n, „Plans and Pricing”: https://n8n.io/pricing/                                                                                                 | 26.09.2026   |
| Make: kredyty zamiast operacji; 1 operacja = 1 kredyt dla aplikacji bez AI; kredyty zależne od tokenów przy AI                                                                                                                     | Centrum pomocy Make, „Credits”: https://help.make.com/credits                                                                                     | 26.09.2026   |
| Make: plan darmowy 1000 kredytów, Core od 9 USD za 10 000 kredytów                                                                                                                                                                 | Strona cennika Make (https://www.make.com/en/pricing) – blokuje automatyczne pobieranie; wartości z wyników wyszukiwania. **[SPRAWDZIĆ ręcznie]** | 26.09.2026   |
| Integracje WooCommerce i BaseLinker w Zapierze; brak aplikacji Shoper i IdoSell w katalogu Zapiera                                                                                                                                 | Zapier, katalog aplikacji: https://zapier.com/apps/woocommerce/integrations, https://zapier.com/apps/baselinker/integrations                      | 26.09.2026   |
| Integracje WooCommerce i Shopify w n8n                                                                                                                                                                                             | n8n, katalog integracji: https://n8n.io/integrations/woocommerce/, https://n8n.io/integrations/shopify/                                           | 26.09.2026   |
| IdoSell: API, uprawnienia kluczy, webhooki dla aplikacji                                                                                                                                                                           | Dokumentacja IdoSell API: https://idosell.readme.io/                                                                                              | 26.09.2026   |
| KSeF: od 1.02.2026 (sprzedaż za 2024 r. powyżej 200 mln zł), od 1.04.2026 pozostali, od 1.01.2027 najmniejsi (do 450 zł na fakturze, do 10 tys. zł miesięcznie)                                                                    | Ministerstwo Finansów, „Krajowy System e-Faktur – plan wdrożenia”: https://www.gov.pl/web/finanse/krajowy-system-e-faktur--plan-wdrozenia         | 26.09.2026   |
| Wiadomości obsługowe a informacja handlowa; prośba o opinię za zgodą; prawdziwe opinie                                                                                                                                             | E-book „Drugi zakup jest najtańszy.”, str. 9–11                                                                                                   | 26.09.2026   |
| Mapa zadań, wartość godzin, zwrot wdrożenia                                                                                                                                                                                        | Wyliczenia w `kalkulator.mjs` – założenia, nie dane z rynku                                                                                       | –            |

**Uwagi redakcyjne:**

- **Ceny Make** – do ręcznego sprawdzenia; strona cennika zatrzymuje automat. **[SPRAWDZIĆ]**
- **Shoper** – strona dla deweloperów blokuje automatyczne pobieranie; czy Shoper ma API i webhooki – sprawdzić
  ręcznie. **[SPRAWDZIĆ]**
- **Scenariusze 1–10** to nasze propozycje. Moduły i nazwy kroków różnią się między narzędziami.
- **Próg magazynowy (str. 16) i rekomendacja „3 scenariusze na start” (str. 12)** – nasze rekomendacje.
