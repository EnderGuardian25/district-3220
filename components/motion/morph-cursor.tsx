'use client';

import { useEffect, useRef } from 'react';

/**
 * Morph cursor (lab.damiandc.com/morph-cursor).
 *
 * A soft blob follows the pointer and parks exactly on anything marked
 * `data-morph`, taking that element's box and border radius. Controls are
 * pills, so it reads as the cursor wrapping the button. Any other link or
 * button (the logo, text links, cards too big to park on) grows the dot into
 * a ring instead, so every clickable thing still answers the pointer.
 *
 * Over dark surfaces it switches to a white treatment: the light-surface tint
 * multiplies, which vanishes on navy and on photography. Tone comes from the
 * nearest `data-cursor="dark" | "light"` ancestor when there is one (the
 * header needs it: it is see-through over the hero), otherwise from the first
 * opaque background behind the target.
 *
 * Three deliberate constraints, each of which fixed a real problem:
 *  - fine pointers only, and never under reduced motion, because it hides the
 *    native pointer;
 *  - it parks only on control-sized elements. Without the cap it inflated to
 *    cover a 140x520 accordion panel and fought that panel's own hover;
 *  - position is written straight to the element inside rAF and never through
 *    React state, which would re-render the tree on every mouse move.
 *
 * Styles for each state live in globals.css under `.morph-cursor`.
 */
const MAX_PARK_WIDTH = 340;
const MAX_PARK_HEIGHT = 150;
const DOT = 13;
const RING = 36;
/**
 * Easing time constants (ms). The blob closes ~63% of the remaining gap every
 * `tau`. Time-based rather than a fixed fraction per frame, so it feels the
 * same at 60Hz and 144Hz and doesn't fall further behind when a frame drops.
 * Free follow is tight so the dot reads as the pointer; parking keeps a little
 * glide so the wrap onto a control is visible.
 */
const FOLLOW_TAU = 22;
const PARK_TAU = 45;
const CLICKABLE = 'a[href], button:not(:disabled), [role="button"], summary';

type Mode = 'dot' | 'park' | 'link';

/** True when the first opaque background behind `el` is dark. */
function onDarkBackground(el: Element | null): boolean {
  for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
    const m = getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
    if (!m) continue;
    const [r, g, b, a = '1'] = m;
    if (Number(a) < 0.5) continue;
    // Relative luminance, close enough for a light/dark split.
    const lum = (0.2126 * Number(r) + 0.7152 * Number(g) + 0.0722 * Number(b)) / 255;
    return lum < 0.4;
  }
  return false;
}

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
    let mode: Mode = 'dot';
    /** The parked control, or the link the ring is showing for. */
    let target: HTMLElement | null = null;
    /** Element under the pointer, for the per-frame tone check. */
    let hovered: Element | null = null;
    let autoDark = false;
    let dark = false;
    let rescan = false;
    let frame = 0;
    let last = performance.now();

    const setMode = (next: Mode, nextTarget: HTMLElement | null) => {
      target = nextTarget;
      if (next === 'park' && nextTarget) {
        const r = nextTarget.getBoundingClientRect();
        el.style.width = `${r.width}px`;
        el.style.height = `${r.height}px`;
        el.style.borderRadius = getComputedStyle(nextTarget).borderRadius;
      } else {
        const size = next === 'link' ? RING : DOT;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '999px';
      }
      if (next !== mode) {
        mode = next;
        el.dataset.mode = next;
      }
    };

    /** Decide what the cursor does for whatever is under the pointer. */
    const resolve = (under: Element | null) => {
      hovered = under;
      autoDark = onDarkBackground(under);
      const morph = under?.closest<HTMLElement>('[data-morph]');
      if (morph) {
        const r = morph.getBoundingClientRect();
        if (r.width <= MAX_PARK_WIDTH && r.height <= MAX_PARK_HEIGHT) {
          if (morph !== target || mode !== 'park') setMode('park', morph);
          return;
        }
      }
      const link = under?.closest<HTMLElement>(CLICKABLE);
      if (link) {
        if (link !== target || mode !== 'link') setMode('link', link);
        return;
      }
      if (mode !== 'dot') setMode('dot', null);
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const loop = (now: number) => {
      // Clamped so a backgrounded tab returning doesn't count as one huge step.
      const dt = Math.min(now - last, 64);
      last = now;

      // Scrolling moves content under a still pointer without a pointerover,
      // so look again once per frame after a scroll.
      if (rescan) {
        rescan = false;
        resolve(document.elementFromPoint(pointerX, pointerY));
      }

      // A target that has been removed (a dialog's Close button, a link that
      // navigated) measures as a zero rect, which flew the blob to the
      // top-left corner with the native cursor still hidden. Release it, and a
      // parked control the pointer has slipped off.
      if (target) {
        const r = target.getBoundingClientRect();
        const slack = 8;
        const pointerOff =
          pointerX < r.left - slack || pointerX > r.right + slack || pointerY < r.top - slack || pointerY > r.bottom + slack;
        if (!target.isConnected || pointerOff) setMode('dot', null);
      }

      // Explicit markers are re-read every frame: the header flips from dark
      // to light as the hero scrolls away under a pointer that hasn't moved.
      const marked = hovered?.isConnected ? hovered.closest<HTMLElement>('[data-cursor]') : null;
      const nextDark = marked ? marked.dataset.cursor === 'dark' : autoDark;
      if (nextDark !== dark) {
        dark = nextDark;
        el.dataset.tone = dark ? 'dark' : 'light';
      }

      if (mode === 'park' && target) {
        // Re-measured each frame so the blob tracks elements that move or
        // resize under it, such as an accordion panel opening.
        const r = target.getBoundingClientRect();
        const k = 1 - Math.exp(-dt / PARK_TAU);
        x += (r.left + r.width / 2 - x) * k;
        y += (r.top + r.height / 2 - y) * k;
      } else {
        const k = 1 - Math.exp(-dt / FOLLOW_TAU);
        x += (pointerX - x) * k;
        y += (pointerY - y) * k;
      }
      el.style.translate = `${x}px ${y}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onOver = (e: PointerEvent) => resolve(e.target as Element | null);
    // Leaving the document entirely: relatedTarget is null.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) resolve(null);
    };
    const onScroll = () => {
      rescan = true;
    };
    const onBlur = () => resolve(null);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('blur', onBlur);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('blur', onBlur);
      document.body.classList.remove('cursor-morph');
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-mode="dot"
      data-tone="light"
      // Centring MUST be a `transform`, not Tailwind's `-translate-1/2`: in v4
      // that utility writes the `translate` property, which is the same
      // property this component animates in rAF, so it was being overwritten
      // and the blob hung off the pointer by half its own size.
      className="morph-cursor pointer-events-none fixed top-0 left-0 z-90 hidden size-[13px] rounded-full [transform:translate(-50%,-50%)]"
    />
  );
}
