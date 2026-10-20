'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorField — a subtle lime glow that softly trails the pointer and gently
 * intensifies near interactive elements. Personality in the corners; never
 * distracts from content.
 *
 * - Lime accent at low opacity, soft radial gradient. Driven by one rAF loop
 *   that lerps toward the pointer and writes only transform/opacity (no layout
 *   thrash). pointer-events:none, so it never blocks clicks; clipped to the
 *   viewport so it can't create scrollbars.
 * - Desktop only: gated on (pointer: fine). No effect on touch.
 * - prefers-reduced-motion: disabled entirely (renders nothing active).
 */
export function CursorField() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return; // no listeners, stays invisible

    const el = glowRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let targetHot = 0; // near an interactive element?
    let hot = 0;
    let targetVisible = 0; // fade in after the first move, out on leave
    let visible = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const t = e.target as Element | null;
      // Fade out over regions that opt out (the tile-shark hero band: nothing
      // but the sharks should colour its page).
      targetVisible = t?.closest('[data-cursor-off]') ? 0 : 1;
      targetHot = t?.closest('a,button,[role="button"],input,textarea,select,[tabindex]')
        ? 1
        : 0;
    };
    const onLeave = () => {
      targetVisible = 0;
    };

    const loop = () => {
      x += (targetX - x) * 0.15; // soft trail
      y += (targetY - y) * 0.15;
      hot += (targetHot - hot) * 0.08;
      visible += (targetVisible - visible) * 0.1;
      const scale = 1 + hot * 0.4;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      // base ~0.06, up to ~0.13 near interactive; faded by visibility
      el.style.opacity = String((0.06 + hot * 0.07) * visible);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(168,225,12,0.55) 0%, rgba(168,225,12,0) 70%)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
