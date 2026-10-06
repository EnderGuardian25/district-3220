'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_FOCUS, type Person } from '@/lib/people';

/**
 * Expand Grid (lab.damiandc.com/expand-grid) for people, the same mechanic as
 * the home page's project tiles: opening a profile hands the portrait itself
 * from the card into the panel via a shared `layoutId`, rather than fading a
 * new panel in over the grid.
 *
 * "To be announced" slots render as plain cards and never open.
 *
 * `scope` keeps layoutIds unique when two grids share a page, e.g. one per
 * council group.
 */
export function PeopleGrid({ people, scope }: { people: Person[]; scope: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const open = openIndex === null ? null : people[openIndex];

  useEffect(() => {
    if (openIndex === null) return;
    const returnTo = triggers.current[openIndex];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      returnTo?.focus({ preventScroll: true });
    };
  }, [openIndex]);

  const layoutKey = (i: number) => (reduced ? undefined : `person-${scope}-${i}`);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {people.map((person, i) => (
          <li key={`${person.name}-${i}`}>
            {person.tba ? (
              <TbaCard person={person} />
            ) : (
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-haspopup="dialog"
                className="group block w-full text-left"
              >
                <motion.span
                  layoutId={layoutKey(i)}
                  className="relative block aspect-[4/5] overflow-hidden rounded-media bg-sunk"
                >
                  <Portrait person={person} sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 270px" />
                </motion.span>
                <span className="label-micro mt-3.5 block text-content-soft">{person.position}</span>
                <span className="mt-1.5 block font-display text-[1.05rem] leading-snug font-semibold tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent-text">
                  {person.name}
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              aria-label="Close profile"
              tabIndex={-1}
              onClick={() => setOpenIndex(null)}
              className="absolute inset-0 bg-chalk-950/70"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`person-${scope}-name`}
              data-lenis-prevent
              className="relative grid max-h-full w-full max-w-3xl overflow-y-auto rounded-panel bg-navy-900 text-white sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            >
              <motion.div
                layoutId={layoutKey(openIndex)}
                className="relative aspect-[4/5] max-h-[46svh] w-full overflow-hidden sm:max-h-none"
              >
                <Portrait person={open} sizes="(max-width: 640px) 100vw, 340px" dark />
              </motion.div>
              <div className="flex flex-col p-6 md:p-10">
                <p className="label-micro text-accent">{open.position}</p>
                <h3
                  id={`person-${scope}-name`}
                  className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.08] tracking-[-0.02em]"
                >
                  {open.name}
                </h3>
                {open.bio && <p className="mt-4 max-w-[44ch] text-white/80">{open.bio}</p>}
                <div className="mt-auto pt-8">
                  <button
                    ref={closeRef}
                    type="button"
                    data-morph
                    onClick={() => setOpenIndex(null)}
                    className="rounded-control border border-white/45 px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:border-white hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Portrait({ person, sizes, dark = false }: { person: Person; sizes: string; dark?: boolean }) {
  if (!person.image) {
    // A real person whose portrait the district has not supplied (or that was
    // lost on the old CDN). Initials, not a stock silhouette: it is still them.
    const initials = person.name
      .replace(/^(PHF\s+)?(Int\.\s+)?(PP\.\s+)?/i, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('');
    return (
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-[2.4rem] font-semibold ${
          dark ? 'bg-navy-800 text-white/60' : 'text-content-soft'
        }`}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={person.image}
      alt={`Portrait of ${person.name}`}
      fill
      sizes={sizes}
      className="object-cover transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04]"
      style={{ objectPosition: person.focus ?? DEFAULT_FOCUS }}
    />
  );
}

/** An unfilled position. Same footprint as a profile so the grid stays true. */
function TbaCard({ person }: { person: Person }) {
  return (
    <div data-placeholder>
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-media border border-dashed border-control-border bg-surface">
        <svg viewBox="0 0 40 48" aria-hidden="true" className="w-[34%] text-chalk-400">
          <circle cx="20" cy="15" r="9" fill="currentColor" />
          <path d="M2 48c0-11 8-19 18-19s18 8 18 19z" fill="currentColor" />
        </svg>
      </div>
      <p className="label-micro mt-3.5 text-content-soft">{person.position}</p>
      <p className="mt-1.5 font-display text-[1.05rem] leading-snug font-semibold text-content-soft">To be announced</p>
    </div>
  );
}
