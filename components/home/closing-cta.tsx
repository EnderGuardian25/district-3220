import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

/**
 * One destination, one label. "Join a club" is the same string here as in the
 * header and the hero, because three different phrasings of one intent is how
 * a page ends up feeling like three different sites.
 */
export function ClosingCta() {
  return (
    <section id="join" aria-labelledby="join-heading" className="container-page py-16 md:py-24">
      <Reveal className="draft-grid overflow-hidden rounded-panel bg-navy-900 px-6 py-14 text-white md:px-14 md:py-20">
        <h2 id="join-heading" className="max-w-[16ch] text-[clamp(1.8rem,4vw,3.1rem)] leading-[1.06] font-semibold tracking-[-0.02em]">
          Your school can start a club this year.
        </h2>
        <p className="mt-4 max-w-[54ch] text-white/75">
          Tell the council where you are and who is interested. Chartering a new Interact club takes
          one conversation to begin.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" tone="onInk">
            Join a club
          </Button>
          <Button href="/contact" tone="onInkGhost">
            Contact the council
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
