"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main">
      <div className="site-container pt-10 md:pt-14 pb-16 flex flex-col items-center text-center">
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-ink/45 mb-6">
          Something went wrong
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-none tracking-tight">
          We couldn&apos;t load this page
        </h1>
        <p className="font-display text-lg md:text-xl italic text-ink/60 mt-4 max-w-xl">
          Our newsroom server may be busy. Please try again in a moment.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => retry()}
            className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] bg-ink text-white px-6 py-3 hover:bg-brand transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Front page
          </Link>
        </div>
      </div>
    </main>
  );
}
