import { ImageResponse } from 'next/og';
import { NAME, ROLE } from '@/lib/site';

/**
 * Share image (og:image; X falls back to it for the large card). Static —
 * rendered at build time — and reads the role from lib/site.ts so it always
 * matches the page titles.
 */
export const alt = `${NAME}, ${ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// A short run of tiles in the default accent (hue 126, light theme): the
// hero's tile motif, kept to a signature rather than a picture.
const TILES = ['#26330e', '#516f00', '#8dab5d', '#567500', '#e9f3dd', '#567500', '#516f00'];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#181815',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 30 }}>
          <span>shrey</span>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: '#567500' }} />
          <span>lab</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{NAME}</div>
          <div style={{ fontSize: 34, color: '#4F4D47', lineHeight: 1.25, maxWidth: 1040 }}>{ROLE}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {TILES.map((c, i) => (
            <span key={i} style={{ width: 28, height: 28, borderRadius: 7, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
