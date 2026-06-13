'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Code-split the overlay (and its dynamic GSAP import) out of the main bundle.
// ssr:false — it's a client-only, first-paint-after-hydration concern.
const Intro = dynamic(() => import('./Intro').then((m) => m.Intro), { ssr: false });

const SESSION_KEY = 'intro-played';

/**
 * IntroGate — decides whether the intro plays. Mounted on the homepage only.
 *
 * - Session-only: sessionStorage (NOT localStorage) so it plays once per session
 *   and a return visit on another day sees it again.
 * - prefers-reduced-motion: never play — instant reveal.
 * - Renders nothing on the server / first client tick (no hydration flash); the
 *   homepage is always rendered underneath regardless.
 */
export function IntroGate() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === '1';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!alreadyPlayed && !reduceMotion) setPlay(true);
  }, []);

  function handleDone() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* private mode / storage disabled — fine, it just may replay */
    }
    setPlay(false);
  }

  if (!play) return null;
  return <Intro onDone={handleDone} />;
}
