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
          <h1 className="text-4xl md:text-5xl tracking-[-0.03em] text-fg mb-6">
            Get in touch
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Project work, referrals and product chats are all welcome. I usually reply
            within a day or two.
          </p>
        </header>

        <div className="space-y-6">
          {/* Email — the address itself is the link */}
          <ContactCard
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
  title,
  note,
  action,
}: {
  title: ReactNode;
  note: string;
  action: ReactNode;
}) {
  return (
    <div className="rounded-[20px] bg-bg-elevated p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      <div>
        <p className="text-lg font-medium text-fg mb-1">{title}</p>
        <p className="text-sm text-fg-muted">{note}</p>
      </div>
      <div className="md:flex-shrink-0">{action}</div>
    </div>
  );
}
