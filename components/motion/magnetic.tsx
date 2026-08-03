'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic hover — the "Magnetic Dock" item from design/DECISIONS.md §5.
 * The wrapped element leans toward the cursor and springs back on leave.
 *
 * Tracking runs entirely on motion values so it never re-renders the React
 * tree — a useState version re-renders per mousemove and collapses on weak
 * hardware. Mouse pointers only: pointermove also fires mid-drag on touch,
 * which would smear the button under a finger.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset from centre that the element follows. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
