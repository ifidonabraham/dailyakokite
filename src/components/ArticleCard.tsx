import Link from "next/link";
import type { Story } from "@/types/wp";
import { formatDate } from "@/lib/data";

export default function ArticleCard({ story }: { story: Story }) {
  return (
    <article className="flex flex-col bg-white">
      {story.featuredImage && (
        <Link href={`/${story.slug}`} className="block">
          <div className="card-frame">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col flex-1 pt-4">
        <div className="cat-tag mb-2">{story.category}</div>
        <h3 className="font-display text-base font-bold mb-2 leading-tight">
          <Link href={`/${story.slug}`}>{story.title}</Link>
        </h3>
        <p className="text-sm text-ink/70 mb-3 flex-1 line-clamp-2">{story.excerpt}</p>
        <Link
          href={`/${story.slug}`}
          className="text-sm font-sans font-semibold text-brand"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}