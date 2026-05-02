// shrey-lab/components/Card.tsx
//
// Usage:
//   <Card eyebrow="case study · 2025" title="Slack agent that nudges, doesn't nag">
//     <p>Body copy here</p>
//     <CardFooter>
//       <span>4 min read</span>
//       <span>shipped 03.26</span>
//     </CardFooter>
//   </Card>
//
//   <Card variant="brutal" eyebrow="sidequest" title="brewing kombucha at scale">
//     ...
//   </Card>

import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'brutal' | 'glass';
  eyebrow?: string;
  title?: React.ReactNode;
  as?: 'div' | 'article' | 'section';
}

export function Card({
  variant = 'default',
  eyebrow,
  title,
  children,
  className = '',
  as: Tag = 'article',
  ...rest
}: CardProps) {
  const baseStyles = {
    default:
      'bg-bg-elevated border border-border rounded-lg p-5 ' +
      'transition-[transform,box-shadow] duration-fast ease-out ' +
      'hover:-translate-y-0.5 hover:shadow-md',
    brutal:
      'bg-bg-elevated border-[3px] border-fg rounded-sm p-5 shadow-brutal-md ' +
      'transition-[transform,box-shadow] duration-fast ease-out ' +
      'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink-800)]',
    glass:
      'backdrop-blur-glass bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)] ' +
      'border border-[var(--glass-border)] rounded-xl p-5',
  } as const;

  return (
    <Tag className={`${baseStyles[variant]} ${className}`} {...(rest as any)}>
      {eyebrow && (
        <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-3 before:content-['//_']">
          {eyebrow}
        </div>
      )}
      {title && (
        <h3 className={`font-sans text-xl font-medium tracking-tight m-0 mb-2 text-fg ${variant === 'brutal' ? 'font-mono text-lg' : ''}`}>
          {title}
        </h3>
      )}
      {children}
    </Tag>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ children, className = '', ...rest }: CardFooterProps) {
  return (
    <div
      className={`mt-4 pt-3 border-t border-border flex justify-between font-mono text-2xs text-fg-subtle tracking-wide ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardBody({ children, className = '', ...rest }: CardBodyProps) {
  return (
    <p
      className={`text-sm text-fg-muted leading-relaxed m-0 ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
}
