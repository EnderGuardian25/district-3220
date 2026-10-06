/**
 * Home-page content. Kept out of the components so copy can be edited without
 * touching layout, and so the eventual CMS swap is a change to this file only.
 *
 * Photography status (2026-09-14): Interflash and Race4Change have no images in
 * the repo. Both use a marked placeholder; see `needsPhoto` on each flagship.
 * Every other image here is a real district photograph from public/images.
 */

import type { StaticImageData } from 'next/image';
import assembly from '@/public/images/hero/assembly.webp';
import assembly35th from '@/public/images/blog/blog-35th-district-assembly.jpg';
import compering from '@/public/images/media-crew/media-compering.jpg';
import livestreaming from '@/public/images/media-crew/media-livestreaming.jpg';
import photography from '@/public/images/media-crew/media-photography.jpg';
import videography from '@/public/images/media-crew/media-videography.jpg';
import designing from '@/public/images/media-crew/media-designing.jpg';
import photoBooths from '@/public/images/media-crew/media-photo-booths.jpg';

/**
 * Source width / height, read from the image file at build time (static
 * imports carry the real dimensions), so swapping a photo can't leave a stale
 * hand-typed ratio behind. The `src` strings stay as plain public paths.
 */
const ratio = (img: StaticImageData) => img.width / img.height;

export type HeroSlide = {
  src: string;
  /**
   * Source width / height. The hero crops with object-cover into a portrait
   * box on phones, so `sizes` has to ask for the cropped width, not 100vw, or
   * a 390px phone was served a 1024px file stretched 4x. Always `ratio(import)`
   * of the same file as `src`.
   */
  aspect: number;
  /** Empty alt is wrong here: these are content images, not decoration. */
  alt: string;
  /** Shown in the carousel's caption line. */
  caption: string;
};

/** Four slides. Fewer feels thin, more and the last ones are never seen. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/images/hero/assembly.webp',
    aspect: ratio(assembly),
    alt: 'Interactors from clubs across the district filling the assembly hall',
    caption: 'District Assembly, Colombo',
  },
  {
    src: '/images/blog/blog-35th-district-assembly.jpg',
    aspect: ratio(assembly35th),
    alt: 'Delegates seated at the 35th District Assembly',
    caption: '35th District Assembly',
  },
  {
    src: '/images/media-crew/media-compering.jpg',
    aspect: ratio(compering),
    alt: 'Student compères running a district conference from the podium',
    caption: 'Interactors running the floor',
  },
  {
    src: '/images/media-crew/media-livestreaming.jpg',
    aspect: ratio(livestreaming),
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
  /** True where the copy itself is a placeholder awaiting the district. */
  needsContent?: boolean;
  /** The project's own page, where one exists. */
  href?: string;
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
    href: '/events/dimun-2025',
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
  /**
   * TODO(district): IBTS and Intercede have no content anywhere in the repo.
   * Each needs a name check, the one figure it is known for, a one-line
   * headline, a sentence of detail, and a photograph. Everything below is a
   * deliberate placeholder so the five-tile layout is real.
   */
  {
    slug: 'ibts',
    name: 'IBTS',
    figure: 'TODO',
    figureLabel: 'Awaiting figure',
    headline: 'Headline to come from the district.',
    blurb: 'Placeholder. Send the one-line description and the number this project is known for.',
    image: '/images/media-crew/media-designing.jpg',
    imageAlt: 'Placeholder for IBTS photography',
    needsPhoto: true,
    needsContent: true,
  },
  {
    slug: 'intercede',
    name: 'Intercede',
    figure: 'TODO',
    figureLabel: 'Awaiting figure',
    headline: 'Headline to come from the district.',
    blurb: 'Placeholder. Send the one-line description and the number this project is known for.',
    image: '/images/media-crew/media-photo-booths.jpg',
    imageAlt: 'Placeholder for Intercede photography',
    needsPhoto: true,
    needsContent: true,
  },
];

/**
 * The five avenues, with the colour sampled from each logo. The mark sits on a
 * tint of its own colour and the name sits on the solid version; `onSolid` sets
 * the text colour on that band.
 *
 * CONTRAST NOTE: all five are 'light' (white) by request. White on Community
 * Service's #D8951C measures 2.55:1, because that amber is the one light colour
 * in the set. Applied 2026-10-06 (contrast must pass AA everywhere): that band
 * alone is darkened via `solid`, while the logo tint and the mobile edge keep
 * the true brand amber in `colour`. The fix previously noted here, #A86F12,
 * actually measures 4.24:1 and fails; #906413 is the lightest step of the same
 * hue that passes for both the name (white, 5.23:1) and the open blurb (white
 * at 90%, 4.58:1).
 */
export type AvenuePanel = {
  slug: string;
  name: string;
  blurb: string;
  logo: string;
  /** Brand colour sampled from the logo: tints, edges, labels. */
  colour: string;
  /** Solid band behind the white name, when `colour` itself can't carry white text at AA. */
  solid?: string;
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
    solid: '#906413',
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

export type WallItem = {
  src: string;
  alt: string;
  /** Source width / height, for `sizes` (see HeroSlide.aspect). */
  aspect: number;
  /** Shown above the image, the way the reference strip labels each plate. */
  caption: string;
  /**
   * Rendered after the caption. Only set where the date is actually sourced;
   * see the note on WALL_ITEMS. An unsourced year is a fabricated fact about
   * the district's own record, so absent is correct where it is unknown.
   */
  year?: string;
  /**
   * 'district' is a real photograph of this district. 'stock' is a generic
   * image inherited from the old Wix site. The distinction drives what may
   * legitimately be captioned as an event.
   */
  provenance: 'district' | 'stock';
  /** Plate size in the horizontal collage. */
  size: 'sm' | 'md' | 'lg';
  /** Vertical placement, which is what stops the strip reading as a row. */
  drop: 'top' | 'mid' | 'low';
};

/**
 * The horizontal collage. Sizes and drops alternate on purpose: a strip where
 * every plate is the same size at the same height reads as a filmstrip, not as
 * an edit.
 *
 * TWO THINGS TO FIX BEFORE THIS SECTION IS HONEST:
 *
 * 1. Provenance. Only two of these are photographs of District 3220. The six
 *    `media-*.jpg` are the Media Crew SERVICE CATEGORY images from the old Wix
 *    site (CONTENT.md §12). They are generic stock. A section headed "A year
 *    of the district, in photographs" that is 75% stock misrepresents the
 *    district, so their captions name the service rather than claiming an
 *    event, and they carry no year. Replace them with real photography.
 *
 *    The two `decor-*.jpg` plates ("decorative imagery", CONTENT.md §3) were
 *    dropped on 2026-10-06 at the user's request: a plate captioned
 *    "Decorative" read as a bug, and nothing true could be said about them.
 *
 * 2. Years. Only the 35th District Assembly is dated anywhere in the repo:
 *    CONTENT.md §9 records it as 29 June 2025 at Wave & Lake, the collaring of
 *    Int. PP. Jezon Fernando. Everything else is undated, and inventing a year
 *    on a district's own record is worse than leaving it off.
 *
 * `blog-shawn-shiek-tribute.jpg` is deliberately absent. It is a memorial card,
 * and a tribute used as decorative filler reads badly however good the image
 * is. If the district wants it on the site it belongs in News with its context.
 */
export const WALL_ITEMS: WallItem[] = [
  // TODO(district): confirm the year. Almost certainly the same 2025 assembly
  // as the plate below, but the repo does not say so and it is a different shot.
  { src: '/images/hero/assembly.webp', aspect: ratio(assembly), alt: 'Interactors from clubs across the district filling the assembly hall', caption: 'District Assembly', provenance: 'district', size: 'lg', drop: 'mid' },
  { src: '/images/media-crew/media-photography.jpg', aspect: ratio(photography), alt: 'A photographer holding a camera at sunset', caption: 'Media Crew, photography', provenance: 'stock', size: 'sm', drop: 'top' },
  { src: '/images/blog/blog-35th-district-assembly.jpg', aspect: ratio(assembly35th), alt: 'The incoming District Interact Representative being collared at the 35th District Assembly', caption: '35th District Assembly', year: '2025', provenance: 'district', size: 'md', drop: 'low' },
  { src: '/images/media-crew/media-compering.jpg', aspect: ratio(compering), alt: 'A compère addressing an audience from a podium', caption: 'Media Crew, compering', provenance: 'stock', size: 'lg', drop: 'top' },
  { src: '/images/media-crew/media-livestreaming.jpg', aspect: ratio(livestreaming), alt: 'A live streaming camera at an event', caption: 'Media Crew, live streaming', provenance: 'stock', size: 'sm', drop: 'mid' },
  { src: '/images/media-crew/media-videography.jpg', aspect: ratio(videography), alt: 'A video camera with a shotgun microphone', caption: 'Media Crew, videography', provenance: 'stock', size: 'md', drop: 'low' },
  { src: '/images/media-crew/media-designing.jpg', aspect: ratio(designing), alt: 'A designer working at a laptop', caption: 'Media Crew, design', provenance: 'stock', size: 'md', drop: 'mid' },
  { src: '/images/media-crew/media-photo-booths.jpg', aspect: ratio(photoBooths), alt: 'A hand holding printed photo booth strips', caption: 'Media Crew, photo booths', provenance: 'stock', size: 'sm', drop: 'low' },
];

/** The member-facing utility band. Mirrors the nav, minus the public pages. */
export const OFFICER_LINKS = [
  { label: 'Calendar', href: '/calendar', note: 'Dates and deadlines' },
  { label: 'Admin Documents', href: '/admin-documents', note: 'Forms and reporting' },
  { label: 'News', href: '/news', note: 'District bulletin' },
  { label: 'Newsletter', href: '/newsletter', note: 'Every issue' },
  { label: 'Archives', href: '/archives', note: '1988 to today' },
  { label: 'Meet the Council', href: '/council/2026-27', note: '2026 / 27' },
  { label: 'College of DIRs', href: '/archives/college-of-dirs', note: 'Past district reps' },
  { label: 'Media Crew', href: '/media-crew', note: 'Request coverage' },
] as const;
