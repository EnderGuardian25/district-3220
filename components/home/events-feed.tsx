import Link from 'next/link';
import { pastEvents, upcomingEvents, type DistrictEvent } from '@/lib/events';
import { Reveal } from '@/components/motion/reveal';
import { MaskWipe } from '@/components/motion/mask-wipe';

/**
 * Events as editorial rows, not cards.
 *
 * Each event is a row separated by a single hairline — no boxes, no borders on
 * four sides, no drop shadows. Scales to any number of events and reads like a
 * listing rather than a dashboard.
 */

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
    full: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
};

function EventRow({ event, index }: { event: DistrictEvent; index: number }) {
  const link = event.registerUrl ?? event.albumUrl;
  const linkLabel = event.registerUrl ? 'Register' : 'View album';
  const d = event.date ? fmtDate(event.date) : null;

  const body = (
    <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 py-7 md:grid-cols-[7.5rem_1fr_auto] md:gap-x-10 md:py-8">
      {/* date rail */}
      <div className="text-content-muted">
        {d ? (
          <time dateTime={event.date!} className="block">
            <span className="block text-[30px] leading-none font-semibold tracking-tight text-content tabular-nums transition-colors duration-300 group-hover:text-accent-text">
              {d.day}
            </span>
            <span className="mt-1.5 block text-[11px] font-medium tracking-[0.1em]">
              {d.month} {d.year}
            </span>
          </time>
        ) : (
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase">Ongoing</span>
        )}
      </div>

      <div className="col-start-2">
        <h3 className="text-[19px] leading-snug font-semibold md:text-[21px]">{event.title}</h3>
        {event.venue && (
          <p className="mt-1.5 text-[13.5px] text-content-muted">{event.venue}</p>
        )}
        <p className="mt-3 max-w-[62ch] text-[14.5px] text-content-muted">{event.summary}</p>
      </div>

      {link && (
        <span className="col-start-2 mt-1 inline-flex items-center gap-2 text-[13px] font-medium text-accent-text md:col-start-3 md:mt-0 md:self-center">
          {linkLabel}
          <svg
            viewBox="0 0 12 12"
            aria-hidden="true"
            className="size-3 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </div>
  );

  return (
    <Reveal
      as="li"
      index={index}
      className="group border-t border-hairline first:border-t-0"
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className="block transition-colors hover:bg-surface/60"
        >
          {body}
          <span className="sr-only">
            {' '}
            &mdash; {linkLabel} for {event.title}, opens in a new tab
          </span>
        </a>
      ) : (
        body
      )}
    </Reveal>
  );
}

export function EventsFeed() {
  const upcoming = upcomingEvents();
  // Nothing scheduled yet for 2026/27, so lead with recent work rather than
  // showing an empty section — an empty homepage reads as an abandoned site.
  const showingUpcoming = upcoming.length > 0;
  const events = (showingUpcoming ? upcoming : pastEvents()).slice(0, 6);

  return (
    <section aria-labelledby="events-heading" className="container-page py-20 md:py-24">
      {/* No eyebrow — the headline already carries the upcoming/recent state
          (visual-style pass, eyebrow rationing). */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <MaskWipe>
          <h2 id="events-heading" className="max-w-[24ch] text-title font-semibold">
            {showingUpcoming ? 'Upcoming across the district' : 'What the district has been doing'}
          </h2>
        </MaskWipe>
        {/* Same label as the hero's calendar link — one label per destination. */}
        <Link
          href="/calendar"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-text"
        >
          See what&rsquo;s on
          <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 transition-transform group-hover:translate-x-1">
            <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      {events.length > 0 ? (
        <ul className="mt-12 border-b border-hairline">
          {events.map((event, i) => (
            <EventRow key={event.slug} event={event} index={i} />
          ))}
        </ul>
      ) : (
        <p className="mt-12 border-t border-hairline pt-8 text-sm text-content-muted">
          Nothing scheduled just yet. Check the{' '}
          <Link href="/calendar" className="text-accent-text underline underline-offset-4">
            calendar
          </Link>{' '}
          for updates.
        </p>
      )}
    </section>
  );
}
