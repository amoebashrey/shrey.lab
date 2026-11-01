import Image from 'next/image';
import { CONCEPTS, TEARDOWNS } from '@/lib/teardowns';
import { EMAIL } from '@/lib/site';
import { StudyFrame } from '@/components/work/StudyArt';

/**
 * How I think — first the concept builds (working copies of a real app with
 * my changes built in), then the smaller Figma teardowns. All in the
 * case-study visual system: the same frame, with the question each one
 * answers set in Fraunces. Every card says plainly that it's unofficial and
 * unaffiliated, with the year where it's confirmed.
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
          Before you hire me to look at your product, see me look at others. Two are working builds
          you can click through; the rest are Figma teardowns. None of these companies asked me to.
        </p>

        {/* Concept builds */}
        <ul className="grid gap-5 md:grid-cols-2">
          {CONCEPTS.map((c) => (
            <li key={c.company} className="flex flex-col rounded-[10px] bg-bg-elevated p-4 md:p-5">
              <StudyFrame label={`${c.company} concept build: ${c.question}`}>
                <div className="cb-art">
                  <p className="td-q cb-q">{c.question}</p>
                  <div className="cb-phone">
                    <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 768px) 220px, 40vw" className="object-cover object-top" />
                  </div>
                </div>
              </StudyFrame>
              <p className="mt-4 flex items-baseline justify-between gap-3">
                <span className="text-2xl text-fg [font-family:var(--font-display)]">{c.company}</span>
                <span className="text-sm text-fg-muted tabular-nums">
                  Concept build{c.year ? ` · ${c.year}` : ''}
                </span>
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{c.summary}</p>
              <p className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm font-medium text-fg">
                {c.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lab-link">
                    {l.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </p>
              <p className="mt-2 text-xs text-fg-muted">
                Unofficial concept. Not affiliated with {c.company}. People and data in the demo are made up.
              </p>
            </li>
          ))}
        </ul>

        {/* Figma teardowns */}
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <span className="text-sm text-fg-muted tabular-nums">Teardown · {t.year}</span>
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
