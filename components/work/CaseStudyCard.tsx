import Link from 'next/link';
import { SLUGS_WITH_DETAIL, type CaseStudy } from '@/lib/work';

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
 * The image slot carries `.lab-image`, so any real image dropped in gets the
 * B&W → color treatment for free. When a study has no `image`, the slot falls
 * back to the geometric line-art placeholder.
 *
 * `variant` only changes how a study WITH assets fills the slot:
 *   - 'screenshot'  (default) — the product screenshot fills the slot, with the
 *                    brand mark as a small chip. Reads as a shipped product.
 *   - 'mascot-tile' — the brand mark, centered on a brand-tinted tile. Used to
 *                    preview the on-brand alternative. No screenshot.
 */

export function CaseStudyCard({
  study,
  variant = 'screenshot',
}: {
  study: CaseStudy;
  variant?: 'screenshot' | 'mascot-tile';
}) {
  const { slug, year, client, title, result, status, href } = study;

  // A written detail page wins; else a live product links straight out.
  const hasDetail = SLUGS_WITH_DETAIL.has(slug);
  const isExternal = !hasDetail && status === 'live' && !!href && /^https?:\/\//.test(href);
  const isInternal = hasDetail || (status === 'published' && !!href);
  const isLinkable = isInternal || isExternal;

  const Wrapper = !isLinkable ? 'div' : isExternal ? 'a' : Link;
  const wrapperProps = !isLinkable
    ? { 'aria-label': `${title} — case study in progress` }
    : isExternal
      ? { href: href as string, target: '_blank', rel: 'noopener noreferrer' }
      : { href: hasDetail ? `/work/${slug}` : (href as string) };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={[
        // .lab-card-orchestrated drives the hover (lift + image + arrow); .lab-glass
        // is the frosted surface; p-0 keeps the image slot full-bleed.
        'lab-card-orchestrated lab-glass group block relative rounded-lg overflow-hidden p-0',
        isLinkable ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
    >
      {/* Image slot — transparent so the frosted glass reads through; .lab-image
          gives real images the B&W → color hover when they land. */}
      <div className="lab-image relative aspect-[4/3] overflow-hidden">
        {study.image && variant === 'screenshot' ? (
          <>
            {/* Real product screenshot fills the slot (object-cover keeps the
                4:3 crop). It's a direct child so .lab-image > img grayscales it. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.image}
              alt={study.imageAlt ?? ''}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {study.brandMark && (
              <span className="lab-glass absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={study.brandMark}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
            )}
          </>
        ) : study.brandMark && variant === 'mascot-tile' ? (
          <MascotTile src={study.brandMark} alt={study.brandMarkAlt ?? ''} />
        ) : (
          /* Placeholder line art until a real hero image lands (BRAND.md §5) */
          <PlaceholderArt />
        )}

        {/* Status badge — live (lime), in-progress (rust), internal (lavender) */}
        {(status === 'in-progress' || status === 'live' || status === 'internal') && (
          <div className="absolute top-3 right-3">
            <span className="lab-glass inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-3xs font-mono text-fg-muted tracking-mono">
              <span
                className={`w-1 h-1 rounded-full ${
                  status === 'live'
                    ? 'bg-accent'
                    : status === 'internal'
                      ? 'bg-lavender-400'
                      : 'bg-rust-400'
                }`}
                aria-hidden="true"
              />
              {status === 'live' ? 'live' : status === 'internal' ? 'internal' : 'in progress'}
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
          {!isLinkable ? (
            <span>→ in progress</span>
          ) : isExternal ? (
            <>
              <span>visit</span>
              <span className="lab-arrow" aria-hidden="true">
                ↗
              </span>
            </>
          ) : (
            <>
              <span>read</span>
              <span className="lab-arrow" aria-hidden="true">
                →
              </span>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

/**
 * Brand-tile presentation of the mascot: the mark centered on a brand-tinted
 * tile (faint lavender + lime glows over the sunken surface), sitting on a soft
 * paper "icon plate" so the mascot's own backdrop reads as intentional in both
 * themes. The mascot is a direct/descendant <img>, so the card's B&W → color
 * hover still applies. No new colors — all from brand tokens.
 */
function MascotTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: 'var(--bg-sunken)' }}
    >
      {/* brand wash */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 90% at 28% 22%, rgba(156,134,212,0.22), transparent 60%), radial-gradient(120% 90% at 82% 88%, rgba(168,225,12,0.16), transparent 58%)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <span className="lab-glass inline-flex aspect-square w-[52%] items-center justify-center overflow-hidden rounded-2xl p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </span>
      </div>
    </div>
  );
}

/**
 * Geometric line-art placeholder when no hero image yet.
 * Per BRAND.md §5: simple shapes, 1.5-2px strokes, single accent (lime/lavender/rust).
 * Inherits currentColor.
 */
function PlaceholderArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-fg-subtle/40">
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
