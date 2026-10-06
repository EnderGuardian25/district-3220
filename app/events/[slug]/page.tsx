import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Reveal } from '@/components/motion/reveal';
import { ClipReveal } from '@/components/motion/clip-reveal';
import { PeopleGrid } from '@/components/people/people-grid';
import { CommitteeGrid } from '@/components/events/committee-grid';
import { MailtoForm } from '@/components/forms/mailto-form';
import { TextArea, TextField } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import { EVENT_PAGES, getEventPage } from '@/lib/event-pages';

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENT_PAGES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEventPage((await params).slug);
  if (!e) return {};
  return { title: e.shortName, description: e.standfirst };
}

export default async function EventPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEventPage((await params).slug);
  if (!e) notFound();

  return (
    <main id="main">
      <PageHeader crumbs={[{ label: 'Calendar', href: '/calendar' }]} title={`${e.name}.`} lede={e.standfirst}>
        <span className="label-micro inline-flex items-center gap-2 rounded-control border border-control-border px-4 py-2.5 text-content-muted">
          <span aria-hidden="true" className={`size-1.5 rounded-full ${e.status === 'past' ? 'bg-control-border' : 'bg-accent'}`} />
          {e.status === 'past' ? 'Past event' : 'Upcoming'} · {e.when}
        </span>
      </PageHeader>

      {/* The masthead: the event's own white and gold artwork on navy. */}
      {(e.wordmark || e.emblem) && (
        <div className="container-page mt-8 md:mt-10">
          <ClipReveal onLoad className="rounded-panel bg-navy-900">
            <div className="flex flex-col items-center justify-center gap-8 px-6 py-12 sm:flex-row sm:gap-14 md:py-16">
              {e.emblem && (
                <div className="relative aspect-square w-32 md:w-44">
                  <Image src={e.emblem} alt="" fill preload sizes="176px" className="object-contain" />
                </div>
              )}
              {e.wordmark && (
                <div className="relative aspect-[16/9] w-72 md:w-[30rem]">
                  {/* The wordmark file carries wide transparent margins, hence the large box. */}
                  <Image src={e.wordmark} alt={e.shortName} fill preload sizes="480px" className="object-contain" />
                </div>
              )}
            </div>
          </ClipReveal>
        </div>
      )}

      <section aria-labelledby="about-heading" className="container-page pt-16 md:pt-24">
        <SectionHeader id="about-heading" title={e.about.title} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-10">
          {e.about.body.map((p, i) => (
            <Reveal key={i} step={i} as="p" className={i === 0 ? 'font-display text-[1.3rem] leading-[1.5]' : 'text-[1.05rem] text-content-muted'}>
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      {e.committees && (
        <section aria-labelledby="committees-heading" className="container-page pt-16 md:pt-24">
          <SectionHeader id="committees-heading" title={e.committees.title} lede={e.committees.lede} />
          <div className="mt-8">
            <CommitteeGrid items={e.committees.items} scope={e.slug} />
          </div>
        </section>
      )}

      {e.people && (
        <section aria-labelledby="people-heading" className="container-page pt-16 md:pt-24">
          <SectionHeader id="people-heading" title={e.people.title} />
          <div className="mt-8">
            <PeopleGrid people={e.people.items} scope={`${e.slug}-people`} />
          </div>
        </section>
      )}

      {e.registration && (
        <section aria-labelledby="registration-heading" className="container-page pt-16 md:pt-24">
          <Reveal className="flex flex-col gap-5 rounded-panel border border-hairline bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 id="registration-heading" className="text-[1.45rem] leading-tight tracking-[-0.015em]">
                {e.registration.title}
              </h2>
              <p className="mt-2 max-w-[56ch] text-content-muted">{e.registration.detail}</p>
            </div>
            {e.registration.status === 'open' && e.registration.href ? (
              <Button href={e.registration.href} target="_blank" rel="noreferrer" className="shrink-0">
                Register
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>
            ) : (
              <span className="label-micro shrink-0 self-start rounded-control border border-control-border px-4 py-2.5 text-content-soft md:self-auto">
                Closed
              </span>
            )}
          </Reveal>
        </section>
      )}

      {e.contact && (
        <section aria-labelledby="contact-heading" className="container-page py-16 md:py-24">
          <SectionHeader id="contact-heading" title={e.contact.title} lede={e.contact.lede} />
          {/* Fields as on the old DIMUN contact page (CONTENT.md §15.5). */}
          <div className="mt-8 max-w-3xl">
            <MailtoForm subject={`${e.shortName} enquiry`} subjectField="club" submitLabel="Send the question">
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField name="firstName" label="First name" required autoComplete="given-name" />
                <TextField name="lastName" label="Last name" required autoComplete="family-name" />
                <TextField name="club" label="Interact or MUN club" required />
                <TextField name="position" label="Position" required />
                <TextField name="email" label="Email" type="email" required autoComplete="email" />
                <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" />
              </div>
              <TextArea name="concern" label="Your question" required />
            </MailtoForm>
          </div>
        </section>
      )}
    </main>
  );
}
