import Link from "next/link";
import Image from "next/image";
import { getPageContent } from "@/lib/data";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "About - DAILY AKOKITE",
    description:
      "Daily Akokite is the student newspaper of the University of Lagos, produced by The Press Club, UNILAG.",
  };
}

export default async function AboutPage() {
  const page = await getPageContent("about");

  return (
    <main id="main">
      {/* Semafor-style centered hero — same pattern as category pages */}
      <div className="bg-white border-b border-black/10">
        <div className="site-container pt-10 md:pt-14 pb-10 flex flex-col items-center text-center px-4 md:px-0">
          <Link
            href="/"
            className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 hover:text-brand mb-6 transition-colors"
          >
            ← Home
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-none tracking-tight">
            About Us
          </h1>
          <p className="font-display text-lg md:text-2xl italic text-ink/55 mt-4">
            The student newspaper of the University of Lagos
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="site-container py-14 md:py-20 px-4 md:px-0">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">

          {/* Main body — WP page content */}
          <div className="lg:col-span-7">
            {page ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: page.body }}
              />
            ) : (
              <p className="text-ink/50 font-sans">Content coming soon.</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="border border-black p-6">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-black/10">
                <Image
                  src="/da-logo.png"
                  alt="Daily Akokite"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <div>
                  <div className="font-display text-xl font-bold leading-tight">
                    Daily Akokite
                  </div>
                  <div className="text-[11px] font-sans text-ink/50 uppercase tracking-wider mt-1">
                    The Press Club, UNILAG · Est. 2003
                  </div>
                </div>
              </div>

              <address className="not-italic text-sm text-ink/70 leading-relaxed">
                <p>University of Lagos, Akoka</p>
                <p>Lagos, Nigeria</p>
                <a
                  href="mailto:dailyakokite@gmail.com"
                  className="mt-2 inline-block text-brand hover:underline underline-offset-4"
                >
                  dailyakokite@gmail.com
                </a>
              </address>

              <div className="mt-5 pt-5 border-t border-black/10">
                <div className="text-[9px] font-sans font-bold uppercase tracking-[0.18em] text-ink/40 mb-3">
                  Follow Us
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Instagram", "TikTok", "LinkedIn", "YouTube"].map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] border border-black/20 px-3 py-1 text-ink/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-black/10">
                <Link
                  href="/contact"
                  className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.14em] bg-ink text-white px-5 py-3 hover:bg-brand transition-colors"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
