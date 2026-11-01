import { EMAIL, X_URL } from '@/lib/site';

/**
 * Footer — the wordmark, one dry line, and the ways to reach me.
 *
 * No second copy of the nav: the floating nav is always on screen. No section
 * labels: a row of links called Email, X and LinkedIn explains itself.
 */
const LINKS = [
  { label: 'Email', href: `mailto:${EMAIL}` },
  { label: 'X', href: X_URL, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyasjadhav53/', external: true },
  { label: 'GitHub', href: 'https://github.com/amoebashrey', external: true },
  { label: 'View source', href: 'https://github.com/amoebashrey/shrey.lab', external: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-14">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-base font-medium text-fg">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-fg text-bg"
              aria-hidden="true"
            >
              <span className="font-display text-lg leading-none">s</span>
            </span>
            shrey.lab
          </p>
          <p className="text-sm text-fg-muted">
            Made in Pune, {year}. The dinosaurs are doing fine.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-fg-muted transition-colors duration-fast hover:text-fg"
              >
                {l.label}
                {l.external && <span aria-hidden="true"> ↗</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
