import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const revalidate = 86400;

export async function generateMetadata() {
  return {
    title: "Contact - DAILY AKOKITE",
    description: "Get in touch with the Daily Akokite editorial team at the University of Lagos.",
  };
}

const CONTACT_REASONS = [
  { label: "Story tip or lead", desc: "Have news we should cover? Send us the details." },
  { label: "Letter to the editor", desc: "Respond to our coverage or share your perspective." },
  { label: "Press release", desc: "Sending an official announcement or event notice." },
  { label: "Corrections", desc: "Spotted an error? Let us know and we'll correct it." },
  { label: "Join the team", desc: "Interested in writing, design, photography or editing." },
  { label: "Advertising / partnerships", desc: "Reach the UNILAG community through our platform." },
];

export default function ContactPage() {
  return (
    <main id="main">
      {/* Hero */}
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
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Send a Message
            </h2>
            <p className="text-ink/55 text-sm mb-8">
              Fill out the form below and we&apos;ll open your email client with the message pre-filled. Or email us directly at{" "}
              <a href="mailto:dailyakokite@gmail.com" className="text-brand hover:underline underline-offset-4">
                dailyakokite@gmail.com
              </a>
            </p>
            <ContactForm />
          </div>

          {/* Sidebar — 5 cols */}
          <aside className="lg:col-span-5 flex flex-col gap-8">

            {/* Direct contact */}
            <div className="border border-black p-6">
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mb-5">
                Direct Contact
              </h3>
              <div className="flex flex-col gap-4">
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
                  <address className="not-italic text-sm text-ink/70">
                    University of Lagos<br />
                    Akoka, Lagos, Nigeria
                  </address>
                </div>
              </div>
            </div>

            {/* Reasons to contact */}
            <div>
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mb-5">
                Why People Contact Us
              </h3>
              <div className="flex flex-col divide-y divide-black/10">
                {CONTACT_REASONS.map((r) => (
                  <div key={r.label} className="py-4 first:pt-0">
                    <p className="font-display text-[15px] font-bold leading-tight">{r.label}</p>
                    <p className="text-[12px] text-ink/55 mt-1">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </section>
    </main>
  );
}
