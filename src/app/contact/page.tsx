import Link from "next/link";
import { getPageContent } from "@/lib/data";
import { CONTACT } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "Contact - DAILY AKOKITE",
    description: "Get in touch with Daily Akokite and The Press Club, University of Lagos.",
  };
}

function toText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#8203;|​/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// The WP Contact page (WPForms + Elementor icon boxes) labels each detail with
// an <h5>; read the text that follows each label up to the next heading.
function contactField(html: string, label: string) {
  const re = new RegExp(
    `<h5\\b[^>]*>(?:\\s|<[^>]+>)*${label}[\\s\\S]*?</h5>([\\s\\S]*?)(?=<h[1-6]\\b|$)`,
    "i"
  );
  const m = html.match(re);
  return m ? toText(m[1]) || null : null;
}

export default async function ContactPage() {
  const page = await getPageContent("contact");
  const html = page?.body.replace(/<form\b[\s\S]*?<\/form>/gi, "") ?? "";

  const address = contactField(html, "Address") ?? CONTACT.address;
  const email = contactField(html, "Email") ?? CONTACT.email;
  const phone = contactField(html, "Call") ?? CONTACT.phone;
  const intro = toText(html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? "") || "Let’s get in touch";

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
            Contact Us
          </h1>
          <p className="font-display text-lg md:text-2xl italic text-ink/55 mt-4">
            From DAILY AKOKITE
          </p>
        </div>
      </div>

      <section className="site-container py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-7 min-w-0">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 capitalize">
              {intro.toLowerCase()}
            </h2>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-black p-6">
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mb-5">
                Contact Info
              </h3>
              <dl className="flex flex-col gap-5">
                <div>
                  <dt className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-ink/40 mb-1">Address</dt>
                  <dd className="text-sm text-ink/80">{address}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-ink/40 mb-1">Email Us</dt>
                  <dd>
                    <a href={`mailto:${email}`} className="text-sm text-ink hover:text-brand underline underline-offset-4 break-all">
                      {email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-ink/40 mb-1">Call Us</dt>
                  <dd>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-sm text-ink hover:text-brand">
                      {phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-ink/40 mb-2">Follow Us</dt>
                  <dd><SocialLinks /></dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
