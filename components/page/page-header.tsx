import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { DrawLine, Reveal } from '@/components/motion/reveal';
import { ClipReveal } from '@/components/motion/clip-reveal';

/**
 * The opening of every inner page. Same grammar as a home-page section header
 * (Fraunces sentence, one muted lede, a DrawLine rule), one step larger, with
 * a breadcrumb eyebrow in place of the home page's hero.
 *
 * Inner pages deliberately have no transparent-header hero: they render no
 * `data-hero-top` marker, so SiteHeader shows its solid chalk bar at once.
 */
export function PageHeader({
  title,
  lede,
  crumbs = [],
  children,
}: {
  title: ReactNode;
  lede?: ReactNode;
  /** Ancestors, nearest last. The current page is the title, so it is not repeated. */
  crumbs?: { label: string; href: string }[];
  /** Actions under the lede, usually Buttons. */
  children?: ReactNode;
}) {
  return (
    <div className="container-page pt-12 md:pt-20">
      <Reveal>
        <nav aria-label="Breadcrumb" className="label-micro text-content-soft">
          <Link href="/" className="transition-colors duration-200 hover:text-accent-text">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.href}>
              <span aria-hidden="true"> / </span>
              <Link href={c.href} className="transition-colors duration-200 hover:text-accent-text">
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
      </Reveal>
      <Reveal step={1} as="h1" className="mt-5 max-w-[18ch] text-display">
        {title}
      </Reveal>
      {lede && (
        <Reveal step={2} as="p" className="mt-5 max-w-[58ch] text-[1.075rem] text-content-muted">
          {lede}
        </Reveal>
      )}
      {children && (
        <Reveal step={3} className="mt-8 flex flex-wrap gap-3">
          {children}
        </Reveal>
      )}
      <DrawLine className="mt-10 md:mt-14" />
    </div>
  );
}

/**
 * A full-width photograph straight under the page header, opened with the
 * Clip Reveal wipe. It is in the first viewport, so it animates from first
 * paint and takes `priority` as the likely LCP element.
 */
export function PageMedia({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="container-page mt-8 md:mt-10">
      <ClipReveal onLoad className="relative aspect-[4/3] overflow-hidden rounded-panel bg-sunk md:aspect-[21/9]">
        <Image src={src} alt={alt} fill priority sizes="(max-width: 1408px) 100vw, 1408px" className="object-cover" />
      </ClipReveal>
      {caption && <figcaption className="label-micro mt-3 text-content-soft">{caption}</figcaption>}
    </figure>
  );
}
