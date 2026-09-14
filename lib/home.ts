/**
 * Home-page content. Kept out of the components so copy can be edited without
 * touching layout, and so the eventual CMS swap is a change to this file only.
 *
 * Photography status (2026-09-14): Interflash and Race4Change have no images in
 * the repo. Both use a marked placeholder; see `needsPhoto` on each flagship.
 * Every other image here is a real district photograph from public/images.
 */

export type HeroSlide = {
  src: string;
  /** Empty alt is wrong here: these are content images, not decoration. */
  alt: string;
  /** Shown in the carousel's caption line. */
  caption: string;
};

/** Four slides. Fewer feels thin, more and the last ones are never seen. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/images/hero/assembly.webp',
    alt: 'Interactors from clubs across the district filling the assembly hall',
    caption: 'District Assembly, Colombo',
  },
  {
    src: '/images/blog/blog-35th-district-assembly.jpg',
    alt: 'Delegates seated at the 35th District Assembly',
    caption: '35th District Assembly',
  },
  {
    src: '/images/media-crew/media-compering.jpg',
    alt: 'Student compères running a district conference from the podium',
    caption: 'Interactors running the floor',
  },
  {
    src: '/images/media-crew/media-livestreaming.jpg',
    alt: 'Students operating a livestream desk at a district event',
    caption: 'Media Crew, livestreaming a district event',
  },
];

export type Flagship = {
  slug: string;
  name: string;
  /** The single number this project is known for. */
  figure: string;
  figureLabel: string;
  headline: string;
  blurb: string;
  image: string;
  imageAlt: string;
  /** True where the district has no photograph yet and this is a placeholder. */
  needsPhoto?: boolean;
};

export const FLAGSHIPS: Flagship[] = [
  {
    slug: 'interflash',
    name: 'Interflash',
    figure: '10,000+',
    figureLabel: 'Guests',
    headline: 'A concert on a ten thousand seat scale.',
    blurb:
      "The district's largest public event, staged and run end to end by school students.",
    image: '/images/hero/assembly.webp',
    imageAlt: 'Placeholder for Interflash photography',
    needsPhoto: true,
  },
  {
    slug: 'dimun',
    name: 'DIMUN',
    figure: '6',
    figureLabel: 'Committees',
    headline: 'The first Interact Model UN in Sri Lanka.',
    blurb:
      'District Interact Model United Nations, with its own committees, topics and study guides.',
    image: '/images/media-crew/media-compering.jpg',
    imageAlt: 'Student delegates at a district conference',
  },
  {
    slug: 'race4change',
    name: 'Race4Change',
    figure: '5 km',
    figureLabel: 'Galle Face Green',
    headline: 'A public charity run for the Little Hearts Foundation.',
    blurb:
      "Open registration and corporate teams, raising funds for children's cardiac care.",
    image: '/images/blog/blog-35th-district-assembly.jpg',
    imageAlt: 'Placeholder for Race4Change photography',
    needsPhoto: true,
  },
];

/**
 * The five avenues, with the colour sampled from each logo. The mark sits on a
 * tint of its own colour and the name sits on the solid version; `onSolid` sets
 * the text colour on that band.
 *
 * CONTRAST NOTE: all five are now 'light' (white) by request. Four of them pass
 * WCAG AA comfortably. Community Service does not: white on #D8951C measures
 * about 2.6:1 against a 4.5 requirement, because that amber is the one light
 * colour in the set. If it needs to pass, the one-line fix is to darken only
 * that band to #A86F12 (white reaches 4.6) while the logo tint keeps the true
 * brand amber.
 */
export type AvenuePanel = {
  slug: string;
  name: string;
  blurb: string;
  logo: string;
  colour: string;
  onSolid: 'light' | 'dark';
};

export const AVENUE_PANELS: AvenuePanel[] = [
  {
    slug: 'community-service',
    name: 'Community Service',
    blurb:
      'The heart and soul of the movement, and the avenue most club projects are built under.',
    logo: '/images/avenues/avenue-community-service.png',
    colour: '#D8951C',
    onSolid: 'light',
  },
  {
    slug: 'international-understanding',
    name: 'International Understanding',
    blurb: 'Promotes good will and understanding between communities, at home and beyond.',
    logo: '/images/avenues/avenue-international-understanding.png',
    colour: '#97114B',
    onSolid: 'light',
  },
  {
    slug: 'club-service',
    name: 'Club Service',
    blurb: 'The wellbeing and development of the basic foundation of every club in the district.',
    logo: '/images/avenues/avenue-club-service.png',
    colour: '#A85619',
    onSolid: 'light',
  },
  {
    slug: 'green-life',
    name: 'Green Life',
    blurb: 'Service that answers to the planet, and the avenue that has grown fastest.',
    logo: '/images/avenues/avenue-green-life.png',
    colour: '#187777',
    onSolid: 'light',
  },
  {
    slug: 'finance',
    name: 'Finance',
    blurb: 'Fundraisers that pay for the projects running under every other avenue.',
    logo: '/images/avenues/avenue-finance.png',
    colour: '#1B244A',
    onSolid: 'light',
  },
];

export type WallTile = {
  src: string;
  alt: string;
  /** Grid span. The rhythm is deliberate, not decorative. */
  span?: 'wide' | 'tall' | 'block';
};

/**
 * Ten tiles, spanned so the grid closes with no empty cell at 6 columns, and
 * `grid-flow-dense` in the component covers the narrower breakpoints.
 *
 * `blog-shawn-shiek-tribute.jpg` is deliberately NOT here. It is a memorial
 * card, and a tribute used as decorative filler in a "year in photographs"
 * mosaic reads badly however good the image is. If the district wants it on the
 * site it belongs in News with its own context, not in a wall.
 */
export const WALL_TILES: WallTile[] = [
  { src: '/images/hero/assembly.webp', alt: 'District assembly hall', span: 'block' },
  { src: '/images/media-crew/media-photography.jpg', alt: 'Student photographer on assignment' },
  { src: '/images/media-crew/media-videography.jpg', alt: 'Student videographer filming' },
  { src: '/images/blog/blog-35th-district-assembly.jpg', alt: 'The 35th District Assembly', span: 'wide' },
  { src: '/images/media-crew/media-livestreaming.jpg', alt: 'Livestream desk at a district event' },
  { src: '/images/media-crew/media-designing.jpg', alt: 'Student designer at work' },
  { src: '/images/media-crew/media-compering.jpg', alt: 'Students compering an event', span: 'wide' },
  { src: '/images/decor/decor-sphere-stairs.jpg', alt: 'Event venue detail', span: 'wide' },
  { src: '/images/media-crew/media-photo-booths.jpg', alt: 'Event photo booth', span: 'wide' },
  { src: '/images/decor/decor-white-structure.jpg', alt: 'Venue architecture', span: 'wide' },
];

/** The member-facing utility band. Mirrors the nav, minus the public pages. */
export const OFFICER_LINKS = [
  { label: 'Calendar', href: '/calendar', note: 'Dates and deadlines' },
  { label: 'Admin Documents', href: '/admin-documents', note: 'Forms and reporting' },
  { label: 'News', href: '/news', note: 'District bulletin' },
  { label: 'Newsletter', href: '/newsletter', note: 'Every issue' },
  { label: 'Archives', href: '/archives', note: '1988 to today' },
  { label: 'Meet the Council', href: '/council/2026-27', note: '2026 / 27' },
  { label: 'College of DIRs', href: '/college-of-dirs', note: 'Past district reps' },
  { label: 'Media Crew', href: '/media-crew', note: 'Request coverage' },
] as const;
