import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { Reveal } from '@/components/motion/reveal';
import { MailtoForm } from '@/components/forms/mailto-form';
import { COUNTRIES, SelectField, TextArea, TextField } from '@/components/forms/fields';
import { SocialIcon } from '@/components/site/social-icon';
import { SITE, SOCIALS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact the ${SITE.name} council: questions, partnerships, or starting an Interact club at your school.`,
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        title="Contact the council."
        lede="Questions, partnerships, or starting an Interact club at your school: write to the council and the right person will reply."
      />

      <section aria-label="Contact" className="container-page grid gap-14 py-14 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-16 md:py-20">
        <Reveal as="aside" className="md:sticky md:top-28 md:self-start">
          <dl className="flex flex-col gap-7">
            <div>
              <dt className="label-micro text-content-soft">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${SITE.email}`} className="font-display text-[1.15rem] font-semibold text-accent-text underline-offset-4 hover:underline">
                  {SITE.email.split('@')[0]}
                  {/* Breaks only before the @, never mid-word. */}
                  <wbr />@{SITE.email.split('@')[1]}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-micro text-content-soft">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="font-display text-[1.15rem] font-semibold underline-offset-4 hover:underline">
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-micro text-content-soft">Follow the district</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-morph
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="press inline-flex size-11 items-center justify-center rounded-control border border-control-border text-content-muted hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on"
                  >
                    <SocialIcon name={s.label} className="size-4" />
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Fields as on the old contact form (CONTENT.md §13). */}
        <div>
          <MailtoForm subject="Enquiry" subjectField="firstName" submitLabel="Send the message">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField name="firstName" label="First name" required autoComplete="given-name" />
              <TextField name="email" label="Email" type="email" required autoComplete="email" />
              <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" />
              <SelectField name="country" label="Country" options={COUNTRIES} autoComplete="country-name" />
              <TextField
                name="club"
                label="Interact club or company"
                className="sm:col-span-2"
                autoComplete="organization"
              />
            </div>
            <TextArea name="inquiry" label="Your message" required rows={6} />
          </MailtoForm>
        </div>
      </section>
    </main>
  );
}
