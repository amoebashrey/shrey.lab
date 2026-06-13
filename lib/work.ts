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

export type CaseStudyStatus = 'in-progress' | 'published' | 'live';

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
   */
  status: CaseStudyStatus;
  /** Live URL (for 'live') or deep-page link; null when not yet linkable. */
  href: string | null;
  /** Filter/topic tags. */
  tags: string[];
  /** Surfaced in the homepage FeaturedWork section. */
  featured: boolean;
}

/**
 * Slugs that have a written /work/{slug} detail page. When a slug is here, the
 * card links to the internal case study (which itself links out to `href`);
 * otherwise a 'live' card links straight out to `href`. Populated as detail
 * pages are written.
 */
export const SLUGS_WITH_DETAIL = new Set<string>([]);

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
  },
  {
    slug: 'pune-bookies',
    title:
      'Rebuilding a reading community’s website in Astro — faster, and editable without code',
    year: 2026,
    client: 'Pune Bookies',
    summary:
      'The website for Pune Bookies, a reading community in Pune. Re-housed in Astro with a Sanity CMS so the team can publish without touching code.',
    result:
      'Re-housed in Astro with a Sanity CMS; near-perfect Lighthouse — 100 on accessibility, best practices, and SEO.',
    status: 'live',
    href: 'https://pune-bookies.vercel.app',
    tags: ['Astro', 'Sanity CMS', 'Vercel', 'Performance'],
    featured: false,
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
  },
  {
    slug: 'amber-internal-ticketing',
    title: 'Replacing a $20K vendor by building the right thing in-house',
    year: 2024,
    client: 'amber',
    summary: '',
    result:
      'Shipped from concept to production; full adoption; ~$20K/year saved.',
    status: 'in-progress',
    href: null,
    tags: [],
    featured: true,
  },
];

/** Featured case studies for the homepage, in source order. */
export const FEATURED_CASE_STUDIES: CaseStudy[] = CASE_STUDIES.filter(
  (cs) => cs.featured
);
