import Link from 'next/link';

/**
 * HeroCTAs — extracted from the Hero per the v0.2 restraint pivot.
 * The hero block stays title-only; this sits below it with ~40-48px of
 * breathing room (mt-10/12 + Hero's pb-4/6) so the title lands before the
 * eye reaches the action — spacious but still anchored. (The earlier
 * mt-16/20 + pb-16/20 stack read as a dead zone, not breathing room.)
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
        <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3">
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
