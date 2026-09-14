import Image from 'next/image';
import { WALL_TILES } from '@/lib/home';
import { DrawLine, Reveal } from '@/components/motion/reveal';

const SPAN = {
  wide: 'col-span-2',
  tall: 'row-span-2',
  block: 'col-span-2 row-span-2',
  none: '',
} as const;

/**
 * The wall of real work. Carried over from the photographic direction, and the
 * one place on the page where breadth matters more than any single image.
 *
 * Not a morph-cursor target: the tiles are far larger than a control, and the
 * cursor guard would decline them anyway.
 */
export function PhotoWall() {
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-navy-900 text-white">
      <div className="container-page py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <div>
            <Reveal as="h2" className="max-w-[20ch] text-title" >
              <span id="work-heading">A year of the district, in photographs.</span>
            </Reveal>
            <Reveal step={1} as="p" className="mt-3.5 max-w-[56ch] text-white/70">
              Assemblies, training, media crew and club projects across nine zones.
            </Reveal>
          </div>
          <DrawLine className="bg-white/25" />
        </div>

        <ul className="mt-8 grid auto-rows-[clamp(84px,9.5vw,142px)] grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {WALL_TILES.map((t) => (
            <li
              key={t.src}
              className={`relative overflow-hidden rounded-[calc(var(--radius-media)*0.6)] bg-navy-800 ${
                SPAN[t.span ?? 'none']
              }`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 17vw"
                className="object-cover transition-transform duration-[600ms] ease-out-expo hover:scale-[1.07]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
