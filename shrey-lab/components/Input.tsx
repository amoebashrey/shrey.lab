// shrey-lab/components/Input.tsx
//
// Usage:
//   <Field label="email">
//     <Input type="email" placeholder="hello@shrey.lab" />
//   </Field>
//
//   <Field label="what brought you here">
//     <Textarea placeholder="..." />
//   </Field>

import * as React from 'react';

const inputBase =
  'font-sans text-sm px-3 py-2.5 rounded-md border border-border-strong ' +
  'bg-bg-elevated text-fg placeholder:text-fg-subtle ' +
  'transition-[border-color,box-shadow] duration-fast ease-out ' +
  'focus:outline-none focus:border-lime-400 focus:shadow-[0_0_0_3px_rgba(168,225,12,0.18)]';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className = '', ...rest }, ref) {
    return <input ref={ref} className={`${inputBase} ${className}`} {...rest} />;
  }
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className = '', ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className={`${inputBase} min-h-[100px] resize-y ${className}`}
        {...rest}
      />
    );
  }
);

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, hint, error, children, className = '' }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-2xs tracking-wide text-fg-muted lowercase before:content-['//_']"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <span className="text-2xs text-fg-subtle">{hint}</span>
      )}
      {error && (
        <span className="text-2xs text-rust-500" role="alert">{error}</span>
      )}
    </div>
  );
}
