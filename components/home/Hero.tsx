import Link from 'next/link';
import type { CSSProperties } from 'react';
import { HeroFootprints } from './HeroFootprints';
import { HERO_LINE, NAME } from '@/lib/site';

/**
 * Hero — centred name in Fraunces + one plain sentence + one action, with
 * two dinosaurs' tile footprints walking around it.
 *
 * The band is full-bleed and paints --hero-bg (pure white in light, warm
 * charcoal in dark). No card behind the copy: the walkers treat the copy
 * column ([data-tile-avoid]) as an obstacle and swerve around it, so the
 * text always sits on clean page colour at full contrast. A quiet pause/play
 * control sits bottom-right (HeroFootprints).
 *
 * Entrance (globals.css .hero-enter): headline → sentence → button settle
 * 16px into place, 70ms apart. Pure CSS and transform only, so the copy is
 * readable on the first frame with or without JavaScript.
 *
 */
const enter = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      // -mt-8 cancels <main>'s pt-8 so the band starts at the top edge,
      // under the floating nav, instead of leaving a paper strip above it.
      className="hero-band relative isolate -mt-8 overflow-hidden"
    >
      <HeroFootprints avoidSelector="[data-tile-avoid]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] items-center justify-center px-4 pb-48 pt-28 sm:min-h-[clamp(560px,88svh,820px)] sm:pb-16 md:px-8 md:pt-32">
        <div data-tile-avoid="" className="flex flex-col items-center text-center">
          {/* Cinematic load (tokens.css §cinematic) — a short accent rule that
              draws out from the centre at first paint. */}
          <div className="hero-lime-line hero-lime-line--center mb-8 w-16" aria-hidden="true" />

          <h1
            id="hero-heading"
            className="hero-enter text-balance text-[clamp(52px,7.5vw,96px)] leading-none tracking-[-0.03em] text-fg"
            style={enter(0)}
          >
            {NAME}.
          </h1>

          <p
            className="hero-enter mt-6 max-w-[38ch] text-balance text-[clamp(17px,1.5vw,20px)] leading-normal text-fg-muted md:mt-7"
            style={enter(1)}
          >
            {HERO_LINE}
          </p>

          {/* One primary action only — work-first. */}
          <div className="hero-enter mt-10" style={enter(2)}>
            <Link
              href="/work"
              className="hero-btn inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-[var(--accent-fg)]"
            >
              View work
              <span className="hero-btn-arrow inline-block" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
