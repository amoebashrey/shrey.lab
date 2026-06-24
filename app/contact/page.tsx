import type { Metadata } from 'next';
import { ResumeButton } from '@/components/ResumeButton';
import { FadeUp } from '@/components/motion/FadeUp';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch. Hiring conversations welcome.',
};

/**
 * /contact — quiet conversion page.
 *
 * Three options presented equally per PROJECT_BRIEF.md:
 *   1. Email
 *   2. Calendly (15-min intro slot, embedded once URL is provided)
 *   3. Resume (PDF) — same modal as homepage CTA
 *
 * No form. Forms on personal sites are noise.
 */

const CALENDLY_URL = 'https://calendly.com/shreyasjadhav531/intro'; // placeholder; locks once confirmed

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
            Hiring conversations, referrals, and product chats — all welcome.
            I usually reply within a day or two.
          </p>
        </header>

        <div className="space-y-6">
          {/* Email */}
          <ContactCard
            label="// email"
            title="shreyasjadhav531@gmail.com"
            note="Best for hiring conversations, links, and longer context."
            action={
              <a
                href="mailto:shreyasjadhav531@gmail.com"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-[var(--accent-fg)] font-medium text-sm hover:bg-accent-hover hover:-translate-y-px transition-all duration-fast"
              >
                Open email →
              </a>
            }
          />

          {/* Calendly */}
          <ContactCard
            label="// calendar"
            title="15-min intro call"
            note="Pick a slot. No prep needed — just show up."
            action={
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-border-strong/30 hover:border-border-strong hover:-translate-y-px text-fg font-medium text-sm transition-all duration-fast"
              >
                Book a slot ↗
              </a>
            }
          />

          {/* Resume */}
          <ContactCard
            label="// resume"
            title="PDF, one page"
            note="Open in a modal. Download if you want a copy."
            action={<ResumeButton variant="ghost" />}
          />

          {/* X */}
          <ContactCard
            label="// x"
            title="@shreyasinpublic"
            note="Working in public — product notes, and open DMs."
            action={
              <a
                href="https://x.com/shreyasinpublic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-border-strong/30 hover:border-border-strong hover:-translate-y-px text-fg font-medium text-sm transition-all duration-fast"
              >
                Open X ↗
              </a>
            }
          />
        </div>

        <p className="mt-16 text-sm text-fg-muted text-center font-mono tracking-mono">
          // got it. i&apos;ll be in touch — usually within a day or two.
        </p>
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
  title: string;
  note: string;
  action: React.ReactNode;
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
