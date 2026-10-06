'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Hover-intent delay (approved 2026-10-06): a pointer crossing an Accordion
 * Gallery on its way somewhere else shouldn't fling panels open. Used by the
 * home avenues and the Media Crew services; click and focus stay instant.
 */
export const HOVER_INTENT_MS = 80;

/**
 * `schedule(fn)` runs `fn` after the delay unless `cancel()` (or another
 * schedule) comes first. The pending timer is cleared on unmount.
 */
export function useHoverIntent(delay = HOVER_INTENT_MS) {
  const timer = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const schedule = useCallback(
    (fn: () => void) => {
      cancel();
      timer.current = window.setTimeout(fn, delay);
    },
    [cancel, delay],
  );

  useEffect(() => cancel, [cancel]);

  return { schedule, cancel };
}
