import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAuthorsFromBylines,
  getStoriesByByline,
  getAuthorStoryCountsFromBylines,
} from "@/lib/data";
import type { Author, Story } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = (await getAuthorsFromBylines()).find((a) => a.slug === slug);
  if (!author)
    return { title: "Author not found - DAILY AKOKITE" };
  return {
    title: `${author.name} - DAILY AKOKITE`,
    description: `Articles by ${author.name} on Daily Akokite.`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [author, counts] = await Promise.all([
    getAuthorsFromBylines(),
    getAuthorStoryCountsFromBylines(),
  ]);

  const found = author.find((a) => a.slug === slug);
  if (!found) notFound();

  const stories = await getStoriesByByline(found.name);

  const count = counts[slug] ?? stories.length;

  return (
    <article>
      <div className="site-container py-8">
        <Link
          href="/authors"
          className="text-sm font-sans font-semibold text-brand mb-6 inline-block"
        >
          ← Back to Authors
        </Link>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface border border-black mb-4">
              {found.avatar ? (
                <img
                  src={found.avatar}
                  alt={found.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-display text-3xl font-bold text-ink/40">
                  {found.name.charAt(0)}
                </div>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              {found.name}
            </h1>
            <div className="text-sm font-sans text-ink/60 mt-2">
              {count} {count === 1 ? "article" : "articles"}
            </div>
          </div>

          <div className="flex-1">
            {found.bio ? (
              <p className="text-ink/80 leading-relaxed max-w-2xl">
                {found.bio}
              </p>
            ) : (
              <p className="text-ink/50 italic">
                Contributor to Daily Akokite, the student newspaper of the
                University of Lagos.
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="site-container pb-16 border-t border-black">
        <div className="section-heading">
          <span className="rule" />
          <h2>Articles by {found.name}</h2>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <AuthorStoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50">
            No articles published yet. Check back soon.
          </p>
        )}
      </section>
    </article>
  );
}

function AuthorStoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/${story.slug}`} className="group block">
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
      <h3 className="font-display text-base font-bold leading-tight group-hover:text-brand transition-colors">
        {story.title}
      </h3>
    </Link>
  );
}