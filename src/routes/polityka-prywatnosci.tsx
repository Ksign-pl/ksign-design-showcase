import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka prywatności — KSIGN" },
      { name: "description", content: "Informacje o przetwarzaniu danych osobowych przez KSIGN zgodnie z RODO." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Polityka prywatności — KSIGN" },
      { property: "og:description", content: "Informacje o przetwarzaniu danych osobowych przez KSIGN zgodnie z RODO." },
      { property: "og:image", content: "https://ksign.pl/og-image.jpg" },
      { property: "og:url", content: "https://ksign.pl/polityka-prywatnosci" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "KSIGN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Polityka prywatności — KSIGN" },
      { name: "twitter:description", content: "Informacje o przetwarzaniu danych osobowych przez KSIGN zgodnie z RODO." },
      { name: "twitter:image", content: "https://ksign.pl/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ksign.pl/polityka-prywatnosci" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://ksign.pl/" },
            { "@type": "ListItem", position: 2, name: "Polityka prywatności", item: "https://ksign.pl/polityka-prywatnosci" },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-cream text-ink min-h-screen">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <Link to="/" className="text-xs font-mono uppercase tracking-widest text-ink/50 hover:text-violet">← Powrót</Link>
        <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tighter">Polityka prywatności</h1>
        <p className="mt-4 text-ink/60">Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}</p>

        <div className="prose-content mt-10 space-y-8 text-ink/80 leading-relaxed">
          <Section title="1. Administrator danych">
            <p>
              Administratorem Twoich danych osobowych w rozumieniu Rozporządzenia Parlamentu Europejskiego i Rady (UE)
              2016/679 z dnia 27 kwietnia 2016 r. (dalej: <strong>RODO</strong>) jest:
            </p>
            <p className="mt-3">
              <strong>KSIGN [pełna nazwa firmy]</strong><br />
              ul. [adres], [kod] [miasto], Polska<br />
              NIP: [NIP], REGON: [REGON]<br />
              E-mail: <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>
            </p>
            <p className="mt-3 text-sm text-ink/60">
              Uzupełnij dane firmy przed publikacją.
            </p>
          </Section>

          <Section title="2. Inspektor Ochrony Danych">
            <p>
              Nie wyznaczyliśmy Inspektora Ochrony Danych. We wszelkich sprawach związanych z przetwarzaniem danych
              osobowych prosimy o kontakt: <a href="mailto:hello@ksign.pl" className="underline">hello@ksign.pl</a>.
            </p>
          </Section>

          <Section title="3. Cele i podstawy prawne przetwarzania">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Obsługa zapytań z formularza kontaktowego</strong> — art. 6 ust. 1 lit. b RODO (działania zmierzające do zawarcia umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — odpowiedź na zapytanie).</li>
              <li><strong>Realizacja umowy / świadczenie usług</strong> — art. 6 ust. 1 lit. b RODO.</li>
              <li><strong>Wypełnienie obowiązków prawnych</strong> (księgowość, podatki) — art. 6 ust. 1 lit. c RODO w zw. z odpowiednimi przepisami.</li>
              <li><strong>Marketing bezpośredni / newsletter</strong> — art. 6 ust. 1 lit. a RODO (zgoda) oraz art. 10 ustawy o świadczeniu usług drogą elektroniczną i art. 172 Prawa telekomunikacyjnego.</li>
              <li><strong>Pliki cookies analityczne i marketingowe</strong> — art. 6 ust. 1 lit. a RODO (zgoda wyrażona w bannerze cookies).</li>
              <li><strong>Dochodzenie lub obrona roszczeń</strong> — art. 6 ust. 1 lit. f RODO.</li>
            </ul>
          </Section>

          <Section title="4. Zakres przetwarzanych danych">
            <p>Przetwarzamy dane podane przez Ciebie w formularzu lub e-mailu: imię, nazwisko, adres e-mail,
            numer telefonu, nazwę firmy, treść wiadomości, a także dane techniczne (adres IP, identyfikatory
            przeglądarki/urządzenia, dane z plików cookies — zgodnie z Twoimi ustawieniami zgód).</p>
          </Section>

          <Section title="5. Okres przechowywania">
            <ul className="list-disc pl-6 space-y-2">
              <li>Dane z formularza — do czasu zakończenia korespondencji oraz dodatkowo 12 miesięcy.</li>
              <li>Dane klientów — przez okres trwania umowy oraz okres wymagany przepisami (m.in. 5 lat dokumentacja księgowa).</li>
              <li>Dane przetwarzane na podstawie zgody — do momentu wycofania zgody.</li>
              <li>Dane na potrzeby roszczeń — do upływu okresu przedawnienia.</li>
            </ul>
          </Section>

          <Section title="6. Odbiorcy danych">
            <p>Twoje dane mogą być udostępniane: dostawcom hostingu i poczty, biuru rachunkowemu, dostawcom narzędzi
            analitycznych i marketingowych (Google, Meta) — wyłącznie w zakresie i na podstawie odpowiednich umów
            powierzenia. Nie sprzedajemy Twoich danych.</p>
          </Section>

          <Section title="7. Przekazywanie danych poza EOG">
            <p>Niektórzy dostawcy (Google, Meta) mogą przetwarzać dane w państwach trzecich (np. USA). Odbywa się to
            na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską oraz dodatkowych
            zabezpieczeń (Data Privacy Framework).</p>
          </Section>

          <Section title="8. Twoje prawa">
            <p>Na podstawie RODO przysługuje Ci prawo do:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>dostępu do danych (art. 15),</li>
              <li>sprostowania (art. 16),</li>
              <li>usunięcia („prawo do bycia zapomnianym", art. 17),</li>
              <li>ograniczenia przetwarzania (art. 18),</li>
              <li>przenoszenia danych (art. 20),</li>
              <li>sprzeciwu wobec przetwarzania (art. 21),</li>
              <li>wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania sprzed wycofania),</li>
              <li>wniesienia skargi do <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
          </Section>

          <Section title="9. Dobrowolność podania danych">
            <p>Podanie danych jest dobrowolne, ale niezbędne do wysłania zapytania, zawarcia umowy lub otrzymywania
            informacji marketingowych.</p>
          </Section>

          <Section title="10. Profilowanie i decyzje zautomatyzowane">
            <p>Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym
            profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie wpływały.</p>
          </Section>

          <Section title="11. Pliki cookies">
            <p>Szczegóły dotyczące plików cookies opisaliśmy w osobnej{" "}
              <Link to="/polityka-cookies" className="underline">Polityce cookies</Link>.
            </p>
          </Section>

          <Section title="12. Zmiany polityki">
            <p>Zastrzegamy sobie prawo do aktualizacji niniejszej polityki. Aktualna wersja jest zawsze dostępna na
            tej stronie wraz z datą ostatniej zmiany.</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-ink mb-3">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
