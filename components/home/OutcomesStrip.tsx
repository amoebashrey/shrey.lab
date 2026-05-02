/**
 * OutcomesStrip — three concrete metric statements tied to ships.
 *
 * NOT three skills. NOT three values. THREE NUMBERS with timeframes and qualifiers.
 *
 * Per PROJECT_BRIEF.md Problem 1 + Problem 3 (audit-proof metrics): every number
 * gets a timeframe and a context line. "18% lift in booking conversions over 6 weeks
 * post-launch" beats "improved engagement."
 *
 * Source data: from Shreyas's resume v01 (Amber bullets). Final wording locks
 * after the inventory dump confirms timeframes, baselines, and current sustained
 * status. Do not invent context — leave qualifiers slightly hedged until verified.
 */
const OUTCOMES = [
  {
    metric: '~50% conversion',
    qualifier: 'Zero paid CAC',
    context: 'University white-label channel · Amber · 30+ universities',
  },
  {
    metric: '18% booking lift',
    qualifier: 'Post-image-UX rollout',
    context: 'Property listing optimization · Amber · 2024',
  },
  {
    metric: '$20K saved / year',
    qualifier: 'Built in-house',
    context: 'Internal ticketing · replaced Suptask · Amber · 2024',
  },
] as const;

export function OutcomesStrip() {
  return (
    <section
      aria-labelledby="outcomes-heading"
      className="border-y border-border bg-bg-sunken"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-10 md:py-12">
        <h2 id="outcomes-heading" className="sr-only">
          Recent outcomes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {OUTCOMES.map((outcome, idx) => (
            <article key={idx} className="flex flex-col gap-2">
              <p className="text-2xl md:text-3xl font-medium tracking-tighter text-fg leading-tight">
                {outcome.metric}
              </p>
              <p className="text-sm text-fg leading-relaxed">
                {outcome.qualifier}
              </p>
              <p className="text-2xs font-mono text-fg-muted tracking-mono mt-1">
                // {outcome.context}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
