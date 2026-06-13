'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// When the brand kit's Navigation component is wired up, swap to:
// import { Wordmark, ThemeToggle } from '@/shrey-lab/components/Signature';
// For now, inline so this works whether or not the kit components have these named exports.

const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Inline wordmark — renders shrey°lab with the lime dot in place of the period.
 * Brand kit's Wordmark component should replace this when available.
 */
function Wordmark() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-1 font-sans font-medium text-fg hover:text-fg transition-colors duration-fast"
      aria-label="shrey.lab — home"
    >
      <span className="text-base tracking-tight">shrey</span>
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-accent transition-transform duration-fast group-hover:scale-125"
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
    const stored = (localStorage.getItem('theme') as 'light' | 'dark' | null);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));
  }, []);

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // Render a stable shell during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="w-9 h-9 rounded-md border border-border flex items-center justify-center"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-fg-muted hover:text-fg hover:border-border-strong transition-colors duration-fast"
    >
      {theme === 'light' ? (
        // Moon icon — switching to dark
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon — switching to light
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-med',
        scrolled
          ? 'border-b border-border/60 backdrop-blur-glass backdrop-saturate-glass bg-[var(--glass-bg)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto max-w-[1280px] px-6 md:px-8 h-14 flex items-center justify-between"
        aria-label="Primary"
      >
        <Wordmark />

        <div className="flex items-center gap-1 md:gap-2">
          <ul className="flex items-center gap-1 md:gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      'relative inline-flex items-center px-2 md:px-3 h-9 rounded-md text-sm font-medium transition-colors duration-fast',
                      isActive
                        ? 'text-fg'
                        : 'text-fg-muted hover:text-fg',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-2 right-2 md:left-3 md:right-3 h-px bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-2 md:ml-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
