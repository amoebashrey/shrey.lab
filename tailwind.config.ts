import type { Config } from 'tailwindcss';

/**
 * shrey.lab — Tailwind config
 *
 * Consumes the brand kit preset at `./shrey-lab/tokens/tailwind.preset.js`.
 * All design tokens (colors, fonts, type scale, radii, shadows, motion) live there.
 * If you need a token, add it to the preset, not here.
 *
 * If `./shrey-lab/` doesn't exist yet locally, this will fail at build time.
 * That's correct — the kit is required.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shreyLab = require('./shrey-lab/tokens/tailwind.preset.js');

const config: Config = {
  presets: [shreyLab],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './shrey-lab/components/**/*.{ts,tsx}',
  ],
  // Match tokens.css: dark values key off the [data-theme="dark"] attribute.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // The brand kit ships these tracking values as CSS vars (tokens.css) but
      // not as Tailwind tokens, so `tracking-mono` / `tracking-tightest` used
      // across the app were silently no-ops. Define them on the scale here.
      letterSpacing: {
        mono: '-0.02em', // --tracking-mono
        tightest: '-0.02em', // brand heading tracking (--tracking-tight)
      },
      // Geist + Geist Mono come from next/font (app/layout.tsx) — self-hosted,
      // zero FOUT. The preset's 'Geist' family names would resolve to the
      // render-blocking Google Fonts copy, which we no longer load.
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
};

export default config;
