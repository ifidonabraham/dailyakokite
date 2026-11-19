import Link from "next/link";
import { getLatestStories } from "@/lib/data";
import type { Story } from "@/types/wp";

export default async function RelatedStories({ slug }: { slug: string }) {
  const stories = await getLatestStories(30);
  const related = rankRelated(stories, slug, 3);
  if (related.length === 0) return null;

  return (
    <section className="site-container py-12 border-t border-black/10">
      <div className="section-heading mb-8">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
          More Stories
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((s) => (
          <StoryTeaser key={s.slug} story={s} />
        ))}
      </div>
    </section>
  );
}

function StoryTeaser({ story }: { story: Story }) {
  return (
    <article className="group flex flex-col h-full">
      <Link href={`/${story.slug}`} className="block mb-4">
        {story.featuredImage ? (
          <div className="overflow-hidden aspect-[16/10] bg-surface border border-black/5">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-48 bg-surface border border-black/5 flex items-center justify-center text-ink/30">
            <span className="text-[10px]">No image</span>
          </div>
        )}
      </Link>
      <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-2">
        {story.category}
      </div>
      <h3 className="font-display text-lg font-bold leading-tight group-hover:text-brand transition-colors mb-2">
        <Link href={`/${story.slug}`}>{story.title}</Link>
      </h3>
      {story.excerpt && (
        <p className="text-ink/70 text-sm leading-relaxed line-clamp-2">
          {story.excerpt}
        </p>
      )}
    </article>
  );
}

/**
 * Rank stories by relevance to the current article.
 *
 * Scoring tiers (highest first):
 *   1. Category match  - same category as the current article
 *   2. Tag overlap     - shared tags (if available)
 *   3. Author match    - same byline
 *   4. Recency boost  - stories from the last 7 days get a bonus
 *   5. Fallback        - most recent stories
 *
 * This replaces the old "just return the 3 most recent" approach, which had
 * nothing to do with the article the reader was viewing.
 */
function rankRelated(
  stories: Story[],
  currentSlug: string,
  limit: number
): Story[] {
  const current = stories.find((s) => s.slug === currentSlug);
  if (!current) {
    return stories.filter((s) => s.slug !== currentSlug).slice(0, limit);
  }

  const currentCats = new Set((current.categories || []).map((c) => c.toLowerCase()));
  const currentByline = current.byline?.toLowerCase();

  const scored = stories
    .filter((s) => s.slug !== currentSlug)
    .map((s) => {
      let score = 0;
      const sCats = new Set((s.categories || []).map((c) => c.toLowerCase()));

      // Category overlap
      for (const c of sCats) {
        if (currentCats.has(c)) score += 10;
      }

      // Same byline
      if (currentByline && s.byline?.toLowerCase() === currentByline) {
        score += 20;
      }

      // Same story type
      if (s.storyType === current.storyType) score += 5;

      // Recency boost: stories from the last 7 days
      const age =
        Date.now() - new Date(s.publishedAt).getTime();
      const week = 7 * 24 * 60 * 60 * 1000;
      if (age <= week) score += 3;

      return { story: s, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.story);

  return scored;
}