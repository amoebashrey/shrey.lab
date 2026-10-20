import Link from 'next/link';
import type { CSSProperties } from 'react';
import { TileSharkBackground } from './TileSharkBackground';

/**
 * Hero — centred noun + supporting italic sentence + one action, with tile
 * sharks drifting around it.
 *
 * The band is full-bleed and paints --hero-bg (pure white in light, warm
 * charcoal in dark); the canvas sits behind the copy. The copy block carries
 * the same solid colour, so a shark passing behind the text is hidden by it
 * rather than fighting the type for contrast.
 *
 * Entrance (globals.css .hero-enter): headline → sentence → button, 70ms
 * apart, rising 16px. Pure CSS, so the copy never depends on hydration; a
 * <noscript> override keeps it visible if JS never runs. Gated on
 * html[data-intro-done] like the lime line, so it plays after the intro.
 *
 * data-cursor-off: CursorField fades its lime glow out over this band.
 */
const enter = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-cursor-off=""
      // -mt-8 cancels <main>'s pt-8 so the band starts at the top edge,
      // under the floating nav, instead of leaving a paper strip above it.
      className="hero-band relative isolate -mt-8 overflow-hidden"
    >
      <TileSharkBackground />
      <noscript
        dangerouslySetInnerHTML={{
          __html: '<style>.hero-enter{animation:none!important}</style>',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[clamp(560px,88svh,820px)] max-w-[1280px] items-center justify-center px-4 pb-16 pt-28 md:px-8 md:pt-32">
        <div className="hero-plate flex flex-col items-center rounded-3xl px-6 py-8 text-center md:px-12 md:py-10">
          {/* Cinematic load (tokens.css §cinematic) — a short lime rule that
              draws out from the centre once the intro has finished. */}
          <div className="hero-lime-line hero-lime-line--center mb-8 w-16" aria-hidden="true" />
          <p className="eyebrow mb-6" aria-hidden="true">
            // shreyas jadhav · amber · pune
          </p>

          <h1
            id="hero-heading"
            className="hero-enter hero-depth text-balance font-medium text-fg text-[clamp(48px,7vw,88px)] leading-[0.98] tracking-tightest"
            style={enter(0)}
          >
            Product manager.
          </h1>

          <p
            className="hero-enter mt-6 max-w-[34ch] text-balance font-display text-[clamp(20px,2.4vw,32px)] font-normal italic leading-[1.25] tracking-snug text-fg md:mt-8"
            style={enter(1)}
          >
            I build internal tools, AI agents, and systems that help product teams move.
          </p>

          {/* One primary action only — work-first. Resume lives in the nav. */}
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
