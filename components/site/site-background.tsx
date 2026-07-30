'use client';

import { useEffect, useState } from 'react';

/**
 * Site-wide background — the Higgsfield silk renders, fixed behind every page.
 *
 * Encoded by `scripts/encode-bg-video.mjs` from the 1920x1080 / ~37 Mbps
 * originals down to 1280x720 AV1 (137 KB dark, 85 KB light) with H.264
 * fallbacks, plus 4–6 KB AVIF posters. Both loops are verified seamless: the
 * frame-to-frame difference across the loop point is BELOW each clip's own
 * average motion, so the join is invisible.
 *
 * Perf rules, because "must not lag" was a hard requirement and the audience is
 * largely mid-range Android on mobile data:
 *  - The poster ships in the initial HTML and the <video> is only mounted after
 *    hydration, so video bytes never compete with first paint.
 *  - No video at all on touch devices, under prefers-reduced-motion, or on a
 *    metered/slow connection (Save-Data, 2g/3g) — those get the AVIF poster,
 *    which is 6 KB and costs nothing to composite.
 *  - Playback pauses whenever the tab is hidden.
 */

type Mode = 'light' | 'dark';

export function SiteBackground() {
  const [theme, setTheme] = useState<Mode>('dark');
  /** Null until we've decided; false = poster only, true = play video. */
  const [useVideo, setUseVideo] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    // navigator.connection is still non-standard, hence the loose typing.
    const conn = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const metered =
      Boolean(conn?.saveData) || /(^|-)2g$|^3g$/.test(conn?.effectiveType ?? '');

    setUseVideo(!reduced && !touch && !metered);
  }, []);

  const poster = `/videos/bg-${theme}-poster.avif`;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Always present, so there is never an unpainted background. Driven by
          CSS (see .site-bg-poster) so only the active theme's poster is
          fetched — a React-rendered <img> would guess wrong on the server and
          pull both. */}
      <div className="site-bg-poster absolute inset-0" />

      {useVideo && <BackgroundVideo theme={theme} poster={poster} />}

      {/* Veil — this is what guarantees text contrast over the moving footage.
          Heavier in light mode: at 62% the ivory theme read as a milky haze and
          sections never separated from the moving ground. The silk stays
          clearly visible, just calmer. */}
      <div className="absolute inset-0 bg-bg/80 dark:bg-bg/70" />
    </div>
  );
}

function BackgroundVideo({ theme, poster }: { theme: Mode; poster: string }) {
  useEffect(() => {
    const video = document.getElementById('site-bg-video') as HTMLVideoElement | null;
    if (!video) return;
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else void video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [theme]);

  return (
    <video
      id="site-bg-video"
      // Remount on theme change so the browser picks up the new sources.
      key={theme}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      // Fades in over the poster, so a slow connection degrades to a still
      // rather than to a blank frame.
      className="absolute inset-0 size-full object-cover motion-safe:animate-[fade-in_700ms_ease-out_both]"
    >
      {/* AV1 first — roughly 2.5x smaller than the H.264 for this content. */}
      <source src={`/videos/bg-${theme}.webm`} type="video/webm" />
      <source src={`/videos/bg-${theme}.mp4`} type="video/mp4" />
    </video>
  );
}
