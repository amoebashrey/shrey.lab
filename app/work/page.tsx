import type { Metadata } from 'next';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies — product work at Amber and elsewhere.',
};

/**
 * /work — case studies index.
 *
 * No filter UI per PROJECT_BRIEF.md (defer until ≥6 case studies).
 * Same card treatment as homepage. Cards with status='in-progress' show but
 * don't link out.
 *
 * When Sanity is wired:
 *   const cases = await sanityClient.fetch(`*[_type=="caseStudy" && status!="draft"] | order(year desc, ordering)`);
 */
const ALL_CASE_STUDIES = [
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
];

export default function WorkIndexPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <header className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">// work</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tightest text-fg mb-6">
            Selected <span className="italic-break text-fg-muted">case studies</span>
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Recent product work, written long-form. Each case study leads with the decision —
            what I chose <em>not</em> to build, and why — because that&apos;s the part that
            actually compounds.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ALL_CASE_STUDIES.map((cs) => (
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
      </div>
    </div>
  );
}
