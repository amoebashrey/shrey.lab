# shrey.lab — How to use this brand kit

Hi, future you. This folder is the entire visual identity for everything you ship under `shrey.lab`. It's designed so you don't have to make any visual decisions twice. You point an IDE at it, and your tools all start to look like they came from the same studio.

This README is written for the moment when you (or Claude Code) start a new project. **Read this first, every time.**

---

## What's in this folder?

```
shrey-lab/
├── BRAND.md                        ← The strategy doc. Voice, color rules, do's & don'ts.
├── README.md                       ← You are here.
├── SYSTEM_PROMPT.md                ← The prompt to paste into Claude/Claude Code/any AI.
├── VOICE.md                        ← The voice & copywriting guide. For writing, not styling.
├── styleguide.html                 ← Live preview, fully self-contained. Open in any browser.
├── tokens/
│   ├── tokens.css                  ← All colors, fonts, spacing as CSS variables
│   └── tailwind.preset.js          ← Same tokens, but for Tailwind projects
├── components/                     ← Pre-built React components
│   ├── Button.tsx                  ← Button (5 variants, 3 sizes)
│   ├── Card.tsx                    ← Card + brutal variant
│   ├── Input.tsx                   ← Input, Textarea, Field
│   ├── Layout.tsx                  ← Container, Section, Stack, Cluster, Grid, Divider
│   ├── Navigation.tsx              ← Nav, Footer, Link, Breadcrumb, Avatar
│   ├── Content.tsx                 ← Quote, Stat, ImageWithCaption, Hero, CodeBlock, Kbd
│   ├── Forms.tsx                   ← Checkbox, Radio, Switch, Select, SearchInput, Slider
│   ├── Feedback.tsx                ← Modal, Toast, Tooltip, Banner, Spinner, Progress
│   ├── Patterns.tsx                ← Accordion, Tabs, Pagination, EmptyState, DataTable
│   ├── Charts.tsx                  ← WaffleChart (signature), BarChart, Sparkline, ProgressRing
│   ├── Signature.tsx               ← Monogram, Wordmark, Eyebrow, StatusPill, FooterSignature
│   └── index.ts                    ← Barrel export — import { Button, ... } from '@/shrey-lab'
└── assets/
    ├── monogram.svg                ← The 's' mark
    ├── wordmark.svg                ← shrey.lab text logo
    └── favicon.svg                 ← Browser tab icon
```

---

## "I'm not a developer. What does each file actually do?"

Plain-English version. Skip if you're comfortable.

**`BRAND.md`** — A document explaining the *why* of every decision. Voice, when to use lime, what never to do. You'll paste this (or its path) into any AI coding assistant so it understands your taste.

**`SYSTEM_PROMPT.md`** — A short prompt you can copy-paste into a fresh Claude chat, Claude Code session, or any other AI. It tells the AI everything it needs to know to make decisions that feel like shrey.lab. Use this when you don't want to reference the full BRAND.md every time.

**`VOICE.md`** — The copywriting and tone guide. When you (or an AI) write a blog post, a tweet, a case study, or even microcopy for a button — this is the playbook. Pairs with BRAND.md but stands alone.

**`tokens.css`** — Imagine a single jar with all your colors, fonts, and spacing values labeled. Every project opens this jar and uses what's inside. If you decide to change the lime green slightly, you change it in this one file and every project updates.

**`tailwind.preset.js`** — Same jar, but in a format Tailwind (a popular styling tool) understands. If your project uses Tailwind, you use this file. If it uses plain HTML, you use `tokens.css`.

**`styleguide.html`** — A single web page that shows every component (buttons, cards, fonts, the works) rendered in your style. Open it in a browser. This is your reference card. You'll come back to it often.

**`components/`** — A folder of pre-built buttons, cards, form fields, etc. Instead of telling Claude Code "make a button," you tell it "use the Button component from shrey-lab." It's faster and stays consistent.

**`assets/`** — Your logo files. SVGs are vector — they look crisp at any size and scale infinitely.

---

## How to use this in a new project

### Step 1: Copy the folder

Whenever you start a new project — say, your portfolio — copy this whole `shrey-lab/` folder into the project. So your project structure looks like:

```
my-portfolio/
├── shrey-lab/      ← The whole folder, copied in
├── app/            ← Your project code lives here
└── package.json
```

### Step 2: Tell Claude Code about it

In the **first message** of a new Claude Code (or Antigravity, or Kiro) session, paste this:

> This project uses the **shrey.lab** brand system. Read `./shrey-lab/BRAND.md` for the full strategy, voice, and visual rules. Use the tokens from `./shrey-lab/tokens/tailwind.preset.js` and the components from `./shrey-lab/components/`. Reference `./shrey-lab/styleguide.html` to see what every component should look like.
>
> Key rules: Lime `#A8E10C` is the signature, used as accent. Backgrounds are warm-paper `#FBFAF7` (light) or warm-charcoal `#181815` (dark) — never pure white or pure black. Fonts: Geist for everything, Geist Mono for technical voice, Instrument Serif italic for editorial moments. Use the recurring signature elements (monogram, lime dot, `//` eyebrows, italic-Serif breaks in headings, `built by shrey` footer) — at least two per page.
>
> Voice: quiet authority. Dry humor only in microcopy (404, empty states, footers). Never buzzwords, never empty intensifiers.

That's it. Claude Code now has everything it needs to make decisions that feel like you.

### Step 3: Open the style guide for visual reference

Whenever you're not sure what something should look like, open `shrey-lab/styleguide.html` in a browser. Toggle between light and dark mode using the icon in the top right. You'll see every button, card, input, and color in your style.

---

## "Do I need everything, or just some of these?"

**You need all of it, but not all at once:**

- For **any project, ever:** `BRAND.md` + `tokens.css` (or `tailwind.preset.js`) + `assets/`. These three are the minimum.
- For **a React/Next.js project:** Add the `components/` folder. Saves you hours.
- For **showing someone the brand or sanity-checking a design:** Open `styleguide.html`.

When you start the portfolio (next), we'll use *everything*.

---

## Updating the brand

This is **v1.0**. As you build more tools, you'll discover patterns that need to be added (a Modal component, a Nav component, a chart style). When that happens:

1. Add the new pattern to `components/`.
2. If it introduces a new token (a new color, a new spacing value), add it to `tokens.css` *and* `tailwind.preset.js`.
3. Document it in `BRAND.md` if it's a new principle (not just a new component).
4. Bump the version in the footer of `BRAND.md` and the styleguide.

Don't change tokens lightly — every project that uses this kit inherits the change.

---

## What's NOT in this kit (yet)

- A Figma file (not needed for vibe coding — we'd add it if you start collaborating with designers)
- Page templates (we'll build these *as* we make tools — first one is the portfolio)
- A logo system for sub-brands (e.g., `shrey.lab/q-bot`) — easy to add later if you spin up a sub-brand
- Email templates, social card templates — added when you need them

---

## Quick reference — the rules in 30 seconds

1. **Backgrounds:** never pure white, never pure black. Use `--bg` token.
2. **Lime is signage, not wallpaper.** One protagonist per screen.
3. **Geist for 95% of everything.** Mono for technical, Instrument Serif italic for editorial moments.
4. **Soft-rounded corners** (`8px` / `12px`). Brutalist mode only for special sections.
5. **Always include 2+ signature elements** per page (monogram, lime dot, `//` eyebrow, italic break, footer signature).
6. **Voice:** quiet authority. Dry humor in corners only.
7. **Accessibility is non-negotiable.** Focus rings, semantic HTML, AA contrast.

If you ever forget all of this, just open `BRAND.md` § 6 ("What never to do") — that one section catches 80% of mistakes.

---

*shrey.lab brand kit — v1.0 — April 2026*
