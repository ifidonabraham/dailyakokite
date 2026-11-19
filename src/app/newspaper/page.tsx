import Link from "next/link";
import { getLatestStories, formatDate, toSlug } from "@/lib/data";
import type { Story } from "@/types/wp";
import StoryImage from "@/components/StoryImage";

export const revalidate = 300;

export async function generateMetadata() {
  return { title: "Newspaper" };
}

export default async function NewspaperPage() {
  const stories = await getLatestStories(25);
  const [lead, ...others] = stories;

  return (
    <main id="main">
      <div className="site-container pt-10 md:pt-14 pb-10 flex flex-col items-center text-center border-b border-black/10">
        <Link
          href="/"
          className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 hover:text-brand mb-6 transition-colors"
        >
          ← Home
        </Link>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-none tracking-tight">
          Newspaper
        </h1>
        <p className="font-display text-lg md:text-2xl italic text-ink/55 mt-4">
          From DAILY AKOKITE
        </p>
      </div>

      <section className="site-container py-10 md:py-14">
        {lead && (
          <article className="group grid lg:grid-cols-12 gap-6 lg:gap-10 items-center pb-12 mb-12 border-b border-black/15">
            <Link href={`/${lead.slug}`} className="lg:col-span-7 block">
              <StoryImage story={lead} ratio="aspect-[16/10]" size="lg" priority />
            </Link>
            <div className="lg:col-span-5 min-w-0">
              <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-3">
                {lead.category}
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.08] tracking-tight mb-4">
                <Link href={`/${lead.slug}`} className="hover:text-brand transition-colors">
                  {lead.title}
                </Link>
              </h2>
              {lead.excerpt && (
                <p className="text-ink/65 leading-relaxed mb-4 line-clamp-3">{lead.excerpt}</p>
              )}
              <Meta story={lead} />
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {others.map((story) => (
            <article key={story.slug} className="group flex flex-col min-w-0">
              <Link href={`/${story.slug}`} className="block mb-4">
                <StoryImage story={story} ratio="aspect-[3/2]" />
              </Link>
              <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-2">
                {story.category}
              </div>
              <h3 className="font-display text-xl font-bold leading-[1.18] mb-3">
                <Link href={`/${story.slug}`} className="hover:text-brand transition-colors">
                  {story.title}
                </Link>
              </h3>
              <div className="mt-auto">
                <Meta story={story} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Meta({ story }: { story: Story }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-sans uppercase tracking-[0.16em] text-ink/50">
      {story.byline && (
        <>
          <Link
            href={`/authors/${toSlug(story.byline)}`}
            className="font-bold text-ink/70 hover:text-brand transition-colors"
          >
            {story.byline}
          </Link>
          <span className="text-ink/25">·</span>
        </>
      )}
      <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
    </div>
  );
}
