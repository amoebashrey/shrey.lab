import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on product, operating, and shipping.',
};

/**
 * /writing — articles index.
 *
 * Locked decision: launches empty. The empty state is the v1 surface.
 * When Sanity is wired:
 *   const articles = await sanityClient.fetch(`*[_type=="article"] | order(publishedAt desc)`);
 */
const articles: Array<{ slug: string; title: string; date: string; readingTime: string; description: string }> = [];

export default function WritingIndexPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <header className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">// writing</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tightest text-fg mb-6">
            Notes on product, operating, and <span className="italic-break text-fg-muted">shipping</span>
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Long-form when something deserves it. Short when it doesn&apos;t.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="max-w-2xl">
            <div className="rounded-lg border border-dashed border-border p-10 md:p-14 bg-bg-sunken">
              <p className="font-mono text-sm text-fg-muted tracking-mono mb-3">
                // nothing here yet. worth fixing.
              </p>
              <p className="text-sm text-fg-muted leading-relaxed">
                I&apos;m still picking the first piece. When it&apos;s up, you&apos;ll find it here.
                The <a href="/work" className="lab-link">case studies</a>{' '}
                are the better read in the meantime.
              </p>
            </div>
          </div>
        ) : (
          <ul className="space-y-6 max-w-3xl">
            {/* article rendering goes here once data lands */}
          </ul>
        )}
      </div>
    </div>
  );
}
