import Link from 'next/link';

/**
 * Footer — locked structure from PROJECT_BRIEF.md.
 *
 * Left column: monogram + wordmark + "built by shrey · {year}" in mono.
 * Middle column: secondary nav (Work, Writing, About, Tools, Now, RSS, Resume).
 * Right column: contact (email with lime dot replacing @) + social + view source.
 *
 * The "View source" link is intentional — it's a craft signal to the persona-1
 * hiring manager who clicks. Repo flips to public at launch.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="mt-30 border-t border-border bg-bg"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left column — signature */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* Monogram square — soft-cornered charcoal with italic s + lime dot */}
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-fg text-bg"
                aria-hidden="true"
              >
                <span className="font-display italic text-base leading-none mr-px">s</span>
                <span className="w-1 h-1 rounded-full bg-accent" />
              </span>
              <span className="font-sans font-medium text-base">
                shrey<span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mx-0.5 align-middle" aria-hidden="true" />lab
              </span>
            </div>
            <p className="text-2xs font-mono text-fg-muted tracking-mono">
              built by shrey · {year}
            </p>
            <p className="text-sm text-fg-muted max-w-xs leading-relaxed">
              A studio for shipping useful, considered tools.
            </p>
          </div>

          {/* Middle column — secondary nav */}
          <nav aria-label="Footer" className="space-y-3">
            <p className="eyebrow">// pages</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {/* RSS removed (no feed/articles yet) and the raw Resume PDF link
                  removed (redundant with the persistent nav Resume button + the
                  /contact resume; the PDF asset is also currently missing — see
                  report). Re-add both when their content/asset lands. */}
              {[
                { label: 'Work', href: '/work' },
                { label: 'Writing', href: '/writing' },
                { label: 'About', href: '/about' },
                { label: 'Tools', href: '/tools' },
                { label: 'Now', href: '/now' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fg-muted hover:text-fg transition-colors duration-fast"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right column — contact + social + view source */}
          <div className="space-y-3">
            <p className="eyebrow">// elsewhere</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:shreyasjadhav531@gmail.com"
                  className="text-fg-muted hover:text-fg transition-colors duration-fast inline-flex items-center"
                >
                  shreyasjadhav531
                  <span className="inline-block w-1 h-1 rounded-full bg-accent mx-1.5" aria-hidden="true" />
                  gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shreyasjadhav53/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-fg transition-colors duration-fast"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amoebashrey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-fg transition-colors duration-fast"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amoebashrey/shrey.lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-2xs text-fg-subtle hover:text-fg-muted transition-colors duration-fast"
                >
                  // view source
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
