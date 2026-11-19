import type { MetadataRoute } from "next";
import { getAllCategories, getLatestStories, wpDate } from "@/lib/data";

const SITE_URL = "https://dailyakokite.vercel.app";
const HIDDEN_CATEGORIES = new Set(["uncategorized", "about-us"]);

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, stories] = await Promise.all([
    getAllCategories().catch(() => []),
    getLatestStories(100).catch(() => []),
  ]);

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE_URL}/newspaper`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const sections: MetadataRoute.Sitemap = categories
    .filter((c) => c.count > 0 && !HIDDEN_CATEGORIES.has(c.slug))
    .map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      changeFrequency: "daily",
      priority: 0.7,
    }));

  const articles: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: wpDate(s.updatedAt || s.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...pages, ...sections, ...articles];
}
