'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HERO_SLIDES } from '@/lib/home';
import { SITE } from '@/lib/site';

/**
 * Clip Reveal carousel (lab.damiandc.com/clip-reveal-carousel).
 *
 * Full-bleed photography, the incoming slide wiping in from the right via
 * clip-path. Advances itself every 6s, pauses on hover and on focus, and is
 * fully driveable by arrow keys, the two buttons, the progress segments, or a
 * swipe.
 *
 * Only the first slide gets `preload`: it is the LCP element. The rest are
 * lazy, which is why the wipe is on clip-path (compositable) rather than on a
 * property that would force layout while an image is still decoding.
 */
const INTERVAL = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  /**
   * Highest slide reached. Slides mount lazily as they are first needed, so on
   * first paint only slide 0 exists. Mounting all four up front meant a
   * non-priority image could win Largest Contentful Paint, which is both a
   * real regression and what Next was warning about.
   */
  const [maxSeen, setMaxSeen] = useState(0);
  /** Hover or keyboard focus inside the carousel: a temporary hold. */
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
      setIndex(target);
      setMaxSeen((m) => Math.max(m, target));
    },
    [count],
  );

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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(e) => {
        dragStart.current = e.clientX;
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
      className="relative isolate -mt-16 h-[100svh] min-h-[520px] touch-pan-y overflow-hidden bg-chalk-950 md:-mt-18"
    >
      {HERO_SLIDES.map((s, i) => {
        if (i > maxSeen) return null;
        const state = i === index ? 'live' : i < index ? 'past' : 'ahead';
        return (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-[clip-path] duration-[950ms] ease-clip motion-reduce:transition-none"
            style={{
              clipPath: state === 'ahead' ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0)',
              zIndex: state === 'live' ? 3 : state === 'past' ? 2 : 1,
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
              sizes="100vw"
              {...(i === 0 ? { preload: true } : { loading: 'eager' as const })}
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-chalk-950/90 via-chalk-950/25 to-chalk-950/35"
            />
          </div>
        );
      })}

      {/* Controls and copy sit above every slide. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end text-white">
        <p className="label-micro absolute top-24 left-[--spacing(4.5)] md:left-8 xl:left-14">
          <span className="text-lg font-medium tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-white/55"> / {String(count).padStart(2, '0')}</span>
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
          <div className="pointer-events-auto flex w-full items-center gap-3 md:w-[min(46%,400px)]">
            <button
              type="button"
              data-morph
              onClick={() => setStopped((v) => !v)}
              // The label states the action; no aria-pressed as well, or a
              // screen reader announces the state twice.
              aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-control border border-white/45 text-white transition-[background-color,border-color] duration-200 hover:border-white hover:bg-white/15"
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
      className="inline-flex h-10 w-11 items-center justify-center rounded-control border border-white/45 text-white transition-[background-color,border-color,translate] duration-200 hover:border-white hover:bg-white/15 active:translate-y-px"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
