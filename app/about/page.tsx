import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { AboutPortrait } from '@/components/about/AboutPortrait';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Shreyas Jadhav — product manager, operator, sometime kombucha brewer. Pune.',
};

/**
 * /about — long-form journey, founder ventures live here as PM-relevant texture.
 *
 * Final ~600-800 word story locks after Section 7 of the inventory dump.
 * Short v1 stub renders below — better than fake content, on-brand for the
 * "/now" honesty register.
 *
 * Photo: deferred per locked decision. Until it lands, the slot carries a
 * designed line-art environmental portrait (AboutPortrait — BRAND §5's
 * sanctioned no-photo fallback) sized to the kit's photography rules
 * (medium/environmental, ~3:4), so when the real photo drops in via Sanity,
 * no layout shifts.
 */
export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <FadeUp className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Photo column — designed line-art portrait until the photo lands */}
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] rounded-lg border border-border bg-bg-sunken p-6 md:p-8">
              <AboutPortrait />
            </div>
            <p className="mt-3 text-2xs font-mono text-fg-muted tracking-mono">
              // the desk, pune · 2026 · photo coming
            </p>
          </div>

          {/* Story column */}
          <div className="lg:col-span-7 max-w-2xl">
            <p className="eyebrow mb-4">// about</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tightest text-fg mb-8">
              Shreyas <span className="italic-break text-fg-muted">Jadhav</span>
            </h1>

            <div className="space-y-5 text-base md:text-lg text-fg leading-relaxed">
              <p>
                I&apos;m a product manager at Amber, a global student housing marketplace.
                Day to day, I work on growth, conversion, and internal tooling — research,
                discovery, PRDs, the occasional Friday spent reading session recordings to
                figure out why a perfectly fine listing isn&apos;t booking.
              </p>

              <p>
                Before Amber, I spent a summer at FamPay running A/B tests on a revenue feature
                and helping launch NamasPay (UPI for foreigners) to its first 3,000 users.
                Before that, I built three things in college: a kombucha brand called
                Sattva (₹1L+ revenue, 7 SKUs, manufactured at home),{' '}
                <span className="italic-break text-fg-muted">Rada</span>, a discussion community
                that grew from five attendees to 600+ across four countries, and The Cultured
                Cult — a fermentation-and-food-science teaching practice that ran 30+ lectures
                across India&apos;s engineering schools.
              </p>

              <p>
                The throughline, when I look back at it, is the same instinct: ship a thing,
                talk to the people using it, fix what&apos;s broken. The medium changed —
                bottles to web pages — but the work didn&apos;t.
              </p>

              <p>
                I&apos;m based in Pune. I read more than I should. I write a Notion entry
                most weeks, ship code most weekends, and once gave a TEDx talk wearing a
                shirt I bought ninety minutes before going on stage.
              </p>

              <p className="pt-2 text-fg-muted">
                Long-form version coming. In the meantime —{' '}
                <Link
                  href="/work"
                  className="lab-link"
                >
                  the work
                </Link>{' '}
                or{' '}
                <Link
                  href="/contact"
                  className="lab-link"
                >
                  the contact page
                </Link>
                .
              </p>
            </div>

            {/* Elsewhere sidebar — small mono list, BRAND-faithful */}
            <div className="mt-16 pt-8 border-t border-border">
              <p className="eyebrow mb-4">// elsewhere</p>
              <ul className="space-y-2 text-sm font-mono text-fg-muted tracking-mono">
                <li>TEDx VIT Pune · TEDx PVG COET (2022)</li>
                <li>MIT SOE keynote on Product Management</li>
                <li>MIT ADTU orientation speaker · 5,000+ attendees</li>
                <li>Pune Rotary keynote on Allyship & Inclusivity</li>
                <li>Bylines: Sakal · Times of India · Femina</li>
                <li>Zee24 Taas interview (inclusivity)</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
