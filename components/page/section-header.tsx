import type { ReactNode } from 'react';
import { DrawLine, Reveal } from '@/components/motion/reveal';

/**
 * The home page's section header, lifted into one component so inner pages
 * cannot drift from it: a Fraunces sentence ending in a full stop, one muted
 * lede, then the DrawLine rule. `id` goes on the heading for aria-labelledby.
 */
export function SectionHeader({
  id,
  title,
  lede,
  tone = 'chalk',
  aside,
}: {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  /** 'dark' for navy or ink bands. */
  tone?: 'chalk' | 'dark';
  /** Optional element aligned right of the heading from md up, e.g. a count. */
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal as="h2" className="max-w-[20ch] text-title">
            <span id={id}>{title}</span>
          </Reveal>
          {lede && (
            <Reveal
              step={1}
              as="p"
              className={`mt-3.5 max-w-[56ch] ${tone === 'dark' ? 'text-white/70' : 'text-content-muted'}`}
            >
              {lede}
            </Reveal>
          )}
        </div>
        {aside && <Reveal step={2}>{aside}</Reveal>}
      </div>
      {tone === 'dark' ? (
        <div aria-hidden="true" className="h-px bg-white/15" />
      ) : (
        <DrawLine />
      )}
    </div>
  );
}
