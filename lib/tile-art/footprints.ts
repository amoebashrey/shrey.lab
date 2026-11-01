import {
  BODY_REACH,
  evictCreatures,
  mergeObstacles,
  newSteer,
  stepCreatures,
  type Obstacle,
  type Steer,
} from './motion';
import type { TileScene } from './renderer';
import type { Creature } from './types';

/**
 * Footprints — two theropods wandering the hero, leaving three-toed prints
 * that press in as each foot lands and fade out behind.
 *
 * Each walker drifts toward a heading that changes every few seconds, so
 * trails cross the whole hero (the middle included), not just fixed lanes.
 * Steering comes from lib/tile-art/motion.ts: it looks ahead, swerves calmly
 * around obstacles (the copy, the nav, the colour pill) and never walks
 * through them. Its "body" is sized to cover the prints it lays, so a print
 * can't land on the copy either. When a walker leaves the hero, a new walk
 * starts from a random edge, heading roughly opposite the other walker.
 *
 * Framework-free; drawn by the tile renderer (tiles or flat).
 */

const FRAME_MS = 1000 / 60;
const TRAIL = 10; // prints visible per walker
const PRESS_MS = 220; // landing: scale 1.05 → 1 and fade in
const SHADE = 107; // grey the prints are drawn in → mid-ramp colour
const GOAL_MS: [number, number] = [2200, 4200]; // how often the wander heading changes
const WANDER = 0.75; // max swing of the wander heading from the walk's base heading, rad

export interface WalkerSpec {
  /** Print length, px (heel to middle claw). */
  foot: number;
  /** ms between footfalls. */
  every: number;
  /** px travelled per footfall (≈1.5 foot lengths, so prints stay apart). */
  step: number;
}

/** Big walker: 52px prints. Small one: 34px. Both ~100px/s. */
export const DEFAULT_WALKERS: readonly WalkerSpec[] = [
  { foot: 52, every: 800, step: 78 },
  { foot: 34, every: 520, step: 51 },
];

interface Walker {
  spec: WalkerSpec;
  body: Creature; // steered like a creature; nose = where the toes land
  steer: Steer;
  clock: number; // ms until the next footfall
  foot: 0 | 1; // which foot lands next
  base: number; // this walk's overall heading
  goal: number; // heading it's drifting toward now
  goalIn: number; // ms until the goal changes
}

interface Print {
  x: number;
  y: number;
  rot: number;
  F: number;
  born: number;
  life: number;
}

// A tapered capsule from A (radius ra) to B (radius rb), as one subpath.
function capsule(k: CanvasRenderingContext2D, ax: number, ay: number, bx: number, by: number, ra: number, rb: number) {
  const a = Math.atan2(by - ay, bx - ax);
  k.moveTo(bx + Math.cos(a - Math.PI / 2) * rb, by + Math.sin(a - Math.PI / 2) * rb);
  k.arc(bx, by, rb, a - Math.PI / 2, a + Math.PI / 2);
  k.arc(ax, ay, ra, a + Math.PI / 2, a + Math.PI * 1.5);
  k.closePath();
}

/**
 * Three-toed theropod print: heel at the origin, toes along +x, length F.
 * A rounded heel pad, three long tapered toes in a fan (middle longest, outer
 * ones splayed 30°), and a small claw point at each tip. One path whose
 * subpaths all wind the same way, so overlaps fill once.
 */
export function footPath(k: CanvasRenderingContext2D, F: number) {
  k.beginPath();
  // heel pad
  k.moveTo(0.36 * F, 0);
  k.ellipse(0.19 * F, 0, 0.17 * F, 0.145 * F, 0, 0, Math.PI * 2);
  // [angle, length from the toe base, lateral start offset] in F
  const toes: Array<[number, number, number]> = [
    [0, 0.52, 0],
    [-0.5, 0.44, -0.05],
    [0.5, 0.44, 0.05],
  ];
  for (const [a, len, off] of toes) {
    const ax = 0.3 * F;
    const ay = off * F;
    const tx = ax + Math.cos(a) * len * F;
    const ty = ay + Math.sin(a) * len * F;
    const r0 = 0.1 * F;
    const r1 = 0.045 * F;
    capsule(k, ax, ay, tx, ty, r0, r1);
    // claw: a narrow point past the toe tip
    const cx = tx + Math.cos(a) * 0.1 * F;
    const cy = ty + Math.sin(a) * 0.1 * F;
    const nx = -Math.sin(a) * r1;
    const ny = Math.cos(a) * r1;
    k.moveTo(tx + nx, ty + ny);
    k.lineTo(cx, cy);
    k.lineTo(tx - nx, ty - ny);
    k.closePath();
  }
}

export interface FootprintScene extends TileScene {
  /** Settles both trails without animating (reduced motion's still frame). */
  settle(): void;
  /** Walker and obstacle state, for tests. */
  inspect(): { walkers: Array<Creature & { dir: number; pushed: number }>; obstacles: Obstacle[]; t: number };
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export function createFootprintScene(specs: readonly WalkerSpec[] = DEFAULT_WALKERS, scale = 1): FootprintScene {
  let W = 0;
  let H = 0;
  let t = 0; // scene clock, ms — frozen while paused
  let obstacles: Obstacle[] = [];
  const prints: Print[] = [];

  const walkers: Walker[] = specs.map((spec, i) => {
    const F = spec.foot * scale;
    return {
      spec,
      body: {
        x: 0,
        y: 0,
        a: i ? Math.PI : 0,
        // Long enough that its steered "body" covers the prints it lays.
        L: F * 2.2,
        v: (spec.step * scale) / (spec.every / FRAME_MS),
        p: i * 1.7,
      },
      steer: newSteer(),
      clock: 0,
      foot: 0,
      base: i ? Math.PI : 0,
      goal: i ? Math.PI : 0,
      goalIn: rand(...GOAL_MS),
    };
  });
  const F = (w: Walker) => w.spec.foot * scale;
  const maxReach = () => BODY_REACH * Math.max(...walkers.map((w) => w.body.L));

  const blocked = (x: number, y: number, grow: number) =>
    obstacles.some(
      (o) =>
        x > o.rect.x - o.pad - grow &&
        x < o.rect.x + o.rect.w + o.pad + grow &&
        y > o.rect.y - o.pad - grow &&
        y < o.rect.y + o.rect.h + o.pad + grow,
    );

  // A random point in the hero, clear of every obstacle.
  function openPoint(w: Walker): [number, number] {
    const grow = w.body.L * 0.6;
    for (let i = 0; i < 24; i++) {
      const x = rand(0.1, 0.9) * W;
      const y = rand(0.12, 0.88) * H;
      if (!blocked(x, y, grow)) return [x, y];
    }
    return [rand(0.1, 0.9) * W, Math.random() < 0.5 ? 0.12 * H : 0.88 * H];
  }

  // Heading for a new walk: roughly opposite the other walker's, else random.
  function baseFor(w: Walker) {
    const other = walkers.find((o) => o !== w);
    return other ? wrap(other.body.a + Math.PI + rand(-0.6, 0.6)) : rand(-Math.PI, Math.PI);
  }

  function aim(w: Walker, base: number) {
    w.base = base;
    w.goal = base;
    w.goalIn = rand(...GOAL_MS);
    w.body.a = base;
    w.steer = newSteer();
  }

  // On screen at a clear point (first frame / prewarm).
  function placeOnScreen(w: Walker) {
    const [x, y] = openPoint(w);
    w.body.x = x;
    w.body.y = y;
    aim(w, baseFor(w));
    evictCreatures([w.body], obstacles);
  }

  // A new walk: pick a clear point to pass through and a heading, then start
  // just outside the edge that heading enters from.
  function respawn(w: Walker) {
    const base = baseFor(w);
    const [tx, ty] = openPoint(w);
    const dx = Math.cos(base);
    const dy = Math.sin(base);
    const m = w.body.L * 0.4; // start just past the edge
    // Distance back along the heading to leave the (grown) hero rectangle.
    const back = Math.min(
      dx > 1e-6 ? (tx + m) / dx : dx < -1e-6 ? (W + m - tx) / -dx : Infinity,
      dy > 1e-6 ? (ty + m) / dy : dy < -1e-6 ? (H + m - ty) / -dy : Infinity,
    );
    w.body.x = tx - dx * back;
    w.body.y = ty - dy * back;
    aim(w, base);
  }

  function footfall(w: Walker) {
    const b = w.body;
    const f = F(w);
    const side = w.foot === 0 ? 1 : -1;
    // Heel sits one foot-length behind the walker's nose, offset to its side;
    // each foot turns out slightly from the line of travel.
    const hx = Math.cos(b.a);
    const hy = Math.sin(b.a);
    const off = 0.32 * f * side;
    prints.push({
      x: b.x - hx * f * 1.05 - hy * off,
      y: b.y - hy * f * 1.05 + hx * off,
      rot: b.a + side * 0.12,
      F: f,
      born: t,
      life: TRAIL * w.spec.every,
    });
    w.foot = w.foot === 0 ? 1 : 0;
  }

  function step(dt: number) {
    t += dt;
    for (const w of walkers) {
      w.goalIn -= dt;
      if (w.goalIn <= 0) {
        w.goal = wrap(w.base + rand(-WANDER, WANDER));
        w.goalIn = rand(...GOAL_MS);
      }
    }
    stepCreatures(
      walkers.map((w) => w.body),
      walkers.map((w) => w.steer),
      dt / FRAME_MS,
      t,
      W,
      H,
      obstacles,
      walkers.map((w) => w.goal),
    );
    for (const w of walkers) {
      w.clock -= dt;
      while (w.clock <= 0) {
        footfall(w);
        w.clock += w.spec.every;
      }
      const b = w.body;
      const out = b.x < -b.L || b.x > W + b.L || b.y < -b.L || b.y > H + b.L;
      if (out) respawn(w);
    }
    // Drop prints that have fully faded.
    for (let i = prints.length - 1; i >= 0; i--) {
      if (t - prints[i].born > prints[i].life) prints.splice(i, 1);
    }
  }

  function draw(k: CanvasRenderingContext2D) {
    k.fillStyle = `rgb(${SHADE},${SHADE},${SHADE})`;
    for (const p of prints) {
      const age = t - p.born;
      if (age < 0) continue;
      const press = Math.min(1, age / PRESS_MS);
      const fadeOut = Math.max(0, 1 - Math.max(0, age - p.life * 0.45) / (p.life * 0.55));
      const alpha = press * fadeOut;
      if (alpha < 0.02) continue;
      const s = 1.05 - 0.05 * press;
      k.save();
      k.translate(p.x, p.y);
      k.rotate(p.rot);
      k.scale(s, s);
      k.globalAlpha = alpha;
      footPath(k, p.F);
      k.fill();
      k.restore();
    }
    k.globalAlpha = 1;
  }

  let placed = false; // initial placement waits for the first obstacles
  return {
    resize(w, h) {
      const first = !W;
      W = w;
      H = h;
      if (first) walkers.forEach(placeOnScreen);
    },
    step,
    draw,
    setObstacles(list) {
      // Touching clearance zones become one block, so there are no pockets.
      obstacles = mergeObstacles(list, maxReach());
      if (!placed && W) {
        walkers.forEach(placeOnScreen);
        placed = true;
      }
      evictCreatures(
        walkers.map((w) => w.body),
        obstacles,
      );
    },
    inspect() {
      return {
        walkers: walkers.map((w) => ({ ...w.body, dir: w.steer.dir, pushed: w.steer.pushed })),
        obstacles,
        t,
      };
    },
    settle() {
      // ~one trail's worth of walking, then hold: every print fully pressed.
      const ms = TRAIL * Math.max(...walkers.map((w) => w.spec.every));
      for (let i = 0; i < ms / FRAME_MS; i++) step(FRAME_MS);
    },
  };
}
