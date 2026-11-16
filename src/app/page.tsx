import Link from "next/link";
import { getLatestStories, getTopStories, formatDate } from "@/lib/data";
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
  { href: "/newspaper", label: "News" },
  { href: "/newspaper", label: "Opinion" },
  { href: "/newspaper", label: "Features" },
  { href: "/newspaper", label: "Sports" },
  { href: "/newspaper", label: "Arts" },
  { href: "/newspaper", label: "Campus Life" },
];

export default async function Home() {
  const stories = await getLatestStories(30);

  // Lead + secondary cluster come from the explicit Top Stories list (see
  // TOP_STORY_SLUGS in data.ts). Falls back to the most recent stories when
  // the list is empty, so the page never breaks.
  const top = await getTopStories(4);
  const lead = top[0] || stories[0];
  const secondary = top.slice(1, 4).length > 0 ? top.slice(1, 4) : stories.slice(1, 4);
  const latest = stories.slice(4, 12);
  const features = stories.filter((s) => s.storyType === "feature").slice(0, 4);
  const opinion = stories.filter((s) => s.storyType === "opinion").slice(0, 3);

  return (
    <main id="main">
      {/* Category ribbon */}
      <nav className="border-b border-black bg-white">
        <div className="site-container">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            {TOP_CATEGORIES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="text-[11px] font-sans font-semibold uppercase tracking-widest text-ink/70 hover:text-brand whitespace-nowrap"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Lead story */}
      {lead && <LeadStory story={lead} />}

      {/* Secondary cluster */}
      {secondary.length > 0 && (
        <section className="site-container py-10 border-t border-black">
          <div className="section-heading">
            <span className="rule" />
            <h2>Top Stories</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {secondary.map((s, i) =>
              i === 0 ? (
                <TextLead key={s.slug} story={s} />
              ) : (
                <ImageTeaser key={s.slug} story={s} />
              )
            )}
          </div>
        </section>
      )}

      {/* Latest feed */}
      {latest.length > 0 && (
        <section className="site-container py-10 border-t border-black">
          <div className="section-heading">
            <span className="rule" />
            <h2>Latest</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {latest.map((s) => (
              <TextTeaser key={s.slug} story={s} />
            ))}
          </div>
        </section>
      )}

      {/* Section fronts */}
      {features.length > 0 && (
        <section className="site-container py-10 border-t border-black">
          <div className="section-heading">
            <span className="rule" />
            <h2>Features</h2>
            <Link href="/newspaper">All stories →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.slice(0, 2).map((s) => (
              <ImageTeaser key={s.slug} story={s} />
            ))}
          </div>
        </section>
      )}

      {opinion.length > 0 && (
        <section className="site-container py-10 border-t border-black">
          <div className="section-heading">
            <span className="rule" />
            <h2>Opinion</h2>
            <Link href="/newspaper">All stories →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opinion.map((s) => (
              <TextTeaser key={s.slug} story={s} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function LeadStory({ story }: { story: Story }) {
  return (
    <section className="site-container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {story.featuredImage && (
          <div className="card-frame">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <span className="cat-tag">
            {story.storyType === "press-release" ? "Press Release" : "Top Story"}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mt-3 mb-4">
            <Link href={`/${story.slug}`} className="hover:text-brand transition-colors">
              {story.title}
            </Link>
          </h1>
          <div className="flex items-center gap-4 text-sm text-ink/60 mb-4">
            <span className="font-semibold text-ink">{story.author}</span>
            <span className="text-ink/30">|</span>
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
          </div>
          <p className="text-ink/80 leading-relaxed">
            {story.excerpt}
          </p>
          <Link
            href={`/${story.slug}`}
            className="inline-block mt-4 text-sm font-sans font-semibold text-brand"
          >
            Read more →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TextLead({ story }: { story: Story }) {
  return (
    <article className="lg:col-span-2">
      <div className="cat-tag mb-2">{story.category}</div>
      <h3 className="font-display text-xl font-bold leading-tight mb-2">
        <Link href={`/${story.slug}`} className="hover:text-brand transition-colors">
          {story.title}
        </Link>
      </h3>
      <p className="text-ink/70 text-sm">{story.excerpt}</p>
    </article>
  );
}

function ImageTeaser({ story }: { story: Story }) {
  return (
    <article className="group">
      {story.featuredImage && (
        <div className="card-frame mb-3">
          <img
            src={story.featuredImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="cat-tag mb-2">{story.category}</div>
      <h3 className="font-display text-base font-bold leading-tight">
        <Link href={`/${story.slug}`} className="hover:text-brand transition-colors">
          {story.title}
        </Link>
      </h3>
    </article>
  );
}

function TextTeaser({ story }: { story: Story }) {
  return (
    <article className="group">
      <div className="flex items-center gap-2 text-xs font-sans text-ink/60 mb-1">
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
      </div>
      <h3 className="font-display text-sm font-bold leading-tight group-hover:text-brand transition-colors">
        <Link href={`/${story.slug}`}>{story.title}</Link>
      </h3>
    </article>
  );
}