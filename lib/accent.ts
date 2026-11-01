import type { Palette, RGB } from '@/lib/tile-art';

/**
 * Accent — one hue drives every strong colour on the site: the CTA, links,
 * focus ring, selected and hover states, the signature dots, and the tile
 * creatures. Everything is generated from the hue in OKLCH, so each hue gets
 * the same perceived lightness and contrast holds whatever the visitor picks.
 *
 * The accent token sits at a fixed OKLCH lightness and chroma *per theme*:
 * one value can't be dark enough for link text on white and light enough for
 * link text on charcoal at the same time.
 *
 *   light  L 0.52  C 0.16  — white CTA label; links on #fff
 *   dark   L 0.74  C 0.16  — ink CTA label;   links on #181815
 *
 * Checked at every 15° of hue: worst case 5.13:1 (light) and 7.15:1 (dark)
 * for CTA labels and links — all above 4.5:1. Out-of-gamut colours keep L and
 * hue and lose chroma, so contrast is unaffected.
 *
 * Framework-free. The hue lives in localStorage; layout.tsx's head script
 * re-applies the stored CSS before first paint (no flash).
 */

export const DEFAULT_ACCENT_HUE = 126; // the brand lime's hue
export const ACCENT_EVENT = 'accentchange';
const HUE_KEY = 'accent-hue';
const CSS_KEY = 'accent-css';

export const ACCENT_LIGHT = { L: 0.52, C: 0.16, hoverL: 0.46 };
export const ACCENT_DARK = { L: 0.74, C: 0.16, hoverL: 0.8 };

// Creature shading ramps: fixed lightness steps, chroma tapering toward the
// darkest and palest stops. Tuned per theme; the dark theme lifts the back and
// flank so silhouettes read on charcoal. Stop 1 sits near the accent.
const RAMP_LIGHT = [
  { L: 0.3, C: 0.06 },
  { L: 0.5, C: 0.13 },
  { L: 0.7, C: 0.11 },
  { L: 0.95, C: 0.03 },
];
const RAMP_DARK = [
  { L: 0.42, C: 0.08 },
  { L: 0.6, C: 0.13 },
  { L: 0.76, C: 0.11 },
  { L: 0.95, C: 0.03 },
];

// ── OKLCH → sRGB, gamut-mapped by chroma ────────────────────

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

/** OKLCH → sRGB, keeping L and hue and lowering chroma until it fits. */
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
export const normHue = (h: number) => ((Math.round(h) % 360) + 360) % 360;

// ── public API ──────────────────────────────────────────────

/** The accent for a hue, per theme. */
export function accentColor(hue: number, dark: boolean): RGB {
  const a = dark ? ACCENT_DARK : ACCENT_LIGHT;
  return oklch(a.L, a.C, hue);
}

/** Four-stop creature palette for a hue, per theme. */
export function accentPalette(hue: number, dark: boolean): Palette {
  return (dark ? RAMP_DARK : RAMP_LIGHT).map((s) => oklch(s.L, s.C, hue)) as unknown as Palette;
}

/**
 * CSS custom properties for a hue. Both themes' values are set at once
 * (`-l` / `-d`); globals.css picks the pair for the active theme into
 * --accent, --accent-hover and --accent-rgb, and points the kit's
 * --lime-400/500 at them so links, focus ring and switches follow.
 */
export function accentCssVars(hue: number): Record<string, string> {
  const h = normHue(hue);
  const l = oklch(ACCENT_LIGHT.L, ACCENT_LIGHT.C, h);
  const d = oklch(ACCENT_DARK.L, ACCENT_DARK.C, h);
  return {
    '--accent-l': hex(l),
    '--accent-hover-l': hex(oklch(ACCENT_LIGHT.hoverL, ACCENT_LIGHT.C, h)),
    '--accent-rgb-l': l.join(' '),
    '--accent-d': hex(d),
    '--accent-hover-d': hex(oklch(ACCENT_DARK.hoverL, ACCENT_DARK.C, h)),
    '--accent-rgb-d': d.join(' '),
  };
}

/** Current hue, as stamped on <html> by the head script / applyAccent. */
export function readAccent(): number {
  const v = Number(document.documentElement.getAttribute('data-accent-hue'));
  return document.documentElement.hasAttribute('data-accent-hue') && Number.isFinite(v)
    ? v
    : DEFAULT_ACCENT_HUE;
}

/** Applies a hue everywhere, persists it, and tells listeners (canvas). */
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
        CSS_KEY,
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
