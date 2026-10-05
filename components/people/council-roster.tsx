import { Reveal } from '@/components/motion/reveal';
import { PeopleGrid } from '@/components/people/people-grid';
import type { PeopleGroup } from '@/lib/people';

/**
 * A council laid out group by group: Core Leadership, Directors and so on.
 * Each group is a small heading with its count, a hairline, then the grid.
 */
export function CouncilRoster({ groups, scope }: { groups: PeopleGroup[]; scope: string }) {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {groups.map((group, gi) => {
        const id = `${scope}-group-${gi}`;
        return (
          <section key={group.title} aria-labelledby={id}>
            <Reveal className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
              <h2 id={id} className="text-[1.45rem] leading-tight tracking-[-0.015em] md:text-[1.7rem]">
                {group.title}
              </h2>
              <span className="label-micro text-content-soft">
                {String(group.people.length).padStart(2, '0')}
              </span>
            </Reveal>
            <div className="mt-8">
              <PeopleGrid people={group.people} scope={`${scope}-${gi}`} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
