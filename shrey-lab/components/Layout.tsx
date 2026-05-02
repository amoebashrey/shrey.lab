// shrey-lab/components/Layout.tsx
//
// Layout primitives. Use these instead of raw divs whenever possible.
// They keep spacing, max-widths, and rhythm consistent across every project.

import * as React from 'react';

/* ─── Container — page-width wrapper ───────────────────────────
   Centers content with consistent max-width and padding. Use as
   the outermost wrapper inside <main>. */
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  as?: 'div' | 'main' | 'section' | 'article';
}
const containerSizes = {
  sm:  'max-w-[640px]',
  md:  'max-w-[768px]',
  lg:  'max-w-[1024px]',
  xl:  'max-w-[1280px]',
  '2xl':'max-w-[1440px]',
};
export function Container({
  size = 'xl', as: Tag = 'div', className = '', children, ...rest
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto px-5 ${containerSizes[size]} ${className}`}
      {...(rest as any)}
    >
      {children}
    </Tag>
  );
}

/* ─── Section — eyebrow + heading + body wrapper ───────────────
   The canonical "section with a title" treatment. */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  bordered?: boolean;
}
export function Section({
  eyebrow, title, description, bordered = true,
  className = '', children, ...rest
}: SectionProps) {
  return (
    <section
      className={`py-16 ${bordered ? 'border-b border-border' : ''} ${className}`}
      {...rest}
    >
      {(eyebrow || title || description) && (
        <header className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
          <div>
            {eyebrow && (
              <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-2 before:content-['//_']">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-sans text-3xl font-medium tracking-tight m-0 text-fg">
                {title}
              </h2>
            )}
          </div>
          {description && (
            <p className="text-sm text-fg-muted max-w-[50ch] m-0 leading-relaxed">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

/* ─── Stack — vertical flow with consistent gap ───────────────── */
type Gap = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
const gapMap: Record<Gap, string> = {
  '1': 'gap-1', '2': 'gap-2', '3': 'gap-3', '4': 'gap-4',
  '5': 'gap-6', '6': 'gap-8', '7': 'gap-12', '8': 'gap-16',
};
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  align?: 'start' | 'center' | 'end' | 'stretch';
}
export function Stack({
  gap = '4', align = 'stretch',
  className = '', children, ...rest
}: StackProps) {
  return (
    <div
      className={`flex flex-col ${gapMap[gap]} items-${align} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─── Cluster — horizontal wrap with gap ──────────────────────── */
interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
}
export function Cluster({
  gap = '3', align = 'center', justify = 'start',
  className = '', children, ...rest
}: ClusterProps) {
  return (
    <div
      className={`flex flex-wrap ${gapMap[gap]} items-${align} justify-${justify} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─── Grid — opinionated responsive grid ──────────────────────── */
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 2 | 3 | 4 | 6 | 12;
  minColWidth?: string; // e.g. '280px' for auto-fit
  gap?: Gap;
}
export function Grid({
  cols = 3, minColWidth, gap = '4',
  className = '', children, style, ...rest
}: GridProps) {
  const gridStyle = minColWidth
    ? { gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`, ...style }
    : style;
  const colsClass = !minColWidth ? `grid-cols-${cols}` : '';
  return (
    <div
      className={`grid ${gapMap[gap]} ${colsClass} ${className}`}
      style={gridStyle}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─── Divider — horizontal rule with optional lime dot ────────── */
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'plain' | 'dot' | 'fluted';
}
export function Divider({
  variant = 'plain', className = '', ...rest
}: DividerProps) {
  if (variant === 'dot') {
    return (
      <div
        className={`flex items-center gap-3 my-8 ${className}`}
        role="separator"
        {...rest}
      >
        <hr className="flex-1 border-0 border-t border-border m-0" />
        <span className="w-1.5 h-1.5 rounded-full bg-lime-400" aria-hidden="true" />
        <hr className="flex-1 border-0 border-t border-border m-0" />
      </div>
    );
  }
  if (variant === 'fluted') {
    return (
      <div
        className={`my-8 h-2 rounded-md ${className}`}
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.5) 8px)',
          backgroundColor: 'var(--lavender-200)',
        }}
        role="separator"
        aria-hidden="true"
        {...rest}
      />
    );
  }
  return <hr className={`border-0 border-t border-border my-8 ${className}`} {...(rest as any)} />;
}

/* ─── AspectRatio — maintains an aspect ratio for child content ── */
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number; // width / height. e.g. 16/9, 4/3, 1
}
export function AspectRatio({
  ratio = 16/9, className = '', children, style, ...rest
}: AspectRatioProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: String(ratio), ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─── Spacer — explicit gap ───────────────────────────────────── */
interface SpacerProps {
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  axis?: 'vertical' | 'horizontal';
}
const spacerMap = {
  '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem',
  '5': '1.5rem', '6': '2rem', '7': '3rem', '8': '4rem', '9': '6rem',
};
export function Spacer({ size = '4', axis = 'vertical' }: SpacerProps) {
  const v = spacerMap[size];
  return (
    <div
      aria-hidden="true"
      style={axis === 'vertical' ? { height: v } : { width: v, display: 'inline-block' }}
    />
  );
}
