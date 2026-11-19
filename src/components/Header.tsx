import Masthead from "./Masthead";
import PrimaryNavigation from "./PrimaryNavigation";
import { getAllCategories } from "@/lib/data";

// "uncategorized" is relabelled "News" in WP and would duplicate the real News.
const HIDDEN_CATEGORIES = new Set(["uncategorized", "about-us"]);

export default async function Header() {
  const all = await getAllCategories().catch(() => []);
  const categories = all
    .filter((c) => c.count > 0 && !HIDDEN_CATEGORIES.has(c.slug))
    .sort((a, b) => b.count - a.count)
    .map(({ name, slug }) => ({ name, slug }));

  return (
    <header className="bg-white" role="banner">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Masthead />
      <PrimaryNavigation categories={categories} />
    </header>
  );
}
