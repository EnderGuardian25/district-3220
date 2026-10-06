import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page/page-header';
import { Placeholder } from '@/components/page/placeholder';
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

      <div className="container-page mt-10">
        <Placeholder label="2026/27 posts to come" className="max-w-3xl">
          These are the posts carried over from the old site. News from the 2026/27 year will appear
          here as the council publishes it.
        </Placeholder>
      </div>

      <section aria-label="Posts" className="container-page py-14 md:py-20">
        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {POSTS.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/news/${p.slug}`} className="group block">
                {/* Clip Reveal as each post scrolls in: the same wipe as the hero. */}
                <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-panel bg-sunk">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                    className="object-cover transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.03]"
                    style={{ objectPosition: '50% 25%' }}
                  />
                </ClipReveal>
                <Reveal step={1}>
                  <p className="label-micro mt-5 text-content-soft">
                    {formatDate(p.date)} · {p.readMinutes} min read
                  </p>
                  <h2 className="mt-3 max-w-[28ch] text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.12] tracking-[-0.018em] transition-colors duration-200 group-hover:text-accent-text">
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
