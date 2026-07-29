'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
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
      <div className="container-page flex h-full flex-col justify-center pt-28 pb-16 lg:mx-0 lg:max-w-none lg:pt-24 lg:pr-14 lg:pb-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
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
            make this heading's textContent "CreateLastingImpact". */}
        <h1 className="mt-7 text-display font-semibold">
          {words.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && ' '}
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
            </Fragment>
          ))}
        </h1>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease }}
        >
          <p className="mt-7 max-w-[44ch] text-[17px] text-content-muted">
            {SITE.name} brings together young people across {SITE.region}{' '}
            to serve their communities &mdash; and to build something that outlasts the year.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-control bg-accent px-6 py-3.5 text-sm font-medium text-accent-on transition-[filter] hover:brightness-[0.94]"
            >
              Learn more about the district
            </Link>
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
            clean edge marked by a single hairline. Top edge on mobile (stacked),
            left edge on desktop (side by side). */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-hairline lg:inset-y-0 lg:right-auto lg:h-auto lg:w-px"
        />
        {/* Keeps the caption legible over a bright LED wall. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/80 to-transparent"
        />
        <figcaption className="absolute bottom-6 left-6 text-[12.5px] font-medium text-navy-100 lg:left-8">
          36th Interact District Assembly
        </figcaption>
      </motion.figure>
    </section>
  );
}
