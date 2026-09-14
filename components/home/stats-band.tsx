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
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-hairline py-8 pr-6 md:py-10 ${
                i < 2 ? 'border-b md:border-b-0' : ''
              } ${i % 2 === 0 ? 'border-r md:border-r' : 'md:border-r'} ${
                i === STATS.length - 1 ? 'md:border-r-0' : ''
              } ${i === 1 ? 'border-r-0 md:border-r' : ''}`}
            >
              <dd className="font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-none font-semibold tracking-[-0.03em]">
                <Odometer value={stat.display} />
              </dd>
              <dt className="label-micro mt-3 text-content-soft">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
