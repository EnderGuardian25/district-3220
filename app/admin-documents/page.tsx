import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { Placeholder } from '@/components/page/placeholder';
import { DocumentList } from '@/components/page/document-list';
import { Button } from '@/components/ui/button';
import { DOCUMENTS } from '@/lib/publications';

export const metadata: Metadata = {
  title: 'Admin Documents',
  description: 'The Interact District 3220 directory and documents for club officers.',
};

export default function AdminDocumentsPage() {
  return (
    <main id="main">
      <PageHeader
        title="Admin documents."
        lede="The district’s working documents for club officers. Dates and deadlines are on the calendar."
      >
        <Button href="/calendar" tone="ghost">
          The district calendar
        </Button>
      </PageHeader>

      {/* No top padding: the page header's rule is the list's first hairline. */}
      <section aria-label="Documents" className="container-page pb-14 md:pb-20">
        <DocumentList items={DOCUMENTS} />
        <Placeholder className="mt-8 max-w-3xl">
          The old site served its files through a widget whose download links could not be recovered.
          The council will add each file here; until then, ask for the directory through the contact
          page.
        </Placeholder>
      </section>
    </main>
  );
}
