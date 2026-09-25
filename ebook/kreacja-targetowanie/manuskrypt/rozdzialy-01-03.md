# KREACJA TO NOWE TARGETOWANIE – manuskrypt, strony 1–19

> Wersja robocza v0.1 · fakty sprawdzone 25.09.2026 · stopka na okładce i stronach: ksign.pl
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
> w czasie przeszłym w zwrotach do czytelnika. Nazwy funkcji i statusów jak w polskiej wersji Centrum pomocy Meta.
> Przykład liczbowy jak w całej serii: zamówienie 123 zł z VAT, marża 40% – zakup może kosztować najwyżej 40 zł.

---

## Str. 1 · Okładka

- **Tag:** E-BOOK KSIGN · 40 STRON · 20 MINUT **[liczba stron po składzie]**
- **Tytuł:** KREACJA TO NOWE TARGETOWANIE.
- **Podtytuł:** Reklamy Meta, które algorytm dowozi do klientów. 6 formatów nagranych telefonem i testy bez
  przepalania budżetu.
- **Stopka:** ksign.pl
- **Grafika (scena 3D):** marmurowa tarcza strzelecka. W jej środku zamiast strzały tkwi turkusowy szklany klaps
  filmowy, a od środka rozchodzą się świecące turkusowe pęknięcia (kintsugi).

---

## Str. 2 · Dla kogo i jak czytać

**Nagłówek:** DLA KOGO I JAK CZYTAĆ

**Ten e-book jest dla Ciebie, jeśli:**

- wydajesz na reklamy w Meta kilka tysięcy złotych miesięcznie i sprzedajesz przez własny sklep,
- wyniki spadają, a Menedżer reklam podpowiada „więcej materiałów reklamowych”,
- nie masz studia ani agencji produkcyjnej – masz telefon i produkt.

**Nie jest dla Ciebie, jeśli** nie mierzysz zakupów z reklam. Wtedy zacznij od pomiaru – e-book „ROAS kłamie.”.

**Jak czytać – 20 minut:**

1. **5 minut – rozdziały 01–02.** Jak Meta dobiera odbiorców i ile reklam prowadzić naraz.
2. **10 minut – rozdziały 03–04.** 6 formatów, haki, dzień nagrań, twórcy, zgody i AI.
3. **5 minut – rozdziały 05–08.** Testy, wyniki, 9 błędów i test konta.
4. **Na koniec – ściąga ze str. 38.** Wydrukuj ją dla osoby, która prowadzi kampanie.

Każdy rozdział kończy się ramką **„Do zrobienia dziś”** – od 1 do 3 działań na ten sam dzień.

**Stan wiedzy:** 25.09.2026 (data sprawdzenia faktów – przy premierze sprawdzić ponownie i zaktualizować). Meta
często zmienia nazwy funkcji w Menedżerze reklam. Źródła z datami są na str. 40.

**Nota:** Liczby w przykładach to założenia, nie średnie rynkowe. Dane o skuteczności narzędzi Meta pochodzą od Meta
i tak je podpisujemy.

---

## Str. 3 · Spis treści

| Nr  | Rozdział                              | Co z niego wyniesiesz                                      | Str. |
| --- | ------------------------------------- | ---------------------------------------------------------- | ---- |
| 01  | Jak Meta dobiera odbiorców            | 3 etapy wyboru reklamy i co wygrywa aukcję                 | 4    |
| 02  | Mniej reklam, więcej różnic           | Faza uczenia się, liczba reklam, prosta struktura konta    | 8    |
| 03  | 6 formatów z telefonu                 | Formaty, haki, technika i plan dnia nagrań                 | 13   |
| 04  | Twórcy, klienci i AI                  | Reklamy partnerskie, zgody na wizerunek, etykiety SI       | 20   |
| 05  | Testy bez przepalania budżetu         | Narzędzia Meta, wczesne sygnały, rytm i zmęczenie          | 24   |
| 06  | Wyniki i konkurencja                  | Jak czytać wyniki kreacji, Biblioteka reklam               | 29   |
| 07  | 9 błędów                              | Co psuje kampanie i co zrobić zamiast tego                 | 32   |
| 08  | Badanie                               | Test konta w 10 punktach i reklamy 100 sklepów             | 35   |
| –   | Ściąga · 3 kolejne kroki · Słowniczek | Wersja do wydruku, oferta KSIGN, pojęcia i źródła z datami | 38   |

---

# ROZDZIAŁ 01 · JAK META DOBIERA ODBIORCÓW

## Str. 4 · Plakat rozdziału

- **Numer:** 01
- **Tytuł:** Jak Meta dobiera odbiorców.
- **Lead:** Kiedyś reklamę kierowało się do zainteresowań. Dziś system Meta sam szuka odbiorców – a to, co pokazujesz
  w reklamie, jest jednym z jego sygnałów.
- **W tym rozdziale:** Od milionów reklam do jednej · Co wygrywa aukcję · Kreacja mówi, do kogo trafić
- **Scena 3D:** marmurowy lejek. Do środka wpadają tysiące małych turkusowych szklanych kulek, na dole wypada jedna.

---

## Str. 5 · Od milionów reklam do jednej

**Marker:** [ 01 / JAK META DOBIERA ODBIORCÓW ]
**Nagłówek:** OD MILIONÓW REKLAM DO JEDNEJ

**Lead:** Za każdym razem, gdy ktoś przewija Facebooka albo Instagram, Meta wybiera dla niego reklamę. Robi to
w 3 etapach.

1. **Wybór kandydatów.** System zawęża dziesiątki milionów reklam do kilku tysięcy trafnych dla tej osoby. Tym etapem
   zajmuje się Andromeda – system Meta wdrożony na Facebooku i Instagramie.
2. **Ranking.** Większe modele przewidują, jaką wartość reklama da tej osobie i reklamodawcy. Meta opisuje model GEM,
   który uczy się m.in. z treści reklam i z tego, jak ludzie na nie reagują.
3. **Aukcja.** Wygrywa reklama o najwyższej łącznej wartości (str. 6).

**Co z tego wynika:** reklama, której system nie wybierze na etapie 1, nie trafi do rankingu dla tej osoby.

**Dlaczego to się zmienia teraz:** Meta pisze wprost, że dzięki narzędziom generatywnej SI liczba kreacji w systemie
będzie szybko rosnąć, a Andromeda ma sobie z tym radzić. Już w 2024 r. ponad milion reklamodawców utworzyło narzędziami
SI Meta ponad 15 mln reklam w ciągu jednego miesiąca. Konkurujesz więc z coraz większą liczbą kreacji.

**Trafność to wciąż wyzwanie:** spersonalizowane reklamy jako trafne ocenia 29% badanych, jako nietrafne – 24%
(Gemius 2025).

---

## Str. 6 · Co wygrywa aukcję

**Marker:** [ 01 / JAK META DOBIERA ODBIORCÓW ]
**Nagłówek:** CO WYGRYWA AUKCJĘ

**Lead:** Nie zawsze wygrywa najwyższa oferta. Według Meta bardziej trafna reklama może wygrać z reklamami o wyższych
ofertach.

**Łączna wartość reklamy to 3 czynniki:**

| Czynnik                         | Co to jest                                                                | Wpływ kreacji |
| ------------------------------- | ------------------------------------------------------------------------- | ------------- |
| Oferta                          | Ile płacisz za wynik                                                      | nie           |
| Szacunkowy współczynnik działań | Prawdopodobieństwo, że ta osoba zareaguje albo kupi                       | tak           |
| Jakość reklamy                  | Opinie osób, które oglądają lub ukrywają reklamę, i cechy niskiej jakości | tak           |

**Cechy niskiej jakości według Meta:** zatajanie informacji, sensacyjnie brzmiący język i wyłudzanie aktywności.
Meta dodaje, że wyłudzanie kliknięć i aktywności nie poprawia skuteczności reklam.

**Co to znaczy dla Ciebie:**

- **Kreacja wpływa na 2 z 3 czynników.** Lepsza reklama obniża koszt wyniku bez podnoszenia oferty.
- **„Nie uwierzysz, co się stało”** i podobne haki mogą obniżać jakość reklamy.
- **Obiecuj tylko to, co produkt daje.** Nieprawdziwe informacje o cechach produktu to także działanie wprowadzające
  w błąd (art. 5 ust. 3 pkt 2 ustawy o przeciwdziałaniu nieuczciwym praktykom rynkowym).

---

## Str. 7 · Kreacja mówi, do kogo trafić

**Marker:** [ 01 / JAK META DOBIERA ODBIORCÓW ]
**Nagłówek:** KREACJA MÓWI, DO KOGO TRAFIĆ

**Lead:** Przy szerokiej grupie odbiorców to reklama podpowiada systemowi, komu ją pokazać. Różne kreacje znajdą
różnych ludzi.

**Co pisze Meta:**

- **Grupa odbiorców Advantage+** szuka ludzi na podstawie wielu sygnałów, np. wcześniejszych konwersji, danych
  Piksela Meta i interakcji z poprzednimi reklamami.
- **W kampaniach sprzedażowych Advantage+** Meta zaleca szeroką gamę zróżnicowanych materiałów reklamowych, żeby
  zwiększyć trafność.
- **Model GEM** korzysta m.in. z cech reklamy, takich jak format i to, co pokazuje kreacja.

**Przykład – jedna lampa, 3 kreacje, 3 grupy ludzi:**

| Kreacja                             | Kogo najpewniej znajdzie    |
| ----------------------------------- | --------------------------- |
| Lampa nad biurkiem w domowym biurze | osoby, które pracują z domu |
| Ciepłe światło w sypialni wieczorem | osoby urządzające sypialnię |
| Lampa w pudełku z kokardą           | osoby szukające prezentu    |

_Przykład pokazuje mechanizm, a nie wynik testu. Grupy to nasza interpretacja – system nie pokazuje, komu i dlaczego
wyświetlił reklamę._

**Dane Meta:** grupa odbiorców Advantage+ może obniżyć koszt wyniku w kampaniach sprzedażowych o 7,2%, a kampanie
sprzedażowe Advantage+ obniżały koszt konwersji średnio o 9%. To wyniki podawane przez Meta, nie niezależne badania.

> **Do zrobienia dziś**
>
> 1. Sprawdź, czy kampania sprzedażowa używa szerokiej grupy odbiorców. Wiele wąskich zestawów „po
>    zainteresowaniach” to kandydat do połączenia (str. 12).
> 2. Wypisz 3 różne powody, dla których ludzie kupują Twój produkt. Każdy to osobny koncept (str. 11).

---

# ROZDZIAŁ 02 · MNIEJ REKLAM, WIĘCEJ RÓŻNIC

## Str. 8 · Plakat rozdziału

- **Numer:** 02
- **Tytuł:** Mniej reklam, więcej różnic.
- **Lead:** Meta prosi o więcej materiałów reklamowych, ale ostrzega przed zbyt wieloma reklamami naraz. Rozwiązanie:
  kilka reklam, które naprawdę się różnią.
- **W tym rozdziale:** Faza uczenia się · Za dużo reklam · Różne koncepty · Struktura konta
- **Scena 3D:** 5 różnych turkusowych szklanych brył – kula, sześcian, stożek, walec i ostrosłup – na marmurowym
  postumencie.

---

## Str. 9 · Faza uczenia się a budżet

**Marker:** [ 02 / MNIEJ REKLAM, WIĘCEJ RÓŻNIC ]
**Nagłówek:** FAZA UCZENIA SIĘ A BUDŻET

**Lead:** Zestaw reklam kończy fazę uczenia się zwykle po około 50 wynikach w tygodniu. Przy optymalizacji pod zakup
to kwestia budżetu.

<!-- tabela:nauka -->

| Koszt zakupu | 3000 zł/mies. | 6000 zł/mies. | 10 000 zł/mies.    | Budżet na 50 zakupów w tygodniu |
| ------------ | ------------- | ------------- | ------------------ | ------------------------------- |
| 30 zł        | 23 – za mało  | 46 – za mało  | **77 – wystarczy** | 6518 zł/mies.                   |
| 40 zł        | 17 – za mało  | 35 – za mało  | **58 – wystarczy** | 8690 zł/mies.                   |
| 60 zł        | 12 – za mało  | 23 – za mało  | 38 – za mało       | 13 036 zł/mies.                 |
| 90 zł        | 8 – za mało   | 15 – za mało  | 26 – za mało       | 19 554 zł/mies.                 |

<!-- /tabela:nauka -->

**Co widać w tabeli:**

- **Przy koszcie zakupu 40 zł** jeden zestaw reklam potrzebuje ok. 8 700 zł miesięcznie, żeby zbierać 50 zakupów
  tygodniowo.
- **Przy 6000 zł i koszcie 40 zł** zestaw zbierze ok. 35 zakupów w tygodniu. Menedżer reklam pokaże status
  „Ograniczone uczenie”.
- **Każdy kolejny zestaw dzieli budżet** i oddala próg 50 wyników.

**Co radzi Meta przy statusie „Ograniczone uczenie”:** połączyć zestawy reklam i kampanie, poszerzyć grupę
odbiorców, zwiększyć budżet albo optymalizować pod zdarzenie, które występuje częściej – np. dodanie do koszyka
zamiast zakupu.

**Nasza uwaga:** po zmianie na dodanie do koszyka pilnuj kosztu zakupu. System będzie szukać osób, które dodają do
koszyka, a nie tych, które kupują.

_Założenia: budżet jednego zestawu reklam, miesiąc = 30,4 dnia. Koszt zakupu wpisz ze swojego konta._

---

## Str. 10 · Za dużo reklam szkodzi

**Marker:** [ 02 / MNIEJ REKLAM, WIĘCEJ RÓŻNIC ]
**Nagłówek:** ZA DUŻO REKLAM SZKODZI

**Lead:** Każde wyświetlenie uczy system. Gdy reklam jest za dużo naraz, każda uczy się wolniej.

**Co pisze Meta:**

- **Zbyt wiele reklam naraz** sprawia, że każda jest wyświetlana rzadziej. Mniej reklam kończy fazę uczenia się,
  a z budżetu wydajesz więcej, zanim system zoptymalizuje wyniki. Meta pisze wprost: zbyt duża liczba reklam może
  dać gorsze wyniki.
- **Limit reklam na stronę:** strony, które w miesiącu największych wydatków wydały mniej niż 100 tys. USD, mogą mieć
  jednocześnie 250 reklam wyświetlanych lub weryfikowanych.
- **Testować trzeba** – ale tak, żeby system zebrał jak najwięcej informacji o każdej reklamie.

**Te zmiany cofają zestaw reklam do fazy uczenia się (według Meta):**

1. zmiana zdarzenia optymalizacji,
2. dodanie nowej reklamy do zestawu,
3. wstrzymanie zestawu na 7 dni lub dłużej,
4. zmiana strategii składania ofert,
5. duża zmiana budżetu albo limitu – np. ze 100 do 1000 USD (mała, jak ze 100 do 101 USD, zwykle nie).

**Wniosek:** nowe kreacje dodawaj paczkami, a nie po jednej codziennie (str. 28).

---

## Str. 11 · Różne koncepty, nie warianty

**Marker:** [ 02 / MNIEJ REKLAM, WIĘCEJ RÓŻNIC ]
**Nagłówek:** RÓŻNE KONCEPTY, NIE WARIANTY

**Lead:** 10 wersji tego samego filmu z innym kolorem napisu to wciąż jedna kreacja. Różnica ma być widoczna od
pierwszej sekundy.

**4 osie różnicy – przykład: lampa biurkowa**

| Oś       | Warianty                                         |
| -------- | ------------------------------------------------ |
| Potrzeba | praca przy biurku · czytanie wieczorem · prezent |
| Format   | film demo · zdjęcie z jedną korzyścią · karuzela |
| Osoba    | założyciel · klient · sam produkt                |
| Miejsce  | domowe biuro · sypialnia · pudełko z prezentem   |

**Nasza zasada:** nowy koncept różni się od reklam, które już działają, na co najmniej 2 osiach.

**Meta mówi to samo przy zmęczeniu reklamą:** zaleca nową reklamę z obrazem lub filmem, który „diametralnie różni
się” od pierwotnego materiału (str. 28).

**Warianty zostaw systemowi:**

- **Format elastyczny** – do 10 obrazów i filmów w jednej reklamie. System sam wybiera pojedynczy obraz, film albo
  karuzelę. Dostępny w kampaniach sprzedażowych; Meta zaznacza, że nie na każdym koncie.
- **Kilka opcji tekstu** – tekst podstawowy, nagłówek i opis w kilku wersjach w jednej reklamie zamiast osobnych
  reklam.

---

## Str. 12 · Konto na 3–10 tys. zł miesięcznie

**Marker:** [ 02 / MNIEJ REKLAM, WIĘCEJ RÓŻNIC ]
**Nagłówek:** KONTO NA 3–10 TYS. ZŁ MIESIĘCZNIE

**Lead:** Prosta struktura daje systemowi więcej danych na każdą reklamę. Przy kilku tysiącach złotych to ważniejsze
niż precyzyjne targetowanie.

**Nasza propozycja struktury:**

1. **1 kampania sprzedażowa.** Meta: najbardziej zaawansowane optymalizacje działają, gdy kampania sprzedażowa używa
   grupy odbiorców, umiejscowień i budżetu Advantage+.
2. **1 zestaw reklam na całą Polskę**, z umiejscowieniami Advantage+.
3. **3–6 konceptów**, każdy z kilkoma obrazami lub filmami i kilkoma wersjami tekstu (str. 11).
4. **Test nowych kreacji w tej samej kampanii** – narzędziem „Test materiału reklamowego”, do 20% budżetu (str. 25).
5. **Osobny retargeting** – tylko wtedy, gdy budżet pozwala obu zestawom zbierać wyniki (str. 9).

**Raporty bez dzielenia odbiorców:** zamiast osobnych zestawów „kobiety 25–34” i „mężczyźni 35–44” używaj
w raportach podziałów według wieku, płci i regionu – to rada Meta.

> **Do zrobienia dziś**
>
> 1. Policz zakupy w ostatnim tygodniu w każdym zestawie reklam. Poniżej 50 – zaplanuj połączenie zestawów.
> 2. Policz aktywne reklamy i wyłącz te, które powtarzają ten sam koncept.

---

# ROZDZIAŁ 03 · 6 FORMATÓW Z TELEFONU

## Str. 13 · Plakat rozdziału

- **Numer:** 03
- **Tytuł:** 6 formatów z telefonu.
- **Lead:** Nie potrzebujesz studia. Meta pisze, że wielu reklamodawców odnosi sukces dzięki prostym materiałom,
  a zamiast sprzętu wystarczy telefon.
- **W tym rozdziale:** 6 formatów · 10 haków · Technika · Dzień nagrań
- **Scena 3D:** marmurowy smartfon na statywie z turkusowym szklanym ekranem. Wokół unosi się 6 szklanych kafelków.

---

## Str. 14 · Formaty 1–2: demo i korzyść

**Marker:** [ 03 / 6 FORMATÓW Z TELEFONU ]
**Nagłówek:** FORMATY 1–2: DEMO I KORZYŚĆ

**Lead:** Dwa najprostsze formaty. Pierwszy nagrasz w kwadrans, drugi zrobisz ze zdjęcia, które już masz.

**Format 1 – Demo w 15 sekund**

- **Co pokazuje:** produkt w użyciu, bez mówienia do kamery.
- **Scenariusz:** 0–3 s – efekt; 3–10 s – jak działa; 10–15 s – produkt i jedno wezwanie do działania.
- **Przykład (lampa):** ciemny pokój, klik – światło. Potem 3 barwy światła. Na końcu lampa na biurku i „Zamów –
  wysyłka w 24 h” (tylko jeśli to prawda).
- **Meta** wymienia demo produktu wśród prostych i skutecznych filmów.

**Format 2 – Korzyść w 3 sekundy**

- **Co pokazuje:** zdjęcie produktu i jedna korzyść, która pojawia się w ruchu w pierwszych 3 sekundach.
- **Parametry według Meta:** film 5–10 sekund, format 1:1 lub 4:5, jedno wezwanie do działania i spójna karta
  końcowa.
- **Zrobisz ze zdjęcia:** animację przygotujesz w szablonach Menedżera reklam albo w aplikacji do montażu.

**Dane Meta:** kampanie, które łączyły obrazy i filmy, miały wzrost konwersji o 17% wyższy niż kampanie z samymi
obrazami.

---

## Str. 15 · Formaty 3–4: klient i założyciel

**Marker:** [ 03 / 6 FORMATÓW Z TELEFONU ]
**Nagłówek:** FORMATY 3–4: KLIENT I ZAŁOŻYCIEL

**Lead:** Ludzie ufają ludziom. Dwa formaty z twarzą: klient, który już kupił, i osoba, która stoi za marką.

**Format 3 – Opinia klienta**

- **Co pokazuje:** prawdziwy klient mówi, dlaczego kupił i co się zmieniło. 20–30 sekund, nagrane telefonem.
- **Pytania do klienta:**
  1. Czego szukasz, kiedy wybierasz taki produkt?
  2. Co zaskoczyło po pierwszym tygodniu?
  3. Komu warto polecić ten produkt?
- **Zanim opublikujesz:** zgoda na wizerunek i prawo do użycia filmu (str. 22). Jeśli klient dostał coś w zamian –
  oznaczenie reklamy (str. 21).

**Format 4 – Założyciel mówi do kamery**

- **Co pokazuje:** jedną myśl w 20–40 sekund – dlaczego produkt powstał albo czym różni się od tańszych.
- **Jak nagrać:** telefon na wysokości oczu, światło z okna przed twarzą, jedno zdanie na ujęcie, napisy.
- **Przykład:** „Tańsze lampy mają jedną barwę światła. Nasza ma trzy – pokażę różnicę”.

**Zasada dla obu formatów:** tylko prawdziwe słowa klientów i prawdziwe cechy produktu. Opinie i porównania
podlegają ustawie o przeciwdziałaniu nieuczciwym praktykom rynkowym.

---

## Str. 16 · Formaty 5–6: obiekcja i karuzela

**Marker:** [ 03 / 6 FORMATÓW Z TELEFONU ]
**Nagłówek:** FORMATY 5–6: OBIEKCJA I KARUZELA

**Lead:** Najlepsze pomysły na reklamy są w skrzynce obsługi klienta. Klienci sami mówią, co ich powstrzymuje przed
zakupem.

**Format 5 – Odpowiedź na obiekcję**

- **Co pokazuje:** pytanie, które klienci zadają przed zakupem, i odpowiedź pokazaną na produkcie.
- **Przykład:** „Czy ta lampa nie będzie za jasna do sypialni?” – i pokaz ściemniania w ciemnym pokoju.
- **Skąd pytania:** czat, maile, komentarze pod reklamami, pytania w sklepie.

**Format 6 – Karuzela „3 powody”**

- **Co pokazuje:** 3–5 kart: powód 1, powód 2, powód 3, opinia klienta, zaproszenie do zakupu.
- **Meta:** karuzela pozwala pokazać kilka obrazów lub filmów w jednej reklamie, każdy z własnym nagłówkiem i linkiem.
  To tańsza droga, jeśli film jest zbyt drogi w produkcji.
- **Format:** kwadrat 1:1, te same proporcje na wszystkich kartach. Proporcje 4:5 Meta dopuszcza w karuzeli tylko
  w reklamach katalogu Advantage+.

**Jak wybrać, od czego zacząć:** jeśli nie masz jeszcze żadnych filmów – formaty 1 i 2. Jeśli masz klientów, którzy
chętnie mówią o produkcie – format 3.

---

## Str. 17 · Pierwsze 3 sekundy: 10 haków

**Marker:** [ 03 / 6 FORMATÓW Z TELEFONU ]
**Nagłówek:** PIERWSZE 3 SEKUNDY: 10 HAKÓW

**Lead:** Hak to pierwszy obraz i pierwsze zdanie. Meta zaleca pokazać ruch albo korzyść w ciągu pierwszych 3 sekund.

**10 gotowych początków – przykład: lampa**

1. **Efekt:** „Ten sam pokój, dwa światła. Które wybierasz?”
2. **Sytuacja:** „Pracujesz przy biurku po zmroku?”
3. **Liczba:** „3 barwy światła w jednej lampie.”
4. **Porównanie:** „Lewa strona – zwykła żarówka. Prawa – nasza lampa.”
5. **Obiekcja:** „Za jasna do sypialni? Sprawdźmy.”
6. **Za kulisami:** „Tak pakujemy każdą lampę.”
7. **Błąd:** „Najczęstszy błąd przy wyborze lampy do biurka.”
8. **Opinia:** prawdziwe zdanie klienta w pierwszym kadrze.
9. **Test:** „Spadła z biurka. Zobacz, co się stało.” – tylko po prawdziwym teście.
10. **Termin:** „Zamów do 14:00 – wyślemy dziś.” – tylko jeśli to prawda.

**Uwaga – cechy osobowe.** Standardy reklamowe Meta zakazują treści, które przypisują lub sugerują cechy osobowe
odbiorcy: m.in. wiek, zdrowie fizyczne i psychiczne, trudną sytuację finansową, religię, przekonania. Zwracanie się
na „ty” jest dozwolone, jeśli nie dotyczy takiej cechy.

| Nie wolno            | Wolno                               |
| -------------------- | ----------------------------------- |
| „Czy masz cukrzycę?” | „Nowe leczenie cukrzycy dostępne”   |
| „Jesteś bankrutem?”  | opis usługi bez założeń o odbiorcy  |
| „Masz trądzik?”      | „Krem do cery z niedoskonałościami” |

_Pierwsze dwa wiersze to przykłady Meta, trzeci – nasz._

---

## Str. 18 · Technika: telefon wystarczy

**Marker:** [ 03 / 6 FORMATÓW Z TELEFONU ]
**Nagłówek:** TECHNIKA: TELEFON WYSTARCZY

**Lead:** 6 zasad na 10 minut. Oszczędzą Ci przyciętych napisów i zasłoniętego logo.

1. **Format:** pionowo 9:16 dla relacji i rolek; 1:1 lub 4:5 dla aktualności.
2. **Bezpieczna strefa:** w formacie 9:16 nie umieszczaj tekstu, logo i najważniejszych elementów przy krawędziach –
   górnej, dolnej i bocznych. Jeśli w rolce jest zastrzeżenie, np. warunki oferty, zostaw dolne 40% kadru bez tekstu
   i logo.
3. **Napisy:** włącz automatyczne napisy – część osób ogląda bez dźwięku.
4. **Długość:** proste formaty 5–10 sekund. Opinia klienta i założyciel – do 30–40 sekund (nasza rekomendacja).
5. **Tekst reklamy:** do 125 znaków tekstu podstawowego, 40 znaków nagłówka i 25 znaków opisu. Dłuższy tekst może
   zostać skrócony.
6. **Jedno wezwanie do działania.** Meta: reklama powinna zawierać zwykle tylko jedno.

**Od nas:** światło z okna, telefon na statywie, mikrofon krawatowy do mówienia do kamery i muzyka tylko z licencją
na reklamy.

_Zasady 1–3, 5 i 6 pochodzą z Centrum pomocy Meta. Sprawdzaj bezpieczną strefę w podglądzie Menedżera reklam._

---

## Str. 19 · Dzień nagrań: 18 filmów

**Marker:** [ 03 / 6 FORMATÓW Z TELEFONU ]
**Nagłówek:** DZIEŃ NAGRAŃ: 18 FILMÓW

**Lead:** Jeden dzień, jeden telefon: 6 formatów po 3 wersje. To kreacje na 6 tygodni.

| Godzina     | Co nagrywasz                                                | Filmy |
| ----------- | ----------------------------------------------------------- | ----- |
| 9:00–9:30   | Przygotowanie: produkt, tło, światło, lista ujęć            | –     |
| 9:30–10:30  | Format 1 – demo w 3 miejscach                               | 3     |
| 10:30–11:00 | Format 2 – zdjęcia do animacji, 3 korzyści                  | 3     |
| 11:00–12:30 | Format 4 – założyciel, 3 tematy                             | 3     |
| 12:30–13:00 | Przerwa                                                     | –     |
| 13:00–14:00 | Format 5 – 3 obiekcje                                       | 3     |
| 14:00–15:00 | Format 6 – zdjęcia do 3 karuzel                             | 3     |
| 15:00–17:00 | Format 3 – 3 opinie od klientów (zebrane wcześniej), montaż | 3     |

**Co dalej:** 18 filmów to 3 paczki po 6 kreacji. Nowa paczka co 2 tygodnie (str. 28).

**Lista ujęć na każdy film:** hak (0–3 s), 2–3 ujęcia korzyści, produkt z bliska, karta końcowa z jednym wezwaniem.

_Plan dnia to nasza rekomendacja dla jednego produktu. Przy kilku produktach nagraj te same formaty dla
bestsellerów._

> **Do zrobienia dziś**
>
> 1. Zbierz 10 pytań klientów z czatu i maili – to materiał na format 5.
> 2. Wyznacz dzień nagrań i poproś 3 klientów o krótkie nagranie opinii (zgoda – str. 22).

---

## Źródła do rozdziałów 01–03 (trafią na str. 40)

| Fakt                                                                                                                                                                       | Źródło                                                                                                                                                                                                                                                                                  | Data dostępu |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Wybór kandydatów: z dziesiątek milionów do kilku tysięcy reklam; Andromeda; liczba kreacji z narzędzi SI rośnie; ponad milion reklamodawców, ponad 15 mln reklam w miesiąc | Engineering at Meta, „Meta Andromeda: Supercharging Advantage+ automation with the next-gen personalized ads retrieval engine”, 2.12.2024: https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/ | 25.09.2026   |
| GEM uczy się z treści reklam i zachowań; cechy reklamy (format, reprezentacja kreacji)                                                                                     | Engineering at Meta, „Meta’s Generative Ads Model (GEM)”, 10.11.2025: https://engineering.fb.com/2025/11/10/ml-applications/metas-generative-ads-model-gem-the-central-brain-accelerating-ads-recommendation-ai-innovation/                                                             | 25.09.2026   |
| Spersonalizowane reklamy: trafne 29%, nietrafne 24%                                                                                                                        | Gemius, „E-commerce w Polsce 2025”, s. 272 (wszyscy respondenci, N=1629): https://gemius.com/documents/81/RAPORT_E-COMMERCE_2025.pdf                                                                                                                                                    | 25.09.2026   |
| Łączna wartość: oferta, szacunkowy współczynnik działań, jakość; cechy niskiej jakości; trafna reklama może wygrać z wyższą ofertą                                         | Centrum pomocy dla firm Meta, „Aukcje reklamowe – informacje”: https://www.facebook.com/business/help/430291176997542                                                                                                                                                                   | 25.09.2026   |
| Sygnały grupy Advantage+; −7,2% kosztu wyniku w kampaniach sprzedażowych                                                                                                   | Centrum pomocy dla firm Meta, „Grupa odbiorców Advantage+ – informacje”: https://www.facebook.com/business/help/273363992030035                                                                                                                                                         | 25.09.2026   |
| Kampanie sprzedażowe Advantage+: −9% kosztu konwersji; zróżnicowane materiały; pełne optymalizacje przy grupie, umiejscowieniach i budżecie Advantage+                     | Centrum pomocy dla firm Meta, „Kampanie sprzedażowe Advantage+ – informacje”: https://www.facebook.com/business/help/1362234537597370                                                                                                                                                   | 25.09.2026   |
| Faza uczenia się: ok. 50 wyników w tygodniu                                                                                                                                | Centrum pomocy dla firm Meta, „Faza uczenia się – informacje”: https://www.facebook.com/business/help/112167992830700                                                                                                                                                                   | 25.09.2026   |
| „Ograniczone uczenie” i sposoby: łączenie, szersza grupa, budżet, częstsze zdarzenie                                                                                       | Centrum pomocy dla firm Meta, „Ograniczone uczenie – informacje”: https://www.facebook.com/business/help/269269737396981                                                                                                                                                                | 25.09.2026   |
| Zbyt wiele reklam daje gorsze wyniki; do 10 zasobów w reklamie; wiele opcji tekstu                                                                                         | Centrum pomocy dla firm Meta, „Zarządzanie liczbą reklam – informacje”: https://www.facebook.com/business/help/2720085414702598                                                                                                                                                         | 25.09.2026   |
| Limit 250 reklam dla stron z wydatkami poniżej 100 tys. USD                                                                                                                | Centrum pomocy dla firm Meta, „Limity reklam dla strony”: https://www.facebook.com/business/help/766697140509126                                                                                                                                                                        | 25.09.2026   |
| Znaczące zmiany: zdarzenie, nowa reklama, wstrzymanie na 7 dni, strategia ofert, duża zmiana budżetu                                                                       | Centrum pomocy dla firm Meta, „Znaczące zmiany i faza uczenia się”: https://www.facebook.com/business/help/316478108955072                                                                                                                                                              | 25.09.2026   |
| Podziały w raportach zamiast dzielenia odbiorców                                                                                                                           | Centrum pomocy dla firm Meta, „Łączenie zestawów reklam i kampanii…”: https://www.facebook.com/business/help/2419480091640105                                                                                                                                                           | 25.09.2026   |
| Nowa reklama „diametralnie różna” przy zmęczeniu                                                                                                                           | Centrum pomocy dla firm Meta, „Rekomendacje dotyczące zmęczenia materiałem reklamowym…”: https://www.facebook.com/business/help/1346816142327858                                                                                                                                        | 25.09.2026   |
| Format elastyczny: do 10 obrazów i filmów, kampanie sprzedażowe, nie na każdym koncie                                                                                      | Centrum pomocy dla firm Meta, „Elastyczny format reklamy – informacje”: https://www.facebook.com/business/help/835561738423867                                                                                                                                                          | 25.09.2026   |
| Proste materiały, telefon, karuzela, automatyczne napisy                                                                                                                   | Centrum pomocy dla firm Meta, „Najlepsze praktyki dotyczące opłacalnych materiałów reklamowych”: https://www.facebook.com/business/help/1991663177718491                                                                                                                                | 25.09.2026   |
| Obrazy i filmy: wzrost konwersji o 17% wyższy; demo; ruch i korzyść w 3 s; 5–10 s; 1:1 lub 4:5; karta końcowa                                                              | Centrum pomocy dla firm Meta, „Najlepsze praktyki dotyczące materiałów reklamowych w zakresie testowania konwersji”: https://www.facebook.com/business/help/565573477186194                                                                                                             | 25.09.2026   |
| Proporcje: 1:1 i 4:5 w aktualnościach, 9:16 w relacjach i rolkach                                                                                                          | Centrum pomocy dla firm Meta, „Najlepsze praktyki dotyczące współczynników proporcji”: https://www.facebook.com/business/help/103816146375741                                                                                                                                           | 25.09.2026   |
| Bezpieczna strefa; dolne 40% przy zastrzeżeniach w rolkach; jedno wezwanie do działania                                                                                    | Centrum pomocy dla firm Meta, „Nakładki tekstowe i bezpieczna strefa…”: https://www.facebook.com/business/help/980593475366490                                                                                                                                                          | 25.09.2026   |
| 125, 40 i 25 znaków; 1–3 wiersze tekstu                                                                                                                                    | Centrum pomocy dla firm Meta, „Najlepsze praktyki dotyczące tworzenia materiałów reklamowych z tekstem”: https://www.facebook.com/business/help/223409425500940                                                                                                                         | 25.09.2026   |
| Zakaz przypisywania cech osobowych; „ty” bez cechy osobowej dozwolone; przykłady                                                                                           | Centrum transparentności Meta, Standardy reklamowe, „Naruszenia prywatności i cechy osobowe” (wersja z 26.06.2024): https://transparency.meta.com/pl-pl/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/                                             | 25.09.2026   |
| Nieprawdziwe informacje o cechach produktu                                                                                                                                 | Ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym, t.j. Dz.U. 2023 poz. 845, art. 5 ust. 3 pkt 2                                                                                                                                                                                 | 25.09.2026   |
| Faza uczenia się a budżet                                                                                                                                                  | Wyliczenia w `kalkulator.mjs` – założenia, nie dane z rynku                                                                                                                                                                                                                             | –            |

**Uwagi redakcyjne:**

- **Liczby Meta** (7,2%, 9%, 17%, 15 mln reklam) to dane z badań i szacunków Meta. W tekście zawsze jako „dane
  Meta”, bez przeliczania na złote.
- **„Kreacja to nowe targetowanie”** – nasz wniosek z opisów Meta (sygnały grupy Advantage+, zróżnicowane materiały,
  GEM), a nie cytat Meta.
- **Struktura konta (str. 12), zasada 2 osi (str. 11) i plan dnia nagrań (str. 19)** – nasze rekomendacje.
- **Nazwy funkcji i statusów** jak w polskiej wersji Centrum pomocy Meta z 25.09.2026. Meta zmienia je często.
  **[SPRAWDZIĆ przed premierą]**
