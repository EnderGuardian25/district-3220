'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AVENUE_PANELS } from '@/lib/home';

/**
 * Hover-intent delay (approved 2026-10-06): a pointer crossing the row on its
 * way somewhere else shouldn't fling panels open. Click and focus stay instant.
 */
const HOVER_INTENT_MS = 80;

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
 * `onSolid` picks the band's text colour. All five are 'light' (white) by
 * request. Community Service's amber can't carry white at AA, so its band uses
 * the darker `solid` colour (lib/home.ts CONTRAST NOTE, 2026-10-06). The blurb
 * is white at 90%: 85% measured 4.26:1 on Club Service and 4.33:1 on Green
 * Life. The 'dark' branch is kept in case a future colour needs it.
 *
 * Deliberately NOT a morph-cursor target: a collapsed panel is roughly
 * 140x520, so the cursor would inflate into a slab and fight the hover.
 */
export function AvenuesAccordion() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const open = locked ?? hovered;
  const intent = useRef<number | null>(null);
  const cancelIntent = () => {
    if (intent.current !== null) window.clearTimeout(intent.current);
    intent.current = null;
  };
  useEffect(() => cancelIntent, []);

  return (
    <div
      className="mt-8 flex flex-col gap-2.5 md:h-[clamp(320px,42vw,520px)] md:flex-row md:gap-2"
      onMouseLeave={() => {
        cancelIntent();
        setHovered(null);
      }}
    >
      {AVENUE_PANELS.map((a, i) => {
        const isOpen = open === i;
        return (
          <button
            key={a.slug}
            type="button"
            // The name alone is the accessible name; the blurb is its
            // description while open, rather than the whole paragraph being
            // read out as the button's name. Expanded tracks the click-lock,
            // the user's own disclosure: hover and focus only preview, so
            // tabbing along the row doesn't announce "expanded" at every stop.
            aria-labelledby={`avenue-${a.slug}-name`}
            aria-describedby={isOpen ? `avenue-${a.slug}-blurb` : undefined}
            aria-controls={`avenue-${a.slug}-blurb`}
            aria-expanded={locked === i}
            data-open={isOpen}
            onMouseEnter={() => {
              if (locked !== null) return;
              cancelIntent();
              intent.current = window.setTimeout(() => setHovered(i), HOVER_INTENT_MS);
            }}
            onMouseLeave={cancelIntent}
            onFocus={() => locked === null && setHovered(i)}
            // Tabbing out must close what tabbing in opened.
            onBlur={() => locked === null && setHovered(null)}
            onClick={() => setLocked((l) => (l === i ? null : i))}
            style={{
              ['--k' as string]: a.colour,
              // The band behind the white name: `solid` where the brand
              // colour can't carry white at AA (Community Service).
              ['--k-solid' as string]: a.solid ?? a.colour,
              backgroundColor: `color-mix(in srgb, ${a.colour} ${isOpen ? 15 : 9}%, #FFFFFF)`,
              flexGrow: isOpen ? 4.4 : 1,
            }}
            // flex-grow is the only layout property animating here, on a
            // longer, gentler curve than the default. The description used to
            // animate max-height alongside it, which is never linear with the
            // real content height and was most of the roughness.
            className="group relative grid min-h-[92px] grid-cols-[92px_1fr] items-center overflow-hidden rounded-media border-l-4 border-l-[var(--k)] text-left transition-[flex-grow,background-color] duration-[750ms] ease-out-quint md:block md:min-h-0 md:min-w-0 md:border-l-0"
          >
            {/* Logo. Centred in the plate above the band on desktop; a fixed
                column on mobile. */}
            <span className="grid place-items-center p-3.5 md:absolute md:inset-x-0 md:top-0 md:bottom-24 md:p-5">
              <Image
                src={a.logo}
                alt=""
                width={160}
                height={160}
                className="max-h-[54px] w-auto object-contain transition-transform duration-[600ms] ease-out-expo md:max-h-[74%] md:max-w-[74%] group-data-[open=true]:md:scale-105 motion-reduce:group-data-[open=true]:md:scale-100"
              />
            </span>

            <span
              className="label-micro absolute top-2.5 right-3 z-10 md:top-3.5 md:right-auto md:left-4"
              // 60% with black clears 4.5:1 on every avenue's tint, including
              // Community Service's amber (78% measured 3.74:1).
              style={{ color: `color-mix(in srgb, ${a.colour} 60%, #000000)` }}
            >
              {String(i + 1).padStart(2, '0')}
              {locked === i && <span className="opacity-60"> locked</span>}
            </span>

            {/* Band. Transparent on mobile (the left edge carries the colour),
                solid from md up. */}
            <span
              className={`relative z-10 block py-3.5 pr-4 md:absolute md:inset-x-0 md:bottom-0 md:flex md:min-h-24 md:flex-col md:justify-end md:bg-[var(--k-solid)] md:p-4 md:pb-[18px] ${
                a.onSolid === 'dark' ? 'md:text-chalk-950' : 'md:text-white'
              }`}
            >
              <span
                id={`avenue-${a.slug}-name`}
                className={`block font-display font-semibold tracking-[-0.015em] ${
                  isOpen ? 'md:text-[clamp(1rem,1.5vw,1.2rem)]' : 'md:text-[0.78rem] md:leading-snug'
                } [overflow-wrap:anywhere]`}
              >
                {a.name}
              </span>
              {/* grid-template-rows 0fr -> 1fr, not max-height. It resolves to
                  the content's real height, so the reveal finishes exactly when
                  the text does instead of easing toward a guessed ceiling. */}
              <span
                className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[750ms] ease-out-quint ${
                  isOpen ? 'mt-2 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
                }`}
              >
                <span
                  id={`avenue-${a.slug}-blurb`}
                  className={`block max-w-[38ch] overflow-hidden text-[0.93rem] text-content-muted md:text-white/90 ${
                    a.onSolid === 'dark' ? 'md:text-chalk-950/80' : ''
                  }`}
                >
                  {a.blurb}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
