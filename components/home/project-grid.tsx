'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FLAGSHIPS } from '@/lib/home';

/**
 * Expand Grid (lab.damiandc.com/expand-grid).
 *
 * Five numbered project tiles. Tapping one hands the tile off to an expanded
 * panel via a shared-element transition: the image itself animates from its
 * place in the grid into the panel, rather than a new panel fading in over the
 * top. Framer's `layoutId` is exactly this primitive, so it does the FLIP work.
 *
 * Deliberately NOT a morph-cursor target: the tiles are far larger than a
 * control, and the cursor's size guard would decline them anyway.
 */
const SPAN = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];

export function ProjectGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const open = FLAGSHIPS.find((f) => f.slug === openSlug) ?? null;

  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenSlug(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openSlug]);

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
        {FLAGSHIPS.map((f, i) => (
          <li key={f.slug} className={SPAN[i] ?? 'md:col-span-2'}>
            <motion.button
              type="button"
              layoutId={reduced ? undefined : `project-${f.slug}`}
              onClick={() => setOpenSlug(f.slug)}
              aria-expanded={openSlug === f.slug}
              className="group relative block h-full min-h-[260px] w-full overflow-hidden rounded-panel bg-navy-900 text-left text-white"
            >
              <Image
                src={f.image}
                alt={f.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 40vw"
                className="object-cover opacity-55 transition-[opacity,scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] group-hover:opacity-70"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-chalk-950/92 via-chalk-950/35 to-transparent"
              />
              <span className="relative flex h-full flex-col justify-end p-5 md:p-6">
                <span className="label-micro text-white/55">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-2 font-display text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">
                  {f.name}
                </span>
                <span className="label-micro mt-2 text-accent">
                  {f.needsContent ? 'Content to come' : `${f.figure} · ${f.figureLabel}`}
                </span>
              </span>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              aria-label="Close project"
              onClick={() => setOpenSlug(null)}
              className="absolute inset-0 bg-chalk-950/70"
            />
            <motion.div
              layoutId={reduced ? undefined : `project-${open.slug}`}
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              className="relative grid max-h-full w-full max-w-4xl overflow-hidden rounded-panel bg-navy-900 text-white md:grid-cols-2"
            >
              <div className="relative min-h-[220px]">
                <Image
                  src={open.image}
                  alt={open.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 512px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-10">
                <p className="label-micro text-accent">{open.name}</p>
                <p className="mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-none font-semibold tracking-[-0.045em]">
                  {open.figure}
                </p>
                <p className="label-micro mt-2.5 text-white/60">{open.figureLabel}</p>
                <h3 className="mt-6 text-[1.3rem] leading-tight font-semibold tracking-[-0.025em]">
                  {open.headline}
                </h3>
                <p className="mt-3 max-w-[44ch] text-white/80">{open.blurb}</p>
                {open.needsContent && (
                  <p className="mt-5 rounded-media border border-white/25 px-3.5 py-2.5 text-[0.82rem] text-white/70">
                    Placeholder. This project still needs its details from the district.
                  </p>
                )}
                <button
                  type="button"
                  data-morph
                  onClick={() => setOpenSlug(null)}
                  className="mt-7 rounded-control border border-white/45 px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:border-white hover:bg-white/15"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
