# HANDOFF — Interact District 3220 Website Rebuild

> Living document. Update as the project progresses. Most-recent status at the top of each section.

**Project:** Rebuild https://www.interactdistrict3220.org with a modern, mobile-first design.
**Old stack:** Wix (outdated visuals, not mobile-friendly).
**Goal:** Migrate all existing content (see [CONTENT.md](CONTENT.md)) onto a new, responsive site; layer new content on top.

---

## Current Status — 2026-06-15

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
| `images/` | (Created on first download run) Original full-resolution assets. |

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
