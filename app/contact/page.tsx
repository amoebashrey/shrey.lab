import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { FadeUp } from '@/components/motion/FadeUp';
import { BOOKING_URL, EMAIL, X_HANDLE, X_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email, a 20-minute call, or a DM on X. Project work and product chats welcome.',
};

/**
 * /contact — three ways in, equally weighted: email (a real mailto link, the
 * address itself is clickable), a 20-minute call (Cal.com — BOOKING_URL in
 * lib/site.ts), and X. No form. No resume card until the PDF exists.
 */

const SECONDARY =
  'inline-flex items-center gap-2 h-11 px-5 rounded-md border border-border hover:border-border-strong text-fg font-medium text-sm transition-colors duration-fast';

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-2xl px-6 md:px-8">
        <header className="mb-12 md:mb-16">
          <p className="eyebrow mb-4">// contact</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tightest text-fg mb-6">
            Get in <span className="italic-break text-fg-muted">touch</span>
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Project work, referrals and product chats are all welcome. I usually reply
            within a day or two.
          </p>
        </header>

        <div className="space-y-6">
          {/* Email — the address itself is the link */}
          <ContactCard
            label="// email"
            title={
              <a href={`mailto:${EMAIL}`} className="lab-link break-all">
                {EMAIL}
              </a>
            }
            note="Best for project briefs, links, and longer context."
            action={
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-[var(--accent-fg)] font-medium text-sm hover:bg-accent-hover transition-colors duration-fast"
              >
                Write an email →
              </a>
            }
          />

          {/* Booking (Cal.com) */}
          <ContactCard
            label="// call"
            title="20-minute intro call"
            note="Pick a slot that suits you. Bring the problem; no prep needed."
            action={
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
                Book 20 minutes ↗
              </a>
            }
          />

          {/* X */}
          <ContactCard
            label="// x"
            title={
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="lab-link">
                {X_HANDLE}
              </a>
            }
            note="DMs are open. Product notes in public."
            action={
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
                Message on X ↗
              </a>
            }
          />
        </div>
      </FadeUp>
    </div>
  );
}

function ContactCard({
  label,
  title,
  note,
  action,
}: {
  label: string;
  title: ReactNode;
  note: string;
  action: ReactNode;
}) {
  return (
    <div className="lab-glass rounded-lg p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      <div>
        <p className="eyebrow mb-2">{label}</p>
        <p className="text-lg font-medium text-fg mb-1">{title}</p>
        <p className="text-sm text-fg-muted">{note}</p>
      </div>
      <div className="md:flex-shrink-0">{action}</div>
    </div>
  );
}
