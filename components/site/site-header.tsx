'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NAV, SITE } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  // Close everything on navigation.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  /**
   * The bar is transparent while a full-screen hero owns the viewport, and
   * turns solid once that hero starts to scroll. Pages without a hero mark
   * (everything except home) get the solid bar immediately.
   *
   * Driven by an IntersectionObserver on a sentinel at the hero's bottom edge
   * rather than a scroll listener, so nothing runs per frame.
   */
  useEffect(() => {
    const sentinel = document.querySelector('[data-hero-top]');
    if (!sentinel) {
      setScrolled(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        // Solid once the marker has passed up behind the bar.
        setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      // No rootMargin: the marker sits 16px into the hero, so this flips on the
      // first real scroll rather than a bar-height later.
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Closing unmounts the focused link, which would drop focus to <body>.
      // Send it back to whatever opened the menu instead.
      const active = document.activeElement as HTMLElement | null;
      const inDrawer = active?.closest('#mobile-nav');
      const submenuParent = active?.closest('li.relative')?.querySelector<HTMLElement>(':scope > a');
      setOpenMenu(null);
      setDrawerOpen(false);
      if (inDrawer) toggleRef.current?.focus();
      else if (submenuParent && submenuParent !== active) submenuParent.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  /**
   * An item is active on its own page, below it, or on any of its children's
   * pages, so About lights on /council/2026-27 and /college-of-dirs. Matching
   * on a segment boundary keeps /newsletter from lighting News by prefix.
   */
  const within = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const item = NAV.find((n) => n.href === href);
    return within(href) || Boolean(item?.children?.some((c) => within(c.href)));
  };

  /** Small delay on close so the pointer can cross the gap into the submenu. */
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  /**
   * Over the hero the bar itself is invisible so the photograph reads straight
   * through it; the nav stays fully present and usable, just inverted to white
   * so it survives on top of the image. Once the hero is past, the solid chalk
   * bar fades in and the nav returns to ink.
   */
  const overHero = !scrolled;

  return (
    // data-cursor: the bar is see-through over the hero, so the morph cursor
    // can't read a background colour here and is told the tone instead.
    <header className="sticky top-0 z-50" data-cursor={overHero ? 'dark' : 'light'}>
      {/* The bar is its own layer, cross-faded by opacity so nothing about the
          header snaps as it arrives.

          Fully opaque, and no backdrop-filter. At 80% the hero's white CTA
          pills ghosted straight through it as they scrolled under, and a live
          backdrop-filter across the full width is a real cost on the mid-range
          Android this site is mostly read on. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 border-b border-hairline bg-bg transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${SITE.name} — home`}
        >
          {/* The official district lock-up: Interact, District 3220 and the
              Rotary wheel, cropped from the primary logo before its theme
              divider. Logotypes are exempt from contrast minimums, but over
              photography it still needs a shadow to hold its edge. */}
          <Image
            src="/images/branding/interact-district-3220-logo.png"
            alt=""
            width={1034}
            height={380}
            preload
            className={`h-10 w-auto transition-[filter] duration-300 md:h-12 ${
              overHero ? 'drop-shadow-[0_1px_8px_rgba(10,12,14,0.7)]' : ''
            }`}
          />
        </Link>

        {/* ---------- desktop nav ---------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const active = isActive(item.href);
              const hasChildren = Boolean(item.children?.length);
              return (
                <li
                  key={item.href}
                  className="relative"
                  // Always reassign on enter/focus — setting null for childless
                  // items is what closes a sibling's open submenu. Previously
                  // this only cancelled the pending close, so hovering
                  // Calendar left About's dropdown hanging open.
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(hasChildren ? item.href : null);
                  }}
                  onMouseLeave={hasChildren ? scheduleClose : undefined}
                  onFocus={() => {
                    cancelClose();
                    setOpenMenu(hasChildren ? item.href : null);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    aria-expanded={hasChildren ? openMenu === item.href : undefined}
                    data-morph
                    className={`press relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium [--press-dur:300ms] ${
                      overHero
                        ? `[text-shadow:0_1px_8px_rgba(10,12,14,0.7)] ${
                            active ? 'text-white' : 'text-white/80 hover:text-white'
                          }`
                        : active
                          ? 'text-content'
                          : 'text-content-muted hover:text-content'
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <svg
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        className={`size-2 transition-transform duration-200 ${
                          openMenu === item.href ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent"
                        transition={
                          reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                        }
                      />
                    )}
                  </Link>

                  {hasChildren && (
                    <AnimatePresence>
                      {openMenu === item.href && (
                        // Grows from the corner under its trigger (origin-top-left):
                        // 0.97 -> 1 with a fade, 160ms in, 120ms out, on
                        // ease-out-expo. Full `transform` strings, not Framer's
                        // `y`/`scale` shorthands, so it stays on the compositor.
                        // Reduced motion: opacity only.
                        <motion.ul
                          initial={reduced ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.97)' }}
                          animate={
                            reduced
                              ? { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }
                              : { opacity: 1, transform: 'scale(1)', transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } }
                          }
                          exit={
                            reduced
                              ? { opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }
                              : { opacity: 0, transform: 'scale(0.97)', transition: { duration: 0.12, ease: [0.16, 1, 0.3, 1] } }
                          }
                          data-cursor="light"
                          className="absolute top-full left-0 mt-1.5 min-w-60 origin-top-left overflow-hidden rounded-xl border border-hairline bg-surface p-1.5 shadow-xl shadow-navy-900/8"
                        >
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={pathname === child.href ? 'page' : undefined}
                                className="block rounded-lg px-3 py-2.5 text-[13.5px] text-content-muted transition-colors duration-200 hover:bg-bg hover:text-content"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            data-morph
            // Visible circle stays 36px; the after: ring extends the tap
            // target to 44px for a touch-first audience.
            className={`press relative inline-flex size-9 items-center justify-center rounded-full border [--press-dur:300ms] after:absolute after:-inset-1 after:content-[''] lg:hidden ${
              overHero ? 'border-white/50 text-white' : 'border-hairline text-content'
            }`}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {drawerOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            id="mobile-nav"
            data-cursor="light"
            // Lenis would otherwise eat wheel input meant for the drawer's
            // own overflow scroll (body scroll is locked while it is open).
            data-lenis-prevent
            // Opens as a clip wipe from the top rather than animating height:
            // height re-runs layout every frame on mid-range Android, and the
            // clip is already in the vocabulary. 280ms in, 200ms out.
            // Reduced motion: opacity only.
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={
              reduced
                ? { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }
                : { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
            }
            exit={
              reduced
                ? { opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }
                : { opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
            }
            // Capped and scrollable: the full nav is taller than a landscape
            // phone, and body scroll is locked while the drawer is open.
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-hairline bg-bg lg:hidden"
          >
            <nav aria-label="Primary (mobile)" className="container-page py-4">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.href} className="border-b border-hairline/70 last:border-0">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`block py-3 text-[15px] font-medium ${
                        isActive(item.href) ? 'text-accent-text' : 'text-content'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <ul className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-hairline pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? 'page' : undefined}
                              className={`block py-2 text-[14px] ${
                                pathname === child.href ? 'text-accent-text' : 'text-content-muted'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
