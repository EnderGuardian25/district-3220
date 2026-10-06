import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { CalendarView } from '@/components/calendar/calendar-view';
import { Button } from '@/components/ui/button';
import { getCalendar } from '@/lib/calendar';
import { colomboDayKey } from '@/lib/colombo';

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'District meetings, projects and deadlines for Interact District 3220.',
};

/** Re-read the Google Calendar feed at most hourly (lib/calendar.ts). */
export const revalidate = 3600;

export default async function CalendarPage() {
  const { events } = await getCalendar();
  const today = colomboDayKey(new Date());

  return (
    <main id="main">
      <PageHeader
        title="District calendar."
        lede="District meetings, projects and deadlines across the zones. Clubs planning an event should request a date before announcing it."
      >
        <Button href="/calendar/request-a-date">Request a date</Button>
      </PageHeader>

      <section aria-label="Events" className="container-page py-12 md:py-16">
        <CalendarView events={events} today={today} />
      </section>
    </main>
  );
}
