import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Reveal } from '@/components/motion/reveal';
import { ArchiveRail } from '@/components/archives/archive-rail';
import { ARCHIVE_YEARS, UNRECORDED_SPAN } from '@/lib/archives';
import { PAST_COUNCILS } from '@/lib/councils';
import { DEFAULT_FOCUS } from '@/lib/people';
import { keepTogether } from '@/components/people/keep-together';

export const metadata: Metadata = {
  title: 'Archives',
  description: 'The councils, projects and milestones of Interact District 3220, year by year since 1988.',
};

export default function ArchivesPage() {
  return (
    <main id="main">
      <PageHeader
        title="The district archives."
        lede="A record of the councils, projects and milestones of Interact clubs across Sri Lanka and the Maldives: who led each year, what they built, and the theme they served under."
      />

      {/* ---------- the timeline ---------- */}
      <section aria-labelledby="years-heading" className="mt-16 bg-navy-900 text-white md:mt-24">
        <div className="container-page pt-16 md:pt-24">
          <SectionHeader
            id="years-heading"
            tone="dark"
            // The rail runs oldest first and pans as you scroll; the phone list
            // below runs newest first and scrolls down, so it gets its own
            // wording (decided 2026-10-06). display:none keeps screen readers
            // to the one that is showing.
            title={
              <>
                <span className="md:hidden">Every year on record, newest first.</span>
                <span className="hidden md:inline">Every year on record, oldest first.</span>
              </>
            }
            lede={
              <>
                <span className="hidden md:inline">Scroll to move through the years. </span>
                Open any one for its council, its projects and the people who ran them.
              </>
            }
          />
        </div>

        <ArchiveRail years={ARCHIVE_YEARS} />

        {/* Phones: a plain list, newest first. */}
        <ol className="container-page mt-8 pb-16 md:hidden">
          {ARCHIVE_YEARS.map((y) => (
            <li key={y.slug} className="border-t border-white/15 first:border-t-0">
              <Link href={`/archives/${y.slug}`} className="block py-5">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em]">{y.label}</span>
                  {y.shape === 'compiling' && <span className="label-micro text-white/60">Being compiled</span>}
                </span>
                {y.theme && <span className="mt-2 block font-display text-white/80 italic">“{y.theme}”</span>}
                {y.dir && <span className="label-micro mt-1.5 block text-white/55">DIR {keepTogether(y.dir)}</span>}
              </Link>
              {y.slug === '2020-21' && (
                <Link href="/college-of-dirs" className="block border-t border-white/15 py-5" data-placeholder>
                  <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em] text-white/70">
                    {UNRECORDED_SPAN.from} – {UNRECORDED_SPAN.to}
                  </span>
                  <span className="mt-2 block text-sm text-white/60">
                    No archive pages were kept for these years. Their DIRs and themes are in the College of DIRs.
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
        <div className="hidden h-16 md:block" />
      </section>

      {/* ---------- past councils ---------- */}
      <section aria-labelledby="councils-heading" className="container-page py-16 md:py-24">
        <SectionHeader
          id="councils-heading"
          title="Past councils, in portraits."
          lede="The years the district kept a portrait page for its council. Earlier councils are listed by name in each year’s archive."
        />
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {PAST_COUNCILS.map((c, i) => {
            const dir = c.groups[0]?.people[0];
            return (
              <Reveal key={c.year} step={Math.min(i, 4)} as="li">
                <Link
                  href={`/archives/council/${c.year}`}
                  className="group grid grid-cols-[6rem_minmax(0,1fr)] items-end gap-5 rounded-panel border border-hairline bg-surface p-4 transition-colors duration-200 hover:border-accent-fill md:grid-cols-[7rem_minmax(0,1fr)]"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-media bg-sunk">
                    {dir?.image && (
                      <Image
                        src={dir.image}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                        style={{ objectPosition: dir.focus ?? DEFAULT_FOCUS }}
                      />
                    )}
                  </span>
                  <span className="pb-1">
                    <span className="label-micro block text-content-soft">{c.label}</span>
                    <span className="mt-2 block font-display text-[1.3rem] leading-tight font-semibold tracking-[-0.015em]">
                      Council {c.label}
                    </span>
                    <span className="mt-1.5 block text-sm text-content-muted">
                      “{c.theme}” · DIR {keepTogether(c.dir)}
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
