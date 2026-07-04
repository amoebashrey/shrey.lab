import type { Metadata } from 'next';
import { FadeUp } from '@/components/motion/FadeUp';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What I&apos;m working on this month, and what I&apos;m reading.',
};

/**
 * /now — locked format from PROJECT_BRIEF.md.
 *
 * Under 300 words. Updated monthly. Brutalist treatment from brand kit allowed
 * here (thicker borders, hard offset shadows, monospace) — a changelog-feeling
 * page is the right place for it.
 *
 * Sanity nowEntry will drive this once wired.
 */
export default function NowPage() {
  // Static v0 content — replace with Sanity fetch once schema is up.
  const entry = {
    lastUpdated: '05.01.26',
    currentlyBuilding: 'shrey.lab',
    currentlyBuildingReason: "because the old portfolio was a creative-generalist site, and I'm a PM",
    shipped: [
      'Project brief, brand kit, and the three starter docs for shrey.lab',
      'Resume v01, with audit-proof timeframes on every Amber metric',
    ],
    learning: ['Sanity v3 + Next.js 14 App Router patterns'],
    reading: ['Inspired — Marty Cagan'],
    listening: 'Floating Points · Late Night Tales',
    puneNote: 'monsoon arrived late, the bougainvillea is confused.',
  };

  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-2xl px-6 md:px-8">
        {/* Brutalist card — thick border, offset shadow, mono.
            border-3: BRAND §3 brutalist mode wants weight; 2px read mismatched
            against the hard offset shadow. */}
        <div className="rounded-md border-3 border-fg shadow-brutal-md bg-bg p-8 md:p-10">
          <p className="font-mono text-2xs text-fg-muted tracking-mono mb-8">
            // last updated {entry.lastUpdated}
          </p>

          <h1 className="sr-only">What I&apos;m working on now</h1>

          <p className="text-xl md:text-2xl font-medium tracking-tight text-fg leading-snug mb-10">
            Currently building <span className="italic-break text-fg-muted">{entry.currentlyBuilding}</span>{' '}
            {entry.currentlyBuildingReason}.
          </p>

          <Section label="Shipped this month">
            {entry.shipped.map((item, i) => (
              <li key={i}>— {item}</li>
            ))}
          </Section>

          <Section label="Learning">
            {entry.learning.map((item, i) => (
              <li key={i}>— {item}</li>
            ))}
          </Section>

          <Section label="Reading">
            {entry.reading.map((item, i) => (
              <li key={i}>— {item}</li>
            ))}
          </Section>

          {entry.listening && (
            <Section label="Listening to">
              <li>— {entry.listening}</li>
            </Section>
          )}

          <p className="mt-10 pt-6 border-t border-border text-sm text-fg-muted leading-relaxed">
            <span className="font-mono text-2xs tracking-mono">// pune, this month:</span>{' '}
            {entry.puneNote}
          </p>
        </div>
      </FadeUp>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-mono text-2xs text-fg-muted tracking-mono mb-3">
        {label}
      </h2>
      <ul className="space-y-2 text-base text-fg leading-relaxed font-mono tracking-mono">
        {children}
      </ul>
    </div>
  );
}
