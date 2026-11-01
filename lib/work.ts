/**
 * lib/work.ts — single source of truth for case-study data.
 *
 * Both the homepage (FeaturedWork) and the /work index read from here.
 * When Sanity lands, this file gets replaced by a typed query result with the
 * same shape, so consuming components don't change.
 *
 * Copy is migrated verbatim from the previous inline arrays. `summary` and
 * `tags` are part of the future schema but have no source copy yet — left
 * empty rather than fabricated (no speculative content, per CLAUDE.md).
 */

export type CaseStudyStatus = 'in-progress' | 'published' | 'live' | 'internal';

export interface CaseStudy {
  /** URL-safe id; also the [slug] segment for the deep page. */
  slug: string;
  /** The long, decision-led headline shown on the card. */
  title: string;
  /** Year the work shipped. */
  year: number;
  /** Company / client the work was for. */
  client: string;
  /** Short descriptor. */
  summary: string;
  /** The metric / outcome line shown under the title. */
  result: string;
  /**
   * 'in-progress' — card renders but doesn't link out.
   * 'live'        — shipped product; card links to the live `href` (new tab),
   *                 unless a detail page exists (see SLUGS_WITH_DETAIL).
   * 'published'   — internal case study at /work/{slug}.
   * 'internal'    — shipped, but an internal tool with no public link. Links to
   *                 its /work/{slug} detail page; never links out.
   */
  status: CaseStudyStatus;
  /** Live URL (for 'live') or deep-page link; null when not yet linkable. */
  href: string | null;
  /** Filter/topic tags. */
  tags: string[];
  /** Surfaced in the homepage FeaturedWork section. */
  featured: boolean;
  /**
   * Hero image for the card's `.lab-image` slot (B&W → color on hover). A real
   * product visual — a screenshot of the shipped thing. Absent → line-art
   * placeholder. Mirrors the future Sanity `coverImage` field.
   */
  image?: string;
  /** Alt text for `image`. */
  imageAlt?: string;
  /**
   * Card image treatment. Default (undefined) uses `image` as a full-bleed
   * screenshot. 'brand-tile' centers `brandMark` (a logo) with the `client`
   * wordmark below, on an on-brand tile — for products whose identity is a mark,
   * not a screenshot.
   */
  cardStyle?: 'brand-tile';
  /** Small brand mark (logo / mascot) shown as a chip over the hero. */
  brandMark?: string;
  /** Alt text for `brandMark` (decorative when paired with a captioned image). */
  brandMarkAlt?: string;
}

/**
 * Slugs that have a written /work/{slug} detail page. When a slug is here, the
 * card links to the internal case study (which itself links out to `href`);
 * otherwise a 'live' card links straight out to `href`. Populated as detail
 * pages are written.
 */
export const SLUGS_WITH_DETAIL = new Set<string>(['felix', 'pune-bookies', 'hubble']);

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'felix',
    title:
      'Building a Slack triage bot that knows when to resolve, ask, or escalate',
    year: 2026,
    client: 'Independent',
    summary:
      'A solo-built Slack bot for internal support. It reads an incoming question, retrieves from a curated knowledge base, and takes one of three paths — resolve, ask a clarifying question, or escalate to a human.',
    result:
      'Solo-built and shipped to production; first working version in under three weeks.',
    status: 'live',
    href: 'https://heyfelix.vercel.app',
    tags: ['Internal tools', 'AI', 'Slack', 'Python', 'Supabase'],
    featured: true,
    // Real assets: a clean capture of the live Slack-thread hero
    // (heyfelix.vercel.app) + the product mascot. See public/work/.
    image: '/work/felix-hero.png',
    imageAlt: 'Felix in Slack: a support question from Riya P. — “CRM session timed out again” — and Felix’s reply, “On it.”',
    brandMark: '/work/felix-mascot.png',
    brandMarkAlt: 'Felix mascot',
  },
  {
    slug: 'pune-bookies',
    title:
      'Building a reading community’s website in Astro — fast, and editable without code',
    year: 2026,
    client: 'Pune Bookies',
    summary:
      'The website for Pune Bookies, a reading community in Pune — designed and built from scratch. A reader-facing site, a separate brands/partnerships page, and a Sanity CMS so the team publishes and edits without touching code.',
    result:
      'Built on Astro with a Sanity CMS; near-perfect Lighthouse — 100 on accessibility, best practices, and SEO.',
    status: 'live',
    href: 'https://pune-bookies.vercel.app',
    tags: ['Astro', 'Sanity CMS', 'Vercel', 'Performance'],
    featured: false,
    // Real asset: the Pune Bookies gulmohar-tree logo (favicon.svg from the
    // repo), centered with the wordmark on a calm brand tile — not a screenshot.
    cardStyle: 'brand-tile',
    brandMark: '/work/pune-bookies-mark.svg',
    brandMarkAlt: 'Pune Bookies — the gulmohar-tree logo',
  },
  {
    slug: 'amber-university-white-label',
    title:
      'Unlocking a zero-CAC acquisition channel by treating university websites as a discovery surface',
    year: 2024,
    client: 'amber',
    summary: '',
    result:
      'Scaled across 30+ university pages; ~50% user conversion at zero paid CAC.',
    status: 'in-progress',
    href: null,
    tags: [],
    featured: true,
    // No shippable screenshot yet (study in progress). Designed line-art mark
    // per BRAND §5 so the featured row reads intentional, not unfinished —
    // a university browser frame with the embedded white-label surface.
    cardStyle: 'brand-tile',
    brandMark: '/work/amber-white-label-mark.svg',
    brandMarkAlt:
      'A browser frame with an embedded booking surface marked in lime',
  },
  {
    slug: 'amber-property-listing-conversion',
    title:
      'Diagnosing image quality as the hidden conversion lever for low-performing listings',
    year: 2024,
    client: 'amber',
    summary: '',
    result:
      '18% booking conversion lift after the UX rollout, working cross-functionally with data and inventory.',
    status: 'in-progress',
    href: null,
    tags: [],
    featured: true,
    // No shippable screenshot yet (study in progress). Designed line-art mark
    // per BRAND §5 — the listing-photo grid that turned out to be the
    // conversion lever, one frame carrying the photo + lime accent.
    cardStyle: 'brand-tile',
    brandMark: '/work/amber-listing-mark.svg',
    brandMarkAlt: 'A grid of listing photos, one marked in lime',
  },
  {
    slug: 'hubble',
    title:
      'Rescuing an inherited Slack ticketing bot — and making it trustworthy',
    year: 2025,
    client: 'Internal',
    summary:
      'A Slack-native internal ticketing bot — each thread becomes a ticket, logged to Google Sheets. Inherited unreliable and stabilized to replace a paid third-party tool, without a big-bang rewrite.',
    result:
      'Owned the rescue end-to-end: audited the live system, diagnosed and fixed the duplicate-ticket bug (verified in production), and set a phased plan to retire the paid tool.',
    status: 'internal',
    href: null,
    tags: [
      'Internal tools',
      'Slack bot',
      'Python / Flask',
      'Ticketing system',
      'Legacy rehabilitation',
    ],
    featured: false,
    // No real brand assets exist for Hubble (internal tool). The card uses a
    // designed, on-brand telescope mark (Hubble's Slack icon is a telescope),
    // built only from the design system. See public/work/hubble-mark.svg.
    image: '/work/hubble-mark.svg',
    imageAlt: 'Hubble — a line-drawn telescope mark on a lavender field',
  },
];

/**
 * Case studies a visitor can see: anything still 'in-progress' (no page, no
 * write-up behind the number) stays hidden until it's real — no "coming soon".
 */
export const PUBLISHED_CASE_STUDIES: CaseStudy[] = CASE_STUDIES.filter(
  (cs) => cs.status !== 'in-progress'
);

/** Homepage selection: every published study (3 today), in source order. */
export const FEATURED_CASE_STUDIES: CaseStudy[] = PUBLISHED_CASE_STUDIES;
