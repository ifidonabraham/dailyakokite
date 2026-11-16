---
name: daily-akokite-editorial-ui-ux
version: 1.0.0
status: project-development-skill
scope: Daily Akokite public news website
---

# DAILY AKOKITE
## Editorial UI/UX and Frontend Development Skill

**Purpose:** Persistent design and implementation standard for designers and AI coding agents developing the Daily Akokite public news website. Read before making design or frontend changes. Repository code, verified content, and explicit project-owner decisions remain the source of truth for implementation details.

# 1. Identity and mission

- **Publication:** Daily Akokite
- **Parent organization:** The Press Club, University of Lagos
- **Community:** University of Lagos / Akoka
- **Product:** Public digital news and editorial publication
- **Starting point:** An existing Next.js application populated with content collected using a web scraper.
- **Immediate priority:** Build the public Daily Akokite news website.

Daily Akokite is the official new name of the existing UNILAG News publication. It is not merely a proposed design concept.

The supplied June 2025 visual identity describes Daily Akokite as a modern campus media brand built to inform, challenge, and amplify the voices of the Akoka community. Its ambition is to publish timely stories, critical insights, and bold commentary that reflect the pulse of UNILAG.

**Mission:** Create a distinctive, credible, digital-first campus publication with the editorial confidence of a serious newsroom and the cultural awareness of a publication rooted in university life.

The website should make reporting easy to discover, articles rewarding to read, different journalism formats visually appropriate, and the publication's identity recognizable. It must work exceptionally well on mobile and desktop, remain maintainable, and treat journalism, attribution, dates, corrections, and imagery responsibly.

**Governing principle: Editorial design must serve the journalism.** A page is not successful merely because it looks dramatic in a screenshot. It must clarify the story, strengthen hierarchy, support reading, respect content, and work with real devices and real article lengths.

# 2. Locked project decisions

1. Daily Akokite is the official new name of UNILAG News.
2. The immediate priority is the public Daily Akokite website.
3. The existing Next.js app containing scraped content is the starting point.
4. The public website uses a template-first editorial architecture.
5. The CMS manages stories and structured content; the template system determines presentation.
6. Article formats have distinct, controlled templates.
7. Reusable content blocks provide flexibility inside those templates.
8. The public frontend remains CMS-agnostic.
9. Payload and Sanity have not been finally selected. Do not hardwire the UI to either.
10. The preferred longer-term direction is a native custom newsroom experience with a CMS engine behind it. This is not implemented and is not authorization to build the newsroom now.
11. The Press Club organizational website, Daily Akokite, and club management web app remain separate products.
12. Use the supplied Daily Akokite identity as the starting point.
13. Motion should be expressive and purposeful, never generic decoration.
14. Real scraped content is an existing asset to inspect and preserve, not replace with invented sample articles.

A later explicit owner decision may change these. Update the decision record and affected sections; do not reinterpret a casual suggestion as a confirmed change.

# 3. Brand identity

The authoritative starting reference is **Daily Akokite Visual Identity Design, June 2025**.

## 3.1 Colors

| Name | Value | Role |
|---|---|---|
| Beacon Blue | `#0157FF` | Primary brand blue |
| Editorial Black | `#121619` | Deep text / dark surfaces |
| Quiet Steel | `#B1B7C1` | Supporting neutral |
| White | `#FFFFFF` | Light surface |

Build semantic tokens around these values, such as brand, ink, muted, paper, border, surface, focus, link, and state colors. Fit the existing project's styling approach; do not introduce a competing token system.

Beacon Blue is an identity accent for links, selected states, section markers, and selected calls to action. Do not make every background, button, or surface blue. Check contrast, especially when Quiet Steel is used for text. Do not add accents without a defined role. Gradients are not a default.

## 3.2 Typography

The identity document shows **Vogue** as its typeface reference. Treat this as a brand reference to investigate, not proof that a font file is available, licensed, or appropriate for every digital role.

Inspect the repository's font setup and assets. Confirm exact font identity, availability, licensing, language support, web-use rights, weight availability, fallback, and performance. Test with real Daily Akokite headlines, long titles, body copy, captions, and navigation. If needed, pair a display face with a highly readable body face.

Define roles for:
- Masthead / wordmark.
- Display headline.
- Homepage lead headline.
- Standard story headline.
- Feature headline.
- Section heading.
- Article deck / standfirst.
- Article body.
- Byline and metadata.
- Caption and credit.
- Navigation and utility labels.

Use scale, weight, width, spacing, and line length to create hierarchy. Test long headlines. Avoid clipping, excessive font families, decorative body fonts, and typography that is fashionable but hard to read. Do not turn every heading into uppercase.

## 3.3 Logo and motif

Use official logo and wordmark assets if present. Inspect their geometry before deriving motifs. The identity's stated values include voice, vigilance, daily awakening, unity, continuity, consistency, and community.

Potential restrained applications: section markers, story numbers, dividers, labels, special-edition framing, and subtle motion transitions. Do not distort the official mark, invent a new wordmark, or use a low-quality screenshot when a clean asset exists.

## 3.4 Brand voice

The interface should feel alert, observant, informed, curious, independent, connected to student life, and serious about journalism without becoming stiff. Avoid campus clichés such as random graduation caps, generic crests, stock students pointing at laptops, and decorative academic icons.

# 4. Product boundaries

Daily Akokite is the **public editorial publication**.

- **Press Club organizational website:** represents the society, its mission, people, activities, and recruitment. Separate product; not the current implementation target.
- **Club management web app:** supports operational workflows such as membership, dues, events, attendance, elections, and administration. Separate product.
- **Newsroom:** editorial workspace for contributors, reporters, editors, and publishing administrators. Separate from the public reader interface. The preferred longer-term direction is a native newsroom UI backed by a CMS engine, but it is not part of the immediate public-site build unless explicitly requested.

Do not merge their navigation, visual patterns, permissions, or information architecture simply because they share an organizational relationship.

# 5. Existing Next.js app and scraped archive: inspect first

The project owner has already used a web scraper to collect publication content into a Next.js application. This is a valuable starting asset.

**Do not assume the app is empty, the scrape is complete, or the data is correct. Do not replace the existing homepage with hardcoded demo content before auditing it.**

## 5.1 Repository audit

Inspect:
- Project structure, routes, layouts, components, and styles.
- `package.json`, scripts, framework version, and dependencies.
- App Router or Pages Router.
- Fonts, logos, icons, and media assets.
- Scraped content format and storage location.
- Actual fields for stories, categories, tags, authors, dates, slugs, images, excerpts, and body content.
- Existing content rendering.
- APIs, database, services, or CMS connections.
- Image optimization, asset paths, and route behavior.
- Existing build, lint, and type-check status.
- Current responsive behavior and interactions.

Do not assume folder names, schemas, or framework versions. Discover them.

## 5.2 Content inventory and integrity

Create an inventory of fields that actually exist:
- Original URL and local slug/identifier.
- Title, excerpt, body.
- Author and original attribution.
- Category and tags.
- Original publication date and update date, if present.
- Featured and inline images.
- Captions and credits.
- Embedded media and related links.
- Source metadata.

Identify duplicates, missing fields, broken images, inconsistent dates, malformed markup, empty or truncated bodies, conflicting slugs, missing authors, unsupported embeds, and external links that may no longer work.

Do not silently repair journalistic facts. Technical cleanup may normalize markup and formatting, but must not alter reporting meaning.

## 5.3 Preserve publication history

Treat scraped content as historical publication material:
- Preserve article text, authorship, original dates, image relationships, captions, credits, and category relationships where available.
- Preserve original slugs and URLs where possible.
- Map old URLs to new URLs when routes change.
- Do not discard older articles because they do not fit the new homepage.
- Do not fabricate missing metadata.
- Do not mistake scrape/import timestamps for original publication dates.
- Identify content needing editorial verification.

Design for real archive irregularities: long titles, missing images, short and very long stories, old formatting, and inconsistent metadata.

## 5.4 Safe rendering

Scraped HTML is untrusted:
- Inspect markup before rendering.
- Sanitize HTML if HTML rendering is required.
- Prefer structured rendering where practical.
- Never use unsafe HTML injection without a verified sanitization strategy.
- Validate and constrain external links.
- Do not allow scraped markup to override site styles or execute scripts.
- Provide robust fallbacks for malformed content and media.

Development fixtures must be clearly identified and separate from production content. Never invent articles, quotes, authors, dates, event images, captions, credits, statistics, reader counts, trending scores, or newsroom activity.

# 6. Template-first editorial architecture

This is a locked principle.

**The CMS manages the story. The template system determines how the story is presented.**

A story contains editorial metadata, a story type, structured content, media and attribution, and publication state/dates. The renderer uses story type and approved content structure to select the visual presentation.

## 6.1 Three layers

### A. Content / CMS layer
Responsible for story records, titles, summaries, authors, categories, tags, dates, publication state, structured body content, media and credits, corrections, updates, slugs, and canonical URLs.

### B. Editorial template and block renderer
Responsible for mapping story types to approved templates, rendering allowed blocks, enforcing hierarchy, presenting metadata and media consistently, handling missing/unsupported blocks safely, and supporting faithful preview.

### C. Public reader website
Responsible for homepage discovery, section browsing, article reading, search and archive, navigation, reader interactions, responsive layout, performance, accessibility, metadata, and SEO.

Keep newsroom/editor dependencies out of the public reader bundle unless genuinely required.

## 6.2 Story type is not a content block

A **story type** determines editorial presentation and reading structure. A **content block** is an approved structured unit that can appear in one or more templates.

Story types:
- Standard news.
- Feature / long-form.
- Opinion / commentary.
- Interview / profile.
- Investigative / explanatory.
- Visual / multimedia.

Possible blocks:
- Paragraph.
- Heading.
- Image with caption and credit.
- Pull quote.
- Inline video or audio.
- Related story.
- Data visualization.
- Timeline.
- List.
- Document/source link.
- Photo gallery.

Do not create a new template for every block. Do not allow every block in every template by default.

## 6.3 Initial template library

### Standard news — core
Timely factual reporting. Clear category, direct headline, summary where available, author/date, lead image where available, comfortable body column, section headings, related stories, and corrections/updates when supplied. Focused; no decorative collage or excessive motion.

### Feature / long-form — core
Campus life, human stories, explanatory features, narrative journalism. More expressive opening, strong image or typography-led introduction, flexible article rhythm, pull quotes, image sequences, optional annotations. Expressive but readable.

### Opinion / commentary — core
Clearly identified viewpoints. Strong author attribution, clear opinion label, typography-led composition. Never imply that an opinion is the publication's official position unless approved.

### Interview / profile — core
Conversations, Q&A, profiles. Subject-led portrait/context image, clear subject/interviewer attribution when supplied, obvious speaker distinction, restrained pull quotes, format based on actual content.

### Investigative / explanatory — planned
Potential methodology/context, evidence links, timeline, charts, maps, source notes. Distinguish evidence, interpretation, and illustration. Do not build complex visualizations without real data and editorial need.

### Visual / multimedia — later
Photo essays, video-led stories, audio, visual explainers, special coverage. Potential gallery, captions, transcripts, interactive diagrams, and story-specific scrollytelling. Not permission to animate ordinary articles.

## 6.4 Template contract

Each template defines supported story types, required/optional metadata, allowed blocks, ordering constraints, lead-media behavior, headline/deck hierarchy, body width, caption/credit treatment, related-story behavior, mobile layout, motion, accessibility, missing-data fallbacks, and preview behavior.

Unsupported content must degrade gracefully. Never silently drop important story content.

Test every template with a short story, long story, long headline, missing lead image, multiple images, missing optional metadata, multiple blocks, mobile/desktop, reduced motion, keyboard, and screen-reader use.

Record templates as Proposed, Testing, Approved, or Deprecated.

# 7. Public website information architecture

Confirm actual editorial categories against the scraped archive and the team before finalizing navigation.

## 7.1 Homepage

The homepage is an editorial front page, not a database listing. It should communicate what matters now, what Daily Akokite covers, what is new, which stories deserve deeper reading, and where to find sections.

Potential hierarchy:
1. Masthead.
2. Main navigation and search.
3. Breaking/latest indicator only when genuinely justified.
4. Lead editorial story.
5. Secondary story cluster.
6. Latest reporting feed.
7. Section fronts.
8. Features, opinion, interviews, or special coverage.
9. Archive/discovery links.
10. Footer and publication information.

This is a starting structure, not a requirement to display every module at launch.

Homepage rules:
- Establish a clear lead story.
- Vary compositions: large lead, compact headline lists, image-led modules, text-led briefs, section introductions.
- Do not make every story an identical rounded card.
- Do not give every story equal visual volume.
- Do not call a story breaking because it is recent.
- Do not invent trending rankings or view counts.
- Do not force images into stories without suitable images.
- Do not repeat headlines across sections without reason.
- Make mobile an intentional composition, not a squeezed desktop grid.
- Important news must be discoverable without sign-in or personalization.

## 7.2 Section/category page
Clear title and introduction where available, appropriate lead story, scannable list, supported sorting/pagination, consistent section identity, and useful empty state. Do not invent categories to fill navigation.

## 7.3 Article page
Headline, deck, category/story type, author, original publication date, update date if applicable, lead image/caption/credit if available, template-rendered body, inline links, related stories where relevant, corrections/updates where applicable, and sharing via real URLs.

The article page is a reading environment. Keep its column comfortable. Avoid sticky widgets, floating panels, and promotions that interrupt reading.

## 7.4 Search
Clear input and real submit behavior, useful result metadata, URL query state where practical, helpful empty and error states. Do not show fake counts or pretend search works before implementation.

## 7.5 Archives
Chronological browsing, date navigation only if supported by data, clear pagination/progressive loading, preserved original publication dates. Never confuse publication date with import date.

## 7.6 Author pages
Use only approved author information and verified published work. Do not invent credentials, biographies, roles, or portraits.

## 7.7 About, contact, policies, corrections
Prioritize clarity and trust. Use only approved publication details. Do not invent policies, contact addresses, legal claims, or confidentiality promises.

# 8. Editorial visual language and aesthetic toolkit

Combine a strong structural foundation with controlled expressive variation. Each aesthetic has a job; do not apply every style to every page.

## Swiss / International Typographic Style — structural foundation
Use for grids, alignment, spacing, navigation, section fronts, metadata, and archives. Use strong alignment, intentional asymmetry, clear hierarchy, negative space, and modular layouts. Swiss structure need not make every page sterile.

## Editorial / newspaper design — primary language
Use for homepage hierarchy, lead stories, section fronts, article layouts, bylines, captions, pull quotes, and related coverage. Use type, image scale, rules, columns, and varied story treatments. Do not let generic card grids become the whole design language.

## Minimalism — reading and focus
Use for standard articles, investigations, interviews, essays, corrections, and policies. Remove distraction without removing personality.

## Scrapbook / collage — selected student-culture stories
Potentially for student culture, personal essays, event recaps, creative interviews, photo essays, and special editions. Layered photography, paper-like surfaces, annotations, cutout shapes, and controlled overlap may be used. Do not default to collage for urgent news, investigations, public safety, corrections, or sensitive stories. Never make documentary evidence appear manipulated.

## Brutalism / neo-brutalism — campaign accent
Potentially for calls for submissions, special projects, and student initiatives. Bold type and hard edges must not compromise accessibility or reading comfort.

## Bauhaus geometry / vector illustration — graphic vocabulary
Use for section markers, explainers, diagrams, editorial graphics, separators, and transitions. Maintain a coherent brand-derived shape language; no random decorative geometry.

## Retro / college-publication language — archive and special editions
Potentially for campus history, anniversaries, archives, and special editions. Do not make current reporting look historical by accident.

## Kinetic typography — selective emphasis
Potentially for special homepage moments, campaigns, and visual features. Meaning must remain available with motion disabled. Never animate every headline or body paragraph.

Any page departing from the primary editorial language must document why, which tokens remain, what varies, mobile behavior, motion, accessibility, performance, and whether it is reusable or one-off.

# 9. Layout, grid, spacing, composition

Inspect the app before selecting exact breakpoints and widths. The grid must support masthead, navigation, lead compositions, multi-column clusters, narrow reading columns, useful sidebars, image-led and text-led modules, and responsive reordering.

Use alignment, controlled asymmetry, whitespace, section labels, and rules to establish rhythm. Let the lead story dominate when warranted. Avoid arbitrary widths, fixed heights for variable headlines, excessive rounded corners, decorative containers around every block, unnecessary borders/shadows, full-bleed images for every story, and a single narrow centered column for every homepage section.

Define a spacing scale in the existing token system. Apply it consistently to page gutters, sections, headline/deck, metadata, paragraphs, captions, navigation, and controls. Spacing must adapt to content and viewport.

# 10. Photography and media

Photography is editorial evidence and storytelling, not generic decoration.

- Prefer authentic, relevant, approved campus/event photography.
- Preserve images unless a defined component requires a crop.
- Use responsive sizing and suitable formats.
- Define aspect ratios by component.
- Use focal positioning when needed.
- Provide meaningful alt text for informative images.
- Include captions and credits when supplied or required.
- Distinguish illustrative from documentary imagery.
- Do not fabricate photos, captions, credits, or context.
- Do not apply a universal filter.
- Never stretch images.

If no image exists, use typography-led composition or a restrained neutral fallback. Do not imply a stock image documents an event. Avoid broken-image icons and oversized empty boxes. For video/audio, no autoplay with sound; provide controls, captions/transcripts where appropriate, respect reduced motion/data usage, defer heavy media, and provide embed fallbacks.

# 11. Motion and interaction

Motion is part of frontend craft when disciplined. The goal is a responsive, carefully made publication—not a page where everything moves.

Every animation must serve at least one purpose:
1. Feedback.
2. Continuity.
3. Hierarchy.
4. Storytelling.
5. Restrained brand expression.

If it serves none, remove it.

Useful categories:
- Functional: hover, focus, pressed, selected, menu, search, loading, success, error.
- Navigation/layout: mobile menus, drawers, dialogs, tabs where helpful.
- Editorial entrance: restrained lead image/headline entrance and section reveals following reading order.
- Storytelling: story-specific timeline, data, image comparison, or scroll-linked sequence.
- Branded: subtle identity-derived transitions.

Rules:
- Keep motion short and intentional.
- Prefer clear easing over bounce/elastic effects.
- Avoid excessive parallax, scroll hijacking, continuously moving decorations, animated gradients, floating blobs, and animating every card.
- Avoid layout shifts.
- Do not delay reading until an animation completes.
- Do not animate body text in ways that harm reading.
- Ensure touch equivalents and predictable focus.
- Respect `prefers-reduced-motion`.
- Provide static alternatives.
- Test on lower-powered mobile devices.
- Define shared duration/easing tokens; do not improvise per component.

# 12. Distinctive frontend craft: anti-generic rules

This section is mandatory. Do not default to generic AI-generated landing-page patterns.

Avoid by default:
- Blue-purple gradient hero backgrounds.
- Glassmorphism on ordinary cards.
- Random blurred gradient blobs.
- Floating circles without editorial meaning.
- Excessive pill-shaped containers.
- Identical rounded cards for every story.
- Dashboard-style grids for the public homepage.
- Repeated icon-plus-heading feature sections.
- Fake ticker bars or live indicators.
- Fake trending scores, views, or engagement.
- Generic stock photos of people on laptops.
- Excessive shadows.
- Random squiggles.
- Animated counters without real data.
- Scroll-triggered animation on every element.
- AI-chat-like streaming UI patterns.
- Repeated gradient text.
- Glass panels over every photograph.
- Unnecessary floating action buttons.
- Carousels that hide content without a real need.

These techniques are not universally forbidden, but require a specific editorial reason. They are not defaults.

Create distinctiveness through the masthead, confident typography, editorial grid, varied story hierarchy, meaningful photography, article templates, section fronts, captions and metadata, purposeful rules/labels/numbering, restrained identity-derived graphics, and carefully composed responsive transitions.

**Review test:** If gradients, shadows, rounded cards, and animations were removed, would the page still have a strong editorial identity? If not, improve composition and typography.

# 13. Reader experience and feature discipline

Baseline reader needs:
- Discover important and recent stories without an account.
- Browse sections/categories.
- Read comfortably.
- Understand authorship and publication/update dates.
- Find related coverage.
- Share ordinary article links.
- Find publication information and newsroom contact.
- Search and browse the archive where supported by data.

Every feature must be labelled:
- **Core:** required for agreed initial release.
- **Later:** intentionally deferred.
- **Optional:** only with a real need and owner.
- **Not decided:** needs a product decision.
- **Blocked:** dependency or policy prevents it.
- **Implemented / verified:** confirmed working in code and user-visible behavior.

Current guidance:

| Feature | Direction / status |
|---|---|
| Public homepage | Core editorial discovery |
| Article reading | Core, template-based |
| Categories/sections | Derive from archive and confirm |
| Search | Core candidate; verify actual scope/data |
| Archive browsing | Preserve historical stories and dates |
| Author pages | Optional/data-dependent |
| Story tips | Not decided; needs receiving workflow and owner |
| General contact | Not decided; use verified details only |
| Reader accounts | Not required for ordinary reading; additional account features undecided |
| Bookmarks | Not decided |
| Personalization | Not required for discovery; later/not decided |
| Comments | Not approved; requires moderation |
| Newsletter | Later; consent, storage, delivery, unsubscribe, privacy, and owner required |
| Push notifications | Not approved |
| View counts/trending | Never fabricate; measurement/editorial rules not decided |

This is a scope guard, not authorization to build every feature.

# 14. Accessibility and responsive design

Accessibility is part of design, not final polish. Target WCAG 2.2 AA where practical.

Test narrow phones, common phones, tablets, laptops, wide screens, portrait/landscape where relevant, browser zoom, larger text, long headlines, missing images, long author names, and dense/empty sections.

- Recompose layouts rather than merely shrinking.
- Avoid horizontal overflow.
- Keep navigation touch-usable.
- Prevent sticky headers covering titles/anchors.
- Avoid fixed heights for variable content.
- Maintain comfortable body line length.
- Preserve image focal points.
- Use adequately sized controls.

Requirements:
- Semantic HTML landmarks.
- Logical heading order.
- Keyboard-accessible controls.
- Visible focus.
- Accessible names for icon-only controls.
- Labels and useful form errors.
- Sufficient contrast.
- Meaningful alt text.
- Captions/transcripts where appropriate.
- Status announcements when needed.
- Reduced-motion support.
- No information communicated only by color, motion, or imagery.
- Do not disable zoom.
- Correct focus management in dialogs/menus.
- Links and buttons use appropriate semantics.
- Reading order matches visual order.

# 15. Performance and frontend engineering

A news website must feel fast. Motion and visual ambition must not undermine access to reporting.

- Prioritize first meaningful content and lead story.
- Optimize images and responsive delivery.
- Avoid large libraries for minor effects.
- Lazy-load below-the-fold media when appropriate.
- Avoid image/font layout shifts.
- Load fonts efficiently with fallbacks.
- Avoid unnecessary client rendering for editorial content.
- Keep interactive client components narrowly scoped.
- Keep newsroom dependencies out of public pages.
- Avoid heavy video backgrounds.
- Test on realistic mobile connections/devices.
- Measure performance.

Follow the existing Next.js architecture after inspection. If App Router is used, prefer server components by default and add client components only where interaction requires. Keep content data separate from presentation. Define useful types for stories and blocks. Handle missing data. Avoid `any` where practical, giant page components, premature abstractions, unnecessary dependencies, competing token systems, and unrelated rewrites.

Preserve existing routes and functionality unless approved. Ensure metadata, canonical URLs, Open Graph data, and structured data are accurate.

SEO/sharing:
- Unique accurate page titles.
- Useful descriptions from real content.
- Canonical URLs.
- Open Graph/social metadata.
- Article structured data only when fields are valid.
- Correct publication/update dates.
- Meaningful image alt text.
- Sitemap/robots behavior appropriate to launch environment.
- Redirects for changed legacy URLs.
- No fabricated credentials, scores, or metadata.

# 16. Content architecture and future CMS compatibility

The existing app may continue using its current scraped content source initially. Avoid making that source a permanent constraint.

Do not make every component depend directly on a CMS SDK or raw scraper response. Create a stable frontend content contract. An illustrative normalized story model may contain:
`id`, `slug`, `title`, `excerpt`, `storyType`, `category`, `authors`, `publishedAt`, `updatedAt`, `featuredMedia`, `content`, `relatedStories`, `canonicalUrl`, `status`.

This is illustrative only. Inspect actual data and preserve additional source fields where valuable.

Each content block should have a stable type, validated data, renderer, accessibility behavior, fallback behavior, and template allowlist. Possible types include paragraph, heading, image, quote, video, audio, gallery, related story, list, timeline, chart, and embed. Implement only types present in the archive or required by approved initial templates.

When a newsroom/CMS is introduced, preview should use the same public template renderer as the published page wherever possible. Preview that differs from the public page is not reliable.

Payload and Sanity remain candidates. The native newsroom preference is not authorization to build a custom CMS now. Keep the frontend CMS-agnostic.

# 17. Component system

Potential components:
- Masthead
- PrimaryNavigation
- MobileNavigation
- SectionNavigation
- BreakingNewsIndicator (verified breaking stories only)
- LeadStory
- StoryTeaser
- StoryList
- StoryMetadata
- Byline
- ArticleHeader
- ArticleBody
- ArticleImage
- ImageCaption
- ImageCredit
- PullQuote
- RelatedStories
- SectionHeading
- SearchForm
- Pagination
- ArchiveNavigation
- Footer
- LoadingState
- EmptyState
- ErrorState

Create components around editorial meaning and repeated behavior. A lead story and archive result may both contain a title/image but have different hierarchy and behavior. Do not over-generalize or copy entire templates unnecessarily.

# 18. Coding-agent workflow

Before substantial work:
1. Identify target route/component/experience.
2. Read this skill.
3. Inspect relevant repository files.
4. Inspect real content used in the design.
5. Identify existing tokens/components.
6. Identify behavior and states.
7. Check whether the feature is approved, provisional, or undecided.
8. State material assumptions.

Plan the smallest coherent change. Identify files, functionality to preserve, components/styles, responsive behavior, accessibility, data requirements, loading/empty/error/missing-media states, and checks.

Implement with existing conventions. Reuse the stack. Keep changes focused. Avoid unnecessary dependencies. Use real content. Separate fixtures. Preserve working routes/data. Do not add dead buttons or fake interactions. Never claim a backend action exists when only a frontend has been built.

After meaningful changes:
- Run available lint checks.
- Run type checks.
- Run production build.
- Test target routes.
- Test mobile and desktop.
- Test long/missing content.
- Test keyboard navigation and reduced motion.
- Inspect image loading and layout shifts.
- Check console errors, links, and buttons.
- Report checks not run.

A successful build does not prove design quality. Review the rendered interface.

Minimum visual review:
- Homepage desktop and mobile.
- Standard article desktop and mobile.
- Long headline.
- Long article.
- Article without lead image.
- Story with multiple images/captions if available.
- Category/archive page.

# 19. Periodic unimplemented-feature review

The agent must proactively revisit this skill during development.

Review at the beginning of a phase, after a major page/template, when discovering existing functionality, before adding a reader feature, when architecture/scope may change, and before launch.

At each checkpoint:
1. Inspect actual repository and behavior.
2. Compare implementation against relevant skill sections.
3. Identify features as implemented/verified, partial, broken, designed-not-built, blocked, or newly discovered.
4. Explain why each relevant gap matters.
5. Recommend build now, defer, optional, reject, or clarify.
6. Ask the owner about decisions materially affecting scope, data, policy, security, architecture, cost, or launch timing.
7. Do not silently expand scope.
8. Update the skill/decision record after a decision.
9. Mark implemented only after verifying code and behavior.

Do not interrupt for every minor detail. Bundle related decisions.

Review report:
- **Verified implemented:** feature and evidence.
- **Partially implemented / broken:** what works and what remains.
- **Planned but not implemented:** status and dependencies.
- **Newly discovered gaps:** why they matter.
- **Decisions requested:** smallest useful set of questions.

This applies during active development. It does not mean the agent can independently monitor the repository or initiate background check-ins when no session or scheduled automation is active.

# 20. Editorial trust and integrity

- Preserve authorship and publication metadata.
- Distinguish news, opinion, sponsored content, and promotional material where applicable.
- Make corrections and significant updates visible according to approved policy.
- Never invent sources, quotes, statistics, captions, credits, or author biographies.
- Do not imply developing information is confirmed.
- Do not use alarmist motion to manufacture urgency.
- Avoid fake social proof, trending scores, reader counts, and newsroom activity.
- Identify sponsored content according to policy.
- Do not promise confidentiality for tips without an approved secure workflow.
- Do not build comments without moderation ownership and rules.
- Do not change the meaning of scraped reporting during cleanup.

# 21. Definition of done

A page/component is complete only when:

**Editorial:** purpose is clear; treatment suits the story/task; content and attribution are preserved; facts/metadata are not invented; hierarchy helps readers.

**Visual:** Daily Akokite identity is respected; typography/composition are intentional; generic AI decoration is avoided; imagery is appropriate; patterns are consistent.

**Responsive:** mobile is deliberately composed; tablet/desktop work; long content does not break; no unwanted horizontal overflow.

**Interaction:** controls work; states are clear; keyboard behavior is correct; motion is purposeful; reduced motion is supported.

**Technical:** existing behavior is preserved; content rendering is safe; performance is considered; metadata/URLs are accurate; checks are run and reported.

**Verification:** rendered result is visually reviewed with realistic archive content and missing-data states. No fake feature is presented as functional.

# 22. Explicit anti-patterns

Do not:
- Make every page a grid of identical rounded cards.
- Make every section a gradient hero.
- Add glassmorphism by default.
- Add random blurred blobs or floating shapes.
- Use arbitrary decorative circles and lines.
- Use blue for every background.
- Use huge type without hierarchy or purpose.
- Animate every element on scroll.
- Use parallax or scroll hijacking without a story-specific reason.
- Delay content behind motion.
- Add carousels where a visible list is better.
- Add fake breaking bars, live indicators, trending scores, or views.
- Use generic stock photos to fill archive gaps.
- Fabricate content or metadata.
- Change reporting during visual cleanup.
- Drop scraped content because it does not fit the design.
- Couple every component directly to a CMS SDK.
- Build the CMS before the public site needs it.
- Merge public site, newsroom, and club management.
- Add unapproved accounts, comments, newsletters, or notifications.
- Mark a feature complete because its UI exists.
- Rewrite the entire app before auditing it.
- Replace working functionality for visual novelty.

# 23. Recommended implementation order

## Phase 0 — Repository and archive audit
Deliver repository/route/component inventory, content schema and scraper inventory, media inventory, data-quality report, existing functionality report, build/lint/type-check baseline, and unknowns/risks.

## Phase 1 — Digital art direction
Deliver digital brand-token proposal, typography tests using actual headlines, grid/spacing rules, masthead/navigation direction, image/caption treatment, motion principles, homepage composition, and article reading direction. Owner reviews direction before extensive implementation.

## Phase 2 — Core public shell
Build masthead, navigation, responsive menu, footer, global typography/layout, reusable editorial primitives, and loading/error states.

## Phase 3 — Homepage
Build the editorial homepage using real scraped stories. Verify lead logic, secondary hierarchy, latest stories, sections, missing media, long titles, and mobile composition.

## Phase 4 — Article templates
Implement standard news, feature/long-form, opinion/commentary, and interview/profile. Start with formats present in the archive. Add investigative and multimedia when supported by real content and approved scope.

## Phase 5 — Discovery and archive
Build agreed category pages, search, archive browsing, author pages if reliable data exists, and related-story navigation.

## Phase 6 — Content integrity and migration preparation
Validate archive, slug/URL mapping, media references, metadata, content needing editorial review, and redirects.

## Phase 7 — Refinement and launch readiness
Responsive/accessibility audit, performance, SEO/metadata, broken-link audit, browser testing, content QA, editorial review, deployment checks.

## Phase 8 — Future editorial platform
After the public-site foundation, evaluate newsroom/CMS integration in line with team decisions. Preserve the CMS-independent rendering contract.

# 24. Open decisions: do not silently invent

Examples:
1. Exact digital font pairing after licensing and legibility tests.
2. Final homepage section order.
3. Public navigation categories.
4. Article types present and editorially approved.
5. Search launch scope and filters.
6. Author pages and verified data.
7. Publication contact details and workflow.
8. Corrections/updates policy.
9. Story-tip workflow and confidentiality policy.
10. Any reader-account feature with a real launch need.
11. Newsletter timing and ownership.
12. CMS selection.
13. Editorial permissions and newsroom workflow.
14. URL changes and redirects.
15. Special interactive stories requiring custom treatment.

The agent may make low-risk choices consistent with this system. Ask before choices materially affecting product scope, editorial meaning, privacy, security, cost, or architecture.

# 25. Final instruction to the coding agent

You are building **Daily Akokite**, the public digital publication of The Press Club, University of Lagos.

Do not approach it as a generic news template, SaaS dashboard, or AI-generated landing page. Understand the existing Next.js app and scraped archive first. Preserve publication content and history. Build a strong editorial design system from the supplied identity. Use disciplined grids, confident typography, varied story hierarchy, thoughtful photography, purposeful motion, and controlled article templates.

Keep the public website independent of an unselected CMS. Let story types and approved content blocks drive presentation. Keep the newsroom and club management boundaries intact.

Be visually ambitious but editorially responsible. Be technically careful without overengineering. Review the actual rendered result, not just the code.

**The goal is a publication with a recognizable voice, a serious editorial reading experience, and a digital identity deliberately made for Daily Akokite.**
