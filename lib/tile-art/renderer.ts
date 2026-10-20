import type { Palette, RGB } from './palettes';
import type { Creature, ShapeFn } from './types';

/**
 * Tile renderer — framework-free. Draws creatures as smooth silhouettes into a
 * tiny offscreen canvas (one pixel per tile), then paints each covered pixel
 * as a small rounded square on the visible canvas, coloured from a four-stop
 * palette by its shading.
 *
 * No DOM reads inside the frame loop: the caller pushes sizes via resize().
 */

export interface TileRendererOptions {
  shape: ShapeFn;
  palette: Palette;
  background: RGB;
  tileSize: number;
  creatures: readonly Creature[];
}

export interface TileRenderer {
  /** CSS-px size of the canvas. Keeps creature positions. */
  resize(width: number, height: number): void;
  setTileSize(size: number): void;
  /** Replaces the creature list (positions included). */
  setCreatures(creatures: readonly Creature[]): void;
  /** Recolours palette + background; crossfades over `duration` ms (0 = snap). */
  setColors(palette: Palette, background: RGB, duration?: number): void;
  start(): void;
  stop(): void;
  renderOnce(): void;
  destroy(): void;
}

const FRAME_MS = 1000 / 60; // speeds are in px per 60fps frame
const MAX_DT = 50; // clamp long gaps (tab switch, jank) so nothing leaps
const LUT_SIZE = 256;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Four-stop palette → continuous colour for lightness l in [0, 1]. */
function col(pal: Palette, l: number): [number, number, number] {
  l = Math.max(0, Math.min(1, l));
  const s = l * 3;
  const i = Math.min(2, Math.floor(s));
  const t = s - i;
  const a = pal[i];
  const b = pal[i + 1];
  return [lerp(a[0], b[0], t) | 0, lerp(a[1], b[1], t) | 0, lerp(a[2], b[2], t) | 0];
}

/** Stable per-tile hash in [0, 1] — never Math.random() per frame. */
function hash(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function buildLut(pal: Palette): Float32Array {
  const lut = new Float32Array(LUT_SIZE * 3);
  for (let i = 0; i < LUT_SIZE; i++) {
    const c = col(pal, i / (LUT_SIZE - 1));
    lut[i * 3] = c[0];
    lut[i * 3 + 1] = c[1];
    lut[i * 3 + 2] = c[2];
  }
  return lut;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function createTileRenderer(
  canvas: HTMLCanvasElement,
  opts: TileRendererOptions,
): TileRenderer {
  const ctx = canvas.getContext('2d');
  const off = document.createElement('canvas');
  const o = off.getContext('2d', { willReadFrequently: true });
  if (!ctx || !o) throw new Error('2D canvas unavailable');

  const shape = opts.shape;
  let W = 0;
  let H = 0;
  let T = opts.tileSize;
  let cols = 0;
  let rows = 0;
  let creatures = opts.creatures.map((c) => ({ ...c }));

  // Colour state. `shown*` is what's on screen; during a crossfade it moves
  // from `from*` to `to*`. Fill strings are rebuilt only when colours change.
  let fromLut = buildLut(opts.palette);
  let toLut = fromLut;
  const shownLut = new Float32Array(fromLut);
  const fills: string[] = new Array(LUT_SIZE);
  let fromBg: RGB = opts.background;
  let toBg: RGB = opts.background;
  let bgFill = '';
  let fadeMs = 0;
  let fadeDur = 0;

  function refreshFills(k: number) {
    for (let i = 0; i < LUT_SIZE * 3; i++) shownLut[i] = lerp(fromLut[i], toLut[i], k);
    for (let i = 0; i < LUT_SIZE; i++) {
      fills[i] = `rgb(${shownLut[i * 3] | 0},${shownLut[i * 3 + 1] | 0},${shownLut[i * 3 + 2] | 0})`;
    }
    bgFill = `rgb(${lerp(fromBg[0], toBg[0], k) | 0},${lerp(fromBg[1], toBg[1], k) | 0},${lerp(fromBg[2], toBg[2], k) | 0})`;
  }
  refreshFills(1);

  let running = false;
  let raf = 0;
  let last = 0;
  let simT = 0; // drives tail phase + heading drift; frozen while paused

  function fitOffscreen() {
    const c = Math.max(1, Math.ceil(W / T));
    const r = Math.max(1, Math.ceil(H / T));
    if (c !== cols || r !== rows) {
      cols = c;
      rows = r;
      off.width = cols;
      off.height = rows;
    }
  }

  function step(dt: number) {
    const k = dt / FRAME_MS;
    simT += dt;
    for (const s of creatures) {
      s.x += Math.cos(s.a) * s.v * k;
      s.y += Math.sin(s.a) * s.v * k;
      s.a += Math.sin(simT * 0.00035 + s.p) * 0.0012 * k;
      const m = s.L * 1.4;
      if (s.x > W + m) s.x = -m;
      if (s.x < -m) s.x = W + m;
      if (s.y > H + m) s.y = -m;
      if (s.y < -m) s.y = H + m;
    }
  }

  function draw() {
    if (!W || !H) return;

    // Creatures at one pixel per tile.
    o!.setTransform(1, 0, 0, 1, 0, 0);
    o!.clearRect(0, 0, cols, rows);
    o!.setTransform(1 / T, 0, 0, 1 / T, 0, 0);
    for (const s of creatures) shape(o!, s, simT);
    const d = o!.getImageData(0, 0, cols, rows).data;

    // Page colour, then tiles.
    const c = ctx!;
    c.globalAlpha = 1;
    c.fillStyle = bgFill;
    c.fillRect(0, 0, W, H);

    const g = Math.max(1, T * 0.16);
    const r = T * 0.24;
    const sz = T - g;
    const hl = T >= 6;
    const rounded = typeof c.roundRect === 'function';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const al = d[i + 3] / 255;
        if (al < 0.12) continue;
        const l = d[i] / 255 / al + (hash(x, y) - 0.5) * 0.06;
        const li = Math.round(Math.max(0, Math.min(1, l)) * (LUT_SIZE - 1));
        const px = x * T + g / 2;
        const py = y * T + g / 2;
        c.globalAlpha = Math.pow(al, 1.4) * (0.72 + 0.2 * (1 - l));
        c.fillStyle = fills[li];
        c.beginPath();
        if (rounded) c.roundRect(px, py, sz, sz, r);
        else c.rect(px, py, sz, sz);
        c.fill();
        if (hl && al > 0.6) {
          c.globalAlpha = 0.18 + 0.12 * (1 - l);
          c.fillStyle = '#fff';
          c.fillRect(px + r * 0.6, py + 0.6, sz - r * 1.2, 0.9);
          c.globalAlpha = 0.06;
          c.fillStyle = '#000';
          c.fillRect(px + r * 0.6, py + sz - 1, sz - r * 1.2, 0.8);
        }
      }
    }
    c.globalAlpha = 1;
  }

  function loop(ts: number) {
    const dt = last ? Math.min(ts - last, MAX_DT) : FRAME_MS;
    last = ts;
    if (running) step(dt);
    if (fadeDur) {
      fadeMs = Math.min(fadeDur, fadeMs + dt);
      refreshFills(easeOut(fadeMs / fadeDur));
      if (fadeMs >= fadeDur) fadeDur = 0;
    }
    draw();
    // Keep ticking while moving, or just long enough to finish a crossfade.
    raf = running || fadeDur ? requestAnimationFrame(loop) : 0;
  }

  function ensureLoop() {
    if (!raf) {
      last = 0;
      raf = requestAnimationFrame(loop);
    }
  }

  return {
    resize(width, height) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = width;
      H = height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fitOffscreen();
      draw(); // resizing clears the canvas — repaint now, even if paused
    },
    setTileSize(size) {
      T = size;
      fitOffscreen();
    },
    setCreatures(list) {
      creatures = list.map((c) => ({ ...c }));
    },
    setColors(palette, background, duration = 0) {
      // Start from whatever is on screen, so a mid-fade toggle doesn't jump.
      fromLut = new Float32Array(shownLut);
      fromBg = bgFill
        .slice(4, -1)
        .split(',')
        .map(Number) as unknown as RGB;
      toLut = buildLut(palette);
      toBg = background;
      if (duration > 0) {
        fadeMs = 0;
        fadeDur = duration;
        ensureLoop();
      } else {
        fadeDur = 0;
        refreshFills(1);
        draw();
      }
    },
    start() {
      if (running) return;
      running = true;
      ensureLoop();
    },
    stop() {
      running = false; // the loop exits on its next tick (after any crossfade)
    },
    renderOnce() {
      draw();
    },
    destroy() {
      running = false;
      fadeDur = 0;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
