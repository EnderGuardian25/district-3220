'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AVENUES } from '@/lib/site';

/**
 * Accordion image carousel for the five Avenues of Interact.
 *
 * Panels are theme-aware: light surfaces with navy text in light mode, dark in
 * dark mode. Each avenue's logo sits on a light plate at its original colour —
 * the five marks are five unrelated saturated hues and Finance's is almost
 * exactly our navy, so placing it directly on a navy panel would make it vanish
 * (design/DECISIONS.md §3).
 *
 * Desktop: horizontal rail, one panel expanded, collapsed labels run vertically.
 * Mobile: stacks — an 84px-wide horizontal panel is unusable.
 *
 * COLLAPSED PANELS ARE ONLY ~84px WIDE, which is what previously broke this:
 *   - 48px of padding left ~36px of content width, but the logo plate is
 *     `shrink-0` at 56–64px, so it overflowed and got clipped mid-logo.
 *   - The blurb was `md:block md:opacity-0` when collapsed, so it still laid out
 *     inside that 36px column with `max-w-[46ch]` and wrapped into a very tall
 *     invisible block that fought `justify-between`.
 *   - The `0N` index sat in a `justify-between` row and got crushed against the
 *     plate.
 * Hence the collapsed state now has its own padding, a smaller plate, no index,
 * and no blurb in the tree at all.
 */
export function AvenuesAccordion() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();

  const onKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
    const last = AVENUES.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    panelRefs.current[next]?.focus();
  }, []);

  return (
    <section aria-labelledby="avenues-heading" className="container-page py-20 md:py-24">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.13em] text-accent-text uppercase">
            What we do
          </p>
          <h2 id="avenues-heading" className="mt-4 text-title font-semibold">
            Five avenues of service
          </h2>
        </div>
        <p className="max-w-[36ch] text-sm text-content-muted">
          Every project a club runs sits in one of five avenues. Together they cover the whole of
          Interact&rsquo;s work.
        </p>
      </div>

      {/* Tablist rather than a disclosure list, because exactly one is always open. */}
      <div
        role="tablist"
        aria-label="Avenues of Interact"
        aria-orientation="horizontal"
        className="mt-12 flex flex-col gap-2 md:h-[400px] md:flex-row"
      >
        {AVENUES.map((avenue, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={avenue.slug}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              role="tab"
              id={`avenue-tab-${avenue.slug}`}
              aria-selected={isActive}
              aria-controls={`avenue-panel-${avenue.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              animate={{ flexGrow: isActive ? 1 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex shrink-0 overflow-hidden rounded-card border text-left transition-colors duration-300 md:basis-[84px] ${
                isActive
                  ? 'border-hairline bg-surface'
                  : // Glassy but PRESENT: at /55 with no border the collapsed
                    // rail vanished into the light-mode silk entirely.
                    'border-hairline bg-surface/85 hover:bg-surface'
              }`}
              style={{ minHeight: isActive ? undefined : '84px' }}
            >
              {/* Faint wash of the avenue's own colour. Decorative only — never
                  the sole carrier of meaning, so a low ratio is fine here. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-45"
                style={{
                  background: `radial-gradient(125% 115% at 14% 6%, ${avenue.logoColor}40 0%, transparent 64%)`,
                }}
              />

              {/* Oversized logo watermark, filling the expanded panel until real
                  photography exists. Rendered only when active — kept mounted at
                  opacity 0 it was five needless composited layers. */}
              {isActive && (
                <motion.span
                  aria-hidden="true"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: reduced ? 0 : 0.15 }}
                  className="pointer-events-none absolute top-1/2 right-[-6%] hidden -translate-y-1/2 md:block"
                >
                  <Image
                    src={avenue.logo}
                    alt=""
                    width={420}
                    height={420}
                    className="size-[clamp(180px,24vw,300px)] object-contain opacity-[0.13] dark:opacity-[0.16]"
                  />
                </motion.span>
              )}

              <div
                id={`avenue-panel-${avenue.slug}`}
                role="tabpanel"
                aria-labelledby={`avenue-tab-${avenue.slug}`}
                className={`relative flex w-full min-w-0 flex-col justify-between ${
                  isActive ? 'gap-6 p-5 md:p-6' : 'gap-3 p-4'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Light plate keeps every logo legible at full colour,
                      including Finance's near-navy mark. Smaller when collapsed
                      so it fits the narrow rail instead of being clipped. */}
                  <span
                    className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-sand-50 ring-1 ring-navy-900/6 ${
                      isActive ? 'size-14 p-2.5 md:size-16' : 'size-10 p-1.5'
                    }`}
                  >
                    <Image
                      src={avenue.logo}
                      alt=""
                      width={64}
                      height={64}
                      className="size-full object-contain"
                    />
                  </span>
                  {/* Only when expanded — there is no room for it in the rail. */}
                  {isActive && (
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-content-muted tabular-nums">
                      0{i + 1}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3
                    className={`font-semibold text-content ${
                      isActive
                        ? 'text-[19px] md:text-[22px]'
                        : // Vertical writing-mode rather than absolute + rotate:
                          // it stays in flow, so it can't collide with the plate
                          // or overflow the panel.
                          'text-[15px] md:rotate-180 md:text-[13px] md:whitespace-nowrap md:[writing-mode:vertical-rl]'
                    }`}
                  >
                    {avenue.name}
                  </h3>
                  {/* Not rendered when collapsed — see the note at the top. */}
                  {isActive && (
                    <motion.p
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: reduced ? 0 : 0.18 }}
                      className="mt-2.5 max-w-[46ch] text-[14px] leading-relaxed text-content-muted"
                    >
                      {avenue.blurb}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
