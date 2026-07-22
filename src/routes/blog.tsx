import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BLOG_POSTS, formatDate } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — KSIGN | Web design, strony dla małych firm, SEO" },
      {
        name: "description",
        content:
          "Praktyczne artykuły o projektowaniu stron internetowych dla małych firm, SEO i marketingu online. Tipy od studia KSIGN.",
      },
      { property: "og:title", content: "Blog — KSIGN" },
      {
        property: "og:description",
        content:
          "Praktyczne artykuły o projektowaniu stron, SEO i marketingu online dla małych firm.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ksign.pl/blog" },
      { property: "og:image", content: "https://ksign.pl/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — KSIGN" },
      {
        name: "twitter:description",
        content:
          "Praktyczne artykuły o projektowaniu stron, SEO i marketingu online dla małych firm.",
      },
      { name: "twitter:image", content: "https://ksign.pl/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ksign.pl/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen text-cream" style={{ background: "#0A0A0A" }}>
      <Header />
      <main className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cream/70 hover:text-lime transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Powrót do strony głównej
          </Link>

          <header className="mt-8 max-w-3xl">
            <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/70 mb-4">
              [ Blog KSIGN ]
            </div>
            <h1 className="text-display-tight text-[12vw] md:text-[7vw] lg:text-[6rem]">
              WPISY O <span className="text-lime">WEB DESIGN</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70 max-w-2xl">
              Praktyczne tipy o stronach dla małych firm, SEO i marketingu online — bez lania wody.
            </p>
          </header>

          <ul className="mt-16 md:mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col h-full p-7 md:p-8 rounded-3xl border border-cream/10 bg-cream/[0.03] hover:bg-cream/[0.07] hover:border-lime/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-lime">
                      {post.category}
                    </span>
                    <span className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center group-hover:bg-lime group-hover:text-ink group-hover:border-lime transition-all">
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight leading-snug mb-3 group-hover:text-lime transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-cream/60 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-cream/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cream/70">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
