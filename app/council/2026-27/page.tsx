import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { CouncilRoster } from '@/components/people/council-roster';
import { Button } from '@/components/ui/button';
import { COUNCIL_2026_27 } from '@/lib/councils';

export const metadata: Metadata = {
  title: 'Meet The Council 2026/27',
  description: `The Interact District 3220 council for the Rotary year 2026/27, led by DIR ${COUNCIL_2026_27.dir}.`,
};

export default function Council202627Page() {
  const c = COUNCIL_2026_27;
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ label: 'About', href: '/about' }]}
        title={`Meet the Council ${c.label}.`}
        lede={`The students running the district for the Rotary year ${c.label}, under the theme “${c.theme}”, led by DIR ${c.dir}.`}
      >
        <Button href="/archives/council/2025-26" tone="ghost">
          The 2025/26 council
        </Button>
      </PageHeader>

      <div className="container-page py-16 md:py-20">
        <CouncilRoster groups={c.groups} scope="council-2026-27" />
      </div>
    </main>
  );
}
