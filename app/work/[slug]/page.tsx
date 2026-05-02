import { notFound } from 'next/navigation';

/**
 * /work/[slug] — individual case study deep page.
 *
 * v0 behavior: all slugs return 404. Three placeholder cards exist on /work
 * with status='in-progress', meaning the cards render but don't link here.
 * If someone bookmarks an old link or types a slug directly, they hit this 404.
 *
 * Future behavior (once Sanity is wired):
 *   1. Fetch caseStudy by slug. If not found OR status !== 'published' → notFound().
 *   2. Render the locked 10-section template (PROJECT_BRIEF.md):
 *      eyebrow → title → outcome sentence → meta strip → problem → DECISION
 *      → build → outcome → reflection → tags + next case study link.
 *   3. Add the sticky-ish "back to work" + "contact" mini-bar at the bottom
 *      (Problem 7 — wrong-landing-page).
 */

interface PageProps {
  params: { slug: string };
}

export default function CaseStudyPage({ params }: PageProps) {
  // Until Sanity ships, every slug 404s.
  notFound();
}

// Pre-render no slugs at build time; all must come from Sanity.
export function generateStaticParams() {
  return [];
}
