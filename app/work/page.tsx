import type { Metadata } from 'next';
import { CaseStudyFeature } from '@/components/home/CaseStudyFeature';
import { FadeUp } from '@/components/motion/FadeUp';
import { SHOWCASE } from '@/lib/showcase';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Things I’ve built: Felix, Pune Bookies and Hubble, each with the problem, the build and what happened.',
};

/**
 * /work — case studies index.
 *
 * The same one-card-per-study layout as the homepage (CaseStudyFeature), so a
 * study looks the same wherever you meet it. No filter UI per PROJECT_BRIEF.md
 * (defer until ≥6 case studies). Content: lib/showcase.ts.
 */
export default function WorkIndexPage() {
  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-[1180px] px-4 md:px-8">
        <header className="mb-12 max-w-2xl md:mb-16">
          <h1 className="mb-6 text-4xl tracking-[-0.03em] text-fg md:text-5xl">Work</h1>
          <p className="text-lg leading-relaxed text-fg-muted">
            Three things I built, each told as the problem, what I made, and what happened.
            The case studies have the long version, including what didn’t work.
          </p>
        </header>

        <div className="flex flex-col gap-6 md:gap-8">
          {SHOWCASE.map((s, i) => (
            <CaseStudyFeature key={s.slug} study={s} index={i} />
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
