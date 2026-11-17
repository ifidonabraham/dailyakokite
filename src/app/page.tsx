import Link from "next/link";
import { getLatestStories, getTopStories, formatDate, toSlug } from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata() {
  const lead = await (await import("@/lib/data")).getLeadStory();
  const featuredImage = lead?.featuredImage || "/wp-content/uploads/2026/11/RedElegantEventProposalPresentation_20261103_212819_0000.jpg";
  return {
    title: "Home - DAILY AKOKITE",
    description:
      "Daily Akokite — the student newspaper of the University of Lagos. News, features, opinion and campus reporting from Akoka.",
    openGraph: {
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: "DAILY AKOKITE",
        },
      ],
    },
  };
}

const TOP_CATEGORIES = [
  { href: "/category/news", label: "News" },
  { href: "/category/opinion", label: "Opinion" },
  { href: "/category/feature", label: "Features" },
  { href: "/category/sports", label: "Sports" },
  { href: "/category/arts", label: "Arts" },
  { href: "/category/campus-life", label: "Campus Life" },
];

export default async function Home() {
  const stories = await getLatestStories(40);

  const top = await getTopStories(4);
  const lead = top[0] || stories[0];
  const secondary = top.slice(1, 4).length > 0 ? top.slice(1, 4) : stories.slice(1, 4);

  // High density clusters
  const latest = stories.slice(4, 16);
  const features = stories.filter((s) => s.storyType === "feature").slice(0, 4);
  const opinion = stories.filter((s) => s.storyType === "opinion").slice(0, 6);

  return (
    <main id="main" className="bg-[#fdfdfb]">
      {/* Category ribbon - compact & uppercase */}
      <nav className="border-b border-black/10 bg-white sticky top-0 z-40">
        <div className="site-container">
          <div className="flex items-center gap-6 py-2 overflow-x-auto no-scrollbar">
            {TOP_CATEGORIES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-ink/60 hover:text-brand whitespace-nowrap transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="site-container py-8">
        {/* Top Cluster: Lead + 3 Side stories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {lead && (
            <div className="lg:col-span-3">
              <LeadStory story={lead} />
            </div>
          )}
          <div className="space-y-6">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 border-b border-black/5 pb-2 mb-4">
              More Top Stories
            </h4>
            {secondary.map((s) => (
              <SideStory key={s.slug} story={s} />
            ))}
          </div>
        </div>

        {/* Dense Grid Section: Latest Stories */}
        <section className="mb-16">
          <div className="section-heading border-t-4 border-black pt-4 mb-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Latest News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {latest.map((s, i) => (
              <DensityCard key={s.slug} story={s} compact={i >= 4} />
            ))}
          </div>
        </section>

        {/* Two-Column Mid Section: Features & Opinion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-black/10 pt-10">
          <section className="lg:col-span-2">
            <div className="section-heading mb-8">
              <h2 className="font-display text-2xl font-bold italic">Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((s) => (
                <FeatureCard key={s.slug} story={s} />
              ))}
            </div>
          </section>

          <section>
            <div className="section-heading mb-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Opinion</h2>
            </div>
            <div className="space-y-8">
              {opinion.map((s) => (
                <OpinionCard key={s.slug} story={s} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function LeadStory({ story }: { story: Story }) {
  return (
    <article className="group">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {story.featuredImage && (
            <Link href={`/${story.slug}`} className="block">
              <div className="overflow-hidden aspect-[16/10] bg-surface border border-black/5">
                <img
                  src={story.featuredImage}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Link>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col">
          <Link
            href={`/category/${toSlug(story.category)}`}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-3 hover:underline"
          >
            {story.category}
          </Link>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-4">
            <Link href={`/${story.slug}`} className="hover:text-brand transition-colors decoration-brand/30 hover:underline underline-offset-4">
              {story.title}
            </Link>
          </h1>
          <p className="text-ink/70 leading-relaxed mb-6 line-clamp-4">
            {story.excerpt}
          </p>
          <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-widest text-ink/40">
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
            {story.byline && <span className="text-brand">{story.byline}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

function SideStory({ story }: { story: Story }) {
  return (
    <article className="group pb-6 border-b border-black/5 last:border-0">
      <Link
        href={`/category/${toSlug(story.category)}`}
        className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-2 block hover:underline"
      >
        {story.category}
      </Link>
      <h3 className="font-display text-lg font-bold leading-tight group-hover:text-brand transition-colors mb-2">
        <Link href={`/${story.slug}`}>{story.title}</Link>
      </h3>
      <div className="text-[10px] font-sans font-medium text-ink/40 uppercase tracking-wider">
        {formatDate(story.publishedAt)}
      </div>
    </article>
  );
}

function DensityCard({ story, compact = false }: { story: Story; compact?: boolean }) {
  return (
    <article className="group flex flex-col h-full">
      {!compact && story.featuredImage && (
        <Link href={`/${story.slug}`} className="block mb-4">
          <div className="overflow-hidden aspect-[16/10] bg-surface border border-black/5">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-brand mb-2">
        {story.category}
      </div>
      <h3 className={`font-display font-bold leading-tight mb-3 transition-colors group-hover:text-brand ${compact ? 'text-lg' : 'text-xl'}`}>
        <Link href={`/${story.slug}`}>{story.title}</Link>
      </h3>
      {!compact && (
        <p className="text-ink/70 text-sm leading-relaxed mb-4 line-clamp-3">
          {story.excerpt}
        </p>
      )}
      <div className="mt-auto text-[10px] font-sans font-medium text-ink/30 uppercase tracking-widest">
        {formatDate(story.publishedAt)}
      </div>
    </article>
  );
}

function FeatureCard({ story }: { story: Story }) {
  return (
    <article className="group">
      {story.featuredImage && (
        <Link href={`/${story.slug}`} className="block mb-4">
          <div className="overflow-hidden aspect-video bg-surface border border-black/5">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <h3 className="font-display text-2xl font-bold leading-tight mb-3 group-hover:text-brand transition-colors">
        <Link href={`/${story.slug}`}>{story.title}</Link>
      </h3>
      <p className="text-ink/70 text-sm leading-relaxed line-clamp-2">
        {story.excerpt}
      </p>
    </article>
  );
}

function OpinionCard({ story }: { story: Story }) {
  return (
    <article className="group pb-6 border-b border-black/5 last:border-0">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold leading-tight group-hover:text-brand transition-colors mb-1">
            <Link href={`/${story.slug}`}>{story.title}</Link>
          </h3>
          {story.byline && (
            <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-ink/40">
              {story.byline}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
