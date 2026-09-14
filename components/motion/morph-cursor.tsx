'use client';

import { useEffect, useRef } from 'react';

/**
 * Morph cursor (lab.damiandc.com/morph-cursor).
 *
 * A soft blob follows the pointer and parks exactly on anything marked
 * `data-morph`, taking that element's box and border radius. Controls are
 * pills, so it reads as the cursor wrapping the button.
 *
 * Three deliberate constraints, each of which fixed a real problem:
 *  - fine pointers only, and never under reduced motion, because it hides the
 *    native pointer;
 *  - it parks only on control-sized elements. Without the cap it inflated to
 *    cover a 140x520 accordion panel and fought that panel's own hover;
 *  - position is written straight to the element inside rAF and never through
 *    React state, which would re-render the tree on every mouse move.
 */
const MAX_PARK_WIDTH = 340;
const MAX_PARK_HEIGHT = 150;
const DOT = 13;

export function MorphCursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    document.body.classList.add('cursor-morph');
    el.style.display = 'block';

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let x = pointerX;
    let y = pointerY;
    let parked: HTMLElement | null = null;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const loop = () => {
      if (parked) {
        // Re-measured each frame so the blob tracks elements that move or
        // resize under it, such as an accordion panel opening.
        const r = parked.getBoundingClientRect();
        x += (r.left + r.width / 2 - x) * 0.22;
        y += (r.top + r.height / 2 - y) * 0.22;
      } else {
        x += (pointerX - x) * 0.2;
        y += (pointerY - y) * 0.2;
      }
      el.style.translate = `${x}px ${y}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const release = () => {
      parked = null;
      el.style.width = `${DOT}px`;
      el.style.height = `${DOT}px`;
      el.style.borderRadius = '999px';
      el.dataset.parked = 'false';
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-morph]');
      if (!target) return;
      const r = target.getBoundingClientRect();
      if (r.width > MAX_PARK_WIDTH || r.height > MAX_PARK_HEIGHT) return;
      parked = target;
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
      el.style.borderRadius = getComputedStyle(target).borderRadius;
      el.dataset.parked = 'true';
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-morph]');
      if (!target || target !== parked) return;
      const next = (e.relatedTarget as Element | null)?.closest?.('[data-morph]');
      if (next === target) return;
      release();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    // A parked element can be removed or scrolled away; drop the reference.
    window.addEventListener('blur', release);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('blur', release);
      document.body.classList.remove('cursor-morph');
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-parked="false"
      // Centring MUST be a `transform`, not Tailwind's `-translate-1/2`: in v4
      // that utility writes the `translate` property, which is the same
      // property this component animates in rAF, so it was being overwritten
      // and the blob hung off the pointer by half its own size.
      className="pointer-events-none fixed top-0 left-0 z-90 hidden size-[13px] rounded-full bg-accent [transform:translate(-50%,-50%)] transition-[width,height,border-radius,background-color,opacity] duration-300 ease-out-expo data-[parked=false]:opacity-90 data-[parked=true]:bg-accent/25 data-[parked=true]:mix-blend-multiply data-[parked=true]:shadow-[inset_0_0_0_1px] data-[parked=true]:shadow-accent/55"
    />
  );
}
