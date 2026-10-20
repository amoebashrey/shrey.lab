/**
 * Tile palettes — four colour stops mapped from shading: stop 0 is the darkest
 * (a creature's back), stop 3 the palest (its belly). Countershading.
 *
 * Swap DEFAULT_PALETTE (light theme) / DEFAULT_DARK_PALETTE (dark theme) to
 * recolour every creature at once.
 */
export type RGB = readonly [number, number, number];
export type Palette = readonly [RGB, RGB, RGB, RGB];

export const PALETTES = {
  // From the prototype — tuned for a white page.
  blue: [[18, 38, 72], [40, 86, 140], [96, 150, 200], [214, 230, 244]],
  slate: [[30, 34, 40], [78, 86, 98], [148, 156, 168], [226, 229, 233]],
  lime: [[34, 58, 18], [84, 128, 30], [160, 200, 70], [232, 244, 196]],
  // Dark-theme counterpart of `blue`: the darkest stop is lifted off the
  // #181815 page so backs still read as a silhouette; the belly stays pale.
  blueNight: [[44, 78, 128], [62, 112, 176], [112, 164, 216], [206, 226, 246]],
} as const satisfies Record<string, Palette>;

export const DEFAULT_PALETTE: Palette = PALETTES.blue;
export const DEFAULT_DARK_PALETTE: Palette = PALETTES.blueNight;
