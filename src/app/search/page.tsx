import Link from "next/link";
import { searchStories, formatDate } from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : "Search",
    description: q
      ? `Search results for "${q}" on DAILY AKOKITE.`
      : "Search stories, features and opinion on DAILY AKOKITE.",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const results: Story[] = query ? await searchStories(query, 30) : [];

  return (
    <main id="main" className="site-container py-10">
      <h1 className="font-display text-4xl font-extrabold mb-8">Search</h1>

      <form action="/search" method="get" className="mb-10">
        <label htmlFor="q" className="sr-only">
          Search stories
        </label>
        <div className="flex items-center">
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search stories, categories, opinion…"
            className="flex-1 px-3 py-2 text-lg border-b-2 border-black bg-transparent focus:outline-none focus:border-brand"
            autoFocus
          />
          <button
            type="submit"
            className="ml-4 px-5 py-2 text-sm font-sans font-semibold uppercase tracking-wide bg-black text-white"
          >
            Search
          </button>
        </div>
      </form>

      {!query && (
        <p className="text-ink/60">
          Type a keyword to search across all stories, features and opinion.
        </p>
      )}

      {query && results.length === 0 && (
        <div className="border border-black p-8">
          <p className="font-display text-xl font-bold mb-2">
            No stories found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-ink/60">
            Try a different keyword, or browse the{" "}
            <Link href="/newspaper" className="text-brand font-semibold">
              Newspaper
            </Link>{" "}
            to see everything.
          </p>
        </div>
      )}

      {query && results.length > 0 && (
        <div>
          <div className="section-heading mb-6">
            <span className="rule" />
            <h2>
              {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {results.map((story) => (
              <SearchResult key={story.slug} story={story} query={query} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function SearchResult({ story, query }: { story: Story; query: string }) {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);

  // Build a short highlighted snippet from the excerpt.
  const excerpt = story.excerpt || "";
  const lower = excerpt.toLowerCase();
  let snippet = excerpt.slice(0, 160);
  const first = tokens.reduce((best, t) => {
    const i = lower.indexOf(t);
    return i >= 0 && (best === -1 || i < best) ? i : best;
  }, -1);
  if (first > 40) snippet = "…" + excerpt.slice(first - 40, first + 120);
  snippet = snippet.trim() + "…";

  return (
    <article>
      <div className="text-[11px] font-medium uppercase tracking-widest text-brand mb-2">
        {story.category}
      </div>
      <h3 className="font-display text-xl font-bold leading-tight mb-2">
        <Link href={`/${story.slug}`} className="hover:text-brand transition-colors">
          {story.title}
        </Link>
      </h3>
      <p className="text-ink/70 text-sm mb-3">{snippet}</p>
      <div className="text-[11px] font-sans text-ink/60">
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        {story.author && <span> | {story.author}</span>}
      </div>
    </article>
  );
}