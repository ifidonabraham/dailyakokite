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
      <div className="site-container py-10">
        <Link
          href="/"
          className="text-sm font-sans font-semibold text-brand mb-8 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-none mb-2">
          {displayName}
        </h1>
        <p className="text-sm font-sans text-ink/60 uppercase tracking-wider">
          From DAILY AKOKITE
        </p>
      </div>

      <section className="site-container pb-16 border-t border-black">
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {filtered.map((story) => (
              <CategoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50 py-10">
            No stories found in this category yet. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
}

function CategoryCard({ story }: { story: Story }) {
  return (
    <article>
      {story.featuredImage && (
        <Link href={`/${story.slug}`} className="block mb-4">
          <div className="overflow-hidden img-frame">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className="text-[11px] font-medium uppercase tracking-widest text-brand mb-2">
        {story.category}
      </div>
      <h3 className="font-display text-2xl font-bold leading-tight mb-2">
        <Link href={`/${story.slug}`} className="hover:text-brand transition-colors">
          {story.title}
        </Link>
      </h3>
      {story.excerpt && (
        <p className="text-ink/70 text-sm leading-relaxed mb-3">
          {story.excerpt}
        </p>
      )}
      <div className="text-[11px] font-sans text-ink/60">
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        {story.byline && (
          <Link
            href={`/authors/${toSlug(story.byline)}`}
            className="ml-2 text-brand font-semibold hover:underline"
          >
            By {story.byline}
          </Link>
        )}
      </div>
    </article>
  );
}