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
  // Empty utility pages on the old site (CONTENT.md §16) — send to the nearest real page.
  { from: '/event-list', to: '/calendar' },
  { from: '/news-letter', to: '/newsletter' },
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
