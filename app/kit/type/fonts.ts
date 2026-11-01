import localFont from 'next/font/local';

/**
 * Candidate type pairings for the specimen. All self-hosted through
 * next/font/local: font-display swap, and a metric-adjusted fallback
 * (size-adjust / ascent / descent overrides on Times New Roman or Arial) so
 * swapping in the real face doesn't shift the layout.
 *
 * Fraunces and Gloock: SIL OFL (licence files beside them).
 * Switzer, Sentient, General Sans: ITF Free Font License (Fontshare) —
 * self-hosting allowed, but the files are kept out of the public repo
 * (app/fonts/fontshare/ is gitignored).
 */

export const fraunces = localFont({
  src: '../../fonts/Fraunces-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-fraunces',
  adjustFontFallback: 'Times New Roman',
});

export const gloock = localFont({
  src: '../../fonts/Gloock-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-gloock',
  adjustFontFallback: 'Times New Roman',
});

export const switzer = localFont({
  src: '../../fonts/fontshare/Switzer-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-switzer',
  adjustFontFallback: 'Arial',
});

export const sentient = localFont({
  src: '../../fonts/fontshare/Sentient-Variable.woff2',
  weight: '200 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-sentient',
  adjustFontFallback: 'Times New Roman',
});

export const generalSans = localFont({
  src: '../../fonts/fontshare/GeneralSans-Variable.woff2',
  weight: '200 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-general-sans',
  adjustFontFallback: 'Arial',
});
