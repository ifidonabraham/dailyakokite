import type { WPPost, WPPage, Story, PageContent, WPAuthor, Author } from "@/types/wp";

const WP_API_URL = "https://unilagnews.com/wp-json/wp/v2";

async function fetchWP<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${WP_API_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
  return res.json();
}

// --- Raw WordPress fetchers (CMS layer) ---

export async function getRawPosts(perPage = 100): Promise<WPPost[]> {
  return fetchWP(`/posts?_embed&per_page=${perPage}`);
}

export async function getRawPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>(`/posts?_embed&slug=${encodeURIComponent(slug)}`);
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
  { id: number; name: string; slug: string }[]
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
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    body: rewriteContentHtml(post.content.rendered),
    storyType: storyTypeFor(post),
    category: primary,
    categories: cats,
    author: post.author_info?.display_name || "Daily Akokite",
    authorId: post.author_info?.id || 0,
    authorSlug: authorSlugFromLink(post.author_info?.author_link || ""),
    publishedAt: post.date,
    updatedAt: post.modified,
    featuredImage: image ? rewriteImageUrl(image) : null,
    featuredImageAlt: post.title.rendered,
    canonicalUrl: post.link ? rewriteContentHtml(post.link) : "",
    status: post.status,
    format: post.format || "standard",
  };
}

export function normalizePage(page: WPPage): PageContent {
  return {
    slug: page.slug,
    title: page.title.rendered,
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
  const posts = await getRawPosts(limit);
  return posts
    .filter((p) => (p.categories || []).includes(Number(slug)))
    .map(normalizeStory);
}

export async function getPageContent(
  slug: string
): Promise<PageContent | null> {
  const page = await getRawPageBySlug(slug);
  return page ? normalizePage(page) : null;
}

export async function getAllCategories(): Promise<
  { id: number; name: string; slug: string }[]
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

// --- Helpers ---

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
    .replace(/https?:\/\/unilagnews\.com\/category\/[^"'<> ]+/g, "/")
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