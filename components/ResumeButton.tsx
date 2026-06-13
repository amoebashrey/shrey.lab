'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * ResumeButton — opens an inline modal with the embedded PDF.
 *
 * Locked rule from PROJECT_BRIEF.md "What was added vs. original brief":
 * "PDF resume must be inline-viewable (modal with embedded PDF), not a Drive link."
 *
 * Why: a Drive link forces the visitor to leave the site, request access on
 * locked-down corp networks, or hit a Google login wall. None of that is okay
 * for a 30-second recruiter scan.
 *
 * The PDF lives at /resume.pdf (in /public). Updates by replacing the file.
 *
 * If the brand kit's <Modal /> from Feedback.tsx has the right API, swap to:
 * import { Modal } from '@/shrey-lab/components/Feedback';
 */

interface ResumeButtonProps {
  /**
   * primary  — lime CTA · ghost — outlined (hero/contact) ·
   * nav      — quiet outline pill for the nav bar ·
   * nav-row  — full-width row for the mobile nav dropdown
   */
  variant?: 'primary' | 'ghost' | 'nav' | 'nav-row';
  className?: string;
}

export function ResumeButton({ variant = 'ghost', className = '' }: ResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Unique per instance so multiple ResumeButtons (e.g. nav pill + mobile row)
  // don't emit a duplicate modal-title id.
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on backdrop click (native dialog quirk — backdrop is the ::backdrop pseudo)
  function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      setOpen(false);
    }
  }

  // Radius + padding live in the variant so each shape is self-contained.
  const baseStyles =
    'inline-flex items-center gap-2 h-11 font-medium text-sm transition-all duration-fast';

  const variantStyles = {
    primary:
      'px-5 rounded-md bg-accent text-[var(--accent-fg)] hover:bg-accent-hover hover:-translate-y-px',
    ghost:
      'px-5 rounded-md bg-transparent text-fg border border-border hover:border-border-strong hover:-translate-y-px',
    // Quiet outline pill — NOT the lime active wash (lime = active route only).
    nav: 'px-4 rounded-full bg-transparent text-fg-muted hover:text-fg border border-[var(--nav-glass-border)] hover:border-border-strong',
    // Full-width row for the mobile dropdown, matching the link rows.
    'nav-row':
      'w-full justify-between px-3 rounded-xl bg-transparent text-fg-muted hover:text-fg',
  }[variant];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[baseStyles, variantStyles, className].join(' ')}
        aria-haspopup="dialog"
      >
        Resume
        <span className="text-fg-muted text-2xs font-mono">PDF</span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        onClose={() => setOpen(false)}
        aria-labelledby={titleId}
        className="m-0 p-0 max-w-none max-h-none w-full h-full bg-transparent backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div
          className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-4xl h-[90vh] bg-bg-elevated rounded-lg shadow-xl border border-border overflow-hidden flex flex-col">
            <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-bg">
              <h2 id={titleId} className="text-sm font-mono text-fg-muted">
                // resume · shreyas jadhav
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="shreyas-jadhav-resume.pdf"
                  className="text-2xs font-mono text-fg-muted hover:text-fg transition-colors duration-fast px-2 py-1 rounded"
                >
                  download ↓
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-bg-sunken transition-colors duration-fast"
                  aria-label="Close resume"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="flex-1 bg-bg-sunken">
              {/* Embedded PDF. Browsers without PDF support get a fallback link. */}
              <object
                data="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                type="application/pdf"
                className="w-full h-full"
                aria-label="Resume PDF"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-fg-muted text-sm mb-4">
                    Your browser can&apos;t preview PDFs inline.
                  </p>
                  <a
                    href="/resume.pdf"
                    download="shreyas-jadhav-resume.pdf"
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-[var(--accent-fg)] font-medium text-sm hover:bg-accent-hover transition-colors duration-fast"
                  >
                    Download PDF ↓
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
