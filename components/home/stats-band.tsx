'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { STATS } from '@/lib/site';

/** Counts up to `value` once, when scrolled into view. */
function Odometer({ value, display }: { value: number; display: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast then settles, which reads as mechanical rather than linear.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  // The real string ("3,500", "100+", "1964") is authoritative; the count-up
  // only ever renders an intermediate approximation of it.
  //
  // Digit grouping is taken FROM the display string rather than applied blindly:
  // a year must not pick up a thousands separator. Formatting 1964 through
  // toLocaleString renders "1,964" mid-count before snapping to "1964".
  const settled = reduced || !inView || shown >= value;
  const grouped = display.includes(',');
  const partial = Math.floor(shown);
  const text = settled
    ? display
    : (grouped ? partial.toLocaleString('en-US') : String(partial)) +
      (display.endsWith('+') ? '+' : '');

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}

export function StatsBand() {
  return (
    <section aria-label="District at a glance" className="container-page pt-2 pb-2">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-hairline pt-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className={i > 0 ? 'md:border-l md:border-hairline md:pl-8' : ''}>
            {/* Big enough to be a moment — these four figures ARE the section. */}
            <p className="text-[clamp(2.4rem,5vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
              <Odometer value={stat.value} display={stat.display} />
            </p>
            <p className="mt-3 text-[11px] font-medium tracking-[0.1em] text-content-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
