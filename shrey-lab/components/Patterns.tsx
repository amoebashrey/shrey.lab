// shrey-lab/components/Patterns.tsx
//
// Common content patterns: Accordion, Tabs, Pagination, EmptyState, Skeleton, Table.

import * as React from 'react';

/* ─── Accordion / Disclosure ─────────────────────────────────── */
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-fg hover:text-fg group"
      >
        <span className="font-sans text-base font-medium tracking-snug">{title}</span>
        <span
          className="font-mono text-lg text-fg-muted transition-transform duration-base ease-out group-hover:text-lime-400"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 240ms var(--ease-out)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pb-4 text-sm text-fg-muted leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
}
export function Accordion({ children }: AccordionProps) {
  return <div className="border-t border-border">{children}</div>;
}

/* ─── Tabs ───────────────────────────────────────────────────── */
interface Tab { value: string; label: string; }
interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'segmented';
}
export function Tabs({ tabs, value, onChange, variant = 'underline' }: TabsProps) {
  if (variant === 'segmented') {
    return (
      <div role="tablist" className="inline-flex p-1 rounded-md bg-bg-sunken border border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={value === tab.value}
            onClick={() => onChange(tab.value)}
            className={`font-sans text-sm px-3 py-1.5 rounded-sm transition-colors duration-fast ease-out ${
              value === tab.value
                ? 'bg-bg-elevated text-fg shadow-xs'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div role="tablist" className="flex gap-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={value === tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative font-sans text-sm pb-3 transition-colors duration-fast ease-out ${
            value === tab.value ? 'text-fg' : 'text-fg-muted hover:text-fg'
          }`}
        >
          {tab.label}
          {value === tab.value && (
            <span
              aria-hidden="true"
              className="absolute -bottom-px left-0 right-0 h-0.5 bg-lime-400"
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Pagination ─────────────────────────────────────────────── */
interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}
export function Pagination({ current, total, onChange }: PaginationProps) {
  if (total <= 1) return null;
  const pages: (number | '...')[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== '...') pages.push('...');
  }
  const baseBtn = "font-mono text-2xs px-2.5 py-1 rounded-sm border transition-colors duration-fast ease-out";
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
        className={`${baseBtn} bg-bg-elevated text-fg-muted border-border hover:text-fg hover:border-border-strong disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        ←
      </button>
      {pages.map((p, i) => p === '...' ? (
        <span key={i} className="font-mono text-2xs text-fg-subtle px-1">···</span>
      ) : (
        <button
          key={i}
          onClick={() => onChange(p)}
          aria-current={p === current ? 'page' : undefined}
          className={`${baseBtn} min-w-[28px] ${
            p === current
              ? 'bg-lime-400 text-ink-900 border-lime-500'
              : 'bg-bg-elevated text-fg border-border hover:border-border-strong'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
        className={`${baseBtn} bg-bg-elevated text-fg-muted border-border hover:text-fg hover:border-border-strong disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        →
      </button>
    </nav>
  );
}

/* ─── Empty state ────────────────────────────────────────────── */
interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  illustration?: React.ReactNode;
}
export function EmptyState({
  title = 'Nothing here yet.',
  description = 'Worth fixing.',
  action,
  illustration,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-border rounded-xl">
      {illustration && <div className="mb-4 text-fg-muted">{illustration}</div>}
      <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-2 before:content-['//_']">
        empty
      </div>
      <h3 className="font-sans text-xl font-medium tracking-tight m-0 mb-2 text-fg">{title}</h3>
      <p className="text-sm text-fg-muted m-0 mb-6 max-w-prose">{description}</p>
      {action}
    </div>
  );
}

/* ─── Skeleton (extended variants) ───────────────────────────── */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  shape?: 'rect' | 'pill' | 'circle' | 'text';
}
export function Skeleton({ width, height, shape = 'rect', className = '', style, ...rest }: SkeletonProps) {
  const heightDefault = shape === 'text' ? 14 : shape === 'circle' ? width : 16;
  const radius = shape === 'circle' || shape === 'pill' ? '9999px' :
                 shape === 'text' ? 'var(--radius-sm)' : 'var(--radius-md)';
  return (
    <div
      className={`shrey-skeleton ${className}`}
      style={{
        width,
        height: height ?? heightDefault,
        borderRadius: radius,
        background: 'linear-gradient(90deg, var(--bg-sunken) 0%, var(--border) 50%, var(--bg-sunken) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.6s linear infinite',
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-5">
      <Skeleton width="40%" height={12} className="mb-4" />
      <Skeleton width="80%" height={20} className="mb-3" />
      <Skeleton width="100%" />
      <Skeleton width="92%" className="mt-2" />
      <Skeleton width="60%" className="mt-2" />
    </div>
  );
}

/* ─── Table ──────────────────────────────────────────────────── */
interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
}
interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  caption?: string;
}
export function DataTable<T extends Record<string, any>>({
  columns, rows, caption,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-bg-sunken border-b border-border">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 font-mono text-2xs tracking-wide text-fg-muted lowercase text-${col.align ?? 'left'}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border last:border-b-0 ${i % 2 === 1 ? 'bg-bg-sunken/30' : ''} hover:bg-bg-sunken/60 transition-colors duration-fast`}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-4 py-3 text-fg text-${col.align ?? 'left'}`}
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
