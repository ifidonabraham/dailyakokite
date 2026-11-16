const WP_API_URL = "https://unilagnews.com/wp-json/wp/v2";

export async function fetchWP(endpoint: string) {
  const res = await fetch(`${WP_API_URL}${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch from WordPress");
  return res.json();
}

export async function getPosts() {
  return fetchWP("/posts?_embed");
}

export async function getPages() {
  return fetchWP("/pages");
}

export async function getCategories() {
  return fetchWP("/categories");
}

export async function getAuthors() {
  return fetchWP("/users?per_page=100");
}

export async function getAuthorBySlug(slug: string) {
  return fetchWP(`/users?slug=${encodeURIComponent(slug)}`);
}