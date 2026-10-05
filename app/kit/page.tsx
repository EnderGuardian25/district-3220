import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PageHeader, PageMedia } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Placeholder } from '@/components/page/placeholder';
import { CouncilRoster } from '@/components/people/council-roster';
import { MailtoForm } from '@/components/forms/mailto-form';
import { ChoiceChips, COUNTRIES, SelectField, TextArea, TextField } from '@/components/forms/fields';
import { COUNCIL_2026_27, PAST_COUNCILS } from '@/lib/councils';

/**
 * Development-only kit: every shared inner-page component on one page, so a
 * change can be checked against the locked design in one look. Not routable
 * in production.
 */
export default function KitPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  const sample = PAST_COUNCILS[0];
  return (
    <main id="main">
      <PageHeader
        title="Component kit."
        lede="Every shared inner-page component, rendered with real data. Development only."
        crumbs={[{ label: 'About', href: '/about' }]}
      >
        <Button href="/kit">Primary</Button>
        <Button href="/kit" tone="ghost">
          Ghost
        </Button>
      </PageHeader>
      <PageMedia src="/images/hero/assembly.webp" alt="Interactors at the District Assembly" caption="District Assembly, Colombo" />

      <section aria-labelledby="kit-placeholders" className="container-page py-16 md:py-24">
        <SectionHeader id="kit-placeholders" title="Placeholders." lede="Every gap goes through one component." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Placeholder>The district has not sent this yet.</Placeholder>
          <div className="rounded-panel bg-navy-900 p-6">
            <Placeholder tone="dark">On a navy band.</Placeholder>
          </div>
        </div>
      </section>

      <section aria-labelledby="kit-tba" className="container-page py-16 md:py-24">
        <SectionHeader id="kit-tba" title="To be announced." />
        <div className="mt-10">
          <CouncilRoster groups={COUNCIL_2026_27.groups.slice(0, 1)} scope="kit-tba" />
        </div>
      </section>

      <section aria-labelledby="kit-people" className="container-page py-16 md:py-24">
        <SectionHeader id="kit-people" title="People." lede={`${sample.label} core leadership, with the Expand Grid profile.`} />
        <div className="mt-10">
          <CouncilRoster groups={sample.groups.slice(0, 1)} scope="kit-people" />
        </div>
      </section>

      <section aria-labelledby="kit-form" className="container-page py-16 md:py-24">
        <SectionHeader id="kit-form" title="Forms." />
        <div className="mt-10 max-w-2xl">
          <MailtoForm subject="Kit test" subjectField="name" submitLabel="Send">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField name="name" label="Name" required autoComplete="name" />
              <TextField name="email" label="Email" type="email" required autoComplete="email" />
            </div>
            <SelectField name="country" label="Country" options={COUNTRIES} />
            <ChoiceChips name="services" label="Services" options={['Photography', 'Videography', 'Livestream']} required />
            <TextArea name="message" label="Message" required />
          </MailtoForm>
        </div>
      </section>
    </main>
  );
}
