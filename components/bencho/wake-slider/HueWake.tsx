'use client';

/*
 * Adapted from Bencho's "Wake slider" block — https://bencho.dev
 * https://github.com/cabralorenzo/bencho/tree/main/blocks/wake-slider
 *
 * MIT License
 *
 * Copyright (c) 2026 Lorenzo Cabra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * shrey.lab changes: the range is a hue (0–359°); each bar is drawn in the
 * site accent for its slice of the spectrum (per theme, via CSS vars); the
 * bars near the value stand lit instead of filling up to it; arrows step 10°;
 * no wake under reduced motion.
 */

import { useEffect, useRef, useState } from 'react';

/* ══ Wake slider ══════════════════════════════════════════
   A range with no thumb: a row of thin bars. Drag anywhere along
   it. Drag fast and every bar the value sweeps past springs up,
   taller the faster you went, and settles back — a wake left
   behind the hand.

   ── EACH BAR HOLDS A LITTLE ENERGY ──────────────────────
   When the value crosses a bar, that bar takes energy from the
   speed of the drag. Every frame all of it decays at the same
   rate, so the bars crossed longest ago have fallen furthest: the
   tallest ones are always at the hand and the run tails off
   behind it. That falloff IS the wake; nothing draws it.

   ── WRITTEN, NOT RENDERED ───────────────────────────────
   The heights change every frame, so they go straight onto each
   bar's transform from a ref. React renders when the value
   changes, and the loop runs only while some bar has energy. */

const H = 18; // a bar at rest, px
const GAP = 3; // bar pitch minus its width
const BAR = 3;
const N = 36; // one bar per 10°
const STEP = 10; // arrow-key step, degrees
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const wrap = (h: number) => ((Math.round(h) % 360) + 360) % 360;

export function HueWake({
  value,
  onChange,
  /* each bar's colour in light and dark, index 0 = hue 0..9° */
  colors,
  /* how high the wake rises, 0..100 */
  wake = 60,
  label = 'Colour',
  /* optional extra reading under the value (e.g. a name) */
  caption,
}: {
  value: number;
  onChange: (hue: number) => void;
  colors: ReadonlyArray<{ light: string; dark: string }>;
  wake?: number;
  label?: string;
  caption?: string;
}) {
  const track = useRef<HTMLDivElement | null>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const st = useRef({
    energy: new Float32Array(N),
    down: false,
    lastX: 0,
    lastT: 0,
    speed: 0,
    raf: 0,
    at: value / 360, // the value as a fraction, without React in the way
    reduce: false,
  });
  const knob = useRef(wake);
  knob.current = wake;
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!st.current.down) st.current.at = value / 360;
  }, [value]);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => (st.current.reduce = mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  useEffect(() => () => cancelAnimationFrame(st.current.raf), []);

  const loop = () => {
    const s = st.current;
    if (s.raf) return;
    let prev = performance.now();
    const run = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      let live = false;
      const fall = Math.exp(-dt * 6.5);
      for (let i = 0; i < s.energy.length; i++) {
        s.energy[i] *= fall;
        if (s.energy[i] < 0.002) s.energy[i] = 0;
        else live = true;
        const b = els.current[i];
        /* up to 2.6 times as tall at the very top of the wake */
        if (b) b.style.setProperty('--wks-wake', (1 + s.energy[i] * 1.6).toFixed(3));
      }
      s.raf = live || s.down ? requestAnimationFrame(run) : 0;
    };
    s.raf = requestAnimationFrame(run);
  };

  /* move the value to a fraction, waking every bar it passes */
  const to = (f: number, speed: number) => {
    const s = st.current;
    f = clamp(f, 0, 0.9999);
    const from = s.at;
    s.at = f;
    if (!s.reduce) {
      const a = Math.floor(from * N);
      const b = Math.floor(f * N);
      /* how hard: the drag's speed through a curve that saturates */
      const push = (1 - Math.exp(-speed / 900)) * (knob.current / 60);
      for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
        s.energy[i] = Math.max(s.energy[i], push);
      }
      loop();
    }
    onChange(wrap(f * 360));
  };

  const frac = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    return (clientX - r.left) / r.width;
  };
  const release = () => {
    st.current.down = false;
    setDragging(false);
  };

  const lit = Math.floor((value / 360) * N);

  return (
    <div className="wks">
      <div
        ref={track}
        className="wks-track"
        data-dragging={dragging || undefined}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={value}
        aria-valuetext={caption ? `${caption}, hue ${value}°` : `Hue ${value}°`}
        style={{ width: N * (BAR + GAP) - GAP, height: H * 2.6 }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          const s = st.current;
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            /* a scripted pointer */
          }
          s.down = true;
          setDragging(true);
          s.lastX = e.clientX;
          s.lastT = performance.now();
          s.speed = 0;
          to(frac(e.clientX), 0);
        }}
        onPointerMove={(e) => {
          const s = st.current;
          if (!s.down) return;
          const now = performance.now();
          const dt = Math.max(0.008, (now - s.lastT) / 1000);
          /* speed in px per second, smoothed so one jittery frame
             cannot fake a fling */
          const v = Math.abs(e.clientX - s.lastX) / dt;
          s.speed = s.speed * 0.5 + v * 0.5;
          s.lastX = e.clientX;
          s.lastT = now;
          to(frac(e.clientX), s.speed);
        }}
        onPointerUp={(e) => {
          release();
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {
            /* never captured */
          }
        }}
        onPointerCancel={release}
        onKeyDown={(e) => {
          let next: number | null = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = value + STEP;
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = value - STEP;
          if (e.key === 'Home') next = 0;
          if (e.key === 'End') next = 350;
          if (next === null) return;
          e.preventDefault();
          /* the hue wraps round; a key press is a small, quick step */
          to(wrap(next) / 360, 600);
        }}
      >
        {colors.map((c, i) => (
          <span
            key={i}
            ref={(b) => {
              els.current[i] = b;
            }}
            className="wks-bar"
            data-on={i === lit || undefined}
            data-near={Math.abs(i - lit) === 1 || undefined}
            style={{ height: H, ['--wks-cl' as string]: c.light, ['--wks-cd' as string]: c.dark }}
          />
        ))}
      </div>
      <span className="wks-value" aria-hidden="true">
        {caption ?? `${value}°`}
      </span>
    </div>
  );
}
