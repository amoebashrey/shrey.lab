'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createFootprintScene,
  createTileRenderer,
  type Obstacle,
  type RGB,
  type TileRenderer,
} from '@/lib/tile-art';
import { ACCENT_EVENT, accentPalette, readAccent } from '@/lib/accent';

/**
 * HeroFootprints — two dinosaurs walking the hero in opposite directions,
 * drawn in the hero's small rounded tiles, plus a pause/play control.
 *
 * Decorative: aria-hidden, pointer-events none, never reacts to scroll.
 * Walkers steer around the copy ([data-tile-avoid] → `avoidSelector`) and the
 * fixed chrome (nav, colour pill), so a print never lands behind the text.
 * Prints take the accent hue (lib/accent.ts) at low intensity so they never
 * compete with the headline.
 *
 * The loop runs only while the hero is on screen, the tab is visible, it isn't
 * paused, and reduced motion is off. Under reduced motion it shows two still,
 * settled trails. The pause choice is remembered.
 */

// Page colours the canvas paints — keep in step with --hero-bg in globals.css.
const LIGHT_BG: RGB = [255, 255, 255];
const DARK_BG: RGB = [24, 24, 21]; // --ink-800
const THEME_FADE_MS = 300; // --theme-transition in tokens.css
const ACCENT_FADE_MS = 200;
const TILE = 5;
const INTENSITY = { light: 0.55, dark: 0.7 }; // subtle: behind the headline
const JITTER = 0.14;
const TEXT_PAD = 48; // clearance between any print and the copy
const FIXED_PAD = 12; // clearance from the nav / colour pill
const PHONE_MAX = 640;
const PHONE_SCALE = 0.8; // 52px → ~42px and 34px → ~27px prints on phones
const PREWARM_MS = 2500; // a little trail already laid on first frame
const RESIZE_DEBOUNCE_MS = 120;
const PAUSE_KEY = 'hero-paused';

function isDarkTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr) return attr === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export interface FootprintLook {
  /** 'flat' crisp shapes, or 'tiles' at `tile` px. */
  render?: 'tiles' | 'flat';
  tile?: number;
}

export function HeroFootprints({
  avoidSelector,
  fixedObstacleSelector = '[data-tile-obstacle]',
  look = {},
}: {
  avoidSelector?: string;
  fixedObstacleSelector?: string;
  look?: FootprintLook;
}) {
  const render = look.render ?? 'tiles';
  const tile = look.tile ?? TILE;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false); // the control only renders once it works
  const [phone, setPhone] = useState<boolean | null>(null);
  const pausedRef = useRef(paused);
  const syncRef = useRef<() => void>(() => {});

  // Restore the pause choice; learn the layout size (scene scale) once.
  useEffect(() => {
    try {
      setPaused(localStorage.getItem(PAUSE_KEY) === '1');
    } catch {
      /* storage disabled — start playing */
    }
    const host = canvasRef.current?.parentElement;
    setPhone((host?.getBoundingClientRect().width ?? 1024) < PHONE_MAX);
    setReady(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host || phone === null) return;

    let dark = isDarkTheme();
    let accent = readAccent();
    let { width, height } = host.getBoundingClientRect();
    const scene = createFootprintScene(undefined, phone ? PHONE_SCALE : 1);

    let renderer: TileRenderer;
    try {
      renderer = createTileRenderer(canvas, {
        scene,
        palette: accentPalette(accent, dark),
        background: dark ? DARK_BG : LIGHT_BG,
        tileSize: tile,
        mode: render,
        intensity: dark ? INTENSITY.dark : INTENSITY.light,
        jitter: JITTER,
      });
    } catch {
      return; // no 2D canvas — the hero's own background still shows
    }

    // What to keep clear, in canvas coordinates. Measured at mount, on
    // debounced resize and on throttled scroll — never inside the frame loop.
    const avoidEl = avoidSelector ? host.querySelector<HTMLElement>(avoidSelector) : null;
    const fixedEls = Array.from(document.querySelectorAll<HTMLElement>(fixedObstacleSelector));
    const measure = () => {
      const h = host.getBoundingClientRect();
      const rel = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height };
      };
      const list: Obstacle[] = [];
      if (avoidEl) list.push({ rect: rel(avoidEl), pad: TEXT_PAD });
      for (const el of fixedEls) list.push({ rect: rel(el), pad: FIXED_PAD });
      renderer.setObstacles(list);
    };

    renderer.resize(width, height);
    measure();

    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reduceMQ.matches;
    if (reduced) scene.settle();
    else renderer.advance(PREWARM_MS);

    // Web fonts and the copy's entrance can shift it after first paint.
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    const settleTimer = window.setTimeout(measure, 900);

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
      if (reduced) scene.settle();
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
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const box = host.getBoundingClientRect();
        if (box.width < PHONE_MAX !== phone) {
          setPhone(box.width < PHONE_MAX); // new scale → this effect re-runs
          return;
        }
        if (box.width !== width || box.height !== height) {
          width = box.width;
          height = box.height;
          renderer.resize(width, height);
        }
        measure();
      }, RESIZE_DEBOUNCE_MS);
    });
    ro.observe(host);
    if (avoidEl) ro.observe(avoidEl);
    for (const el of fixedEls) ro.observe(el);

    // Fixed chrome slides over the hero as the page scrolls.
    let scrollRaf = 0;
    const onScroll = () => {
      if (!inView || !fixedEls.length || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        measure();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Theme: crossfade palette + page colour; intensity per theme.
    const applyTheme = () => {
      const next = isDarkTheme();
      if (next === dark) return;
      dark = next;
      renderer.setIntensity(dark ? INTENSITY.dark : INTENSITY.light);
      renderer.setColors(accentPalette(accent, dark), dark ? DARK_BG : LIGHT_BG, THEME_FADE_MS);
    };
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const schemeMQ = window.matchMedia('(prefers-color-scheme: dark)');
    schemeMQ.addEventListener('change', applyTheme);

    // Hue slider.
    const onAccent = (e: Event) => {
      accent = (e as CustomEvent<number>).detail;
      renderer.setColors(accentPalette(accent, dark), dark ? DARK_BG : LIGHT_BG, ACCENT_FADE_MS);
    };
    window.addEventListener(ACCENT_EVENT, onAccent);

    return () => {
      alive = false;
      window.clearTimeout(settleTimer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener(ACCENT_EVENT, onAccent);
      reduceMQ.removeEventListener('change', onReduce);
      schemeMQ.removeEventListener('change', applyTheme);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      renderer.destroy();
      syncRef.current = () => {};
    };
  }, [phone, avoidSelector, fixedObstacleSelector, render, tile]);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current();
  }, [paused]);

  function toggle() {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(PAUSE_KEY, next ? '1' : '0');
    } catch {
      /* fine — it just won't be remembered */
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play animation' : 'Pause animation'}
          className="hero-motion-toggle absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted md:bottom-6 md:right-8"
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="5" y="4" width="5" height="16" rx="1.5" />
              <rect x="14" y="4" width="5" height="16" rx="1.5" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
