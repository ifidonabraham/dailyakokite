import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/newspaper", label: "Newspaper" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16" role="contentinfo">
      <div className="site-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/da-logo.png"
                alt="DAILY AKOKITE"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <h3 className="font-display text-2xl font-bold tracking-tight">
                DAILY AKOKITE
              </h3>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              The student newspaper of the University of Lagos. Informing,
              challenging and amplifying the Akoka community since 2003.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-white/50 mb-3">
              Sections
            </h4>
            <ul className="text-sm space-y-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-white/50 mb-3">
              Contact
            </h4>
            <p className="text-sm text-white/80">University of Lagos, Akoka</p>
            <p className="text-sm text-white/80">Lagos, Nigeria</p>
            <a
              href="mailto:dailyakokite@gmail.com"
              className="text-sm text-white/80 hover:text-white block mt-1"
            >
              dailyakokite@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-6 flex items-center justify-between text-xs text-white/50">
          <span>&copy; {new Date().getFullYear()} DAILY AKOKITE. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <Image
              src="/press-club-logo.png"
              alt="The Press Club, University of Lagos"
              width={28}
              height={8}
              className="h-2 w-10 opacity-70"
            />
            The Press Club, University of Lagos
          </span>
        </div>
      </div>
    </footer>
  );
}