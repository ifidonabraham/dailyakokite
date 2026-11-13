# Daily Akokite — Version 1 (Initial Design Initiative)

**The student newspaper of the University of Lagos.**

Daily Akokite is the official student newspaper of the University of Lagos, produced by **The Press Club, UNILAG**. Established in 2003, the Press Club has trained generations of campus journalists. Daily Akokite carries that legacy forward as an independent, student-run editorial outlet committed to informing, challenging, and amplifying the voices of the Akoka community.

This repository is **Version 1 — the initial design initiative**. It is a living project, and suggestions are welcome.

> **Note:** This project is produced in collaboration with The Press Club, University of Lagos. It is not solely a personal project.

---

## Live

- **Preview / Production:** https://dailyakokite.vercel.app
- **Source:** https://github.com/ifidonabraham/dailyakokite

---

## What was done

This is a migration of the existing Daily Akokite WordPress site to a modern, static-first Next.js application. The goal was to remove all dependency on the legacy WordPress server for rendering, while keeping the content pipeline connected to the same CMS.

- **Content stays live.** All stories, pages, categories, and media are pulled from the WordPress REST API at runtime. The site updates automatically as the CMS changes — no manual copy-paste.
- **No WordPress links in the rendered output.** Every `unilagnews.com` URL (in article bodies, links, images, canonical URLs, and metadata) is rewritten to a local path. The rendered HTML contains zero references to the WordPress domain.
- **Editorial design system.** A custom layout built on Tailwind CSS with a defined color palette (Beacon Blue, Editorial Black), a reading column constraint, and a consistent masthead, navigation, and footer.
- **Branded identity.** The official Daily Akokite wordmark and The Press Club, University of Lagos logo are embedded in the masthead and footer.
- **Section fronts.** Homepage carries a category ribbon plus Top Stories, Latest, Features, and Opinion sections. The Newspaper page presents an editorial list with small category labels.
- **Article pages.** Dynamic routes with story-type labels, bylines, dates, featured images, sanitized article bodies, and related stories.

---

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + PostCSS |
| Fonts | Playfair Display (headlines), Merriweather (body), Inter (UI) |
| CMS | WordPress REST API (`https://unilagnews.com/wp-json/wp/v2`) |
| Hosting | Vercel (zero-config production deploys) |

### Architecture notes

- **Content contract** (`src/lib/data.ts`): A normalized `Story` type decouples the frontend from WordPress internals. WordPress raw posts are fetched and normalized into a stable contract, so the UI can be redesigned without touching the CMS layer.
- **HTML rewriting:** `rewriteContentHtml` strips the WordPress domain from article bodies, image URLs, and canonical URLs before they reach the browser.
- **Sanitization:** Article bodies are sanitized before rendering (`ArticleBody.tsx`) — scripts, iframes, and inline event handlers are removed.
- **Static generation:** Homepage, About, Contact, and Newspaper are statically generated with a 5-minute revalidation window. Article pages are server-rendered on demand.

---

## Project structure

```
src/
  app/
    page.tsx              # Homepage
    newspaper/page.tsx     # Newspaper archive
    about/page.tsx         # About page
    contact/page.tsx       # Contact page
    [...slug]/page.tsx     # Dynamic article pages
    layout.tsx             # Root layout + metadata
    globals.css            # Design tokens and editorial rules
  components/
    Header.tsx, Masthead.tsx, PrimaryNavigation.tsx
    Footer.tsx, ArticleCard.tsx, ArticleBody.tsx
    StoryHeader.tsx, RelatedStories.tsx
  lib/
    data.ts               # Normalized story contract + helpers
    wordpress.ts           # Raw WordPress API client
  types/wp.ts             # WordPress content types
public/                   # Logos and static assets
```

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Syncing content from WordPress

The sync script is kept out of the public repository because it contains development-only tooling. To refresh the local content cache, run:

```bash
npm run sync
```

---

## Deployment

This project is deployed automatically to Vercel. Pushing to `develop` triggers a preview deploy; promoting to production is done via `vercel deploy --prod`.

---

## Contributing

This is Version 1 of the design initiative. We welcome suggestions, corrections, and story pitches. Please open an issue or reach out through The Press Club.

*The Press Club, University of Lagos — Est. 2003*