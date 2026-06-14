/**
 * StatusPill — small mono pill with pulsing lime dot.
 *
 * Used for "currently building" in hero, and for case study / tool status indicators.
 * One pulsing dot per page maximum (BRAND.md §9 — decorative motion sparingly).
 */
interface StatusPillProps {
  text: string;
  pulse?: boolean;
}

export function StatusPill({ text, pulse = true }: StatusPillProps) {
  return (
    <span className="lab-glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-2xs font-mono text-fg-muted tracking-mono">
      <span className="relative inline-flex w-2 h-2" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-accent" />
        {pulse && (
          <span
            className="absolute inset-0 rounded-full bg-accent"
            style={{
              animation: 'pulse-ring 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
            }}
          />
        )}
      </span>
      {text}
    </span>
  );
}
