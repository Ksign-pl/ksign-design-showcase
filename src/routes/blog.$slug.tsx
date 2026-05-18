import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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
    const ogImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/71437845-488b-42eb-9d0f-dc3a205b7e74";
    return {
      meta: [
        { title: post.title },
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
          }),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-cream" style={{ background: "#0A0A0A" }}>
      <div className="text-center">
        <h1 className="text-3xl font-black mb-4">Wpis nie znaleziony</h1>
        <Link to="/blog" className="text-lime underline">
          Wróć do bloga
        </Link>
      </div>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen text-cream" style={{ background: "#0A0A0A" }}>
      <Header />
      <main className="pt-32 md:pt-40 pb-24 md:pb-32">
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cream/50 hover:text-lime transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Wszystkie wpisy
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-cream/50 mb-6">
              <span className="text-lime">{post.category}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-display-tight text-[10vw] md:text-[5vw] lg:text-[4rem] leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-cream/70 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="mt-12 space-y-6 text-base md:text-lg text-cream/80 leading-relaxed">
            {post.content.map((para: string, i: number) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl border border-lime/30 bg-lime/[0.06]">
            <h2 className="text-2xl font-black tracking-tight mb-3">
              Potrzebujesz strony dla swojej firmy?
            </h2>
            <p className="text-cream/70 mb-6">
              Pakiet Start KSIGN — premium one-page w 3–7 dni za 999 zł netto.
            </p>
            <Link
              to="/"
              hash="kontakt"
              className="inline-flex items-center gap-2 bg-lime text-ink px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Zamów stronę →
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-20 pt-12 border-t border-cream/10">
              <h2 className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-6">
                Czytaj dalej
              </h2>
              <ul className="grid gap-6 md:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="block p-6 rounded-2xl border border-cream/10 hover:border-lime/40 hover:bg-cream/[0.05] transition-all"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-lime">
                        {p.category}
                      </span>
                      <h3 className="mt-3 text-lg font-bold tracking-tight leading-snug">
                        {p.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
