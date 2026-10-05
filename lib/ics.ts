/**
 * iCalendar (RFC 5545) to the site's event shape. Pure, with no Next or
 * server dependencies, so it can be tested on its own. Recurring events are
 * expanded inside a window around today, with moved or edited instances
 * applied; cancelled events are dropped.
 */
import ICAL from 'ical.js';

export type CalendarEvent = {
  id: string;
  title: string;
  /** ISO timestamp, or YYYY-MM-DD for all-day events. */
  start: string;
  end?: string;
  allDay: boolean;
  /** Recorded with a date only (lib/events.ts), so no time is shown at all. */
  timeUnknown?: boolean;
  location?: string;
  description?: string;
  links: { label: string; href: string }[];
};

/** How far either side of today recurring events are expanded. */
const PAST_DAYS = 400;
const FUTURE_DAYS = 550;
const MAX_OCCURRENCES = 400;

export function parseIcs(text: string): CalendarEvent[] {
  const root = new ICAL.Component(ICAL.parse(text));
  for (const tz of root.getAllSubcomponents('vtimezone')) {
    ICAL.TimezoneService.register(tz);
  }

  const now = ICAL.Time.now();
  const from = now.clone();
  from.adjust(-PAST_DAYS, 0, 0, 0);
  const until = now.clone();
  until.adjust(FUTURE_DAYS, 0, 0, 0);

  // Moved or edited instances of a recurring event arrive as separate VEVENTs
  // sharing the master's UID; they must be attached before expanding.
  const vevents = root.getAllSubcomponents('vevent').map((c) => new ICAL.Event(c));
  const masters = new Map<string, ICAL.Event>();
  for (const ev of vevents) if (!ev.isRecurrenceException()) masters.set(ev.uid, ev);
  for (const ev of vevents) if (ev.isRecurrenceException()) masters.get(ev.uid)?.relateException(ev);

  const out: CalendarEvent[] = [];
  for (const ev of masters.values()) {
    if (ev.component.getFirstPropertyValue('status') === 'CANCELLED') continue;
    if (!ev.isRecurring()) {
      if (ev.startDate.compare(from) >= 0 && ev.startDate.compare(until) <= 0) {
        out.push(toEvent(ev.uid, ev, ev.startDate, ev.endDate));
      }
      continue;
    }
    const it = ev.iterator();
    let next: ICAL.Time | null;
    let n = 0;
    while ((next = it.next()) && next.compare(until) <= 0 && n < MAX_OCCURRENCES) {
      n++;
      if (next.compare(from) < 0) continue;
      const occ = ev.getOccurrenceDetails(next);
      out.push(toEvent(`${ev.uid}-${next.toString()}`, occ.item, occ.startDate, occ.endDate));
    }
  }
  return out.sort((a, b) => a.start.localeCompare(b.start));
}

function toEvent(id: string, ev: ICAL.Event, start: ICAL.Time, end: ICAL.Time | null): CalendarEvent {
  const allDay = start.isDate;
  const iso = (t: ICAL.Time) => (t.isDate ? t.toString() : t.toJSDate().toISOString());
  const url = ev.component.getFirstPropertyValue('url');
  const description = cleanDescription(ev.description);
  return {
    id,
    title: ev.summary || 'Untitled event',
    start: iso(start),
    end: end ? iso(end) : undefined,
    allDay,
    location: ev.location || undefined,
    description,
    links: typeof url === 'string' && url ? [{ label: 'Details', href: url }] : [],
  };
}

/** Google descriptions are HTML fragments; the page shows plain text. */
function cleanDescription(html: string | null | undefined) {
  if (!html) return undefined;
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '’')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return text || undefined;
}
