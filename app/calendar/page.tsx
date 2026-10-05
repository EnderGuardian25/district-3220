import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { Placeholder } from '@/components/page/placeholder';
import { CalendarView } from '@/components/calendar/calendar-view';
import { Button } from '@/components/ui/button';
import { getCalendar } from '@/lib/calendar';

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'District meetings, projects and deadlines for Interact District 3220.',
};

/** Re-read the Google Calendar feed at most hourly (lib/calendar.ts). */
export const revalidate = 3600;

export default async function CalendarPage() {
  const { source, events } = await getCalendar();
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  return (
    <main id="main">
      <PageHeader
        title="District calendar."
        lede="District meetings, projects and deadlines across the zones. Planning something your club wants on it? Ask for the date first."
      >
        <Button href="/calendar/request-a-date">Request a date</Button>
      </PageHeader>

      {source === 'fallback' && (
        <div className="container-page mt-10">
          <Placeholder label="Live calendar to come" className="max-w-3xl">
            The district’s Google Calendar is not connected yet, so these are the events on record
            from the old site. Once it is connected, this page updates itself from the council’s
            calendar every hour.
          </Placeholder>
        </div>
      )}

      <section aria-label="Events" className="container-page py-12 md:py-16">
        <CalendarView events={events} today={today} />
      </section>
    </main>
  );
}
