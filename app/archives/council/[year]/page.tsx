import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page/page-header';
import { CouncilRoster } from '@/components/people/council-roster';
import { Button } from '@/components/ui/button';
import { PAST_COUNCILS, getPastCouncil } from '@/lib/councils';

export const dynamicParams = false;

export function generateStaticParams() {
  return PAST_COUNCILS.map((c) => ({ year: c.year }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const c = getPastCouncil((await params).year);
  if (!c) return {};
  return {
    title: `Council ${c.label}`,
    description: `The Interact District 3220 council for ${c.label}, “${c.theme}”, led by DIR ${c.dir}.`,
  };
}

export default async function PastCouncilPage({ params }: { params: Promise<{ year: string }> }) {
  const c = getPastCouncil((await params).year);
  if (!c) notFound();
  const count = c.groups.reduce((n, g) => n + g.people.length, 0);

  return (
    <main id="main">
      <PageHeader
        crumbs={[{ label: 'Archives', href: '/archives' }]}
        title={`Council ${c.label}.`}
        lede={`The ${count} Interactors who ran the district in ${c.label} under the theme “${c.theme}”, led by DIR ${c.dir}. Select a profile to read more.`}
      >
        <Button href={`/archives/${c.year}`} tone="ghost">
          The {c.label} year in the archive
        </Button>
      </PageHeader>

      <div className="container-page py-14 md:py-20">
        <CouncilRoster groups={c.groups} scope={`council-${c.year}`} />
      </div>
    </main>
  );
}
