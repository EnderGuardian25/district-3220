/**
 * Calendar-day keys in Sri Lanka time, shared by the calendar page (server)
 * and the calendar view (client). Built from formatToParts rather than by
 * trusting a locale's whole-string format: keys are compared as strings, so
 * they must be YYYY-MM-DD whatever a browser's ICU data does to "en-CA".
 */
const parts = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Colombo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function colomboDayKey(date: Date) {
  const p = Object.fromEntries(parts.formatToParts(date).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
}

/** Noon UTC on a calendar day, so formatting a key never slips a day. */
export const fromDayKey = (key: string) => new Date(`${key}T12:00:00Z`);

/** The key `days` after (or before) another. */
export const shiftDayKey = (key: string, days: number) =>
  new Date(fromDayKey(key).getTime() + days * 86_400_000).toISOString().slice(0, 10);
