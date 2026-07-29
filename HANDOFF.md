# HANDOFF — Interact District 3220 Website Rebuild

> Living document. Update as the project progresses. Most-recent status at the top of each section.

**Project:** Rebuild https://www.interactdistrict3220.org with a modern, mobile-first design.
**Old stack:** Wix (outdated visuals, not mobile-friendly).
**Goal:** Migrate all existing content (see [CONTENT.md](CONTENT.md)) onto a new, responsive site; layer new content on top.

---

## Current Status — 2026-07-30

**Phase:** Site build. Home page substantially built; design direction locked.

> **START HERE NEXT SESSION:** the avenues image carousel is still visually broken.
> See [Known broken](#known-broken--fix-first) below. Do not trust my last diagnosis —
> it was made from source, not from the browser, and the fix did not resolve it.

### Tech stack (decided)
| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Motion | Framer Motion 12 + Lenis |
| Media | sharp, ffmpeg-static, ffprobe-static |
| Hosting | **Not decided** — build is host-agnostic |

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

### Known broken — FIX FIRST
1. **Avenues image carousel is visually broken.** Reported twice. I rewrote
   `components/home/avenues-accordion.tsx` addressing four real source-level defects
   (clipped logo plate in the 84px collapsed rail, an invisible full-height paragraph
   still being laid out, a crushed index number, absolute+rotate label swapped for
   `writing-mode`). The rewrite is on disk and hot-reloaded, **but the problem persists.**
   Strongest untested hypothesis: the panels are too translucent to see —
   `bg-surface/55` collapsed is ~55% white over pale silk in light mode, so the rail may
   read as logos floating with no panel behind them. **Open the page and look before
   changing anything.**

### Unverified — a tool outage blocked all checking
The sandbox safety classifier went down partway through the session, blocking every
command and browser tool (read-only tools still worked). Everything below is written but
**never typechecked, built, or seen**:
- The carousel rewrite.
- Closing CTA made theme-aware (was hardcoded navy on a light page).
- `--hero-runway` 100svh; aperture centred at 50%/50% instead of drifting.
- `--hero-lid` navy for dark mode — a **reasoned pick from the ramp, not a measured
  match** to the video. Measure the veiled video mean and refine.
- Navbar snap fix (backdrop-filter cross-faded by opacity instead of class swap).
- Odometer digit-grouping fix (a year was rendering as "1,964" mid-count).
- `scripts/encode-bg-video.mjs` rewritten to remove the cross-fade and instead SEARCH the
  interpolated timeline for the quietest hard cut. **The videos in `public/videos/` are
  from the OLD cross-fade version — re-run the script.**
- Light video grade lowered so the folds stay visible (was blowing out to 205/226/234).

**First commands to run next session:**
```powershell
npx tsc --noEmit
npx next dev --port 3000
node scripts/encode-bg-video.mjs "<dark.mp4>" "<light.mp4>"   # sources in ~/Downloads
```

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
1. **Fix the avenues carousel** (see above) — first job.
2. Verify everything in the "Unverified" list; run typecheck and a production build.
3. Re-encode the background videos with the new no-cross-fade script.
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
| `CONTENT.md` | Full content inventory of the existing site — the migration source of truth. |
| `ARCHIVES.md` | Deep year-by-year detail for every Archives sub-page (1988→2025). |
| `HANDOFF.md` | This file — running status & decisions. |
| `images-manifest.js` | Shared list of all original images (id, friendly name, category, page, alt). |
| `download-images.js` | Node bulk downloader → `./images/<category>/`. |
| `download-images.html` | Browser-based image downloader (interactive gallery). |
| `public/images/` | Original full-resolution assets (moved from `images/` when the site was scaffolded). |
| `design/DECISIONS.md` | **Locked design decisions** — palette with verified contrast, type, motion, URL map. Read before changing anything visual. |
| `design/directions.html` | The interactive palette/type comparison the direction was chosen from. |
| `design/higgsfield/VIDEO-BRIEF.md` | Prompts + settings for regenerating the background videos. |
| `scripts/encode-bg-video.mjs` | Encodes background renders to web loops; finds the seamless cut by measurement. |
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
- **2026-06-15** — Initial content crawl, image manifest, downloaders, CONTENT.md and HANDOFF.md created.
- **2026-06-15** — Second pass: crawled all Archives sub-pages → ARCHIVES.md; captured full blog bodies; added 12 archive-logo images (93/94 downloaded); flagged 2 broken archive links + missing 1991/92.
- **2026-06-16** — Captured past-year council pages (2024/25 + 2022/23) with 43 member portraits → ARCHIVES.md Past Councils; manifest now 137 images (136 downloaded). Flagged 2023/24 & 2021/22 council pages as 404.
- **2026-06-16** — Full sitemap path audit (CONTENT.md §20): reconciled all 38 sitemap URLs. Found & documented the DIMUN '25 event section (§15) + 14 DIMUN images, and empty utility pages (§16). Manifest now **151 images (150 downloaded)**. All published paths covered.
