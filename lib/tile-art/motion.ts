import type { Creature } from './types';

/**
 * Motion for tile creatures — pure, no DOM, so it can be tested headless.
 *
 * Each frame a creature drifts along its heading, its heading wanders a
 * little, and it wraps at the edges. Obstacles (the hero copy, the nav, the
 * colour pill) each carry their own clearance. Creatures steer around them:
 * when the path ahead would take any part of the body into one, the creature
 * commits to turning away and its turn
 * rate eases toward a capped maximum — a calm swerve, never a snap. The turn
 * direction is sticky until the path has been clear for a while, so it can't
 * flip-flop (jitter) at the obstacle's edge.
 */

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** An area to keep clear, and how many px of clearance bodies keep from it. */
export interface Obstacle {
  rect: Rect;
  pad: number;
}

/** Per-creature steering state, parallel to the creature list. */
export interface Steer {
  turn: number; // current angular velocity, rad per 60fps frame
  dir: -1 | 0 | 1; // committed turn direction while avoiding
  clear: number; // frames the path has been clear
  pushed: number; // px the safety wall moved it last frame (for tests)
}

export const newSteer = (): Steer => ({ turn: 0, dir: 0, clear: 0, pushed: 0 });

/**
 * Tuning. The body is drawn straight back from the nose along the current
 * heading, so a tight turn would swing the tail sideways like a boom. Turns
 * are therefore sized to the creature: the turning radius is a multiple of
 * its length, so the tail roughly follows the nose's path.
 */
export const STEER = {
  radius: 0.9, // turning radius, in body lengths
  maxTurn: 0.014, // rad/frame cap for small, fast creatures
  accel: 0.0005, // rad/frame² — how quickly a turn builds (no snaps)
  look: 2.2, // look-ahead, in turning diameters
  release: 40, // frames of clear path before the committed side resets
  guard: 0.5, // hard wall at this fraction of the pad (steering acts at 1.0)
  maxPush: 2, // px per frame the wall may nudge a body outward
  level: 0.006, // rad/frame pull back toward a horizontal heading after a swerve
};

/**
 * The wall: if any point of the body is inside the rect grown by `inset`
 * (+ fin reach), slide the creature out along the shallowest axis, by at most
 * `cap` px. Returns how far it moved (0 almost always — steering usually
 * keeps creatures well clear).
 */
function guard(s: Creature, r: Rect, inset: number, cap: number, others: readonly Obstacle[]) {
  const hx = Math.cos(s.a);
  const hy = Math.sin(s.a);
  const grow = inset + s.L * BODY_REACH;
  const L = r.x - grow, R = r.x + r.w + grow, T = r.y - grow, B = r.y + r.h + grow;
  // Would leaving this way land the point inside another obstacle's wall?
  const blockedBy = (px: number, py: number) =>
    others.some((o) => o.rect !== r && inside(px, py, o.rect, o.pad * STEER.guard + s.L * BODY_REACH));
  let best = 0, bx = 0, by = 0;
  for (let t = 0; t <= 1.17; t += 0.13) {
    const px = s.x - hx * s.L * t;
    const py = s.y - hy * s.L * t;
    if (px <= L || px >= R || py <= T || py >= B) continue;
    // Shallowest way out for this point that doesn't lead into another wall
    // (two walls pushing a body back and forth would trap it).
    const opts: Array<[number, number, number]> = [
      [px - L, -1, 0], [R - px, 1, 0], [py - T, 0, -1], [B - py, 0, 1],
    ];
    opts.sort((a, b) => a[0] - b[0]);
    const free = opts.find(([d, dx, dy]) => !blockedBy(px + dx * (d + 1), py + dy * (d + 1))) ?? opts[0];
    const [d, dx, dy] = free;
    if (d > best) { best = d; bx = dx; by = dy; }
  }
  if (!best) return 0;
  const move = Math.min(best + 0.5, cap);
  s.x += bx * move;
  s.y += by * move;
  return move;
}

const maxTurnFor = (s: Creature) => Math.min(STEER.maxTurn, s.v / (STEER.radius * s.L));

/** How far each creature's body reaches from its centreline, as a fraction
    of its length (dorsal fin tip ≈ 0.215L, pectoral fin ≈ 0.24L). */
export const BODY_REACH = 0.25;

const inside = (px: number, py: number, r: Rect, grow: number) =>
  px > r.x - grow && px < r.x + r.w + grow && py > r.y - grow && py < r.y + r.h + grow;

/**
 * True if the creature's body — the segment from nose to tail, thickened by
 * its fins — overlaps the rect grown by `pad`.
 */
export function bodyHits(s: Creature, r: Rect, pad: number) {
  const hx = Math.cos(s.a);
  const hy = Math.sin(s.a);
  const grow = pad + s.L * BODY_REACH;
  // Nose, along the body, and the tail lobes (which reach ~0.17L past the tail).
  for (let t = 0; t <= 1.17; t += 0.13) {
    if (inside(s.x - hx * s.L * t, s.y - hy * s.L * t, r, grow)) return true;
  }
  return false;
}

/** Would the path ahead (plus the body) run into the rect? */
function pathHits(s: Creature, r: Rect, pad: number) {
  const hx = Math.cos(s.a);
  const hy = Math.sin(s.a);
  const grow = pad + s.L * BODY_REACH;
  // Far enough ahead to complete a half-turn before arriving.
  const look = STEER.look * 2 * STEER.radius * s.L + 40;
  for (let t = 0; t <= 1; t += 0.125) {
    if (inside(s.x + hx * look * t, s.y + hy * look * t, r, grow)) return true;
  }
  return bodyHits(s, r, pad);
}

/** Pick the side to turn to: away from the obstacle's centre; head-on, toward
    the larger gap. -1 = counter-clockwise on screen (y points down). */
function chooseSide(s: Creature, r: Rect, H: number): -1 | 1 {
  const hx = Math.cos(s.a);
  const hy = Math.sin(s.a);
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  // > 0 when the centre lies clockwise (to the right) of the heading.
  const cross = hx * (cy - s.y) - hy * (cx - s.x);
  const dist = Math.hypot(cx - s.x, cy - s.y) || 1;
  if (Math.abs(cross) / dist > 0.15) return cross > 0 ? -1 : 1;
  const roomAbove = r.y;
  const roomBelow = H - (r.y + r.h);
  const wantUp = roomAbove >= roomBelow;
  // Turning counter-clockwise (−1) points an eastbound creature up.
  if (hx >= 0) return wantUp ? -1 : 1;
  return wantUp ? 1 : -1;
}

/**
 * Advances every creature by `k` 60fps-frames (k = dt / 16.67ms).
 * `t` is the sim clock (ms) after this step.
 */
export function stepCreatures(
  creatures: Creature[],
  steer: Steer[],
  k: number,
  t: number,
  W: number,
  H: number,
  obstacles: readonly Obstacle[],
) {
  for (let i = 0; i < creatures.length; i++) {
    const s = creatures[i];
    const st = steer[i] ?? (steer[i] = newSteer());

    let target = 0;
    const ahead = obstacles.find((o) => pathHits(s, o.rect, o.pad));
    if (ahead) {
      if (st.dir === 0) st.dir = chooseSide(s, ahead.rect, H);
      st.clear = 0;
      target = st.dir * maxTurnFor(s);
    } else if (st.dir !== 0 && (st.clear += k) > STEER.release) {
      st.dir = 0;
    }
    // Ease the turn rate toward its target — no instant changes.
    const dv = target - st.turn;
    st.turn += Math.max(-STEER.accel * k, Math.min(STEER.accel * k, dv));

    s.a += st.turn * k;
    // Ambient wander, only while not avoiding (it would fight the swerve), and
    // a gentle pull back toward level so swerves don't leave creatures heading
    // straight up or down — they cruise across the hero, as in the prototype.
    if (st.dir === 0) {
      const above = s.y < -s.L * 0.1;
      const below = s.y > H + s.L * 0.1;
      if (above || below) {
        // Off the top or bottom: angle back in at a shallow dive, keeping
        // the same left/right direction — never cruise along out of sight.
        const back = Math.atan2(above ? 0.45 : -0.45, Math.cos(s.a) >= 0 ? 1 : -1);
        const diff = Math.atan2(Math.sin(back - s.a), Math.cos(back - s.a));
        s.a += Math.max(-STEER.level * k, Math.min(STEER.level * k, diff));
      } else {
        s.a += Math.sin(t * 0.00035 + s.p) * 0.0012 * k;
        s.a -= STEER.level * Math.sin(2 * s.a) * k;
      }
    }

    s.x += Math.cos(s.a) * s.v * k;
    s.y += Math.sin(s.a) * s.v * k;

    // Safety net under the swerve: never let the body reach an obstacle.
    st.pushed = 0;
    for (const o of obstacles) {
      st.pushed += guard(s, o.rect, o.pad * STEER.guard, STEER.maxPush * k, obstacles);
    }

    const m = s.L * 1.4;
    if (s.x > W + m) s.x = -m;
    if (s.x < -m) s.x = W + m;
    if (s.y > H + m) s.y = -m;
    if (s.y < -m) s.y = H + m;
  }
}

/**
 * Merges obstacles whose clearance zones touch (pad + `reach`, the largest
 * creature's fin reach) into one bounding block. Otherwise the gap between,
 * say, the nav, the colour pill and the copy is a pocket a creature can swim
 * into and be walled in on three sides.
 */
export function mergeObstacles(list: readonly Obstacle[], reach: number): Obstacle[] {
  const out = list.map((o) => ({ rect: { ...o.rect }, pad: o.pad }));
  // Zones count as touching when the free corridor between them is narrower
  // than 1.5 bodies (a body is `reach` on both sides of its centreline): a
  // body could squeeze in, but would get wedged turning there.
  const zone = (o: Obstacle) => {
    const g = o.pad + reach * 1.5;
    return { x0: o.rect.x - g, y0: o.rect.y - g, x1: o.rect.x + o.rect.w + g, y1: o.rect.y + o.rect.h + g };
  };
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const a = zone(out[i]);
        const b = zone(out[j]);
        if (a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1) {
          const r1 = out[i].rect, r2 = out[j].rect;
          const x = Math.min(r1.x, r2.x), y = Math.min(r1.y, r2.y);
          const w = Math.max(r1.x + r1.w, r2.x + r2.w) - x;
          const h = Math.max(r1.y + r1.h, r2.y + r2.h) - y;
          out[i] = { rect: { x, y, w, h }, pad: Math.max(out[i].pad, out[j].pad) };
          out.splice(j, 1);
          merged = true;
          break outer;
        }
      }
    }
  }
  return out;
}

/**
 * Moves any creature whose body overlaps a (padded) obstacle to the nearest
 * clear spot straight above or below it. Used when obstacles first appear or
 * move (mount, resize, scroll), never per frame.
 */
export function evictCreatures(creatures: Creature[], obstacles: readonly Obstacle[]) {
  const blocked = (s: Creature) => obstacles.some((o) => bodyHits(s, o.rect, o.pad));
  for (const s of creatures) {
    if (!blocked(s)) continue;
    const y0 = s.y;
    // Search outward, alternating up and down, for the nearest clear y.
    for (let d = 4; d < 2000; d += 4) {
      s.y = y0 - d;
      if (!blocked(s)) break;
      s.y = y0 + d;
      if (!blocked(s)) break;
    }
  }
}
