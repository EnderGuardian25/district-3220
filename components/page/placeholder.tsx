import type { ReactNode } from 'react';

/**
 * Every gap in the site's content goes through this one component, so each is
 * visibly marked on the page and findable before launch: search the source for
 * `<Placeholder`, or the rendered page for `[data-placeholder]`.
 *
 * Same treatment as the placeholder note in the home page's project panel.
 */
export function Placeholder({
  label = 'Placeholder',
  children,
  tone = 'chalk',
  className = '',
}: {
  label?: string;
  children: ReactNode;
  tone?: 'chalk' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div
      data-placeholder
      className={`rounded-media border px-5 py-4 ${
        dark ? 'border-white/25 bg-white/5' : 'border-control-border bg-surface'
      } ${className}`}
    >
      <p className={`label-micro ${dark ? 'text-white/80' : 'text-accent-text'}`}>{label}</p>
      <div className={`mt-1.5 text-sm ${dark ? 'text-white/70' : 'text-content-muted'}`}>{children}</div>
    </div>
  );
}
