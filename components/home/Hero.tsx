/**
 * Hero — title-only block. Restraint is the point.
 *
 * Three lines at the same display size: a Geist sentence and two
 * Instrument-Serif italic sentences. No body line, no role-targeting line,
 * no CTAs in this position. CTAs live in HeroCTAs below the title with
 * generous breathing room. Biographical / current-state content lives in
 * the rolling status pill in the footer.
 *
 * Locked structure per docs/PROJECT_BRIEF.md (v0.2 update).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-16 md:pt-24 pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <p className="eyebrow mb-6 md:mb-8" aria-hidden="true">
          // product manager · pune
        </p>

        <h1
          id="hero-heading"
          className="text-fg max-w-5xl font-medium text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.035em]"
        >
          <span className="block">Product manager.</span>
          <span className="block italic-break">
            I build internal tools, AI agents,
          </span>
          <span className="block italic-break">
            and systems that help product teams move.
          </span>
        </h1>
      </div>
    </section>
  );
}
