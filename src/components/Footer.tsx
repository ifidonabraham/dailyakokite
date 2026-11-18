import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/data";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/newspaper", label: "Newspaper" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function Footer() {
  const categories = await getAllCategories().catch(() => []);
  const sections = categories.slice(0, 14);

  return (
    <footer className="bg-ink text-white mt-20" role="contentinfo">
      {/* Top accent rule */}
      <div className="h-[3px] bg-white" />

      <div className="site-container pt-12 pb-6 px-4 md:px-0">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          {/* Brand — 3 cols */}
          <div className="md:col-span-3">
            <Link href="/" className="flex flex-col gap-2 mb-5 group">
              <Image
                src="/da-logo.png"
                alt="DAILY AKOKITE"
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <span className="font-display text-2xl font-bold tracking-tight leading-none group-hover:opacity-80 transition-opacity">
                DAILY AKOKITE
              </span>
            </Link>
            <p className="text-[13px] text-white/55 leading-relaxed">
              The student newspaper of the University of Lagos — informing, challenging, and amplifying the Akoka community since 2003.
            </p>
            <Link
              href="/about"
              className="inline-block mt-5 text-[9px] font-sans font-bold uppercase tracking-[0.16em] border border-white/25 hover:border-white px-4 py-2 text-white/55 hover:text-white transition-colors"
            >
              About the paper →
            </Link>
          </div>

          {/* Sections — 5 cols, 2 column sub-grid */}
          <div className="md:col-span-5 md:px-6 md:border-l md:border-white/10">
            <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-white/35 mb-5">
              Sections
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-0">
              {sections.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="text-[13px] text-white/65 hover:text-white py-2 border-b border-white/5 hover:underline underline-offset-4 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Pages + Contact — 4 cols */}
          <div className="md:col-span-4 md:pl-6 md:border-l md:border-white/10 flex flex-col gap-10">
            {/* Pages */}
            <div>
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-white/35 mb-5">
                Pages
              </h3>
              <ul className="flex flex-col gap-0">
                {PAGES.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="text-[13px] text-white/65 hover:text-white py-2 border-b border-white/5 hover:underline underline-offset-4 transition-colors block"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-white/35 mb-4">
                Contact
              </h3>
              <address className="not-italic text-[13px] text-white/55 leading-relaxed">
                <p>University of Lagos, Akoka</p>
                <p>Lagos, Nigeria</p>
                <a
                  href="mailto:dailyakokite@gmail.com"
                  className="mt-2 inline-block text-white/70 hover:text-white underline underline-offset-4 transition-colors"
                >
                  dailyakokite@gmail.com
                </a>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[10px] font-sans text-white/30 uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} Daily Akokite. All rights reserved.
          </span>
          <span className="flex items-center gap-2 text-[10px] font-sans text-white/30 uppercase tracking-[0.1em]">
            <Image
              src="/press-club-logo.png"
              alt="The Press Club, University of Lagos"
              width={28}
              height={8}
              className="h-2 w-10 opacity-40"
            />
            The Press Club, University of Lagos
          </span>
        </div>
      </div>
    </footer>
  );
}
