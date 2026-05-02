import Link from 'next/link';

/**
 * AboutTeaser — 60-80 words, no photo, ends with one human detail.
 *
 * Per PROJECT_BRIEF.md §6 (homepage hierarchy):
 * "Bridges credentials to character. Photo lives on /about, not here."
 *
 * This is the only place on the homepage where founder ventures appear,
 * and only as a teaser into /about — not as a load-bearing range surface.
 * The arrow disambiguates: this isn't "more about me," it's "if you're
 * curious, here's depth."
 *
 * Final wording locks after inventory (Section 7 of the Notion questionnaire).
 */
export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="py-16 md:py-24 border-t border-border"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">// about</p>

          <h2 id="about-teaser-heading" className="sr-only">
            About Shreyas
          </h2>

          <p className="text-lg md:text-xl text-fg leading-relaxed">
            Before Amber, I built a kombucha brand from the kitchen counter, ran a 600-attendee discussion
            community across four countries, and taught fermentation at engineering colleges. Different
            surfaces, same instinct: ship, talk to people, fix what&apos;s broken. These days I do that
            for a global student housing marketplace, and the kombucha kit lives in storage,{' '}
            <span className="italic-break text-fg-muted">mostly</span>.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors duration-fast group"
          >
            About me
            <span
              className="transition-transform duration-fast group-hover:translate-x-0.5"
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
