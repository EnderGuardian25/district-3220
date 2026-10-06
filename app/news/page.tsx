import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page/page-header';
import { Reveal } from '@/components/motion/reveal';
import { ClipReveal } from '@/components/motion/clip-reveal';
import { Button } from '@/components/ui/button';
import { POSTS, formatDate } from '@/lib/news';

export const metadata: Metadata = {
  title: 'News',
  description: 'Announcements, reports and tributes from the Interact District 3220 council.',
};

export default function NewsPage() {
  return (
    <main id="main">
      <PageHeader
        title="District news."
        lede="Announcements, reports and tributes from the district council."
      >
        <Button href="/newsletter" tone="ghost">
          The quarterly newsletter
        </Button>
      </PageHeader>


      <section aria-label="Posts" className="container-page py-14 md:py-20">
        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {POSTS.map((p, i) => (
            <li key={p.slug}>
              {/* The whole card is the link, but its accessible name is the title
                  alone: wrapping date, title and standfirst made the name a
                  paragraph. (A stretched link from the h2 can't work here: the
                  Reveal wrapper is transformed, so it would contain the overlay.) */}
              <Link href={`/news/${p.slug}`} aria-labelledby={`post-${p.slug}-title`} className="group block">
                {/* Clip Reveal as each post scrolls in: the same wipe as the hero. */}
                <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-panel bg-sunk">
                  {/* alt="" in the card: the link already reads the title and
                      standfirst, and the alt made its accessible name a paragraph. */}
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    preload={i === 0}
                    className="object-cover transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                    style={{ objectPosition: '50% 25%' }}
                  />
                </ClipReveal>
                <Reveal step={1}>
                  <p className="label-micro mt-5 text-content-soft">
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readMinutes} min read
                  </p>
                  <h2 id={`post-${p.slug}-title`} className="mt-3 max-w-[28ch] text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.12] tracking-[-0.018em] transition-colors duration-200 group-hover:text-accent-text">
                    {p.shortTitle ?? p.title}
                  </h2>
                  <p className="mt-3 max-w-[54ch] text-content-muted">{p.standfirst}</p>
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
