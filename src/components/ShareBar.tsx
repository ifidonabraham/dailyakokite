"use client";

import { useState } from "react";
import Link from "next/link";
import type { Story } from "@/types/wp";

export default function ShareBar({ story }: { story: Story }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined"
    ? window.location.href
    : `https://dailyakokite.vercel.app/${story.slug}`;

  const shareText = encodeURIComponent(`${story.title} - DAILY AKOKITE`);
  const shareUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyLink}
        className="px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? "Copied!" : "Share"}
      </button>

      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
        aria-label="Share on Twitter"
      >
        Twitter
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>

      <a
        href={`mailto:?subject=${encodeURIComponent(story.title)}&body=${encodeURIComponent(`${story.title}\n${url}`)}`}
        className="px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
        aria-label="Share via Email"
      >
        Email
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}
