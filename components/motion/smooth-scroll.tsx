'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll, deliberately gated.
 *
 * It's disabled on touch devices and when reduced motion is requested. On a
 * mid-range Android — which is most of this audience — hijacking scroll costs
 * more in jank than it returns in polish, and native scrolling there is already
 * good. So this is a desktop enhancement only.
 *
 * Page changes reset it. Lenis eases toward a target scroll position, and a
 * link clicked mid-ease left that ease running into the next page: Next put
 * the new page at the top, then Lenis carried on toward the old page's target,
 * clamped to the bottom of the new one. From the Archives page, which is long,
 * "Meet the council" opened the council page at Directors (2026-10-13).
 * `settle` drops the ease and adopts the real scroll position: an immediate
 * scrollTo to where the page already is (Lenis then resets itself; its own
 * `reset()` is private).
 */
const settle = (lenis: Lenis) => lenis.scrollTo(window.scrollY, { immediate: true, force: true });

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Stop the ease the moment a link to another page is followed, so the old
    // page doesn't keep scrolling while the new one loads. In-page links
    // (same path, hash only) and new-tab clicks are left alone.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      settle(lenis);
    };
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // And again once the new page is in, after Next has set its scroll position
  // (covers back/forward and any navigation that isn't a link click).
  useEffect(() => {
    if (lenisRef.current) settle(lenisRef.current);
  }, [pathname]);

  return null;
}
