'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { SITE } from '@/lib/site';

/**
 * Sends a form by opening the visitor's email app with the message already
 * written, addressed to the district (DECISIONS.md §8: there is no back-end
 * yet). Swapping in a real back-end later means replacing `send` below and
 * nothing else; the fields, validation and success state stay.
 *
 * Validation is the browser's own constraint API, shown in our own error
 * slots (fields.tsx) instead of the native bubbles, which cannot be styled and
 * vanish before a phone user has read them.
 */
export function MailtoForm({
  subject,
  subjectField,
  submitLabel,
  children,
}: {
  /** Email subject, e.g. "Website enquiry". */
  subject: string;
  /** Name of a field whose value is appended to the subject, e.g. the sender's name. */
  subjectField?: string;
  submitLabel: string;
  children: ReactNode;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sent, setSent] = useState<{ body: string; href: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const setError = (name: string, message: string) => {
    const slot = document.getElementById(`${name}-error`);
    if (slot) slot.textContent = message;
    const control = formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`);
    if (control && control.getAttribute('type') !== 'checkbox') {
      control.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
  };

  const validate = (form: HTMLFormElement) => {
    let first: HTMLElement | null = null;
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) continue;
      if (!el.name || el.type === 'checkbox') continue;
      const message = el.validity.valid ? '' : messageFor(el);
      setError(el.name, message);
      if (message && !first) first = el;
    }
    // Chip groups: "choose at least one" is not something the browser can
    // express for a set of checkboxes, so it is checked here.
    for (const group of Array.from(form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-required]'))) {
      const name = group.dataset.chips!;
      const any = group.querySelector('input:checked');
      setError(name, any ? '' : 'Choose at least one.');
      if (!any && !first) first = group.querySelector('input');
    }
    first?.focus();
    return !first;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    const values = new FormData(form);
    const body = bodyFrom(form, values);
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subjectLine(subject, subjectField, values))}&body=${encodeURIComponent(body)}`;
    send(href);
    setSent({ body, href });
  };

  if (sent) {
    return (
      <div role="status" className="rounded-panel border border-hairline bg-surface p-6 md:p-8">
        <p className="label-micro text-accent-text">Almost done</p>
        <h2 className="mt-3 text-[1.5rem] leading-tight tracking-[-0.015em]">
          Your email app should have opened with the message ready to send.
        </h2>
        <p className="mt-3 max-w-[56ch] text-content-muted">
          Press send there and it reaches the council. If nothing opened, copy the message and email it to{' '}
          <a href={`mailto:${SITE.email}`} className="text-accent-text underline underline-offset-3">
            {SITE.email}
          </a>
          .
        </p>
        <pre className="mt-6 max-h-64 overflow-auto rounded-media bg-sunk p-4 font-sans text-sm whitespace-pre-wrap text-content-muted">
          {sent.body}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            data-morph
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(sent.body);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
            className="rounded-control border border-accent-fill bg-accent-fill px-6 py-3 text-sm font-semibold text-accent-on transition-colors duration-200 hover:border-signal-700 hover:bg-signal-700"
          >
            {copied ? 'Copied' : 'Copy message'}
          </button>
          <a
            href={sent.href}
            data-morph
            className="rounded-control border border-control-border px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-content"
          >
            Open email again
          </a>
          <button
            type="button"
            data-morph
            onClick={() => {
              setSent(null);
              setCopied(false);
            }}
            className="rounded-control px-6 py-3 text-sm font-semibold text-content-muted transition-colors duration-200 hover:text-content"
          >
            Edit the form
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      // Clear a field's error as soon as it becomes valid, not on the next submit.
      onInput={(e) => {
        const t = e.target as HTMLInputElement;
        if (!t.name) return;
        if (t.type === 'checkbox') {
          if (t.checked) setError(t.name, '');
        } else if (t.validity.valid) {
          setError(t.name, '');
        }
      }}
      className="flex flex-col gap-6"
    >
      {children}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          data-morph
          className="rounded-control border border-accent-fill bg-accent-fill px-6 py-3.5 text-sm font-semibold text-accent-on transition-[background-color,border-color,translate] duration-200 hover:border-signal-700 hover:bg-signal-700 active:translate-y-px"
        >
          {submitLabel}
        </button>
        <p className="text-[13px] text-content-soft">Opens your email app with the message written for you.</p>
      </div>
    </form>
  );
}

function subjectLine(subject: string, field: string | undefined, values: FormData) {
  const extra = field ? String(values.get(field) ?? '').trim() : '';
  return `[Website] ${subject}${extra ? ` — ${extra}` : ''}`;
}

/** The hand-off. The only line a real back-end needs to replace. */
function send(href: string) {
  window.location.href = href;
}

function messageFor(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const v = el.validity;
  if (v.valueMissing) return 'This one is needed.';
  if (v.typeMismatch && el.type === 'email') return 'That doesn’t look like an email address.';
  if (v.patternMismatch) return el.title || 'Check the format.';
  if (v.tooShort) return 'A little longer, please.';
  return el.validationMessage;
}

/** "Label: value" lines in the order the fields appear on the page. */
function bodyFrom(form: HTMLFormElement, values: FormData) {
  const lines: string[] = [];
  const seen = new Set<string>();
  for (const el of Array.from(form.querySelectorAll<HTMLElement>('[data-label]'))) {
    const label = el.dataset.label!;
    if (el instanceof HTMLFieldSetElement) {
      const name = el.dataset.chips!;
      if (seen.has(name)) continue;
      seen.add(name);
      const chosen = values.getAll(name).map(String);
      lines.push(`${label}: ${chosen.length ? chosen.join(', ') : '—'}`);
      continue;
    }
    const name = el.getAttribute('name');
    if (!name || seen.has(name)) continue;
    seen.add(name);
    const value = String(values.get(name) ?? '').trim();
    // Long answers get their own paragraph so the email stays readable.
    lines.push(value.includes('\n') || value.length > 80 ? `${label}:\n${value}\n` : `${label}: ${value || '—'}`);
  }
  return `${lines.join('\n').trimEnd()}\n\n— Sent from the ${SITE.name} website`;
}
