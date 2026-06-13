import { CaseStudyCard } from '@/components/work/CaseStudyCard';
import { FEATURED_CASE_STUDIES } from '@/lib/work';

/**
 * FeaturedWork — featured case studies on the homepage.
 *
 * Per PROJECT_BRIEF.md > Featured work at launch (locked):
 * Cards visible, deep pages DISABLED until each one's status flips to
 * 'published'. Data comes from lib/work.ts (single source of truth, shared
 * with /work) — when Sanity lands this just swaps for a query result.
 */
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
            <CaseStudyCard key={cs.slug} study={cs} />
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
