import { SHOWCASE } from '@/lib/showcase';
import { CaseStudyFeature } from './CaseStudyFeature';

/**
 * Selected work — one card per case study (CaseStudyFeature), stacked.
 */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="cs-section seam scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="work-heading"
          className="mb-3 max-w-[20ch] text-balance text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg"
        >
          Built from zero, live right now
        </h2>
        <p className="mb-8 max-w-[60ch] text-base leading-relaxed text-fg-muted md:mb-10 md:text-lg">
          If you’re hiring someone to build, you should be able to click what they’ve built. Two of
          these are live. The third is an internal tool, so you get the write-up instead.
        </p>
        <div className="flex flex-col gap-5">
          {SHOWCASE.map((s, i) => (
            <CaseStudyFeature key={s.slug} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
