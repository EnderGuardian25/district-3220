'use client';

import type { ReactNode } from 'react';
import { useEnterOnce } from '@/components/motion/reveal';

/**
 * Clip Reveal (lab.damiandc.com/clip-reveal-carousel), the single-image form.
 * The same wipe the home hero uses between slides: the frame opens from the
 * right edge on `ease-clip`.
 *
 * `onLoad` is for media already in the first viewport: it runs as a CSS
 * animation from first paint instead of waiting for an observer. Everything
 * else reveals as it scrolls in.
 */
export function ClipReveal({
  children,
  onLoad = false,
  className = '',
}: {
  children: ReactNode;
  onLoad?: boolean;
  className?: string;
}) {
  if (onLoad) return <div className={`clip-in-load ${className}`}>{children}</div>;
  return <ClipRevealOnEnter className={className}>{children}</ClipRevealOnEnter>;
}

function ClipRevealOnEnter({ children, className }: { children: ReactNode; className: string }) {
  const { ref, shown } = useEnterOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-[clip-path] duration-[950ms] ease-clip ${className}`}
      style={{ clipPath: shown ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
    >
      {children}
    </div>
  );
}
