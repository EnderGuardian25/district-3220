import 'server-only';
import { EVENTS } from './events';
import { parseIcs, type CalendarEvent } from './ics';

export type { CalendarEvent };

/**
 * The district calendar, read from the council's public Google Calendar.
 *
 * Set DISTRICT_CALENDAR_ICS_URL to the calendar's "Public address in iCal
 * format" (Google Calendar → Settings → the calendar → Integrate calendar;
 * the calendar must be public). It is fetched on the server, because Google
 * does not allow browsers to read the feed directly, and refreshed hourly.
 *
 * Until the URL is set, or if the feed fails, the page falls back to the
 * events recorded in lib/events.ts and says so, so it never renders broken.
 */

export type CalendarData = {
  source: 'google' | 'fallback';
  events: CalendarEvent[];
};

export async function getCalendar(): Promise<CalendarData> {
  const url = process.env.DISTRICT_CALENDAR_ICS_URL;
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`Calendar feed returned ${res.status}`);
      return { source: 'google', events: parseIcs(await res.text()) };
    } catch (err) {
      console.error('[calendar] falling back to lib/events.ts:', err);
    }
  }
  return { source: 'fallback', events: fromRecordedEvents() };
}

function fromRecordedEvents(): CalendarEvent[] {
  const recorded = EVENTS.filter((e) => e.date).map((e) => ({
    id: e.slug,
    title: e.title,
    start: e.date!,
    allDay: true,
    timeUnknown: true,
    location: e.venue ?? undefined,
    description: e.summary,
    links: [
      ...(e.registerUrl ? [{ label: 'Register', href: e.registerUrl }] : []),
      ...(e.albumUrl ? [{ label: 'Album on Facebook', href: e.albumUrl }] : []),
    ],
  }));
  return recorded.sort((a, b) => a.start.localeCompare(b.start));
}
