import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import type { FootprintLook } from '@/components/home/HeroFootprints';

export const metadata: Metadata = {
  title: 'Footprint looks',
  robots: { index: false, follow: false },
};

/**
 * /kit/footprints — the real hero with each candidate print rendering, for
 * picking one. Not in the nav; noindex. Removed once a look is chosen.
 */
const LOOKS: Record<string, { label: string; look: FootprintLook }> = {
  flat: { label: 'Flat shapes', look: { render: 'flat' } },
  t3: { label: 'Tiles, 3px', look: { render: 'tiles', tile: 3 } },
  t4: { label: 'Tiles, 4px', look: { render: 'tiles', tile: 4 } },
};

export default function FootprintKit({ searchParams }: { searchParams: { look?: string } }) {
  const key = searchParams.look && LOOKS[searchParams.look] ? searchParams.look : 'flat';
  return (
    <>
      <Hero key={key} look={LOOKS[key].look} />
      <nav
        aria-label="Footprint look"
        className="control-surface fixed bottom-4 left-4 z-[110] flex gap-1 rounded-full p-1.5 text-sm"
      >
        {Object.entries(LOOKS).map(([k, v]) => (
          <Link
            key={k}
            href={`/kit/footprints?look=${k}`}
            aria-current={k === key ? 'page' : undefined}
            className={`inline-flex h-9 items-center rounded-full px-3.5 ${
              k === key ? 'bg-fg text-bg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {v.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
