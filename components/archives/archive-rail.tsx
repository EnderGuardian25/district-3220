'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useHscrollPan } from '@/components/motion/use-hscroll-pan';
import { UNRECORDED_SPAN, type ArchiveYear } from '@/lib/archives';
import { keepTogether } from '@/components/people/keep-together';

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

  /**
   * Keyboard focus. The pin is overflow-clip rather than overflow-hidden: a
   * hidden-overflow box is still a scroll container, so tabbing to an
   * off-screen year made the browser scroll it sideways, and that offset then
   * stacked on the scroll-driven pan for the rest of the section. Instead, a
   * focused year scrolls the PAGE to the point in the pan where that year sits
   * mid-screen. Only while the pan is actually running; in the fallback
   * layouts the rail is an ordinary sideways scroller and focus works natively.
   */
  const onFocusIn = (e: React.FocusEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const section = rail?.closest<HTMLElement>('.hscroll');
    const target = e.target as HTMLElement;
    const li = target.closest('li');
    // Keyboard focus only: a mouse click also focuses the link, and must not
    // re-centre the pan in the instant before it navigates.
    if (!target.matches(':focus-visible')) return;
    if (!rail || !section || !li || getComputedStyle(rail).animationName !== 'hscroll-pan') return;
    const pan = parseFloat(rail.style.getPropertyValue('--pan')) || 0;
    const range = section.offsetHeight - window.innerHeight;
    if (pan <= 0 || range <= 0) return;
    const centre = rail.offsetLeft + li.offsetLeft + li.offsetWidth / 2 - window.innerWidth / 2;
    const progress = Math.min(1, Math.max(0, centre / pan));
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop + progress * range, behavior: 'instant' });
  };

  useHscrollPan(railRef);

  return (
    // Scroll distance scales with the plate count so the pan runs at about one
    // pixel sideways per pixel scrolled, whatever the number of years.
    <div className="hscroll relative hidden md:block" style={{ ['--hscroll-h' as string]: `${plates.length * 32 + 100}vh` }}>
      <div className="hscroll-pin md:sticky md:top-0 md:flex md:h-dvh md:items-center md:overflow-clip">
        {/* Rail is viewport-wide with the track inside it, as in the photo band:
            the pinned version translates the rail, and the fallback (no
            scroll-timeline, or reduced motion) scrolls it sideways instead. */}
        <div ref={railRef} onFocus={onFocusIn} className="hscroll-rail relative w-full">
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

        {/* Inside container-page so the track starts and ends on the same
            gutters as the heading and hairlines above it. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-10">
          <div className="container-page">
            <div className="hscroll-prog h-px bg-white/20">
              <i className="block h-full origin-left bg-white/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Each label carries the band colour behind it: every curve leaves its node
 * horizontally, so without this the line ran straight through the year text.
 */
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
        <span className="label-micro bg-navy-900 text-white/80">{year.label}</span>
        {compiling && <span className="label-micro bg-navy-900 text-white/60">· Being compiled</span>}
      </Caption>
      {/* Year artwork sits on a near-white plate: these are logos and RI
          theme marks in their own colours, never placed straight on navy. */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-media transition-[translate] duration-[600ms] ease-out-expo group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 ${
          year.logo
            ? 'bg-chalk-50'
            : compiling
              ? 'border border-dashed border-white/30 bg-navy-900'
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
      {year.dir && <p className="label-micro mt-2 text-white/55">DIR {keepTogether(year.dir)}</p>}
    </Link>
  );
}

function SpanPlate() {
  return (
    <Link href="/college-of-dirs" className="group block" data-placeholder>
      <Caption>
        <span className="label-micro bg-navy-900 text-white/80">
          {UNRECORDED_SPAN.from} – {UNRECORDED_SPAN.to}
        </span>
      </Caption>
      <div className="flex aspect-[4/3] flex-col justify-end rounded-media border border-dashed border-white/30 bg-navy-900 p-5 transition-[translate] duration-[600ms] ease-out-expo group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0">
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
