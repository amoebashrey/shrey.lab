# shrey.lab — portfolio

Personal portfolio for Shreyas Jadhav. Next.js 14 + Sanity + Vercel.
Goal: land a Senior PM offer in 6 months.

For project context, read `CLAUDE.md` first, then `docs/PROJECT_BRIEF.md`,
then `docs/DECISION_LOG.md`. Brand kit lives at `shrey-lab/`.

## Setup

You need:
- Node 20+
- npm 10+
- The brand kit at `./shrey-lab/` (copied in from your local brand design system folder, **renamed to `shrey-lab` with no spaces**)
- A resume PDF at `./public/resume.pdf`
- A favicon at `./public/favicon.svg` (copy from `shrey-lab/assets/favicon.svg`)

```bash
# 1. Install
npm install

# 2. Copy your brand kit in (rename folder if needed)
# Make sure the path is exactly ./shrey-lab/ (no spaces, lowercase)

# 3. Copy your resume PDF to public/
cp ~/path/to/resume.pdf public/resume.pdf

# 4. Run dev server
npm run dev
```

Open http://localhost:3000

## Status — v0.1 (foundation chunk)

What's built:
- ✅ Next.js 14 + App Router + TypeScript scaffolding
- ✅ Tailwind config consuming the brand kit preset
- ✅ Root layout with theme toggle, FOUC prevention, font loading
- ✅ Top nav (4 items: Work, Writing, About, Contact) + glass on scroll
- ✅ Footer (signature + secondary nav + contact + view source)
- ✅ Homepage with all 7 locked sections (hero, status pill, outcomes, featured work, about teaser, latest writing, now teaser)
- ✅ /work index with placeholder cards
- ✅ /work/[slug] route (404s until CMS lands)
- ✅ /writing index with empty state
- ✅ /writing/[slug] route (404s)
- ✅ /about with photo placeholder + story stub
- ✅ /now using locked format with brutalist treatment
- ✅ /tools with empty state
- ✅ /tools/[slug] route (404s)
- ✅ /contact with three equal options (email, calendar, resume)
- ✅ 404 page in shrey.lab voice
- ✅ Resume modal (inline PDF, not Drive link)

What's next (in order of session priority):
1. Sanity v3 + Studio at `studio.shrey.lab`
2. Sanity schemas (caseStudy, article, tool, nowEntry, siteSettings)
3. Wire all hardcoded content to Sanity
4. Per-page OG image generation via @vercel/og
5. RSS feed at /rss.xml
6. Sitemap
7. First real case study deep page (template)

## Project structure

```
shrey-lab-portfolio/
├── shrey-lab/                    # brand kit — copy in from local folder
│   ├── BRAND.md, VOICE.md, README.md, SYSTEM_PROMPT.md
│   ├── tokens/
│   │   ├── tokens.css            # CSS variables, fonts, .lab-image hover
│   │   └── tailwind.preset.js    # Tailwind theme
│   ├── components/               # Button, Card, Charts, Content, etc.
│   ├── assets/                   # favicon, monogram, wordmark SVGs
│   └── styleguide.html
├── docs/
│   ├── PROJECT_BRIEF.md          # canonical decisions
│   └── DECISION_LOG.md           # append-only history
├── app/                          # Next.js App Router
│   ├── layout.tsx                # root layout, fonts, theme init
│   ├── page.tsx                  # homepage
│   ├── work/page.tsx             # /work index
│   ├── work/[slug]/page.tsx      # case study deep page (404s)
│   ├── writing/, about/, now/, contact/, tools/
│   ├── not-found.tsx             # 404
│   └── globals.css               # Tailwind layers + tokens import
├── components/                   # site-specific React
│   ├── Nav.tsx, Footer.tsx
│   ├── ResumeButton.tsx, StatusPill.tsx
│   ├── home/                     # homepage section composers
│   └── work/                     # CaseStudyCard, etc.
├── lib/                          # (future: sanity client, og helpers)
├── public/                       # resume.pdf, favicon.svg, og defaults
├── CLAUDE.md                     # AI session instructions
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## Voice & visual rules

Don't change any of these without reading the brand kit first:
- Backgrounds are warm-paper or warm-charcoal — never pure white/black
- Lime is signage, not wallpaper. One protagonist per screen.
- Geist for 95%, Geist Mono for technical voice, Instrument Serif italic for editorial breaks
- Images B&W by default, saturate to color on hover (.lab-image)
- 70% serious / 30% dry-funny. Humor in 404s, empty states, footers — never in headlines.

## Deploy

```bash
# Push to github.com/amoebashrey/shrey.lab
git add . && git commit -m "feat: foundation chunk — homepage + nav + 404"
git push origin main

# Then on Vercel:
# 1. Import the repo
# 2. Framework preset: Next.js
# 3. Environment variables: (none yet — Sanity comes later)
# 4. Deploy. Defaults to shrey-lab.vercel.app.
```

When you buy `shrey.lab`, point its DNS at Vercel — 5 minutes, no code change.
