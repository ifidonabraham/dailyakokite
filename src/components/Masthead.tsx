import Image from "next/image";
import Link from "next/link";

function getTodayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();
}

export default function Masthead() {
  return (
    <div className="bg-white">
      {/* Thin date/edition bar — NYT style */}
      <div className="border-b border-black/10">
        <div className="site-container flex items-center justify-between h-8 px-4 md:px-0">
          <span className="text-[9px] font-sans font-medium uppercase tracking-[0.12em] text-ink/40">
            {getTodayLabel()}
          </span>
          <span className="hidden sm:block text-[9px] font-sans font-medium uppercase tracking-[0.12em] text-ink/40">
            The Press Club, University of Lagos · Est. 2003
          </span>
        </div>
      </div>

      {/* Centered wordmark — prominent, editorial */}
      <div className="site-container py-5 md:py-8 flex flex-col items-center text-center px-4 md:px-0">
        <Link href="/" className="flex flex-col items-center gap-2 group">
          <Image
            src="/da-logo.png"
            alt="DAILY AKOKITE"
            width={48}
            height={48}
            priority
            className="h-10 w-10 md:h-12 md:w-12"
          />
          <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-none mt-1">
            DAILY AKOKITE
          </span>
        </Link>
        <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-ink/35 mt-3">
          The student newspaper of the University of Lagos
        </p>
      </div>
    </div>
  );
}