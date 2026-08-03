'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Hero aperture reveal — the lab's Mask Wipe (`MaskWipeScroll.jsx`), adapted to
 * a real page.
 *
 * The hero is treated as a single static object layered ON TOP of the next
 * section, like wrapping paper. Scrolling opens a circular aperture through the
 * whole hero — copy, photo and all — onto the content beneath, until the circle
 * swallows the frame. Past that point scrolling is ordinary.
 *
 * Structure:
 *   - A tall runway (100svh stage + RUNWAY_VH of travel) provides the scroll
 *     distance the pin needs.
 *   - The stage is `sticky top-0 h-svh`, so the hero holds still while the
 *     aperture opens.
 *   - The content that follows is pulled up by the same RUNWAY_VH (see
 *     `app/page.tsx`) so it sits directly behind the pinned hero and is what
 *     shows through the hole. Without that negative margin it would be a
 *     viewport below and nothing would be revealed.
 *   - The lid is opaque (`--hero-lid`), which is also what keeps the animated
 *     site background out of the hero while it's at rest.
 *
 * Kept from the lab version: `p*p*(3-2*p)` smoothstep (slow crack open, fast
 * swallow), a radius solved so p=1 covers the frame exactly with no dead travel,
 * the accent ring riding the aperture edge, and a ResizeObserver because the
 * radius is measured in pixels.
 *
 * Changed from the lab:
 *   - INVERTED. The lab clips the incoming scene in; here the outgoing lid has a
 *     hole punched OUT. `clip-path: circle()` cannot express "everything except
 *     this circle", so the lid uses a radial-gradient mask.
 *   - The aperture is FIXED at dead centre. The lab drifts it in from the
 *     upper-right third; opening from the middle of the screen reads more like
 *     unwrapping from the centre outward.
 */

/**
 * Fraction of a viewport height over which the aperture fully opens.
 * The pin runway itself lives in CSS as --hero-runway (see globals.css) and
 * must be >= this value. It is NOT exported from here: this is a 'use client'
 * module, and a server component importing a plain constant from one gets a
 * client-reference proxy back, not the value.
 */
const WIPE_VH = 0.6;

export function HeroReveal({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const lid = lidRef.current;
    if (!stage || !lid) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = stage.clientWidth;
    let h = stage.clientHeight;
    let lastP = 0;

    const apply = (p: number) => {
      lastP = p;
      const e = p * p * (3 - 2 * p); // smoothstep — slow crack open, fast swallow

      // Fixed at dead centre. The lab drifts the aperture in from the
      // upper-right third, but opening from the middle of the screen reads more
      // like something being unwrapped from the centre outward — and with no
      // drift the reach is constant, so the geometry is simply the half-diagonal.
      const cx = 50;
      const cy = 50;

      // Radius that covers the frame from the centre. The 1.02 is a deliberate
      // overshoot: `clientWidth`/`clientHeight` exclude the scrollbar and round
      // to integers, and svh vs innerHeight can disagree by a few pixels —
      // measured 687.5px against ~692px needed, which left a sliver of lid in
      // the corners at full open.
      const r = e * Math.hypot(w / 2, h / 2) * 1.02;

      // Belt and braces: once open, take the lid out entirely so no rounding
      // artefact can survive at the edges.
      lid.style.opacity = p >= 0.999 ? '0' : '1';

      // CRITICAL: opacity 0 hides the hero but it still hit-tests, and the
      // sticky z-20 stage keeps overlapping the viewport well past the wipe —
      // which made everything beneath (avenues accordion, event links)
      // unclickable. Once the aperture is fully open the stage must be inert;
      // scrolling back up restores it.
      stage.style.pointerEvents = p >= 0.999 ? 'none' : '';

      if (r <= 0.5) {
        // A zero-size radial-gradient is invalid — stay fully solid.
        lid.style.maskImage = 'none';
        lid.style.webkitMaskImage = 'none';
      } else {
        // 6.5% feather (was 4.5%) — the edge reads as light rather than cut
        // paper. The mechanic (smoothstep, geometry, pin) is untouched.
        const feather = Math.max(2, r * 0.065);
        const mask =
          `radial-gradient(${r.toFixed(1)}px ${r.toFixed(1)}px at ${cx.toFixed(2)}% ${cy.toFixed(2)}%,` +
          ` transparent 0, transparent ${(r - feather).toFixed(1)}px, #000 ${r.toFixed(1)}px)`;
        lid.style.maskImage = mask;
        lid.style.webkitMaskImage = mask;
      }

      const ring = ringRef.current;
      if (ring) {
        ring.style.width = ring.style.height = `${(r * 2).toFixed(1)}px`;
        ring.style.left = `${cx.toFixed(2)}%`;
        ring.style.top = `${cy.toFixed(2)}%`;
        // Peaks mid-transition, absent at both ends.
        ring.style.opacity = reduced ? '0' : Math.min(1, p * (1 - p) * 5).toFixed(3);
      }
    };

    const ro = new ResizeObserver(() => {
      w = stage.clientWidth;
      h = stage.clientHeight;
      apply(lastP);
    });
    ro.observe(stage);

    let raf: number | null = null;
    let progress = 0;
    const tick = () => {
      raf = null;
      apply(progress);
    };
    const onScroll = () => {
      const range = window.innerHeight * WIPE_VH;
      const p = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      progress = reduced ? (p > 0.5 ? 1 : 0) : p;
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Pulled up under the sticky header so the stage is flush with the viewport
    // top and the nav overlays the hero. Without this the header occupies ~73px
    // of flow and the hero starts below it.
    <div className="hero-runway relative -mt-16 md:-mt-18">
      <div ref={stageRef} className="sticky top-0 z-20 h-svh overflow-hidden">
        {/* The lid. Opaque, so only the aperture lets the next section through.
            Its colour is --hero-lid, which in dark mode is navy rather than the
            page's near-neutral ink so it matches the video background. */}
        <div ref={lidRef} className="hero-lid absolute inset-0">
          {children}
        </div>

        {/* Accent ring on the aperture edge — sibling of the lid, so the mask
            doesn't eat it. */}
        <span
          aria-hidden="true"
          ref={ringRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/80 opacity-0 shadow-[0_0_32px_rgba(1,180,230,0.35),inset_0_0_18px_rgba(1,180,230,0.2)]"
        />
      </div>
    </div>
  );
}
