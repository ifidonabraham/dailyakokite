import Link from "next/link";
import Image from "next/image";
import { getPageContent } from "@/lib/data";
import { CONTACT } from "@/lib/site";
import SocialLinks from "@/components/SocialLinks";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "About",
    description:
      "Daily Akokite is an editorial outlet of The Press Club, University of Lagos.",
  };
}

const IMG_TAG = /<img\b[^>]*>/gi;

function attr(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? "";
}

// Pulls the WP images out of the flow so they render as a cropped pair instead
// of two full-height portrait photos; the pair sits where the first image was.
function splitAboutBody(html: string) {
  const images = [...html.matchAll(IMG_TAG)].map((m) => attr(m[0], "src")).filter(Boolean);
  let seen = 0;
  const marked = html
    .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, "")
    .replace(IMG_TAG, () => (seen++ === 0 ? "<!--about-images-->" : ""));
  const [before, after = ""] = marked.split("<!--about-images-->");
  return { before, after, images };
}

export default async function AboutPage() {
  const page = await getPageContent("about");
  const body = page ? splitAboutBody(page.body) : null;

  return (
    <main id="main">
      <div className="bg-white border-b border-black/10">
        <div className="site-container pt-10 md:pt-14 pb-10 flex flex-col items-center text-center">
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
            From DAILY AKOKITE
          </p>
        </div>
      </div>

      <section className="site-container py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-7 min-w-0">
            {body ? (
              <>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: body.before }} />
                {body.images.length > 0 && (
                  <div className={`grid gap-3 my-10 ${body.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {body.images.slice(0, 2).map((src) => (
                      <div key={src} className="aspect-[4/3] overflow-hidden bg-surface">
                        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: body.after }} />
              </>
            ) : (
              <p className="text-ink/50 font-sans">Content coming soon.</p>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-black p-6 lg:sticky lg:top-6">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-black/10">
                <Image src="/da-logo.png" alt="" width={48} height={48} className="h-12 w-12" />
                <div>
                  <div className="font-display text-xl font-bold leading-tight">Daily Akokite</div>
                  <div className="text-[11px] font-sans text-ink/50 uppercase tracking-wider mt-1">
                    The Press Club, UNILAG
                  </div>
                </div>
              </div>

              <address className="not-italic text-sm text-ink/70 leading-relaxed flex flex-col gap-1">
                <p>{CONTACT.address}</p>
                <a href={`mailto:${CONTACT.email}`} className="text-brand hover:underline underline-offset-4 break-all">
                  {CONTACT.email}
                </a>
                <a href={`tel:${CONTACT.phone.replace(/-/g, "")}`} className="hover:text-brand">
                  {CONTACT.phone}
                </a>
              </address>

              <div className="mt-5 pt-5 border-t border-black/10">
                <div className="text-[9px] font-sans font-bold uppercase tracking-[0.18em] text-ink/40 mb-3">
                  Follow Us
                </div>
                <SocialLinks />
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
