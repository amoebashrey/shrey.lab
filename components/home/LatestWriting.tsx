import Link from 'next/link';

/**
 * LatestWriting — three articles with date + read time.
 *
 * Per locked decision (DECISION_LOG.md "/writing: launch empty"):
 * No reframed pieces seeded at launch. Empty section uses brand-voice empty state
 * from VOICE.md ("Nothing here yet. Worth fixing.").
 *
 * When articles exist, this section renders the three most recent. Until then,
 * the empty state is on-brand and signals honesty over forced content.
 */

// Once Sanity is wired, this becomes:
// const articles = await sanityClient.fetch(`*[_type=="article"] | order(publishedAt desc)[0..2]`);
const articles: Array<{ slug: string; title: string; date: string; readingTime: string }> = [];

export function LatestWriting() {
  return (
    <section
      aria-labelledby="writing-heading"
      className="py-16 md:py-24 border-t border-border"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <header className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="eyebrow mb-3">// writing</p>
            <h2
              id="writing-heading"
              className="text-3xl md:text-4xl font-medium tracking-tight text-fg"
            >
              Latest <span className="italic-break text-fg-muted">posts</span>
            </h2>
          </div>
          {articles.length > 0 && (
            <a
              href="/writing"
              className="hidden md:inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors duration-fast group"
            >
              All writing
              <span className="transition-transform duration-fast group-hover:translate-x-0.5">
                →
              </span>
            </a>
          )}
        </header>

        {/* One empty-state recipe site-wide: dashed border, sunken, left-aligned
            (matches /writing — centered was the odd one out). */}
        {articles.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 md:p-14 bg-bg-sunken">
            <p className="font-mono text-sm text-fg-muted tracking-mono">
              // nothing here yet. worth fixing.
            </p>
            <p className="mt-3 text-sm text-fg-muted max-w-md leading-relaxed">
              Articles coming soon. In the meantime, the work in <a href="/work" className="lab-link">/work</a> is the better read.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/writing/${article.slug}`}
                  className="group block rounded-lg p-5 md:p-6 border border-border hover:border-border-strong hover:-translate-y-0.5 transition-all duration-base"
                >
                  <p className="text-2xs font-mono text-fg-muted tracking-mono mb-3">
                    {article.date} · {article.readingTime}
                  </p>
                  <h3 className="text-lg font-medium leading-snug text-fg mb-3 tracking-tight">
                    {article.title}
                  </h3>
                  <p className="text-2xs font-mono text-fg-muted tracking-mono">
                    → read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
