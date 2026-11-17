import Link from "next/link";
import { getLatestStories, formatDate, toSlug } from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${name} - DAILY AKOKITE`,
    description: `All stories in the ${name} category on Daily Akokite.`,
  };
}

// Map of category slugs to display names
const CATEGORY_NAMES: Record<string, string> = {
  news: "News",
  feature: "Feature",
  opinion: "Opinion",
  interview: "Interview",
  "press-release": "Press Release",
  general: "General",
  sports: "Sports",
  entertainment: "Entertainment",
  "campus-life": "Campus Life",
  arts: "Arts",
  "social-commentary": "Social Commentary",
  "social-commentary-advocacy": "Social Commentary/Advocacy",
  article: "Article",
  "feature-2": "Feature",
  "opinion-article": "Opinion",
  "press-club": "Press Club",
  "student-personality": "Student Personality",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stories = await getLatestStories(100);

  const displayName =
    CATEGORY_NAMES[slug] ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const filtered = stories.filter(
    (s) =>
      s.category.toLowerCase() === displayName.toLowerCase() ||
      (s.categories || []).some(
        (c) => c.toLowerCase() === displayName.toLowerCase()
      )
  );

  return (
    <main id="main">
      <div className="site-container py-12 flex flex-col items-center text-center">
        <Link
          href="/"
          className="text-xs font-sans font-bold uppercase tracking-widest text-brand mb-6 hover:underline"
        >
          ← Home
        </Link>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-none mb-4">
          {displayName}
        </h1>
        <p className="font-display text-lg md:text-xl text-ink/60 italic">
          From DAILY AKOKITE
        </p>
      </div>

      <div className="site-container">
        <div className="border-t border-black mb-10" />
      </div>

      <section className="site-container pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filtered.map((story) => (
              <CategoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50 py-12 text-center font-sans">
            No stories found in this category yet. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
}

function CategoryCard({ story }: { story: Story }) {
  return (
    <article className="group">
      {story.featuredImage && (
        <Link href={`/${story.slug}`} className="block mb-5">
          <div className="overflow-hidden aspect-[16/10] bg-surface border border-black/5">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-3">
        {story.category}
      </div>
      <h3 className="font-display text-2xl font-bold leading-tight mb-3">
        <Link href={`/${story.slug}`} className="hover:text-brand transition-colors decoration-brand/30 underline-offset-4 hover:underline">
          {story.title}
        </Link>
      </h3>
      {story.excerpt && (
        <p className="text-ink/70 text-sm leading-relaxed mb-4 line-clamp-3">
          {story.excerpt}
        </p>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-black/5 text-[11px] font-sans text-ink/50 uppercase tracking-wider">
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        {story.byline && (
          <Link
            href={`/authors/${toSlug(story.byline)}`}
            className="text-brand font-bold hover:underline"
          >
            {story.byline}
          </Link>
        )}
      </div>
    </article>
  );
}