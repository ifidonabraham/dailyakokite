import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getStoryBySlug, getLatestStories, formatDate, toSlug, wpDate } from "@/lib/data";
import type { Story } from "@/types/wp";
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

// NYT-style category slugs
const CATEGORY_SLUGS: Record<string, string> = {
  News: "news",
  Feature: "feature",
  Opinion: "opinion",
  Interview: "interview",
  "Press Release": "press-release",
  General: "general",
  Sport: "sport",
  Entertainment: "entertainment",
};

const SITE_URL = "https://dailyakokite.vercel.app";

export const revalidate = 300;

// Prebuild the newest articles (the ones linked from the homepage) so the first
// click is instant; everything else renders on first request, then ISR-caches.
export async function generateStaticParams() {
  const latest = await getLatestStories(12).catch(() => []);
  return latest.map((s) => ({ slug: [s.slug] }));
}

// Articles live at a single path segment (/post-slug). Anything deeper, or with
// a file extension (favicon.ico, robots.txt), is not an article: skip the WP call.
function articleSlug(parts: string[]): string | null {
  if (parts.length !== 1) return null;
  const slug = parts[0];
  return slug && !slug.includes(".") ? slug : null;
}

function absoluteUrl(path: string | null) {
  if (!path) return undefined;
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = articleSlug(slugParts);
  if (!slug) notFound();
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const storyTypeLabel = STORY_TYPE_LABELS[story.storyType] || "News";
  const categorySlug = CATEGORY_SLUGS[story.category] || toSlug(story.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.excerpt || undefined,
    image: story.featuredImage ? [absoluteUrl(story.featuredImage)] : undefined,
    datePublished: wpDate(story.publishedAt).toISOString(),
    dateModified: wpDate(story.updatedAt || story.publishedAt).toISOString(),
    author: { "@type": "Person", name: story.byline || story.author },
    publisher: {
      "@type": "Organization",
      name: "DAILY AKOKITE",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/da-logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/${story.slug}`,
    articleSection: story.category,
  };

  return (
    <main id="main">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
    <article>
      <div className="site-container py-8 md:py-12">
        <div className="reading-column">
          <Link
            href="/"
            className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 hover:text-brand mb-8 inline-block transition-colors"
          >
            ← Back to Edition
          </Link>

          <header className="mb-10">
            {/* Top Ribbon & Share Bar - NYT Style */}
            <div className="flex items-center justify-between border-y border-black/10 py-3 mb-8">
              <nav className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-widest">
                <Link
                  href={`/category/${toSlug(storyTypeLabel)}`}
                  className="text-brand hover:underline underline-offset-4"
                >
                  {storyTypeLabel}
                </Link>
                <span className="text-ink/20">/</span>
                <Link
                  href={`/category/${categorySlug}`}
                  className="text-ink/60 hover:text-brand hover:underline underline-offset-4"
                >
                  {story.category}
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <time
                  dateTime={story.publishedAt}
                  className="hidden sm:block text-[10px] font-sans font-medium uppercase tracking-wider text-ink/40"
                >
                  {formatDate(story.publishedAt)}
                </time>
                <ShareBar story={story} position="top" />
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8">
              {story.title}
            </h1>

            {story.excerpt && (
              <p className="font-display text-xl md:text-2xl text-ink/60 leading-snug mb-8 max-w-2xl">
                {story.excerpt}
              </p>
            )}
          </header>

          {story.featuredImage && (
            <figure className="mb-12 -mx-4 md:-mx-8">
              <div className="bg-surface border-y border-black/5">
                <img
                  src={story.featuredImage}
                  alt={story.title}
                  className="w-full h-auto"
                />
              </div>
              {story.featuredImageAlt && (
                <figcaption className="mt-3 px-4 md:px-8 text-[11px] font-sans text-ink/50 uppercase tracking-wider leading-relaxed">
                  {story.featuredImageAlt}
                </figcaption>
              )}
            </figure>
          )}

          <ArticleBody html={story.body} />

          {/* Footer Byline - Semafor Style */}
          <footer className="mt-16 pt-8 border-t border-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <div className="font-display text-xl md:text-2xl italic">
                —{" "}
                {story.byline ? (
                  <Link
                    href={`/authors/${toSlug(story.byline)}`}
                    className="text-brand not-italic font-bold underline decoration-brand/30 decoration-2 underline-offset-8 hover:decoration-brand transition-all"
                  >
                    {story.byline}
                  </Link>
                ) : (
                  <span className="not-italic font-bold">{story.author}</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink/30">
                  Share this story
                </span>
                <ShareBar story={story} />
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Suspense fallback={null}>
        <RelatedStories slug={story.slug} />
      </Suspense>
    </article>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = articleSlug(slugParts);
  const story = slug ? await getStoryBySlug(slug) : null;
  if (!story) return { title: "Story not found" };
  const image = absoluteUrl(story.featuredImage);
  return {
    title: story.title,
    description: story.excerpt || undefined,
    alternates: { canonical: `/${story.slug}` },
    openGraph: {
      type: "article",
      url: `/${story.slug}`,
      title: story.title,
      description: story.excerpt || undefined,
      publishedTime: wpDate(story.publishedAt).toISOString(),
      modifiedTime: wpDate(story.updatedAt || story.publishedAt).toISOString(),
      section: story.category,
      authors: story.byline ? [story.byline] : undefined,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      site: "@unilagpressclub",
      title: story.title,
      description: story.excerpt || undefined,
      images: image ? [image] : undefined,
    },
  };
}
