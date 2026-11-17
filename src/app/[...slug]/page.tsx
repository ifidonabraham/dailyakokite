import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug, formatDate, toSlug } from "@/lib/data";
import type { Story } from "@/types/wp";
import StoryHeader from "@/components/StoryHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedStories from "@/components/RelatedStories";
import ShareBar from "@/components/ShareBar";

const STORY_TYPE_LABELS: Record<Story["storyType"], string> = {
  news: "News",
  feature: "Feature",
  opinion: "Opinion",
  interview: "Interview",
  "press-release": "Press Release",
};

// NYT-style category slugs for the ribbon links
const CATEGORY_SLUGS: Record<string, string> = {
  News: "news",
  Feature: "feature",
  Opinion: "opinion",
  Interview: "interview",
  "Press Release": "press-release",
  General: "general",
  Sports: "sports",
  Entertainment: "entertainment",
  "Campus Life": "campus-life",
  Arts: "arts",
};

export const revalidate = 300;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("-");
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const storyTypeLabel = STORY_TYPE_LABELS[story.storyType] || "News";
  const categorySlug = CATEGORY_SLUGS[story.category] || toSlug(story.category);

  return (
    <article>
      <div className="site-container py-8">
        <Link
          href="/"
          className="text-sm font-sans font-semibold text-brand mb-6 inline-block"
        >
          ← Back to Home
        </Link>
        <div className="reading-column">
          {/* Category ribbon - links to category archive */}
          <nav className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-ink/60 mb-3">
            <Link
              href={`/category/${toSlug(storyTypeLabel)}`}
              className="text-brand hover:underline"
            >
              {storyTypeLabel}
            </Link>
            <span className="text-ink/30">|</span>
            <Link
              href={`/category/${categorySlug}`}
              className="text-brand hover:underline"
            >
              {story.category}
            </Link>
            <span className="text-ink/30">|</span>
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
            {story.updatedAt && story.updatedAt !== story.publishedAt && (
              <>
                <span className="text-ink/30">|</span>
                <span>updated {formatDate(story.updatedAt)}</span>
              </>
            )}
          </nav>

          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
            {story.title}
          </h1>

          {story.featuredImage && (
            <figure className="mb-8">
              <img
                src={story.featuredImage}
                alt={story.title}
                className="w-full h-auto"
              />
            </figure>
          )}

          <ArticleBody html={story.body} />

          {/* Byline + Share bar - NYT style, below the article */}
          <footer className="mt-10 pt-6 border-t border-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm font-sans text-ink/70">
                By{" "}
                {story.byline ? (
                  <Link
                    href={`/authors/${toSlug(story.byline)}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {story.byline}
                  </Link>
                ) : (
                  story.author
                )}
              </div>
              <ShareBar story={story} />
            </div>
          </footer>
        </div>
      </div>
      <RelatedStories slug={story.slug} />
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("-");
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found - DAILY AKOKITE" };
  return {
    title: `${story.title} - DAILY AKOKITE`,
    description: story.excerpt || undefined,
    openGraph: {
      title: story.title,
      description: story.excerpt || undefined,
      images: story.featuredImage ? [story.featuredImage] : undefined,
    },
  };
}
