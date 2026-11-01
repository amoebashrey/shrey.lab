import { Hero } from '@/components/home/Hero';
import { Outcomes } from '@/components/home/Outcomes';
import { SelectedWork } from '@/components/home/SelectedWork';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { Stagger } from '@/components/motion/Stagger';

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
      <Hero />
      <Stagger>
        <Outcomes />
        <SelectedWork />
        <AboutTeaser />
      </Stagger>
    </>
  );
}
