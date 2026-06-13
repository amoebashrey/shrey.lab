import Link from 'next/link';
import type { CaseStudy } from '@/lib/work';

/**
 * CaseStudyCard — used on homepage FeaturedWork and on /work index.
 *
 * Status drives behavior:
 * - 'in-progress' → card is a div, not a link. Shows "→ in progress" indicator.
 *                   Deep page returns 404 (handled in [slug]/page.tsx).
 * - 'published'   → card is a Link to its href. Shows "→ read".
 *
 * The signature hover orchestration (BRAND.md §9) is driven by the brand kit's
 * `.lab-card-orchestrated` class (tokens.css), all in concert on `--duration-base`:
 *   1. Card lifts -2px, shadow deepens, border strengthens
 *   2. Any `.lab-image` inside saturates B&W → color
 *   3. The `.lab-arrow` translates +2px right
 * Reduced motion is honored globally (tokens.css §reduced-motion).
 *
 * No images in the data model yet — the image slot carries `.lab-image` so the
 * B&W → color treatment is wired the moment a real image is dropped in.
 */

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { year, client, title, result, status, href } = study;
  const isLinkable = status === 'published' && !!href;
  const Wrapper = isLinkable ? Link : 'div';
  const wrapperProps = isLinkable
    ? { href: href as string }
    : { 'aria-label': `${title} — case study in progress` };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={[
        // .lab-card-orchestrated drives the hover (lift + image + arrow); p-0
        // overrides the kit class's default padding so the image stays full-bleed.
        'lab-card-orchestrated group block relative rounded-lg overflow-hidden bg-bg-elevated border border-border p-0',
        isLinkable ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
    >
      {/* Image slot — B&W → color on hover via .lab-image (ready for real images) */}
      <div className="lab-image relative aspect-[4/3] bg-bg-sunken overflow-hidden">
        {/* Placeholder line art until a real hero image lands (BRAND.md §5) */}
        <PlaceholderArt />

        {/* Status badge — only on in-progress */}
        {status === 'in-progress' && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)] text-3xs font-mono text-fg-muted tracking-mono">
              <span className="w-1 h-1 rounded-full bg-rust-400" aria-hidden="true" />
              in progress
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <p className="eyebrow mb-3">
          // case study · {year} · {client}
        </p>

        <h3 className="text-base md:text-lg font-medium leading-snug text-fg mb-3 tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-fg-muted leading-relaxed">{result}</p>

        <div className="mt-5 flex items-center gap-1 text-2xs font-mono text-fg-muted tracking-mono">
          {isLinkable ? (
            <>
              <span>read</span>
              <span className="lab-arrow" aria-hidden="true">
                →
              </span>
            </>
          ) : (
            <span>→ in progress</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

/**
 * Geometric line-art placeholder when no hero image yet.
 * Per BRAND.md §5: simple shapes, 1.5-2px strokes, single accent (lime/lavender/rust).
 * Inherits currentColor.
 */
function PlaceholderArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-fg-subtle/40 bg-bg-sunken">
      <svg
        viewBox="0 0 200 150"
        className="w-2/3 h-2/3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="20" y="20" width="160" height="110" rx="6" />
        <line x1="20" y1="50" x2="180" y2="50" />
        <circle cx="40" cy="35" r="3" fill="currentColor" />
        <line x1="40" y1="75" x2="120" y2="75" />
        <line x1="40" y1="90" x2="100" y2="90" />
        <line x1="40" y1="105" x2="140" y2="105" />
        {/* Lime accent dot — recurring signature */}
        <circle cx="160" cy="35" r="3" fill="var(--accent)" stroke="none" />
      </svg>
    </div>
  );
}
