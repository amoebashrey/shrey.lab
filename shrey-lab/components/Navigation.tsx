// shrey-lab/components/Navigation.tsx
//
// Top navigation, footer, links, breadcrumb. Glass top bar is the canonical nav.

import * as React from 'react';
import { Monogram, StatusPill, Wordmark } from './Signature';

/* ─── Nav — sticky glass top bar ───────────────────────────────── */
interface NavLink { label: string; href: string; current?: boolean; }
interface NavProps {
  links?: NavLink[];
  status?: React.ReactNode;
  rightSlot?: React.ReactNode;
}
export function Nav({ links = [], status, rightSlot }: NavProps) {
  return (
    <header
      className="sticky top-0 z-overlay backdrop-blur-glass border-b border-border px-5 py-3 flex items-center justify-between"
      style={{
        background: 'var(--glass-bg-light)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        backdropFilter: 'blur(20px) saturate(1.4)',
      }}
    >
      <a href="/" className="flex items-center gap-2 no-underline text-fg">
        <Monogram size={28} className="rounded-md" />
        <Wordmark className="text-lg" />
      </a>
      {links.length > 0 && (
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
              className={`font-sans text-sm tracking-snug no-underline transition-colors duration-fast ease-out ${
                link.current ? 'text-fg' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-3">
        {status && <StatusPill>{status}</StatusPill>}
        {rightSlot}
      </div>
    </header>
  );
}

/* ─── Footer — extended footer with column layout ──────────────── */
interface FooterColumn { title: string; links: { label: string; href: string }[]; }
interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
  year?: number;
}
export function Footer({
  columns = [],
  tagline = "A studio of one. Shipping in public.",
  year = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="mt-24 pt-16 pb-8 border-t border-border">
      <div className="grid gap-8 md:grid-cols-[2fr,3fr] mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Monogram size={36} />
            <Wordmark className="text-2xl" />
          </div>
          <p className="text-sm text-fg-muted leading-relaxed max-w-prose">
            {tagline}
          </p>
        </div>
        {columns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-3 before:content-['//_']">
                  {col.title}
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="lab-link text-sm">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pt-6 border-t border-border flex justify-between items-center flex-wrap gap-3 font-mono text-2xs tracking-wide text-fg-muted">
        <span>built by shrey<span className="text-lime-400 mx-1">·</span>{year}</span>
        <span>// brand v1.1</span>
      </div>
    </footer>
  );
}

/* ─── Link — inline & with-arrow variants ──────────────────────── */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'inline' | 'arrow' | 'underline';
  external?: boolean;
}
export function Link({
  variant = 'inline', external,
  className = '', children, ...rest
}: LinkProps) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (variant === 'arrow') {
    return (
      <a
        className={`inline-flex items-center gap-1 font-sans text-sm font-medium text-fg no-underline group ${className}`}
        {...externalProps}
        {...rest}
      >
        {children}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-fast ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      </a>
    );
  }

  if (variant === 'underline') {
    return <a className={`underline underline-offset-2 decoration-1 hover:decoration-lime-400 ${className}`} {...externalProps} {...rest}>{children}</a>;
  }

  // inline (default) — uses the lab-link wipe underline
  return <a className={`lab-link ${className}`} {...externalProps} {...rest}>{children}</a>;
}

/* ─── Breadcrumb ────────────────────────────────────────────────── */
interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-2xs tracking-wide text-fg-muted">
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <li>
              {item.href && i < items.length - 1 ? (
                <a href={item.href} className="lab-link">{item.label}</a>
              ) : (
                <span aria-current={i === items.length - 1 ? 'page' : undefined} className="text-fg">
                  {item.label}
                </span>
              )}
            </li>
            {i < items.length - 1 && (
              <li aria-hidden="true" className="text-lime-400">·</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

/* ─── Avatar ────────────────────────────────────────────────────── */
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
  status?: 'online' | 'busy' | 'away' | 'offline';
  fallback?: string;
}
const avatarSizes = { sm: 32, md: 48, lg: 64, xl: 96 };
const statusColors = {
  online: 'bg-lime-400',
  busy: 'bg-rust-400',
  away: 'bg-lavender-400',
  offline: 'bg-ink-400',
};
export function Avatar({
  src, alt = '', size = 'md', ring = false, status, fallback,
}: AvatarProps) {
  const px = avatarSizes[size];
  return (
    <div
      className={`relative inline-block rounded-full overflow-visible ${ring ? 'ring-2 ring-lime-400 ring-offset-2 ring-offset-bg' : ''}`}
      style={{ width: px, height: px }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={px}
          height={px}
          className="rounded-full block lab-image"
          style={{ width: px, height: px, objectFit: 'cover' }}
        />
      ) : (
        <div
          className="rounded-full flex items-center justify-center bg-bg-sunken text-fg-muted font-mono"
          style={{ width: px, height: px, fontSize: px / 3 }}
          aria-label={alt}
        >
          {fallback || alt.slice(0, 2).toUpperCase()}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-bg ${statusColors[status]}`}
          style={{ width: px / 4, height: px / 4 }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
