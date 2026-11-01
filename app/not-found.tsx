import Link from 'next/link';
import { NotFoundWordmark } from '@/components/NotFoundWordmark';

/**
 * 404 — using the canonical voice example from VOICE.md.
 *
 * "Well, this is awkward. The page you're looking for either never existed or
 *  quietly retired. Want to head back?"
 *
 * Centered, generous whitespace, three nav arrows. The wordmark on top is
 * Bencho's Heat map: grey at rest, melting into the accent palette under the
 * pointer — the one playful moment, where the brand allows humour.
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 md:py-32">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="nf-heat mb-8">
          <NotFoundWordmark />
        </div>
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
            href="/about"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            → about
          </Link>
        </nav>
      </div>
    </div>
  );
}
