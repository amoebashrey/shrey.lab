'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResumeButton } from '@/components/ResumeButton';
// When the brand kit's Navigation component is wired up, swap to:
// import { Wordmark, ThemeToggle } from '@/shrey-lab/components/Signature';
// For now, inline so this works whether or not the kit components have these named exports.

// Writing is intentionally NOT in the primary nav while it's empty — the #1
// persona (hiring manager) shouldn't be led from the top nav into a blank page.
// The route stays live with a tasteful empty state and a footer link; re-add
// here the moment a first piece ships. (Drift from CLAUDE.md's locked 4-item
// nav — see report.)
const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Inline wordmark — renders shrey°lab with the lime dot in place of the period.
 * The dot is the separator and the home affordance — there is no "Home" item.
 */
function Wordmark() {
  return (
    <Link
      href="/"
      className="group inline-flex h-11 items-center gap-1 rounded-full px-3 font-sans font-medium text-fg transition-colors duration-fast"
      aria-label="shrey.lab — home"
    >
      <span className="text-base tracking-tight">shrey</span>
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-fast group-hover:scale-125"
        aria-hidden="true"
      />
      <span className="text-base tracking-tight">lab</span>
    </Link>
  );
}

/**
 * Inline theme toggle. Persists to localStorage and sets the `data-theme`
 * attribute on <html> — the selector tokens.css responds to. The init script
 * in layout.tsx applies the same attribute before paint to prevent FOUC.
 */
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));
  }, []);

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // Render a stable shell during SSR to avoid hydration mismatch.
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-fast hover:text-fg"
    >
      {theme === 'light' ? (
        // Moon — switching to dark
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun — switching to light
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}

/** Thin vertical divider — the ink border token, not the glass border var
    (rgba .08 at 1px×20px was imperceptible in light mode). Tracks theme. */
function Divider() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-5 w-px bg-[var(--border)] sm:inline-block"
    />
  );
}

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Primary"
      className="nav-glass nav-enter fixed left-1/2 top-5 z-[100] -translate-x-1/2 rounded-full px-2 py-1.5"
    >
      <div className="flex items-center gap-1">
        <Wordmark />

        <Divider />

        {/* Inline links — hidden on small screens (collapse to menu) */}
        <ul className="hidden items-center gap-0.5 sm:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActiveHref(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'inline-flex h-11 items-center rounded-full px-3 text-sm font-medium transition-colors duration-fast',
                    active
                      ? 'nav-link-active text-fg'
                      : 'text-fg-muted hover:text-fg',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Persistent Resume — quiet outline pill, after the links. Collapses
            into the mobile dropdown below the sm breakpoint. Reuses the modal. */}
        <ResumeButton variant="nav" className="hidden sm:inline-flex" />

        <Divider />

        <ThemeToggle />

        {/* Menu affordance — only on small screens */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-fast hover:text-fg sm:hidden"
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown — glass panel below the pill, links stacked at ≥44px */}
      {menuOpen && (
        <ul
          id="mobile-nav-menu"
          className="nav-glass absolute left-1/2 top-[calc(100%+8px)] w-[min(78vw,16rem)] -translate-x-1/2 rounded-2xl p-2 sm:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActiveHref(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors duration-fast',
                    active
                      ? 'nav-link-active text-fg'
                      : 'text-fg-muted hover:text-fg',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          {/* Resume as a dropdown row on mobile — same modal, full-width. */}
          <li>
            <ResumeButton variant="nav-row" />
          </li>
        </ul>
      )}
    </nav>
  );
}
