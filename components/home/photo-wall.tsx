'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { WALL_ITEMS, type WallItem } from '@/lib/home';

/**
 * "A year of the district, in photographs" as a pinned horizontal collage,
 * threaded by a Line Draw (lab.damiandc.com/line-draw-scroll).
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

const WIDTH: Record<WallItem['size'], number> = { sm: 230, md: 310, lg: 420 };
const RATIO: Record<WallItem['size'], number> = { sm: 1.25, md: 0.75, lg: 0.68 };
/** Caption baseline for each drop. The image hangs below it. */
const TOP: Record<WallItem['drop'], number> = { top: 96, mid: 244, low: 372 };

type Placed = WallItem & {
  x: number;
  y: number;
  w: number;
  h: number;
  nodeX: number;
  nodeY: number;
};

function layout(items: WallItem[]) {
  let cursor = PAD_X;
  const placed: Placed[] = items.map((item) => {
    const w = WIDTH[item.size];
    const h = Math.round(w * (1 / RATIO[item.size]) * 0.75);
    const y = TOP[item.drop];
    const x = cursor;
    cursor += w + GAP;
    // The node is the diamond in the caption row. Captions are forced to a
    // single line (whitespace-nowrap) precisely so this stays deterministic:
    // a wrapped caption would move its own diamond and the line would miss it.
    return { ...item, x, y, w, h, nodeX: x + 3, nodeY: y - 16 };
  });
  return { placed, trackWidth: cursor + PAD_X };
}

/**
 * The plate is drawn object-cover, so a photo wider than its plate is scaled
 * to the plate's height and needs `aspect / plateAspect` times the plate's
 * width. Asking for the plate width alone served a 420px file into a tall
 * 420x463 plate (2.7x upscaled). Below md the plate is the stack's 92vw.
 */
function plateSizes(p: Placed) {
  const k = Math.max(1, p.aspect / (p.w / p.h));
  return `(max-width: 767px) ${Math.ceil(92 * k)}vw, ${Math.ceil(p.w * k)}px`;
}

/** Smooth cubic through the nodes, so the line reads as drawn, not plotted. */
function pathThrough(points: { nodeX: number; nodeY: number }[]) {
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

export function PhotoWall() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const { placed, trackWidth } = layout(WALL_ITEMS);
  const d = pathThrough(placed);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      // The rail is container-page: centred with a max width, so on screens
      // wider than 88rem it starts offsetLeft in from the edge. That offset
      // has to be panned too, or the last plate stops short, clipped.
      const pan = Math.max(0, rail.offsetLeft + rail.scrollWidth - window.innerWidth);
      rail.style.setProperty('--pan', `${pan}px`);
    };
    measure();
    // offsetLeft and scrollWidth can change without a window resize (fonts
    // loading, the scrollbar appearing), so watch the rail itself too.
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-navy-900 text-white">
      <div className="container-page pt-16 md:pt-24">
        <h2 id="work-heading" className="max-w-[20ch] text-title">
          A year of the district, in photographs.
        </h2>
        <p className="mt-3.5 max-w-[56ch] text-white/70">
          Assemblies, training, media crew and club projects across nine zones.
        </p>
      </div>

      <div className="hscroll relative mt-10 md:mt-14">
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
              {placed.map((p, i) => (
                // Geometry travels as custom properties and is only applied
                // from md up. Inline left/top/width would apply at every
                // breakpoint, and a 420px plate overflows a 390px phone.
                <figure
                  key={p.src}
                  className="w-full md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--w)]"
                  style={
                    {
                      '--x': `${p.x}px`,
                      '--y': `${p.y}px`,
                      '--w': `${p.w}px`,
                    } as React.CSSProperties
                  }
                >
                  <figcaption className="mb-2.5 flex items-center gap-2 md:whitespace-nowrap">
                    <span
                      aria-hidden="true"
                      className="hidden size-1.5 shrink-0 rotate-45 bg-white/70 md:block"
                    />
                    {/* Labels sit on the band colour: each curve leaves its
                        node horizontally, and ran through the caption text. */}
                    <span className="label-micro bg-navy-900 text-white/55">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="label-micro bg-navy-900 text-white/80">
                      {p.caption}
                      {p.year ? `, ${p.year}` : ''}
                    </span>
                  </figcaption>
                  <div
                    className="relative overflow-hidden rounded-media bg-navy-800"
                    style={{ aspectRatio: `${p.w} / ${p.h}` }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes={plateSizes(p)}
                      className="object-cover"
                    />
                  </div>
                </figure>
              ))}
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
