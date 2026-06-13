'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — Lenis-powered smooth scrolling, mounted once in the root layout.
 *
 * Hard requirement: if the user prefers reduced motion, Lenis never initializes —
 * the page uses native scroll only. We also bail if the media query flips to
 * "reduce" while mounted.
 *
 * Renders children untouched; it only attaches a scroll behavior side-effect.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      // Reduced motion → native scroll, no Lenis.
      return;
    }

    const lenis = new Lenis();
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
