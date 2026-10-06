import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { DrawLine } from '@/components/motion/reveal';
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
      {/* The header animates from first paint (rise-in-load, globals.css), not
          through Reveal: Reveal server-renders at opacity 0 until JavaScript
          hydrates, which held back the page's h1, its largest text. */}
      <div className="rise-in-load">
        {/* A real list, so screen readers announce "list, 2 items". Inline
            throughout, so it looks exactly as the plain spans did. The
            current page isn't repeated: it is the h1 directly below. */}
        <nav aria-label="Breadcrumb" className="label-micro text-content-soft">
          <ol className="inline">
            <li className="inline">
              <Link href="/" className="transition-colors duration-200 hover:text-accent-text">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="inline">
                <span aria-hidden="true"> / </span>
                <Link href={c.href} className="transition-colors duration-200 hover:text-accent-text">
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <h1 className="rise-in-load mt-5 max-w-[18ch] text-display" style={{ ['--step' as string]: 1 }}>
        {title}
      </h1>
      {lede && (
        <p className="rise-in-load mt-5 max-w-[58ch] text-[1.075rem] text-content-muted" style={{ ['--step' as string]: 2 }}>
          {lede}
        </p>
      )}
      {children && (
        <div className="rise-in-load mt-8 flex flex-wrap gap-3" style={{ ['--step' as string]: 3 }}>
          {children}
        </div>
      )}
      <DrawLine className="mt-10 md:mt-14" />
    </div>
  );
}

/**
 * A full-width photograph straight under the page header, opened with the
 * Clip Reveal wipe. It is in the first viewport, so it animates from first
 * paint and takes `preload` (Next 16's name for priority) as the likely LCP element.
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
        <Image src={src} alt={alt} fill preload sizes="(max-width: 1408px) 100vw, 1408px" className="object-cover" />
      </ClipReveal>
      {caption && <figcaption className="label-micro mt-3 text-content-soft">{caption}</figcaption>}
    </figure>
  );
}
