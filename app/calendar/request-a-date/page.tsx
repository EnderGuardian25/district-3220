import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { MailtoForm } from '@/components/forms/mailto-form';
import { COUNTRIES, SelectField, TextArea, TextField } from '@/components/forms/fields';

export const metadata: Metadata = {
  title: 'Request a Date',
  description: 'Ask the Interact District 3220 council to reserve a date on the district calendar.',
};

/** Fields as on the old site's booking form (CONTENT.md §14). */
export default function RequestADatePage() {
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ label: 'Calendar', href: '/calendar' }]}
        title="Request a date."
        lede="Reserve a date on the district calendar before you announce a project, so it doesn’t clash with another club’s. The council confirms by email."
      />

      <section aria-label="Request form" className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <MailtoForm subject="Date request" subjectField="event" submitLabel="Send the request">
            <fieldset className="grid gap-6 sm:grid-cols-2">
              <legend className="label-micro mb-5 text-content-soft">About you</legend>
              <TextField name="name" label="Interactor’s name" required autoComplete="name" />
              <TextField name="designation" label="Designation" required placeholder="e.g. Club President" />
              <TextField name="club" label="Interact club" required />
              <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" />
              <SelectField name="country" label="Country" options={COUNTRIES} />
              <TextField name="email" label="Email" type="email" required autoComplete="email" />
            </fieldset>

            <fieldset className="mt-4 grid gap-6 sm:grid-cols-2">
              <legend className="label-micro mb-5 text-content-soft">The event</legend>
              <TextField name="event" label="Event or project name" required className="sm:col-span-2" />
              <TextField name="location" label="Event location" required className="sm:col-span-2" />
              <TextField name="date" label="Date" type="date" required />
              <TextField name="time" label="Time" type="time" required />
              <TextArea name="other" label="Other information" className="sm:col-span-2" />
            </fieldset>
          </MailtoForm>
        </div>
      </section>
    </main>
  );
}
