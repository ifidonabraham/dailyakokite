import type { WPPost, WPPage, Story, PageContent, WPAuthor, Author } from "@/types/wp";

const WP_API_URL = "https://unilagnews.com/wp-json/wp/v2";

// Fields normalizeStory actually reads; keeps list payloads ~17x smaller than _embed.
const POST_FIELDS =
  "id,slug,title,excerpt,content,link,date,modified,categories,tags,author,format,status,author_info,featured_image_urls";

const RETRY_DELAYS_MS = [500, 1500];

// The WP host intermittently refuses bursts of requests from Vercel, so retry
// throttling/server errors before letting the render fail.
async function fetchWP<T>(endpoint: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt - 1]));
    try {
      const res = await fetch(`${WP_API_URL}${endpoint}`, {
        signal: AbortSignal.timeout(30_000),
        headers: { "User-Agent": "DailyAkokite-Next/1.0 (+https://dailyakokite.vercel.app)" },
      });
      if (res.ok) return res.json();
      lastError = new Error(`WP ${res.status} ${res.statusText} for ${endpoint}`);
      if (res.status < 500 && res.status !== 429 && res.status !== 403) break;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

// --- Raw WordPress fetchers (CMS layer) ---

export async function getRawPosts(perPage = 100): Promise<WPPost[]> {
  return fetchWP(`/posts?_fields=${POST_FIELDS}&per_page=${perPage}`);
}

export async function getRawPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>(
    `/posts?_fields=${POST_FIELDS}&slug=${encodeURIComponent(slug)}`
  );
  return posts.length > 0 ? posts[0] : null;
}

export async function getRawPages(): Promise<WPPage[]> {
  return fetchWP("/pages?per_page=50");
}

export async function getRawPageBySlug(slug: string): Promise<WPPage | null> {
  const res = await fetchWP<WPPage[]>(`/pages?slug=${encodeURIComponent(slug)}`);
  return res.length > 0 ? res[0] : null;
}

export async function getRawCategories(): Promise<
  { id: number; name: string; slug: string; count: number }[]
> {
  return fetchWP("/categories?per_page=100");
}

export async function getAuthorsRaw(): Promise<WPAuthor[]> {
  return fetchWP("/users?per_page=100");
}

export async function getAuthorBySlugRaw(
  slug: string
): Promise<WPAuthor[]> {
  return fetchWP(`/users?slug=${encodeURIComponent(slug)}`);
}

// --- Normalized story contract (frontend content contract, CMS-agnostic) ---

const CATEGORY_NAMES: Record<number, string> = {
  1: "News",
  3: "General",
  4: "News",
  5: "Editorials",
  6: "Opinion",
  7: "Interview",
  8: "ULSU Watch",
  18: "News Alert",
  19: "Poem",
  24: "Story",
  25: "Press Release",
  34: "Book Recommendation",
  36: "Feature",
  40: "Entertainment",
  41: "Article",
  42: "Movie",
  43: "Essay",
  44: "Social Commentary",
  45: "Social Commentary/Advocacy",
  46: "Opinion Article",
  47: "Short Story",
  48: "Neque",
  53: "Sport",
  54: "Feature",
  55: "Drama",
};

export function storyTypeFor(post: WPPost): Story["storyType"] {
  const cats = (post.categories || []).map((c) => CATEGORY_NAMES[c]);
  if (cats.includes("Press Release")) return "press-release";
  if (cats.includes("Opinion") || cats.includes("Opinion Article"))
    return "opinion";
  if (cats.includes("Interview")) return "interview";
  if (cats.includes("Feature")) return "feature";
  return "news";
}

export function normalizeStory(post: WPPost): Story {
  const cats = (post.categories || []).map((c) => CATEGORY_NAMES[c] || String(c));
  const primary = cats[0] || "News";
  const image = post.featured_image_urls?.full?.[0] || null;
  const byline = extractByline(post.content.rendered);
  const title = decodeEntities(post.title.rendered);
  // Fallback: if no featured image is set, pull the first image out of the
  // article body. Many posts (especially essays) have an inline image but no
  // featured image, so the preview still shows something.
  const bodyImage = image ? null : extractFirstImage(post.content.rendered);
  const featuredImage = image
    ? rewriteImageUrl(image)
    : bodyImage
      ? rewriteImageUrl(bodyImage)
      : null;
  const body = rewriteContentHtml(post.content.rendered);
  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt: cleanExcerpt(post.excerpt.rendered, byline),
    body: featuredImage ? removeLeadImage(body, featuredImage) : body,
    storyType: storyTypeFor(post),
    category: primary,
    categories: cats,
    author: post.author_info?.display_name || "Daily Akokite",
    authorId: post.author_info?.id || 0,
    authorSlug: authorSlugFromLink(post.author_info?.author_link || ""),
    byline,
    authorName: byline || post.author_info?.display_name || "Daily Akokite",
    publishedAt: post.date,
    updatedAt: post.modified,
    featuredImage,
    featuredImageAlt: title,
    canonicalUrl: post.link ? rewriteContentHtml(post.link) : "",
    status: post.status,
    format: post.format || "standard",
  };
}

export function normalizePage(page: WPPage): PageContent {
  return {
    slug: page.slug,
    title: decodeEntities(page.title.rendered),
    body: rewriteContentHtml(page.content.rendered),
    status: page.status,
  };
}

// --- Normalized public-facing queries ---

export async function getLatestStories(limit = 12): Promise<Story[]> {
  const posts = await getRawPosts(limit);
  return posts.map(normalizeStory);
}

export async function getCategoriesWithStories(): Promise<
  { id: number; name: string; slug: string; stories: Story[] }[]
> {
  const [cats, posts] = await Promise.all([
    getRawCategories(),
    getRawPosts(100),
  ]);
  const normalized = posts.map(normalizeStory);
  return cats
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      stories: normalized
        .filter((s) => (s.categories || []).includes(c.name))
        .slice(0, 6),
    }))
    .filter((c) => c.stories.length > 0);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const post = await getRawPostBySlug(slug);
  return post ? normalizeStory(post) : null;
}

export async function getStoriesByCategory(
  slug: string,
  limit = 20
): Promise<Story[]> {
  // Resolve the slug to a category id, then ask WordPress for posts in that
  // category directly. Filtering the last N posts client-side misses older
  // stories (e.g. essays from last year) and Number(slug) is always NaN.
  const cats = await getRawCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return [];
  const posts = await fetchWP<WPPost[]>(
    `/posts?_fields=${POST_FIELDS}&categories=${cat.id}&per_page=${limit}`
  );
  return posts.map(normalizeStory);
}

export async function getPageContent(
  slug: string
): Promise<PageContent | null> {
  const page = await getRawPageBySlug(slug);
  return page ? normalizePage(page) : null;
}

export async function getAllCategories(): Promise<
  { id: number; name: string; slug: string; count: number }[]
> {
  return getRawCategories();
}

// --- Authors ---

export function normalizeAuthor(user: WPAuthor): Author {
  return {
    id: user.id,
    name: user.name,
    slug: user.slug,
    bio: user.description || "",
    avatar: user.avatar_urls?.["96"] || user.avatar_urls?.["48"] || null,
    storyCount: 0,
  };
}

export async function getAuthors(): Promise<Author[]> {
  const users = await getAuthorsRaw();
  return users.map(normalizeAuthor);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const users = await getAuthorBySlugRaw(slug);
  return users.length > 0 ? normalizeAuthor(users[0]) : null;
}

export async function getStoriesByAuthor(
  authorSlug: string,
  limit = 20
): Promise<Story[]> {
  const posts = await getRawPosts(100);
  return posts
    .filter(
      (p) =>
        (p.author_info?.author_link || "") === authorSlug ||
        p.author_info?.slug === authorSlug
    )
    .slice(0, limit)
    .map(normalizeStory);
}

export async function getAuthorStoryCounts(): Promise<
  Record<string, number>
> {
  const posts = await getRawPosts(100);
  const counts: Record<string, number> = {};
  for (const p of posts) {
    const slug = p.author_info?.author_link || "";
    if (slug) counts[slug] = (counts[slug] || 0) + 1;
  }
  return counts;
}

// --- Search (3-tier ranking) ---
//
// WordPress's `search` param matches title, excerpt and content across the whole
// archive but orders by date. We use it to find candidates, then rank them here
// so title, category/tags and body matches score differently.
//
// Tiers (highest score wins):
//   1. title   - every query token appears in the title
//   2. tags    - query matches a category name or tag
//   3. body    - query appears anywhere in excerpt or body text
// Exact-phrase matches and recent stories get a bonus on top.

export async function searchStories(
  query: string,
  limit = 20
): Promise<Story[]> {
  const q = query.trim();
  if (!q) return [];

  const tokens = q
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  const posts = await fetchWP<WPPost[]>(
    `/posts?_fields=${POST_FIELDS}&per_page=50&search=${encodeURIComponent(q)}`
  );
  const now = Date.now();
  const DAY = 86400000;

  const scored = posts
    .map((post) => {
      const story = normalizeStory(post);
      const title = story.title.toLowerCase();
      const excerpt = story.excerpt.toLowerCase();
      const body = story.body.toLowerCase();
      const cats = (story.categories || []).join(" ").toLowerCase();
      const tags = (post.tags || []).join(" ").toLowerCase();
      const hayTags = cats + " " + tags;

      let score = 0;
      let tier = 3;

      // Tier 1: title
      if (tokens.every((t) => title.includes(t))) {
        score += 100;
        tier = 1;
        if (title.includes(q.toLowerCase())) score += 25; // exact phrase
      }
      // Tier 2: category / tags
      if (tokens.every((t) => hayTags.includes(t))) {
        score += 50;
        if (tier > 2) tier = 2;
        if (hayTags.includes(q.toLowerCase())) score += 15;
      }
      // Tier 3: excerpt / body
      if (tokens.every((t) => excerpt.includes(t) || body.includes(t))) {
        score += 10;
        if (tier > 3) tier = 3;
      }
      if (score === 0) return null;

      // Recency boost: stories from the last 30 days get up to +20.
      const age = now - new Date(story.publishedAt).getTime();
      score += age <= 30 * DAY ? 20 : age <= 90 * DAY ? 10 : 0;

      return { story, score, tier };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => b.score - a.score || b.story.publishedAt.localeCompare(a.story.publishedAt))
    .slice(0, limit)
    .map((r) => r.story);

  return scored;
}

// --- Top Stories ---
//
// The CMS has no sticky posts and no custom "featured" field (all post meta is
// Astra layout junk). So top-story selection is an explicit list of slugs in
// this file. Edit TOP_STORY_SLUGS to change the homepage lead; everything else
// falls back to the most recent story.

const TOP_STORY_SLUGS: string[] = [
  // e.g. "impunity-threatens-press-freedom"
];

export async function getTopStories(limit = 4): Promise<Story[]> {
  const wanted = TOP_STORY_SLUGS.slice(0, limit);
  if (wanted.length === 0) return [];

  const stories = await Promise.all(wanted.map((slug) => getStoryBySlug(slug)));
  return stories
    .filter((s): s is Story => s !== null)
    .slice(0, limit);
}

export async function getLeadStory(): Promise<Story | null> {
  const [top] = await getTopStories(1);
  if (top) return top;
  const [latest] = await getLatestStories(1);
  return latest || null;
}

// --- Helpers ---

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ",
  hellip: "…", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”",
  ndash: "–", mdash: "—",
};

export function decodeEntities(text: string): string {
  if (!text) return "";
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, ent: string) => {
    if (ent[0] === "#") {
      const hex = ent[1].toLowerCase() === "x";
      const code = parseInt(ent.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return NAMED_ENTITIES[ent.toLowerCase()] ?? m;
  });
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanExcerpt(html: string, byline: string | null): string {
  let text = decodeEntities(stripHtml(html)).replace(/\s+/g, " ").trim();
  text = text.replace(/\s*\[(?:…|\.\.\.)\]\s*$/, "…");
  if (byline) {
    text = text.replace(new RegExp(`^by\\s+${escapeRegExp(byline)}\\s*`, "i"), "");
  }
  return text;
}

function imageKey(src: string): string {
  return rewriteImageUrl(src)
    .split("?")[0]
    .replace(/-\d+x\d+(?=\.\w+$)/, "")
    .replace(/-scaled(?=\.\w+$)/, "")
    .toLowerCase();
}

// Drop the body's first image when it is the featured image already shown above it.
function removeLeadImage(body: string, featured: string): string {
  const img = body.match(/<img\b[^>]*?src=(?:["']([^"']+)["']|([^\s>]+))[^>]*>/i);
  if (!img || img.index === undefined) return body;
  if (imageKey(img[1] || img[2]) !== imageKey(featured)) return body;
  const figure = /<figure\b[^>]*>[\s\S]*?<\/figure>/gi;
  let f: RegExpExecArray | null;
  while ((f = figure.exec(body))) {
    if (f.index > img.index) break;
    if (img.index < f.index + f[0].length) {
      return body.slice(0, f.index) + body.slice(f.index + f[0].length);
    }
  }
  return body.slice(0, img.index) + body.slice(img.index + img[0].length);
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

// WP `date` fields are naive local times in the site's zone (Africa/Lagos, UTC+1).
export function wpDate(dateStr: string): Date {
  return new Date(/Z$|[+-]\d\d:?\d\d$/.test(dateStr) ? dateStr : `${dateStr}+01:00`);
}

export function formatDate(dateStr: string): string {
  return wpDate(dateStr).toLocaleDateString("en-US", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** "Today · 9:13 AM" for today's stories, "Nov 16 · 8:16 AM" otherwise (Lagos time). */
export function formatStamp(dateStr: string): string {
  const opts = { timeZone: "Africa/Lagos" } as const;
  const d = wpDate(dateStr);
  const day = d.toLocaleDateString("en-US", { ...opts, month: "short", day: "numeric" });
  const today = new Date().toLocaleDateString("en-US", { ...opts, month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { ...opts, hour: "numeric", minute: "2-digit" });
  return `${day === today ? "Today" : day} · ${time}`;
}

export function rewriteImageUrl(url: string): string {
  if (!url) return "";
  return url.replace(/^https?:\/\/unilagnews\.com/, "");
}

export function rewriteContentHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/https?:\/\/unilagnews\.com\/wp-content\//g, "/wp-content/")
    .replace(/https?:\/\/unilagnews\.com\/\?p=\d+/g, "/")
    .replace(
      /https?:\/\/unilagnews\.com\/category\/([^"'<>\s]+)/g,
      (_, path: string) => `/category/${path.split("/").filter(Boolean).pop() ?? ""}`
    )
    .replace(/https?:\/\/unilagnews\.com\/([^\s"'<>\\/]+)\/$/g, "/$1")
    .replace(/https?:\/\/unilagnews\.com\/([^\s"'<>]+)/g, "/$1")
    .replace(/https?:\/\/unilagnews\.com\//g, "/");
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function authorSlugFromLink(link: string): string {
  if (!link) return "";
  const parts = link.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

/**
 * Extract the contributor byline from the first paragraph of a post body.
 *
 * The CMS has no contributor user records and no author taxonomy — the
 * WordPress author field on every post is the generic "Editor" account. The
 * real writer is recorded as a byline at the top of the article body, e.g.
 *   <p>By <strong>Deborah Adeko-Jinadu</strong></p>
 * or
 *   <p>by <strong>Joseph Faluyi</strong> </p>
 *
 * This is the same source the live site's "About The Author" box reads. We
 * pull it out here so it can drive author pages and bylines on the frontend.
 * Returns null when no byline is present (most older posts).
 */
export function extractByline(html: string): string | null {
  if (!html) return null;
  const m = html.match(
    /<p[^>]*>\s*(?:by|By|BY)\s*<strong>([^<]+)<\/strong>\s*<\/p>/i
  );
  if (!m) return null;
  const name = m[1].replace(/\s+/g, " ").trim();
  return name || null;
}

/**
 * Pull the first image out of a post body when no featured image is set.
 *
 * Many posts — especially essays and long-form pieces — have an inline
 * `<figure><img>` at the top of the body but no featured image assigned in
 * the CMS. Without this fallback those posts show a blank placeholder in
 * every card and grid. Returns null when the body has no usable image.
 */
export function extractFirstImage(html: string): string | null {
  if (!html) return null;
  // Match src in double quotes, single quotes, or unquoted
  const m = html.match(/<img\s+[^>]*?src=(?:["']([^"']+)["']|([^\s>]+))/i);
  return m ? m[1] || m[2] : null;
}

// --- Byline-based authors ---
//
// Authors are derived from the byline text found in post bodies, not from the
// WordPress users table (which only has the generic "Editor" account). This is
// the same identity the live site uses in its "About The Author" boxes.

export async function getAuthorsFromBylines(): Promise<Author[]> {
  const posts = await getRawPosts(100);
  const bySlug = new Map<string, Author>();
  for (const post of posts) {
    const byline = extractByline(post.content.rendered);
    if (!byline) continue;
    const slug = toSlug(byline);
    if (!slug) continue;
    const existing = bySlug.get(slug);
    if (!existing) {
      bySlug.set(slug, {
        id: 0,
        name: byline,
        slug,
        bio: "",
        avatar: null,
        storyCount: 0,
      });
    }
  }
  return Array.from(bySlug.values());
}

// Bylines live in the post body, so WP full-text search on the name finds a
// writer's posts anywhere in the archive, not just the latest 100.
async function searchBylinePosts(slug: string): Promise<WPPost[]> {
  const words = slug.split("-").filter(Boolean).join(" ");
  if (!words) return [];
  const posts = await fetchWP<WPPost[]>(
    `/posts?_fields=${POST_FIELDS}&per_page=100&search=${encodeURIComponent(words)}`
  );
  return posts.filter((p) => {
    const b = extractByline(p.content.rendered);
    return b !== null && toSlug(b) === slug;
  });
}

export async function getAuthorByBylineSlug(
  slug: string
): Promise<{ author: Author; stories: Story[] } | null> {
  const posts = await searchBylinePosts(slug);
  if (posts.length === 0) return null;
  const name = extractByline(posts[0].content.rendered) ?? slug;
  return {
    author: { id: 0, name, slug, bio: "", avatar: null, storyCount: posts.length },
    stories: posts.map(normalizeStory),
  };
}

export async function getStoriesByByline(
  byline: string,
  limit = 20
): Promise<Story[]> {
  const posts = await searchBylinePosts(toSlug(byline));
  return posts.slice(0, limit).map(normalizeStory);
}

export async function getAuthorStoryCountsFromBylines(): Promise<
  Record<string, number>
> {
  const posts = await getRawPosts(100);
  const counts: Record<string, number> = {};
  for (const post of posts) {
    const byline = extractByline(post.content.rendered);
    if (!byline) continue;
    const slug = toSlug(byline);
    if (slug) counts[slug] = (counts[slug] || 0) + 1;
  }
  return counts;
}