/**
 * Non-breaking spaces where a line break would split a name: after surname
 * particles ("De Cruz", "Van Dort"), after "St." ("St. Bridget's"), and after
 * single-letter initials ("D S Senanayake"). Applied at render time so the
 * data stays as written.
 */
const JOIN = /(^|\s)(De|Da|Di|Du|Dos|Del|Van|Von|St\.|[A-Z]\.?)\s+(?=\S)/g;

export function keepTogether(text: string): string {
  // Twice, because the regex consumes the space it joins and adjacent
  // initials ("D S Senanayake") need both of theirs.
  return text.replace(JOIN, '$1$2\u00a0').replace(JOIN, '$1$2\u00a0');
}

const DATE = /\b(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})\b/g;

/** "21 November 2025" never splits across lines. */
export function keepDatesTogether(text: string): string {
  return text.replace(DATE, '$1\u00a0$2\u00a0$3');
}
