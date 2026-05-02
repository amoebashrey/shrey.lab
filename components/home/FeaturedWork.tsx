import { CaseStudyCard } from '@/components/work/CaseStudyCard';

/**
 * FeaturedWork — three case studies on the homepage.
 *
 * Per PROJECT_BRIEF.md > Featured work at launch (locked):
 * Three placeholder cards. Real eyebrows, real titles, real outcome sentences.
 * Status: in-progress. Cards visible, deep pages DISABLED until each one's
 * Sanity document has status=published.
 *
 * The data shape mirrors the future caseStudy Sanity schema so when CMS lands,
 * this component just maps over the query result.
 */
const FEATURED_CASE_STUDIES = [
  {
    slug: 'amber-university-white-label',
    year: 2024,
    company: 'amber',
    title: 'Unlocking a zero-CAC acquisition channel by treating university websites as a discovery surface',
    outcome:
      'Scaled across 30+ university pages; ~50% user conversion at zero paid CAC.',
    status: 'in-progress' as const,
  },
  {
    slug: 'amber-property-listing-conversion',
    year: 2024,
    company: 'amber',
    title: 'Diagnosing image quality as the hidden conversion lever for low-performing listings',
    outcome:
      '18% booking conversion lift after the UX rollout, working cross-functionally with data and inventory.',
    status: 'in-progress' as const,
  },
  {
    slug: 'amber-internal-ticketing',
    year: 2024,
    company: 'amber',
    title: 'Replacing a $20K vendor by building the right thing in-house',
    outcome:
      'Shipped from concept to production; full adoption; ~$20K/year saved.',
    status: 'in-progress' as const,
  },
] as const;

export function FeaturedWork() {
  return (
    <section
      aria-labelledby="work-heading"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <header className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="eyebrow mb-3">// selected work</p>
            <h2
              id="work-heading"
              className="text-3xl md:text-4xl font-medium tracking-tighter text-fg"
            >
              Recent <span className="italic-break text-fg-muted">case studies</span>
            </h2>
          </div>
          <a
            href="/work"
            className="hidden md:inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors duration-fast group"
          >
            All work
            <span className="transition-transform duration-fast group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURED_CASE_STUDIES.map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              slug={cs.slug}
              year={cs.year}
              company={cs.company}
              title={cs.title}
              outcome={cs.outcome}
              status={cs.status}
            />
          ))}
        </div>

        {/* Mobile-only "all work" link (desktop has it in the header) */}
        <div className="md:hidden mt-10">
          <a
            href="/work"
            className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            All work →
          </a>
        </div>
      </div>
    </section>
  );
}
