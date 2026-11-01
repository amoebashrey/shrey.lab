import { Hero } from '@/components/home/Hero';
import { OutcomesStrip } from '@/components/home/OutcomesStrip';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { Stagger } from '@/components/motion/Stagger';
import { CursorField } from '@/components/CursorField';

/**
 * Homepage.
 *
 * Everything is visible on first paint: no intro overlay, and no section that
 * waits for JavaScript to appear (Stagger is CSS-only).
 *
 * Writing and Now are off the homepage until they have real content — no
 * "coming soon" (CLAUDE.md). The founder-focused restructure (docs/COPY.md)
 * replaces this order next.
 */
export default function HomePage() {
  return (
    <>
      {/* Cursor glow — homepage only per BRAND §9; fades out over the hero. */}
      <CursorField />
      <Hero />
      <Stagger>
        <OutcomesStrip />
        <FeaturedWork />
        <AboutTeaser />
      </Stagger>
    </>
  );
}
