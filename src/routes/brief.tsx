import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getOrderBySession, submitBrief } from "@/lib/orders.functions";
import { CONTACT } from "@/lib/contact";

const SearchSchema = z.object({
  session_id: z.string().optional(),
});

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Brief projektu | KSIGN" },
      { name: "description", content: "Uzupełnij brief swojego projektu — przekaż nam treści i materiały, żebyśmy mogli wystartować z realizacją strony." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Brief projektu | KSIGN" },
      { property: "og:description", content: "Uzupełnij brief swojego projektu — przekaż nam treści i materiały, żebyśmy mogli wystartować z realizacją strony." },
      { property: "og:url", content: "https://ksign.pl/brief" },
    ],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: BriefPage,
});

function BriefPage() {
  const { session_id } = Route.useSearch();
  const navigate = useNavigate();
  const fetchOrder = useServerFn(getOrderBySession);
  const submit = useServerFn(submitBrief);

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", session_id],
    queryFn: () => (session_id ? fetchOrder({ data: { sessionId: session_id } }) : null),
    enabled: !!session_id,
  });

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!session_id) {
    return (
      <Centered>
        <p>Brak identyfikatora zamówienia. <Link to="/" className="underline">Wróć na stronę</Link>.</p>
      </Centered>
    );
  }
  if (isLoading) return <Centered><p>Ładowanie…</p></Centered>;
  if (!order) {
    return (
      <Centered>
        <p>Nie znaleziono zamówienia. Skontaktuj się z nami: <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
      </Centered>
    );
  }
  if (done || order.brief_completed) {
    return (
      <Centered>
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-black mb-3">Brief odebrany</h1>
        <p className="text-ink/70 mb-6">Odezwiemy się w ciągu 24h, żeby ustalić start prac.</p>
        <Link to="/" className="underline text-sm">← Strona główna</Link>
      </Centered>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          sessionId: session_id,
          companyName: (fd.get("companyName") as string) || "",
          industry: (fd.get("industry") as string) || "",
          goals: (fd.get("goals") as string) || "",
          brandColors: (fd.get("brandColors") as string) || "",
          contentNotes: (fd.get("contentNotes") as string) || "",
          logoUrl: (fd.get("logoUrl") as string) || "",
          inspirations: (fd.get("inspirations") as string) || "",
          phone: (fd.get("phone") as string) || "",
        },
      });
      setDone(true);
      setTimeout(() => navigate({ to: "/" }), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Link to="/" className="text-sm text-ink/70 hover:text-ink">← Strona główna</Link>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-2">Brief projektu</h1>
        <p className="text-ink/60 mb-8">
          {order.product_name} — opłacone. Wypełnij krótki brief, żebyśmy mogli zacząć prace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-ink/10 rounded-3xl p-7 md:p-9">
          <Field label="Nazwa firmy *" name="companyName" required />
          <Field label="Branża *" name="industry" required placeholder="np. fotografia ślubna, kawiarnia, kancelaria" />
          <TextArea label="Cel strony *" name="goals" required placeholder="Co strona ma osiągnąć? Co klient ma zrobić?" />
          <Field label="Kolory / preferencje brandowe" name="brandColors" placeholder="np. czerń + złoto, lub mam już brandbook" />
          <Field label="Logo (link do pliku)" name="logoUrl" type="url" placeholder="https://… (Drive, Dropbox, WeTransfer)" />
          <TextArea label="Treści / czego nie pisać" name="contentNotes" placeholder="Wklej teksty albo opisz, co ma się znaleźć" />
          <TextArea label="Inspiracje (linki do stron, które Ci się podobają)" name="inspirations" />
          <Field label="Telefon kontaktowy" name="phone" type="tel" />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition disabled:opacity-50"
          >
            {submitting ? "Wysyłam…" : "Wyślij brief →"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5 text-center">
      <div className="max-w-xl">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-widest text-ink/70 mb-2">{label}</label>
      <input id={id} name={name} type={type} required={required} placeholder={placeholder} className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink" />
    </div>
  );
}

function TextArea({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-widest text-ink/70 mb-2">{label}</label>
      <textarea id={id} name={name} required={required} placeholder={placeholder} rows={4} className="w-full bg-white border border-ink/15 rounded-2xl px-4 py-3.5 font-medium focus:outline-none focus:border-ink resize-none" />
    </div>
  );
}
