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
 * Footprints — two theropods walking the hero in opposite directions, leaving
 * three-toed prints that press in as each foot lands and fade out behind.
 *
 * Each walker is steered by lib/tile-art/motion.ts (the obstacle logic first built for
 * the hero's earlier tile sharks):
 * it looks ahead, swerves calmly around obstacles (the copy, the nav, the
 * colour pill) and never walks through them. Its "body" is sized to cover the
 * prints it lays, so a print can't land on the copy either. When a walker
 * leaves the hero, a new trail starts from its edge at a different height.
 *
 * Framework-free; drawn by the tile renderer.
 */

const FRAME_MS = 1000 / 60;
const TRAIL = 10; // prints visible per walker
const PRESS_MS = 220; // landing: scale 1.05 → 1 and fade in
const SHADE = 107; // grey the prints are drawn in → mid-ramp tile colour

export interface WalkerSpec {
  /** Print length, px. */
  foot: number;
  /** ms between footfalls. Bigger walker: slower, longer stride. */
  every: number;
  /** px travelled per footfall. */
  step: number;
  /** +1 walks left → right, -1 right → left. */
  dir: 1 | -1;
  /** Starting height as a fraction of the hero. */
  lane: number;
}

export const DEFAULT_WALKERS: readonly WalkerSpec[] = [
  { foot: 58, every: 1100, step: 72, dir: 1, lane: 0.2 },
  { foot: 38, every: 720, step: 48, dir: -1, lane: 0.8 },
];

interface Walker {
  spec: WalkerSpec;
  body: Creature; // steered like a creature; nose = where the toes land
  steer: Steer;
  clock: number; // ms until the next footfall
  foot: 0 | 1; // which foot lands next
  lastLane: number;
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
 * One path whose subpaths all wind the same way, so overlaps fill once.
 */
export function footPath(k: CanvasRenderingContext2D, F: number) {
  k.beginPath();
  // heel / metatarsal pad the toes grow out of
  k.moveTo(0.42 * F, 0);
  k.ellipse(0.18 * F, 0, 0.24 * F, 0.15 * F, 0, 0, Math.PI * 2);
  // toes: middle longest; outer ones splayed ~26° and a little shorter
  const bx = 0.3 * F;
  const toes: Array<[number, number, number, number]> = [
    [0, 0.98, 0.1, 0.06],
    [-0.46, 0.8, 0.09, 0.05],
    [0.46, 0.8, 0.09, 0.05],
  ]; // [angle, reach, base radius, tip radius] in F
  for (const [a, reach, r0, r1] of toes) {
    const tx = bx + Math.cos(a) * (reach - 0.3) * F * 1.05;
    const ty = Math.sin(a) * (reach - 0.3) * F * 1.05;
    capsule(k, bx, 0, tx, ty, r0 * F, r1 * F);
    // claw: a short, blunt point past the toe pad
    const cx = tx + Math.cos(a) * 0.1 * F;
    const cy = ty + Math.sin(a) * 0.1 * F;
    const nx = -Math.sin(a) * r1 * F * 0.8;
    const ny = Math.cos(a) * r1 * F * 0.8;
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

export function createFootprintScene(specs: readonly WalkerSpec[] = DEFAULT_WALKERS, scale = 1): FootprintScene {
  let W = 0;
  let H = 0;
  let t = 0; // scene clock, ms — frozen while paused
  let obstacles: Obstacle[] = [];
  const prints: Print[] = [];

  const walkers: Walker[] = specs.map((spec) => {
    const F = spec.foot * scale;
    return {
      spec,
      body: {
        x: 0,
        y: 0,
        a: spec.dir > 0 ? 0 : Math.PI,
        // Long enough that its steered "body" covers the prints it lays.
        L: F * 2.2,
        v: (spec.step * scale) / (spec.every / FRAME_MS),
        p: spec.dir > 0 ? 0.4 : 2.1,
      },
      steer: newSteer(),
      clock: 0,
      foot: 0,
      lastLane: spec.lane,
    };
  });
  const F = (w: Walker) => w.spec.foot * scale;
  const maxReach = () => BODY_REACH * Math.max(...walkers.map((w) => w.body.L));

  function place(w: Walker, lane: number, onScreen: boolean) {
    const b = w.body;
    b.y = lane * H;
    b.x = onScreen ? (w.spec.dir > 0 ? 0.12 * W : 0.88 * W) : w.spec.dir > 0 ? -b.L * 0.6 : W + b.L * 0.6;
    b.a = (w.spec.dir > 0 ? 0 : Math.PI) + (Math.random() - 0.5) * 0.3;
    w.steer = newSteer();
    w.lastLane = lane;
    evictCreatures([b], obstacles);
  }

  // Heights (fractions of H) where a walker can cross the whole hero without
  // meeting an obstacle: outside every obstacle's vertical band (+ clearance).
  function openLanes(w: Walker): Array<[number, number]> {
    const reach = BODY_REACH * w.body.L;
    const bands = obstacles
      .map((o) => [(o.rect.y - o.pad - reach) / H, (o.rect.y + o.rect.h + o.pad + reach) / H])
      .sort((p, q) => p[0] - q[0]);
    const free: Array<[number, number]> = [];
    let from = 0.06;
    for (const [a, b] of bands) {
      if (a > from) free.push([from, Math.min(a, 0.94)]);
      from = Math.max(from, b);
    }
    if (from < 0.94) free.push([from, 0.94]);
    return free.filter(([a, b]) => b - a > 0.01);
  }

  // A new trail from the walker's edge, at a clearly different height, in an
  // open lane when there is one (so it walks across rather than detouring).
  function respawn(w: Walker) {
    const lanes = openLanes(w);
    const pick = () => {
      if (!lanes.length) return 0.1 + Math.random() * 0.8;
      const total = lanes.reduce((n, [a, b]) => n + (b - a), 0);
      let r = Math.random() * total;
      for (const [a, b] of lanes) {
        if (r <= b - a) return a + r;
        r -= b - a;
      }
      return lanes[0][0];
    };
    let lane = pick();
    for (let i = 0; i < 8 && Math.abs(lane - w.lastLane) < 0.12; i++) lane = pick();
    place(w, lane, false);
  }

  function footfall(w: Walker) {
    const b = w.body;
    const f = F(w);
    const side = w.foot === 0 ? 1 : -1;
    // Heel sits one foot-length behind the walker's nose, offset to its side;
    // each foot turns out slightly from the line of travel.
    const hx = Math.cos(b.a);
    const hy = Math.sin(b.a);
    const off = 0.3 * f * side;
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
    stepCreatures(
      walkers.map((w) => w.body),
      walkers.map((w) => w.steer),
      dt / FRAME_MS,
      t,
      W,
      H,
      obstacles,
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

  // First placement: each walker starts on screen in an open lane — the
  // first (bigger) walker in the highest one, the second in the lowest — so
  // the opening frames already show both trails crossing the hero.
  function placeInitial() {
    walkers.forEach((wk, i) => {
      const lanes = openLanes(wk);
      if (!lanes.length) return place(wk, wk.spec.lane, true);
      const [a, b] = i === 0 ? lanes[0] : lanes[lanes.length - 1];
      place(wk, (a + b) / 2, true);
    });
  }

  let placed = false; // initial placement waits for the first obstacles
  return {
    resize(w, h) {
      const first = !W;
      W = w;
      H = h;
      if (first) walkers.forEach((wk) => place(wk, wk.spec.lane, true));
    },
    step,
    draw,
    setObstacles(list) {
      // Touching clearance zones become one block, so there are no pockets.
      obstacles = mergeObstacles(list, maxReach());
      if (!placed && W) {
        placeInitial();
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
      for (let i = 0; i < (TRAIL * 1100) / FRAME_MS; i++) step(FRAME_MS);
    },
  };
}
