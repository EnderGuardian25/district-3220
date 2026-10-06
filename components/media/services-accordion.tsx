'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MEDIA_SERVICES } from '@/lib/media-crew';

/**
 * Accordion Gallery (lab.damiandc.com/accordion-gallery), the photographic
 * form: the home avenues accordion's mechanic exactly (all equal at rest,
 * hover opens, click locks, the same 750ms flex-grow curve and the same
 * grid-rows reveal), with a photograph in each panel instead of a logo plate.
 *
 * The open panel offers "Request this", which ticks that service on the
 * request form further down the page and takes the visitor there.
 *
 * Below md it becomes a list of photo rows, as the avenues do.
 */
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

export function ServicesAccordion({ formId }: { formId: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const open = locked ?? hovered;

  const request = (option: string) => {
    const box = document.querySelector<HTMLInputElement>(`#${formId} input[type="checkbox"][value="${option}"]`);
    if (box && !box.checked) {
      box.checked = true;
      // MailtoForm clears a group's error on input, so tell it.
      box.dispatchEvent(new Event('input', { bubbles: true }));
    }
    document.getElementById(formId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Take keyboard and screen-reader users along: focus the service just
    // ticked, without letting focus fight the smooth scroll.
    box?.focus({ preventScroll: true });
  };

  return (
    <div className="mt-8 flex flex-col gap-2.5 md:h-[clamp(340px,40vw,500px)] md:flex-row md:gap-2" onMouseLeave={() => setHovered(null)}>
      {MEDIA_SERVICES.map((s, i) => {
        const isOpen = open === i;
        return (
          <div
            key={s.name}
            onMouseEnter={() => locked === null && setHovered(i)}
            style={{ flexGrow: isOpen ? 4 : 1 }}
            // basis-0 from md up: the grow factors then divide the whole row.
            // With basis auto each panel starts at its content width (the
            // hidden Request button included), the row is already full, and
            // flex-grow has nothing to distribute.
            className={`group relative min-h-[96px] overflow-hidden rounded-media bg-navy-900 transition-[flex-grow] duration-[750ms] ${EASE} md:min-h-0 md:min-w-0 md:basis-0`}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={`object-cover transition-[opacity,scale] duration-[750ms] ${EASE} ${isOpen ? 'scale-100 opacity-80' : 'scale-105 opacity-50'}`}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-chalk-950/90 via-chalk-950/30 to-transparent" />

            <button
              type="button"
              aria-expanded={isOpen}
              onFocus={() => locked === null && setHovered(i)}
              onClick={() => setLocked((l) => (l === i ? null : i))}
              // Close on leaving the panel, but not when focus moves on to the
              // panel's own Request button.
              onBlur={(e) => {
                if (locked === null && !e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setHovered(null);
              }}
              // An inset ring: the panel is overflow-hidden, so the default
              // ring (drawn 3px outside) was clipped away entirely.
              className="absolute inset-0 z-10 text-left focus-visible:outline-offset-[-4px]"
            >
              <span className="sr-only">{s.name}</span>
            </button>

            <span className="label-micro pointer-events-none absolute top-3.5 left-4 z-20 text-white/70">
              {String(i + 1).padStart(2, '0')}
              {locked === i && <span className="opacity-70"> locked</span>}
            </span>

            <div className="pointer-events-none relative z-20 flex h-full flex-col justify-end p-4 text-white md:p-5">
              <p
                className={`font-display font-semibold tracking-[-0.015em] [overflow-wrap:anywhere] ${
                  isOpen ? 'text-[1.35rem] md:text-[clamp(1.2rem,1.8vw,1.6rem)]' : 'text-[1.1rem] md:text-[0.9rem] md:leading-snug'
                }`}
              >
                {s.name}
              </p>
              <div className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[750ms] ${EASE} ${isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <button
                    type="button"
                    tabIndex={isOpen ? 0 : -1}
                    data-morph
                    onClick={() => request(s.formOption)}
                    className="pointer-events-auto rounded-control border border-white bg-white px-4 py-2 text-sm font-semibold text-chalk-950 transition-colors duration-200 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on"
                  >
                    Request {s.name.toLowerCase()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
