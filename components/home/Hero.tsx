/**
 * Hero — large noun + supporting italic sentence. Restraint, then context.
 *
 * The <h1> carries the identity at display scale: "Product manager."
 * Below it, a single italic Instrument Serif sentence at body-display size
 * carries the supporting line. Lets the page breathe inside the first fold;
 * Persona 1 (60s skim) gets the noun first, the texture second.
 *
 * No body paragraph below this. No CTAs in this position — those live in
 * HeroCTAs. Biographical / current-state content lives in the rolling
 * status pill mounted between Hero and HeroCTAs in app/page.tsx.
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
          className="text-fg font-medium text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.035em]"
        >
          Product manager.
        </h1>

        <p className="mt-6 md:mt-8 max-w-[38ch] font-display italic font-normal text-fg text-[clamp(20px,2.4vw,32px)] leading-[1.25] tracking-[-0.01em]">
          I build internal tools, AI agents, and systems that help product teams move.
        </p>
      </div>
    </section>
  );
}
