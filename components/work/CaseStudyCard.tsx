import Link from 'next/link';

/**
 * CaseStudyCard — used on homepage FeaturedWork and on /work index.
 *
 * Status drives behavior:
 * - 'in-progress' → card is a div, not a link. Shows "→ in progress" indicator.
 *                   Deep page returns 404 (handled in [slug]/page.tsx).
 * - 'published'   → card is a Link to /work/{slug}. Shows "→ read".
 * - 'draft'       → card not rendered at all (filtered upstream).
 *
 * The signature hover orchestration (BRAND.md §9):
 * 1. Card lifts -2px, shadow deepens
 * 2. Image inside saturates B&W → color (handled by .lab-image)
 * 3. Arrow translates +2px right
 *
 * All three motions in concert.
 */

interface CaseStudyCardProps {
  slug: string;
  year: number;
  company: string;
  title: string;
  outcome: string;
  status: 'in-progress' | 'published';
  imageSrc?: string;
  imageAlt?: string;
}

export function CaseStudyCard({
  slug,
  year,
  company,
  title,
  outcome,
  status,
  imageSrc,
  imageAlt,
}: CaseStudyCardProps) {
  const isLinkable = status === 'published';
  const Wrapper = isLinkable ? Link : 'div';
  const wrapperProps = isLinkable
    ? { href: `/work/${slug}` }
    : { 'aria-label': `${title} — case study in progress` };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={[
        'group block relative rounded-lg overflow-hidden bg-bg-elevated border border-border',
        'transition-all duration-med',
        isLinkable
          ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong/30 cursor-pointer'
          : 'cursor-default',
      ].join(' ')}
    >
      {/* Image — B&W → color on hover via .lab-image */}
      <div className="relative aspect-[4/3] bg-bg-sunken overflow-hidden">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imageAlt || ''}
            className="lab-image w-full h-full object-cover"
          />
        ) : (
          // Placeholder treatment when no image — geometric line art per BRAND.md §5
          <PlaceholderArt />
        )}

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
          // case study · {year} · {company}
        </p>

        <h3 className="text-base md:text-lg font-medium leading-snug text-fg mb-3 tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-fg-muted leading-relaxed">{outcome}</p>

        <div className="mt-5 flex items-center gap-1 text-2xs font-mono text-fg-muted tracking-mono">
          {isLinkable ? (
            <>
              <span>→ read</span>
              <span
                className="transition-transform duration-fast group-hover:translate-x-0.5"
                aria-hidden="true"
              />
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
