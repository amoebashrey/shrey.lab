'use client';

import { useEffect, useState } from 'react';

/**
 * ThemeToggle — its own glass pill (same height and glass as the nav pill,
 * so the two read as one system). Placed top-right by SiteControls.
 *
 * Persists to localStorage and sets `data-theme` on <html> — the selector
 * tokens.css responds to; the init script in layout.tsx applies it before
 * paint. Both icons are always rendered and CSS picks one from data-theme,
 * so the first paint is already right (no mount placeholder, no flash).
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage disabled — the choice just won't persist */
    }
  }

  return (
    <div className="nav-glass nav-enter-fade rounded-full p-1.5">
      <button
        type="button"
        onClick={toggle}
        aria-label="Dark mode"
        aria-pressed={dark}
        className="theme-toggle relative inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted"
      >
        {/* Moon — shown in light mode */}
        <svg className="theme-toggle-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        {/* Sun — shown in dark mode */}
        <svg className="theme-toggle-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>
    </div>
  );
}
