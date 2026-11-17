"use client";

import { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { href: "/", label: "Home" },
  { href: "/newspaper", label: "Newspaper" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function PrimaryNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-black bg-white" aria-label="Primary">
      <div className="site-container">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm font-sans font-semibold uppercase tracking-wide text-ink hover:text-brand transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm font-sans">
            <form action="/search" method="get" className="hidden md:flex items-center">
              <label htmlFor="q" className="sr-only">
                Search stories
              </label>
              <input
                id="q"
                name="q"
                type="search"
                placeholder="Search stories…"
                className="w-44 px-2 py-1 text-sm border-b border-black bg-transparent focus:outline-none focus:border-brand"
              />
            </form>
            <button
              type="button"
              className="md:hidden p-2 border border-black hover:bg-black hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="block w-5 h-0.5 bg-ink" />
              <span className="block w-5 h-0.5 bg-ink mt-1" />
              <span className="block w-5 h-0.5 bg-ink mt-1" />
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className="md:hidden border-t border-black py-3">
            <ul className="flex flex-col">
              {SECTIONS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="block py-2 text-sm font-sans font-semibold uppercase tracking-wide text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}