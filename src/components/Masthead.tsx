import Image from "next/image";
import Link from "next/link";

export default function Masthead() {
  return (
    <div className="border-b border-black bg-white">
      <div className="site-container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/da-logo.png"
            alt="DAILY AKOKITE"
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink leading-none">
            DAILY AKOKITE
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-xs font-sans font-medium uppercase tracking-wider text-ink/60">
          <span>The Press Club, University of Lagos</span>
          <span className="text-ink/30">|</span>
          <span>Est. 2003</span>
        </div>
      </div>
    </div>
  );
}