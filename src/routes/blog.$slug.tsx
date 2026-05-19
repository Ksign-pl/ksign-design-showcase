import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Link2, Check, Clock, Calendar, Tag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BLOG_POSTS, getPostBySlug, formatDate } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const url = `https://ksign.pl/blog/${params.slug}`;
    if (!post) {
      return {
        meta: [{ title: "Wpis nie znaleziony — KSIGN" }],
      };
    }
    const ogImage =
      "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/71437845-488b-42eb-9d0f-dc3a205b7e74";
    return {
      meta: [
        { title: `${post.title} — Blog KSIGN` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: [ogImage],
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "KSIGN",
              logo: { "@type": "ImageObject", url: ogImage },
            },
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: url,
            articleSection: post.category,
            keywords: post.category,
            wordCount: post.content.join(" ").split(/\s+/).length,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://ksign.pl/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://ksign.pl/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div
      className="min-h-screen flex items-center justify-center text-cream"
      style={{ background: "#0A0A0A" }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-black mb-4">Wpis nie znaleziony</h1>
        <Link to="/blog" className="text-lime underline">
          Wróć do bloga
        </Link>
      </div>
    </div>
  ),
});

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };
  const btn =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream/15 text-xs font-mono uppercase tracking-wider text-cream/70 hover:text-lime hover:border-lime/40 transition-colors";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-mono uppercase tracking-widest text-cream/40 mr-2">
        Udostępnij:
      </span>
      <a
        className={btn}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Udostępnij na LinkedIn"
      >
        LinkedIn
      </a>
      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Udostępnij na X"
      >
        X / Twitter
      </a>
      <a
        className={btn}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Udostępnij na Facebooku"
      >
        Facebook
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Skopiuj link">
        {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
        {copied ? "Skopiowano" : "Kopiuj link"}
      </button>
    </div>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();
  const progress = useReadingProgress();

  // Posts sorted newest → oldest, used for prev/next + related
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const related = sorted.filter((p) => p.slug !== post.slug).slice(0, 3);

  const url = `https://ksign.pl/blog/${post.slug}`;
  const wordCount = post.content.join(" ").split(/\s+/).length;

  return (
    <div className="min-h-screen text-cream" style={{ background: "#0A0A0A" }}>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-lime transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Header />
      <main className="pt-28 md:pt-36 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Ścieżka nawigacji"
            className="text-xs font-mono uppercase tracking-widest text-cream/50 flex items-center gap-2 flex-wrap"
          >
            <Link to="/" className="hover:text-lime transition-colors">
              Strona główna
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog" className="hover:text-lime transition-colors">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-cream/30 truncate max-w-[60vw]">{post.title}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_280px]">
            <article className="max-w-3xl">
              <header>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-cream/50 mb-6 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-lime">
                    <Tag size={12} aria-hidden="true" /> {post.category}
                  </span>
                  <span aria-hidden="true">•</span>
                  <time
                    dateTime={post.date}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Calendar size={12} aria-hidden="true" /> {formatDate(post.date)}
                  </time>
                  <span aria-hidden="true">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" /> {post.readingTime}
                  </span>
                </div>
                <h1 className="text-display-tight text-[10vw] md:text-[5vw] lg:text-[4rem] leading-[1.05]">
                  {post.title}
                </h1>
                <p className="mt-6 text-lg md:text-xl text-cream/70 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-8 pb-8 border-b border-cream/10">
                  <ShareButtons url={url} title={post.title} />
                </div>
              </header>

              <div className="mt-10 space-y-6 text-base md:text-lg text-cream/80 leading-relaxed">
                {post.content.map((para: string, i: number) => (
                  <p
                    key={i}
                    className="[&_strong]:text-cream [&_em]:text-cream/70 [&_a]:text-lime [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-lime/80 [&_code]:font-mono [&_code]:text-sm [&_code]:bg-cream/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-16 p-8 rounded-3xl border border-lime/30 bg-lime/[0.06]">
                <div className="text-xs font-mono uppercase tracking-widest text-lime mb-3">
                  [ Pakiet Start ]
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  Potrzebujesz strony dla swojej firmy?
                </h2>
                <p className="text-cream/70 mb-6 max-w-xl">
                  Premium one-page od KSIGN — projekt graficzny custom, mobile-first, podstawy SEO
                  i certyfikat SSL. Gotowe w 3–7 dni roboczych za 999 zł netto.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/"
                    hash="kontakt"
                    className="inline-flex items-center gap-2 bg-lime text-ink px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
                  >
                    Zamów stronę <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    to="/pakiety"
                    className="inline-flex items-center gap-2 border border-cream/20 text-cream px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:border-lime/40 hover:text-lime transition-colors"
                  >
                    Zobacz pakiety
                  </Link>
                </div>
              </div>

              {/* Bottom share */}
              <div className="mt-12 pt-8 border-t border-cream/10">
                <ShareButtons url={url} title={post.title} />
              </div>

              {/* Prev / next navigation */}
              {(prev || next) && (
                <nav
                  aria-label="Inne wpisy"
                  className="mt-12 grid gap-4 md:grid-cols-2"
                >
                  {prev ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: prev.slug }}
                      className="group p-6 rounded-2xl border border-cream/10 hover:border-lime/40 hover:bg-cream/[0.05] transition-all"
                    >
                      <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cream/50 mb-2">
                        <ArrowLeft size={12} aria-hidden="true" /> Nowszy wpis
                      </span>
                      <span className="block text-base font-bold tracking-tight leading-snug group-hover:text-lime transition-colors">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: next.slug }}
                      className="group p-6 rounded-2xl border border-cream/10 hover:border-lime/40 hover:bg-cream/[0.05] transition-all md:text-right"
                    >
                      <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cream/50 mb-2 md:justify-end md:w-full">
                        Starszy wpis <ArrowRight size={12} aria-hidden="true" />
                      </span>
                      <span className="block text-base font-bold tracking-tight leading-snug group-hover:text-lime transition-colors">
                        {next.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              )}
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-6">
                <div className="p-6 rounded-2xl border border-cream/10 bg-cream/[0.03]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cream/50 mb-3">
                    O wpisie
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream/50">Kategoria</dt>
                      <dd className="text-lime font-medium">{post.category}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream/50">Data</dt>
                      <dd className="text-cream/80">{formatDate(post.date)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream/50">Czas czytania</dt>
                      <dd className="text-cream/80">{post.readingTime}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream/50">Słów</dt>
                      <dd className="text-cream/80">{wordCount}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream/50">Autor</dt>
                      <dd className="text-cream/80">{post.author}</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-6 rounded-2xl border border-lime/30 bg-lime/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-lime mb-2">
                    Pakiet Start
                  </div>
                  <p className="text-sm text-cream/80 mb-4 leading-relaxed">
                    Premium one-page w 3–7 dni za <strong className="text-cream">999 zł netto</strong>.
                  </p>
                  <Link
                    to="/"
                    hash="kontakt"
                    className="inline-flex items-center gap-2 bg-lime text-ink px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
                  >
                    Zamów <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-24 pt-12 border-t border-cream/10">
              <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  Czytaj dalej
                </h2>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cream/50 hover:text-lime transition-colors"
                >
                  Wszystkie wpisy <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group flex flex-col h-full p-6 rounded-2xl border border-cream/10 hover:border-lime/40 hover:bg-cream/[0.05] transition-all"
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-lime">
                          {p.category}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cream/40">
                          {p.readingTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight leading-snug mb-2 group-hover:text-lime transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-cream/60 leading-relaxed line-clamp-2">
                        {p.excerpt}
                      </p>
                      <time
                        dateTime={p.date}
                        className="mt-4 text-[10px] font-mono uppercase tracking-widest text-cream/40"
                      >
                        {formatDate(p.date)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
