import { AccentSlider } from './AccentSlider';
import { ThemeToggle } from './ThemeToggle';

/**
 * SiteControls — the fixed top-right column: theme toggle, and under it the
 * accent-colour slider. Separate from the nav pill on purpose: these change
 * how the site looks, not where you go.
 */
export function SiteControls() {
  return (
    <div className="fixed right-4 top-5 z-[100] flex flex-col items-center gap-2 md:right-6">
      <ThemeToggle />
      <AccentSlider />
    </div>
  );
}
