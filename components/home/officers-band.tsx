import Link from 'next/link';
import { OFFICER_LINKS } from '@/lib/home';
import { Reveal } from '@/components/motion/reveal';

/**
 * "For Interactors and club officers" — the member-facing utility band, built
 * in the Statement treatment from design/concepts.html: an inverted near-black
 * panel holding a dense hairline grid.
 *
 * The inversion is doing real work. Everything above this point is public and
 * persuasive; this is the district's working tool, and the theme flip is what
 * tells a returning member they have arrived at their half of the site without
 * needing a heading to say so.
 *
 * The grid is one background colour showing through 1px gaps, so there are no
 * doubled borders to line up and no border-collapse to fight.
 */
export function OfficersBand() {
  return (
    <section id="members" aria-labelledby="members-heading" className="bg-ink-panel text-on-ink">
      <div className="container-page py-16 md:py-24">
        <Reveal as="h2" className="max-w-[20ch] text-title">
          <span id="members-heading">For Interactors and club officers.</span>
        </Reveal>
        <Reveal step={1} as="p" className="mt-3.5 max-w-[54ch] text-on-ink-muted">
          The working side of the district. Dates, documents, records and the people who run them.
        </Reveal>

        <ul className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-panel bg-ink-panel-line outline outline-ink-panel-line sm:grid-cols-2 lg:grid-cols-4">
          {OFFICER_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                data-morph
                className="block h-full bg-ink-panel px-6 py-7 transition-colors duration-200 hover:bg-[#1b1812]"
              >
                <span className="block font-display text-base font-semibold tracking-[-0.01em]">
                  {l.label}
                </span>
                <span className="label-micro mt-2 block text-on-ink-muted">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
