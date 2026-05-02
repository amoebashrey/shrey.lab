import Link from 'next/link';
import { ResumeButton } from '@/components/ResumeButton';
import { StatusPill } from '@/components/StatusPill';

/**
 * Hero — the 60-second skim's first 5 seconds.
 *
 * Format LOCKED: credibility-first "I'm an X who shipped Y for Z."
 * No personality flex. No "one foot in chaos." State what it is.
 *
 * The actual hero copy will come from siteSettings in Sanity once wired.
 * The placeholder below is the v0 — it gets replaced with one of three drafted
 * variants once the inventory dump is in. See PROJECT_BRIEF.md > Pending decisions.
 *
 * Two CTAs: "View work →" (primary, lime) and "Resume" (secondary, opens modal).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-16 md:pt-24 pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {/* Eyebrow */}
        <p className="eyebrow mb-6 md:mb-8" aria-hidden="true">
          // product manager · pune
        </p>

        {/* Hero sentence — Geist with one Instrument Serif italic phrase */}
        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-fg max-w-4xl"
        >
          I&apos;m a product manager{' '}
          <span className="italic-break text-fg-muted">who ships</span> growth, conversion,
          and internal tools at a global student housing marketplace.
        </h1>

        {/* Supporting line */}
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed">
          Currently at Amber Student. Previously: FamPay, three founder ventures, a kombucha brand,
          a fermentation school, and a discussion community in four countries.
        </p>

        {/* CTAs */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
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

          <ResumeButton variant="ghost" />
        </div>

        {/* Status pill — alive-and-shipping signal */}
        <div className="mt-10 md:mt-12">
          <StatusPill text="currently building shrey.lab · pune" />
        </div>
      </div>
    </section>
  );
}
