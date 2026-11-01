import { EMAIL, X_HANDLE, X_URL } from '@/lib/site';

/**
 * The two ways to reach me, used on /contact and at the end of the homepage:
 * a filled "Email me" (the address is shown and clickable) and a quieter X DM.
 */
export function ContactActions() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <a
        href={`mailto:${EMAIL}`}
        className="hero-btn inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-[var(--accent-fg)]"
      >
        Email me <span aria-hidden="true">→</span>
      </a>
      <p className="text-sm text-fg-muted">
        <a href={`mailto:${EMAIL}`} className="lab-link break-all text-fg">
          {EMAIL}
        </a>
        <span className="mx-2" aria-hidden="true">
          ·
        </span>
        or DM{' '}
        <a href={X_URL} target="_blank" rel="noopener noreferrer" className="lab-link text-fg">
          {X_HANDLE}
        </a>{' '}
        on X
      </p>
    </div>
  );
}
