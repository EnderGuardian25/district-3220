import { Hero } from '@/components/home/hero';
import { StatsBand } from '@/components/home/stats-band';
import { AvenuesAccordion } from '@/components/home/avenues-accordion';
import { EventsFeed } from '@/components/home/events-feed';
import { ClosingCta } from '@/components/home/closing-cta';
import { HeroReveal } from '@/components/site/hero-reveal';

export default function HomePage() {
  return (
    <main id="main">
      <HeroReveal>
        <Hero />
      </HeroReveal>

      {/*
        Pulled up by exactly the hero's scroll runway so this content sits
        directly BEHIND the pinned hero — it's what shows through the aperture as
        it opens. Without this it would start a viewport lower and the hole would
        reveal nothing.

        z-0 keeps it below the lid (z-20) but above the fixed site background
        (-z-10). Once the runway is spent the hero unpins and scrolling here is
        completely ordinary.
      */}
      <div className="hero-runway-offset relative z-0">
        <StatsBand />
        <AvenuesAccordion />
        <EventsFeed />
        <ClosingCta />
      </div>
    </main>
  );
}
