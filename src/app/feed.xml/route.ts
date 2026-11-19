import { getLatestStories, wpDate } from "@/lib/data";

const SITE_URL = "https://dailyakokite.vercel.app";

export const revalidate = 600;

function xml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const stories = await getLatestStories(30).catch(() => []);

  const items = stories
    .map((s) => {
      const link = `${SITE_URL}/${s.slug}`;
      return `    <item>
      <title>${xml(s.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${wpDate(s.publishedAt).toUTCString()}</pubDate>
      <category>${xml(s.category)}</category>${
        s.byline ? `\n      <dc:creator>${xml(s.byline)}</dc:creator>` : ""
      }
      <description>${xml(s.excerpt || "")}</description>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DAILY AKOKITE</title>
    <link>${SITE_URL}</link>
    <description>The student newspaper of the University of Lagos, from The Press Club, UNILAG.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
