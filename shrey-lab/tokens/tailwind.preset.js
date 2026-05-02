/**
 * shrey.lab — Tailwind preset
 *
 * Usage in a Next.js / Tailwind project:
 *
 *   // tailwind.config.js
 *   const shreyLab = require('./shrey-lab/tokens/tailwind.preset.js');
 *   module.exports = {
 *     presets: [shreyLab],
 *     content: ['./app/**\/*.{ts,tsx}', './components/**\/*.{ts,tsx}'],
 *   };
 *
 * Then in any component, you can write `bg-lime`, `text-rust`,
 * `font-display`, `rounded-card`, `shadow-brutal-md`, etc.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Signature
        lime: {
          50:  '#F4FCDF', 100: '#E8F9BC', 200: '#D6F488', 300: '#C2EE54',
          400: '#A8E10C', 500: '#94C90A', 600: '#7AAA08', 700: '#5C8006',
          DEFAULT: '#A8E10C',
        },
        lavender: {
          50:  '#F4F1FB', 100: '#E6DFF7', 200: '#CFC3EE', 300: '#B5A4E2',
          400: '#9C86D4', 500: '#7E68B8', 600: '#604E94',
          DEFAULT: '#9C86D4',
        },
        rust: {
          50:  '#FBEFE8', 100: '#F6D9C9', 200: '#EDB395', 300: '#E48C61',
          400: '#D6692F', 500: '#B85420', 600: '#913F18',
          DEFAULT: '#D6692F',
        },
        ink: {
          0: '#FFFFFF', 25: '#FBFAF7', 50: '#F5F4F0', 100: '#EAE8E1',
          200: '#D4D1C7', 300: '#B0ACA0', 400: '#807C72', 500: '#4F4D47',
          600: '#36352F', 700: '#25241F', 800: '#181815', 900: '#0E0E0C',
          1000: '#000000',
        },
        // Semantic — use these in components, not raw colors
        bg:           'var(--bg)',
        'bg-elevated':'var(--bg-elevated)',
        'bg-sunken':  'var(--bg-sunken)',
        'bg-inverse': 'var(--bg-inverse)',
        fg:           'var(--fg)',
        'fg-muted':   'var(--fg-muted)',
        'fg-subtle':  'var(--fg-subtle)',
        'fg-inverse': 'var(--fg-inverse)',
        border:       'var(--border)',
        'border-strong': 'var(--border-strong)',
        accent:       'var(--accent)',
        'accent-fg':  'var(--accent-fg)',
        secondary:    'var(--secondary)',
        'secondary-fg':'var(--secondary-fg)',
        danger:       'var(--danger)',
        'danger-fg':  'var(--danger-fg)',

        // Chart series — use chart-1..6 for cycling
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        'chart-3': 'var(--chart-3)',
        'chart-4': 'var(--chart-4)',
        'chart-5': 'var(--chart-5)',
        'chart-6': 'var(--chart-6)',

        // Code highlighting
        'code-bg':       'var(--code-bg)',
        'code-fg':       'var(--code-fg)',
        'code-keyword':  'var(--code-keyword)',
        'code-string':   'var(--code-string)',
        'code-comment':  'var(--code-comment)',
        'code-number':   'var(--code-number)',
        'code-function': 'var(--code-function)',
      },

      fontFamily: {
        display:  ['Instrument Serif', 'serif'],
        sans:     ['Geist', 'system-ui', 'sans-serif'],
        mono:     ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        playful:  ['Sansita Swashed', 'cursive'],
        pixel:    ['VT323', 'monospace'],
      },

      fontSize: {
        '3xs': ['0.625rem', { lineHeight: '1.4' }],
        '2xs': ['0.75rem',  { lineHeight: '1.4' }],
        xs:    ['0.8125rem',{ lineHeight: '1.5' }],
        sm:    ['0.875rem', { lineHeight: '1.5' }],
        base:  ['1rem',     { lineHeight: '1.5' }],
        lg:    ['1.125rem', { lineHeight: '1.5' }],
        xl:    ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem',  { lineHeight: '1.25' }],
        '3xl': ['2.25rem',  { lineHeight: '1.2' }],
        '4xl': ['3rem',     { lineHeight: '1.1' }],
        '5xl': ['4rem',     { lineHeight: '1.05' }],
        '6xl': ['5.5rem',   { lineHeight: '1' }],
      },

      letterSpacing: {
        tight: '-0.02em', snug: '-0.01em', normal: '0', wide: '0.04em',
      },

      borderRadius: {
        none: '0', xs: '2px', sm: '4px', md: '8px', lg: '12px',
        xl: '16px', '2xl': '24px', card: '12px', surface: '16px',
        full: '9999px',
      },

      borderWidth: {
        hairline: '0.5px', DEFAULT: '1px', '2': '2px', '3': '3px',
        brutal: '4px',
      },

      boxShadow: {
        xs: '0 1px 2px rgba(14, 14, 12, 0.04)',
        sm: '0 1px 3px rgba(14, 14, 12, 0.06), 0 1px 2px rgba(14, 14, 12, 0.04)',
        md: '0 4px 8px rgba(14, 14, 12, 0.06), 0 2px 4px rgba(14, 14, 12, 0.04)',
        lg: '0 12px 24px rgba(14, 14, 12, 0.08), 0 4px 8px rgba(14, 14, 12, 0.04)',
        xl: '0 24px 48px rgba(14, 14, 12, 0.10), 0 8px 16px rgba(14, 14, 12, 0.05)',
        'brutal-sm': '3px 3px 0 var(--ink-800)',
        'brutal-md': '5px 5px 0 var(--ink-800)',
        'brutal-lg': '8px 8px 0 var(--ink-800)',
        'glow-lime':     '0 0 0 1px #A8E10C, 0 0 24px rgba(168, 225, 12, 0.35)',
        'glow-lavender': '0 0 0 1px #9C86D4, 0 0 24px rgba(156, 134, 212, 0.30)',
        focus: '0 0 0 2px var(--bg), 0 0 0 4px #A8E10C',
      },

      backdropBlur: {
        glass:        '20px',
        'glass-strong': '40px',
      },

      transitionTimingFunction: {
        out:    'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out':'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        instant: '80ms', fast: '160ms', base: '240ms',
        slow: '400ms', page: '600ms',
      },

      spacing: {
        // 8-point grid extensions on top of Tailwind's defaults
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      maxWidth: {
        prose: '65ch',
        container: '1280px',
        wide: '1440px',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-lime': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(168, 225, 12, 0.5)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(168, 225, 12, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 240ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-lime': 'pulse-lime 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
