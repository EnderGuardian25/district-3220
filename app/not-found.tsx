import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page/page-header';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main id="main">
      <PageHeader
        title="This page isn’t here."
        lede="The district’s website moved to a new address structure. Most old links forward automatically; this one didn’t. The archives and the council are a click away."
      >
        <Button href="/">Back to the home page</Button>
        <Button href="/archives" tone="ghost">
          Browse the archives
        </Button>
      </PageHeader>
    </main>
  );
}
