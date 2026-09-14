'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FLAGSHIPS } from '@/lib/home';

/**
 * Horizontal Journey (lab.damiandc.com/horizontal-journey).
 *
 * The section pins and the three flagships pan sideways as the page scrolls.
 * Driven by a CSS scroll-driven animation on a named view timeline, so the pan
 * runs off the main thread and there is no scroll listener anywhere.
 *
 * Two things that are easy to get wrong and are load-bearing here:
 *  - the timeline is named on the tall outer section, NOT on the rail. The rail
 *    is sticky, so a timeline scoped to it never leaves the viewport and the
 *    progress would never advance.
 *  - the pan distance is the rail's overflow, measured in JS. A percentage
 *    translate is a percentage of the rail's own width and overshoots badly.
 *
 * Where scroll-driven animations are unsupported it degrades to a snap-scroll
 * rail, which is a real control rather than a broken pin.
 */
export function FlagshipJourney() {
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
      const pan = Math.max(0, rail.scrollWidth - window.innerWidth + pad);
      rail.style.setProperty('--pan', `${pan}px`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="journey relative" aria-label="Flagship projects">
      <div className="journey-pin sticky top-0 flex h-dvh items-center overflow-hidden">
        <div ref={railRef} className="journey-rail container-page flex gap-4 md:gap-6">
          {FLAGSHIPS.map((f) => (
            <article
              key={f.slug}
              className="relative flex h-[min(72vh,600px)] flex-[0_0_min(78vw,800px)] flex-col justify-end overflow-hidden rounded-panel bg-navy-900 text-white"
            >
              <Image
                src={f.image}
                alt={f.imageAlt}
                fill
                sizes="(max-width: 768px) 78vw, 800px"
                className="object-cover opacity-55"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-chalk-950/92 via-chalk-950/30 to-transparent"
              />
              <div className="relative z-10 p-6 md:p-10">
                <p className="label-micro text-accent">{f.name}</p>
                <p className="mt-3.5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.88] font-semibold tracking-[-0.04em] tabular-nums">
                  {f.figure}
                </p>
                <p className="label-micro mt-2.5 text-white/65">{f.figureLabel}</p>
                <h3 className="mt-5 max-w-[22ch] text-[clamp(1.1rem,1.8vw,1.55rem)] leading-tight font-semibold tracking-[-0.025em]">
                  {f.headline}
                </h3>
                <p className="mt-2.5 max-w-[44ch] text-[0.97rem] text-white/80">{f.blurb}</p>
              </div>
            </article>
          ))}
        </div>
        <div aria-hidden="true" className="jprog absolute inset-x-[--spacing(4.5)] bottom-8 h-0.5 bg-hairline md:inset-x-8 xl:inset-x-14">
          <i className="block h-full origin-left scale-x-0 bg-navy-800" />
        </div>
      </div>
    </section>
  );
}
