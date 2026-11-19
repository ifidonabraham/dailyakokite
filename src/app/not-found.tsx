import Link from "next/link";
import { getLatestStories, formatDate } from "@/lib/data";
import type { Story } from "@/types/wp";

export const metadata = { title: "Page not found" };

export default async function NotFound() {
  let latest: Story[] = [];
  try {
    latest = await getLatestStories(5);
  } catch {
    latest = [];
  }

  return (
    <main id="main">
      <div className="site-container pt-10 md:pt-14 pb-10 flex flex-col items-center text-center border-b border-black/10">
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/45 mb-6">
          Error 404
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-none tracking-tight">
          Page not found
        </h1>
        <p className="font-display text-lg md:text-2xl italic text-ink/60 mt-4 max-w-xl">
          The story you were looking for may have moved or no longer exists.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] bg-ink text-white px-6 py-3 hover:bg-brand transition-colors"
          >
            ← Back to the front page
          </Link>
          <Link
            href="/search"
            className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Search stories
          </Link>
        </div>
      </div>

      {latest.length > 0 && (
        <section className="site-container max-w-3xl py-12">
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-ink/60 pb-3 border-b-2 border-black mb-2">
            Latest from Daily Akokite
          </h2>
          <ul className="divide-y divide-black/10">
            {latest.map((s) => (
              <li key={s.slug} className="py-4">
                <Link
                  href={`/${s.slug}`}
                  className="font-display text-xl font-bold leading-snug hover:text-brand transition-colors"
                >
                  {s.title}
                </Link>
                <div className="text-[10px] font-sans uppercase tracking-[0.14em] text-ink/50 mt-1">
                  {s.category} · {formatDate(s.publishedAt)}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
