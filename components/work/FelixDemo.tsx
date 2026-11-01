'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * FelixDemo — a SCRIPTED, deterministic re-enactment of Felix's three-path
 * triage, mounted only on the Felix case-study page. No backend, no API, no
 * inference at runtime — it replays Felix's real example tickets + responses
 * (verbatim from heyfelix.vercel.app) to illustrate the logic.
 *
 * Cohesion: reuses the site's type scale, the elevated card surface, and
 * brand colors — lime/lavender/rust map to Resolve/Ask/Escalate.
 * No new fonts or one-off patterns.
 *
 * Reduced motion: the "thinking" beat is skipped — the resolved end-state shows
 * immediately. Works down to 380px.
 */

type Path = 'Resolve' | 'Ask' | 'Escalate';

interface Example {
  path: Path;
  pathLabel: string;
  dot: string; // brand color for this path
  ticketAuthor: string;
  ticketText: string;
  decision: string; // the 0.65 / KB-match framing (verbatim from Felix)
  felixText: string;
}

// Verbatim from heyfelix.vercel.app — invent nothing.
const EXAMPLES: Example[] = [
  {
    path: 'Resolve',
    pathLabel: 'Path A · Resolve',
    dot: 'bg-accent',
    ticketAuthor: 'Riya P.',
    ticketText: 'CRM session timed out again',
    decision: 'KB has a high-confidence match — similarity above 0.65.',
    felixText: 'Looks like the session timeout. Try: incognito → log in fresh. Source: KB §4.',
  },
  {
    path: 'Ask',
    pathLabel: 'Path B · Ask',
    dot: 'bg-lavender-400',
    ticketAuthor: 'Alex M.',
    ticketText: 'Dialer is making weird noises',
    decision: 'Likely match, but missing one specific piece of context.',
    felixText: 'Is it static, echo, or no sound at all? That’ll narrow it to either KB §1 or KB §3.',
  },
  {
    path: 'Escalate',
    pathLabel: 'Path C · Escalate',
    dot: 'bg-rust-400',
    ticketAuthor: 'Sam K.',
    ticketText: 'Homepage broken on iOS Safari',
    decision: 'No KB match — routes to the right team with context.',
    felixText: 'No KB match. Routing to @frontend-team — reported by Sam K., iOS Safari, homepage scope.',
  },
];

function Avatar({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-medium',
        accent ? 'bg-accent text-[var(--accent-fg)]' : 'bg-bg-sunken text-fg-muted border border-border',
      ].join(' ')}
    >
      {label}
    </span>
  );
}

export function FelixDemo() {
  const [active, setActive] = useState(0);
  const [thinking, setThinking] = useState(false);
  const reduceRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => clearTimeout(timer.current);
  }, []);

  function pick(i: number) {
    setActive(i);
    clearTimeout(timer.current);
    if (reduceRef.current) {
      setThinking(false);
      return;
    }
    setThinking(true);
    timer.current = setTimeout(() => setThinking(false), 850);
  }

  const ex = EXAMPLES[active];

  return (
    <section aria-label="Watch Felix triage (scripted)" className="mt-4">
      <h2 className="text-2xl md:text-3xl tracking-tight text-fg mb-2">
        Watch Felix triage
      </h2>
      <p className="text-base text-fg-muted leading-relaxed mb-6">
        Pick a ticket. This is a scripted replay of Felix’s real example responses, so
        nothing runs live.
      </p>

      {/* Example picker */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EXAMPLES.map((e, i) => (
          <button
            key={e.path}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={i === active}
            className={[
              'inline-flex h-9 items-center gap-2 rounded-md px-3.5 text-sm transition-colors duration-fast',
              i === active
                ? 'bg-fg text-bg'
                : 'border border-border text-fg-muted hover:text-fg',
            ].join(' ')}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${e.dot}`} aria-hidden="true" />
            {e.ticketText}
          </button>
        ))}
      </div>

      {/* Slack-style thread */}
      <div className="rounded-[20px] bg-bg-elevated p-5 md:p-6">
        {/* incoming ticket */}
        <div className="flex items-start gap-3">
          <Avatar label={ex.ticketAuthor.slice(0, 2)} />
          <div className="min-w-0">
            <p className="text-sm">
              <span className="font-medium text-fg">{ex.ticketAuthor}</span>{' '}
              <span className="text-xs text-fg-muted">in #support</span>
            </p>
            <p className="text-sm text-fg-muted leading-relaxed">{ex.ticketText}</p>
          </div>
        </div>

        {/* felix */}
        <div className="mt-5 flex items-start gap-3">
          <Avatar label="fx" accent />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-fg mb-2">Felix</p>

            {thinking ? (
              <span className="inline-flex items-center gap-1.5 text-fg-subtle" aria-label="Felix is evaluating">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-fg-subtle animate-pulse"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            ) : (
              <>
                {/* path decision + similarity framing */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-fg">
                    <span className={`h-2 w-2 rounded-full ${ex.dot}`} aria-hidden="true" />
                    {ex.pathLabel}
                  </span>
                  <span className="text-sm text-fg-muted">
                    {ex.decision}
                  </span>
                </div>
                {/* scripted response */}
                <p className="text-sm text-fg leading-relaxed">{ex.felixText}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
