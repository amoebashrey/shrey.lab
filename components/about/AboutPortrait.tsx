/**
 * AboutPortrait — designed line-art stand-in for the deferred photo.
 *
 * BRAND §5 names geometric line art as the sanctioned no-photo fallback:
 * simple shapes, ~2px strokes, one lime accent. This is an environmental
 * "portrait" of the desk the site is written at — monsoon at the window,
 * laptop open, books, and the kombucha bottle from the About story brewing
 * on the desk. Inline SVG (not an <img>) so strokes ride `currentColor`
 * and adapt to both themes; the lime dots use the accent token.
 *
 * Same 3:4 slot as the future photo (via Sanity) — swap drops in with no
 * layout shift.
 */
export function AboutPortrait() {
  return (
    <svg
      viewBox="0 0 300 400"
      role="img"
      aria-label="Line drawing of a desk in Pune — laptop open, books stacked, a kombucha bottle brewing, monsoon rain at the window"
      className="h-full w-full text-fg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* window, monsoon outside */}
      <rect x="40" y="40" width="124" height="104" rx="4" />
      <line x1="102" y1="40" x2="102" y2="144" />
      <line x1="40" y1="92" x2="164" y2="92" />
      <g opacity="0.35" strokeWidth="1.5">
        <line x1="60" y1="54" x2="53" y2="72" />
        <line x1="82" y1="62" x2="75" y2="80" />
        <line x1="120" y1="52" x2="113" y2="70" />
        <line x1="142" y1="64" x2="135" y2="82" />
        <line x1="70" y1="104" x2="63" y2="122" />
        <line x1="128" y1="110" x2="121" y2="128" />
      </g>

      {/* desk */}
      <line x1="24" y1="300" x2="276" y2="300" strokeWidth="2.5" />

      {/* laptop — open, mid-writing */}
      <rect x="88" y="228" width="104" height="64" rx="3" />
      <path d="M84 300 L196 300 L188 292 L92 292 Z" />
      <g opacity="0.5" strokeWidth="2">
        <line x1="100" y1="248" x2="152" y2="248" />
        <line x1="100" y1="260" x2="138" y2="260" />
      </g>
      {/* cursor — the recurring lime signature dot */}
      <circle cx="150" cy="260" r="3" fill="var(--accent)" stroke="none" />

      {/* books */}
      <rect x="36" y="291" width="52" height="9" />
      <rect x="41" y="282" width="44" height="9" />

      {/* kombucha bottle, brewing */}
      <rect x="228" y="238" width="26" height="62" rx="7" />
      <rect x="235" y="222" width="12" height="16" rx="2" />
      <line x1="232" y1="222" x2="250" y2="222" />
      <circle cx="238" cy="268" r="2" fill="var(--accent)" stroke="none" />
      <circle cx="246" cy="282" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />

      {/* steam / ferment wisps */}
      <g opacity="0.35" strokeWidth="1.5">
        <path d="M238 212 C 236 206, 240 202, 238 196" />
        <path d="M246 214 C 244 208, 248 204, 246 198" />
      </g>
    </svg>
  );
}
