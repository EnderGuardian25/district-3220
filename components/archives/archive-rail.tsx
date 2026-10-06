'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { UNRECORDED_SPAN, type ArchiveYear } from '@/lib/archives';

/**
 * The archive as a pinned horizontal timeline, oldest on the left, threaded by
 * a Line Draw: the photo band's mechanic (components/home/photo-wall.tsx and
 * the PINNED HORIZONTAL SCROLL block in globals.css), applied to years.
 *
 * Geometry is computed, not measured, for the same reason as the photo band:
 * the line has to hit each plate's node on the first frame and on resize.
 *
 * Below md this renders nothing; the page shows a plain list instead, because
 * a sideways pin on a phone is a worse way to read nineteen years.
 */
const STAGE_H = 620;
const PLATE_W = 280;
const GAP = 72;
const PAD_X = 96;
const DROPS = [70, 190, 130, 250] as const;

type Plate =
  | { kind: 'year'; year: ArchiveYear }
  | { kind: 'span' };

export function ArchiveRail({ years }: { years: ArchiveYear[] }) {
  const railRef = useRef<HTMLDivElement | null>(null);

  // Oldest first, with the unrecorded 2001–2020 span between 2000/01 and 2020/21.
  const chronological = [...years].reverse();
  const plates: Plate[] = [];
  for (const y of chronological) {
    if (y.slug === '2020-21') plates.push({ kind: 'span' });
    plates.push({ kind: 'year', year: y });
  }

  const placed = plates.map((p, i) => {
    const x = PAD_X + i * (PLATE_W + GAP);
    const y = DROPS[i % DROPS.length];
    // The node is the caption's diamond: 3px in, and on the caption's centre
    // line (a 0.65rem micro-label at 1.2 leading is ~12.5px tall).
    return { plate: p, x, y, nodeX: x + 3, nodeY: y + 6 };
  });
  const trackWidth = PAD_X * 2 + plates.length * PLATE_W + (plates.length - 1) * GAP;
  const d = placed.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.nodeX} ${p.nodeY}`;
    const a = placed[i - 1];
    const cx = (a.nodeX + p.nodeX) / 2;
    return `${acc} C ${cx} ${a.nodeY}, ${cx} ${p.nodeY}, ${p.nodeX} ${p.nodeY}`;
  }, '');

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const pan = Math.max(0, rail.scrollWidth - window.innerWidth);
      rail.style.setProperty('--pan', `${pan}px`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    // Scroll distance scales with the plate count so the pan runs at about one
    // pixel sideways per pixel scrolled, whatever the number of years.
    <div className="hscroll relative hidden md:block" style={{ ['--hscroll-h' as string]: `${plates.length * 32 + 100}vh` }}>
      <div className="hscroll-pin md:sticky md:top-0 md:flex md:h-dvh md:items-center md:overflow-hidden">
        {/* Rail is viewport-wide with the track inside it, as in the photo band:
            the pinned version translates the rail, and the fallback (no
            scroll-timeline, or reduced motion) scrolls it sideways instead. */}
        <div ref={railRef} className="hscroll-rail relative w-full">
          <div className="relative" style={{ width: trackWidth, height: STAGE_H }}>
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${trackWidth} ${STAGE_H}`}
            style={{ width: trackWidth, height: STAGE_H, maxWidth: 'none' }}
            className="pointer-events-none absolute top-0 left-0"
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

          <ol>
            {placed.map(({ plate, x, y }) => (
              <li
                key={plate.kind === 'year' ? plate.year.slug : 'span'}
                className="absolute"
                style={{ left: x, top: y, width: PLATE_W }}
              >
                {plate.kind === 'year' ? <YearPlate year={plate.year} /> : <SpanPlate />}
              </li>
            ))}
          </ol>
          </div>
        </div>

        <div aria-hidden="true" className="hscroll-prog absolute inset-x-8 bottom-10 h-px bg-white/20 xl:inset-x-14">
          <i className="block h-full origin-left scale-x-0 bg-white/70" />
        </div>
      </div>
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-white/70" />
      {children}
    </p>
  );
}

function YearPlate({ year }: { year: ArchiveYear }) {
  const compiling = year.shape === 'compiling';
  return (
    <Link href={`/archives/${year.slug}`} className="group block">
      <Caption>
        <span className="label-micro text-white/80">{year.label}</span>
        {compiling && <span className="label-micro text-white/45">· Being compiled</span>}
      </Caption>
      {/* Year artwork sits on a near-white plate: these are logos and RI
          theme marks in their own colours, never placed straight on navy. */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-media transition-[translate] duration-[600ms] ease-out-expo group-hover:-translate-y-1 ${
          year.logo
            ? 'bg-chalk-50'
            : compiling
              ? 'border border-dashed border-white/30'
              : 'bg-navy-800'
        }`}
      >
        {year.logo ? (
          <Image src={year.logo} alt="" fill sizes="280px" className="object-contain p-6" />
        ) : (
          <span className="absolute inset-0 flex items-end p-5 font-display text-[2.4rem] leading-none font-semibold tracking-[-0.03em] text-white/85">
            {year.label.split('–')[0]}
          </span>
        )}
      </div>
      {year.theme && (
        <p className="mt-3.5 font-display text-[1.05rem] leading-snug text-white italic">“{year.theme}”</p>
      )}
      {year.dir && <p className="label-micro mt-2 text-white/55">DIR {year.dir}</p>}
    </Link>
  );
}

function SpanPlate() {
  return (
    <Link href="/college-of-dirs" className="group block" data-placeholder>
      <Caption>
        <span className="label-micro text-white/80">
          {UNRECORDED_SPAN.from} – {UNRECORDED_SPAN.to}
        </span>
      </Caption>
      <div className="flex aspect-[4/3] flex-col justify-end rounded-media border border-dashed border-white/30 p-5 transition-[translate] duration-[600ms] ease-out-expo group-hover:-translate-y-1">
        <span className="font-display text-[2.4rem] leading-none font-semibold tracking-[-0.03em] text-white/85">
          {UNRECORDED_SPAN.count} years
        </span>
      </div>
      <p className="mt-3.5 text-sm text-white/70">
        No archive pages were kept for these years. Their DIRs and themes are in the College of DIRs.
      </p>
    </Link>
  );
}
