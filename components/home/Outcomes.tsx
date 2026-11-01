'use client';

import { useEffect, useRef, useState } from 'react';
import './showcase.css';

/**
 * Outcomes — the second fold. A large card on the left tells the story behind
 * one number at a time (dots to switch); three stat cards on the right carry
 * the numbers, each with a small tile icon in the accent.
 *
 * The numbers are the ones the site has always stated, verbatim. The stories
 * only restate their context; nothing here is a quote or a testimonial.
 * Auto-steps while on screen, like the case-study cards: pauses on hover or
 * focus, stops once someone picks one, never runs under reduced motion.
 */
const STEP_MS = 7000;

type Icon = readonly string[];

// 5-wide tile glyphs; '#' is a lit tile.
const ICON_UP: Icon = ['..#..', '.###.', '#.#.#', '..#..', '..#..', '..#..'];
const ICON_BARS: Icon = ['....#', '....#', '..#.#', '..#.#', '#.#.#', '#.#.#'];
const ICON_DOLLAR: Icon = ['..#..', '.####', '#.#..', '.###.', '..#.#', '####.', '..#..'];

const OUTCOMES = [
  {
    value: '~50%',
    label: 'conversion',
    qualifier: 'Zero paid CAC',
    icon: ICON_UP,
    where: 'Amber · university channel',
    story:
      'A white-label booking channel that universities offer their own students, live across 30+ universities. Nobody arrives through an ad, so there’s no paid acquisition behind it, and about half of them convert.',
  },
  {
    value: '18%',
    label: 'booking lift',
    qualifier: 'After the image UX rollout',
    icon: ICON_BARS,
    where: 'Amber · property listings · 2024',
    story:
      'Students choose a room from its listing, mostly from the photos. The listing images were reworked and rolled out, and bookings rose 18% afterwards.',
  },
  {
    value: '$20K',
    label: 'saved a year',
    qualifier: 'Built in-house',
    icon: ICON_DOLLAR,
    where: 'Amber · internal ticketing · 2024',
    story:
      'The team was paying for Suptask to run support tickets in Slack. An in-house tool does that job instead, which is about $20K a year the team no longer spends.',
  },
] as const;

export function Outcomes() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
    const t = window.setTimeout(() => setActive((a) => (a + 1) % OUTCOMES.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  function choose(i: number) {
    setAuto(false);
    setActive(i);
  }

  return (
    <section
      ref={ref}
      aria-labelledby="outcomes-heading"
      className="oc-section pt-20 md:pt-28"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="outcomes-heading"
          className="mb-10 max-w-[20ch] text-balance text-4xl font-medium tracking-tight text-fg md:mb-14 md:text-5xl"
        >
          What changed after it shipped
        </h2>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* Story card */}
          <div className="flex min-h-[300px] flex-col rounded-[20px] bg-bg-elevated p-6 md:min-h-[380px] md:p-10">
            <div className="grid flex-1">
              {OUTCOMES.map((o, i) => (
                <div
                  key={o.label}
                  aria-hidden={i !== active}
                  className="oc-slide col-start-1 row-start-1 flex flex-col"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  <p className="text-sm text-fg-muted">{o.where}</p>
                  <p className="mt-6 max-w-[34ch] text-pretty text-2xl leading-snug text-fg md:text-[28px]">
                    {o.story}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-1" role="group" aria-label="Choose an outcome">
              {OUTCOMES.map((o, i) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => choose(i)}
                  aria-label={`${o.value} ${o.label}`}
                  aria-current={i === active}
                  className="grid h-6 min-w-6 place-items-center px-1"
                >
                  <span className="oc-dot block" />
                </button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-1">
            {OUTCOMES.map((o, i) => (
              <button
                key={o.label}
                type="button"
                onClick={() => choose(i)}
                data-active={i === active || undefined}
                aria-pressed={i === active}
                className="oc-stat cs-trigger flex items-center gap-5 rounded-[20px] bg-bg-elevated p-6 text-left sm:flex-col sm:items-start lg:flex-row lg:items-center"
              >
                <TileIcon rows={o.icon} />
                <span className="min-w-0">
                  <span className="block text-4xl font-medium leading-none tracking-tight text-fg tabular-nums md:text-5xl">
                    {o.value}
                  </span>
                  <span className="mt-2 block text-base text-fg">{o.label}</span>
                  <span className="block text-sm text-fg-muted">{o.qualifier}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
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
    <svg
      className="tile-icon flex-none overflow-visible"
      width={w * 1.4}
      height={h * 1.4}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
    >
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
