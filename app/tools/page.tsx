import type { Metadata } from 'next';
import { FadeUp } from '@/components/motion/FadeUp';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Side projects and small utilities I&apos;ve built for myself.',
};

/**
 * /tools — vibe-coded projects index.
 *
 * Not in top nav (per PROJECT_BRIEF.md). Linked from footer + homepage About paragraph.
 * Brutalist treatment is allowed here as a section technique.
 *
 * Color images allowed on tool screenshots (exemption from B&W default).
 *
 * Empty until Sanity tool entries land.
 */

const tools: Array<{
  slug: string;
  title: string;
  description: string;
  status: 'live' | 'archived' | 'private' | 'in-progress';
  externalLink?: string;
  sourceLink?: string;
}> = [];

export default function ToolsIndexPage() {
  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-[1280px] px-6 md:px-8">
        <header className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">// tools</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tightest text-fg mb-6">
            Things I built <span className="italic-break text-fg-muted">for me</span>
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Small utilities, agents, and experiments. Some live, some archived,
            some that will probably never see daylight.
          </p>
        </header>

        {tools.length === 0 ? (
          <div className="max-w-2xl">
            <div className="rounded-md border-2 border-fg shadow-brutal-md bg-bg-elevated p-10 md:p-12">
              <p className="font-mono text-sm text-fg-muted tracking-mono mb-3">
                // nothing live yet
              </p>
              <p className="text-sm text-fg leading-relaxed">
                Building in private for a bit. When something&apos;s ready to share —
                or interesting enough to write up — it&apos;ll show up here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* tool cards go here once data lands */}
          </div>
        )}
      </FadeUp>
    </div>
  );
}
