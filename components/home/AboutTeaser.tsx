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
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <div className="max-w-2xl">
          <h2
            id="about-teaser-heading"
            className="mb-6 text-balance text-4xl tracking-tight text-fg md:text-5xl"
          >
            Before product, kombucha
          </h2>

          <p className="text-lg md:text-xl text-fg leading-relaxed">
            In college I brewed and sold kombucha from home (₹1L+ in revenue), grew a discussion
            community from five people to 600+ across four countries, and taught fermentation at
            engineering colleges. Now I build product for a global student housing marketplace.
            The kombucha kit is in storage, mostly.
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
