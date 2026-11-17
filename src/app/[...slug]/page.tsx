import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug, formatDate, toSlug } from "@/lib/data";
import type { Story } from "@/types/wp";
import StoryHeader from "@/components/StoryHeader";
import ArticleBody from "@/components/ArticleBody";
import RelatedStories from "@/components/RelatedStories";

export const revalidate = 300;

const STORY_TYPE_LABELS: Record<Story["storyType"], string> = {
  news: "News",
  feature: "Feature",
  opinion: "Opinion",
  interview: "Interview",
  "press-release": "Press Release",
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("-");
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

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
          <header>
            <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-ink/60 mb-3">
              <span className="text-brand">
                {STORY_TYPE_LABELS[story.storyType] || "News"}
              </span>
              <span className="text-ink/30">|</span>
              <span>{story.category}</span>
              <span className="text-ink/30">|</span>
              <time dateTime={story.publishedAt}>
                {formatDate(story.publishedAt)}
              </time>
              {story.updatedAt && story.updatedAt !== story.publishedAt && (
                <>
                  <span className="text-ink/30">|</span>
                  <span>updated {formatDate(story.updatedAt)}</span>
                </>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
              {story.title}
            </h1>
            <div className="text-sm font-sans text-ink/70 mb-6">
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
            {story.byline && (
              <Link
                href={`/authors/${toSlug(story.byline)}`}
                className="inline-block text-sm font-sans font-semibold text-ink border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-colors"
              >
                See author's posts →
              </Link>
            )}
          </header>
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