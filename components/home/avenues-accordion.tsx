'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AVENUE_PANELS } from '@/lib/home';

/**
 * Accordion Gallery (lab.damiandc.com/accordion-gallery).
 *
 * All five panels start collapsed and equal. Hovering one opens it and the
 * others give way; clicking locks it so hover stops changing things, and
 * clicking the locked panel releases it.
 *
 * Two layouts, one component:
 *  - md and up: a true accordion. Logo on a tint of the avenue's own colour,
 *    name on a solid band across the bottom.
 *  - below md: five columns of 78px is unusable, so it becomes a list with the
 *    colour on the left edge and the description revealed on open.
 *
 * `onSolid` picks the band's text colour. Community Service is light enough
 * that white on it measures 2.6:1 and fails AA, so that one panel takes dark
 * text; every other avenue colour is dark enough for white.
 *
 * Deliberately NOT a morph-cursor target: a collapsed panel is roughly
 * 140x520, so the cursor would inflate into a slab and fight the hover.
 */
export function AvenuesAccordion() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const open = locked ?? hovered;

  return (
    <div
      className="mt-8 flex flex-col gap-2.5 md:h-[clamp(320px,42vw,520px)] md:flex-row md:gap-2"
      onMouseLeave={() => setHovered(null)}
    >
      {AVENUE_PANELS.map((a, i) => {
        const isOpen = open === i;
        return (
          <button
            key={a.slug}
            type="button"
            aria-expanded={isOpen}
            onMouseEnter={() => locked === null && setHovered(i)}
            onFocus={() => locked === null && setHovered(i)}
            onClick={() => setLocked((l) => (l === i ? null : i))}
            style={{
              ['--k' as string]: a.colour,
              backgroundColor: `color-mix(in srgb, ${a.colour} ${isOpen ? 15 : 9}%, #FFFFFF)`,
              flexGrow: isOpen ? 4.4 : 1,
            }}
            className="group relative grid min-h-[92px] grid-cols-[92px_1fr] items-center overflow-hidden rounded-media border-l-4 border-l-[var(--k)] text-left transition-[flex-grow,background-color] duration-[600ms] ease-out-expo md:block md:min-h-0 md:min-w-0 md:border-l-0"
          >
            {/* Logo. Centred in the plate above the band on desktop; a fixed
                column on mobile. */}
            <span className="grid place-items-center p-3.5 md:absolute md:inset-x-0 md:top-0 md:bottom-24 md:p-5">
              <Image
                src={a.logo}
                alt=""
                width={160}
                height={160}
                className="max-h-[54px] w-auto object-contain transition-transform duration-[600ms] ease-out-expo md:max-h-[74%] md:max-w-[74%] group-aria-expanded:md:scale-105"
              />
            </span>

            <span
              className="label-micro absolute top-2.5 right-3 z-10 md:top-3.5 md:right-auto md:left-4"
              style={{ color: `color-mix(in srgb, ${a.colour} 78%, #000000)` }}
            >
              {String(i + 1).padStart(2, '0')}
              {locked === i && <span className="opacity-60"> locked</span>}
            </span>

            {/* Band. Transparent on mobile (the left edge carries the colour),
                solid from md up. */}
            <span
              className={`relative z-10 block py-3.5 pr-4 md:absolute md:inset-x-0 md:bottom-0 md:flex md:min-h-24 md:flex-col md:justify-end md:bg-[var(--k)] md:p-4 md:pb-[18px] ${
                a.onSolid === 'dark' ? 'md:text-chalk-950' : 'md:text-white'
              }`}
            >
              <span
                className={`block font-display font-semibold tracking-[-0.015em] ${
                  isOpen ? 'md:text-[clamp(1rem,1.5vw,1.2rem)]' : 'md:text-[0.78rem] md:leading-snug'
                } [overflow-wrap:anywhere]`}
              >
                {a.name}
              </span>
              <span
                className={`block max-w-[38ch] overflow-hidden text-[0.93rem] text-content-muted transition-[max-height,opacity,margin-top] duration-500 ease-out-expo md:text-white/85 ${
                  a.onSolid === 'dark' ? 'md:text-chalk-950/80' : ''
                } ${isOpen ? 'mt-2 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}
              >
                {a.blurb}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
