import Link from "next/link";
import { getAuthors, getAuthorStoryCounts } from "@/lib/data";
import type { Author } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata() {
  return { title: "Authors - DAILY AKOKITE" };
}

export default async function AuthorsPage() {
  const [authors, counts] = await Promise.all([
    getAuthors(),
    getAuthorStoryCounts(),
  ]);

  // Filter out the generic "Editor" account if it has no dedicated slug
  const visible = authors.filter(
    (a) => a.slug && a.slug !== "thepressclubunilag"
  );

  return (
    <article>
      <div className="site-container py-8">
        <h1 className="font-display text-4xl font-extrabold mb-6">Authors</h1>
        <p className="text-ink/70 max-w-2xl mb-10">
          The journalists, editors, and contributors behind Daily Akokite.
          Click a name to see their articles.
        </p>
      </div>

      <section className="site-container pb-16 border-t border-black">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((author) => (
              <AuthorCard
                key={author.slug}
                author={author}
                count={counts[author.slug] ?? 0}
              />
            ))}
          </div>
        ) : (
          <p className="text-ink/50">No authors available yet.</p>
        )}
      </section>
    </article>
  );
}

function AuthorCard({
  author,
  count,
}: {
  author: Author;
  count: number;
}) {
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-surface border border-black mb-4">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-2xl font-bold text-ink/40">
            {author.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="font-display text-lg font-bold group-hover:text-brand transition-colors">
        {author.name}
      </h3>
      <div className="text-sm font-sans text-ink/60 mt-1">
        {count} {count === 1 ? "article" : "articles"}
      </div>
    </Link>
  );
}