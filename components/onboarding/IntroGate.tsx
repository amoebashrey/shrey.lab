'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Code-split the overlay (and its dynamic GSAP import) out of the main bundle.
// ssr:false — it's a client-only, first-paint-after-hydration concern.
const Intro = dynamic(() => import('./Intro').then((m) => m.Intro), { ssr: false });

const PLAYED_KEY = 'intro-played';

/**
 * IntroGate — decides whether the intro plays. Mounted on the homepage only.
 *
 * - Once EVER: localStorage. Persona 1 is a skeptical hiring manager on a
 *   60-second skim — a ~5s forced overlay is a first-impression tax worth
 *   paying at most once. (Was sessionStorage: every new tab/day replayed it.)
 * - prefers-reduced-motion: never play — instant reveal.
 * - Renders nothing on the server / first client tick (no hydration flash); the
 *   homepage is always rendered underneath regardless.
 */
export function IntroGate() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = localStorage.getItem(PLAYED_KEY) === '1';
    } catch {
      /* storage disabled — treat as not played */
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!alreadyPlayed && !reduceMotion) {
      setPlay(true);
    } else {
      // No intro this visit — release the hero's lime-line draw immediately.
      document.documentElement.setAttribute('data-intro-done', '');
    }
  }, []);

  function handleDone() {
    try {
      localStorage.setItem(PLAYED_KEY, '1');
    } catch {
      /* private mode / storage disabled — fine, it just may replay */
    }
    // Overlay lifted — now the lime line's 600ms draw is actually visible.
    document.documentElement.setAttribute('data-intro-done', '');
    setPlay(false);
  }

  if (!play) return null;
  return <Intro onDone={handleDone} />;
}
