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
 * Only the first slide gets `priority`: it is the LCP element. The rest are
 * lazy, which is why the wipe is on clip-path (compositable) rather than on a
 * property that would force layout while an image is still decoding.
 */
const INTERVAL = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, go]);

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
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const dx = e.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
      }}
      // Pulled up under the sticky header so the photography is genuinely
      // full-bleed. The header carries its own scrim for exactly this.
      className="relative isolate -mt-16 h-[min(92svh,880px)] min-h-[520px] overflow-hidden bg-chalk-950 md:-mt-18"
    >
      {HERO_SLIDES.map((s, i) => {
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
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
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
          <div className="pointer-events-auto flex w-full gap-1.5 md:w-[min(42%,360px)]">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                data-morph
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/30"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left bg-white transition-transform ease-linear"
                  style={{
                    transform: i < index ? 'scaleX(1)' : i === index ? 'scaleX(1)' : 'scaleX(0)',
                    transitionDuration: i === index && !paused && !reduced ? `${INTERVAL}ms` : '0ms',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marks the bottom of the full-screen hero. SiteHeader observes this to
          decide when to appear; pages without one show the bar immediately. */}
      <div data-hero-end aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px" />
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
