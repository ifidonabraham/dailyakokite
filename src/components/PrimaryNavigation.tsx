"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SECTIONS = [
  { href: "/", label: "Home" },
  { href: "/newspaper", label: "Newspaper" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CATEGORY_LINKS = [
  { href: "/category/news", label: "News" },
  { href: "/category/opinion", label: "Opinion" },
  { href: "/category/feature", label: "Features" },
  { href: "/category/sports", label: "Sports" },
  { href: "/category/arts", label: "Arts" },
  { href: "/category/campus-life", label: "Campus Life" },
];

export default function PrimaryNavigation() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>(
    []
  );

  useEffect(() => {
    fetch("https://unilagnews.com/wp-json/wp/v2/categories?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const withPosts = (data as { name: string; slug: string; count: number }[])
          .filter((c) => c.count > 0)
          .sort((a, b) => b.count - a.count);
        setCategories(
          withPosts.map(({ name, slug }) => ({ name, slug }))
        );
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const allSections =
    categories.length > 0
      ? categories.map((c) => ({
          href: `/category/${c.slug}`,
          label: c.name,
        }))
      : CATEGORY_LINKS;

  return (
    <nav className="border-b border-black bg-white" aria-label="Primary">
      <div className="site-container">
                <div className="flex items-center justify-between h-12 px-4 md:px-0">
          {/* Top row: Home | Newspaper | About | Contact */}
          <div className="flex items-center gap-4 md:gap-8">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-ink hover:text-brand transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Search field - visible next to the menu button */}
            <form action="/search" method="get" className="hidden sm:flex items-center">
              <label htmlFor="nav-q" className="sr-only">
                Search stories
              </label>
              <input
                id="nav-q"
                name="q"
                type="search"
                placeholder="Search stories…"
                className="w-40 px-2 py-1 text-sm border-b border-black/20 bg-transparent focus:outline-none focus:border-brand"
              />
            </form>

            {/* Menu button: NYT-style "≡ SECTIONS" */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 h-9 border border-black hover:bg-black hover:text-white transition-colors group"
              aria-label="Open all sections"
              aria-expanded={open}
              aria-controls="sections-drawer"
              onClick={() => setOpen(true)}
            >
              <span className="flex flex-col gap-[4px]">
                <span className="block w-[18px] h-[1.5px] bg-current" />
                <span className="block w-[18px] h-[1.5px] bg-current" />
                <span className="block w-[18px] h-[1.5px] bg-current" />
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.12em]">
                Sections
              </span>
            </button>
          </div>
        </div>

        {/* Second row: category ribbon - tighter spacing */}
        <div className="border-t border-black/10 overflow-x-auto no-scrollbar py-2 px-4 md:px-0">
          <div className="flex items-center gap-6 min-w-max">
            {CATEGORY_LINKS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-[9px] font-sans font-bold uppercase tracking-[0.14em] text-ink/60 hover:text-brand whitespace-nowrap transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer: all sections (right-slide, holds every category with posts) */}
        <div
          className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
          aria-hidden={!open}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />

          <aside
            id="sections-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="All sections"
            className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b-2 border-black shrink-0">
              <span className="font-display text-lg font-bold tracking-tight">
                All Sections
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 5l14 14M19 5L5 19" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5">
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mb-3">
                Pages
              </p>
              <ul className="flex flex-col gap-1 pb-5 border-b border-black/10">
                {SECTIONS.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="block py-2 font-sans text-sm font-bold uppercase tracking-[0.12em] hover:text-brand transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mt-5 mb-3">
                {allSections.length} Sections
              </p>
              <ul className="flex flex-col gap-1">
                {allSections.map((s) => (
                  <li key={s.href} className="border-b border-black/5 last:border-0">
                    <Link
                      href={s.href}
                      className="block py-3 font-display text-xl font-bold leading-tight hover:text-brand transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-black/10 px-6 py-4 shrink-0">
              <p className="text-[10px] font-sans uppercase tracking-[0.16em] text-ink/40">
                {allSections.length} sections total
              </p>
              <form action="/search" method="get" className="flex items-center gap-2 mt-3">
                <label htmlFor="drawer-q" className="sr-only">
                  Search stories
                </label>
                <input
                  id="drawer-q"
                  name="q"
                  type="search"
                  placeholder="Search stories…"
                  className="flex-1 px-2 py-2 text-sm border-b border-black/20 bg-transparent focus:outline-none focus:border-brand"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-[11px] font-sans font-bold uppercase tracking-[0.14em] border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </nav>
  );
}
