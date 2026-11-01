import { SHOWCASE } from '@/lib/showcase';
import { CaseStudyFeature } from './CaseStudyFeature';

/**
 * Selected work — one card per case study (CaseStudyFeature), stacked.
 */
export function SelectedWork() {
  return (
    <section aria-labelledby="work-heading" className="cs-section seam py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="work-heading"
          className="mb-8 max-w-[20ch] text-balance text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg md:mb-10"
        >
          Things I’ve built that you can open and click
        </h2>
        <div className="flex flex-col gap-5">
          {SHOWCASE.map((s, i) => (
            <CaseStudyFeature key={s.slug} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
