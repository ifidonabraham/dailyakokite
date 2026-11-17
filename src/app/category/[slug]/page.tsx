import Link from "next/link";
import { getLatestStories, formatDate } from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} - DAILY AKOKITE`,
    description: `All stories in the ${slug} category on Daily Akokite.`,
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

  // Normalize the slug for matching
  const displayName = CATEGORY_NAMES[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Filter stories by category (case-insensitive)
  const filtered = stories.filter(
    (s) =>
      s.category.toLowerCase() === displayName.toLowerCase() ||
      (s.categories || []).some(
        (c) => c.toLowerCase() === displayName.toLowerCase()
      )
  );

  return (
    <main id="main">
      <div className="site-container py-8">
        <Link
          href="/"
          className="text-sm font-sans font-semibold text-brand mb-6 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="font-display text-4xl font-extrabold mb-6">
          {displayName}
        </h1>
        <p className="text-ink/70 max-w-2xl mb-10">
          All stories filed under {displayName}.
        </p>
      </div>

      <section className="site-container pb-16 border-t border-black">
        <div className="section-heading">
          <span className="rule" />
          <h2>Latest in {displayName}</h2>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {filtered.map((story) => (
              <CategoryStoryRow key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50">
            No stories found in this category yet. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
}

function CategoryStoryRow({ story }: { story: Story }) {
  return (
    <Link href={`/${story.slug}`} className="group block">
      <div className="text-[11px] font-medium uppercase tracking-widest text-brand mb-2">
        {story.category}
      </div>
      <h3 className="font-display text-xl font-bold leading-tight group-hover:text-brand transition-colors">
        {story.title}
      </h3>
      <div className="text-[11px] font-sans text-ink/60 mt-1">
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        {story.byline && <span> | By {story.byline}</span>}
      </div>
      {story.excerpt && (
        <p className="text-ink/70 text-sm mt-2">{story.excerpt}</p>
      )}
    </Link>
  );
}
