import type { NextConfig } from 'next';

/**
 * Old Wix paths → new clean URLs. The nav labels and order are unchanged from
 * the previous site (see design/DECISIONS.md §2); only the URLs are tidied, so
 * every inbound link and search result must keep working.
 */
const wixRedirects = [
  { from: '/district-calendar', to: '/calendar' },
  { from: '/blog', to: '/news' },
  { from: '/contact-8', to: '/contact' },
  { from: '/meet-the-council-2025-26', to: '/archives/council/2025-26' },
  { from: '/meet-the-council-2024-25', to: '/archives/council/2024-25' },
  { from: '/meet-the-council-2022-23', to: '/archives/council/2022-23' },
  { from: '/request-a-date', to: '/calendar/request-a-date' },
  { from: '/post/remembering-shawn-shiek-a-tribute-to-a-visionary-and-beloved-leader-in-interact-and-rotary', to: '/news/remembering-shawn-shiek' },
  { from: '/post/35th-interact-district-assembly-2025', to: '/news/35th-interact-district-assembly-2025' },

  // Archive year pages. Wix named most of them "copy-of-<the previous year>",
  // so the old slug is one year behind the content it holds (CONTENT.md §11).
  { from: '/ri-year-2024-25', to: '/archives/2024-25' },
  { from: '/ri-year-2023-24', to: '/archives/2023-24' },
  { from: '/ri-year-2022-23', to: '/archives/2022-23' },
  { from: '/ri-year-2021-22', to: '/archives/2021-22' },
  { from: '/copy-of-ri-year-2022-23', to: '/archives/2020-21' },
  { from: '/about-5', to: '/archives/1988-90' },
  { from: '/copy-of-ri-year-1988-89-90', to: '/archives/1990-91' },
  { from: '/copy-of-ri-year-1990-91', to: '/archives/1992-93' },
  { from: '/copy-of-ri-year-1992-93', to: '/archives/1993-94' },
  { from: '/copy-of-ri-year-1993-94', to: '/archives/1994-95' },
  { from: '/copy-of-ri-year-1994-95', to: '/archives/1995-96' },
  { from: '/copy-of-ri-year-1995-96', to: '/archives/1996-97' },
  { from: '/copy-of-ri-year-1996-97', to: '/archives/1997-98' },
  { from: '/copy-of-ri-year-1997-98', to: '/archives/1998-99' },
  { from: '/copy-of-ri-year-1998-99', to: '/archives/1999-2000' },
  { from: '/copy-of-ri-year-1999-2000', to: '/archives/2000-01' },
  { from: '/meet-the-council-2023-24', to: '/archives/2023-24' },
  { from: '/meet-the-council-2021-22', to: '/archives/2021-22' },

  // DIMUN '25 was its own five-page microsite; it is now one event page.
  // `/conference` was DIMUN's contact page, not a District Conference page.
  { from: '/dimun25', to: '/events/dimun-2025' },
  { from: '/about-dimun25', to: '/events/dimun-2025' },
  { from: '/committees', to: '/events/dimun-2025' },
  { from: '/dimun25-registrations', to: '/events/dimun-2025' },
  { from: '/conference', to: '/events/dimun-2025' },

  // Empty utility pages on the old site (CONTENT.md §16) — send to the nearest real page.
  { from: '/event-list', to: '/calendar' },
  { from: '/news-letter', to: '/newsletter' },

  // Same path on the old site and at launch; moved under Archives 2026-10-06.
  { from: '/college-of-dirs', to: '/archives/college-of-dirs' },
  { from: '/pricing-plans/list', to: '/' },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Widths tuned for the real audience: mid-range Android through desktop.
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
  },
  async redirects() {
    return wixRedirects.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
};

export default nextConfig;
