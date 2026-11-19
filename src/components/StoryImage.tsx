import Image from "next/image";
import type { Story } from "@/types/wp";

// One deep tone per story type, so imageless stories still read as designed
// covers rather than empty boxes.
const COVER_TONES: Record<Story["storyType"], string> = {
  news: "bg-[#122d5e]",
  opinion: "bg-[#5a1f1f]",
  feature: "bg-[#1f3a2e]",
  interview: "bg-[#3a2a52]",
  "press-release": "bg-[#2b2f36]",
};

const LABEL_SIZE = {
  sm: "text-2xl",
  md: "text-3xl md:text-4xl",
  lg: "text-5xl md:text-6xl",
};

export default function StoryImage({
  story,
  ratio,
  size = "md",
  priority = false,
}: {
  story: Story;
  ratio: string;
  size?: keyof typeof LABEL_SIZE;
  priority?: boolean;
}) {
  if (story.featuredImage) {
    return (
      <div className={`overflow-hidden ${ratio} max-w-full bg-surface`}>
        <img
          src={story.featuredImage}
          alt={story.featuredImageAlt || story.title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${ratio} max-w-full ${COVER_TONES[story.storyType]} text-white`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.14),transparent_60%)]" />
      <Image
        src="/da-logo.png"
        alt=""
        width={240}
        height={234}
        className="absolute -right-[6%] -bottom-[10%] w-[42%] h-auto opacity-[0.1] brightness-0 invert transition-transform duration-700 group-hover:scale-105"
      />
      <div className="relative flex h-full flex-col justify-between p-[6%]">
        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.24em] text-white/60">
          Daily Akokite
        </span>
        <span className={`font-display italic font-bold leading-none ${LABEL_SIZE[size]}`}>
          {story.category}
        </span>
      </div>
    </div>
  );
}
