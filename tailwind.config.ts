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
      // Switzer (body, Fontshare CDN) + Fraunces (display, next/font) — see
      // app/layout.tsx and app/fonts. Mono is the system stack and is for
      // code only; no webfont is loaded for it.
      fontFamily: {
        sans: ['Switzer', 'Switzer Fallback', 'Arial', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
};

export default config;
