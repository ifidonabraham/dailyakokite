import Link from "next/link";
import { getPageContent } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "Contact - DAILY AKOKITE",
    description: "Get in touch with the Daily Akokite editorial team at the University of Lagos.",
  };
}

export default async function ContactPage() {
  const page = await getPageContent("contact");

  return (
    <main id="main">
      {/* Semafor-style centered hero */}
      <div className="bg-white border-b border-black/10">
        <div className="site-container pt-10 md:pt-14 pb-10 flex flex-col items-center text-center px-4 md:px-0">
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
            Get in touch with the Daily Akokite team
          </p>
        </div>
      </div>

      <section className="site-container py-14 md:py-20 px-4 md:px-0">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">

          {/* Form — 7 cols */}
          <div className="lg:col-span-7">
            {/* If WP contact page has content, show it above the form */}
            {page && (
              <div
                className="prose max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: page.body }}
              />
            )}
            <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Sidebar — 5 cols */}
          <aside className="lg:col-span-5">
            <div className="border border-black p-6">
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mb-5">
                Direct Contact
              </h3>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-ink/40 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:dailyakokite@gmail.com"
                    className="text-sm text-ink hover:text-brand underline underline-offset-4 transition-colors"
                  >
                    dailyakokite@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-ink/40 mb-1">
                    Location
                  </p>
                  <address className="not-italic text-sm text-ink/70 leading-relaxed">
                    University of Lagos<br />
                    Akoka, Lagos, Nigeria
                  </address>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
