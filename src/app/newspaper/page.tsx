import Link from "next/link";
import { getLatestStories, formatDate } from "@/lib/data";
import type { Story } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata() {
  return { title: "Newspaper" };
}

export default async function NewspaperPage() {
  const stories = await getLatestStories(24);

  return (
    <main id="main">
      <div className="site-container py-8">
        <h1 className="font-display text-4xl font-extrabold mb-6">Newspaper</h1>
      </div>

      {/* Editorial list with tiny category labels, no gigantic images */}
      <section className="site-container pb-16 border-t border-black">
        <div className="section-heading">
          <span className="rule" />
          <h2>Latest</h2>
          <Link href="/">All stories →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {stories.map((story) => (
            <StoryRow key={story.slug} story={story} />
          ))}
        </div>
      </section>
    </main>
  );
}

function StoryRow({ story }: { story: Story }) {
  return (
    <Link href={`/${story.slug}`} className="group block">
      {/* tiny category label at the top */}
      <div className="text-[11px] font-medium uppercase tracking-widest text-brand mb-2">
        {story.category}
      </div>

      <h3 className="font-display text-lg font-bold leading-tight group-hover:text-brand transition-colors">
        {story.title}
      </h3>

      <div className="text-[11px] font-sans text-ink/60 mt-1">
        {formatDate(story.publishedAt)} {story.author && `| ${story.author}`}
      </div>
    </Link>
  );
}