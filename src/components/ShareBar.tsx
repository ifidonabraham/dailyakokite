"use client";

import { useState, useRef, useEffect } from "react";
import type { Story } from "@/types/wp";

export default function ShareBar({
  story,
  position = "bottom",
}: {
  story: Story;
  position?: "top" | "bottom";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://dailyakokite.vercel.app/${story.slug}`;

  const shareText = encodeURIComponent(`${story.title} - DAILY AKOKITE`);
  const shareUrl = encodeURIComponent(url);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      label: copied ? "Copied!" : "Copy link",
      action: copyLink,
      icon: "🔗",
    },
    {
      label: "Twitter / 𝕏",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      icon: "𝕏",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: "f",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
      icon: "💬",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(
        story.title
      )}&body=${encodeURIComponent(`${story.title}\n${url}`)}`,
      icon: "✉",
    },
  ];

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all"
        aria-label="Share article"
        aria-expanded={open}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute right-0 w-48 bg-white border border-black shadow-xl z-50 py-1 ${
            position === "top" ? "top-full mt-2" : "bottom-full mb-2"
          }`}
        >
          {items.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-sm font-sans font-medium hover:bg-black hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                <span className="w-5 text-center text-xs">{item.icon}</span>
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  item.action?.();
                  if (!copied) setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm font-sans font-medium hover:bg-black hover:text-white transition-colors w-full text-left"
              >
                <span className="w-5 text-center text-xs">{item.icon}</span>
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}