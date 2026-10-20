import { Hero } from '@/components/home/Hero';
import { OutcomesStrip } from '@/components/home/OutcomesStrip';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { LatestWriting } from '@/components/home/LatestWriting';
import { NowTeaser } from '@/components/home/NowTeaser';
import { Stagger } from '@/components/motion/Stagger';
import { IntroGate } from '@/components/onboarding/IntroGate';
import { CursorField } from '@/components/CursorField';

/**
 * Homepage — the 60-second skim.
 *
 * Section order is LOCKED in PROJECT_BRIEF.md. Each section solves at least one
 * of the seven core problems:
 *
 * 1. Hero          → Problem 1 (PM seniority + category in 60s)
 *                    + its one CTA → Problem 6 (next-step path)
 * 3. Outcomes      → Problem 1, 3 (audit-proof metrics)
 * 4. Featured work → Problem 2 (decision-making proof)
 * 5. About teaser  → Problem 4 (range without dilution)
 * 6. Latest writing→ Problem 4 (intellectual range)
 * 7. Now teaser    → Problem 5 (continuous shipping)
 *
 * Alive-and-shipping signal (Problem 5) lives in the footer as a pulsing
 * status pill — see components/StatusPill.tsx (mounted in components/Footer.tsx).
 *
 * Don't add sections without updating PROJECT_BRIEF.md first.
 */
export default function HomePage() {
  return (
    <>
      {/* First-visit intro overlay (homepage only); renders on top, page below. */}
      <IntroGate />
      {/* Cursor lime glow — homepage only per BRAND §9 ("home hero only…
          reserved for one moment per site"); was previously global in layout. */}
      <CursorField />
      {/* Hero sits outside Stagger: it runs its own CSS entrance (visible
          without JS) and must not be double-animated. */}
      <Hero />
      <Stagger>
        <OutcomesStrip />
        <FeaturedWork />
        <AboutTeaser />
        <LatestWriting />
        <NowTeaser />
      </Stagger>
    </>
  );
}
