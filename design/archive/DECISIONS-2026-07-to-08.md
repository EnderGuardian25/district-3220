> **SUPERSEDED 2026-09-14. Do not build from this file.** It records the navy + cyan / Outfit / dark-mode / silk-video direction that the current home page replaced. The locked direction is in [`../DECISIONS.md`](../DECISIONS.md). Kept only as history.

# Design Decisions — Interact District 3220 rebuild

> **Revision 4.1 — 2026-08-03 (later).** Refinement pass on the locked pieces themselves
> (user-approved; identities unchanged).
>
> - **Light-mode wave visibility:** `contrast(1.2) saturate(1.15)` on the background
>   MEDIA layer (`.site-bg-poster` + `#site-bg-video`), light mode only, paired with the
>   light veil eased **80% → 75%**. Settled by live iteration: 1.35/80 read too punchy,
>   pure veil-thinning risks the Revision 3 milky-haze problem — this splits the
>   difference. Dark mode carries no filter and keeps its 70% veil.
> - **Animation review fixes** (via /review-animations): headline underline uses butt
>   caps — `preserveAspectRatio="none"` stretches round caps into elliptical "dots";
>   CTA press feedback 300 → 150ms (press budget is 100–160ms); arrow-chip hover
>   500 → 200ms; event-date hover tint 300 → 200ms.
> - **Aperture:** feather 4.5% → 6.5% of radius (min 2px) — silkier edge; ring
>   `cyan-400/80` with an added inner glow. Mechanic, geometry and pin unchanged.
> - **Palette reach:** `scrollbar-color` (navy-300 light / navy-600 dark thumb) and
>   `accent-color: var(--accent)` for native form controls. No token values changed.
> - **Type:** `--text-title` line-height 1.12 → 1.1, tracking −0.024 → −0.026em; all
>   uppercase micro-labels unified to `tracking-[0.12em]` (were a mix of 0.10/0.12/0.13).

> **Revision 4 — 2026-08-03.** Visual-style pass (user-approved direction: "keep the
> aesthetic, make it more expensive"). Palette, type family, aperture reveal and the silk
> background all untouched; everything below is execution depth on top of them.
>
> - **Display max 5.25 → 5.75rem** — the headline is three words, which earns the scale.
> - **Hero:** animated cyan underline stroke under the last headline word (full-strength
>   brand cyan — decorative graphics are exempt from the light-mode contrast rule); radial
>   cyan bloom behind the copy (pure gradient, deliberately no blur filter — the aperture
>   re-rasterises the lid per frame); primary CTA is button-in-button (arrow in a nested
>   chip) with `active:scale-[0.98]` and **magnetic hover** (`components/motion/magnetic.tsx`,
>   fine pointers only, motion-values so tracking never re-renders); split edge is a cyan
>   gradient hairline; photo caption in a glass chip.
> - **Double-bezel surfaces** — the avenues accordion sits in a machined tray
>   (24px cards + 8px padding = 32px shell, concentric radii) and the closing CTA panel is
>   nested the same way (28px + 6px = 34px). Collapsed avenue rails carry a 3px identity
>   strip in the avenue's own colour; the expand animation is a near-critically-damped
>   spring (170/26 — no overshoot into negative flexGrow).
> - **Mask Wipe** heading reveal (§5's planned item) built as
>   `components/motion/mask-wipe.tsx` — wrapper div animates the clip so heading ids keep
>   serving `aria-labelledby`. Applied to avenues + events headings.
> - **Stats numerals 2.75 → 3.5rem max** with hairline column dividers.
> - **Film grain** — static SVG noise tile, fixed layer, 4.5% light / 6% dark. No
>   animation, no blend mode: composites once, free on mid-range Android.
> - **Copy discipline:** eyebrows rationed 4 → 2 (hero + Get involved); one CTA label per
>   destination ("About the district", "See what's on"); em-dash removed from hero copy.

> **Revision 3 — 2026-07-30.** Cleanliness pass, user-approved direction: silk background
> stays visible but toned down; glassy surfaces stay glassy but must be *present*.
>
> - Background veil `bg-bg/62` → **`/80` light, `/70` dark**. At 62% the light theme read
>   as milky haze — ivory never appeared and sections didn't separate from the moving
>   ground.
> - Collapsed avenue panels: `bg-surface/85` + `border-hairline` (were /55, borderless —
>   invisible over light silk). Event-row hover `/40` → `/60`.
> - Background videos re-encoded with the measured **hard-cut loop** (no cross-fade),
>   found by a (start, end) pair search. Dark seam 0.75x its own motion (invisible);
>   light 2.11x — but 0.75% absolute and ~0.15% under the 80% veil, preferred over a
>   pingpong loop's visible flow reversal.

> **Revision 2 — 2026-07-29.** Superseding changes after first review, newest first.
> The palette/type tables further down are still the base; these override them.
>
> - **Accent is now the official Interact cyan `#01B4E6`**, sampled from the supplied
>   logo. It CANNOT carry text on a light background (2.25:1), so light-mode text and
>   links use `cyan-700 #026B87` (5.62) while full-strength cyan is reserved for graphics,
>   glows and dark-mode accents. Replaces the invented "Signal" blue.
> - **Warm neutrals.** Light bg is now ivory `#F7F6F3` (was cool grey), dark bg `#0A0E14`
>   with `#141A24` surfaces and warm off-white `#EDEBE6` text. Cool grey + blue was
>   reading like a dashboard. **Control borders stay cool navy** — every warm grey tested
>   topped out at 2.72 against ivory and failed the 3:1 boundary rule.
> - **Softer shape language.** `--radius-control` 14px, `--radius-card` 24px,
>   `--radius-panel` 28px.
> - **Typography unchanged (Outfit).** Flagged that a geometric sans is the main reason
>   the design reads "techy"; the call was to keep it and fix colour/shape/spacing
>   instead. If it still reads techy, typography is the remaining lever.
> - **Card-driven layout removed.** Events are editorial rows with hairline dividers;
>   stats are bare figures; the only remaining panel is the closing CTA.
> - **Full-viewport split hero** — copy left, assembly photo bleeding to the right
>   viewport edge, header overlaying with a legibility scrim (nav text was unreadable
>   over the bright LED wall without it).
> - **Background is a live animated canvas**, not an image or video. 192×108 field,
>   CSS-blurred and scaled, ~30fps, paused when the tab is hidden, single static frame
>   under reduced-motion or on coarse pointers. Video was rejected for the stated
>   "must not lag" requirement on mid-range Android.
> - **Avenues accordion is theme-aware** — light surfaces in light mode instead of navy
>   cards in both.
> - Higgsfield generation is **blocked** (`free_trial_model_requires_plan`). Video brief
>   for manual generation is in `design/higgsfield/VIDEO-BRIEF.md`; the canvas needs no
>   video, so a video is a straight swap-in, not a rebuild.

> Locked 2026-07-29. Chosen from [`design/directions.html`](directions.html) (interactive comparison of
> 5 palettes × 6 type pairings). Every contrast ratio below is computed against the WCAG 2.1
> formula, not estimated.

---

## 1. Stack

| | |
|---|---|
| Framework | **Next.js** (App Router, TypeScript) |
| Styling | **Tailwind CSS v4** |
| Motion | **Framer Motion 12** + **Lenis** (smooth scroll) |
| Rationale | Matches `EnderGuardian25/personal-portfolio` (the effects lab at lab.damiandc.com), so its 70 effects lift across with their tuning intact instead of being re-derived. Astro would ship less JS but every effect would need porting to vanilla GSAP, and cross-page transitions would need rebuilding on View Transitions. |
| Hosting | **Deferred** — build stays host-agnostic for now. |

## 2. Navigation

Labels and order identical to the Wix site. URLs cleaned; **301 redirects from every old path.**

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

Council year label rolls to **2026/27**; the 2025/26 roster moves into Archives.

## 3. Colour — "Signal"

Deep navy anchor with a single bright blue accent. The quietest of the five directions:
near-monochrome, so layout and typography carry the interest rather than colour contrast.

### Navy (structure, text, surfaces)
```
50  #F4F7FA    100 #E5EBF2    200 #C8D5E4    300 #9FB3CC
400 #6E88AB    500 #4A6489    600 #33496B    700 #223451
800 #16243B    900 #0A1628 ← anchor    950 #050C17
```

### Signal (actions and highlights ONLY — never decoration)
```
50  #EFF5FF    100 #DBE7FE    200 #BAD1FD    300 #8DB2FB
400 #5B90F8    500 #2E7DF6    600 #155FD9    700 #124AAD
800 #133E8A    900 #14356D
```

### Semantic tokens — verified

| Token | Light | ratio | Dark | ratio |
|---|---|---|---|---|
| `bg` | `#F4F7FA` | — | `#050C17` | — |
| `surface` | `#FFFFFF` | — | `#0C1A2E` | — |
| `text` | `#0A1628` | **16.86** on bg | `#E5EBF2` | **16.33** on bg |
| `text-muted` | `#33496B` | **8.47** | `#9FB3CC` | **9.14** |
| `border-hairline` | `#C8D5E4` | 1.39 *(decorative — exempt from 1.4.11)* | `#1C2E47` | 1.43 *(same)* |
| `border-control` | `#6E88AB` | **3.38** *(need 3.0)* | `#4A6489` | **3.24** *(need 3.0)* |
| `accent-fill` | `#155FD9` | white label **5.72** | `#5B90F8` | navy label **5.86** |
| `accent-text` | `#155FD9` | **5.32** | `#8DB2FB` | **9.23** |
| `focus-ring` | `#155FD9` | **5.32** | `#8DB2FB` | **9.23** |
| `danger` | `#CC1F1F` | **5.16** | `#F87171` | **7.09** |

**Two corrections found during verification — do not regress these:**
- White on `signal-500` `#2E7DF6` is only **3.90** → **fails**. The light primary button must use
  `signal-600` `#155FD9` (5.72). Using 500 with white text is the obvious-looking mistake here.
- `#DC2626` on the light background is **4.49** → **fails by 0.01**. Danger colour is `#CC1F1F`.

**Dark mode rule:** dark surfaces are near-neutral with a *navy cast* (`#050C17` / `#0C1A2E`), not
saturated navy. Saturated navy surfaces collapse text contrast and read as a dated intranet.

**Theme behaviour:** follows `prefers-color-scheme` on first visit; nav toggle overrides and persists;
resolved before first paint so there is no flash of the wrong theme.

## 4. Typography — Outfit, single family

One geometric sans across the whole site. Hierarchy comes from **weight and scale alone** — there is
no serif to fall back on, so spacing and layout must do more work.

| Role | Weight | Notes |
|---|---|---|
| Display | 600 | `line-height: 1.06`, `letter-spacing: -0.032em` — tight tracking is what keeps Outfit from looking generic at large sizes |
| Heading | 600 | |
| Body | 400 | `line-height: 1.65` |
| Body light | 300 | Long-form prose only |
| Label / eyebrow | 500 | 11px, `letter-spacing: 0.13em`, uppercase |

Loaded as a single variable font file — the cheapest of the six pairings, which buys budget back for
the 150 images and the motion.

## 5. Motion — "bold but disciplined"

Roughly 6–8 effects used consistently, not 20 competing. All respect `prefers-reduced-motion`;
cursor and heavy scroll effects disable on touch/mobile.

| Where | Effect (from the lab) |
|---|---|
| Hero | Gradient Field or Aurora Veil — *to pick during build* |
| Five Avenues | **Accordion Gallery** ← the headline ask |
| Section headings | Mask Wipe reveal |
| Cards | Tilt & Glare + Glow |
| Stats | Odometer Roll (3,500 / 100+ / 9) |
| Page transition | Iris or Curtain |
| Nav + CTA | Magnetic Dock |
| Mobile | Scroll reveals only |

## 6. Content facts

- **Rotary theme 2026-27: "Create Lasting Impact"** — announced by RI President-elect
  Olayinka "Yinka" H. Babalola, International Assembly, 12 Jan 2026.
  ⚠ `CONTENT.md` still carries the 2025/26 theme ("Unite For Good") throughout — needs a pass.
  ⚠ Do not use material tied to Sangkoo Yun (originally selected for 2026-27; resigned, since died).
- District: ~3,500 members, 100+ clubs, 9 zones, Sri Lanka & Maldives, Interact founded 5 Nov 1962.

## 7. Open items

- [ ] **5 avenue photographs** — `images/avenues/` holds icons only; the accordion carousel needs real
      photos, one per avenue. Blocking a finished home page.
- [ ] Home events feed content — everything captured in `CONTENT.md §3` is from the 2025/26 year and
      now past. Needs current 2026/27 events.
- [ ] 2026/27 council roster — `CONTENT.md §5` is the 2025/26 council.
- [ ] `dirs/dir-2016-17-chathula-fernando.jpg` still 403 on the Wix CDN (see `HANDOFF.md`).
- [ ] Form back-ends for Contact, Request a Date, Media Crew request.
