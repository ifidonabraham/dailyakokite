# Message draft — for the executive (The Press Club, UNILAG)

---

## Short version

The Daily Akokite website has been moved off the legacy WordPress server and onto a modern Next.js site. Content still comes from the same CMS, so it stays live, but the site no longer depends on the old server and carries no links back to it.

**Live site:** https://dailyakokite.vercel.app
**Source code:** https://github.com/ifidonabraham/dailyakokite

This is Version 1 of the initial design initiative. I am happy to walk through it or take on any changes you would like.

---

## Longer version

Dear members of The Press Club,

I want to share where the Daily Akokite website stands and what I have done so far.

The site has been migrated from the legacy WordPress setup to a modern, static-first Next.js application. The main goal was to remove the dependency on the old WordPress server while keeping the content pipeline connected to the same CMS.

**What this means in practice:**

- All stories, pages, categories, and images are pulled live from the WordPress REST API. The site updates automatically whenever content changes in the CMS — there is no manual copy-paste, and no risk of the site going stale.
- Every link back to the WordPress server has been removed from the rendered output. Article bodies, navigation, images, canonical URLs, and metadata all point to local paths now. The published HTML contains zero references to the old domain.
- The editorial design is based on the visual language of major news organisations — The Wall Street Journal, Bloomberg, and Semafor. I borrowed their discipline (restrained masthead, small uppercase category labels, a category ribbon, consistent image framing, a reading column constraint) without copying their branding. The palette is the publication's own: Beacon Blue and Editorial Black.
- The official Daily Akokite wordmark and The Press Club logo are now embedded in the masthead and footer.
- The homepage carries a category ribbon plus Top Stories, Latest, Features, and Opinion sections. The Newspaper page presents an editorial list with small category labels rather than oversized images.
- Article pages carry story-type labels, bylines, dates, featured images, and related stories. Article bodies are sanitized before they reach the browser.

**On the technical side:**

- Next.js with a normalized content contract, so the frontend is decoupled from WordPress internals and can be redesigned without touching the CMS layer.
- Static generation for the main pages with a short revalidation window; article pages are rendered on demand.
- Hosted on Vercel, so pushing to the repository triggers a preview deploy and a production deploy with no manual steps.

**Where things stand and what is next:**

This is Version 1 — the initial design initiative. It is a starting point, not a finished product. I am actively working to improve the design and the frontend, and I welcome suggestions on layout, navigation, content strategy, or anything else you think should be different. Planned next steps include category-based archive pages, search, author and topic pages, and a submissions flow for student contributors.

Please take a look at the live site and let me know what you think. I am happy to walk anyone through it.

With thanks,

[Name]
The Press Club, University of Lagos — Est. 2003