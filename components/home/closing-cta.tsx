import Link from 'next/link';
import { Reveal } from '@/components/motion/reveal';
import { SITE } from '@/lib/site';

/**
 * Closing CTA — the one deliberate panel left on the page.
 *
 * THEME-AWARE. It was previously hardcoded navy (`bg-navy-900` with `navy-50`
 * text), which dropped a dark slab into an otherwise light page. It now uses the
 * semantic tokens like everything else, so it inverts with the theme.
 */
export function ClosingCta() {
  return (
    <section className="container-page pb-4">
      {/* Double-bezel: hairline outer shell, glassy inner core with an inset
          top highlight — the one panel on the page should feel machined, not
          painted on. Radii concentric: 28px inner + 6px padding = 34px shell. */}
      <Reveal className="rounded-[2.125rem] border border-hairline bg-surface/40 p-1.5 dark:bg-surface/25">
        <div className="relative overflow-hidden rounded-panel bg-surface/80 px-7 py-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl md:px-14 md:py-20 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {/* Faint cyan bloom. Kept subtle enough to work over a light surface as
            well as a dark one. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.4]"
          style={{
            background:
              'radial-gradient(105% 120% at 88% 6%, var(--color-cyan-500) 0%, transparent 58%)',
          }}
        />
        <div className="relative max-w-[52ch]">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-accent-text uppercase">
            Get involved
          </p>
          <h2 className="mt-5 text-title font-semibold text-content">
            There is a club near you, and it needs people.
          </h2>
          <p className="mt-5 text-[15.5px] text-content-muted">
            Over 100 clubs across {SITE.region}. Whether you want to start one at your school or
            join one that already exists, the district can point you to the right people.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-control bg-accent px-5 py-3 text-sm font-medium text-accent-on transition-[filter] hover:brightness-[0.94]"
            >
              Get in touch
            </Link>
            {/* Same label as the hero's /about CTA — one label per destination. */}
            <Link
              href="/about"
              className="rounded-control border border-control-border px-5 py-3 text-sm font-medium text-content transition-colors hover:bg-surface"
            >
              About the district
            </Link>
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
