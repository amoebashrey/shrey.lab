import type { Metadata } from 'next';
import { FelixArt, HubbleArt, PuneBookiesArt } from '@/components/work/StudyArt';
import { Teardowns } from '@/components/home/Teardowns';

export const metadata: Metadata = {
  title: 'Case-study visuals',
  robots: { index: false, follow: false },
};

/**
 * /kit/visuals — the three case-study images in the shared frame, side by
 * side, for review before they replace the card images. Not in the nav;
 * noindex. Removed once they're approved and applied.
 */
export default function VisualsKit() {
  return (
    <div className="mx-auto max-w-[1376px] px-4 py-24 md:px-8">
      <h1 className="mb-10 text-4xl tracking-tight text-fg">Case-study visuals</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['Felix', <FelixArt key="f" />],
          ['Pune Bookies', <PuneBookiesArt key="p" />],
          ['Hubble', <HubbleArt key="h" />],
        ].map(([name, art]) => (
          <div key={name as string}>
            {art}
            <p className="mt-3 text-sm text-fg-muted">{name}</p>
          </div>
        ))}
      </div>
      <div className="-mx-4 mt-16 md:-mx-8">
        <Teardowns />
      </div>
    </div>
  );
}
