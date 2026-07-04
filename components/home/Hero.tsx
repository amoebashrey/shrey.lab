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
      // pb kept tight — HeroCTAs carries the gap below (see HeroCTAs.tsx);
      // the old pb-16/20 + mt-16/20 stacked into a ~160px dead zone.
      className="relative pt-16 md:pt-24 pb-4 md:pb-6"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {/* Cinematic load (tokens.css §cinematic) — the lime line draws across
            in 600ms: the signature color's one above-the-fold moment. A
            standalone element rather than `.lab-cinematic` on the section, so
            its `> *` fade-up doesn't double-animate with Stagger. Draw is
            gated on the intro overlay finishing — see .hero-lime-line in
            globals.css + IntroGate. */}
        <div className="hero-lime-line mb-8 md:mb-10" aria-hidden="true" />
        {/* Eyebrow carries what the H1 doesn't (name · company · city) —
            "// product manager" directly above "Product manager." said the
            same noun twice within 40px. */}
        <p className="eyebrow mb-6 md:mb-8" aria-hidden="true">
          // shreyas jadhav · amber · pune
        </p>

        <h1
          id="hero-heading"
          className="hero-depth text-fg font-medium text-[clamp(48px,7vw,88px)] leading-[0.98] tracking-tightest"
        >
          Product manager.
        </h1>

        <p className="mt-6 md:mt-8 max-w-[38ch] font-display italic font-normal text-fg text-[clamp(20px,2.4vw,32px)] leading-[1.25] tracking-snug">
          I build internal tools, AI agents, and systems that help product teams move.
        </p>
      </div>
    </section>
  );
}
