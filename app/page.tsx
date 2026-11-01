import { Hero } from '@/components/home/Hero';
import { Outcomes } from '@/components/home/Outcomes';
import { SelectedWork } from '@/components/home/SelectedWork';
import { HowIHelp } from '@/components/home/HowIHelp';
import { Teardowns } from '@/components/home/Teardowns';
import { FounderProof } from '@/components/home/FounderProof';
import { ContactSection } from '@/components/home/ContactSection';
import { Stagger } from '@/components/motion/Stagger';

/**
 * Homepage — a sales page for founders (docs/COPY.md, draft 3).
 *
 * Proof first, in the order a founder asks: has this person moved real
 * numbers (Outcomes), can they build (Selected work), what would they do for
 * me (How I help), how do they think (Teardowns), who are they (Founder
 * proof), how do I reach them (Contact). Every action is email or an X DM.
 *
 * Everything is visible on first paint (Stagger is CSS-only).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stagger>
        <Outcomes />
        <SelectedWork />
        <HowIHelp />
        <Teardowns />
        <FounderProof />
        <ContactSection />
      </Stagger>
    </>
  );
}
