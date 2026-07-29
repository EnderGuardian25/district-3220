/**
 * Resolves the theme BEFORE first paint.
 *
 * This has to run as a blocking inline script in <head>. If it ran in an effect
 * instead, a dark-mode visitor would see a white flash on every cold load —
 * and most of this audience browses in dark mode, so that flash would be the
 * common case rather than the edge case.
 */
export const THEME_STORAGE_KEY = 'id3220-theme';

const script = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    /* Private mode or storage disabled — fall back to the OS preference. */
    document.documentElement.setAttribute(
      'data-theme',
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
