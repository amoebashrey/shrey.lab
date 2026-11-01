/**
 * Something steered across the tile field (lib/tile-art/motion.ts) — today,
 * a footprint walker. x, y: its leading point (CSS px); a: heading (radians);
 * L: the length of its body, which obstacle checks keep clear (px);
 * v: speed (px per 60fps frame); p: phase offset for its gentle wander.
 *
 * Add another scene (turtles, pterodactyls…) by implementing TileScene
 * (lib/tile-art/renderer.ts) and steering its movers with the same motion.
 */
export interface Creature {
  x: number;
  y: number;
  a: number;
  L: number;
  v: number;
  p: number;
}
