/**
 * The shape every profile on the site shares: council members, past councils,
 * event committees. One type so one card component renders all of them.
 */
export type Person = {
  name: string;
  position: string;
  /** Shown in the expanded profile. Kept verbatim from the source pages. */
  bio?: string;
  /** Path under /public. Absent where the district has no portrait. */
  image?: string;
  /**
   * CSS object-position for the 4:5 portrait crop. The source portraits are
   * full-length and centred, so the default puts the head in the top third.
   * Override only where a specific photograph frames differently.
   */
  focus?: string;
  /** An unfilled slot awaiting the district. Renders as "To be announced". */
  tba?: boolean;
};

export type PeopleGroup = {
  title: string;
  people: Person[];
};

export const DEFAULT_FOCUS = '50% 22%';
