import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * The one button in the system. Always a pill, so the morph cursor has a shape
 * to park on, and always `data-morph` so it registers as a cursor target.
 *
 * `onPhoto` is a separate tone rather than a colour override because the hero
 * sits over photography, where the chalk-on-navy pair has no reliable contrast.
 */
type Tone = 'primary' | 'ghost' | 'onPhoto' | 'onPhotoGhost' | 'onInk' | 'onInkGhost';

const TONES: Record<Tone, string> = {
  primary:
    'border-accent-fill bg-accent-fill text-accent-on hover:border-signal-700 hover:bg-signal-700',
  ghost:
    'border-control-border bg-transparent text-content hover:border-content',
  onPhoto: 'border-white bg-white text-chalk-950 hover:border-accent hover:bg-accent hover:text-white',
  onPhotoGhost:
    'border-white/55 bg-transparent text-white hover:border-white hover:bg-white/15',
  onInk: 'border-on-ink bg-on-ink text-ink-panel hover:border-accent hover:bg-accent hover:text-white',
  onInkGhost:
    'border-on-ink/40 bg-transparent text-on-ink hover:border-on-ink',
};

const BASE =
  'inline-flex items-center justify-center whitespace-nowrap rounded-control border px-6 py-3.5 text-sm font-semibold transition-[background-color,border-color,color,translate] duration-200 active:translate-y-px';

export function Button({
  href,
  tone = 'primary',
  className = '',
  children,
  ...rest
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  return (
    <Link
      href={href}
      data-morph
      className={`${BASE} ${TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
