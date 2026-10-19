'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useHscrollPan } from '@/components/motion/use-hscroll-pan';
import { TIMELINE, TIMELINE_YEAR, type TimelinePhoto, type TimelineQuarter } from '@/lib/home';

/**
 * "The year so far, quarter by quarter": the Rotary year as a pinned
 * horizontal timeline, threaded by a Line Draw
 * (lab.damiandc.com/line-draw-scroll). Each quarter opens with a marker on the
 * line, then its photographs; a new quarter is a data change in `TIMELINE`.
 *
 * The line is generated from the same numbers that place the plates, so the
 * nodes sit exactly on each caption rather than being eyeballed. Geometry is
 * computed rather than measured: laying the strip out in flow and then reading
 * the DOM to draw through it means the line is wrong on the first frame and
 * again on every resize.
 *
 * `pathLength="1"` normalises the path, so drawing it is a 1 -> 0 dashoffset
 * whatever its real length turns out to be.
 *
 * Below md the whole thing collapses to a plain captioned stack. A pinned
 * sideways scroll on a 390px phone is a worse way to look at photographs than
 * simply scrolling down them.
 */
const STAGE_H = 660;
const GAP = 84;
const PAD_X = 96;
/** Extra room before every quarter after the first, so the quarters read as groups. */
const QUARTER_GAP = 72;
const MARKER_W = 200;

/**
 * Plate widths. Every plate keeps its photo's own ratio: the supplied photos
 * are graphics with the event title set into their lower quarter, and a crop
 * would cut it (2026-10-14).
 */
const WIDTH: Record<TimelinePhoto['size'], number> = { sm: 300, md: 360, lg: 440 };
/** Caption top for each drop. The image hangs below it. */
const TOP: Record<TimelinePhoto['drop'], number> = { top: 96, mid: 200, low: 300 };
const MARKER_TOP = TOP.mid;

type Node = { x: number; y: number; nodeX: number; nodeY: number };
type PlacedPhoto = Node & { kind: 'photo'; photo: TimelinePhoto; w: number; n: number };
type PlacedMarker = Node & { kind: 'quarter'; quarter: TimelineQuarter };

function layout(quarters: TimelineQuarter[]) {
  let cursor = PAD_X;
  let n = 0;
  const placed: (PlacedPhoto | PlacedMarker)[] = [];
  // The node is the diamond in the caption row: 3px in, and on the caption's
  // centre line (the caption is the figure's first row, so its centre is ~6px
  // below the figure's top), the same geometry as the Archives rail. Captions
  // are forced to a single line (whitespace-nowrap) so this stays
  // deterministic: a wrapped caption would move its own diamond.
  const node = (x: number, y: number): Node => ({ x, y, nodeX: x + 3, nodeY: y + 6 });
  quarters.forEach((quarter, qi) => {
    if (qi > 0) cursor += QUARTER_GAP;
    placed.push({ kind: 'quarter', quarter, ...node(cursor, MARKER_TOP) });
    cursor += MARKER_W + GAP;
    for (const photo of quarter.photos) {
      const w = WIDTH[photo.size];
      placed.push({ kind: 'photo', photo, w, n: ++n, ...node(cursor, TOP[photo.drop]) });
      cursor += w + GAP;
    }
  });
  return { placed, trackWidth: cursor - GAP + PAD_X };
}

/** Smooth cubic through the nodes, so the line reads as drawn, not plotted. */
function pathThrough(points: Node[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].nodeX} ${points[0].nodeY}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const cx = (a.nodeX + b.nodeX) / 2;
    d += ` C ${cx} ${a.nodeY}, ${cx} ${b.nodeY}, ${b.nodeX} ${b.nodeY}`;
  }
  return d;
}

/**
 * One backing for every label: each curve leaves its node horizontally and
 * would otherwise run through the caption text.
 */
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mb-2.5 flex items-center gap-2 md:whitespace-nowrap">
      <span aria-hidden="true" className="hidden size-1.5 shrink-0 rotate-45 bg-white/70 md:block" />
      <span className="label-micro bg-navy-900 text-white/55">{children}</span>
    </figcaption>
  );
}

export function PhotoWall() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const { placed, trackWidth } = layout(TIMELINE);
  const d = pathThrough(placed);

  useHscrollPan(railRef);

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-navy-900 text-white">
      <div className="container-page pt-16 md:pt-24">
        <h2 id="work-heading" className="max-w-[20ch] text-title">
          The year so far, quarter by quarter.
        </h2>
        <p className="mt-3.5 max-w-[56ch] text-white/70">
          The {TIMELINE_YEAR} Rotary year in photographs, added as each quarter closes.
        </p>
      </div>

      {/* Scroll distance scales with the track, so the pan runs at the same
          speed however many quarters there are (340vh held ~3,260px). */}
      <div className="hscroll relative mt-10 md:mt-14" style={{ ['--hscroll-h' as string]: `${Math.round(trackWidth / 9.6)}vh` }}>
        <div className="hscroll-pin md:sticky md:top-0 md:flex md:h-dvh md:items-center md:overflow-hidden">
          <div
            ref={railRef}
            className="hscroll-rail container-page flex flex-col gap-10 md:relative md:block md:px-0"
            style={{ ['--track' as string]: `${trackWidth}px` }}
          >
            {/* Desktop only: the drawn line threading the captions. */}
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${trackWidth} ${STAGE_H}`}
              // The base `svg { max-width: 100%; height: auto }` rule clamps
              // this to the rail's width and squashes the viewBox, so the
              // track-wide size has to be set explicitly here.
              style={{ width: trackWidth, height: STAGE_H, maxWidth: 'none' }}
              // left-0 top-0, NOT inset-0: `right: 0` would force the SVG to the
              // rail's own width and squash a track-wide viewBox into the
              // viewport, scaling the line down to nothing.
              className="pointer-events-none absolute top-0 left-0 hidden md:block"
            >
              <path
                className="hscroll-line"
                d={d}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.45"
                strokeWidth="1.25"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            </svg>

            <div
              className="contents md:relative md:block md:h-[var(--stage)] md:w-[var(--track)]"
              style={
                {
                  '--track': `${trackWidth}px`,
                  '--stage': `${STAGE_H}px`,
                } as React.CSSProperties
              }
            >
              {placed.map((p) => {
                // Geometry travels as custom properties and is only applied
                // from md up. Inline left/top/width would apply at every
                // breakpoint, and a 440px plate overflows a 390px phone.
                const at = {
                  '--x': `${p.x}px`,
                  '--y': `${p.y}px`,
                  '--w': `${p.kind === 'photo' ? p.w : MARKER_W}px`,
                } as React.CSSProperties;
                const place = 'w-full md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--w)]';

                if (p.kind === 'quarter') {
                  return (
                    <figure
                      key={p.quarter.label}
                      className={`${place} border-t border-white/20 pt-6 md:border-t-0 md:pt-0`}
                      style={at}
                    >
                      <Caption>{p.quarter.range}</Caption>
                      <h3 className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none font-semibold tracking-[-0.03em]">
                        {p.quarter.label}
                      </h3>
                    </figure>
                  );
                }

                const { photo } = p;
                return (
                  <figure key={photo.image.src} className={place} style={at}>
                    <Caption>
                      {String(p.n).padStart(2, '0')}
                      <span className="pl-2 text-white/80">{photo.caption}</span>
                    </Caption>
                    <div
                      className="relative overflow-hidden rounded-media bg-navy-800"
                      style={{ aspectRatio: `${photo.image.width} / ${photo.image.height}` }}
                    >
                      {/* The plate is the photo's own shape, so the plate width is the whole ask. */}
                      <Image
                        src={photo.image}
                        alt={photo.alt}
                        fill
                        sizes={`(max-width: 767px) 92vw, ${p.w}px`}
                        className="object-cover"
                      />
                    </div>
                  </figure>
                );
              })}
            </div>
          </div>

          {/* Inside container-page so the track starts and ends on the same
              gutters as the heading above it. */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-10 hidden md:block">
            <div className="container-page">
              <div className="hscroll-prog h-px bg-white/20">
                <i className="block h-full origin-left bg-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 md:h-0" />
    </section>
  );
}
