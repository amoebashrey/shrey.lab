import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Nav } from '@/components/Nav';
import { NAME, ROLE, X_HANDLE } from '@/lib/site';
import { SiteControls } from '@/components/SiteControls';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';

/**
 * Root metadata. Per-page metadata (case studies, articles) overrides this
 * via `generateMetadata` in their respective page.tsx files.
 *
 * The share image is app/opengraph-image.tsx (same title as below, from
 * lib/site.ts, so the role can't drift between them).
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://shrey-lab.vercel.app'
  ),
  title: {
    default: `shrey.lab · ${NAME}, ${ROLE}`,
    template: '%s · shrey.lab',
  },
  description: `${ROLE}. I build internal tools, AI agents and working prototypes. Based in Pune.`,
  authors: [{ name: NAME }],
  creator: NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'shrey.lab',
  },
  twitter: {
    card: 'summary_large_image',
    creator: X_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    // iOS ignores SVG favicons — without this, a home-screen bookmark gets a
    // page screenshot instead of the monogram.
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * Theme initialization script — runs synchronously before any paint to
 * prevent FOUC (flash of unstyled / wrong-themed content).
 *
 * Sets the `data-theme` attribute on <html> — the selector the brand kit's
 * tokens.css actually responds to ([data-theme="dark"] / [data-theme="light"]).
 * Reads the saved choice; with none, resolves the OS preference. Setting the
 * attribute explicitly (incl. "light") makes a manual choice beat the OS.
 */
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      // Browser chrome follows the chosen theme, not just the OS (ThemeToggle
      // updates it too). Matches the hero band at the top of the page.
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'dark' ? '#181815' : '#ffffff');
    } catch (e) {}
    // Accent hue from the colour slider (lib/accent.ts writes both keys).
    // Only well-formed "--name:value" pairs are applied.
    try {
      var hue = localStorage.getItem('accent-hue');
      var css = localStorage.getItem('accent-css');
      if (hue && css && /^[-a-z0-9:#;. ]+$/i.test(css)) {
        var root = document.documentElement;
        css.split(';').forEach(function (pair) {
          var i = pair.indexOf(':');
          if (pair.indexOf('--') === 0 && i > 2) root.style.setProperty(pair.slice(0, i), pair.slice(i + 1));
        });
        root.setAttribute('data-accent-hue', hue);
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} bg-bg`}
      suppressHydrationWarning
    >
      <head>
        {/* theme-color: one tag, set to the toggled theme by the script below
            (and by ThemeToggle). Default matches the light hero band. */}
        <meta name="theme-color" content="#ffffff" suppressHydrationWarning />
        {/* Instrument Serif (italic display) is the only webfont from Google
            Fonts — Geist + Geist Mono are self-hosted via next/font above.
            Sansita Swashed / VT323 were unused downloads; add back per-page
            if a page ever actually uses font-playful / font-pixel. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Theme script must run before paint — inline, not external */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="text-fg antialiased">
        {/* Fixed canvas texture (dot-grid + grain) — behind all content, inert.
            CursorField lives on the homepage only (app/page.tsx) — BRAND §9
            reserves the cursor glow for the home hero, one moment per site. */}
        <div className="site-texture" aria-hidden="true" />
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <SiteControls />
          {/* Offset clears the fixed floating pill (top ~20px + ~56px tall) so it
              never occludes page headings; pages add their own section padding. */}
          <main id="main" className="pt-8">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
