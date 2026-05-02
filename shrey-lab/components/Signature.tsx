// shrey-lab/components/Signature.tsx
//
// The recurring "shrey.lab" signature elements.
// Use at least two per page so unrelated tools still feel like one studio's work.

import * as React from 'react';

/** Monogram — soft-cornered charcoal tile with italic 's' + lime dot */
export function Monogram({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="shrey.lab"
      className={className}
    >
      <rect x="2" y="2" width="76" height="76" rx="16" ry="16" fill="#181815" stroke="#A8E10C" strokeWidth="1.5" />
      <text
        x="40"
        y="58"
        fontFamily="Instrument Serif, serif"
        fontStyle="italic"
        fontSize="58"
        textAnchor="middle"
        fill="#FBFAF7"
      >
        s
      </text>
      <circle cx="61" cy="58" r="3" fill="#A8E10C" />
    </svg>
  );
}

/** Wordmark — "shrey<lime-dot>lab" */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-sans font-medium tracking-tight ${className}`}>
      <span>shrey</span>
      <span aria-hidden="true" className="inline-block w-[6px] h-[6px] rounded-full bg-lime-400" />
      <span>lab</span>
    </span>
  );
}

/** Eyebrow — // mono label, lowercase, muted, sits above section headings */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-2xs tracking-wide text-fg-muted lowercase ${className}`}>
      <span aria-hidden="true">{'// '}</span>
      {children}
    </div>
  );
}

/** Status pill — pulsing lime dot + status text. The "currently building" indicator */
export function StatusPill({
  children,
  pulse = true,
  className = '',
}: {
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 pl-2.5 rounded-full bg-bg-elevated border border-border font-mono text-2xs tracking-wide text-fg-muted ${className}`}
    >
      <span
        aria-hidden="true"
        className={`w-2 h-2 rounded-full bg-lime-400 ${pulse ? 'animate-pulse-lime' : ''}`}
      />
      {children}
    </span>
  );
}

/** Chip — small categorical tag */
type ChipTone = 'neutral' | 'lime' | 'lavender' | 'rust';
const chipTones: Record<ChipTone, string> = {
  neutral: 'bg-bg-elevated text-fg-muted border-border',
  lime: 'bg-lime-100 text-lime-700 border-lime-200',
  lavender: 'bg-lavender-100 text-lavender-600 border-lavender-200',
  rust: 'bg-rust-100 text-rust-600 border-rust-200',
};
export function Chip({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: React.ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-mono text-2xs tracking-wide px-2.5 py-1 rounded-full border ${chipTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Footer signature — drop in every page's footer */
export function FooterSignature({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className="mt-24 pt-12 pb-8 border-t border-border flex justify-between items-center flex-wrap gap-4 font-mono text-2xs tracking-wide text-fg-muted">
      <div className="flex items-center gap-3">
        <Monogram size={28} />
        <span>
          built by shrey
          <span className="text-lime-400 mx-1">·</span>
          {year}
        </span>
      </div>
      <span>// brand v1.0</span>
    </footer>
  );
}
