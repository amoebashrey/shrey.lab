import { SHOWCASE } from '@/lib/showcase';
import { CaseStudyFeature } from './CaseStudyFeature';

/**
 * Selected work — one card per case study (CaseStudyFeature), stacked.
 */
export function SelectedWork() {
  return (
    <section aria-labelledby="work-heading" className="cs-section py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="work-heading"
          className="mx-auto mb-10 max-w-[18ch] text-balance text-center text-4xl font-medium tracking-tight text-fg md:mb-14 md:text-5xl"
        >
          Things I’ve built that you can open and click
        </h2>
        <div className="flex flex-col gap-6 md:gap-8">
          {SHOWCASE.map((s, i) => (
            <CaseStudyFeature key={s.slug} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
