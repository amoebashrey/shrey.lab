import Link from 'next/link';
import { NotFoundWordmark } from '@/components/NotFoundWordmark';

/**
 * 404 — using the canonical voice example from VOICE.md.
 *
 * "Well, this is awkward. The page you're looking for either never existed or
 *  quietly retired. Want to head back?"
 *
 * Centered, generous whitespace, three plain links. The wordmark on top is
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

        <h1 className="text-3xl md:text-4xl tracking-tight text-fg mb-6">
          Well, this is awkward.
        </h1>

        <p className="text-base md:text-lg text-fg-muted leading-relaxed mb-10">
          The page you&apos;re looking for either never existed or quietly retired.
          Want to head back?
        </p>

        <nav className="flex items-center justify-center gap-6 text-sm">
          <Link
            href="/"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            About
          </Link>
        </nav>
      </div>
    </div>
  );
}
