import type { Palette, RGB } from '@/lib/tile-art';

/**
 * Accent — one hue drives every accent on the site: the CTA, the lime dots,
 * focus rings, links, selection and the tile creatures. Colours are built in
 * OKLCH so every hue lands at the same perceived lightness as the brand lime
 * (#A8E10C ≈ oklch(0.839 0.212 126)), then pulled into sRGB by lowering
 * chroma only — so dark text on the accent keeps AA contrast at any hue.
 *
 * Framework-free. The hue lives in localStorage; layout.tsx's head script
 * re-applies the stored CSS before first paint (no flash).
 */

export const DEFAULT_ACCENT_HUE = 126; // brand lime
export const ACCENT_EVENT = 'accentchange';
const HUE_KEY = 'accent-hue';
export const ACCENT_CSS_KEY = 'accent-css';

const ACCENT = { L: 0.839, C: 0.212 };
const ACCENT_HOVER = { L: 0.77, C: 0.195 };

// Shading stops for creatures: dark back → mid → the accent itself → pale
// belly. Same hue throughout, so the animals and the CTA read as one colour.
const PALETTE_LIGHT: ReadonlyArray<{ L: number; C: number }> = [
  { L: 0.3, C: 0.075 },
  { L: 0.52, C: 0.14 },
  ACCENT,
  { L: 0.96, C: 0.035 },
];
// Dark theme: the back is lifted off the #181815 page so silhouettes read.
const PALETTE_DARK: ReadonlyArray<{ L: number; C: number }> = [
  { L: 0.44, C: 0.1 },
  { L: 0.62, C: 0.15 },
  ACCENT,
  { L: 0.95, C: 0.035 },
];

function oklchToLinear(L: number, C: number, h: number): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = (c: [number, number, number]) => c.every((v) => v >= -1e-4 && v <= 1 + 1e-4);
const encode = (v: number) => {
  v = Math.min(1, Math.max(0, v));
  return Math.round((v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055) * 255);
};

/** OKLCH → sRGB, keeping L and h and lowering chroma until it fits. */
export function oklch(L: number, C: number, h: number): RGB {
  let lin = oklchToLinear(L, C, h);
  if (!inGamut(lin)) {
    let lo = 0;
    let hi = C;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear(L, mid, h))) lo = mid;
      else hi = mid;
    }
    lin = oklchToLinear(L, lo, h);
  }
  return [encode(lin[0]), encode(lin[1]), encode(lin[2])];
}

const hex = (c: RGB) => `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
const normHue = (h: number) => ((Math.round(h) % 360) + 360) % 360;

export function accentColor(hue: number): RGB {
  return oklch(ACCENT.L, ACCENT.C, hue);
}

/** Four-stop creature palette for a hue, per theme. */
export function accentPalette(hue: number, dark: boolean): Palette {
  const stops = dark ? PALETTE_DARK : PALETTE_LIGHT;
  return stops.map((s) => oklch(s.L, s.C, hue)) as unknown as Palette;
}

/** CSS custom properties for a hue. Overrides the kit's lime tokens too, so
    everything that references --lime-400/500 (links, focus ring, selection,
    switches) follows the accent. */
export function accentCssVars(hue: number): Record<string, string> {
  const a = accentColor(hue);
  const hv = oklch(ACCENT_HOVER.L, ACCENT_HOVER.C, hue);
  return {
    '--accent': hex(a),
    '--accent-hover': hex(hv),
    '--accent-rgb': a.join(' '),
    '--lime-400': hex(a),
    '--lime-500': hex(hv),
    '--accent-hue': String(normHue(hue)),
  };
}

/** Current hue, as stamped on <html> by the head script or applyAccent. */
export function readAccentHue(): number {
  const v = Number(document.documentElement.getAttribute('data-accent-hue'));
  return Number.isFinite(v) && document.documentElement.hasAttribute('data-accent-hue')
    ? v
    : DEFAULT_ACCENT_HUE;
}

/** Sets the accent everywhere, persists it, and tells listeners (canvas). */
export function applyAccent(hue: number, persist = true) {
  const h = normHue(hue);
  const root = document.documentElement;
  const vars = accentCssVars(h);
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
  root.setAttribute('data-accent-hue', String(h));
  if (persist) {
    try {
      localStorage.setItem(HUE_KEY, String(h));
      localStorage.setItem(
        ACCENT_CSS_KEY,
        Object.entries(vars)
          .map(([k, v]) => `${k}:${v}`)
          .join(';'),
      );
    } catch {
      /* storage disabled — the choice lasts this page view */
    }
  }
  window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: h }));
}

/** Plain-language name for screen readers (aria-valuetext). */
export function hueName(hue: number): string {
  const h = normHue(hue);
  const names: Array<[number, string]> = [
    [15, 'red'], [45, 'coral'], [75, 'amber'], [105, 'yellow'], [140, 'lime'],
    [170, 'green'], [200, 'teal'], [230, 'cyan'], [265, 'blue'], [295, 'indigo'],
    [325, 'violet'], [350, 'pink'], [360, 'red'],
  ];
  return names.find(([max]) => h < max)?.[1] ?? 'red';
}
