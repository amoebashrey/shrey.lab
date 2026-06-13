import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';

/**
 * Root metadata. Per-page metadata (case studies, articles) overrides this
 * via `generateMetadata` in their respective page.tsx files.
 *
 * The OG image at /api/og generates dynamically per page — see app/api/og/route.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://shrey-lab.vercel.app'
  ),
  title: {
    default: 'shrey.lab — Shreyas Jadhav, Product Manager',
    template: '%s · shrey.lab',
  },
  description:
    'Product manager at Amber Student. Shipped university white-label, conversion lifts, internal tooling. Based in Pune.',
  authors: [{ name: 'Shreyas Jadhav' }],
  creator: 'Shreyas Jadhav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'shrey.lab',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@shreything',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#181815' },
  ],
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Instrument Serif (italic display) and Sansita Swashed (sparing display) +
            VT323 (pixel/retro) come from Google Fonts. Geist is loaded via next/font above. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sansita+Swashed:wght@500;700&family=VT323&display=swap"
          rel="stylesheet"
        />
        {/* Theme script must run before paint — inline, not external */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg text-fg antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
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
