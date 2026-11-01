import { ContactActions } from '@/components/ContactActions';

/** The page's close: one heading, one line, email or X. */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="cs-section seam scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <h2
          id="contact-heading"
          className="mb-3 text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight text-fg"
        >
          Tell me what you’re building
        </h2>
        <p className="mb-8 max-w-[56ch] text-base leading-relaxed text-fg-muted md:text-lg">
          Email or DM, whichever’s easier. If I’m not the right person for it, I’ll say so.
        </p>
        <ContactActions />
      </div>
    </section>
  );
}
