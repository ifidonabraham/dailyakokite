import type { Story } from "@/types/wp";
import { formatDate } from "@/lib/data";

const TYPE_LABELS: Record<Story["storyType"], string> = {
  news: "News",
  feature: "Feature",
  opinion: "Opinion",
  interview: "Interview",
  "press-release": "Press Release",
};

export default function StoryHeader({ story }: { story: Story }) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-4 text-xs font-sans font-semibold uppercase tracking-wider">
        <span className="text-brand">{TYPE_LABELS[story.storyType]}</span>
        <span className="text-ink/30">|</span>
        <span className="text-ink/60">{story.category}</span>
      </div>
      <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
        {story.title}
      </h1>
      {story.excerpt && (
        <p className="font-sans text-lg md:text-xl text-ink/80 leading-relaxed mb-6 max-w-2xl">
          {story.excerpt}
        </p>
      )}
      <div className="flex items-center gap-4 text-sm font-sans text-ink/60">
        <span className="font-semibold text-ink/80">{story.author}</span>
        <span className="text-ink/30">|</span>
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        {story.updatedAt && story.updatedAt !== story.publishedAt && (
          <>
            <span className="text-ink/30">|</span>
            <span>Updated {formatDate(story.updatedAt)}</span>
          </>
        )}
      </div>
    </header>
  );
}