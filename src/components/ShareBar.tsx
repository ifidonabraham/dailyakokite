"use client";

import { useState } from "react";
import type { Story } from "@/types/wp";

export default function ShareBar({ story }: { story: Story }) {
  const [open, setOpen] = useState(false);
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

  type ShareItem = {
    label: string;
    icon: string;
    href?: string;
    action?: () => void;
  };

  const items: ShareItem[] = [
    {
      label: "Copy link",
      action: copyLink,
      icon: copied ? "✓" : "🔗",
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      icon: "𝕏",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: "f",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(story.title)}&body=${encodeURIComponent(`${story.title}\n${url}`)}`,
      icon: "✉",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
      icon: "💬",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-colors"
        aria-label="Share article"
        aria-expanded={open}
      >
        <span>Share</span>
        <span className={open ? "rotate-180" : ""}>▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-black shadow-lg z-50">
          {items.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm font-sans hover:bg-black hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                <span className="w-4 text-center">{item.icon}</span>
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                onClick={() => item.action?.()}
                className="flex items-center gap-2 px-3 py-2 text-sm font-sans hover:bg-black hover:text-white transition-colors w-full text-left"
              >
                <span className="w-4 text-center">{item.icon}</span>
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}