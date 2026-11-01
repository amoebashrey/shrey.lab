/**
 * Homepage case-study cards: one per study, each told as the problem, what I
 * built, and what happened. Used on the homepage and /work. Facts only from
 * the case studies and docs/COPY.md; no
 * numbers that aren't confirmed (Hubble's saving stays off until it is).
 */

export interface ShowcaseLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ShowcaseStudy {
  slug: string;
  name: string;
  /** One line under the name. */
  kicker: string;
  rows: ReadonlyArray<{ label: string; text: string }>;
  image: string;
  imageAlt: string;
  /** 'cover' for screenshots, 'contain' for marks on a tinted field. */
  imageFit: 'cover' | 'contain';
  links: readonly ShowcaseLink[];
}

export const SHOWCASE: readonly ShowcaseStudy[] = [
  {
    slug: 'felix',
    name: 'Felix',
    kicker: 'A Slack bot that triages support questions',
    rows: [
      {
        label: 'The problem',
        text: 'Internal support questions in Slack wait for whoever is free, even when the answer is already written down somewhere.',
      },
      {
        label: 'What I built',
        text: 'A bot that reads the question, checks a curated knowledge base, and takes one of three paths: answer it, ask a clarifying question, or hand it to a person.',
      },
      {
        label: 'What happened',
        text: 'Built solo and shipped to production, first working version in under three weeks. No paid adoption yet.',
      },
    ],
    image: '/work/felix-hero.png',
    imageAlt: 'Felix in Slack: a support question from Riya P., "CRM session timed out again", and Felix replying "On it."',
    imageFit: 'cover',
    links: [
      { label: 'Try it live', href: 'https://heyfelix.vercel.app', external: true },
      { label: 'Read the case study', href: '/work/felix' },
    ],
  },
  {
    slug: 'pune-bookies',
    name: 'Pune Bookies',
    kicker: 'A reading community’s website, editable without code',
    rows: [
      {
        label: 'The problem',
        text: 'A Pune reading community needed a website its own team could update without a developer.',
      },
      {
        label: 'What I built',
        text: 'The site from scratch in Astro, a separate page for brands and partnerships, and a Sanity CMS the team edits in.',
      },
      {
        label: 'What happened',
        text: 'It’s live and the team edits it without code. Lighthouse scores 100 on accessibility, best practices and SEO.',
      },
    ],
    image: '/work/pune-bookies-hero.png',
    imageAlt: 'The Pune Bookies homepage: a gulmohar-tree mark, the wordmark and the tagline',
    imageFit: 'cover',
    links: [
      { label: 'Visit the site', href: 'https://pune-bookies.vercel.app', external: true },
      { label: 'Read the case study', href: '/work/pune-bookies' },
    ],
  },
  {
    slug: 'hubble',
    name: 'Hubble',
    kicker: 'Rescuing an inherited ticketing bot',
    rows: [
      {
        label: 'The problem',
        text: 'An inherited Slack ticketing bot was unreliable, and the team was paying for a third-party tool it could replace.',
      },
      {
        label: 'What I built',
        text: 'I audited the live system, fixed the duplicate-ticket bug, and set a phased plan to retire the paid tool without a rewrite.',
      },
      {
        label: 'What happened',
        text: 'The duplicate-ticket fix is verified in production, and there’s a phased plan to retire the paid tool.',
      },
    ],
    image: '/work/hubble-mark.svg',
    imageAlt: 'Hubble: a line-drawn telescope mark',
    imageFit: 'contain',
    links: [{ label: 'Read the case study', href: '/work/hubble' }],
  },
];
