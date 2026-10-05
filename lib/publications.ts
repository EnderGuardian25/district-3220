/**
 * Newsletter editions and administrative documents. Sources: CONTENT.md §8
 * and §10.
 *
 * Only one real file link survived the crawl (the 3rd quarterly edition on
 * Google Drive). The old site rendered the others through a Wix widget whose
 * URLs never appeared in the page HTML, so they are marked placeholders here
 * until the council supplies the files (CONTENT.md §19, gaps 3 and 9).
 */

export type Publication = {
  title: string;
  /** e.g. "2025/26". */
  year?: string;
  description?: string;
  kind: 'PDF' | 'Google Drive' | 'Document';
  /** Absent while the file is still to be supplied. */
  href?: string;
};

export const NEWSLETTER = {
  name: 'This Quarter in Interact',
  wordmark: '/images/branding/newsletter-tqi-logo.png',
  intro:
    'The Interact District Council’s official quarterly newsletter: a new initiative dedicated to strengthening communication, increasing awareness and celebrating the collective efforts of Interactors across the district.',
  covers: [
    'Highlights of district initiatives',
    'Upcoming projects, campaigns and service opportunities',
    'Leadership spotlights',
  ],
};

/** Newest first. */
export const NEWSLETTER_EDITIONS: Publication[] = [
  {
    title: 'Third Quarterly Edition',
    kind: 'Google Drive',
    href: 'https://drive.google.com/file/d/1fSRaoSrC0al0QJdr0Zle-y8nPjaP4MKk/view?usp=drivesdk',
  },
  // Linked from the old site's footer as "First Quarterly Newsletter.pdf".
  { title: 'First Quarterly Edition', kind: 'PDF' },
];

export const DOCUMENTS: Publication[] = [
  {
    title: 'District Directory',
    year: '2025/26',
    kind: 'PDF',
  },
];
