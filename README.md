# Daily Akokite — Version 1 (Initial Design Initiative)

**The student newspaper of the University of Lagos.**

Daily Akokite is the official student newspaper of the University of Lagos, produced by **The Press Club, UNILAG**. Established in 2003, the Press Club has trained generations of campus journalists. Daily Akokite carries that legacy forward as an independent, student-run editorial outlet committed to informing, challenging, and amplifying the voices of the Akoka community.

This repository is **Version 1 — the initial design initiative**. It is a starting point, not a finished product. I will keep working to improve the design and the frontend, and I welcome suggestions from anyone who wants to help.

>

---

## Live

- **Preview / Production:** https://dailyakokite.vercel.app
- **Source:** https://github.com/ifidonabraham/dailyakokite

---

## Design direction

The editorial design is based on the visual language of major news organisations — specifically **The Wall Street Journal**, **Bloomberg**, and **Semafor**. The goal was to borrow their discipline without copying their branding.

What was taken from those references:

- **A restrained masthead.** Wordmark at the top left, publication attribution and founding date at the top right, a thin rule underneath. No heavy bars, no dropdowns on the homepage.
- **Small uppercase category labels.** Categories appear in small, uppercase, tracked-out text above headlines — never as large badges. This is the WSJ/Bloomberg convention and it keeps the page scannable.
- **A category ribbon.** The homepage carries a horizontal strip of section names under the masthead, so readers can jump straight into a section.
- **A strict typographic hierarchy.** Playfair Display for headlines, Merriweather for body, Inter for all UI, labels, and metadata. Three type families, no more.
- **Consistent image framing.** Images sit in a bordered frame with a fixed aspect ratio, so the layout does not shift as different stories load.
- **A reading column constraint.** Body text is capped at a comfortable reading width on every page.

The palette is the publication's own: Beacon Blue (#0157FF) for links and category labels, Editorial Black (#121619) for text, with a warm off-white page background.

## What was done

This is a migration of the existing Daily Akokite WordPress site to a modern, static-first Next.js application. The goal was to remove all dependency on the legacy WordPress server for rendering, while keeping the content pipeline connected to the same CMS.

- **Content stays live.** All stories, pages, categories, and media are pulled from the WordPress REST API at runtime. The site updates automatically as the CMS changes — no manual copy-paste.
- **No WordPress links in the rendered output.** Every `unilagnews.com` URL (in article bodies, links, images, canonical URLs, and metadata) is rewritten to a local path. The rendered HTML contains zero references to the WordPress domain.
- **Editorial design system.** A custom layout built on Tailwind CSS with a defined color palette (Beacon Blue, Editorial Black), a reading column constraint, and a consistent masthead, navigation, and footer.
- **Branded identity.** The official Daily Akokite wordmark and The Press Club, University of Lagos logo are embedded in the masthead and footer.
- **Section fronts.** Homepage carries a category ribbon plus Top Stories, Latest, Features, and Opinion sections. The Newspaper page presents an editorial list with small category labels.
- **Search.** A `/search` route with a three-tier ranking algorithm — title matches rank above category/tag matches, which rank above excerpt/body matches, with a recency boost for stories from the last 30 days. Query is passed in the URL (`/search?q=…`) so results are shareable and indexable.
- **Top Stories.** The homepage lead and secondary cluster are driven by an explicit slug list (`TOP_STORY_SLUGS` in `src/lib/data.ts`), because the CMS has no sticky posts and no featured custom field. The list is empty by default, so the page falls back to the most recent stories until someone picks the lead.
- **Article pages.** Dynamic routes with story-type labels, bylines, dates, featured images, sanitized article bodies, and related stories. The byline links to the author's page, matching the live site's "see author's posts" pattern.
- **NYT/Semafor layout.** Byline sits below the article body rather than above the image. A share bar (Share, Twitter, Facebook, Email, WhatsApp) sits beside it. Category and story-type labels in the byline line link to category archives.
- **Category archives.** A `/category/[slug]` route shows every story filed under a category, so the category ribbon and byline links have somewhere to go.
- **NYT-style menu button.** The navigation carries a boxed hamburger icon that opens the full section list on mobile.
- **Authors from bylines.** The CMS has no contributor user records — every post is filed under the generic "Editor" account. The real writer is recorded as a byline at the top of the article body (`By <strong>Name</strong>`), the same source the live site's "About The Author" box reads. `extractByline()` pulls it out and the Authors listing and detail pages are derived from it, so contributors appear as they publish instead of waiting for user accounts to be created.

### How the platform works (for contributors)

Nothing about the WordPress connection is hidden — contributors need to understand how the content pipeline works.

- **Content contract** (`src/lib/data.ts`): A normalized `Story` type decouples the frontend from WordPress internals. WordPress raw posts are fetched and normalized into a stable contract, so the UI can be redesigned without touching the CMS layer.
- **Raw WordPress client** (`src/lib/wordpress.ts`): The functions that talk directly to the WordPress REST API. This is the entry point for all content.
- **HTML rewriting:** `rewriteContentHtml` strips the WordPress domain from article bodies, image URLs, and canonical URLs before they reach the browser. This is what removes the WordPress links.
- **Sanitization:** Article bodies are sanitized before rendering (`ArticleBody.tsx`) — scripts, iframes, and inline event handlers are removed.
- **Static generation:** Homepage, About, Contact, and Newspaper are statically generated with a 5-minute revalidation window. Article pages are server-rendered on demand.

---

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + PostCSS |
| Fonts | Playfair Display (headlines), Merriweather (body), Inter (UI) |
| CMS | WordPress REST API (`https://unilagnews.com/wp-json/wp/v2`) |
| Hosting | Vercel (zero-config production deploys) |

---

## Project structure

```
src/
  app/
    page.tsx              # Homepage
    search/page.tsx        # Search results
    category/[slug]/page.tsx  # Category archive
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

---

## Deployment

This project is deployed automatically to Vercel. Pushing to `develop` triggers a preview deploy; promoting to production is done via `vercel deploy --prod`.

---

## Contributing

This is Version 1 of an initial design initiative. I am actively working to improve the design and the frontend, and I welcome suggestions — on layout, navigation, content strategy, or anything else. Please open an issue or reach out through The Press Club.

*The Press Club, University of Lagos — Est. 2003*
