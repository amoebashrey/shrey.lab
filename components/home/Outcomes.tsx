'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { EMAIL } from '@/lib/site';
import './showcase.css';

/**
 * Outcomes — the second fold. A compact strip of the three numbers, then a
 * story card that tells the context behind one number at a time.
 *
 * The story card is a small carousel: previous/next buttons, ← → keys while
 * it has focus, swipe on touch, and dots as position indicators. Picking a
 * number in the strip opens its story. It steps on its own while on screen,
 * pauses on hover or focus, stops once someone takes over, and never moves
 * under reduced motion.
 *
 * The numbers are the ones the site has always stated, verbatim. The stories
 * only restate their context; nothing here is a quote or a testimonial.
 */
const STEP_MS = 7000;
const SWIPE_PX = 40;

type Icon = readonly string[];

// 5-wide tile glyphs; '#' is a lit tile.
const ICON_UP: Icon = ['..#..', '.###.', '#.#.#', '..#..', '..#..', '..#..'];
const ICON_BARS: Icon = ['....#', '....#', '..#.#', '..#.#', '#.#.#', '#.#.#'];
const ICON_DOLLAR: Icon = ['..#..', '.####', '#.#..', '.###.', '..#.#', '####.', '..#..'];

const OUTCOMES = [
  {
    value: '~50%',
    label: 'conversion, zero paid CAC',
    icon: ICON_UP,
    where: 'Amber · university channel',
    story:
      'A white-label booking channel that universities offer their own students, live across 30+ universities. Nobody arrives through an ad, so there’s no paid acquisition behind it, and about half of them convert.',
  },
  {
    value: '18%',
    label: 'booking lift after the image rollout',
    icon: ICON_BARS,
    where: 'Amber · property listings · 2024',
    story:
      'Students choose a room from its listing, mostly from the photos. The listing images were reworked and rolled out, and bookings rose 18% afterwards.',
  },
  {
    value: '₹20L',
    label: 'a year in tool costs, built in-house',
    icon: ICON_DOLLAR,
    where: 'Amber · internal ticketing · 2024',
    story:
      'The team was paying for Suptask to run support tickets in Slack. An in-house tool does that job instead, worth about ₹20 lakh a year in tool costs.',
  },
] as const;

export function Outcomes() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const n = OUTCOMES.length;

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && inView && !held;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, active, n]);

  function go(i: number) {
    setAuto(false); // the visitor is in charge now
    setActive(((i % n) + n) % n);
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(active + 1);
    }
  }

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'mouse') return;
    swipe.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: PointerEvent) {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(active + (dx < 0 ? 1 : -1));
  }

  return (
    <section
      ref={ref}
      aria-labelledby="outcomes-heading"
      className="oc-section seam pt-20 md:pt-28"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="outcomes-heading"
          className="mb-3 max-w-[20ch] text-balance text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg"
        >
          Shipped on products people use
        </h2>
        <p className="mb-8 max-w-[60ch] text-base leading-relaxed text-fg-muted md:mb-10 md:text-lg">
          You want someone who has moved a real metric, not a mockup. These are from Amber, a
          global student housing marketplace.
        </p>

        {/* Compact strip: the three numbers in one row */}
        <div className="grid grid-cols-3 overflow-hidden rounded-[10px] bg-bg-elevated">
          {OUTCOMES.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => go(i)}
              data-active={i === active || undefined}
              aria-pressed={i === active}
              className="oc-stat cs-trigger flex items-center gap-4 border-border px-3 py-3.5 text-left [&:not(:first-child)]:border-l sm:px-5 sm:py-4 md:px-6 md:py-5"
            >
              <TileIcon rows={o.icon} />
              <span className="min-w-0">
                <span className="block text-[22px] font-medium leading-none tracking-tight text-fg tabular-nums sm:text-[28px] md:text-[32px]">
                  {o.value}
                </span>
                <span className="mt-1.5 block text-xs leading-snug text-fg-muted sm:text-sm">{o.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Story carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="The story behind each number"
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipe.current = null)}
          className="oc-carousel mt-4 rounded-[10px] bg-bg-elevated p-6 md:mt-5 md:p-10"
        >
          <div className="grid">
            {OUTCOMES.map((o, i) => (
              <div
                key={o.label}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={i !== active}
                className="oc-slide col-start-1 row-start-1"
                style={{ opacity: i === active ? 1 : 0, visibility: i === active ? 'visible' : 'hidden' }}
              >
                <p className="text-sm text-fg-muted">{o.where}</p>
                <p className="mt-3 max-w-[48ch] text-pretty text-lg leading-snug text-fg sm:text-xl md:text-2xl">{o.story}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 md:mt-8">
            <div className="flex items-center gap-1" aria-hidden="true">
              {OUTCOMES.map((o, i) => (
                <span key={o.label} className="oc-dot block" data-on={i === active || undefined} />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous project" className="oc-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next project" className="oc-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-base text-fg-muted">
          Want me to look for yours?{' '}
          <a href={`mailto:${EMAIL}`} className="lab-link text-fg">
            Email me
          </a>{' '}
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </section>
  );
}

/** A glyph drawn in rounded tiles: lit tiles in the accent over a faint grid. */
function TileIcon({ rows }: { rows: Icon }) {
  const S = 7;
  const G = 1.5;
  const w = rows[0].length * S;
  const h = rows.length * S;
  return (
    <svg className="tile-icon hidden flex-none overflow-visible sm:block" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => (
          <rect
            key={`${x}-${y}`}
            x={x * S + G / 2}
            y={y * S + G / 2}
            width={S - G}
            height={S - G}
            rx={1.4}
            fill={c === '#' ? 'var(--accent)' : 'var(--border)'}
            opacity={c === '#' ? 1 - y * 0.06 : 0.6}
            style={c === '#' ? ({ '--d': x + y } as React.CSSProperties) : undefined}
          />
        )),
      )}
    </svg>
  );
}
