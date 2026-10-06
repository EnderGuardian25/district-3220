import { HeroCarousel } from '@/components/home/hero-carousel';
import { StatsBand } from '@/components/home/stats-band';
import { ProjectGrid } from '@/components/home/project-grid';
import { AvenuesAccordion } from '@/components/home/avenues-accordion';
import { PhotoWall } from '@/components/home/photo-wall';
import { OfficersBand } from '@/components/home/officers-band';
import { ClosingCta } from '@/components/home/closing-cta';
import { DrawLine, Reveal } from '@/components/motion/reveal';

/**
 * Section order is the split the brief settled on: the movement and its work
 * above, the members' working tools below, then one way in.
 */
export default function HomePage() {
  return (
    <main id="main">
      <HeroCarousel />
      <StatsBand />

      <section id="projects" aria-labelledby="projects-heading" className="container-page py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <div>
            <Reveal as="h2" className="max-w-[20ch] text-title">
              <span id="projects-heading">The projects the district is known for.</span>
            </Reveal>
            <Reveal step={1} as="p" className="mt-3.5 max-w-[56ch] text-content-muted">
              Each project is planned, funded and run by school students, with the support of the
              district council and Rotary. Select a project for details.
            </Reveal>
          </div>
          <DrawLine />
        </div>
        <ProjectGrid />
      </section>

      <section id="avenues" aria-labelledby="avenues-heading" className="container-page py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <div>
            <Reveal as="h2" className="max-w-[20ch] text-title">
              <span id="avenues-heading">Five avenues of service.</span>
            </Reveal>
            <Reveal step={1} as="p" className="mt-3.5 max-w-[56ch] text-content-muted">
              Every club project belongs to one of these avenues.
            </Reveal>
          </div>
          <DrawLine />
        </div>
        <AvenuesAccordion />
      </section>

      <PhotoWall />
      <OfficersBand />
      <ClosingCta />
    </main>
  );
}
