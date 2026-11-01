import Link from 'next/link';
import { EMAIL } from '@/lib/site';

/**
 * How I help — three ways to work together, each written as: who it's for,
 * what you get, and the proof sitting right next to it. One action at the
 * end. No prices, no time commitments that aren't confirmed.
 */
const OFFERS = [
  {
    name: 'Product teardown',
    length: 'About 5 working days',
    forYou: 'Your product is live and leaking users, and you can’t see where.',
    get: 'A recorded walkthrough of your product as a new user meets it, a prioritised list of fixes, and a clickable prototype of the top fix.',
    proof: { text: 'The teardowns below, and the 18% booking lift at Amber.', href: '#how-i-think', label: 'See the teardowns' },
  },
  {
    name: 'Prototype sprint',
    length: 'About 2 weeks',
    forYou: 'You’re about to spend engineering time on an idea and want to see it working first.',
    get: 'One flow or one AI agent, built well enough to put in front of real users.',
    proof: { text: 'Felix went from nothing to production in under three weeks.', href: '/work/felix', label: 'Read the Felix case study' },
  },
  {
    name: 'Ongoing product help',
    length: 'Month to month',
    forYou: 'You need product thinking and building hands, but not a full-time hire yet.',
    get: 'Someone who writes the spec and builds the prototype, on your product, alongside your team.',
    proof: { text: 'Hubble, where I owned the product and led the rescue.', href: '/work/hubble', label: 'Read the Hubble case study' },
  },
] as const;

export function HowIHelp() {
  return (
    <section id="how-i-help" aria-labelledby="help-heading" className="seam scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="help-heading"
          className="mb-3 text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg"
        >
          Where I can help you
        </h2>
        <p className="mb-8 max-w-[60ch] text-base leading-relaxed text-fg-muted md:mb-10 md:text-lg">
          Each one ends with something you can use, even if we never work together again.
        </p>

        <ul className="grid gap-5 md:grid-cols-3">
          {OFFERS.map((o) => (
            <li key={o.name} className="flex flex-col rounded-[10px] bg-bg-elevated p-6 md:p-7">
              <h3 className="text-[26px] leading-tight tracking-tight text-fg">{o.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">{o.length}</p>
              <dl className="mt-6 space-y-4 text-[15px] leading-relaxed">
                <div>
                  <dt className="text-sm font-medium text-fg">For you if</dt>
                  <dd className="text-fg-muted">{o.forYou}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-fg">You get</dt>
                  <dd className="text-fg-muted">{o.get}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-6">
                <div className="cs-rule mb-4" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-fg">
                  <span className="text-sm font-medium">Proof: </span>
                  {o.proof.text}
                </p>
                <Link href={o.proof.href} className="lab-link mt-2 inline-block text-sm text-fg-muted">
                  {o.proof.label} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-base text-fg-muted">
          Not sure which?{' '}
          <a href={`mailto:${EMAIL}`} className="lab-link text-fg">
            Email me what’s stuck
          </a>{' '}
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </section>
  );
}
