import Link from 'next/link';

/**
 * NowTeaser — alive-and-shipping signal in the /now register, ends with → /now.
 *
 * Rendered as the brutalist changelog card the destination page uses — one
 * texture change that breaks the run of three same-gray prose teasers at the
 * bottom of the homepage (About → Writing → Now), and previews exactly what
 * clicking through gets you. Brutalist is /now + /tools' sanctioned mode.
 *
 * Updated monthly. Once Sanity is wired, this fetches the latest nowEntry
 * and composes the lines from its fields. For now, hardcoded.
 */
export function NowTeaser() {
  return (
    <section
      aria-labelledby="now-teaser-heading"
      className="py-16 md:py-24 border-t border-border"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">// now</p>

          <h2 id="now-teaser-heading" className="sr-only">
            What I&apos;m working on now
          </h2>

          <div className="rounded-md border-3 border-fg shadow-brutal-sm bg-bg p-6 md:p-8">
            <ul className="space-y-2 font-mono text-sm text-fg tracking-mono leading-relaxed">
              <li>— building: shrey.lab, the site you&apos;re reading</li>
              <li>— reading: the Sanity v3 docs, more carefully than I&apos;d like to admit</li>
              <li>— pune: monsoon arrived late, the bougainvillea is confused</li>
            </ul>

            <Link
              href="/now"
              className="mt-6 inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors duration-fast group"
            >
              What I&apos;m working on now
              <span
                className="transition-transform duration-fast group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
