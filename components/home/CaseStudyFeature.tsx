'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import type { ShowcaseStudy } from '@/lib/showcase';
import './showcase.css';

/**
 * CaseStudyFeature — one case study as one card: the name, then three rows
 * (the problem, what I built, what happened) as a single-open accordion on
 * the left, and the study's image on the right (above the rows on phones).
 *
 * While the card is on screen the open row steps forward on its own, with a
 * thin progress line under it. That stops for good once someone opens a row
 * themselves, pauses on hover or focus, and never runs under reduced motion.
 */
const STEP_MS = 6500;

export function CaseStudyFeature({ study, index }: { study: ShowcaseStudy; index: number }) {
  const [open, setOpen] = useState(0);
  const [auto, setAuto] = useState(false); // becomes true only once motion is allowed
  const [held, setHeld] = useState(false); // hover / focus pause
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress line
  const ref = useRef<HTMLElement>(null);
  const uid = useId();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAuto(!reduce);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && inView && !held;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setOpen((o) => (o + 1) % study.rows.length);
      setCycle((c) => c + 1);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, open, cycle, study.rows.length]);

  function choose(i: number) {
    setAuto(false); // the visitor is in charge now
    setOpen(i);
  }

  return (
    <article
      ref={ref}
      aria-labelledby={`${uid}-name`}
      className="cs-card grid gap-8 rounded-[20px] bg-bg-elevated p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12 md:p-10"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="flex min-w-0 flex-col">
        <h3 id={`${uid}-name`} className="text-balance text-3xl font-medium tracking-tight text-fg md:text-4xl">
          {study.name}
        </h3>
        <p className="mt-2 text-base text-fg-muted">{study.kicker}</p>

        {/* Image on phones: above the rows so the story reads top to bottom */}
        <div className="mt-6 md:hidden">
          <StudyImage study={study} priority={index === 0} />
        </div>

        <div className="mt-6 md:mt-8">
          {study.rows.map((row, i) => {
            const isOpen = i === open;
            const panel = `${uid}-panel-${i}`;
            return (
              <div key={row.label} className="cs-row">
                <div className="cs-rule" aria-hidden="true">
                  {isOpen && running && <span key={cycle} className="cs-progress" style={{ animationDuration: `${STEP_MS}ms` }} />}
                </div>
                <h4>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => choose(i)}
                    className="cs-trigger flex w-full items-center justify-between gap-4 py-5 text-left text-lg text-fg md:text-xl"
                  >
                    {row.label}
                    <span className="cs-icon" data-open={isOpen || undefined} aria-hidden="true" />
                  </button>
                </h4>
                <div id={panel} role="region" aria-label={row.label} hidden={!isOpen} className="pb-6">
                  <p className="max-w-[52ch] text-base leading-relaxed text-fg-muted md:text-[17px]">{row.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-4">
          {study.links.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lab-link text-sm font-medium">
                {l.label} ↗
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="lab-link text-sm font-medium">
                {l.label} →
              </Link>
            ),
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <StudyImage study={study} priority={index === 0} />
      </div>
    </article>
  );
}

function StudyImage({ study, priority }: { study: ShowcaseStudy; priority: boolean }) {
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-xl ${
        study.imageFit === 'contain' ? 'bg-[#e9e4f6] dark:bg-[#2a2638]' : 'bg-bg-sunken'
      }`}
    >
      <Image
        src={study.image}
        alt={study.imageAlt}
        fill
        sizes="(min-width: 768px) 560px, 100vw"
        priority={priority}
        className={study.imageFit === 'contain' ? 'object-contain p-8' : 'object-cover'}
      />
    </div>
  );
}
