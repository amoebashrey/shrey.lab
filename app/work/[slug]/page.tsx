import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FadeUp } from '@/components/motion/FadeUp';
import { FelixDemo } from '@/components/work/FelixDemo';

/**
 * /work/[slug] — individual case study.
 *
 * Cohesion is the point: this reuses the site's type scale, the `//` mono
 * eyebrow, the section spacing rhythm, and fg/fg-muted tokens — no new fonts,
 * no one-off components, no new visual patterns. Content is hand-written and
 * sourced from the real repos (lib/work.ts is the card-level source of truth;
 * this is the long form). Each page links to the live product.
 *
 * Only slugs in WORK_DETAIL render; everything else 404s.
 */

interface Section {
  eyebrow: string;
  heading?: string;
  body: string[];
}

interface WorkDetail {
  title: string;
  year: number;
  client: string;
  href: string;
  lead: string;
  meta: { label: string; value: string }[];
  sections: Section[];
  tags: string[];
  /** Optional hero image (real product shot), shown under the header. */
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

const WORK_DETAIL: Record<string, WorkDetail> = {
  felix: {
    title: 'Building a Slack triage bot that knows when to resolve, ask, or escalate',
    year: 2026,
    client: 'Independent',
    href: 'https://heyfelix.vercel.app',
    lead: 'A solo-built Slack bot for internal support. It reads an incoming question, retrieves from a curated knowledge base, and takes one of three paths — resolve, ask a clarifying question, or escalate to a human.',
    image: '/work/felix-hero.png',
    imageAlt:
      'Felix in Slack: a support question from Riya P. — “CRM session timed out again” — and Felix’s reply, “On it.”',
    imageCaption: '// felix in slack — the live triage surface',
    meta: [
      { label: 'role', value: 'Solo — design, build, ship' },
      { label: 'stack', value: 'Python · Flask · Slack Bolt · Supabase · Groq' },
      { label: 'year', value: '2026' },
    ],
    sections: [
      {
        eyebrow: '// the problem',
        heading: 'Answer, or get out of the way',
        body: [
          'Internal support channels fill up with the same questions, and the answers usually already exist somewhere. A bot that tries to answer everything is worse than no bot — a confidently wrong answer costs more than a slow human one.',
          'So the thing Felix had to get right wasn’t how to answer. It was whether to answer at all.',
        ],
      },
      {
        eyebrow: '// the decision',
        heading: 'Three paths',
        body: [
          'Felix takes one of three paths on every message: Resolve — answer directly from the knowledge base; Ask — request the one clarifying detail it needs; or Escalate — hand the thread to a human. Letting it escalate is the whole point: the bot is allowed to not know.',
        ],
      },
      {
        eyebrow: '// how it works',
        heading: 'Retrieval before generation',
        body: [
          'The knowledge base is 27 curated sections. Each incoming question is embedded with a BGE model and matched against the base by cosine similarity. Felix only resolves when the best match clears a 0.65 threshold; below it, it asks or escalates rather than guess.',
          'Generation runs on Groq’s Llama 3.3 70B, wrapped in a Flask service with Slack Bolt for the Slack surface and Supabase for storage.',
        ],
      },
      {
        eyebrow: '// shipped',
        heading: 'Three weeks to production',
        body: [
          'Built solo — the retrieval, the triage logic, and the Slack integration — with a first working version running in production in under three weeks. It’s live; there’s no paid adoption behind it yet. This is the honest version of what it does today.',
        ],
      },
    ],
    tags: ['Internal tools', 'AI', 'Slack', 'Python', 'Supabase'],
  },
  'pune-bookies': {
    title: 'Rebuilding a reading community’s website in Astro — faster, and editable without code',
    year: 2026,
    client: 'Pune Bookies',
    href: 'https://pune-bookies.vercel.app',
    lead: 'The website for Pune Bookies, a reading community in Pune. Re-housed in Astro with a Sanity CMS so the team can publish without touching code.',
    meta: [
      { label: 'role', value: 'Site rebuild · partnerships & ops' },
      { label: 'stack', value: 'Astro · Sanity CMS · Vercel' },
      { label: 'year', value: '2026' },
    ],
    sections: [
      {
        eyebrow: '// the brief',
        heading: 'A site the team can actually run',
        body: [
          'Pune Bookies is a reading community in Pune. The old website was slow, and it could only be changed in code — so every copy tweak waited on a developer. The brief: make it fast, and make it editable by the people who actually run the community.',
        ],
      },
      {
        eyebrow: '// the decision',
        heading: 'Re-house, don’t redesign',
        body: [
          'The design was working, so it stayed. The rebuild swapped the engine underneath it — verified pixel-for-pixel against the old site at both desktop and mobile — so the visible change is speed and self-serve editing, not a new look.',
        ],
      },
      {
        eyebrow: '// the build',
        heading: 'Astro, plus a CMS built for non-developers',
        body: [
          'The site is Astro — a base layout and around two dozen components — with every piece of copy bound to a Sanity CMS: schemas written in plain language, required alt text, character limits tied to the design. A Drive-to-Sanity sync, an inquiry pipeline with spam protection, and self-hosted fonts round it out.',
        ],
      },
      {
        eyebrow: '// the result',
        body: [
          'Near-perfect Lighthouse — 100 on accessibility, best practices, and SEO, 93 on performance — with zero layout shift, reduced-motion support, and layouts verified down to 375px. Day to day I run partnerships, ops, and community for the group; this was the engineering side of the same work.',
        ],
      },
    ],
    tags: ['Astro', 'Sanity CMS', 'Vercel', 'Performance'],
  },
};

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(WORK_DETAIL).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const detail = WORK_DETAIL[params.slug];
  if (!detail) return {};
  return { title: detail.title, description: detail.lead };
}

export default function CaseStudyPage({ params }: PageProps) {
  const detail = WORK_DETAIL[params.slug];
  if (!detail) notFound();

  const visitLabel = `Visit live`;

  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-[760px] px-6 md:px-8">
        <Link
          href="/work"
          className="eyebrow inline-block text-fg-muted hover:text-fg transition-colors duration-fast"
        >
          // ← work
        </Link>

        <header className="mt-6 mb-12 md:mb-16">
          <p className="eyebrow mb-4">
            // case study · {detail.year} · {detail.client}
          </p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tightest text-fg mb-6 leading-[1.05]">
            {detail.title}
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">{detail.lead}</p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 border-t border-border pt-6">
            {detail.meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow mb-1.5">// {m.label}</dt>
                <dd className="text-sm text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={detail.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-[var(--accent-fg)] font-medium text-sm transition-all duration-fast hover:bg-accent-hover hover:-translate-y-px"
          >
            {visitLabel}
            <span className="lab-arrow" aria-hidden="true">↗</span>
          </a>
        </header>

        {/* Real product shot — reuses the .lab-image B&W → color treatment and
            the site's border/radius tokens; sits in the header→body gap so it
            doesn't disturb the section rhythm below. */}
        {detail.image && (
          <figure className="mb-12 md:mb-16">
            <div className="lab-image relative aspect-[16/10] overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={detail.image}
                alt={detail.imageAlt ?? ''}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            {detail.imageCaption && (
              <figcaption className="eyebrow mt-3">{detail.imageCaption}</figcaption>
            )}
          </figure>
        )}

        <div className="space-y-12 md:space-y-16">
          {detail.sections.map((section) => (
            <section key={section.eyebrow}>
              <p className="eyebrow mb-3">{section.eyebrow}</p>
              {section.heading && (
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-fg mb-4">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4 text-base md:text-lg text-fg-muted leading-relaxed">
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Scripted, illustrative triage demo — Felix only */}
        {params.slug === 'felix' && (
          <div className="mt-12 md:mt-16 pt-10 border-t border-border">
            <FelixDemo />
          </div>
        )}

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {detail.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-border text-2xs font-mono text-fg-muted tracking-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom mini-bar — back + live + contact (solves wrong-landing-page) */}
        <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/work"
            className="text-sm font-mono text-fg-muted hover:text-fg transition-colors duration-fast tracking-mono"
          >
            ← all work
          </Link>
          <div className="flex items-center gap-5">
            <a
              href={detail.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-fg-muted hover:text-fg transition-colors duration-fast tracking-mono"
            >
              visit live ↗
            </a>
            <Link
              href="/contact"
              className="text-sm font-mono text-fg-muted hover:text-fg transition-colors duration-fast tracking-mono"
            >
              contact →
            </Link>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
