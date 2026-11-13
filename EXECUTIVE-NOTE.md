# Daily Akokite — Executive Note (Version 1 — Initial Design Initiative)

## Overview

The Daily Akokite website has been migrated from its legacy WordPress setup to a modern, static-first Next.js application. The work was done in collaboration with The Press Club, University of Lagos.

**Live site:** https://dailyakokite.vercel.app
**Source code:** https://github.com/ifidonabraham/dailyakokite

This is Version 1 — the initial design initiative. It is a starting point, not a finished product. I will keep working to improve the design and the frontend, and I welcome your feedback and suggestions.

## What was delivered

1. **Content stays live.** All stories, pages, categories, and media are pulled directly from the WordPress REST API at runtime. The site updates automatically whenever the CMS changes — there is no manual copy-paste, and no risk of the site going stale.

2. **No WordPress links in the rendered output.** Every reference to the legacy WordPress server — in article bodies, navigation links, images, canonical URLs, and metadata — has been rewritten to local paths. The rendered HTML contains zero references to the WordPress domain. Nothing about this is hidden: contributors can see exactly how the platform works in `src/lib/data.ts` and `src/lib/wordpress.ts`.

3. **Editorial design system.** A custom layout built on Tailwind CSS with a defined palette (Beacon Blue, Editorial Black), a reading column constraint, and a consistent masthead, navigation, and footer. The official Daily Akokite wordmark and The Press Club logo are now embedded in the masthead and footer.

4. **Section fronts.** The homepage carries a category ribbon plus Top Stories, Latest, Features, and Opinion sections. The Newspaper page presents an editorial list with small category labels — no oversized images.

5. **Article pages.** Dynamic routes with story-type labels, bylines, dates, featured images, sanitized article bodies, and related stories.

## Technical notes

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS
- **CMS:** WordPress REST API — the frontend is decoupled from WordPress internals through a normalized content contract, so the UI can be redesigned without touching the CMS layer
- **Rendering:** Static generation with 5-minute revalidation for the homepage, newspaper, about, and contact pages; article pages are server-rendered on demand
- **Hosting:** Vercel — zero-config production deploys, pushing to the `develop` branch triggers a preview

## What is next

- Category-based archive pages (News, Opinion, Features, Sports, etc.)
- Search functionality
- Author and topic pages
- Newsletter / submissions flow for student contributors
- Accessibility and performance hardening

## A note on ownership

This project is produced in collaboration with The Press Club, University of Lagos. It is not solely a personal project. The Press Club owns the editorial voice, the brand assets, and the content; the codebase is the delivery mechanism.

## Suggestions welcome

As this is Version 1 of an initial design initiative, I am actively accepting suggestions — on layout, navigation, content strategy, or anything else you think should be different. Please reach out through The Press Club or open an issue on the repository.

*The Press Club, University of Lagos — Est. 2003*