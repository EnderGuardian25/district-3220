import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { ARCHIVE_YEARS } from '@/lib/archives';
import { PAST_COUNCILS } from '@/lib/councils';
import { POSTS } from '@/lib/news';
import { EVENT_PAGES } from '@/lib/event-pages';

/**
 * Every public page, generated from the same data the pages render from, so a
 * new archive year, post or event page is listed without touching this file.
 * /kit is development-only and deliberately absent.
 */
const STATIC = [
  '/',
  '/about',
  '/council/2026-27',
  '/college-of-dirs',
  '/calendar',
  '/calendar/request-a-date',
  '/admin-documents',
  '/news',
  '/newsletter',
  '/archives',
  '/media-crew',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path === '/' ? '' : path}`;
  return [
    ...STATIC.map((p) => ({ url: url(p) })),
    ...ARCHIVE_YEARS.map((y) => ({ url: url(`/archives/${y.slug}`) })),
    ...PAST_COUNCILS.map((c) => ({ url: url(`/archives/council/${c.year}`) })),
    ...POSTS.map((p) => ({ url: url(`/news/${p.slug}`), lastModified: p.updated ?? p.date })),
    ...EVENT_PAGES.map((e) => ({ url: url(`/events/${e.slug}`) })),
  ];
}
