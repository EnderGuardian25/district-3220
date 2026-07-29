import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { ThemeScript } from '@/components/theme/theme-script';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteBackground } from '@/components/site/site-background';
import { SITE } from '@/lib/site';

/**
 * One variable family for the whole site — hierarchy comes from weight and
 * scale (design/DECISIONS.md §4). Cheapest of the pairings considered, which
 * leaves budget for the 150 images and the motion.
 */
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Service`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} brings together young people across ${SITE.region} to serve their communities. Interact is Rotary International's service club for people aged 12–19.`,
  openGraph: {
    title: SITE.name,
    description: `Young people across ${SITE.region}, serving their communities.`,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f7fa' },
    { media: '(prefers-color-scheme: dark)', color: '#050c17' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript mutates data-theme before React
    // hydrates, so the server and client values legitimately differ here.
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <SiteBackground />
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-on"
          >
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
