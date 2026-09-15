import { Odometer } from '@/components/ui/odometer';
import { STATS } from '@/lib/site';

/**
 * The live index. Hairline-divided columns rather than cards: these are four
 * bare figures and a box around each would add nothing but weight.
 */
export function StatsBand() {
  return (
    <section aria-label="The district in numbers" className="border-y border-hairline bg-bg">
      <div className="container-page">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => {
            // Inner padding on every column except the outer edges, so a figure
            // never butts up against the divider beside it. On mobile the grid
            // is 2-up, so the "first in row" columns are 0 and 2.
            const firstInRow = i % 2 === 0 ? 'pl-0 md:pl-6' : 'pl-5 md:pl-6';
            const lastInRow = i % 2 === 1 ? 'pr-0 md:pr-6' : 'pr-5 md:pr-6';
            return (
              <div
                key={stat.label}
                className={`border-hairline py-8 md:py-10 md:first:pl-0 md:last:pr-0 ${firstInRow} ${lastInRow} ${
                  i < 2 ? 'border-b md:border-b-0' : ''
                } ${i % 2 === 0 ? 'border-r' : 'md:border-r'} ${
                  i === STATS.length - 1 ? 'md:border-r-0' : ''
                }`}
              >
                <dd className="font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-none font-semibold tracking-[-0.03em]">
                  <Odometer value={stat.display} />
                </dd>
                <dt className="label-micro mt-3 text-content-soft">{stat.label}</dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
