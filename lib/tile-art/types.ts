/**
 * A creature swimming/flying across the tile field.
 * x, y: head position (CSS px); a: heading (radians); L: body length (px);
 * v: speed (px per 60fps frame); p: phase offset.
 */
export interface Creature {
  x: number;
  y: number;
  a: number;
  L: number;
  v: number;
  p: number;
}

/**
 * Draws one creature into the one-pixel-per-tile offscreen canvas, in
 * greyscale: red channel = shading (0 darkest, 1 palest), alpha = coverage.
 * The context is already scaled so the shape can draw in CSS px.
 * `t` is the renderer's sim clock in ms (it stops while paused).
 *
 * Add a new creature (turtle, pterodactyl…) by writing another ShapeFn.
 */
export type ShapeFn = (ctx: CanvasRenderingContext2D, creature: Creature, t: number) => void;
