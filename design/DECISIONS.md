# Design Decisions — Interact District 3220 rebuild

> **LOCKED 2026-09-14. Re-confirmed by the user 2026-10-05: "make sure we don't
> deviate from the theme we have built the current home page on."**
>
> The home page as built on `main` **is** the design system. Every new page
> extends it; nothing here is reopened by a new page, a new section or a new
> session. Changing anything in §1–§6 needs the user's explicit approval, and
> the approval gets recorded here as a dated revision.
>
> When this file and the code disagree, the code on `main` is what was approved:
> stop and ask, do not "fix" either one silently.
>
> - Ground truth, visual: [`reference/`](reference/), screenshots of the live home page at
>   1440×900, taken 2026-10-05. Compare new work against them side by side.
> - Ground truth, values: `app/globals.css`. Every hex below is copied from it.
> - History: the earlier navy + cyan / Outfit / dark-mode / silk-video direction
>   is archived in [`archive/DECISIONS-2026-07-to-08.md`](archive/DECISIONS-2026-07-to-08.md).
>   **Nothing in it is current.** Do not build from it.

---

## 1. The direction in one paragraph

Printed paper, not a dashboard. Warm chalk background, near-black ink text,
Fraunces serif headings, and **one** blue accent (Signal). Dark blue (navy-900)
is the deep colour: it carries the full-bleed photography band and the closing
panel. The officers band alone is warm near-black, because it marks the
members' half of the site. Colour is rationed so that layout, type and
photography do the work. Light theme only.

## 2. Colour

### Surfaces: what each band of a page is painted with

| Surface | Value | Used for | Text on it |
|---|---|---|---|
| **Chalk** (`bg`) | `#F7F5F0` | The page. Default for every section. | `content` `#17150F` (16.63) |
| **Paper** (`surface`) | `#FFFDFA` | Raised cards on chalk | `content` |
| **Sunk** (`sunk`) | `#EFECE4` | Recessed bands | `content` |
| **Navy band** (`navy-900`) | `#0A1628` | Full-bleed photography sections; the rounded closing CTA panel; image fallback behind photo tiles | `white`, muted `white/70–75` |
| **Ink band** (`ink-panel`) | `#14120D` | **Only** the members/officers utility band | `on-ink` `#F2EFE8` (15.9), muted `on-ink-muted` `#A09A8D` (6.21) |
| **Photograph** | — | Hero, project tiles | White over a `chalk-950` gradient scrim |

Rules:
- **Chalk is the default.** A page is mostly chalk; dark bands are punctuation.
  On the home page the order is chalk → navy (photographs) → ink (officers) →
  chalk holding the navy closing panel. The navy-to-ink handoff is deliberate:
  it marks the move from the public half to the members' half.
- **Navy-900 is the only blue surface.** Not a gradient, not signal. The rest
  of the navy ramp is structural only: `navy-800` at 30% for `DrawLine`
  hairlines and as the `draft-grid` rule colour, `navy-800` as an image
  placeholder inside a navy band, `navy-900/8` as the dropdown menu shadow.
- **Ink band is reserved.** It means "you're in the members' working tools".
  Don't use it as a general dark section; use navy-900 for that.

### Accent: Signal blue, one hue in four roles

| Role | Token | Value | Use |
|---|---|---|---|
| Mark | `accent` | `#2E7DF6` (signal-500) | Nav active underline, morph cursor, small graphic marks, meta labels on dark photo scrims. **Never a button fill with white text (3.90, fails).** |
| Fill | `accent-fill` | `#155FD9` (signal-600) | Primary button background; officers tile hover fill. White label 5.78. |
| Text | `accent-text` | `#124AAD` (signal-700) | Links and inline accents on chalk (7.30). Also the focus ring. |
| Soft | `accent-soft` | `#EFF5FF` (signal-50) | Tinted backgrounds, sparingly |
| On photo | `signal-400` | `#5B90F8` | The highlighted phrase in the hero headline over photography |

There is **no second accent colour.** No cyan, no orange, no gradients between
hues. The official Interact cyan `#01B4E6` exists only inside the supplied logo
artwork in the header and footer.

### Avenue identity colours

Sampled from the logo artwork. They appear **only** on their own avenue (the
accordion's label band and its tint), never as palette colours elsewhere:
Community `#D8951C` · International `#97114B` · Club `#A85619` ·
Green Life `#187777` · Finance `#1B244A`.

### Contrast values that look wrong and are right. Do not "tidy" them.
- Button fill is signal-**600**, not 500 (white on 500 = 3.90, fails AA).
- Micro-labels use chalk-**700** `#6E695E` (5.02); chalk-600 is 2.92 and fails.
- Control borders are chalk-500 `#D6D1C4` (3.02, clears 3:1).
- Community Service band: white on `#D8951C` ≈ 2.6, **fails AA, white by
  explicit request.** If it must pass: darken that band only to `#A86F12`.

## 3. Typography

| Role | Face | Spec |
|---|---|---|
| Display / headings (h1–h4) | **Fraunces 600** | Never heavier than 600: it tips into "over the top". `text-display`: clamp(2.35rem, 5.2vw, 4.6rem), leading 1.06, tracking −0.02em. `text-title`: clamp(1.6rem, 3.1vw, 2.5rem), leading 1.1, tracking −0.018em. |
| Body, nav, buttons | **Instrument Sans** | 400 body at leading 1.6; 500–600 for nav and buttons |
| Micro-labels | system monospace, uppercase | The `label-micro` utility only: 0.65rem, tracking 0.14em. Numbering (`01`, `02`), captions, stat labels, tile meta. |

Section headings are full sentences ending in a full stop
("Five avenues of service.", "For Interactors and club officers."), capped at
`max-w-[20ch]`, followed by one muted sentence at `max-w-[56ch]`.

## 4. Shape and layout

- **Controls are pills** (`rounded-control`, 999px). Every button and nav chip.
  The morph cursor parks on pills, so a square control is a bug.
- **Photographs and tiles** `rounded-media` 18px. **Cards, trays, bands**
  `rounded-panel` 20px. Nothing square.
- Page width: `container-page` (max 88rem; gutters 1.125 / 2 / 3.5rem).
- Section rhythm: `py-16 md:py-24`.
- Section header pattern: heading, muted lede, then a `DrawLine` hairline, then content.
- Dividers are hairlines (`chalk-400`), not shadows. The one shadow on the
  site is the floating nav dropdown (`shadow-xl shadow-navy-900/8`). No glass,
  no blur, no film grain, no glow.

## 5. Components (reuse, don't re-invent)

- **`Button`** (`components/ui/button.tsx`) is the only button. Tones:
  `primary` / `ghost` on chalk, `onPhoto` / `onPhotoGhost` over photography,
  `onInk` / `onInkGhost` on dark bands. Pick a tone; never override colours.
- **`Reveal`** / **`DrawLine`** (`components/motion/reveal.tsx`) for enter
  motion: 550ms, `ease-out-expo`, 18px rise, 70ms stagger steps.
- **Header:** transparent over a hero photograph at rest, solid chalk with a
  hairline from the first scroll. Active nav item gets a Signal underline.
- **Footer:** chalk, three columns, micro-label headings, theme line in `accent-text`.

## 6. Motion

Effects come from `lab.damiandc.com`, and the home page set is the whole
vocabulary: **Clip Reveal** (hero), **Odometer Roll** (stats), **Expand Grid**
with a shared-element handoff (projects), **Accordion Gallery** (avenues),
**pinned horizontal scroll + Line Draw** (photographs), **Morph Cursor**
(sitewide, fine pointer only). Inner pages reuse these. A new effect is a
design change (see the top of this file).

- Hover/press 200ms (300ms for the header's colour change); enters
  550–1150ms on `ease-out-expo`; clip moves on `ease-clip`.
- Everything is reachable by `prefers-reduced-motion`, and the morph cursor is
  off on touch. The audience is mid-range Android, so this is a performance
  rule too.

## 7. Never (each of these has been tried or proposed and rejected)

- A dark theme, or a theme toggle.
- Cyan as an accent, Outfit, or any second sans/serif family.
- Navy as the page background; navy anywhere other than the bands named in §2.
- Orange, purple or any accent hue other than Signal (avenue colours excepted, on their own avenue).
- Background video, animated canvases, silk/aurora fields, film grain, glassmorphism, glows, blooms.
- Card-heavy dashboard layouts; drop shadows as the main separator.
- Square buttons; Fraunces above 600.
- Referencing ramp colours (`navy-*`, `signal-*`, `chalk-*`) in new components
  when a semantic token exists. Known exceptions already on the home page:
  `bg-navy-900` for dark bands, `text-signal-400` in the hero, `chalk-950` scrims.

---

## 8. Still in force from before the redesign

**Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4 (CSS-first
`@theme`), Framer Motion 12 + Lenis. Hosting not decided; the build stays
host-agnostic.

**Navigation:** labels and order identical to the Wix site. Clean URLs with 301s
from every old path (`next.config.ts`).

| Label | New URL | Old Wix URL |
|---|---|---|
| Home | `/` | `/` |
| About | `/about` | `/about` |
| → Meet The Council 2026/27 | `/council/2026-27` | `/meet-the-council-2025-26` |
| → College of DIRs | `/college-of-dirs` | `/college-of-dirs` |
| Calendar | `/calendar` | `/district-calendar` |
| Admin Documents | `/admin-documents` | `/admin-documents` |
| News | `/news` | `/blog` |
| → Newsletter | `/newsletter` | `/newsletter` |
| Archives | `/archives` | `/archives` |
| Media Crew | `/media-crew` | `/media-crew` |
| Contact | `/contact` | `/contact-8` |

**Content facts:**
- Rotary theme 2026-27 is **"Create Lasting Impact"** (RI President Olayinka
  "Yinka" H. Babalola). Do not use material tied to Sangkoo Yun.
- Interact was founded globally 5 Nov 1962; **in District 3220 in 1964.**
  District-facing copy uses 1964. `lib/site.ts` keeps both.
