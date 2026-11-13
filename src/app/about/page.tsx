import Image from "next/image";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "About - DAILY AKOKITE",
    description:
      "Daily Akokite is the student newspaper of the University of Lagos. The Press Club, UNILAG.",
  };
}

export default function AboutPage() {
  return (
    <main id="main">
      <section className="site-container py-12">
        <h1 className="font-display text-4xl font-extrabold mb-8">About Daily Akokite</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose max-w-none">
            <p className="text-lg">
              <strong>DAILY AKOKITE</strong> is the official student newspaper of the University of Lagos, produced by The Press Club, University of Lagos.
            </p>
            <p>
              Established in 2003, the Press Club has been the training ground for generations of campus journalists, editors, photojournalists, and multimedia storytellers in Akoka. Daily Akokite carries forward that legacy as an independent, student-run editorial outlet committed to informing, challenging, and amplifying the voices of the Akoka community.
            </p>
            <h2>Our Mission</h2>
            <p>
              We report with accuracy, integrity, and courage. We cover university governance, student affairs, campus life, culture, and wider society through a student lens. Our work is guided by the principle that journalism serves the public interest — especially the community that sustains us.
            </p>
            <h2>Our Values</h2>
            <ul>
              <li>Truth first. Verification before publication.</li>
              <li>Independence. Editorial decisions are made by students, for students.</li>
              <li>Accountability. We hold power to account on campus and beyond.</li>
              <li>Representation. Voices from across UNILAG are given space and dignity.</li>
            </ul>
            <h2>Join Us</h2>
            <p>
              Interested in writing, design, photography, video, or editorial leadership? The Press Club welcomes new members each semester. Send your pitch or portfolio to <a href="mailto:dailyakokite@gmail.com">dailyakokite@gmail.com</a> and join a community dedicated to authentic student storytelling.
            </p>
          </div>

          <aside className="lg:col-span-1">
            <div className="border-t border-black pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/da-logo.png" alt="Daily Akokite" width={48} height={48} className="h-12 w-12" />
                <div>
                  <div className="font-display text-xl font-bold">Daily Akokite</div>
                  <div className="text-sm text-ink/60">The Press Club, UNILAG • Est. 2003</div>
                </div>
              </div>
              <p className="text-sm text-ink/70">
                University of Lagos, Akoka<br />
                Lagos, Nigeria<br />
                <a href="mailto:dailyakokite@gmail.com" className="text-brand">dailyakokite@gmail.com</a>
              </p>
              <div className="mt-6">
                <div className="text-[11px] font-medium uppercase tracking-widest text-brand mb-2">Follow</div>
                <div className="flex gap-4 text-ink/70">
                  <a href="#" className="hover:text-brand">Instagram</a>
                  <a href="#" className="hover:text-brand">TikTok</a>
                  <a href="#" className="hover:text-brand">LinkedIn</a>
                  <a href="#" className="hover:text-brand">YouTube</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}