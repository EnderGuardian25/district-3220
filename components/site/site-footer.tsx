import Link from 'next/link';
import Image from 'next/image';
import { NAV, SITE, SOCIALS } from '@/lib/site';
import { SocialIcon } from './social-icon';

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-hairline">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* --- identity --- */}
          <div>
            <div className="flex items-center gap-3">
              {/* The old Wix logo-footer.png is dark artwork and disappeared
                  against the dark surface. The official cyan wordmark reads on
                  both themes. */}
              <Image
                src="/images/branding/interact-logo.png"
                alt=""
                width={633}
                height={215}
                className="h-6 w-auto"
              />
              <span aria-hidden="true" className="h-5 w-px bg-hairline" />
              <p className="text-[14px] font-semibold tracking-tight">District 3220</p>
            </div>
            <p className="mt-4 max-w-[34ch] text-sm text-content-muted">
              Rotary International&rsquo;s service club for young people aged 12&ndash;19.
              Serving {SITE.region} since {SITE.districtFounded}.
            </p>
            <p className="mt-5 text-[11px] font-semibold tracking-[0.12em] text-accent-text uppercase">
              {SITE.rotaryYear} &middot; {SITE.rotaryTheme}
            </p>
          </div>

          {/* --- nav mirror --- */}
          <nav aria-label="Footer">
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-content-muted uppercase">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-content-muted transition-colors hover:text-content"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- contact + social --- */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-content-muted uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all text-content-muted transition-colors hover:text-content"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="text-content-muted transition-colors hover:text-content"
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>

            <h2 className="mt-7 text-[11px] font-semibold tracking-[0.12em] text-content-muted uppercase">
              Social media
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    // 40px hit target — icon-only links are easy to make too
                    // small to tap reliably.
                    className="inline-flex size-10 items-center justify-center rounded-control text-content-muted transition-colors hover:bg-surface hover:text-accent-text"
                  >
                    <SocialIcon name={s.label} className="size-[17px]" />
                    {/* The glyph alone gives the link no accessible name. */}
                    <span className="sr-only">{s.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {SITE.name}</p>
          <p>{SITE.region}</p>
        </div>
      </div>
    </footer>
  );
}
