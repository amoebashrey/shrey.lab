'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import {
  accentColor,
  applyAccent,
  DEFAULT_ACCENT_HUE,
  hueName,
  readAccentHue,
} from '@/lib/accent';

/**
 * AccentSlider — a vertical hue track under the theme toggle. One control
 * recolours the whole accent system (CTA, dots, links, focus ring, the tile
 * creatures). Top of the track = hue 360, bottom = 0; up increases.
 *
 * The thumb's position and fill come from CSS vars (--accent-hue, --accent)
 * that the head script sets before paint, so it renders in place on first
 * paint with no hydration jump.
 *
 * Phones: the track is behind a swatch button so it doesn't sit over content.
 */

// Track gradient, sampled at the accent's lightness so it shows exactly the
// colours the site will take.
const TRACK = (() => {
  const stops: string[] = [];
  for (let h = 360; h >= 0; h -= 20) {
    const c = accentColor(h);
    stops.push(`rgb(${c[0]} ${c[1]} ${c[2]}) ${(((360 - h) / 360) * 100).toFixed(1)}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`;
})();

const STEP = 5;
const PAGE = 30;

export function AccentSlider() {
  const [hue, setHue] = useState(DEFAULT_ACCENT_HUE);
  const [open, setOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const pending = useRef<number | null>(null);

  useEffect(() => setHue(readAccentHue()), []);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Coalesce drag updates to one apply per frame.
  function set(next: number) {
    const h = ((Math.round(next) % 360) + 360) % 360;
    setHue(h);
    pending.current = h;
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (pending.current !== null) applyAccent(pending.current);
        pending.current = null;
      });
    }
  }

  function hueAt(clientY: number) {
    const r = rectRef.current;
    if (!r) return hue;
    const t = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    return 360 - t * 360;
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    rectRef.current = trackRef.current?.getBoundingClientRect() ?? null; // once per drag
    e.currentTarget.setPointerCapture(e.pointerId);
    set(hueAt(e.clientY));
    (e.currentTarget.querySelector('[role="slider"]') as HTMLElement | null)?.focus({
      preventScroll: true,
    });
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    set(hueAt(e.clientY));
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const map: Record<string, number> = {
      ArrowUp: STEP,
      ArrowRight: STEP,
      ArrowDown: -STEP,
      ArrowLeft: -STEP,
      PageUp: PAGE,
      PageDown: -PAGE,
    };
    if (e.key in map) {
      e.preventDefault();
      set(hue + map[e.key]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      set(DEFAULT_ACCENT_HUE); // Home = back to the brand lime
    }
  }

  return (
    <div className="nav-glass nav-enter-fade flex flex-col items-center rounded-full p-1.5">
      {/* Phones: swatch that reveals the track */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="accent-track"
        aria-label="Accent colour"
        className="accent-swatch inline-flex h-11 w-11 items-center justify-center rounded-full sm:hidden"
      >
        <span className="h-4 w-4 rounded-full bg-accent ring-2 ring-[var(--hero-bg)]" aria-hidden="true" />
      </button>

      <div
        id="accent-track"
        className={`${open ? 'flex' : 'hidden'} h-40 w-11 touch-none select-none justify-center py-3 sm:flex`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div ref={trackRef} className="relative h-full w-2.5 rounded-full" style={{ background: TRACK }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Accent colour"
            aria-orientation="vertical"
            aria-valuemin={0}
            aria-valuemax={359}
            aria-valuenow={hue}
            aria-valuetext={`${hueName(hue)}, hue ${hue}`}
            onKeyDown={onKeyDown}
            className="accent-thumb absolute left-1/2 h-5 w-5 rounded-full bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
