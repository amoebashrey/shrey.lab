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

export type CaseStudyStatus = 'in-progress' | 'published';

export interface CaseStudy {
  /** URL-safe id; also the [slug] segment for the deep page. */
  slug: string;
  /** The long, decision-led headline shown on the card. */
  title: string;
  /** Year the work shipped. */
  year: number;
  /** Company / client the work was for. */
  client: string;
  /** Short descriptor. Awaiting copy — not rendered yet. */
  summary: string;
  /** The metric / outcome line shown under the title. */
  result: string;
  /** 'in-progress' cards render but don't link out; 'published' link to href. */
  status: CaseStudyStatus;
  /** Deep-page link. null until the case study is published. */
  href: string | null;
  /** Filter/topic tags. Empty until populated. */
  tags: string[];
  /** Surfaced in the homepage FeaturedWork section. */
  featured: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
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
