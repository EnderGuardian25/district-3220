'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Keeps `--pan` on a pinned horizontal rail (the `.hscroll` mechanic in
 * globals.css: the home photo band and the Archives timeline) equal to how
 * far the rail must travel for its last item to reach the viewport's edge.
 *
 * The rail is container-page: centred with a max width, so on screens wider
 * than 88rem it starts offsetLeft in from the edge. That offset has to be
 * panned too, or the last item stops short, clipped.
 *
 * Measured on window resize AND with a ResizeObserver on the rail, because
 * offsetLeft and scrollWidth also change without a window resize (fonts
 * loading, the scrollbar appearing).
 */
export function useHscrollPan(railRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const pan = Math.max(0, rail.offsetLeft + rail.scrollWidth - window.innerWidth);
      rail.style.setProperty('--pan', `${pan}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [railRef]);
}
