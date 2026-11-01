'use client';

import { useEffect, useRef } from 'react';
import {
  createTileRenderer,
  DEFAULT_SHARKS,
  drawShark,
  type Creature,
  type Palette,
  type RGB,
  type Obstacle,
  type TileRenderer,
} from '@/lib/tile-art';
import { ACCENT_EVENT, accentPalette, readAccent } from '@/lib/accent';

/**
 * TileSharkBackground — sharks built from tiny tiles, drifting around the
 * home hero. Decorative: aria-hidden, pointer-events none, and it never
 * reacts to scroll. With `avoidSelector`, they swerve around that element
 * (the copy) and never pass behind it.
 *
 * Colour: by default the sharks use the site's accent palette
 * (lib/accent.ts), so they always match the CTA and follow the colour
 * control live. Pass `palette` / `darkPalette` to pin fixed colours instead.
 * Theme (data-theme on <html>): white page in light, warm charcoal in dark,
 * crossfading over the same 300ms the kit uses for its theme transition.
 *
 * The loop runs only while the hero is on screen, the tab is visible, `paused`
 * is false and reduced motion is off (that renders one still frame instead).
 */

// Page colours the canvas paints — keep in step with --hero-bg in globals.css.
const LIGHT_BG: RGB = [255, 255, 255];
const DARK_BG: RGB = [24, 24, 21]; // --ink-800
const THEME_FADE_MS = 300; // --theme-transition in tokens.css
const ACCENT_FADE_MS = 200;
const FIXED_PAD = 12; // clearance from the nav / colour pill

const PHONE_MAX = 640;
const REF_W = 800; // the prototype's frame; default positions are in it
const REF_H = 460;
const RESIZE_DEBOUNCE_MS = 120;

function isDarkTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr) return attr === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// On phones the copy spans nearly the full width and the nav fills the strip
// above it, so the hero leaves open water below the copy (Hero.tsx: taller
// band, extra bottom padding) and both sharks start there (fractions of the
// canvas height).
const PHONE_LANES = [0.84, 0.93];

/** Scales the prototype's positions into this canvas; phones keep the two
    largest sharks, shrunk to fit, one per lane. */
function layoutCreatures(list: readonly Creature[], w: number, h: number, phone: boolean) {
  const picked = phone ? [...list].sort((a, b) => b.L - a.L).slice(0, 2) : list;
  const scale = phone ? Math.min(1, w / PHONE_MAX) : 1;
  return picked.map((s, i) => ({
    ...s,
    x: (s.x / REF_W) * w,
    y: phone ? (PHONE_LANES[i] ?? 0.5) * h : (s.y / REF_H) * h,
    L: s.L * scale,
  }));
}

export interface TileSharkBackgroundProps {
  /** Fixed palette in light mode (default: the site's accent palette). */
  palette?: Palette;
  /** Fixed palette in dark mode (default: the site's accent palette). */
  darkPalette?: Palette;
  /** CSS selector (inside the canvas's parent) of an element the creatures
      steer around and never pass behind — e.g. the hero copy. */
  avoidSelector?: string;
  /** CSS selector (page-wide) of fixed chrome to steer around with a small
      margin — e.g. the nav and the colour pill. */
  fixedObstacleSelector?: string;
  /** Tile size in px on desktop; phones use at least 8. */
  tileSize?: number;
  sharks?: readonly Creature[];
  paused?: boolean;
  className?: string;
}

export function TileSharkBackground({
  palette,
  darkPalette,
  tileSize = 7,
  sharks = DEFAULT_SHARKS,
  paused = false,
  avoidSelector,
  fixedObstacleSelector,
  className = '',
}: TileSharkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Latest props for the long-lived effect below, without re-creating it.
  const propsRef = useRef({ palette, darkPalette, tileSize, sharks, avoidSelector, fixedObstacleSelector });
  propsRef.current = { palette, darkPalette, tileSize, sharks, avoidSelector, fixedObstacleSelector };
  const pausedRef = useRef(paused);
  const syncRef = useRef<() => void>(() => {});
  const syncPaletteRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const p = propsRef.current;
    let dark = isDarkTheme();
    let accent = readAccent();
    let { width, height } = host.getBoundingClientRect();
    let phone = width < PHONE_MAX;
    let creatures = layoutCreatures(p.sharks, width, height, phone);

    // Fixed palette props win; otherwise the site's accent palette.
    const pick = () => {
      const cur = propsRef.current;
      return (dark ? cur.darkPalette : cur.palette) ?? accentPalette(accent, dark);
    };

    // What to steer around, in canvas coordinates: the copy (inside the
    // host) with a margin bigger than the largest creature's body thickness
    // (≈0.26L), and fixed chrome anywhere on the page (nav, colour pill) with
    // a small one. Fin reach is added per body in lib/tile-art/motion.ts.
    // Measured at mount, on debounced resize and on throttled scroll (fixed
    // chrome moves relative to the hero) — never inside the frame loop.
    const avoidEl = p.avoidSelector ? host.querySelector<HTMLElement>(p.avoidSelector) : null;
    const fixedEls = p.fixedObstacleSelector
      ? Array.from(document.querySelectorAll<HTMLElement>(p.fixedObstacleSelector))
      : [];
    const measureObstacle = () => {
      const h = host.getBoundingClientRect();
      const rel = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height };
      };
      const Lmax = Math.max(...creatures.map((c) => c.L));
      const list: Obstacle[] = [];
      if (avoidEl) list.push({ rect: rel(avoidEl), pad: Math.max(24, Lmax * 0.3) });
      for (const el of fixedEls) list.push({ rect: rel(el), pad: FIXED_PAD });
      renderer.setObstacles(list);
    };

    let renderer: TileRenderer;
    try {
      renderer = createTileRenderer(canvas, {
        shape: drawShark,
        palette: pick(),
        background: dark ? DARK_BG : LIGHT_BG,
        tileSize: phone ? Math.max(8, p.tileSize) : p.tileSize,
        creatures,
      });
    } catch {
      return; // no 2D canvas — the hero's own background still shows
    }
    renderer.resize(width, height);
    measureObstacle();
    // Web fonts can reflow the copy after first paint.
    // The entrance animation also shifts it 16px for its first ~0.6s.
    let alive = true;
    document.fonts?.ready.then(() => alive && measureObstacle());
    const settleTimer = window.setTimeout(measureObstacle, 900);

    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduceMQ.matches;
    let inView = true;
    let tabVisible = document.visibilityState === 'visible';

    const sync = () => {
      if (!reduced && inView && tabVisible && !pausedRef.current) renderer.start();
      else {
        renderer.stop();
        renderer.renderOnce();
      }
    };
    syncRef.current = sync;
    sync();

    const onReduce = () => {
      reduced = reduceMQ.matches;
      sync();
    };
    reduceMQ.addEventListener('change', onReduce);

    const onVisibility = () => {
      tabVisible = document.visibilityState === 'visible';
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(host);

        let resizeTimer = 0;
    // Debounced; one layout read per settled resize (host + copy).
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const box = host.getBoundingClientRect();
        if (box.width !== width || box.height !== height) {
          width = box.width;
          height = box.height;
          const nowPhone = width < PHONE_MAX;
          const cur = propsRef.current;
          renderer.setTileSize(nowPhone ? Math.max(8, cur.tileSize) : cur.tileSize);
          if (nowPhone !== phone) {
            phone = nowPhone;
            creatures = layoutCreatures(cur.sharks, width, height, phone);
            renderer.setCreatures(creatures);
          }
          renderer.resize(width, height);
        }
        measureObstacle();
      }, RESIZE_DEBOUNCE_MS);
    });
    ro.observe(host);
    if (avoidEl) ro.observe(avoidEl);
    for (const el of fixedEls) ro.observe(el);

    // Fixed chrome slides over the hero as the page scrolls: re-measure, at
    // most once per frame, only while the hero is on screen.
    let scrollRaf = 0;
    const onScroll = () => {
      if (!inView || !fixedEls.length || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        measureObstacle();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Theme: the toggle flips data-theme on <html>; with no attribute, the OS
    // preference decides.
    const applyTheme = (fade: boolean) => {
      const next = isDarkTheme();
      if (next === dark) return;
      dark = next;
      renderer.setColors(pick(), dark ? DARK_BG : LIGHT_BG, fade ? THEME_FADE_MS : 0);
    };
    const mo = new MutationObserver(() => applyTheme(true));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const schemeMQ = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => applyTheme(true);
    schemeMQ.addEventListener('change', onScheme);

    // Colour control: a short crossfade between palettes.
    const onAccent = (e: Event) => {
      accent = (e as CustomEvent<number>).detail;
      renderer.setColors(pick(), dark ? DARK_BG : LIGHT_BG, ACCENT_FADE_MS);
    };
    window.addEventListener(ACCENT_EVENT, onAccent);
    syncPaletteRef.current = () =>
      renderer.setColors(pick(), dark ? DARK_BG : LIGHT_BG, THEME_FADE_MS);

    return () => {
      alive = false;
      window.clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener(ACCENT_EVENT, onAccent);
      syncPaletteRef.current = () => {};
      window.clearTimeout(resizeTimer);
      reduceMQ.removeEventListener('change', onReduce);
      schemeMQ.removeEventListener('change', onScheme);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      renderer.destroy();
      syncRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current();
  }, [paused]);

  // Palette props changed after mount — recolour in place.
  const firstPalette = useRef(true);
  useEffect(() => {
    if (firstPalette.current) {
      firstPalette.current = false;
      return;
    }
    syncPaletteRef.current();
  }, [palette, darkPalette]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
