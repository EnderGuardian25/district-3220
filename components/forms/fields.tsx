import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

/**
 * Form controls in the house shape: pill inputs and selects (controls are
 * pills, DECISIONS.md §4), an 18px-radius textarea, and checkbox groups as
 * pill chips that fill Signal when chosen.
 *
 * Every control carries `data-label`, which MailtoForm uses to write the email
 * body in the order the fields appear. Errors render into `#<name>-error`,
 * which MailtoForm fills from the browser's own constraint validation.
 */

const CONTROL =
  'w-full border border-control-border bg-surface text-[15px] text-content transition-colors duration-200 placeholder:text-content-soft hover:border-content-soft aria-[invalid=true]:border-danger';

type Base = {
  name: string;
  label: string;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
};

function Shell({ name, label, hint, required, className = '', children }: Base & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-content-soft"> (required)</span>
        ) : null}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-[13px] text-content-soft">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {/* No role="alert": on a submit with several errors every slot would
          interrupt at once. Focus moves to the first invalid field, whose
          aria-describedby reads its error. */}
      <p id={`${name}-error`} className="mt-1.5 text-[13px] text-danger empty:hidden" />
    </div>
  );
}

export function TextField({
  name,
  label,
  hint,
  required,
  className,
  type = 'text',
  minToday,
  ...rest
}: Base & {
  /**
   * Date fields only: refuse past dates. Set on the client by MailtoForm
   * (the visitor's own "today"), so the page itself stays static.
   */
  minToday?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'className'>) {
  return (
    <Shell name={name} label={label} hint={hint} required={required} className={className}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        // Spellcheck underlines every email address as a misspelling.
        spellCheck={type === 'email' ? false : undefined}
        data-label={label}
        data-min-today={minToday ? '' : undefined}
        aria-describedby={`${hint ? `${name}-hint ` : ''}${name}-error`}
        className={`${CONTROL} h-12 rounded-control px-5 ${type === 'date' || type === 'time' ? DATE_TIME : ''}`}
        {...rest}
      />
    </Shell>
  );
}

/**
 * Native date and time inputs draw their empty "mm/dd/yyyy" and "--:-- --"
 * masks in ink, with a black picker icon, so an empty one looked filled in
 * next to the soft placeholders of the other fields. CSS can't see "empty"
 * on these inputs, but a required empty one is :invalid, so that state takes
 * the placeholder colour (the district's date/time fields are all required).
 * A filled-in date before `min` is :invalid as well, but it is also
 * :out-of-range, so it's excluded and keeps the ink colour of a real value.
 * The icon is softened to match the select's chevron.
 */
const DATE_TIME =
  '[&:invalid:not(:out-of-range):not(:focus)]:text-content-soft [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-55';

export function TextArea({
  name,
  label,
  hint,
  required,
  className,
  rows = 5,
  ...rest
}: Base & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'className'>) {
  return (
    <Shell name={name} label={label} hint={hint} required={required} className={className}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        data-label={label}
        aria-describedby={`${hint ? `${name}-hint ` : ''}${name}-error`}
        // Where field-sizing is supported the box grows with its text, so
        // the native resize grip (which sat in the rounded corner) goes.
        // Elsewhere the grip stays so long text can still be opened up. The
        // cap keeps a long paste from pushing the submit button off-screen;
        // past it the box scrolls.
        className={`${CONTROL} block max-h-[60svh] rounded-media px-5 py-3.5 leading-[1.5] resize-y supports-[field-sizing:content]:resize-none supports-[field-sizing:content]:[field-sizing:content]`}
        style={{ minHeight: `calc(${rows} * 1.5em + 1.75rem + 2px)` }}
        {...rest}
      />
    </Shell>
  );
}

export function SelectField({
  name,
  label,
  hint,
  required,
  className,
  options,
  ...rest
}: Base & { options: string[] } & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'className'>) {
  return (
    <Shell name={name} label={label} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          data-label={label}
          aria-describedby={`${hint ? `${name}-hint ` : ''}${name}-error`}
          className={`${CONTROL} h-12 appearance-none rounded-control pr-11 pl-5`}
          {...rest}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-5 size-2.5 -translate-y-1/2 text-content-muted"
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </Shell>
  );
}

/**
 * A set of checkboxes rendered as pill chips. A fieldset rather than Shell,
 * because the group label is a legend, not a label for one control.
 */
export function ChoiceChips({
  name,
  label,
  options,
  required,
  className = '',
}: {
  name: string;
  label: string;
  options: string[];
  /** At least one must be chosen. Enforced by MailtoForm, not the browser. */
  required?: boolean;
  className?: string;
}) {
  return (
    <fieldset
      className={className}
      data-chips={name}
      data-label={label}
      data-required={required ? '' : undefined}
      aria-describedby={`${name}-error`}
    >
      <legend className="text-sm font-medium">
        {label}
        {required ? <span className="text-content-soft"> (choose at least one)</span> : null}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value={o}
              aria-required={required || undefined}
              aria-describedby={`${name}-error`}
              className="peer sr-only"
            />
            <span className="press inline-flex items-center gap-2 rounded-control border border-control-border bg-surface px-4 py-2 text-sm peer-checked:border-accent-fill peer-checked:bg-accent-fill peer-checked:text-accent-on peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus hover:border-content-soft">
              {o}
            </span>
          </label>
        ))}
      </div>
      <p id={`${name}-error`} className="mt-1.5 text-[13px] text-danger empty:hidden" />
    </fieldset>
  );
}

/** Country choices for the district's forms: the two countries it covers first. */
export const COUNTRIES = ['Sri Lanka', 'Maldives', 'India', 'Other'];
