import Link from "next/link";
import {
  getStoriesByCategory,
  getAllCategories,
  formatDate,
  toSlug,
} from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cats = await getAllCategories();
  const cat = cats.find((c) => c.slug === slug);
  const name = cat?.name ?? titleCase(slug);
  return {
    title: `${name} - DAILY AKOKITE`,
    description: `All stories in the ${name} category on Daily Akokite.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [stories, cats] = await Promise.all([
    getStoriesByCategory(slug, 40),
    getAllCategories(),
  ]);

  const displayName = cats.find((c) => c.slug === slug)?.name ?? titleCase(slug);

  return (
    <main id="main">
      {/* Semafor-style centered masthead */}
      <div className="site-container pt-10 md:pt-14 flex flex-col items-center text-center">
        <Link
          href="/"
          className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/45 hover:text-brand mb-6 transition-colors"
        >
          ← Home
        </Link>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-none tracking-tight">
          {displayName}
        </h1>
        <p className="font-display text-lg md:text-2xl italic text-ink/60 mt-4">
          From DAILY AKOKITE
        </p>
      </div>

      <div className="site-container mt-8 md:mt-10">
        <div className="border-t border-black" />
      </div>

      <section className="site-container pt-6 pb-20">
        {stories.length === 0 ? (
          <p className="text-ink/50 py-16 text-center font-sans">
            No stories in {displayName} yet. Check back soon.
          </p>
        ) : (
          <div className="divide-y divide-black/10">
            {stories.map((story) => (
              <CategoryCard key={story.slug} story={story} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function CategoryCard({ story }: { story: Story }) {
  return (
    <article className="group flex flex-col sm:flex-row gap-6 md:gap-10 py-8 first:pt-2">
      {/* Text — left side */}
      <div className="flex-1 min-w-0 flex flex-col">
        <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-2">
          {story.category}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold leading-[1.15] mb-3">
          <Link
            href={`/${story.slug}`}
            className="hover:text-brand transition-colors"
          >
            {story.title}
          </Link>
        </h2>
        {story.excerpt && (
          <p className="text-ink/60 text-[14px] leading-relaxed mb-4 line-clamp-2">
            {story.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 text-[10px] font-sans uppercase tracking-wider text-ink/40">
          <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
          {story.byline && (
            <>
              <span className="text-ink/20">·</span>
              <Link
                href={`/authors/${toSlug(story.byline)}`}
                className="font-bold hover:text-brand hover:underline underline-offset-4 transition-colors"
              >
                {story.byline}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Image — right side, only when available */}
      {story.featuredImage && (
        <Link
          href={`/${story.slug}`}
          className="shrink-0 w-full sm:w-44 md:w-56 lg:w-64 self-start"
        >
          <div className="overflow-hidden aspect-[3/2] bg-surface border border-black/5">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
    </article>
  );
}

function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
