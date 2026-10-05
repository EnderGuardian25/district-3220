import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { ClipReveal } from '@/components/motion/clip-reveal';
import { ServicesAccordion } from '@/components/media/services-accordion';
import { MailtoForm } from '@/components/forms/mailto-form';
import { ChoiceChips, TextArea, TextField } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import { MEDIA_CREW, SERVICE_OPTIONS } from '@/lib/media-crew';

export const metadata: Metadata = {
  title: 'Media Crew',
  description: 'The Interact District 3220 Media Crew: photography, video, livestreams, design, compering and photo booths for every club.',
};

export default function MediaCrewPage() {
  return (
    <main id="main">
      <PageHeader title="The District Media Crew." lede={MEDIA_CREW.about}>
        <Button href="#request">Request coverage</Button>
      </PageHeader>

      {/* Masthead: the white Media Crew mark on its own pattern artwork. */}
      <div className="container-page mt-8 md:mt-10">
        <ClipReveal onLoad className="relative overflow-hidden rounded-panel bg-navy-900">
          <Image src={MEDIA_CREW.pattern} alt="" fill priority sizes="(max-width: 1408px) 100vw, 1408px" className="object-cover opacity-25" />
          <div className="relative flex flex-col items-center gap-6 px-6 py-14 text-center md:py-20">
            <div className="relative aspect-square w-40 md:w-56">
              <Image src={MEDIA_CREW.logo} alt="Interact District 3220 Media Crew" fill sizes="224px" className="object-contain" />
            </div>
            <p className="max-w-[48ch] text-sm text-white/75">{MEDIA_CREW.runBy}</p>
          </div>
        </ClipReveal>
      </div>

      <section aria-labelledby="services-heading" className="container-page pt-16 md:pt-24">
        <SectionHeader
          id="services-heading"
          title="Six services, on request."
          lede="Open one to request it. Your club can ask for as many as the event needs."
        />
        <ServicesAccordion formId="request" />
      </section>

      <section aria-labelledby="request-heading" className="container-page py-16 md:py-24">
        <div id="request" className="scroll-mt-28">
          <SectionHeader
            id="request-heading"
            title="Request the crew."
            lede="Tell the crew about the event. The Director of the Media Crew replies by email."
          />
          {/* Fields as on the old service request form (CONTENT.md §12). */}
          <div className="mt-8 max-w-3xl">
            <MailtoForm subject="Media Crew request" subjectField="event" submitLabel="Send the request">
              <fieldset className="grid gap-6 sm:grid-cols-2">
                <legend className="label-micro mb-5 text-content-soft">About you</legend>
                <TextField name="name" label="Interactor’s name" required autoComplete="name" />
                <TextField name="club" label="Interact club" required />
                <TextField name="designation" label="Designation" required placeholder="e.g. Club Secretary" />
                <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" />
                <TextField name="email" label="Email" type="email" required autoComplete="email" className="sm:col-span-2" />
              </fieldset>
              <fieldset className="mt-4 grid gap-6 sm:grid-cols-2">
                <legend className="label-micro mb-5 text-content-soft">The event</legend>
                <TextField name="event" label="Event or project name" required className="sm:col-span-2" />
                <TextField name="location" label="Event location" required />
                <TextField name="when" label="Date and time" type="datetime-local" required />
              </fieldset>
              <ChoiceChips name="services" label="Services needed" options={SERVICE_OPTIONS} required />
              <TextArea name="comments" label="Other comments" />
            </MailtoForm>
          </div>
        </div>
      </section>
    </main>
  );
}
