// shrey-lab/components/Content.tsx
//
// Content-display components. Quotes, stats, captioned images, code blocks.

import * as React from 'react';

/* ─── Quote / Pull-quote ──────────────────────────────────────── */
interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  author?: string;
  role?: string;
  size?: 'md' | 'lg';
}
export function Quote({
  author, role, size = 'md',
  className = '', children, ...rest
}: QuoteProps) {
  const textSize = size === 'lg' ? 'text-4xl' : 'text-2xl';
  return (
    <blockquote
      className={`my-12 pl-6 border-l-2 border-lime-400 ${className}`}
      {...rest}
    >
      <p
        className={`font-display italic ${textSize} leading-tight text-fg m-0 mb-4`}
      >
        {children}
      </p>
      {(author || role) && (
        <footer className="font-mono text-2xs tracking-wide text-fg-muted lowercase">
          <span aria-hidden="true">// </span>
          {author}
          {role && <span> · {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

/* ─── Stat callout — big number, mono label ────────────────────── */
interface StatProps {
  value: React.ReactNode;
  label: string;
  caption?: string;
  trend?: 'up' | 'down' | 'flat';
}
export function Stat({ value, label, caption, trend }: StatProps) {
  const trendChar = trend === 'up' ? '↑' : trend === 'down' ? '↓' : trend === 'flat' ? '→' : null;
  const trendColor = trend === 'up' ? 'text-lime-500' : trend === 'down' ? 'text-rust-400' : 'text-fg-muted';
  return (
    <div className="flex flex-col gap-1">
      <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase before:content-['//_']">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <div className="font-sans text-4xl font-medium tracking-tight text-fg">
          {value}
        </div>
        {trendChar && (
          <span className={`font-mono text-sm ${trendColor}`} aria-label={`Trend: ${trend}`}>
            {trendChar}
          </span>
        )}
      </div>
      {caption && (
        <div className="text-2xs text-fg-subtle font-mono tracking-wide">
          {caption}
        </div>
      )}
    </div>
  );
}

/* ─── Image with caption — uses the locked B&W → color rule ───── */
interface ImageWithCaptionProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  caption?: string;
  eyebrow?: string;
  ratio?: number;
  hero?: boolean;
  alwaysColor?: boolean;
}
export function ImageWithCaption({
  src, alt, caption, eyebrow, ratio = 16/9, hero = false, alwaysColor = false,
  className = '', ...rest
}: ImageWithCaptionProps) {
  const radiusClass = hero ? 'rounded-lg' : 'rounded-md';
  const filterClass = alwaysColor ? 'lab-image-color' : 'lab-image';
  return (
    <figure className={`m-0 ${className}`} {...rest}>
      <div
        className={`relative overflow-hidden ${radiusClass} border border-border bg-bg-sunken`}
        style={{ aspectRatio: String(ratio) }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover block ${filterClass}`}
        />
      </div>
      {(eyebrow || caption) && (
        <figcaption className="mt-3">
          {eyebrow && (
            <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-1 before:content-['//_']">
              {eyebrow}
            </div>
          )}
          {caption && (
            <div className="text-sm text-fg-muted leading-relaxed">{caption}</div>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Definition list — for case study facts ───────────────────── */
interface DefListProps {
  items: { term: string; definition: React.ReactNode }[];
}
export function DefList({ items }: DefListProps) {
  return (
    <dl className="grid grid-cols-[max-content,1fr] gap-x-6 gap-y-3 m-0">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <dt className="font-mono text-2xs tracking-wide text-fg-muted lowercase pt-0.5 before:content-['//_']">
            {it.term}
          </dt>
          <dd className="text-sm text-fg m-0">{it.definition}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

/* ─── Keyboard shortcut display ────────────────────────────────── */
interface KbdProps {
  keys: string[];
}
export function Kbd({ keys }: KbdProps) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k, i) => (
        <React.Fragment key={i}>
          <kbd className="font-mono text-2xs px-1.5 py-0.5 rounded-sm border border-border-strong bg-bg-elevated text-fg shadow-xs min-w-[20px] text-center">
            {k}
          </kbd>
          {i < keys.length - 1 && <span className="text-fg-subtle text-2xs">+</span>}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ─── Code block — with optional filename tab + copy button ────── */
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  /** Pass already-syntax-highlighted HTML if desired. Otherwise, raw text is shown. */
  highlightedHtml?: string;
}
export function CodeBlock({ code, language, filename, highlightedHtml }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // silent
    }
  };
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border" style={{ background: 'var(--code-bg)' }}>
      {filename && (
        <div className="flex items-center justify-between px-5 py-2 border-b border-ink-700 font-mono text-2xs text-fg-muted">
          <span className="lowercase">
            <span className="text-lime-400 mr-1">·</span>
            {filename}
          </span>
          {language && <span className="text-2xs">{language}</span>}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className={`absolute top-3 right-3 font-mono text-2xs px-2 py-1 rounded-sm border transition-colors duration-fast ease-out ${
            copied
              ? 'bg-lime-400 text-ink-900 border-lime-500'
              : 'bg-transparent text-fg-muted border-ink-600 hover:text-fg hover:border-ink-500'
          }`}
          style={{ background: copied ? undefined : 'rgba(255,255,255,0.04)' }}
        >
          {copied ? 'copied' : 'copy'}
        </button>
        <pre className="code-block m-0 p-6 overflow-x-auto" style={{ paddingTop: filename ? '1rem' : '1.5rem' }}>
          {highlightedHtml ? (
            <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}

/* ─── Hero block — pre-composed hero with all signature elements ─ */
interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  cinematic?: boolean;
}
export function Hero({ eyebrow, title, description, actions, cinematic = false }: HeroProps) {
  const wrapperClass = cinematic ? 'lab-cinematic' : 'lab-reveal-stagger';
  return (
    <section className={`py-24 ${wrapperClass}`}>
      {eyebrow && (
        <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-4 before:content-['//_']">
          {eyebrow}
        </div>
      )}
      <h1 className="font-sans font-medium tracking-tight leading-tight text-fg m-0 mb-6 max-w-[22ch]"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
        {title}
      </h1>
      {description && (
        <p className="text-lg text-fg-muted max-w-[60ch] leading-relaxed m-0 mb-8">
          {description}
        </p>
      )}
      {actions && (
        <div className="flex flex-wrap gap-3 items-center">{actions}</div>
      )}
    </section>
  );
}
