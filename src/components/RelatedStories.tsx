import Link from "next/link";
import { getLatestStories } from "@/lib/data";
import type { Story } from "@/types/wp";

export default async function RelatedStories({ slug }: { slug: string }) {
  const stories = await getLatestStories(8);
  const related = stories.filter((s) => s.slug !== slug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="site-container py-10 border-t border-black">
      <h2 className="font-display text-2xl font-bold mb-6">
        More stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((s) => (
          <StoryTeaser key={s.slug} story={s} />
        ))}
      </div>
    </section>
  );
}

function StoryTeaser({ story }: { story: Story }) {
  return (
    <Link href={`/${story.slug}`} className="group block">
      {story.featuredImage && (
        <div className="overflow-hidden img-frame mb-3">
          <img
            src={story.featuredImage}
            alt={story.title}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-brand mb-1">
        {story.category}
      </div>
      <h3 className="font-display text-lg font-bold leading-tight group-hover:text-brand transition-colors">
        {story.title}
      </h3>
    </Link>
  );
}