'use client';

import { useEffect, useRef } from 'react';
import {
  createTileRenderer,
  DEFAULT_DARK_PALETTE,
  DEFAULT_PALETTE,
  DEFAULT_SHARKS,
  drawShark,
  type Creature,
  type Palette,
  type RGB,
  type TileRenderer,
} from '@/lib/tile-art';

/**
 * TileSharkBackground — sharks built from tiny tiles, drifting behind the
 * home hero. Decorative: aria-hidden, pointer-events none, and it never
 * reacts to scroll.
 *
 * Colours follow the site theme (data-theme on <html>, which the toggle sets):
 * white page + `palette` in light, warm charcoal + `darkPalette` in dark,
 * crossfading over the same 300ms the kit uses for its theme transition.
 *
 * The loop runs only while the hero is on screen, the tab is visible, `paused`
 * is false and reduced motion is off (that renders one still frame instead).
 */

// Page colours the canvas paints — keep in step with --hero-bg in globals.css.
const LIGHT_BG: RGB = [255, 255, 255];
const DARK_BG: RGB = [24, 24, 21]; // --ink-800
const THEME_FADE_MS = 300; // --theme-transition in tokens.css

const PHONE_MAX = 640;
const REF_W = 800; // the prototype's frame; default positions are in it
const REF_H = 460;
const RESIZE_DEBOUNCE_MS = 120;

function isDarkTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr) return attr === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// On phones the copy spans nearly the full width, so the two sharks start in
// the open lanes above and below it (fractions of the canvas height).
const PHONE_LANES = [0.17, 0.86];

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
  /** Palette in light mode. */
  palette?: Palette;
  /** Palette in dark mode. */
  darkPalette?: Palette;
  /** Tile size in px on desktop; phones use at least 8. */
  tileSize?: number;
  sharks?: readonly Creature[];
  paused?: boolean;
  className?: string;
}

export function TileSharkBackground({
  palette = DEFAULT_PALETTE,
  darkPalette = DEFAULT_DARK_PALETTE,
  tileSize = 7,
  sharks = DEFAULT_SHARKS,
  paused = false,
  className = '',
}: TileSharkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<TileRenderer | null>(null);
  // Latest props for the long-lived effect below, without re-creating it.
  const propsRef = useRef({ palette, darkPalette, tileSize, sharks });
  propsRef.current = { palette, darkPalette, tileSize, sharks };
  const pausedRef = useRef(paused);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const p = propsRef.current;
    let dark = isDarkTheme();
    let { width, height } = host.getBoundingClientRect();
    let phone = width < PHONE_MAX;

    let renderer: TileRenderer;
    try {
      renderer = createTileRenderer(canvas, {
        shape: drawShark,
        palette: dark ? p.darkPalette : p.palette,
        background: dark ? DARK_BG : LIGHT_BG,
        tileSize: phone ? Math.max(8, p.tileSize) : p.tileSize,
        creatures: layoutCreatures(p.sharks, width, height, phone),
      });
    } catch {
      return; // no 2D canvas — the hero's own background still shows
    }
    rendererRef.current = renderer;
    renderer.resize(width, height);

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

    // Debounced resize. Sizes come from the observer entry — no layout reads.
    let resizeTimer = 0;
    const ro = new ResizeObserver(([entry]) => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const box = entry.contentRect;
        if (box.width === width && box.height === height) return;
        width = box.width;
        height = box.height;
        const nowPhone = width < PHONE_MAX;
        const cur = propsRef.current;
        renderer.setTileSize(nowPhone ? Math.max(8, cur.tileSize) : cur.tileSize);
        if (nowPhone !== phone) {
          phone = nowPhone;
          renderer.setCreatures(layoutCreatures(cur.sharks, width, height, phone));
        }
        renderer.resize(width, height);
      }, RESIZE_DEBOUNCE_MS);
    });
    ro.observe(host);

    // Theme: the toggle flips data-theme on <html>; with no attribute, the OS
    // preference decides.
    const applyTheme = (fade: boolean) => {
      const next = isDarkTheme();
      if (next === dark) return;
      dark = next;
      const cur = propsRef.current;
      renderer.setColors(
        dark ? cur.darkPalette : cur.palette,
        dark ? DARK_BG : LIGHT_BG,
        fade ? THEME_FADE_MS : 0,
      );
    };
    const mo = new MutationObserver(() => applyTheme(true));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const schemeMQ = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => applyTheme(true);
    schemeMQ.addEventListener('change', onScheme);

    return () => {
      window.clearTimeout(resizeTimer);
      reduceMQ.removeEventListener('change', onReduce);
      schemeMQ.removeEventListener('change', onScheme);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      renderer.destroy();
      rendererRef.current = null;
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
    const r = rendererRef.current;
    if (!r) return;
    const dark = isDarkTheme();
    r.setColors(dark ? darkPalette : palette, dark ? DARK_BG : LIGHT_BG, THEME_FADE_MS);
  }, [palette, darkPalette]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
