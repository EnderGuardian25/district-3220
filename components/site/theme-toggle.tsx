'use client';

import { useTheme } from '@/components/theme/theme-provider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, pending, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      // Until the client has read the real theme, the icon would be wrong, so
      // hide it from AT rather than announce a value that may flip.
      aria-hidden={pending}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-hairline text-content-muted transition-colors hover:border-control-border hover:text-content ${className}`}
    >
      {/* Both icons render; only one is shown, so there's no layout shift on toggle. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-4.5 ${theme === 'dark' ? 'hidden' : 'block'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-4.5 ${theme === 'dark' ? 'block' : 'hidden'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <path d="M20.5 14.2A8.6 8.6 0 1 1 9.8 3.5a6.9 6.9 0 0 0 10.7 10.7Z" />
      </svg>
    </button>
  );
}
