'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Mask Wipe reveal for section headings — the lab effect planned in
 * design/DECISIONS.md §5. The heading is uncovered left-to-right by an
 * animated clip inset; the text itself never moves or fades, so it reads as
 * being unmasked rather than arriving.
 *
 * A wrapper div animates the clip so the real heading keeps its element,
 * id (aria-labelledby targets) and semantics. One-shot, in view. clip-path
 * isn't compositor-driven everywhere, but a single 0.9s wipe per heading is
 * nothing next to the aperture reveal this page already runs.
 */
export function MaskWipe({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
