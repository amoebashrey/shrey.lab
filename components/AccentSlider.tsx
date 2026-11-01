'use client';

import { useEffect, useState } from 'react';
import { accentColor, applyAccent, DEFAULT_ACCENT_HUE, readAccent } from '@/lib/accent';
import { HueWake } from '@/components/bencho/wake-slider/HueWake';
import '@/components/bencho/wake-slider/HueWake.css';

/**
 * AccentSlider — the colour control under the theme toggle: Bencho's Wake
 * slider over the hue circle. One control recolours the whole accent system
 * (CTA, links, focus ring, dots, sharks); every hue is generated in OKLCH at a
 * fixed lightness, so contrast holds wherever it lands (lib/accent.ts).
 *
 * Phones: the bars sit behind a swatch button so they don't cover content.
 */

// Each bar shows the accent at the middle of its 10° slice, in both themes.
const rgb = (c: readonly number[]) => `rgb(${c.join(' ')})`;
const BARS = Array.from({ length: 36 }, (_, i) => ({
  light: rgb(accentColor(i * 10 + 5, false)),
  dark: rgb(accentColor(i * 10 + 5, true)),
}));

export function AccentSlider() {
  const [hue, setHue] = useState(DEFAULT_ACCENT_HUE);
  const [open, setOpen] = useState(false);

  useEffect(() => setHue(readAccent()), []);

  function change(next: number) {
    setHue(next);
    applyAccent(next);
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Phones: swatch that reveals the bars */}
      <div className="nav-glass nav-enter-fade rounded-full p-1.5 sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="accent-control"
          aria-label="Accent colour"
          className="accent-swatch inline-flex h-11 w-11 items-center justify-center rounded-full"
        >
          <span className="h-4 w-4 rounded-full bg-accent" aria-hidden="true" />
        </button>
      </div>

      <div
        id="accent-control"
        className={`${open ? 'flex' : 'hidden'} nav-glass nav-enter-fade h-14 items-center rounded-full sm:flex`}
      >
        <HueWake value={hue} onChange={change} colors={BARS} label="Accent colour" />
      </div>
    </div>
  );
}
