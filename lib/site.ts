/**
 * Single source of truth for site-wide structure and facts.
 * Sourced from CONTENT.md; URL mapping and rationale in design/DECISIONS.md §2.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Other sections this item lights up for: the pages reached from it. */
  match?: string[];
};

/**
 * Top-level labels and order are the previous Wix site's (an explicit
 * requirement). Only the URLs are cleaned; next.config.ts 301s every old path.
 * No dropdowns (decided by the user 2026-10-06): the council page is reached
 * from About, the newsletter from News, the College of DIRs from Archives.
 */
export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', match: ['/council'] },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Admin Documents', href: '/admin-documents' },
  { label: 'News', href: '/news', match: ['/newsletter'] },
  { label: 'Archives', href: '/archives' },
  { label: 'Media Crew', href: '/media-crew' },
  { label: 'Contact', href: '/contact' },
];

export const SITE = {
  name: 'Interact District 3220',
  shortName: 'Interact 3220',
  region: 'Sri Lanka & Maldives',
  /** The only public contact: no phone number is published (2026-10-06). */
  email: 'interactdistrictcouncil3220@gmail.com',
  url: 'https://www.interactdistrict3220.org',
  /**
   * Two DIFFERENT dates — don't conflate them.
   * The Interact movement was founded globally by Rotary International on
   * 5 November 1962 (CONTENT.md §1). Interact began in District 3220 in 1964.
   * Anything about this district uses `districtFounded`.
   */
  movementFounded: 1962,
  districtFounded: 1964,
  /** Rotary theme for 2026-27 — RI President Olayinka "Yinka" H. Babalola. */
  rotaryYear: '2026–27',
  rotaryTheme: 'Create Lasting Impact',
  /** Prose forms of the headline figures, for metadata and copy. */
  memberCountLabel: '3,500',
  clubCountLabel: '100+',
} as const;

export const STATS = [
  { value: 3500, display: '3,500', label: 'Members' },
  { value: 100, display: '100+', label: 'Clubs' },
  { value: 9, display: '9', label: 'Zones' },
  // The district's own start date, not the movement's — this is a district site.
  { value: 1964, display: '1964', label: 'In District 3220 since' },
] as const;

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/interact3220' },
  { label: 'Facebook', href: 'https://www.facebook.com/Interact3220' },
  { label: 'X', href: 'https://twitter.com/interact__3220' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/75000437/' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCPPsrcvlq87rcrXsUgs_URA' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@interact3220' },
] as const;

export type Avenue = {
  slug: string;
  name: string;
  /** Trimmed for the accordion rail — the full text lives in `blurb`. */
  short: string;
  blurb: string;
  logo: string;
  /**
   * Dominant colour of the logo artwork, sampled from the PNG itself.
   *
   * The five avenue marks are five unrelated saturated colours, and Finance
   * (#1B244A) is almost exactly our navy — so logos are never placed directly
   * on a navy panel. They sit on a near-white plate at full original colour
   * (design/DECISIONS.md §3). This value is only used for small accents that
   * are never the sole carrier of meaning.
   */
  logoColor: string;
};

export const AVENUES: Avenue[] = [
  {
    slug: 'community-service',
    name: 'Community Service',
    short: 'The heart and soul of the movement.',
    blurb:
      'Though community service is not an exclusive aspect of Interact, it is the heart and soul of the movement.',
    logo: '/images/avenues/avenue-community-service.png',
    logoColor: '#D8951C',
  },
  {
    slug: 'international-understanding',
    name: 'International Understanding',
    short: 'Good-will across communities.',
    blurb:
      'International Understanding is an avenue of service that promotes international good-will and understanding amongst communities.',
    logo: '/images/avenues/avenue-international-understanding.png',
    logoColor: '#97114B',
  },
  {
    slug: 'club-service',
    name: 'Club Service',
    short: 'Strengthening every club’s foundation.',
    blurb:
      'Club service is essentially the avenue of Interact which focuses on the wellbeing and the development of the basic foundation of a club.',
    logo: '/images/avenues/avenue-club-service.png',
    logoColor: '#A85619',
  },
  {
    slug: 'green-life',
    name: 'Green Life',
    short: 'Service that answers to the planet.',
    blurb:
      'The avenue of Green Life holds immense importance in the current world, seeing the lack of respect or thought we pay to Mother Earth.',
    logo: '/images/avenues/avenue-green-life.png',
    logoColor: '#187777',
  },
  {
    slug: 'finance',
    name: 'Finance',
    short: 'Fundraising that powers the rest.',
    blurb:
      'The finance projects and the fundraisers help to fund projects which happen under the other avenues of the club.',
    logo: '/images/avenues/avenue-finance.png',
    logoColor: '#1B244A',
  },
];
