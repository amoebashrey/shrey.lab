import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { fraunces, generalSans, gloock, sentient, switzer } from './fonts';
import './specimen.css';

/**
 * /kit/type — hero type specimen. Not in the nav, not indexed.
 *
 * The real hero (footprints running) under one candidate pairing at a time:
 *   /kit/type?set=a  Fraunces (SOFT 100, optical size auto) + Switzer
 *   /kit/type?set=a&opsz=144  same, optical size pinned to its display end
 *   /kit/type?set=b  Sentient + General Sans
 *   /kit/type?set=c  Gloock (headings only) + Switzer
 * Two families per page: the display face and the body face.
 */
export const metadata: Metadata = {
  title: 'Type specimen',
  robots: { index: false, follow: false },
};

const SETS = {
  a: { label: 'A · Fraunces + Switzer', fonts: [fraunces, switzer] },
  b: { label: 'B · Sentient + General Sans', fonts: [sentient, generalSans] },
  c: { label: 'C · Gloock + Switzer', fonts: [gloock, switzer] },
} as const;
type SetKey = keyof typeof SETS;

export default function TypeSpecimenPage({
  searchParams,
}: {
  searchParams: { set?: string; opsz?: string };
}) {
  const key: SetKey = searchParams.set === 'b' || searchParams.set === 'c' ? searchParams.set : 'a';
  const set = SETS[key];
  const pinned = key === 'a' && searchParams.opsz === '144';
  const variables = set.fonts.map((f) => f.variable).join(' ');

  return (
    <div className={`${variables} spec spec-${key}${pinned ? ' spec-opsz-144' : ''}`}>
      <Hero />
      <nav aria-label="Type sets" className="spec-switch">
        <span>{set.label}{pinned ? ' · opsz 144' : ''}</span>
        {(Object.keys(SETS) as SetKey[]).map((k) => (
          <Link key={k} href={`/kit/type?set=${k}`} aria-current={k === key && !pinned ? 'page' : undefined}>
            {k.toUpperCase()}
          </Link>
        ))}
        <Link href="/kit/type?set=a&opsz=144" aria-current={pinned ? 'page' : undefined}>
          A·144
        </Link>
      </nav>
    </div>
  );
}
