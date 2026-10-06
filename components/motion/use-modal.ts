'use client';

import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Everything a modal dialog owes the visitor, in one place, for the site's
 * three Expand Grid dialogs (projects, profiles, committees):
 *
 *  - focus moves into the dialog on open and back to its trigger on close;
 *  - Tab and Shift+Tab stay inside the dialog (aria-modal promises this);
 *  - Escape closes it;
 *  - the page behind cannot scroll. `body { overflow: hidden }` alone is not
 *    enough on desktop, where Lenis scrolls with window.scrollTo and ignores
 *    it, so the overlay must ALSO carry `data-lenis-prevent` (Lenis then
 *    leaves wheel events over the dialog alone).
 *
 * The caller renders the overlay; this hook only wires behaviour.
 */
export function useModal({
  open,
  onClose,
  panelRef,
  initialFocusRef,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** The trigger. Not document.activeElement: Safari never focuses a clicked button. */
  returnFocusTo: () => HTMLElement | null | undefined;
}) {
  // Callbacks change identity every render; the effect should only follow `open`.
  const latest = useRef({ onClose, returnFocusTo });
  latest.current = { onClose, returnFocusTo };

  useEffect(() => {
    if (!open) return;
    const returnTo = latest.current.returnFocusTo();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (initialFocusRef?.current ?? panelRef.current)?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        latest.current.onClose();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !panel.contains(active);
      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, panelRef, initialFocusRef]);
}
