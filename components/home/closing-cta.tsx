import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

/**
 * One destination, one label. "Join a club" is the same string here as in the
 * hero (which scrolls here), because three phrasings of one intent is how a
 * page ends up feeling like three different sites. The second button goes
 * somewhere different, so two labels never share one destination.
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
          <Button href="/about" tone="onInkGhost">
            About the district
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
