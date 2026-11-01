'use client';

import { useEffect, useState } from 'react';
import { TileSharkBackground } from './TileSharkBackground';

/**
 * HeroSharks — the shark canvas plus its pause/play control (bottom-right of
 * the hero). The choice is remembered, so someone who paused once isn't made
 * to pause again on every visit.
 *
 * Under reduced motion the canvas is already a still frame, so the control is
 * hidden (globals.css) rather than offering a play that does nothing.
 */
const KEY = 'hero-paused';

export function HeroSharks({ avoidSelector }: { avoidSelector?: string }) {
  const [paused, setPaused] = useState(false);
  // The control only works once the canvas is running, so it isn't rendered
  // before then (or at all without JavaScript).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    try {
      setPaused(localStorage.getItem(KEY) === '1');
    } catch {
      /* storage disabled — start playing */
    }
  }, []);

  function toggle() {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(KEY, next ? '1' : '0');
    } catch {
      /* fine — it just won't be remembered */
    }
  }

  return (
    <>
      <TileSharkBackground
        paused={paused}
        avoidSelector={avoidSelector}
        fixedObstacleSelector="[data-shark-obstacle]"
      />
      {ready && (
        <button
        type="button"
        onClick={toggle}
        aria-label={paused ? 'Play animation' : 'Pause animation'}
        className="hero-motion-toggle absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted md:bottom-6 md:right-8"
      >
        {paused ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="5" y="4" width="5" height="16" rx="1.5" />
            <rect x="14" y="4" width="5" height="16" rx="1.5" />
          </svg>
        )}
        </button>
      )}
    </>
  );
}
