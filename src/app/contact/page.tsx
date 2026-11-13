import { getPageContent } from "@/lib/data";
import type { PageContent } from "@/types/wp";

export const revalidate = 300;

export async function generateMetadata() {
  return { title: "Contact - DAILY AKOKITE" };
}

export default async function ContactPage() {
  const page = await getPageContent("contact");

  return (
    <article className="site-container py-8">
      <h1 className="font-display text-4xl font-extrabold mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-2xl font-bold mb-3">
            Press Club, University of Lagos
          </h2>
          <p className="text-ink/70 leading-relaxed">
            Akoka, Lagos, Nigeria
          </p>
          <a
            href="mailto:dailyakokite@gmail.com"
            className="block mt-4 text-brand font-semibold"
          >
            dailyakokite@gmail.com
          </a>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold mb-3">
            Send a Message
          </h2>
          <form
            action="mailto:dailyakokite@gmail.com"
            encType="text/plain"
            method="post"
            className="space-y-3"
          >
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full border border-black px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-black px-3 py-2 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border border-black px-3 py-2 text-sm"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              className="w-full border border-black px-3 py-2 text-sm"
              required
            />
            <button
              type="submit"
              className="bg-brand text-white px-5 py-2 font-sans font-semibold uppercase tracking-wider"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {page && (
        <div
          className="prose max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      )}
    </article>
  );
}