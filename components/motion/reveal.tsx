'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

/**
 * The one scroll-reveal used everywhere.
 *
 * Deliberately a single shared primitive rather than per-section animations —
 * consistency is what makes motion read as designed instead of as a demo reel
 * (design/DECISIONS.md §5).
 */
type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger index — multiplied by 60ms. Keep under ~6 or the tail drags. */
  index?: number;
  delay?: number;
};

export function Reveal({ children, as = 'div', className, index = 0, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: 0.6,
        delay: delay + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Container + child variants for staggering a list without one Reveal per item. */
export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
