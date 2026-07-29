'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NAV, SITE } from '@/lib/site';
import { ThemeToggle } from './theme-toggle';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <header className="sticky top-0 z-50">
      {/* The solid bar is its own layer, cross-faded by OPACITY rather than by
          swapping classes on the header. `transition-colors` does not
          interpolate `backdrop-filter`, so adding the blur on scroll made it pop
          in abruptly — that was the snap. At opacity 0 the layer is fully
          transparent, so its blur has no visible effect either. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 border-b border-hairline bg-bg/80 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Legibility scrim for the transparent state. The hero photo bleeds up
          behind the nav, and light nav text over a bright LED wall is
          unreadable without this. Fades out as the solid bar fades in. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-bg via-bg/70 to-transparent transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} — home`}
        >
          {/* Official Interact wordmark + Rotary wheel. Replaces the old Wix
              logo-header.jpg, which was an opaque JPEG and showed a grey box in
              dark mode. Logotypes are exempt from contrast minimums. */}
          <Image
            src="/images/branding/interact-logo.png"
            alt=""
            width={633}
            height={215}
            priority
            className="h-6 w-auto md:h-7"
          />
          <span aria-hidden="true" className="h-5 w-px bg-hairline" />
          <span className="text-[13px] leading-tight font-medium tracking-tight text-content-muted">
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
                    className={`relative flex items-center gap-1 rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors ${
                      active ? 'text-content' : 'text-content-muted hover:text-content'
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
                        className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-accent"
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
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-content lg:hidden"
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
