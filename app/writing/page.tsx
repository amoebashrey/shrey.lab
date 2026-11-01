import { notFound } from 'next/navigation';

/**
 * /writing — hidden until the first article ships (no "coming soon",
 * CLAUDE.md). The previous empty-state page is in git history at 7f46f2e.
 */
export default function WritingIndexPage() {
  notFound();
}
