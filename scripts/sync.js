const fs = require("fs");
const path = require("path");

const WP_API_URL = "https://unilagnews.com/wp-json/wp/v2";

async function fetchWP(endpoint) {
  const res = await fetch(`${WP_API_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
  return res.json();
}

async function syncPosts() {
  const posts = await fetchWP("/posts?per_page=100&_embed");
  const dir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "posts.json"), JSON.stringify(posts, null, 2));
  console.log(`Synced ${posts.length} posts`);
}

async function syncPages() {
  const pages = await fetchWP("/pages?per_page=50");
  const dir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "pages.json"), JSON.stringify(pages, null, 2));
  console.log(`Synced ${pages.length} pages`);
}

async function syncCategories() {
  const categories = await fetchWP("/categories?per_page=100");
  const dir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "categories.json"), JSON.stringify(categories, null, 2));
  console.log(`Synced ${categories.length} categories`);
}

async function sync() {
  try {
    await Promise.all([syncPosts(), syncPages(), syncCategories()]);
    console.log("Sync complete!");
  } catch (err) {
    console.error("Sync failed:", err.message);
  }
}

sync();