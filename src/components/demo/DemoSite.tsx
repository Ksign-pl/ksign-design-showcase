// Szablon strony klienta renderowany w podglądzie doradcy ORAZ na publicznym
// /d/$slug. Responsywność przez container queries (@3xl/@5xl) — dzięki temu ta
// sama strona poprawnie reaguje na szerokość ramki podglądu (desktop/mobile)
// i na realny viewport. Branding przez CSS custom properties — każda zmiana
// briefu aktualizuje wygląd natychmiast, bez ponownego generowania treści.

import { useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { buildBrandPalette, companyInitials, resolveBrandColor } from "@/lib/demo/branding";
import {
  getPackage,
  getSiteType,
  type DemoContent,
  type PackageId,
  type SiteTypeId,
} from "@/lib/demo/schema";
import { CardMotif, HeroMotif, SectionMotif } from "./motifs";

export type DemoPage = "home" | "oferta" | "kontakt";

export interface DemoSiteData {
  companyName: string;
  mainService: string;
  city: string;
  siteType: SiteTypeId;
  packageId: PackageId;
  brandColor?: string | null;
  logoUrl?: string | null;
}

export interface DemoSiteNav {
  /** Bieżąca podstrona (tylko pakiety wielostronicowe). */
  page: DemoPage;
  /** Bazowy adres publiczny (np. /d/slug) — nadaje linkom prawdziwe href. */
  linkBase?: string;
  /** Nawigacja bez przeładowania (podgląd w panelu / router na publicznym). */
  onNavigate?: (page: DemoPage) => void;
}

interface DemoSiteProps {
  data: DemoSiteData;
  content: DemoContent;
  nav: DemoSiteNav;
}

const SERIF_TYPES: SiteTypeId[] = ["beauty", "gastro", "realestate"];

function useDemoTheme(data: DemoSiteData) {
  return useMemo(() => {
    const palette = buildBrandPalette(
      resolveBrandColor({ brandColor: data.brandColor ?? "", siteType: data.siteType }),
    );
    const serif = SERIF_TYPES.includes(data.siteType);
    return { palette, serif };
  }, [data.brandColor, data.siteType]);
}

function BrandMark({ data, size = "md" }: { data: DemoSiteData; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-11 w-11 text-lg" : "h-8 w-8 text-sm";
  const text = size === "lg" ? "text-lg" : "text-[15px]";
  if (data.logoUrl) {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <img
          src={data.logoUrl}
          alt={`${data.companyName} — logo`}
          className={`${size === "lg" ? "h-11" : "h-8"} w-auto max-w-[140px] object-contain`}
        />
      </span>
    );
  }
  // Tymczasowy wordmark budowany z nazwy firmy.
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`${box} flex shrink-0 items-center justify-center rounded-lg font-black tracking-tight`}
        style={{ background: "var(--dk-base)", color: "var(--dk-on-base)" }}
      >
        {companyInitials(data.companyName)}
      </span>
      <span className={`${text} truncate font-extrabold tracking-tight`}>{data.companyName}</span>
    </span>
  );
}

function NavLink({
  nav,
  page,
  children,
  className,
  style,
}: {
  nav: DemoSiteNav;
  page: DemoPage;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const path = page === "home" ? "" : `/${page}`;
  const href = nav.linkBase ? `${nav.linkBase}${path}` : `#${page === "home" ? "top" : page}`;
  const active = nav.page === page;
  return (
    <a
      href={href}
      style={style}
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        if (nav.onNavigate) {
          e.preventDefault();
          nav.onNavigate(page);
        }
      }}
      className={
        className ??
        `rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
          active ? "bg-[var(--dk-soft)] text-[var(--dk-ink)]" : "opacity-75 hover:opacity-100"
        }`
      }
    >
      {children}
    </a>
  );
}

function AnchorLink({
  target,
  children,
  className,
}: {
  target: "oferta" | "kontakt" | "top";
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`#${target}`}
      className={
        className ??
        "rounded-full px-3 py-1.5 text-[13px] font-semibold opacity-75 hover:opacity-100"
      }
    >
      {children}
    </a>
  );
}

function CtaButton({
  href,
  onClick,
  children,
  variant = "primary",
}: {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
  variant?: "primary" | "onDark";
}) {
  const styles: CSSProperties =
    variant === "primary"
      ? { background: "var(--dk-base)", color: "var(--dk-on-base)" }
      : { background: "var(--dk-paper)", color: "var(--dk-ink)" };
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.99]"
      style={styles}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function MonoLabel({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return (
    <div
      className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em]"
      style={{ color: onDark ? "var(--dk-on-dark)" : "var(--dk-base)", opacity: onDark ? 0.7 : 1 }}
    >
      {children}
    </div>
  );
}

function DemoContactForm({ headingId }: { headingId?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <form onSubmit={handleSubmit} aria-labelledby={headingId} className="space-y-3">
      <div className="grid gap-3 @3xl:grid-cols-2">
        <div>
          <label
            htmlFor="demo-form-name"
            className="mb-1 block text-[12px] font-semibold opacity-80"
          >
            Imię i nazwisko
          </label>
          <input
            id="demo-form-name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--dk-base)]"
          />
        </div>
        <div>
          <label
            htmlFor="demo-form-email"
            className="mb-1 block text-[12px] font-semibold opacity-80"
          >
            E-mail
          </label>
          <input
            id="demo-form-email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--dk-base)]"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="demo-form-message"
          className="mb-1 block text-[12px] font-semibold opacity-80"
        >
          Wiadomość
        </label>
        <textarea
          id="demo-form-message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--dk-base)]"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold tracking-tight"
        style={{ background: "var(--dk-base)", color: "var(--dk-on-base)" }}
      >
        Wyślij wiadomość <span aria-hidden="true">→</span>
      </button>
      <p role="status" aria-live="polite" className="min-h-5 text-[13px] font-medium">
        {submitted
          ? "To jest demonstracja — formularz zostanie uruchomiony po realizacji projektu."
          : ""}
      </p>
    </form>
  );
}

/* ============================== SEKCJE ============================== */

function HeroSection({
  data,
  content,
  serif,
  ctaHref,
  onCtaClick,
}: {
  data: DemoSiteData;
  content: DemoContent;
  serif: boolean;
  ctaHref: string;
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const siteType = getSiteType(data.siteType);
  return (
    <section id="top" className="relative overflow-hidden" style={{ background: "var(--dk-soft)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-12 @3xl:grid-cols-[1.15fr_0.85fr] @3xl:gap-10 @3xl:px-8 @3xl:pb-20 @3xl:pt-16">
        <div>
          <MonoLabel>
            {siteType.label} · {data.city}
          </MonoLabel>
          <h1
            className={`text-[34px] leading-[1.02] tracking-[-0.03em] @3xl:text-[54px] @5xl:text-[64px] ${
              serif ? "font-heading font-normal" : "font-black"
            }`}
          >
            {content.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-85 @3xl:text-[17px]">
            {content.heroSubtitle}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <CtaButton href={ctaHref} onClick={onCtaClick}>
              {content.cta}
            </CtaButton>
            <span className="text-[13px] font-semibold opacity-70">
              {data.mainService.length > 60
                ? `${data.mainService.slice(0, 59)}…`
                : data.mainService}
            </span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[280px] @3xl:max-w-[360px]">
          <HeroMotif
            type={data.siteType}
            base="var(--dk-base)"
            tint="var(--dk-tint)"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

function TrustSection({ content }: { content: DemoContent }) {
  return (
    <section style={{ background: "var(--dk-dark)", color: "var(--dk-on-dark)" }}>
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 @3xl:grid-cols-3 @3xl:gap-8 @3xl:px-8 @3xl:py-10">
        {content.trustPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold"
              style={{ background: "var(--dk-base)", color: "var(--dk-on-base)" }}
            >
              {i + 1}
            </span>
            <p className="text-[14px] font-medium leading-snug opacity-90">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection({
  data,
  content,
  serif,
}: {
  data: DemoSiteData;
  content: DemoContent;
  serif: boolean;
}) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 @3xl:grid-cols-[0.4fr_0.6fr] @3xl:gap-12 @3xl:px-8 @3xl:py-20">
      <div className="order-2 mx-auto w-full max-w-[220px] @3xl:order-1 @3xl:max-w-[280px]">
        <SectionMotif
          type={data.siteType}
          base="var(--dk-base)"
          tint="var(--dk-tint)"
          className="h-auto w-full"
        />
      </div>
      <div className="order-1 @3xl:order-2">
        <MonoLabel>O nas</MonoLabel>
        <h2
          className={`text-[26px] leading-tight tracking-[-0.02em] @3xl:text-[36px] ${serif ? "font-heading font-normal" : "font-extrabold"}`}
        >
          {data.companyName}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed opacity-85 @3xl:text-[16px]">
          {content.aboutText}
        </p>
      </div>
    </section>
  );
}

function ServicesSection({
  data,
  content,
  serif,
  id,
  intro,
}: {
  data: DemoSiteData;
  content: DemoContent;
  serif: boolean;
  id?: string;
  intro?: string;
}) {
  return (
    <section id={id} style={{ background: "var(--dk-soft)" }}>
      <div className="mx-auto max-w-6xl px-5 py-14 @3xl:px-8 @3xl:py-20">
        <MonoLabel>{id === "oferta" ? "Oferta" : "Co robimy"}</MonoLabel>
        <h2
          className={`max-w-2xl text-[26px] leading-tight tracking-[-0.02em] @3xl:text-[36px] ${serif ? "font-heading font-normal" : "font-extrabold"}`}
        >
          Zakres usług
        </h2>
        {intro ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed opacity-85">{intro}</p>
        ) : null}
        <div className="mt-8 grid gap-5 @3xl:grid-cols-3">
          {content.services.map((service, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl border border-black/10 bg-[var(--dk-paper)] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]"
            >
              <CardMotif
                type={data.siteType}
                base="var(--dk-base)"
                tint="var(--dk-tint)"
                index={i}
                className="h-auto w-full"
              />
              <div className="p-5">
                <h3 className="text-[17px] font-bold tracking-tight">{service.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed opacity-80">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcommerceConceptSection({
  data,
  content,
  serif,
}: {
  data: DemoSiteData;
  content: DemoContent;
  serif: boolean;
}) {
  return (
    <section id="oferta" style={{ background: "var(--dk-soft)" }}>
      <div className="mx-auto max-w-6xl px-5 py-14 @3xl:px-8 @3xl:py-20">
        <MonoLabel>Sklep — koncept</MonoLabel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            className={`max-w-2xl text-[26px] leading-tight tracking-[-0.02em] @3xl:text-[36px] ${serif ? "font-heading font-normal" : "font-extrabold"}`}
          >
            Wybrane kategorie
          </h2>
          <p className="text-[12px] font-semibold uppercase tracking-wide opacity-60">
            Koncept wizualny — koszyk i płatności wdrażamy przy realizacji
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed opacity-85">
          {content.offerIntro}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 @3xl:grid-cols-4 @3xl:gap-5">
          {content.services
            .flatMap((service, i) => [
              { title: service.title, idx: i * 2 },
              { title: `${service.title} — nowości`, idx: i * 2 + 1 },
            ])
            .slice(0, 4)
            .map((item) => (
              <article
                key={item.idx}
                className="overflow-hidden rounded-2xl border border-black/10 bg-[var(--dk-paper)]"
              >
                <CardMotif
                  type={data.siteType}
                  base="var(--dk-base)"
                  tint="var(--dk-tint)"
                  index={item.idx}
                  className="h-auto w-full"
                />
                <div className="p-4">
                  <h3 className="truncate text-[14px] font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                    Kolekcja
                  </p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({
  data,
  content,
  serif,
  id,
}: {
  data: DemoSiteData;
  content: DemoContent;
  serif: boolean;
  id?: string;
}) {
  return (
    <section id={id}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 @3xl:grid-cols-[0.45fr_0.55fr] @3xl:px-8 @3xl:py-20">
        <div>
          <MonoLabel>Kontakt</MonoLabel>
          <h2
            id="demo-contact-heading"
            className={`text-[26px] leading-tight tracking-[-0.02em] @3xl:text-[36px] ${serif ? "font-heading font-normal" : "font-extrabold"}`}
          >
            {content.contactHeading}
          </h2>
          <dl className="mt-6 space-y-4 text-[14px]">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
                Obszar działania
              </dt>
              <dd className="mt-1 font-semibold">{data.city}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
                Zakres
              </dt>
              <dd className="mt-1 font-semibold">{data.mainService}</dd>
            </div>
          </dl>
        </div>
        <div
          className="rounded-2xl border border-black/10 p-5 @3xl:p-7"
          style={{ background: "var(--dk-soft)" }}
        >
          <DemoContactForm headingId="demo-contact-heading" />
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ nav, content }: { nav: DemoSiteNav; content: DemoContent }) {
  return (
    <section style={{ background: "var(--dk-dark)", color: "var(--dk-on-dark)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 @3xl:flex-row @3xl:items-center @3xl:px-8 @3xl:py-16">
        <div>
          <MonoLabel onDark>Zacznijmy</MonoLabel>
          <p className="max-w-xl text-[22px] font-extrabold leading-tight tracking-[-0.02em] @3xl:text-[30px]">
            {content.offerIntro}
          </p>
        </div>
        <NavLink
          nav={nav}
          page="kontakt"
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold tracking-tight transition-transform hover:scale-[1.02]"
          style={{ background: "var(--dk-base)", color: "var(--dk-on-base)" }}
        >
          {content.cta} <span aria-hidden="true">→</span>
        </NavLink>
      </div>
    </section>
  );
}

function SiteFooter({ data }: { data: DemoSiteData }) {
  return (
    <footer style={{ background: "var(--dk-dark)", color: "var(--dk-on-dark)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-5 py-7 text-[12px] @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:px-8">
        <p className="font-semibold">
          {data.companyName} · {data.city}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
          Projekt demonstracyjny — przygotowano w KSIGN
        </p>
      </div>
    </footer>
  );
}

/* ============================== SHELL ============================== */

export function DemoSite({ data, content, nav }: DemoSiteProps) {
  const { palette, serif } = useDemoTheme(data);
  const pkg = getPackage(data.packageId);
  const multiPage = pkg.multiPage;
  const isEcommerce = data.packageId === "ecommerce";

  const themeVars = {
    "--dk-base": palette.base,
    "--dk-dark": palette.dark,
    "--dk-soft": palette.soft,
    "--dk-tint": palette.tint,
    "--dk-on-base": palette.onBase,
    "--dk-on-dark": palette.onDark,
    "--dk-paper": palette.paper,
    "--dk-ink": palette.ink,
  } as CSSProperties;

  const navLinks = multiPage ? (
    <>
      <NavLink nav={nav} page="home">
        Home
      </NavLink>
      <NavLink nav={nav} page="oferta">
        Oferta
      </NavLink>
      <NavLink nav={nav} page="kontakt">
        Kontakt
      </NavLink>
    </>
  ) : (
    <>
      <AnchorLink target="top">Home</AnchorLink>
      <AnchorLink target="oferta">Oferta</AnchorLink>
      <AnchorLink target="kontakt">Kontakt</AnchorLink>
    </>
  );

  const heroCtaProps = multiPage
    ? {
        ctaHref: nav.linkBase ? `${nav.linkBase}/kontakt` : "#kontakt",
        onCtaClick: nav.onNavigate
          ? (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              nav.onNavigate?.("kontakt");
            }
          : undefined,
      }
    : { ctaHref: "#kontakt", onCtaClick: undefined };

  return (
    <div
      className="@container min-h-full"
      style={{ ...themeVars, background: "var(--dk-paper)", color: "var(--dk-ink)" }}
      lang="pl"
    >
      <header
        className="sticky top-0 z-20 border-b border-black/10 backdrop-blur"
        style={{ background: "color-mix(in oklab, var(--dk-paper) 88%, transparent)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 @3xl:px-8">
          {multiPage ? (
            <NavLink nav={nav} page="home" className="min-w-0">
              <BrandMark data={data} />
            </NavLink>
          ) : (
            <a href="#top" className="min-w-0">
              <BrandMark data={data} />
            </a>
          )}
          <nav aria-label="Nawigacja strony demo" className="flex items-center gap-1">
            {navLinks}
          </nav>
        </div>
      </header>

      <main>
        {multiPage ? (
          <>
            {nav.page === "home" && (
              <>
                <HeroSection data={data} content={content} serif={serif} {...heroCtaProps} />
                <TrustSection content={content} />
                <AboutSection data={data} content={content} serif={serif} />
                <ServicesSection data={data} content={content} serif={serif} />
                <CtaBanner nav={nav} content={content} />
              </>
            )}
            {nav.page === "oferta" && (
              <>
                <section style={{ background: "var(--dk-soft)" }}>
                  <div className="mx-auto max-w-6xl px-5 pb-4 pt-12 @3xl:px-8 @3xl:pt-16">
                    <MonoLabel>Oferta</MonoLabel>
                    <h1
                      className={`text-[30px] leading-tight tracking-[-0.03em] @3xl:text-[44px] ${serif ? "font-heading font-normal" : "font-black"}`}
                    >
                      Co możemy dla Ciebie zrobić
                    </h1>
                    <p className="mt-3 max-w-2xl pb-6 text-[15px] leading-relaxed opacity-85">
                      {content.offerIntro}
                    </p>
                  </div>
                </section>
                <ServicesSection data={data} content={content} serif={serif} />
                <TrustSection content={content} />
              </>
            )}
            {nav.page === "kontakt" && (
              <>
                <ContactSection data={data} content={content} serif={serif} />
                <TrustSection content={content} />
              </>
            )}
          </>
        ) : isEcommerce ? (
          <>
            <HeroSection data={data} content={content} serif={serif} ctaHref="#oferta" />
            <TrustSection content={content} />
            <EcommerceConceptSection data={data} content={content} serif={serif} />
            <AboutSection data={data} content={content} serif={serif} />
            <ContactSection data={data} content={content} serif={serif} id="kontakt" />
          </>
        ) : (
          <>
            <HeroSection data={data} content={content} serif={serif} {...heroCtaProps} />
            <TrustSection content={content} />
            <AboutSection data={data} content={content} serif={serif} />
            <ServicesSection
              data={data}
              content={content}
              serif={serif}
              id="oferta"
              intro={content.offerIntro}
            />
            <ContactSection data={data} content={content} serif={serif} id="kontakt" />
          </>
        )}
      </main>

      <SiteFooter data={data} />
    </div>
  );
}
