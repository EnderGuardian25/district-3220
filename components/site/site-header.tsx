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
  const reduced = useReducedMotion();

  // Close everything on navigation.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  /**
   * The header is hidden while a full-screen hero owns the viewport, and
   * appears once that hero has scrolled past. Pages without a hero mark
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
      setOpenMenu(null);
      setDrawerOpen(false);
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

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
    <header className="sticky top-0 z-50">
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
          data-morph
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} — home`}
        >
          {/* Official Interact wordmark + Rotary wheel. Logotypes are exempt
              from contrast minimums, but over photography it still needs a
              shadow to hold its edge. */}
          <Image
            src="/images/branding/interact-logo.png"
            alt=""
            width={633}
            height={215}
            priority
            className={`h-6 w-auto transition-[filter] duration-300 md:h-7 ${
              overHero ? 'drop-shadow-[0_1px_8px_rgba(10,12,14,0.7)]' : ''
            }`}
          />
          <span
            aria-hidden="true"
            className={`h-5 w-px transition-colors duration-300 ${
              overHero ? 'bg-white/45' : 'bg-hairline'
            }`}
          />
          <span
            className={`text-[13px] leading-tight font-medium tracking-tight transition-colors duration-300 ${
              overHero ? 'text-white [text-shadow:0_1px_8px_rgba(10,12,14,0.7)]' : 'text-content-muted'
            }`}
          >
            District 3220
          </span>
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
                    className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
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
                        <motion.ul
                          initial={reduced ? undefined : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-0 mt-1.5 min-w-60 overflow-hidden rounded-xl border border-hairline bg-surface p-1.5 shadow-xl shadow-navy-900/8"
                        >
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={pathname === child.href ? 'page' : undefined}
                                className="block rounded-lg px-3 py-2.5 text-[13.5px] text-content-muted transition-colors hover:bg-bg hover:text-content"
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
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            data-morph
            className={`inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
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
            initial={reduced ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-hairline bg-bg lg:hidden"
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
                              className="block py-2 text-[14px] text-content-muted"
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
