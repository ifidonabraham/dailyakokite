import Link from "next/link";
import {
  getLatestStories,
  getTopStories,
  formatDate,
  formatStamp,
  toSlug,
  wpDate,
} from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 60;

export async function generateMetadata() {
  const lead = await (await import("@/lib/data")).getLeadStory();
  const featuredImage =
    lead?.featuredImage ||
    "/wp-content/uploads/2026/11/RedElegantEventProposalPresentation_20261103_212819_0000.jpg";
  return {
    title: { absolute: "DAILY AKOKITE - The Press Club, UNILAG" },
    description:
      "Daily Akokite — the student newspaper of the University of Lagos. News, features, opinion and campus reporting from Akoka.",
    openGraph: {
      images: [
        { url: featuredImage, width: 1200, height: 630, alt: "DAILY AKOKITE" },
      ],
    },
  };
}

export default async function Home() {
  const stories = await getLatestStories(60);
  const top = await getTopStories(4);

  // The very latest story (or top story) must be the hero.
  const lead = top[0] || stories[0];

  const pool = top.length > 0 ? [...top.slice(1), ...stories] : stories;
  const seen = new Set<string>();
  if (lead) seen.add(lead.slug);

  const unique = pool.filter((s) => {
    if (!s || seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });

  const hero = lead;

  // Everything published in the last 7 days goes in the top rail beside the
  // hero (min 3 so quiet weeks still fill it, max 8 so busy weeks don't sprawl).
  const weekAgo = Date.now() - 7 * 86_400_000;
  const freshCount = unique.filter((s) => wpDate(s.publishedAt).getTime() >= weekAgo).length;
  const railCount = Math.min(Math.max(freshCount, 3), 8);

  let i = 0;
  const take = (n: number) => unique.slice(i, (i += n));
  const railStories = take(railCount);
  const rightCards = take(2);
  const opinionRail = take(3);
  const moreRow = take(6);
  const worldBlock = take(1)[0];
  const rest = take(12);

  return (
    <main id="main" className="bg-white">
      <div className="site-container">
        {/* ===== NYT-style 3-column top: hero first on mobile, then rail ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 pt-8 pb-10 border-b border-black/15">

          {/* CENTER HERO: Latest story. Order-first on mobile. */}
          <div className="lg:col-span-5 lg:col-start-5 order-1 lg:order-2">
            {hero && <HeroBlock story={hero} />}
          </div>

          {/* LEFT RAIL: Text stories. Order-second on mobile. */}
          <div className="lg:col-span-4 lg:col-start-1 lg:border-r lg:border-black/15 lg:pr-8 order-2 lg:order-1">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-ink/60 pb-3 border-b-2 border-black mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              This Week
            </p>
            <div className="divide-y divide-black/15">
              {railStories.map((s) => (
                <article key={s.slug} className="group py-5 first:pt-0 lg:first:pt-0">
                  <time
                    dateTime={s.publishedAt}
                    className="block text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-brand mb-1.5"
                  >
                    {formatStamp(s.publishedAt)}
                  </time>
                  <h2 className="font-display text-xl md:text-[1.4rem] font-bold leading-[1.2] mb-2">
                    <Link
                      href={`/${s.slug}`}
                      className="hover:text-brand transition-colors"
                    >
                      {s.title}
                    </Link>
                  </h2>
                  {s.excerpt && (
                    <p className="text-ink/65 text-[13px] leading-relaxed mb-2 line-clamp-2">
                      {s.excerpt}
                    </p>
                  )}
                  {s.byline && (
                    <Link
                      href={`/authors/${toSlug(s.byline)}`}
                      className="text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-ink/60 hover:text-brand transition-colors"
                    >
                      {s.byline}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT: image cards + opinion */}
          <div className="lg:col-span-3 lg:border-l lg:border-black/15 lg:pl-8 order-3">
            {rightCards.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 pb-6 lg:border-b lg:border-black/15">
                {rightCards.map((s) => (
                  <MiniCard key={s.slug} story={s} />
                ))}
              </div>
            )}

            <div className="pt-6">
              <h3 className="font-display text-lg font-bold mb-4">Opinion</h3>
              <div className="divide-y divide-black/10">
                {opinionRail.map((s) => (
                  <article key={s.slug} className="group py-3 first:pt-0">
                    {s.byline && (
                      <div className="text-[9px] font-sans font-bold uppercase tracking-[0.16em] text-ink/45 mb-1">
                        {s.byline}
                      </div>
                    )}
                    <h4 className="font-display text-[15px] font-bold leading-snug">
                      <Link
                        href={`/${s.slug}`}
                        className="hover:text-brand transition-colors"
                      >
                        {s.title}
                      </Link>
                    </h4>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== "More to read" row ===== */}
        <section className="py-12 border-b border-black/15">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-ink/70">
              In Case You Missed It
            </h2>
            <Link
              href="/category/news"
              className="text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-brand hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {moreRow.map((s) => (
              <GridCard key={s.slug} story={s} />
            ))}
          </div>
        </section>

        {/* ===== Featured Section: Large horizontal block ===== */}
        {worldBlock && (
          <section className="py-12 border-b border-black/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-4">
                  {worldBlock.category}
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] mb-5 tracking-tight">
                  <Link
                    href={`/${worldBlock.slug}`}
                    className="hover:text-brand transition-colors"
                  >
                    {worldBlock.title}
                  </Link>
                </h2>
                {worldBlock.excerpt && (
                  <p className="text-ink/65 text-[15px] leading-relaxed mb-6">
                    {worldBlock.excerpt}
                  </p>
                )}
                <Meta story={worldBlock} />
              </div>
              <Link
                href={`/${worldBlock.slug}`}
                className="lg:col-span-7 block group"
              >
                <ImageBlock story={worldBlock} ratio="aspect-video" />
              </Link>
            </div>
          </section>
        )}

        {/* ===== Latest feed ===== */}
        <section className="py-12">
          <div className="flex items-baseline justify-between mb-10 border-t-4 border-black pt-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Latest News
            </h2>
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-ink/40">
              Updated {formatDate(new Date().toISOString())}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {rest.map((s) => (
              <GridCard key={s.slug} story={s} size="sm" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- blocks ---------- */

function HeroBlock({ story }: { story: Story }) {
  return (
    <article className="group">
      <Link href={`/${story.slug}`} className="block">
        <ImageBlock story={story} ratio="aspect-[3/2] lg:aspect-[16/10]" />
      </Link>
      <div className="pt-6">
        <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-3">
          {story.category}
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-[2.8rem] font-bold leading-[1.05] tracking-tight mb-4">
          <Link
            href={`/${story.slug}`}
            className="hover:text-brand transition-colors underline-offset-4 decoration-brand/20 hover:underline"
          >
            {story.title}
          </Link>
        </h1>
        {story.excerpt && (
          <p className="text-ink/65 text-base md:text-lg leading-relaxed mb-4 line-clamp-3">
            {story.excerpt}
          </p>
        )}
        <Meta story={story} />
      </div>
    </article>
  );
}

function MiniCard({ story }: { story: Story }) {
  return (
    <article className="group flex flex-col sm:flex-row lg:flex-col gap-4">
      <Link href={`/${story.slug}`} className="block w-full sm:w-1/3 lg:w-full shrink-0">
        <ImageBlock story={story} ratio="aspect-[4/3] lg:aspect-[3/2]" />
      </Link>
      <div>
        <h4 className="font-display text-[15px] font-bold leading-tight mt-1">
          <Link
            href={`/${story.slug}`}
            className="hover:text-brand transition-colors"
          >
            {story.title}
          </Link>
        </h4>
        <div className="text-[9px] font-sans uppercase tracking-[0.14em] text-ink/40 mt-2">
          {formatDate(story.publishedAt)}
        </div>
      </div>
    </article>
  );
}

function GridCard({
  story,
  size = "md",
}: {
  story: Story;
  size?: "sm" | "md";
}) {
  return (
    <article className="group flex flex-col h-full">
      <Link href={`/${story.slug}`} className="block mb-4">
        <ImageBlock story={story} ratio="aspect-[3/2]" />
      </Link>
      <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-2">
        {story.category}
      </div>
      <h3
        className={`font-display font-bold leading-[1.15] mb-3 ${
          size === "sm" ? "text-lg" : "text-2xl"
        }`}
      >
        <Link
          href={`/${story.slug}`}
          className="hover:text-brand transition-colors"
        >
          {story.title}
        </Link>
      </h3>
      {story.excerpt && (
        <p className="text-ink/60 text-sm leading-relaxed mb-4 line-clamp-2">
          {story.excerpt}
        </p>
      )}
      <div className="mt-auto">
        <Meta story={story} />
      </div>
    </article>
  );
}

function ImageBlock({ story, ratio }: { story: Story; ratio: string }) {
  if (!story.featuredImage) return null;
  return (
    <div className={`overflow-hidden ${ratio} bg-surface border border-black/5`}>
      <img
        src={story.featuredImage}
        alt={story.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
    </div>
  );
}

function Meta({ story }: { story: Story }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.16em] text-ink/45">
      {story.byline ? (
        <>
          <Link
            href={`/authors/${toSlug(story.byline)}`}
            className="text-ink/70 font-bold hover:text-brand transition-colors"
          >
            {story.byline}
          </Link>
          <span className="text-ink/20">·</span>
        </>
      ) : null}
      <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
    </div>
  );
}
