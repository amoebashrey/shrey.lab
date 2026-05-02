// shrey-lab/components/Button.tsx
//
// Usage:
//   <Button>Get in touch</Button>
//   <Button variant="secondary">Read more</Button>
//   <Button variant="brutal">// view source</Button>
//
// Variants: primary (default), secondary, ghost, brutal, danger
// Sizes: sm, md (default), lg

import * as React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'brutal' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-snug ' +
  'transition-[background,box-shadow,color,border-color,transform] duration-fast ease-out ' +
  'active:translate-y-px focus-visible:outline-none focus-visible:shadow-focus ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-lime-400 text-ink-900 border border-lime-500 hover:bg-lime-500 hover:shadow-md',
  secondary:
    'bg-bg-elevated text-fg border border-border-strong hover:border-fg-muted hover:shadow-sm',
  ghost:
    'bg-transparent text-fg border border-transparent hover:bg-bg-sunken',
  brutal:
    'bg-bg text-fg border-2 border-fg rounded-sm shadow-brutal-sm font-mono ' +
    'hover:-translate-x-px hover:-translate-y-px hover:shadow-brutal-md ' +
    'active:translate-x-px active:translate-y-px',
  danger:
    'bg-rust-400 text-ink-0 border border-rust-500 hover:bg-rust-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-[18px] py-2.5 rounded-md',
  lg: 'text-base px-6 py-3 rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', className = '', children, ...rest },
    ref
  ) {
    const variantCls = variantClasses[variant];
    // Brutal variant overrides size's rounded-md with rounded-sm
    const sizeCls = variant === 'brutal'
      ? sizeClasses[size].replace('rounded-md', 'rounded-sm').replace('rounded-lg', 'rounded-sm')
      : sizeClasses[size];

    return (
      <button
        ref={ref}
        className={`${base} ${variantCls} ${sizeCls} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
