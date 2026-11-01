/**
 * OutcomesStrip — three concrete, audit-proof metrics (PROJECT_BRIEF Problem 1+3).
 *
 * Presentation: disciplined-brutalist. Large Geist Sans numbers (BRAND §6 stat
 * callout: big number in sans, label in mono), one cycling brand-color dot per
 * stat, hairline rules on a clear grid. Server-rendered with the real values:
 * no count-up, so a visitor never sees "0%". The numbers and claims are
 * verbatim ("~50% conversion", "18% booking lift", "$20K saved / year").
 */
const OUTCOMES = [
  {
    prefix: '~',
    value: 50,
    suffix: '%',
    label: 'conversion',
    qualifier: 'Zero paid CAC',
    context: 'University white-label channel · Amber · 30+ universities',
  },
  {
    prefix: '',
    value: 18,
    suffix: '%',
    label: 'booking lift',
    qualifier: 'Post-image-UX rollout',
    context: 'Property listing optimization · Amber · 2024',
  },
  {
    prefix: '$',
    value: 20,
    suffix: 'K',
    label: 'saved / year',
    qualifier: 'Built in-house',
    context: 'Internal ticketing · replaced Suptask · Amber · 2024',
  },
] as const;

// lime → lavender → rust → ink, one per stat.
const DOT_COLORS = ['bg-accent', 'bg-lavender-400', 'bg-rust-400', 'bg-fg'];

function Stat({ outcome, index }: { outcome: (typeof OUTCOMES)[number]; index: number }) {
  return (
    <article
      className={[
        'relative py-8 md:py-10 md:px-10',
        // Hairline grid: rules between stacked items (mobile) and columns (desktop).
        'border-t border-border first:border-t-0',
        'md:border-t-0 md:border-l md:first:border-l-0 md:first:pl-0',
      ].join(' ')}
    >
      {/* Cycling brand-color dot */}
      <span
        className={`mb-5 inline-block h-2 w-2 rounded-full ${DOT_COLORS[index % DOT_COLORS.length]}`}
        aria-hidden="true"
      />

      {/* Large sans number, rendered as its real value in the HTML — it never
          shows 0, with or without JavaScript (BRAND §6: number in sans). */}
      <p className="font-sans font-medium text-4xl md:text-5xl tracking-tight leading-none text-fg tabular-nums">
        {outcome.prefix}
        {outcome.value}
        {outcome.suffix}
      </p>

      {outcome.label && (
        <p className="mt-3 text-sm text-fg">{outcome.label}</p>
      )}
      <p className="mt-1 text-sm text-fg-muted">{outcome.qualifier}</p>
      <p className="eyebrow mt-3">// {outcome.context}</p>
    </article>
  );
}

export function OutcomesStrip() {
  return (
    <section
      aria-labelledby="outcomes-heading"
      className="border-y border-border bg-bg-sunken"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-12 md:py-16">
        <h2 id="outcomes-heading" className="eyebrow mb-8 md:mb-10">
          // recent outcomes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-fg">
          {OUTCOMES.map((outcome, idx) => (
            <Stat key={idx} outcome={outcome} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
