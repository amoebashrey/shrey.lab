import { TEARDOWNS } from '@/lib/teardowns';
import { EMAIL } from '@/lib/site';
import { StudyFrame } from '@/components/work/StudyArt';

/**
 * How I think — small teardown cards in the case-study visual system: the
 * same frame, with the question each teardown answers set in Fraunces as the
 * art. Each card links out to its Figma prototype and says plainly that it's
 * unsolicited and unaffiliated, with the year it was done.
 */
export function Teardowns() {
  return (
    <section id="how-i-think" aria-labelledby="teardowns-heading" className="cs-section seam scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="teardowns-heading"
          className="mb-3 text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg"
        >
          How I think
        </h2>
        <p className="mb-8 max-w-[60ch] text-base leading-relaxed text-fg-muted md:mb-10 md:text-lg">
          Before you hire me to look at your product, see me look at others. These are unsolicited
          teardowns with clickable Figma prototypes. None of these companies asked me to; the years
          are when I did them.
        </p>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEARDOWNS.map((t) => (
            <li key={t.company} className="td-card rounded-[10px] bg-bg-elevated p-4 md:p-5">
              <a href={t.href} target="_blank" rel="noopener noreferrer" className="group block">
                <StudyFrame label={`${t.company} teardown: ${t.question}`}>
                  <div className="td-art">
                    <p className="td-q">{t.question}</p>
                  </div>
                </StudyFrame>
                <p className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="text-xl text-fg [font-family:var(--font-display)]">{t.company}</span>
                  <span className="text-sm text-fg-muted tabular-nums">{t.year}</span>
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{t.summary}</p>
                <p className="mt-3 text-sm font-medium text-fg">
                  <span className="lab-link">Open the prototype</span> <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (Figma, opens in a new tab)</span>
                </p>
                <p className="mt-2 text-xs text-fg-muted">
                  Unsolicited teardown. Not affiliated with {t.company}.
                </p>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-base text-fg-muted">
          Want one of these for your product?{' '}
          <a href={`mailto:${EMAIL}`} className="lab-link text-fg">
            Email me
          </a>{' '}
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </section>
  );
}
