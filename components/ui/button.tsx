import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * The one button in the system. Always a pill, so the morph cursor has a shape
 * to park on, and always `data-morph` so it registers as a cursor target.
 *
 * `onPhoto` is a separate tone rather than a colour override because the hero
 * sits over photography, where the chalk-on-navy pair has no reliable contrast.
 *
 * With `href` it renders a Link; without one it renders a native `<button>`
 * (default `type="button"`), so hand-built pills can move onto this component.
 * Press feedback is the `press` utility (globals.css): 0.97 in 120ms.
 */
type Tone = 'primary' | 'ghost' | 'onPhoto' | 'onPhotoGhost' | 'onInk' | 'onInkGhost';

const TONES: Record<Tone, string> = {
  primary:
    'border-accent-fill bg-accent-fill text-accent-on hover:border-signal-700 hover:bg-signal-700',
  ghost:
    'border-control-border bg-transparent text-content hover:border-content',
  onPhoto: 'border-white bg-white text-chalk-950 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on',
  onPhotoGhost:
    'border-white/55 bg-transparent text-white hover:border-white hover:bg-white/15',
  onInk: 'border-on-ink bg-on-ink text-ink-panel hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on',
  onInkGhost:
    'border-on-ink/40 bg-transparent text-on-ink hover:border-on-ink',
};

const BASE =
  'press inline-flex items-center justify-center whitespace-nowrap rounded-control border px-6 py-3.5 text-sm font-semibold';

type Common = {
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = Common & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;
type NativeButtonProps = Common & { href?: undefined } & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { tone = 'primary', className = '', children } = props;
  const cls = `${BASE} ${TONES[tone]} ${className}`;

  if (props.href !== undefined) {
    const { href, tone: _t, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} data-morph className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { tone: _t, className: _c, children: _ch, href: _h, type = 'button', ...rest } = props;
  return (
    <button type={type} data-morph className={cls} {...rest}>
      {children}
    </button>
  );
}
