/**
 * About page content. Sources: CONTENT.md §1 and §4 (vision, mission, goals,
 * zones), CONTENT.md §6 (district numbering), ARCHIVES.md (milestones).
 * Every milestone below is sourced; none are inferred.
 */

export const PURPOSE = [
  {
    title: 'Vision',
    body: 'To instil a “Service Above Self” mentality, embed Rotary’s core values and the Four-Way Test, and show that true prosperity comes from serving others.',
  },
  {
    title: 'Mission',
    body: 'A unified platform built on the spirit of “Service Above Self”, cultivating responsible citizens and developing leadership, honour, humility and altruism.',
  },
  {
    title: 'Goals',
    body: 'An inclusive community that reaches beyond club boundaries, uniting as one movement to better the country and the world.',
  },
] as const;

/** The zones as the About page lists them, plus the Maldives region. */
export const ZONES = [
  'Colombo',
  'Kandy',
  'Kurunegala',
  'Negombo',
  'Galle',
  'Gem City',
  'Tea Country',
  'Jaffna',
  'Kegalle',
  'Maldives region',
] as const;

export const MILESTONES = [
  { year: '1962', text: 'Rotary International founds Interact on 5 November, its service club for young people.' },
  { year: '1964', text: 'Interact begins in the district.' },
  { year: '1979', text: 'The first District Interact Representatives on record, under Rotary District 321.' },
  { year: '1984', text: 'Interact in the district now serves under Rotary District 322.' },
  { year: '1991', text: 'Rotary District 3220 begins, the number the district carries today.' },
  { year: '1993/94', text: 'The district reaches 100 Interact clubs.' },
  { year: '1994/95', text: 'Sri Lanka’s first two-way Interact youth exchange with India.' },
  { year: '2024/25', text: '142 clubs after nine new charters, among them the Interact Club of the School for the Blind.' },
] as const;
