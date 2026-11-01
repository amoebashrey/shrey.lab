import type { Metadata } from 'next';
import { FadeUp } from '@/components/motion/FadeUp';
import { ContactActions } from '@/components/ContactActions';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email or DM on X. Tell me what you’re building.',
};

/**
 * /contact — two ways in: email (the address itself is the link) and an X DM.
 * No form, no booking link: Shreyas prefers people simply reach out.
 */
export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-2xl px-4 md:px-8">
        <h1 className="mb-6 text-4xl tracking-[-0.03em] text-fg md:text-5xl">
          Tell me what you’re building
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-fg-muted">
          Email or DM, whichever’s easier. Send the problem as you’d explain it to a friend; no
          deck needed. If I’m not the right person for it, I’ll say so.
        </p>
        <ContactActions />
      </FadeUp>
    </div>
  );
}
