/**
 * Tile palettes — four colour stops mapped from shading: stop 0 is the darkest,
 * stop 3 the palest. The hero builds its palette from the site accent hue
 * (lib/accent.ts → accentPalette).
 */
export type RGB = readonly [number, number, number];
export type Palette = readonly [RGB, RGB, RGB, RGB];
