# CLAUDE.md

> Project-level instructions for any Claude session (claude.ai chat, Claude Code, Cursor, Antigravity).
> Read this first, every session, before doing anything else.

---

## What this project is

**shrey.lab** — a personal portfolio website for Shreyas Jadhav, a Product Manager based in Pune, currently at Amber Student. The goal of the site is unambiguous: **land a Senior PM offer at a top product company within 6 months.** Every other goal is secondary.

The site is one piece of a larger studio identity (`shrey.lab`) that will eventually host multiple tools and sub-brands. The brand kit lives at `./shrey-lab/` and is the source of truth for anything visual or verbal.

---

## Required reading (in order, every session)

Before responding to any request that touches design, copy, structure, or technical decisions, read:

1. **`./shrey-lab/SYSTEM_PROMPT.md`** — the condensed brand operating instructions.
2. **`./shrey-lab/BRAND.md`** — the full brand strategy and visual rules.
3. **`./shrey-lab/VOICE.md`** — the copywriting and tone rubric.
4. **`./docs/PROJECT_BRIEF.md`** — the canonical, locked decisions for this specific build.
5. **`./docs/DECISION_LOG.md`** — the running log of decisions made during the build.

If any of these files conflict, **`PROJECT_BRIEF.md` wins** — it's the most recent and most specific to this project. If `PROJECT_BRIEF.md` doesn't address something, fall back to the brand kit.

---

## Tech stack (locked, do not propose alternatives)

- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Tailwind, with the preset at `./shrey-lab/tokens/tailwind.preset.js`
- **CMS:** Sanity v3 (latest stable), hosted at `studio.shrey.lab` subdomain
- **Hosting:** Vercel (with edge functions for OG image generation)
- **Domain:** `shrey.lab`
- **Calendar:** Calendly (embedded inline on `/contact`)
- **Analytics:** Vercel Analytics at launch (revisit later)
- **Email:** TBD — recommend `hello@shrey.lab` via Google Workspace

Don't suggest alternative frameworks, alternative CMSs, or alternative hosts. These are settled. If a constraint forces a reconsideration, raise it — don't quietly substitute.

---

## Routes (locked)

- `/` — homepage
- `/work` — case studies index
- `/work/[slug]` — individual case study (locked template, see PROJECT_BRIEF.md)
- `/writing` — articles index
- `/writing/[slug]` — individual article
- `/tools` — vibe-coded projects (NOT in top nav; footer + homepage links only)
- `/tools/[slug]` — individual tool deep page
- `/about` — long-form journey
- `/now` — single page, monthly updated (NOT in top nav)
- `/contact` — quiet conversion page (calendar + email + resume)

**Top nav (4 items only):** Work, Writing, About, Contact.

---

## What never to do (project-specific)

These are in addition to the brand kit's "what never to do" list — these are this site's specific bans:

- ❌ "Coming soon" placeholders. If a page isn't ready, the link doesn't ship.
- ❌ Speculative case studies presented as real ones (the old portfolio's Swiggy Dineout, EventBeep, Neosurge, PassionBits, Jar App, Minus Hunger). They're cut, not archived.
- ❌ Stock testimonials with stock photos. No "Daniel Brooks, Private Investor" type names.
- ❌ "Trusted by" logo strips that include communities/teams Shreyas co-founded.
- ❌ Filter UI on `/work` until at least 6 case studies exist.
- ❌ FAQ section.
- ❌ Lottie animations.
- ❌ Page transitions that intercept browser back/forward.
- ❌ Pop-ups, exit-intent modals, newsletter walls.
- ❌ Hero copy that performs ("One foot in strategy, one foot in chaos" — the old hero — is exactly what this site replaces).
- ❌ "More than just a PM" framing. Range goes to `/about`, not the homepage.
- ❌ A skills/superpowers list. Skills go on the resume; the work demonstrates them.
- ❌ A photo on the homepage. The photo lives on `/about`.
- ❌ More than one font family change per page beyond the brand-kit-allowed three.

---

## Voice — the load-bearing constraint

The voice cannot whiplash between case studies and the About page. Whatever lands in case studies has to feel continuous with About.

- **70% serious, 30% dry-funny.** Humor lives in 404s, empty states, footers, microcopy. Never in value props, hero copy, or case study summaries.
- **Quiet authority. No hard sell.** Assume the reader is smart.
- **Lead with the noun, not the adjective.** State what it is.
- **No buzzwords.** No empty intensifiers ("really," "very," "truly," "literally").
- **Specifics over generics.** "18% lift in booking conversions, measured over 6 weeks" beats "improved engagement."

See `VOICE.md` for the full rubric. The microcopy patterns in §3 of `VOICE.md` are the tone calibration — when in doubt, rewrite to land in that register.

---

## Audience priority (optimize in this order, never invert)

1. Senior PM hiring manager (60–120 second skim, Tuesday afternoon, skeptical)
2. Recruiter (20–40 second scan)
3. Peer PM weighing a referral (3–5 minute read)
4. Mentee/student (deprioritized — if a design choice helps Persona 1 and hurts Persona 4, hurt Persona 4)

The homepage and `/work` exist primarily for Persona 1. `/about`, `/tools`, `/now`, `/writing` carry texture and serve Personas 2–4 without compromising Persona 1.

---

## Where things live in the codebase

```
shrey-lab-portfolio/
├── shrey-lab/                    # brand kit (read-only reference)
│   ├── BRAND.md
│   ├── VOICE.md
│   ├── SYSTEM_PROMPT.md
│   ├── README.md
│   ├── tokens/
│   │   ├── tokens.css
│   │   └── tailwind.preset.js
│   ├── components/               # pre-built React components
│   └── assets/                   # logos, monogram, favicon
├── docs/                         # project documentation
│   ├── PROJECT_BRIEF.md          # canonical decisions for this build
│   └── DECISION_LOG.md           # running log of decisions
├── app/                          # Next.js App Router pages
│   ├── (public)/                 # public-facing routes
│   │   ├── page.tsx              # homepage (/)
│   │   ├── work/
│   │   ├── writing/
│   │   ├── tools/
│   │   ├── about/
│   │   ├── now/
│   │   └── contact/
│   ├── api/                      # API routes (OG image gen, RSS, etc.)
│   ├── layout.tsx
│   └── globals.css
├── components/                   # project-specific React components
├── sanity/                       # Sanity Studio + schemas
│   ├── schemas/
│   │   ├── caseStudy.ts
│   │   ├── article.ts
│   │   ├── tool.ts
│   │   ├── nowEntry.ts
│   │   └── siteSettings.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── lib/                          # utilities (Sanity client, OG generation, etc.)
├── public/                       # static assets
├── CLAUDE.md                     # this file
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

When asked to add something, place it according to this structure. If a new top-level folder seems necessary, ask before creating it — adding folders is a brand-kit-level decision.

---

## How to ask vs. how to act

**Act (don't pester for permission):**
- Styling, layout, applying the brand kit, choosing components from the kit
- Copy in the established voice
- Naming things (lowercase, mono for technical labels)
- Applying motion patterns from the brand kit
- Routine refactors and bug fixes

**Ask before doing:**
- Introducing a new brand element (a new color, a new font, a new motion pattern)
- Anything that would break a "what never to do" rule
- Changes to the locked tech stack or routes
- Decisions that are reversible at low cost but irreversible at high (e.g., schema design choices, database migrations, domain config)

Be opinionated. The brand is opinionated. Don't ask Shreyas to make every micro-decision. Make the call, explain it briefly, offer to adjust.

---

## When using web tools

Search before answering for:
- Anything Next.js, Sanity, Vercel, or Tailwind specific (versions move fast, training data is stale)
- Anything Anthropic-related (use `docs.claude.com` and `support.claude.com`)
- Anything about specific package versions, API surfaces, or pricing

Don't search for:
- The brand kit's contents (read the files directly)
- The locked decisions in `PROJECT_BRIEF.md` or `DECISION_LOG.md`
- General TypeScript/React/HTML/CSS knowledge that doesn't change

---

## Commit hygiene

Every meaningful commit gets a message that captures the *why*, not just the *what*.

- ✅ `feat(homepage): add outcomes strip with 3 amber metrics — locks Q1 from PROJECT_BRIEF`
- ❌ `add outcomes strip`
- ✅ `fix(case-study): switch back-to-work nav to sticky — solves wrong-landing-page problem (Problem 7)`
- ❌ `update nav`

When making a non-trivial decision, append it to `DECISION_LOG.md` with date and reasoning. Future-Shreyas (and future-Claude) will thank you.

---

## What this project is *not*

- Not a creative-generalist portfolio. Not a personal-brand site. Not a content marketing site. Not an audience-building project.
- Not a place to experiment with design fashion. The brand kit is locked; the goal is coherence, not novelty.
- Not a one-shot launch. The site evolves monthly (`/now`, new case studies, new tools, new writing). Build for sustainable iteration.

---

*shrey.lab — CLAUDE.md — v1.0 — created 05.01.26*
