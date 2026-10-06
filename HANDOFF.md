# HANDOFF — Interact District 3220 Website Rebuild

> Living document. Update as the project progresses. Most-recent status at the top of each section.

**Project:** Rebuild https://www.interactdistrict3220.org with a modern, mobile-first design.
**Old stack:** Wix (outdated visuals, not mobile-friendly).
**Goal:** Migrate all existing content (see [CONTENT.md](CONTENT.md)) onto a new, responsive site; layer new content on top.

---

## Current Status — 2026-10-06

**Phase:** The whole site is built and merged to `main` (PRs #2–#8), then
audited end to end (below). Every page in CONTENT.md exists on the locked
design system (`design/DECISIONS.md`; §6 has the motion map, §8 the
site-build decisions).

### Polish pass — 2026-10-06 (branch `polish/design-pass`)
A second pass, checked in a real browser at 390, 768, 1024, 1440 and 1920px,
with both normal and reduced motion. Every page was hovered, focused and
measured for contrast, including text over photos (measured on actual pixels).
It followed Emil Kowalski's motion principles and the Vercel Web Interface
Guidelines. Every design change was approved by the user and is recorded in
DECISIONS.md §2 and §6.
- **Motion (approved):**
  - press scale 0.97 on every control (the `press` utility)
  - the nav dropdown grows from its trigger; the drawer opens with a clip-path
    reveal
  - an 80ms hover-intent delay on both accordions
  - the form confirmation fades up, and Copy → Copied cross-fades
  - the calendar wipe takes 400ms
  - reduced motion is now "gentle fades", not "final frame"
  - morph cursor: faster; rings over links; white on dark surfaces
  - the hero no longer pauses on hover
- **Contrast (approved):**
  - hero scrims raised to the minimum that passes on every slide
  - Community Service band `#906413` (the old note's `#A86F12` measured 4.24
    and failed)
  - project-tile labels use `signal-400`, numbers `white/70`
  - stronger avenue blurbs
- **Fixes:**
  - hero and photo-wall image `sizes` (were up to 4× upscaled on phones)
  - the Clip Reveal now plays on each slide's first visit
  - phone layouts: Media Crew tiles, calendar rows, email wrapping, About
    cards
  - aligned names in council grids (subgrid)
  - College of DIRs column system and rail end
  - names and dates kept on one line (`keepTogether`)
  - centred DIMUN logos
  - doubled hairlines removed
  - the home photo band's Line Draw now connects the caption diamonds, as on
    Archives (its nodes sat 22px above them)
  - 24/44px tap targets
  - scroll padding under the sticky header
  - calendar state in the URL
  - form `autoComplete` values, date `min`, no per-field `role="alert"`
  - carousel slide semantics and a live region
  - `inert` collapsed panels
  - focus rings appear instantly (they no longer fade in)
- **Still open (needs the district):** see "Content to request" item 9.
- Two photo-band "Decorative" stock plates were dropped (user's call).

### Site audit — 2026-10-06 (branch `fix/site-audit`)
Interface-guidelines review of every UI file, a motion audit, Lighthouse on
every page type, and a real-browser check of each animation. All fixes
verified in the browser.

- **Lighthouse:** accessibility 100 on every page checked (was 93–96 on home,
  About, Archives). Best practices and SEO 100. Only remaining flags: dev-server
  source maps, and the locked 10.4px micro-labels.
- **Reduced motion: verified** in Chrome with `--force-prefers-reduced-motion`
  on home, About, College of DIRs, Archives, News and a dialog.
- **Bugs fixed:** progress bars on both pinned rails never showed (a Tailwind
  `scale` utility multiplied the animation to zero); the page scrolled behind
  open dialogs (Lenis ignores body overflow); the morph cursor flew to the
  corner when its target was removed; the hero's first progress bar never
  animated, ignored pause, and slides restarted their 6s after a hover; the
  photo band clipped its last plate on screens wider than 88rem; the mobile
  drawer couldn't reach its last links on a short phone; "Edit the form" wiped
  everything typed; calendar: long-running series showed nothing, deleted
  single instances still showed, events under way were filed as past,
  multi-day times read as one day, floating times would land 5h30 late.
- **Accessibility fixed:** focus trap, focus-in and focus-return for all three
  dialog types; a pause button for the hero slideshow; 24px slide-dot targets;
  stat figures announced (aria-label on a span was ignored); a white focus ring
  on dark surfaces; contrast on avenue numbers and archive labels; Escape in
  menus returns focus; About lit on its child pages; keyboard focus in the
  archive timeline moves the pan instead of breaking it; list and dl markup.
- **Also:** page headers animate in CSS from first paint (h1 no longer waits
  on JavaScript); `priority` renamed to `preload` (deprecated in Next 16);
  white-on-accent hover fills changed to `accent-fill` per DECISIONS §2; the
  closing CTA's second button now goes to About, not a second link to Contact.

### Dependencies — 2026-10-06
`npm audit fix` cleared 5 advisories, including a critical Next.js RCE on
Windows-hosted servers and in the image optimizer: Next 16.2.12 → 16.3.8,
sharp → 0.35.5, postcss → 8.5.25 (also Next's bundled copy), nanoid and
source-map-js patched. `package.json` floors raised to match, so a fresh
install can't resolve the vulnerable versions. `npm audit` is clean; tsc,
build and every route (plus `/_next/image`) checked on `next start`.

- **Setup:** `npm ci`, then `npx next dev --port 3100`. If the network drops
  connections (`ECONNRESET`), add `--fetch-retries=5 --maxsockets=4`. `EPERM`
  means something (VS Code, a stray node) holds `node_modules` open.
- **`ffmpeg-static` install script is blocked** by npm's `allowScripts`
  default, so its ffmpeg binary isn't downloaded. Nothing in the build uses
  it; it is only for re-encoding the videos. Before that, run
  `npm install-scripts approve ffmpeg-static` and `npm ci`.

### To switch on at launch
- **Hosting is Vercel.** Set `DISTRICT_CALENDAR_ICS_URL` to the district
  Google Calendar's public iCal address (see `.env.example`). Until then the
  calendar shows the recorded events with a "Live calendar to come" note.
- Forms (Contact, Request a Date, Media Crew, DIMUN enquiries) open a
  pre-filled email to the district address. A real back-end later replaces
  only `send()` in `components/forms/mailto-form.tsx`.

### Every gap is marked
Placeholders render through `<Placeholder>` or carry `data-placeholder`, so
`document.querySelectorAll('[data-placeholder]')` on any page, or a search of
the source for `Placeholder`, lists what is still missing.

### Content to request from the district
1. **2026/27 council**: names, positions, portraits, bios → `COUNCIL_2026_27`
   in `lib/councils.ts` (every position is a "To be announced" slot today).
2. **Google Calendar** public iCal URL (and the calendar set to public).
3. **2026/27 news posts**; the two posts on the site are from July 2025.
4. **Files**: First Quarterly Newsletter PDF, District Directory 2025/26, and
   any other admin documents (`lib/publications.ts`).
5. **Archive gaps**: records for 2023/24, 2021/22 and 1991/92; the real
   1999/2000 council roster (the old page duplicated 1998/99's); anything for
   2001/02–2019/20, which never had archive pages.
6. **2025/26 record**: the year is built from the old home feed, captured
   mid-year. Dates, figures and photos to complete it.
7. Portrait of **Chathula Fernando** (DIR 2016/17), blocked on the old CDN.
8. Still open from before: Interflash and Race4Change photography; IBTS and
   Intercede content; real photographs for the home collage; avenue photos.
9. **Found in the 2026-10-06 polish pass:**
   - **Media Crew service names.** The tiles say "Live Streaming",
     "Designing" and "Photo Booths"; the request-form chips say "Livestream",
     "Graphic Designing" and "Photobooth". CONTENT.md carries both versions
     verbatim from the old site, so the district has to pick one.
   - **Stat label.** "In District 3220 since" reads backwards.
   - **First archive year.** The timeline labels it "1988/89–1989/90"; its
     card says "1988/89".
   - **Archive-year dates.** The pages mix "28 Sep 2024" with bare
     months.
   - **About ledes.** "What the district is for." and "The people who run
     it." have no muted lede, unlike every other section.
   - **Photos too small.** Larger originals are needed for the 2024/25 council
     portraits (360×240 files), some College of DIRs thumbnails (196–256px)
     and the hero panorama (1600px wide). These stay soft on phones and large
     screens until replaced.

### Human judgement calls (decide before launch)
- **Council bios are verbatim, by decision.** The sharpest ones, for the
  district to keep or veto: "The word clueless in human form" (Abishek
  Maheshwaran), "the punching bag of council" (Chenura Pathirana), "A
  controversial choice who I trust with positions" (Charith Ekanayake), "a
  special talent for giving people mini heart attacks" (Veenu Ovinya), "works
  hard to the point where his body shuts down" (Lakshin Fernando), "After
  fumbles, she became final addition to council" (Wenuri Amarasinghe), "From
  an unknown club" (Sameeha Nizamdeen, 2024/25), "presence that intimidates"
  (Rezon David, 2022/23).
- **2022/23 bios are crawl summaries**, not the original wording (only the
  quoted fragments are original). Shown as captured.
- **2021/22 theme**: the old archive index said "Prosper Through Service"; the
  DIR table and Rotary International say "Serve to Change Lives", which is used.
- **The "with" name beside each DIR** is the source's "Co-DIR" column, which
  for recent years is plainly the Secretary; shown neutrally as "with".
- **Name spellings that differ between sources** (the College of DIRs follows
  the historical roster; archive pages follow their own page): Mohammed /
  Mohommed Awoon, Iflikar / Ifthikar Mohammed, Atulathmudali / Athulathmudali.
- **2001/02–2019/20** appear on the archive timeline as one marked span rather
  than 19 empty pages.
- **Misnamed branding files** from the crawl: `newsletter-footer.png` is the
  colour Media Crew logo; `rotary-logo.png` is a Sri Lanka/Maldives flags image.
- Community Service avenue band still fails AA (white by request; one-line fix
  in DECISIONS.md §2).

### Still to do (engineering)
1. Image pipeline: the council portraits are 2–6MB originals (~290MB total).
   `next/image` resizes them on Vercel, but pre-sizing them would cut build and
   cold-cache cost.
2. A throttled-mobile performance trace on a production deploy (Lighthouse
   accessibility, best-practices and SEO are done; performance needs a real
   build on Vercel, not the dev server).
3. Optional: reflect the calendar's view and month in the URL so it can be
   linked to.

---

## Status — 2026-09-14

**Phase:** Home page rebuilt on a new design direction. Branch `redesign/blueprint`.

The silk-video / aperture-reveal home page is gone. Everything below supersedes
the 2026-08-03 status; that entry is kept for the decisions still in force
(nav labels, URL mapping, 301s, the two founding dates, the 2026-27 theme).

### Design direction (locked 2026-09-14; full spec now in `design/DECISIONS.md`)
Chosen by comparing prototypes in `design/concepts.html` (three directions) and
`design/concept-blueprint.html` (the merged direction, with live palette / type
/ shape / accent pickers in the style of `design/directions.html`).

| | |
|---|---|
| Palette | **Signal** accent (from `directions.html`) on **warm chalk** neutrals |
| Type | **Fraunces 600** display + **Instrument Sans** body (pairing 2) |
| Shape | Pill controls, rounded panels. Nothing square. |
| Theme | **Light only.** No dark mode, no toggle. The theme provider is deleted. |

Tokens live in `app/globals.css`. Every contrast ratio in that file is computed,
not estimated. Three are deliberately non-obvious and should not be "tidied":
- `signal-500` as a button fill gives white text only **3.90** and fails AA, so
  the fill is `signal-600` (**5.78**). `signal-500` survives as a graphic mark.
- Micro-labels use `chalk-700` (**5.02**); `chalk-600` measures 2.92 and fails.
- Community Service avenue: the solid band is `#906413` (white 5.23), not the
  logo's `#D8951C` (white ≈ 2.6, failed AA), changed 2026-10-06 at the user's
  request. `#A86F12`, the fix this note used to suggest, measures 4.24 and also
  fails. The logo tint keeps the true brand amber.

### Home page sections
1. **Hero** — Clip Reveal carousel, four district photographs, exactly `100svh`
   (not `dvh`: `dvh` re-resolves as mobile chrome collapses and shifts the copy
   mid-scroll). Header bar is transparent over it at rest and goes solid on the
   first scroll.
2. **Stats** — Odometer Roll.
3. **Projects** — Expand Grid. Five numbered tiles, tap for a shared-element
   handoff (Framer `layoutId`) into a detail panel.
4. **Avenues** — Accordion Gallery. All five start collapsed and equal; hover
   opens, click locks. Becomes a list below `md`.
5. **Photographs** — pinned horizontal collage threaded by a Line Draw.
6. **Officers band** — inverted near-black panel, tiles fill Signal on hover.
7. **Closing CTA.**

Effects are all from `lab.damiandc.com`: Clip Reveal, Odometer Roll, Expand
Grid, Accordion Gallery, Line Draw, Morph Cursor.

### Morph cursor
Sitewide, fine pointers only, off entirely on touch and under reduced motion
(it hides the native pointer). It parks only on control-sized elements: without
the size cap it inflated to cover a 140x520 accordion panel and fought that
panel's own hover. Centring must be a `transform` — Tailwind v4's
`-translate-1/2` writes the `translate` property, which the rAF loop also
writes, so the two fight and the blob hangs off the pointer.

### Scroll-driven animation
The pinned horizontal scroll uses a CSS scroll-driven animation on a **named
view timeline declared on the tall section, not on the sticky rail** (a
timeline scoped to the rail never leaves the viewport, so it never advances).
`--pan` is measured in JS; a percentage translate is a percentage of the rail's
own width and overshoots. Falls back to a snap-scroll rail where unsupported,
and to a vertical stack below `md`.

### BLOCKING content gaps
1. **Interflash and Race4Change have no photography.** Both flagged
   `needsPhoto` in `lib/home.ts`.
2. **IBTS and Intercede have no content at all.** Not in CONTENT.md, ARCHIVES.md
   or lib/. Each needs a figure, headline, blurb and photo. Flagged
   `needsContent`.
3. **The photo collage is 75% stock.** It has eight plates. Only
   `hero/assembly.webp` and `blog/blog-35th-district-assembly.jpg` are
   photographs of this district. The six `media-*.jpg` are Media Crew *service
   category* images (CONTENT.md §12). The two `decor-*.jpg` plates, captioned
   "Decorative", were dropped on 2026-10-06 at the user's request. The
   remaining captions name the service rather than claiming an event, and
   carry no year, but a section headed "A year of the district, in
   photographs" needs real photography before launch. Each item carries
   `provenance` in `lib/home.ts`.
4. **Years.** Only the 35th District Assembly is dated in the repo (29 June
   2025, Wave & Lake, the collaring of Int. PP. Jezon Fernando — CONTENT.md §9).
   Every other image is undated. Years are omitted rather than guessed.
5. Still outstanding from before: the 2026/27 council roster, current events,
   and avenue photography.

### Removed in the cleanup
`components/home/*` (old), `site-background`, `hero-reveal`, `theme-toggle`,
`components/theme/*`, `magnetic`, `mask-wipe`, `public/videos/*`,
`scripts/encode-bg-video.mjs`, `design/higgsfield/`. **`public/images/` is
untouched** — all 156 files, 293MB.

### Verified
`tsc --noEmit` and `next build` clean. No console messages. No horizontal
overflow at 390x844 across the full scroll. Morph cursor off on touch.
~~**Not yet verified: `prefers-reduced-motion` rendering.**~~ Verified
2026-10-06 in Chrome with `--force-prefers-reduced-motion` (see "Site audit"
under Current Status).

### Dev server
`npx next dev --port 3100` (port 3000 is occupied on this machine).

---

## Earlier Status — 2026-08-03

> **SUPERSEDED.** This section describes the navy + cyan / Outfit / dark-mode /
> silk-video build that the 2026-09-14 redesign replaced. Its design notes,
> "Remaining tasks" and file references are history only; the current plan is
> under Current Status. Still in force: the nav labels and URL map, the 301s,
> the two founding dates and the 2026-27 theme (all restated in DECISIONS.md §8).

**Phase:** Site build. Home page substantially built; design direction locked.

> **2026-08-03: home-page visual-style pass shipped** (user-approved at both design and
> ship gates). Same aesthetic, deeper execution: hero underline stroke + bloom +
> button-in-button magnetic CTA + glass caption chip, double-bezel avenues tray and
> closing CTA, avenue identity strips, spring accordion settle, 3.5rem stats with
> dividers, Mask Wipe heading reveals, static film grain, eyebrows 4 → 2, one CTA label
> per destination. Full detail in `design/DECISIONS.md` **Revision 4**. New primitives:
> `components/motion/magnetic.tsx`, `components/motion/mask-wipe.tsx`.
> Verified: typecheck + production build green; both themes at 1440×900 and 390×844
> (no horizontal overflow); aperture wipe and its `pointer-events` fix confirmed intact
> in-browser; all new motion honours `prefers-reduced-motion`; no new console messages
> (the avenue-logo LCP note below remains the only one).

> **2026-07-30 (later session): the avenues carousel is FIXED.** The root cause was never
> in the accordion — the pinned hero (`components/site/hero-reveal.tsx`, sticky `z-20`
> stage) stayed **hit-testable at `opacity: 0`** after the aperture wipe and kept
> overlapping the viewport for the whole runway, swallowing every pointer event meant for
> the sections beneath (accordion, event links). Fix: `stage.style.pointerEvents = 'none'`
> once `p >= 0.999`, restored on scroll-back. Verified in the browser: click, hover and
> arrow-key navigation all work; hero CTAs still work at the top.

### Tech stack (decided)
| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Motion | Framer Motion 12 + Lenis |
| Media | sharp; ffmpeg-static, ffprobe-static (dev only, video re-encodes) |
| Hosting | **Not decided** at the time — Vercel since 2026-10-05 (DECISIONS.md §8) |

Versions deliberately match `EnderGuardian25/personal-portfolio` (the effects lab at
lab.damiandc.com) so its effects lift across directly.

### Design decisions
**All locked decisions live in [`design/DECISIONS.md`](design/DECISIONS.md)** — palette with
verified contrast ratios, typography, motion plan, nav URL mapping. Read that before
changing anything visual. Revision 2 at the top supersedes the tables below it.

Headlines: deep navy + official Interact cyan `#01B4E6`, warm neutrals (ivory `#F7F6F3` /
ink `#0A0E14`), Outfit throughout, radii 14/24/28px, editorial rows rather than cards.

### Built
- **Scaffold** — Next.js + Tailwind v4 + Framer Motion + Lenis; theme resolved before
  first paint (no flash); `prefers-reduced-motion` respected throughout.
- **Nav + footer** — labels and order identical to the old Wix site; clean URLs with 301s
  from every old path in `next.config.ts`; accessible dropdowns; theme toggle; social
  links as inline SVG.
- **Home page** — full-viewport split hero (copy left, assembly photo bleeding right),
  pinned aperture reveal, stats, avenues accordion, events as editorial rows, closing CTA.
- **Background video** — Higgsfield renders encoded to 1280x720 AV1 + H.264 with AVIF
  posters via `scripts/encode-bg-video.mjs`. Not loaded on touch / reduced-motion /
  Save-Data / 2g-3g; paused when the tab is hidden.
- **Favicon** — the real Rotary wheel, cropped from the supplied logo.
- `images/` moved to `public/images/` (all 150 tracked as git renames).

### Fixed & verified — 2026-07-30 (later session)
All checked in a real browser (Chrome DevTools MCP) on `next dev` at 1440×900 and
390×844, both themes:
- **Avenues carousel interactivity** — root cause and fix in the note at the top of this
  section. The accordion rewrite from the earlier session was fine; it was never
  receiving events.
- `npx tsc --noEmit` passes for the whole previously-unverified batch.
- Closing CTA is theme-aware (white panel on light, navy on dark). ✓
- Odometer renders `1964` un-grouped at rest (no "1,964"). ✓
- Hero CTAs clickable at p=0; aperture centred; reveal ring rides the edge. ✓
- Mobile: accordion stacks correctly, tap targets fine, poster-only background. ✓
- Only console note: Next.js flags the first avenue logo as LCP (suggests
  `loading="eager"`) — harmless, revisit during the perf pass.

### Design cleanliness pass — 2026-07-30 (user-approved direction)
User verdict: light mode read as milky haze. Chosen direction (via explicit options):
**keep the silk visible but toned down; keep glassy surfaces but make them present.**
- Site background veil raised `bg-bg/62` → **`bg-bg/80` light / `bg-bg/70` dark**
  (`components/site/site-background.tsx`). Sections now separate from the moving ground.
- Collapsed avenue panels `border-transparent bg-surface/55` →
  **`border-hairline bg-surface/85 hover:bg-surface`** — glassy but visible in light mode.
- Event row hover `bg-surface/40` → `bg-surface/60`.

### Background videos — re-encoded 2026-07-30 with the hard-cut loop (no fade)
`scripts/encode-bg-video.mjs` upgraded from "best end frame vs frame 0" to a
**(start, end) pair search** (head trim up to 20%, loop ≥ 50% of the clip; poster now
taken from the loop's first frame). Shipped from `~/Downloads/dark-mode.mp4` +
`light_mode.mp4`:
- **dark** 13.04s, frames [4, 317) — seam **0.75x** its own motion → invisible.
- **light** 12.88s, frames [9, 318) — seam **2.11x** (down from 2.96x). The graded light
  clip barely moves, so the ratio is strict: in absolute terms the seam is 0.75% raw and
  ~0.15% on screen under the 80% ivory veil, one frame every 12.9s — chosen over a
  pingpong loop, whose multi-second flow reversal would be far more visible than this.
Both verified playing on the page (webm picked, readyState 4). Production build passes.

**Dev server note:** port 3000 was occupied by something else on this machine — use
`npx next dev --port 3100`.

### Facts corrected this session — do not regress
- **Rotary theme 2026-27 is "Create Lasting Impact"** (RI President Olayinka "Yinka" H.
  Babalola, International Assembly 12 Jan 2026). `CONTENT.md` still carries the 2025/26
  theme throughout and needs a pass. Do **not** use material tied to Sangkoo Yun — he was
  originally selected for 2026-27, then resigned and died.
- **Two different founding dates.** The Interact movement was founded globally 5 Nov 1962;
  **Interact began in District 3220 in 1964.** `lib/site.ts` keeps both as
  `movementFounded` / `districtFounded`. District-facing copy uses 1964.
- Official Interact cyan is `#01B4E6`, sampled from the supplied logo. It **cannot carry
  text on a light background** (2.25:1) — light-mode text uses `cyan-700 #026B87`.

### Higgsfield
CLI and MCP installed and authenticated; 7 skills installed (project-scoped, in
`.agents/skills/`, gitignored). **Generation is currently blocked** by the API:
`free_trial_model_requires_plan` on a "plus" plan — this is an account/plan issue, not a
CLI one. Credits were consumed per generation despite an expected unlimited trial.
Prompts and settings for regenerating the background videos manually are in
[`design/higgsfield/VIDEO-BRIEF.md`](design/higgsfield/VIDEO-BRIEF.md).

### Remaining tasks
1. ~~Fix the avenues carousel~~ ✅ 2026-07-30 (root cause was the hero reveal).
2. ~~Verify the "Unverified" list; typecheck and production build~~ ✅ 2026-07-30.
3. ~~Re-encode the background videos~~ ✅ 2026-07-30 (pair-search hard cut).
4. Measure and refine `--hero-lid` against the veiled video.
5. Page transitions + apply the shared `Reveal` primitive consistently.
6. Image pipeline over the remaining ~150 council/archive/DIMUN assets (currently only the
   hero photo and avenue logos are optimised).
7. Accessibility sweep in **both** themes: computed contrast, focus visibility, keyboard
   paths through nav/accordion/rows, reduced-motion.
8. Verify on throttled mobile (mid-range Android is the real audience) + Lighthouse.
9. Build the remaining ~19 pages: About, Meet The Council 2026/27, College of DIRs,
   Calendar, Admin Documents, News, Newsletter, Archives (14 year pages), Media Crew,
   Contact.
10. Form back-ends: Contact, Request a Date, Media Crew request.

### Content still needed from the district
- **2026/27 council roster** — `CONTENT.md §5` is the 2025/26 council.
- **Current 2026/27 events** — every event in `CONTENT.md §3` has now passed.
- **Avenue photography** — five images would replace the logo watermarks standing in now.
- `dirs/dir-2016-17-chathula-fernando.jpg` still 403 on the Wix CDN.

---

## Earlier Status — 2026-06-15

**Phase:** Content discovery & asset capture (started).

### Done
- ✅ Crawled and documented all primary pages of the live site → [CONTENT.md](CONTENT.md).
- ✅ **Second pass — deep pages:** crawled all 14 live Archives sub-pages (2024-25, 2022-23, 2020-21, and 1988→2001 history) into [ARCHIVES.md](ARCHIVES.md); captured both full blog post bodies into [CONTENT.md §9](CONTENT.md#9-page-news--blog); deep-checked Admin Documents.
  - Found: index cards for **2023-24 and 2021-22 link to 404s**, and **1991/92 has no page** — logged in ARCHIVES.md.
- ✅ **Past-year councils:** found dedicated per-year council pages with portraits — captured **2024/25 (12 members)** and **2022/23 (31 members)** into [ARCHIVES.md → Past Councils](ARCHIVES.md#past-councils-with-member-portraits). (2023/24 & 2021/22 council pages 404.)
- ✅ **Full sitemap audit:** pulled `sitemap.xml` and all 3 child sitemaps; reconciled every URL in [CONTENT.md §20](CONTENT.md#20-full-site-path-audit). Found & documented a previously-missed **DIMUN '25 event section** (`/dimun25`, `/about-dimun25`, `/committees`, `/dimun25-registrations`, `/conference`) → [CONTENT.md §15](CONTENT.md), plus empty utility pages (`/event-list`, `/news-letter`, `/pricing-plans/list`) → §16. **100% of published paths now covered.**
- ✅ Catalogued every reachable image into [`images-manifest.js`](images-manifest.js) (**151 entries**: branding, avenues, decor, 38 current + 12 (2024/25) + 31 (2022/23) council portraits, 16 DIR portraits, media-crew, blog, 12 archive logos, 14 DIMUN images, social icons).
- ✅ Built two image downloaders:
  - **`download-images.js`** — Node 18+ script; bulk-downloads originals into `./images/<category>/`. Run: `node download-images.js`
  - **`download-images.html`** — open in a browser for an interactive gallery with per-image and "Download All" buttons (with "open original" fallback if CORS blocks a fetch).
- ✅ Ran `download-images.js` → **150 of 151** images saved to `./images/`. Verified across all categories.

### Known asset issue
- ⚠️ `dirs/dir-2016-17-chathula-fernando.jpg` (Wix id `9a1ed2_5cbbecbc2ffc4b499c770dd660d643e1~mv2.jpg`) returns **HTTP 403** on the CDN for every path (raw original, large transform, and the exact page thumbnail). The asset appears to have been removed/restricted on Wix. Needs a fresh source image from the council, or re-capture the live `src` in case the id changed.

### In progress / Next — remaining gaps (manual / JS-rendered)
- ⏳ Re-source the one blocked Chathula Fernando 2016/17 portrait.
- ⏳ Capture Admin Documents download URLs (District Directory 2025/26) — JS-rendered, not in HTML.
- ⏳ Export/transcribe the embedded **Calendar** widget events.
- ⏳ Capture Archives *index* council group-photo image IDs (`Council 24-25.jpg` … `Council 20-21.jpg`).
- ⏳ Verify the **1999/2000 council** roster (live page duplicates 1998/99).
- ⏳ Capture real **PDF download URLs** (1st & 3rd quarterly newsletters, directory).
- ⏳ Verify a few ambiguous **College of DIRs themes** against the live tables.

### Not started
- ▢ Design direction (style, palette, typography) for the new site.
- ▢ Tech stack decision for the rebuild.
- ▢ Page builds.
- ▢ Form back-ends (Contact, Request a Date, Media Crew request — see [CONTENT.md §15](CONTENT.md#15-forms-summary)).

---

## Files in this project
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions loaded by every Claude session, including the design-lock summary. |
| `CONTENT.md` | Full content inventory of the existing site — the migration source of truth. |
| `ARCHIVES.md` | Deep year-by-year detail for every Archives sub-page (1988→2025). |
| `HANDOFF.md` | This file — running status & decisions. |
| `design/DECISIONS.md` | **The locked design system.** Read before changing anything visual. |
| `design/reference/` | Screenshots of the approved home page, the visual ground truth. |
| `design/archive/` | Superseded design decisions. History only. |
| `design/directions.html`, `concepts.html`, `concept-blueprint.html` | The prototypes the direction was chosen from. |
| `images-manifest.js` | Shared list of all original images (id, friendly name, category, page, alt). |
| `download-images.js` / `.html` | Node bulk / browser image downloaders. |
| `public/images/` | Original full-resolution assets. |
| `app/`, `components/`, `lib/` | The Next.js site. |

## How to download the images
**Option A — Node (recommended, saves straight into `images/`):**
```powershell
node download-images.js
```
Requires Node.js 18+ (uses built-in `fetch`). Files land in `images/<category>/<friendly-name>`.

**Option B — Browser:**
Open `download-images.html` in any browser. Click **Download All** (saves to your Downloads folder), or download images individually. If a fetch is blocked by CORS, use the per-card **"view original ↗"** link to open and save manually.

---

## Open questions / decisions to confirm
- Target tech stack for the new site (e.g., Next.js + Tailwind, Astro, plain static)?
- Hosting/domain plan (keep `interactdistrictcouncil3220.org` / point the existing domain)?
- Should Facebook event albums be mirrored on-site or kept as outbound links?
- CMS need: will council/DIR/events/newsletter data be edited by non-developers (suggests a CMS or structured data files)?

## Change log
- **2026-10-06 (security)** — `npm audit fix`: Next 16.3.8 (critical RCE
  advisories), sharp 0.35.5, postcss 8.5.25, nanoid, source-map-js;
  `package.json` floors raised. See "Dependencies" under Current Status.
- **2026-10-06 (later)** — Merges into `main` verified (every branch contained,
  tree identical to the checked integration). Full-site audit and fixes on
  `fix/site-audit`; see "Site audit" under Current Status. DECISIONS §5–§6
  gain the dialog, focus-ring, hover-fill and autoplay rules and a motion map.
- **2026-10-06** — Whole site built in stacked PRs #2–#7 plus `pages/finish`:
  foundation (shared components, data, 301s), About / Council 2026/27 /
  College of DIRs, Archives (timeline, 18 years, 3 past councils), News /
  Newsletter / Admin Documents, Calendar (Google Calendar feed) / Request a
  Date / event pages (DIMUN '25), Media Crew / Contact, sitemap and robots.
- **2026-10-05** — Design direction locked at the user's request. `design/DECISIONS.md`
  rewritten from the code and a browser walk-through of the home page; old
  decisions archived to `design/archive/`; reference screenshots in
  `design/reference/`; `CLAUDE.md` added so every session loads the lock.
- **2026-08-03 (animation review + background retune)** — /review-animations pass:
  underline butt caps (stretched round caps read as end dots), press/hover timings
  brought into budget (150/200ms). Background rebalanced by live iteration:
  light media filter contrast(1.2) saturate(1.15), light veil 80 → 75.
- **2026-08-03 (later)** — Refinement pass on the locked pieces (DECISIONS.md Revision
  4.1): light-mode background media contrast boost (veil untouched), silkier aperture
  feather + richer ring, themed scrollbar + accent-color, title tracking/leading micro
  tighten, uppercase labels unified to 0.12em. Verified both themes; build green.
- **2026-08-03** — Home-page visual-style pass (DECISIONS.md Revision 4): hero underline
  stroke, magnetic button-in-button CTA, double-bezel tray/panel, avenue identity strips,
  Mask Wipe headings, film grain, stats scale-up, eyebrow + CTA-label cleanup. Both
  themes + mobile verified in-browser; production build green.
- **2026-07-30 (later)** — Carousel interactivity fixed (hero reveal was swallowing pointer
  events at opacity 0); full unverified batch checked in-browser both themes; design
  cleanliness pass (veil /80 light /70 dark, panels /85 + hairline) per user decision;
  videos re-encoded with pair-search hard-cut loop; production build green.
- **2026-06-15** — Initial content crawl, image manifest, downloaders, CONTENT.md and HANDOFF.md created.
- **2026-06-15** — Second pass: crawled all Archives sub-pages → ARCHIVES.md; captured full blog bodies; added 12 archive-logo images (93/94 downloaded); flagged 2 broken archive links + missing 1991/92.
- **2026-06-16** — Captured past-year council pages (2024/25 + 2022/23) with 43 member portraits → ARCHIVES.md Past Councils; manifest now 137 images (136 downloaded). Flagged 2023/24 & 2021/22 council pages as 404.
- **2026-06-16** — Full sitemap path audit (CONTENT.md §20): reconciled all 38 sitemap URLs. Found & documented the DIMUN '25 event section (§15) + 14 DIMUN images, and empty utility pages (§16). Manifest now **151 images (150 downloaded)**. All published paths covered.
