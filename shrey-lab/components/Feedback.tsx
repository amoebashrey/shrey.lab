// shrey-lab/components/Feedback.tsx
//
// Feedback components: Modal, Toast, Tooltip, Banner, Progress, Spinner.

import * as React from 'react';

/* ─── Modal / Dialog ──────────────────────────────────────────── */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-desc' : undefined}
      className="fixed inset-0 z-modal flex items-center justify-center p-4"
      style={{ animation: 'fade-in 240ms var(--ease-out) both' }}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-ink-900/60"
        style={{ animation: 'fade-in 240ms var(--ease-out) both' }}
      />
      <div
        className={`relative w-full ${sizes[size]} bg-bg-elevated rounded-xl border border-border shadow-xl p-6`}
        style={{ animation: 'modal-scale 240ms var(--ease-out) both' }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-bg-sunken text-fg-muted hover:text-fg flex items-center justify-center transition-colors duration-fast"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        {title && (
          <>
            <div className="font-mono text-2xs tracking-wide text-fg-muted lowercase mb-2 before:content-['//_']">
              dialog
            </div>
            <h2 id="modal-title" className="font-sans text-2xl font-medium tracking-tight m-0 mb-2">
              {title}
            </h2>
          </>
        )}
        {description && (
          <p id="modal-desc" className="text-sm text-fg-muted mb-4 leading-relaxed">{description}</p>
        )}
        {children}
      </div>
      <style>{`
        @keyframes modal-scale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── Toast ──────────────────────────────────────────────────── */
type ToastTone = 'info' | 'success' | 'error' | 'warning';
interface ToastProps {
  tone?: ToastTone;
  title: string;
  description?: string;
  onDismiss?: () => void;
}
const toastIcons: Record<ToastTone, string> = {
  info: 'ℹ', success: '✓', error: '!', warning: '!',
};
const toastTones: Record<ToastTone, string> = {
  info: 'border-border',
  success: 'border-lime-500',
  error: 'border-rust-500',
  warning: 'border-rust-300',
};
export function Toast({ tone = 'info', title, description, onDismiss }: ToastProps) {
  return (
    <div
      role="status"
      className={`pointer-events-auto bg-bg-elevated border ${toastTones[tone]} rounded-lg shadow-lg px-4 py-3 flex items-start gap-3 min-w-[280px] max-w-sm`}
      style={{ animation: 'toast-in 400ms var(--ease-spring) both' }}
    >
      <span
        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-2xs font-mono ${
          tone === 'success' ? 'bg-lime-400 text-ink-900' :
          tone === 'error' ? 'bg-rust-400 text-ink-0' :
          tone === 'warning' ? 'bg-rust-200 text-rust-600' :
          'bg-bg-sunken text-fg-muted'
        }`}
        aria-hidden="true"
      >
        {toastIcons[tone]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-fg leading-snug">{title}</div>
        {description && <div className="text-2xs text-fg-muted mt-0.5 leading-snug">{description}</div>}
      </div>
      {onDismiss && (
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          className="text-fg-subtle hover:text-fg shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── Tooltip ────────────────────────────────────────────────── */
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
}
export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={`absolute z-overlay pointer-events-none whitespace-nowrap font-mono text-2xs tracking-wide bg-ink-800 text-ink-25 px-2 py-1 rounded-sm border border-ink-700 shadow-md ${sideClasses[side]}`}
          style={{ animation: 'tooltip-in 160ms var(--ease-out) both' }}
        >
          {content}
        </span>
      )}
      <style>{`
        @keyframes tooltip-in {
          from { opacity: 0; transform: scale(0.96) translateY(2px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </span>
  );
}

/* ─── Banner / Alert (persistent) ────────────────────────────── */
type BannerTone = 'info' | 'success' | 'warning' | 'error';
interface BannerProps {
  tone?: BannerTone;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
}
const bannerStyles: Record<BannerTone, string> = {
  info: 'bg-bg-sunken border-border text-fg',
  success: 'bg-lime-100 border-lime-200 text-lime-700',
  warning: 'bg-rust-100 border-rust-200 text-rust-600',
  error: 'bg-rust-100 border-rust-300 text-rust-600',
};
export function Banner({ tone = 'info', title, children, onDismiss }: BannerProps) {
  return (
    <div role="alert" className={`flex items-start gap-3 px-4 py-3 rounded-md border ${bannerStyles[tone]}`}>
      <div className="flex-1 min-w-0">
        {title && <div className="text-sm font-medium leading-snug mb-0.5">{title}</div>}
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
      {onDismiss && (
        <button aria-label="Dismiss" onClick={onDismiss} className="opacity-60 hover:opacity-100 shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Spinner ────────────────────────────────────────────────── */
interface SpinnerProps {
  size?: number;
  label?: string;
}
export function Spinner({ size = 20, label = 'Loading' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className="inline-block"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="var(--lime-400)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ animation: 'spin 0.9s linear infinite', transformOrigin: 'center' }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
    </span>
  );
}

/* ─── Progress bar ───────────────────────────────────────────── */
interface ProgressProps {
  value?: number; // 0–100; omit for indeterminate
  label?: string;
}
export function Progress({ value, label }: ProgressProps) {
  const isIndeterminate = value === undefined;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className="flex justify-between font-mono text-2xs tracking-wide text-fg-muted">
          <span className="lowercase before:content-['//_']">{label}</span>
          {!isIndeterminate && <span>{Math.round(value)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-1.5 rounded-full bg-bg-sunken overflow-hidden"
      >
        {isIndeterminate ? (
          <span
            className="absolute top-0 left-0 h-full w-1/3 bg-lime-400 rounded-full"
            style={{ animation: 'progress-indeterminate 1.4s var(--ease-in-out) infinite' }}
          />
        ) : (
          <span
            className="block h-full bg-lime-400 rounded-full transition-[width] duration-base ease-out"
            style={{ width: `${Math.min(100, Math.max(0, value!))}%` }}
          />
        )}
      </div>
      <style>{`
        @keyframes progress-indeterminate {
          0% { left: -33%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
