import Link from 'next/link';

/**
 * Founder proof — the three things Shreyas started before product was his
 * job, each with its real numbers. Replaces the old "Before product,
 * kombucha" teaser. Photos slot in above each card's name once they arrive
 * (same 4:3 crop and frame for all three); until then the cards are text only
 * rather than holding empty boxes.
 */
const VENTURES = [
  {
    name: 'Rada',
    what: 'A community for young people to gather and talk honestly.',
    stats: [
      ['300+', 'members'],
      ['4', 'countries'],
      ['40+', 'gatherings'],
    ],
    link: { label: 'Rada on Instagram', href: 'https://www.instagram.com/letsrada/' },
  },
  {
    name: 'Sattva Kombucha',
    what: 'Fermented drinks, brewed at home and sold direct.',
    stats: [
      ['500+', 'customers'],
      ['7+', 'products'],
      ['₹1L+', 'revenue'],
    ],
  },
  {
    name: 'The Cultured Cult',
    what: 'Teaching fermentation and food science at colleges across India.',
    stats: [
      ['700+', 'students'],
      ['30+', 'lectures'],
      ['4+', 'curriculums'],
    ],
  },
] as const;

export function FounderProof() {
  return (
    <section aria-labelledby="founder-heading" className="seam py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="founder-heading"
          className="mb-3 max-w-[22ch] text-balance text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg"
        >
          I’ve been building since before it was my job
        </h2>
        <p className="mb-8 max-w-[60ch] text-base leading-relaxed text-fg-muted md:mb-10 md:text-lg">
          Before product was my job, I started three things from scratch and ran every part of them
          myself: the product, the sales, the operations and the people.
        </p>

        <ul className="grid gap-5 md:grid-cols-3">
          {VENTURES.map((v) => (
            <li key={v.name} className="flex flex-col rounded-[10px] bg-bg-elevated p-6 md:p-7">
              <h3 className="text-[26px] leading-tight tracking-tight text-fg">{v.name}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{v.what}</p>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                {v.stats.map(([n, label]) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-fg-muted">{label}</dt>
                    <dd className="text-2xl font-medium leading-none tracking-tight text-fg tabular-nums">{n}</dd>
                  </div>
                ))}
              </dl>
              {'link' in v && (
                <a
                  href={v.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lab-link mt-5 self-start text-sm text-fg-muted"
                >
                  {v.link.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-base text-fg-muted">
          <span>The kombucha kit is in storage. Mostly.</span>
          <Link href="/about" className="lab-link text-fg">
            The longer story <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
