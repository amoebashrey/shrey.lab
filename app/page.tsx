import { Hero } from '@/components/home/Hero';
import { HeroCTAs } from '@/components/home/HeroCTAs';
import { OutcomesStrip } from '@/components/home/OutcomesStrip';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { LatestWriting } from '@/components/home/LatestWriting';
import { NowTeaser } from '@/components/home/NowTeaser';

/**
 * Homepage — the 60-second skim.
 *
 * Section order is LOCKED in PROJECT_BRIEF.md. Each section solves at least one
 * of the seven core problems:
 *
 * 1. Hero          → Problem 1 (PM seniority + category in 60s)
 * 2. Hero CTAs     → Problem 6 (next-step path)
 * 3. Outcomes      → Problem 1, 3 (audit-proof metrics)
 * 4. Featured work → Problem 2 (decision-making proof)
 * 5. About teaser  → Problem 4 (range without dilution)
 * 6. Latest writing→ Problem 4 (intellectual range)
 * 7. Now teaser    → Problem 5 (continuous shipping)
 *
 * Alive-and-shipping signal (Problem 5) lives in the footer as a rolling
 * status pill — see components/RollingStatus.tsx.
 *
 * Don't add sections without updating PROJECT_BRIEF.md first.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroCTAs />
      <OutcomesStrip />
      <FeaturedWork />
      <AboutTeaser />
      <LatestWriting />
      <NowTeaser />
    </>
  );
}
