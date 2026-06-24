import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FadeUp } from '@/components/motion/FadeUp';
import { FelixDemo } from '@/components/work/FelixDemo';
import { HubbleArchitecture } from '@/components/work/HubbleArchitecture';

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
  /** Live URL. Omitted for internal tools with no public link (e.g. Hubble). */
  href?: string;
  /** Optional ownership one-liner, shown emphasized just under the title. */
  roleLine?: string;
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
    title: 'Building a reading community’s website in Astro — fast, and editable without code',
    year: 2026,
    client: 'Pune Bookies',
    href: 'https://pune-bookies.vercel.app',
    lead: 'The website for Pune Bookies, a reading community in Pune — designed and built from scratch. A reader-facing site, a separate brands/partnerships page, and a Sanity CMS so the team publishes and edits without touching code.',
    image: '/work/pune-bookies-hero.png',
    imageAlt:
      'Pune Bookies homepage: an illustrated gulmohar tree above the “Pune Bookies” wordmark and the line “We read together. Every Sunday, eight to ten, under a tree somewhere in Pune.”',
    imageCaption: '// pune-bookies.vercel.app — the homepage',
    meta: [
      { label: 'role', value: 'Built it — design, build, ship; partnerships, ops & community' },
      { label: 'stack', value: 'Astro · Sanity CMS · Vercel' },
      { label: 'year', value: '2026' },
    ],
    sections: [
      {
        eyebrow: '// the brief',
        heading: 'A site the team can actually run',
        body: [
          'Pune Bookies is a reading community in Pune. It needed a site that was fast, that read like the community feels, and — the part that usually gets skipped — one the people running the group could edit themselves, without waiting on a developer for every copy change.',
        ],
      },
      {
        eyebrow: '// the build',
        heading: 'Designed and built from scratch in Astro',
        body: [
          'I designed and built it from the ground up: a reader-facing site for the community and a separate brands/partnerships page for the people who want to work with it, sharing one component system. Astro keeps it static and fast; the structure is a base layout and around two dozen components.',
          'Every piece of copy is bound to a Sanity CMS, set up for non-developers: schemas written in plain language, required alt text, and character limits tied to the design so edits can’t break the layout. A Drive-to-Sanity sync, an inquiry pipeline with spam protection, and self-hosted fonts round it out.',
        ],
      },
      {
        eyebrow: '// the result',
        body: [
          'Near-perfect Lighthouse — 100 on accessibility, best practices, and SEO, 93 on performance — with zero layout shift, reduced-motion support, and layouts verified down to 375px. Day to day I also run partnerships, ops, and community for the group; this was the engineering side of the same work.',
        ],
      },
    ],
    tags: ['Astro', 'Sanity CMS', 'Vercel', 'Performance'],
  },
  hubble: {
    title: 'Rescuing an inherited Slack ticketing bot — and making it trustworthy',
    year: 2025,
    client: 'Internal',
    // No public link — Hubble is an internal Slack tool.
    roleLine:
      'Owned and led Hubble end-to-end — scoped it, diagnosed the failures, directed the build, and shipped it into live use.',
    lead: 'Slack-native internal ticketing: a thread becomes a ticket, logged to Google Sheets — built to replace a paid third-party tool.',
    meta: [
      { label: 'role', value: 'Internal-platforms product owner — led the rehabilitation' },
      { label: 'stack', value: 'Python · Flask · Slack Bolt · Google Sheets API · Render' },
      { label: 'year', value: 'Built 2025 · rehabilitated 2026' },
      { label: 'status', value: 'Shipped · internal' },
    ],
    sections: [
      {
        eyebrow: '// the problem',
        heading: 'Trusted just often enough to be a problem',
        body: [
          'Slack was the de-facto intake point for requests across several teams, but Slack has no native structure for ownership, status, or priority. A paid third-party tool filled that gap at a recurring per-seat cost. An earlier in-house replacement existed to retire that cost — but it was unreliable: a single message could spawn duplicate tickets, there were no tests, two competing code paths handled interactions, and the docs had gone stale.',
          'The mandate was narrow and honest: make the in-house tool trustworthy enough to fully replace the paid one — without a risky big-bang rewrite.',
        ],
      },
      {
        eyebrow: '// the approach',
        heading: 'Owned the judgement, not the keystrokes',
        body: [
          'I did not write the original code; I owned the product and led the rescue — the calls, the sequencing, and the verification. Implementation ran through AI coding agents under my direction and review, and every ship/rollback decision was mine.',
          'I refused to start in the editor. First a pre-build gate: is the problem real, is fixing it actually cheaper than keeping the incumbent, and what’s the defensible angle? Then I audited the running system rather than the stale docs, and diagnosed root cause before touching anything. Work was prioritized ruthlessly — stop-the-bleeding before robustness before cosmetic — and shipped on an isolated branch with one-click rollback, deployed to one live channel and smoke-tested before being trusted. Throughout, “it compiles” was never treated as “it works”: nothing was marked done without a live test.',
        ],
      },
      {
        eyebrow: '// the architecture',
        heading: 'From flaky to safe, without a rewrite',
        body: [
          'The fix wasn’t a new system — it was a disciplined reshaping of the path an event already took. Acknowledge Slack first and do the work in the background; guard against retries; make ticket creation idempotent; read the sheet once; collapse two interaction paths into one.',
        ],
      },
      {
        eyebrow: '// the bug',
        heading: 'One message, several tickets',
        body: [
          'The duplicate-ticket bug wasn’t a mysterious “AI hallucination” — there’s no model in that path. It was a textbook distributed-systems issue. Slack requires an acknowledgement within three seconds or it retries the event. The bot did all its work — including re-reading the entire Google Sheet several times — before acknowledging, so it blew the window. Slack retried; with no de-duplication, each retry ran the full creation path and an in-memory counter handed out a fresh ID — so one message became several tickets.',
          'The fix, layered: acknowledge instantly and process in the background; de-duplicate on Slack’s event identifier; and make creation idempotent — check whether a ticket already exists for the source message before making one. Deployed to a live channel and verified: one message, one ticket.',
        ],
      },
      {
        eyebrow: '// honest outcomes',
        heading: 'What shipped, and what hasn’t',
        body: [
          'Shipped and verified in production: the duplicate-ticket fix (one message → one ticket), a full structural audit that ranked every major reliability risk into a phased plan, and repo hygiene — restructured docs, dead code removed, the product renamed throughout.',
          'In progress: consolidating the duplicate interaction code, securing open endpoints, and hardening ticket-ID generation. Not yet evidenced — and reported as such: there are no adoption, SLA, or cost-savings numbers measured yet. The honest version is that reliability came first; measurement comes after.',
        ],
      },
      {
        eyebrow: '// lessons',
        body: [
          'Three things carried over. Documentation rots faster than code — I treated the inherited docs as history, not truth, and verified against the running system. “It compiles” is not “it works” — the most valuable habit was refusing to mark anything done without a live test. And the cheapest fix is often the one you decide not to build — half the value was choosing what not to do this week: no rewrite, no database migration, no touching the high-risk channels yet.',
        ],
      },
    ],
    tags: [
      'Internal tools',
      'Slack bot',
      'Python / Flask',
      'Ticketing system',
      'Legacy rehabilitation',
    ],
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
          {detail.roleLine && (
            <p className="text-lg md:text-xl font-medium text-fg leading-snug mb-4">
              {detail.roleLine}
            </p>
          )}
          <p className="text-lg text-fg-muted leading-relaxed">{detail.lead}</p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 border-t border-border pt-6">
            {detail.meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow mb-1.5">// {m.label}</dt>
                <dd className="text-sm text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>

          {detail.href ? (
            <a
              href={detail.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-[var(--accent-fg)] font-medium text-sm transition-all duration-fast hover:bg-accent-hover hover:-translate-y-px"
            >
              {visitLabel}
              <span className="lab-arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            // Internal tool — no public link. State it plainly in the mono register.
            <p className="eyebrow mt-8 inline-flex items-center gap-2 text-fg-muted">
              // internal tool · no public link
            </p>
          )}
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
              {/* Architecture diagram sits inside its narrative section — Hubble only */}
              {params.slug === 'hubble' && section.eyebrow === '// the architecture' && (
                <HubbleArchitecture />
              )}
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
            {detail.href && (
              <a
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-fg-muted hover:text-fg transition-colors duration-fast tracking-mono"
              >
                visit live ↗
              </a>
            )}
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
