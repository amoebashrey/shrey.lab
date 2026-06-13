import type { Metadata } from 'next';
import { CaseStudyCard } from '@/components/work/CaseStudyCard';
import { FadeUp } from '@/components/motion/FadeUp';
import { CASE_STUDIES } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies — product work at Amber and elsewhere.',
};

/**
 * /work — case studies index.
 *
 * No filter UI per PROJECT_BRIEF.md (defer until ≥6 case studies).
 * Same card treatment as homepage. Cards with status='in-progress' show but
 * don't link out. Data comes from lib/work.ts (single source of truth).
 *
 * When Sanity is wired:
 *   const cases = await sanityClient.fetch(`*[_type=="caseStudy" && status!="draft"] | order(year desc, ordering)`);
 */
export default function WorkIndexPage() {
  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-[1280px] px-6 md:px-8">
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
          {CASE_STUDIES.map((cs) => (
            <CaseStudyCard key={cs.slug} study={cs} />
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
