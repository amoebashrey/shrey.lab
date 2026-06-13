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
};

export default config;
