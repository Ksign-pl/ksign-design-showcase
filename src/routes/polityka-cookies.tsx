import { createFileRoute, Link } from "@tanstack/react-router";
import { openConsentSettings } from "@/lib/consent";

export const Route = createFileRoute("/polityka-cookies")({
  head: () => ({
    meta: [
      { title: "Polityka cookies — KSIGN" },
      { name: "description", content: "Jakich plików cookies używamy, w jakim celu oraz jak nimi zarządzać. Zgodność z RODO i ePrivacy." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Polityka cookies — KSIGN" },
      { property: "og:description", content: "Jakich plików cookies używamy i jak nimi zarządzać." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="bg-cream text-ink min-h-screen">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <Link to="/" className="text-xs font-mono uppercase tracking-widest text-ink/50 hover:text-violet">← Powrót</Link>
        <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tighter">Polityka cookies</h1>
        <p className="mt-4 text-ink/60">Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}</p>

        <div className="mt-8">
          <button
            onClick={() => openConsentSettings()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream font-bold text-sm hover:bg-violet hover:text-ink transition"
          >
            Zarządzaj zgodami
          </button>
        </div>

        <div className="mt-10 space-y-8 text-ink/80 leading-relaxed">
          <Section title="1. Czym są pliki cookies">
            <p>Pliki cookies to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu podczas korzystania ze
            strony. Pozwalają one m.in. zapamiętać Twoje preferencje, mierzyć ruch i dopasowywać treści.</p>
          </Section>

          <Section title="2. Podstawa prawna">
            <p>Wykorzystanie cookies innych niż niezbędne wymaga Twojej zgody — zgodnie z art. 173 ustawy Prawo
            telekomunikacyjne oraz art. 6 ust. 1 lit. a RODO. Zgodę możesz w każdej chwili wycofać.</p>
          </Section>

          <Section title="3. Kategorie cookies">
            <div className="space-y-4">
              <Cat name="Niezbędne" required>
                Wymagane do podstawowego działania strony (sesja, bezpieczeństwo, zapamiętanie wyboru zgód).
                Nie wymagają zgody.
                <br /><em>Przykłady: ksign_consent_v1 (12 miesięcy).</em>
              </Cat>
              <Cat name="Analityczne">
                Pozwalają anonimowo mierzyć ruch i ulepszać stronę.
                <br /><em>Dostawca: Google LLC — Google Analytics 4 (cookies _ga, _ga_*; do 24 miesięcy).</em>
              </Cat>
              <Cat name="Marketingowe">
                Umożliwiają personalizację reklam, remarketing oraz pomiar skuteczności kampanii.
                <br /><em>Dostawca: Meta Platforms Ireland Ltd. — Meta Pixel (cookies _fbp, fr; do 90 dni).</em>
              </Cat>
            </div>
          </Section>

          <Section title="4. Przekazywanie danych poza EOG">
            <p>Dostawcy zewnętrzni (Google, Meta) mogą przetwarzać dane w państwach trzecich w oparciu o
            standardowe klauzule umowne i ramy Data Privacy Framework.</p>
          </Section>

          <Section title="5. Zarządzanie cookies">
            <p>W każdej chwili możesz zmienić swoje preferencje, klikając „Zarządzaj zgodami" powyżej lub w stopce
            strony. Możesz również usunąć/zablokować cookies w ustawieniach przeglądarki — może to jednak wpłynąć
            na działanie niektórych funkcji.</p>
          </Section>

          <Section title="6. Więcej informacji">
            <p>Szczegóły dotyczące przetwarzania danych osobowych znajdziesz w{" "}
              <Link to="/polityka-prywatnosci" className="underline">Polityce prywatności</Link>.
            </p>
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

function Cat({ name, children, required }: { name: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="rounded-2xl border border-ink/10 p-5 bg-white/40">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-black tracking-tight">{name}</span>
        {required && <span className="text-[10px] font-mono uppercase tracking-widest bg-ink text-cream px-2 py-0.5 rounded-full">Wymagane</span>}
      </div>
      <div className="text-sm text-ink/70">{children}</div>
    </div>
  );
}
