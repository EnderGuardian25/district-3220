'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Magnetic } from '@/components/motion/magnetic';
import { SITE } from '@/lib/site';

/**
 * Full-viewport split hero, after the lab's Split Panel effect.
 *
 * Deliberately NOT a card: no border, no radius, no container. The photo half
 * bleeds to the right edge of the viewport and the header overlays on top.
 *
 * The photo was shot against a bright blue LED wall, so anything sitting on it
 * uses fixed light colours rather than the theme-aware `content` tokens.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const words = SITE.rotaryTheme.split(' ');
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    // Fills the pinned stage provided by HeroReveal, which owns the height and
    // the aperture mask. No negative margin here — the stage is already flush
    // with the viewport top and the header overlays it.
    <section className="relative h-full lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      {/* ---------------- copy ---------------- */}
      <div className="container-page relative flex h-full flex-col justify-center pt-28 pb-16 lg:mx-0 lg:max-w-none lg:pt-24 lg:pr-14 lg:pb-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {/* Cyan bloom behind the copy, echoing the silk. A pure radial gradient,
            no blur filter — the aperture wipe re-rasterises the lid per frame,
            and a filtered layer inside it would make every frame expensive. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[6%] -left-[12%] size-[56vw] max-w-[760px] opacity-[0.10] dark:opacity-[0.17]"
          style={{
            background: 'radial-gradient(circle, var(--color-cyan-500) 0%, transparent 62%)',
          }}
        />
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.13em] text-accent-text uppercase"
        >
          <span aria-hidden="true" className="h-px w-7 bg-accent-text" />
          Rotary year {SITE.rotaryYear}
        </motion.p>

        {/* Real spaces between words, no sr-only duplicate — a flex gap would
            make this heading's textContent "CreateLastingImpact". The last word
            carries an animated cyan underline stroke (drawn after the words
            settle) — full-strength brand cyan is fine here, decorative graphics
            are exempt from the light-mode contrast rule (DECISIONS.md §3). */}
        <h1 className="mt-7 text-display font-semibold">
          {words.map((word, i) => {
            const rise = (
              <span className="inline-block overflow-hidden py-[0.06em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduced ? undefined : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.95, delay: 0.1 + i * 0.1, ease }}
                >
                  {word}
                </motion.span>
              </span>
            );
            return (
              <Fragment key={word}>
                {i > 0 && ' '}
                {i === words.length - 1 ? (
                  // The underline sits OUTSIDE the overflow-hidden rise span —
                  // inside it, anything below the baseline gets clipped.
                  <span className="relative inline-block">
                    {rise}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                      className="absolute -bottom-[0.06em] left-0 h-[0.13em] w-full"
                    >
                      <motion.path
                        d="M3 9C43 4 121 2 197 5"
                        stroke="var(--color-cyan-500)"
                        strokeWidth={7}
                        strokeLinecap="round"
                        initial={reduced ? undefined : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, delay: reduced ? 0 : 1.15, ease }}
                      />
                    </svg>
                  </span>
                ) : (
                  rise
                )}
              </Fragment>
            );
          })}
        </h1>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease }}
        >
          <p className="mt-7 max-w-[44ch] text-[17px] text-content-muted">
            {SITE.name} brings together young people across {SITE.region}{' '}
            to serve their communities, and to build something that outlasts the year.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {/* Button-in-button: the arrow lives in its own chip flush with the
                right padding, and nudges diagonally on hover. Magnetic on fine
                pointers (DECISIONS.md §5 "Magnetic Dock"). */}
            <Magnetic className="inline-block">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-control bg-accent py-2 pr-2 pl-6 text-sm font-medium text-accent-on transition-[filter,transform] duration-300 hover:brightness-[0.94] active:scale-[0.98]"
              >
                About the district
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 items-center justify-center rounded-[calc(var(--radius-control)-0.375rem)] bg-accent-on/15 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" />
                  </svg>
                </span>
              </Link>
            </Magnetic>
            <Link
              href="/calendar"
              className="rounded-control px-6 py-3.5 text-sm font-medium text-content underline decoration-control-border decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent-text"
            >
              See what&rsquo;s on
            </Link>
          </div>
        </motion.div>

      </div>

      {/* ---------------- photo, bleeding to the edge ---------------- */}
      <motion.figure
        initial={reduced ? undefined : { opacity: 0, clipPath: 'inset(0 0 0 12%)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="relative h-[46svh] lg:h-full"
      >
        <Image
          src="/images/hero/assembly.avif"
          alt="Interact District 3220 members at the 36th District Assembly"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-top"
        />
        {/* No feather. A gradient between two panels reads as mush — a split
            panel wants a crisp division, so the photo meets the copy column at a
            clean edge. The edge itself carries the brand cyan, fading out along
            its length. Top edge on mobile (stacked), left edge on desktop. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-500/70 via-cyan-500/20 to-transparent lg:inset-y-0 lg:right-auto lg:h-auto lg:w-px lg:bg-gradient-to-b"
        />
        {/* Keeps the caption area legible over a bright LED wall. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/70 to-transparent"
        />
        {/* Glass chip rather than bare text — self-carries its legibility. The
            blur is a small static element inside the pinned hero, not on
            scrolling content. */}
        <figcaption className="absolute bottom-5 left-5 inline-flex items-center rounded-full border border-white/20 bg-navy-950/50 px-3.5 py-1.5 text-[12px] font-medium text-navy-100 backdrop-blur-md lg:left-7">
          36th Interact District Assembly
        </figcaption>
      </motion.figure>
    </section>
  );
}
