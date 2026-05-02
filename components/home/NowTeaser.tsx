import Link from 'next/link';

/**
 * NowTeaser — one paragraph, alive-and-shipping signal, ends with → /now.
 *
 * Updated monthly. Once Sanity is wired, this fetches the latest nowEntry
 * and composes the teaser sentence from its currentlyBuilding + first shipped[].
 *
 * For now, hardcoded.
 */
export function NowTeaser() {
  return (
    <section
      aria-labelledby="now-teaser-heading"
      className="py-16 md:py-24 border-t border-border"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">// now</p>

          <h2 id="now-teaser-heading" className="sr-only">
            What I&apos;m working on now
          </h2>

          <p className="text-lg md:text-xl text-fg leading-relaxed">
            This month I&apos;m building out shrey.lab itself, reading the Sanity v3 docs more
            carefully than I&apos;d like to admit, and watching the monsoon arrive late in Pune.
          </p>

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
    </section>
  );
}
