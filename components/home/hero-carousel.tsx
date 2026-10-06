'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HERO_SLIDES } from '@/lib/home';
import { SITE } from '@/lib/site';

/**
 * Clip Reveal carousel (lab.damiandc.com/clip-reveal-carousel).
 *
 * Full-bleed photography, the incoming slide wiping in from the right via
 * clip-path. Advances itself every 6s, holds while it has keyboard focus, stops
 * with the pause button, and is
 * fully driveable by arrow keys, the two buttons, the progress segments, or a
 * swipe.
 *
 * Only the first slide gets `preload`: it is the LCP element. The rest are
 * lazy, which is why the wipe is on clip-path (compositable) rather than on a
 * property that would force layout while an image is still decoding.
 *
 * The wipe is played on the incoming slide itself (Web Animations), not
 * derived from each slide's place in the sequence. Position-based states
 * ("past" slides drawn, "ahead" slides clipped) only ever wiped forwards:
 * wrapping from the last slide to the first, or stepping back, flipped the
 * stacking order and cut hard to the new photograph.
 */
const INTERVAL = 6000;
const WIPE_MS = 950;

/**
 * The photo scrim: chalk-950 only (DECISIONS §2), two layers, at the minimum
 * opacity that gets every piece of hero text to WCAG AA on all four slides at
 * 1440×900, 1024×768 and 390×844, measured against the real pixels behind
 * each text box (worst 10%, text-shadow ignored). Tuned 2026-10-06.
 *
 * - Top band (to 112px, gone by 176px): the transparent header's nav, the
 *   logo text and the slide counter. Nav was 2.2–3.1:1; now ≥4.6.
 * - Main gradient: the approved bottom (90% → 64% at 20%) and top (35%) are
 *   unchanged; only the headline zone is stronger (35% from the bottom:
 *   44.5 → 80%; 50%: 25 → 57%). "100+ clubs." in signal-400 was 1.2–1.7:1
 *   on the brightest slides; now ≥3.1 (large text).
 *
 * Swapping a photo can break these numbers: re-measure before shipping one.
 */
const scrim = (pct: number, at: string) => `color-mix(in srgb, var(--color-chalk-950) ${pct}%, transparent) ${at}`;
const HERO_SCRIM = [
  `linear-gradient(to bottom, ${scrim(44, '0px')}, ${scrim(46, '112px')}, ${scrim(0, '176px')})`,
  `linear-gradient(to top, ${scrim(90, '0%')}, ${scrim(64, '20%')}, ${scrim(80, '35%')}, ${scrim(57, '50%')}, ${scrim(28, '65%')}, ${scrim(35, '100%')})`,
].join(', ');

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  /**
   * Highest slide reached. Slides mount lazily as they are first needed, so on
   * first paint only slide 0 exists. Mounting all four up front meant a
   * non-priority image could win Largest Contentful Paint, which is both a
   * real regression and what Next was warning about.
   *
   * A slide should exist before it goes live, so its photograph is decoded
   * by the time it wipes in. So the live slide's image load mounts the next
   * one in the background (after LCP, so no competition), and a jump to a
   * slide that still isn't mounted mounts it first and goes live two frames
   * later.
   */
  const [maxSeen, setMaxSeen] = useState(0);
  const maxSeenRef = useRef(0);
  maxSeenRef.current = maxSeen;
  /** The slide that was live before this one. It stays fully drawn directly
   *  under the incoming slide for the whole wipe, whichever way the change
   *  went, so the wipe always uncovers the previous photograph. */
  const [prev, setPrev] = useState<number | null>(null);
  const indexRef = useRef(0);
  indexRef.current = index;
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  /** Last slide the wipe played for. A ref, not "skip the first run", so
   *  React's development double-run of effects can't wipe slide 1 on load. */
  const wiped = useRef(0);
  /** Keyboard focus inside the carousel: a temporary hold. Not hover: the
   *  slideshow keeps running under the mouse, and the pause button stops it. */
  const [paused, setPaused] = useState(false);
  /** The pause button: holds until pressed again. Touch has no hover, so this
   *  is the only way a phone user can stop a slideshow that never ends
   *  (WCAG 2.2.2 Pause, Stop, Hide). */
  const [stopped, setStopped] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dragStart = useRef<number | null>(null);
  const count = HERO_SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const go = useCallback(
    (next: number) => {
      const target = (next + count) % count;
      const show = () => {
        if (target === indexRef.current) return;
        setPrev(indexRef.current);
        setIndex(target);
      };
      if (target <= maxSeenRef.current) {
        show();
        return;
      }
      setMaxSeen(target);
      requestAnimationFrame(() => requestAnimationFrame(show));
    },
    [count],
  );

  // The Clip Reveal: the new live slide wipes in from the right over the one
  // it replaces, on every change (forwards, backwards, and the wrap from the
  // last slide to the first). Layout effect, so the slide is clipped before
  // the frame that would show it uncovered. Interrupting a wipe is fine: that
  // slide becomes `prev` and its own animation simply runs on to the end.
  useLayoutEffect(() => {
    if (index === wiped.current) return;
    wiped.current = index;
    const el = slideEls.current[index];
    // Reduced motion: no wipe, the opacity crossfade below does the change.
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.animate([{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0)' }], {
      duration: WIPE_MS,
      easing: getComputedStyle(el).getPropertyValue('--ease-clip').trim() || 'ease-in-out',
    });
  }, [index]);

  /** Mount the following slide: after slide 0's image loads (so after LCP),
   *  then each time a later slide goes live. One slide ahead, never more. */
  const prefetchNext = useCallback(
    (i: number) => setMaxSeen((m) => Math.max(m, Math.min(i + 1, count - 1))),
    [count],
  );
  useEffect(() => {
    if (index > 0) prefetchNext(index);
  }, [index, prefetchNext]);

  // No timer: the live progress bar's own animationend advances the slide
  // (see the segment buttons below), so pausing freezes the bar and the
  // countdown together and resuming continues exactly where it stopped. A
  // separate timer restarted a full 6s after every hover while the bar
  // showed it part-filled.
  const holding = paused || stopped;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  const slide = HERO_SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Interact District 3220 in action"
      tabIndex={0}
      onKeyDown={onKeyDown}
      // Keyboard focus only. A mouse click also focuses the section or a
      // control, and pausing on that held the slideshow until the user
      // clicked somewhere else; mouse users have the pause button.
      onFocus={(e) => setPaused(e.target.matches(':focus-visible'))}
      onBlur={() => setPaused(false)}
      // Touch and pen only: a mouse drag is someone selecting or just
      // clicking, and used to change the slide.
      onPointerDown={(e) => {
        dragStart.current = e.pointerType === 'mouse' ? null : e.clientX;
      }}
      // Without this Android claims the horizontal pan for itself, sends
      // pointercancel instead of pointerup, and the swipe never lands.
      onPointerCancel={() => {
        dragStart.current = null;
      }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const dx = e.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
      }}
      // Pulled up under the sticky header by exactly the header's height, so
      // the hero starts at y=0 and one svh fills the screen precisely.
      //
      // svh, not dvh: dvh re-resolves as mobile browser chrome collapses, which
      // resizes the hero mid-scroll and shifts the copy under the reader's
      // thumb. svh is stable and guarantees the CTAs are reachable on first
      // paint. min-h keeps it usable in a short landscape window.
      className="relative isolate -mt-16 h-[100svh] min-h-[520px] touch-pan-y overflow-hidden bg-chalk-950 select-none md:-mt-18"
    >
      {HERO_SLIDES.map((s, i) => {
        if (i > maxSeen) return null;
        return (
          // Live on top, the outgoing slide under it, the rest underneath
          // both. Under reduced motion the wipe becomes a 200ms crossfade:
          // only the live slide is opaque (the global rule sets the timing).
          <div
            key={s.src}
            ref={(el) => {
              slideEls.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: reduced && i !== index ? 0 : 1,
              zIndex: i === index ? 3 : i === prev ? 2 : 1,
            }}
          >
            {/* Slide 0 is the LCP element, so it gets preload. Later slides
                are above the fold too, and because they only mount once
                reached, `eager` loads them exactly when they are needed rather
                than competing with the first paint. Leaving them lazy made
                whichever slide was showing register as an un-prioritised LCP. */}
            <Image
              src={s.src}
              alt={s.alt}
              fill
              // object-cover in a box at least 100vw x max(100svh, 520px):
              // a landscape photo in a portrait box is drawn at its height,
              // so it needs this much width, not 100vw.
              sizes={`max(100vw, ${Math.ceil(s.aspect * 100)}svh, ${Math.ceil(s.aspect * 520)}px)`}
              {...(i === 0 ? { preload: true } : { loading: 'eager' as const })}
              onLoad={i === 0 ? () => prefetchNext(0) : undefined}
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: HERO_SCRIM }} />
          </div>
        );
      })}

      {/* Controls and copy sit above every slide. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end text-white">
        <p className="label-micro absolute top-24 left-[--spacing(4.5)] md:left-8 xl:left-14">
          <span className="text-lg font-medium tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          {/* white/70, not /55: /55 measured 3.4–3.7:1 over the photos. */}
          <span className="text-white/70"> / {String(count).padStart(2, '0')}</span>
        </p>

        <div className="pointer-events-auto absolute top-[86px] right-[--spacing(4.5)] hidden gap-2 md:right-8 md:flex xl:right-14">
          <CarouselArrow label="Previous slide" onClick={() => go(index - 1)} d="M12.5 4l-6 6 6 6" />
          <CarouselArrow label="Next slide" onClick={() => go(index + 1)} d="M7.5 4l6 6-6 6" />
        </div>

        <div className="container-page">
          <p className="label-micro text-white/75">
            {SITE.name} · {SITE.region}
          </p>
          {/* inline-block per sentence so a line break never lands inside one
              of the three figures. signal-400 rather than the usual signal-500:
              over photography the darker step loses too much separation. */}
          <h1 className="mt-4 max-w-[20ch] text-display">
            <span className="inline-block">{SITE.memberCountLabel} students.</span>{' '}
            <span className="inline-block text-signal-400">{SITE.clubCountLabel} clubs.</span>{' '}
            <span className="inline-block">One district.</span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[1.05rem] text-white/85">
            Youth-led service across {SITE.region}.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <Button href="#join" tone="onPhoto">
              Join a club
            </Button>
            <Button href="#projects" tone="onPhotoGhost">
              See the projects
            </Button>
          </div>
        </div>

        <div className="container-page mt-10 flex flex-col gap-4 pb-7 md:flex-row md:items-end md:justify-between">
          <p className="label-micro text-white/80">{slide.caption}</p>
          {/* Announces slide changes only when the user is in control: silent
              while it auto-advances (a change every 6s would talk over
              everything), polite once paused, stopped or under reduced motion. */}
          <p className="sr-only" aria-live={holding || reduced ? 'polite' : 'off'} aria-atomic="true">
            {`Slide ${index + 1} of ${count}: ${slide.caption}`}
          </p>
          <div className="pointer-events-auto flex w-full items-center gap-3 md:w-[min(46%,400px)]">
            <button
              type="button"
              data-morph
              onClick={() => setStopped((v) => !v)}
              // The label states the action; no aria-pressed as well, or a
              // screen reader announces the state twice.
              aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
              // 36px visible, 44px to tap (the after: ring), for a touch-first audience.
              className="press relative inline-flex size-9 shrink-0 items-center justify-center rounded-control border border-white/45 text-white after:absolute after:-inset-1 after:content-[''] hover:border-white hover:bg-white/15"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="currentColor">
                {stopped ? <path d="M4.5 2.8v10.4L13 8z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
              </svg>
            </button>
            <div className="flex flex-1 gap-1.5">
              {HERO_SLIDES.map((s, i) => (
                // The button is a 24px-tall hit target (WCAG 2.5.8); the 3px
                // track is drawn inside it.
                <button
                  key={s.src}
                  type="button"
                  data-morph
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className="group relative flex h-6 flex-1 items-center"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30 transition-colors duration-200 group-hover:bg-white/45">
                    {i < index && <span aria-hidden="true" className="absolute inset-0 bg-white" />}
                    {i === index &&
                      (reduced ? (
                        // No autoplay under reduced motion: the bar simply marks the slide.
                        <span aria-hidden="true" className="absolute inset-0 bg-white" />
                      ) : (
                        <span
                          // Keyed by index so every slide's bar starts from empty,
                          // including slide 1 on first load and after wrapping.
                          key={index}
                          aria-hidden="true"
                          className="absolute inset-0 origin-left bg-white"
                          style={{
                            animation: `progress-fill ${INTERVAL}ms linear both`,
                            animationPlayState: holding ? 'paused' : 'running',
                          }}
                          onAnimationEnd={() => go(index + 1)}
                        />
                      ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SiteHeader watches this to decide whether the bar is transparent (the
          photograph showing through) or solid.

          Deliberately 16px from the hero's top, so the solid block returns on
          the first real scroll. The transparent treatment only reads well when
          the hero is genuinely at rest: the moment it starts moving, white nav
          text is crossing unpredictable parts of the photograph and stops being
          legible. 16px rather than 0 so a rubber-band bounce cannot flicker it. */}
      <div data-hero-top aria-hidden="true" className="absolute inset-x-0 top-4 h-px" />
    </section>
  );
}

function CarouselArrow({
  label,
  onClick,
  d,
}: {
  label: string;
  onClick: () => void;
  d: string;
}) {
  return (
    <button
      type="button"
      data-morph
      onClick={onClick}
      aria-label={label}
      className="press inline-flex h-10 w-11 items-center justify-center rounded-control border border-white/45 text-white hover:border-white hover:bg-white/15"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
