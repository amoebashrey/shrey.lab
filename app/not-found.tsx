import Link from 'next/link';

/**
 * 404 — using the canonical voice example from VOICE.md.
 *
 * "Well, this is awkward. The page you're looking for either never existed or
 *  quietly retired. Want to head back?"
 *
 * Centered, generous whitespace, monogram, three nav arrows.
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 md:py-32">
      <div className="mx-auto max-w-md px-6 text-center">
        <p className="eyebrow mb-6">// 404</p>

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-fg mb-6">
          Well, this is <span className="italic-break text-fg-muted">awkward</span>.
        </h1>

        <p className="text-base md:text-lg text-fg-muted leading-relaxed mb-10">
          The page you&apos;re looking for either never existed or quietly retired.
          Want to head back?
        </p>

        <nav className="flex items-center justify-center gap-6 text-sm font-mono tracking-mono">
          <Link
            href="/"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            → home
          </Link>
          <Link
            href="/work"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            → work
          </Link>
          <Link
            href="/writing"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            → writing
          </Link>
        </nav>

        {/* One lime dot somewhere on the page, per signature rules */}
        <div className="mt-16 inline-flex items-center justify-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
