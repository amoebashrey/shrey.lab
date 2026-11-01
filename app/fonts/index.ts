import localFont from 'next/font/local';

/**
 * Display face: Fraunces (SIL OFL, licence beside it), self-hosted through
 * next/font with a metric-matched Times New Roman fallback.
 *
 * The body face, Switzer, comes from Fontshare's CDN (app/layout.tsx): its
 * licence doesn't allow the files in a public repo. Its metric-matched
 * fallback lives in globals.css ('Switzer Fallback').
 */
export const fraunces = localFont({
  src: './Fraunces-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-fraunces',
  adjustFontFallback: 'Times New Roman',
});
