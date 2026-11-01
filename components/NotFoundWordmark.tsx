'use client';

import { useEffect, useState } from 'react';
import { HeatWord, type Stops } from '@/components/bencho/heat-word/HeatWord';
import '@/components/bencho/heat-word/HeatWord.css';
import { ACCENT_EVENT, accentPalette, readAccent } from '@/lib/accent';

/**
 * NotFoundWordmark — the 404's wordmark, drawn by Bencho's Heat map: flat
 * grey until the pointer comes, then it melts into a heat map in the site's
 * accent palette (pale rim → accent → dark core), in either theme.
 */

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

function heatStops(): Stops {
  const [back, flank, accent, belly] = accentPalette(readAccent(), isDark());
  return [
    [0, [belly[0], belly[1], belly[2]]],
    [0.3, [accent[0], accent[1], accent[2]]],
    [0.65, [flank[0], flank[1], flank[2]]],
    [1, [back[0], back[1], back[2]]],
  ];
}

export function NotFoundWordmark() {
  const [stops, setStops] = useState<Stops | null>(null);

  useEffect(() => {
    const update = () => setStops(heatStops());
    update();
    window.addEventListener(ACCENT_EVENT, update);
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      window.removeEventListener(ACCENT_EVENT, update);
      mo.disconnect();
    };
  }, []);

  // Fixed box on the server too, so nothing shifts when it mounts.
  return (
    <div className="mx-auto h-[150px] w-[min(100%,420px)]" translate="no">
      {stops && <HeatWord word="shrey.lab" width={420} height={150} stops={stops} soft={18} />}
    </div>
  );
}
