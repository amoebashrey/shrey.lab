import Link from 'next/link';

/**
 * HeroCTAs — extracted from the Hero per the v0.2 restraint pivot.
 * The hero block stays title-only; this sits below it with at least
 * 64px of vertical breathing room (mt-16) so the title has room to land
 * before the eye reaches the action.
 *
 * One primary action only — "View work →". Work-first: the resume lives
 * persistently in the nav (see components/Nav.tsx), not as a hero CTA.
 */
export function HeroCTAs() {
  return (
    <section
      aria-label="Primary actions"
      className="relative pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-[var(--accent-fg)] font-medium text-sm transition-all duration-fast hover:bg-accent-hover hover:-translate-y-px active:translate-y-0"
          >
            View work
            <span
              className="inline-block transition-transform duration-fast group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
