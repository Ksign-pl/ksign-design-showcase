import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getLatestPosts, formatDate } from "@/lib/blog-posts";

export function BlogPreview() {
  const posts = getLatestPosts(3);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-24 md:py-32 bg-ink text-cream scroll-mt-24"
      style={{ background: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16 flex-wrap">
          <div>
            <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-cream/50 mb-4">
              [ 10 / Blog ]
            </div>
            <h2
              id="blog-heading"
              className="text-display-tight text-[10vw] md:text-[6vw] lg:text-[5.5rem] max-w-3xl"
            >
              WIEDZA<br />O <span className="text-lime">WEB&nbsp;DESIGN</span>
            </h2>
            <p className="mt-6 text-cream/60 max-w-md">
              Praktyczne wskazówki o stronach dla małych firm, SEO i marketingu online.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-lime text-ink px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Wszystkie wpisy
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

                <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug mb-3 group-hover:text-lime transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-cream/60 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-cream/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cream/50">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
