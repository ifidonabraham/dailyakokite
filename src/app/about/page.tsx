import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export async function generateMetadata() {
  return {
    title: "About - DAILY AKOKITE",
    description:
      "Daily Akokite is the student newspaper of the University of Lagos, produced by The Press Club. Informing, challenging, and amplifying the Akoka community since 2003.",
  };
}

const STATS = [
  { value: "2003", label: "Est." },
  { value: "20+", label: "Years of Campus Journalism" },
  { value: "100%", label: "Student-run" },
  { value: "UNILAG", label: "Akoka, Lagos" },
];

const VALUES = [
  {
    title: "Truth First",
    body: "We verify before we publish. Accuracy is non-negotiable — we correct errors transparently and promptly.",
  },
  {
    title: "Independence",
    body: "Editorial decisions are made by students, for students. No administration, no sponsor controls what we write.",
  },
  {
    title: "Accountability",
    body: "We hold power to account — on campus, in government, and wherever the story takes us.",
  },
  {
    title: "Representation",
    body: "Voices from every corner of UNILAG deserve space and dignity. We actively seek out the under-represented.",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      {/* Hero — Semafor-style centered */}
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

      {/* Stats strip */}
      <div className="border-b border-black bg-ink text-white">
        <div className="site-container px-4 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-6 text-center px-4">
                <span className="font-display text-3xl md:text-4xl font-bold leading-none">
                  {s.value}
                </span>
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.16em] text-white/50 mt-2">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="site-container py-14 md:py-20 px-4 md:px-0">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">

          {/* Body text — 7 cols */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">
              Who We Are
            </h2>
            <div className="prose max-w-none">
              <p className="text-[16px] leading-relaxed">
                <strong>DAILY AKOKITE</strong> is the official student newspaper of the University of Lagos, produced by The Press Club, University of Lagos. We are an independent, student-run editorial outlet committed to informing, challenging, and amplifying the voices of the Akoka community.
              </p>
              <p>
                Established in 2003, the Press Club has been the training ground for generations of campus journalists, editors, photojournalists, and multimedia storytellers in Akoka. Daily Akokite carries forward that legacy — covering university governance, student affairs, campus life, culture, and wider society through a student lens.
              </p>
              <p>
                Our journalism is guided by one principle: the press serves the public interest. We report with accuracy, integrity, and courage, and we are accountable to the community we serve.
              </p>
            </div>

            {/* Mission */}
            <div className="border-l-4 border-brand pl-6 mt-10 mb-10">
              <h3 className="font-display text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-ink/70 leading-relaxed">
                To produce credible, student-driven journalism that informs, engages, and challenges the University of Lagos community — holding power to account and amplifying the voices that matter.
              </p>
            </div>

            {/* Join Us */}
            <div className="bg-surface border border-black/10 p-8">
              <h3 className="font-display text-2xl font-bold mb-3">Join Us</h3>
              <p className="text-ink/70 leading-relaxed mb-5">
                Interested in writing, design, photography, video, or editorial leadership? The Press Club welcomes new members each semester. No prior experience required — only the drive to tell stories that matter.
              </p>
              <a
                href="mailto:dailyakokite@gmail.com"
                className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.14em] bg-ink text-white px-6 py-3 hover:bg-brand transition-colors"
              >
                Send Your Pitch →
              </a>
            </div>
          </div>

          {/* Sidebar — 5 cols */}
          <aside className="lg:col-span-5 flex flex-col gap-8">

            {/* Identity card */}
            <div className="border border-black p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/10">
                <Image
                  src="/da-logo.png"
                  alt="Daily Akokite"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <div>
                  <div className="font-display text-xl font-bold leading-tight">Daily Akokite</div>
                  <div className="text-[11px] font-sans text-ink/50 uppercase tracking-wider mt-1">
                    The Press Club, UNILAG · Est. 2003
                  </div>
                </div>
              </div>
              <address className="not-italic text-sm text-ink/70 leading-relaxed">
                <p>University of Lagos, Akoka</p>
                <p>Lagos, Nigeria</p>
              </address>
              <a
                href="mailto:dailyakokite@gmail.com"
                className="mt-3 inline-block text-sm text-brand hover:underline underline-offset-4"
              >
                dailyakokite@gmail.com
              </a>
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
            </div>

            {/* Core values */}
            <div>
              <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink/40 mb-5">
                Our Values
              </h3>
              <div className="flex flex-col divide-y divide-black/10">
                {VALUES.map((v) => (
                  <div key={v.title} className="py-5 first:pt-0">
                    <h4 className="font-display text-lg font-bold mb-1">{v.title}</h4>
                    <p className="text-sm text-ink/65 leading-relaxed">{v.body}</p>
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
