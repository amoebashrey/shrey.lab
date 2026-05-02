# shrey.lab — Brand System

> The studio of Shreyas. Polished, opinionated, slightly nerdy. Built for shipping useful tools that feel like they came from the same hand.

This document is the **single source of truth** for anything visual or verbal that ships under the shrey.lab name. When starting a new project with Claude Code, Antigravity, or Kiro, paste this file (or reference its path) into your IDE's context. Every decision below should be respected unless explicitly overridden for a specific project.

---

## 1. Strategy

### Why
To build useful, considered tools — and prove that one product builder, working in public, can ship things that look and feel as polished as a small studio's output.

### How
By treating every artifact (a portfolio, a Slack bot, a utility, a screenshot) as part of a coherent body of work. Same colors, same type, same voice. Recognizable in five seconds.

### What
A growing collection of vibe-coded tools, productivity utilities, agents, and experiments — each one stamped with the shrey.lab signature.

### Onlyness statement
*Shrey.lab is the only studio where a former PM-turned-builder ships polished, opinionated tools in public — pairing FAANG-level product instinct with the speed of vibe coding.*

### Audience priority
1. **Hiring managers & founders** evaluating Shreyas as a product hire or collaborator.
2. **Other product builders** who follow the work and might use the tools.
3. **Enterprises & leadership** considering Shreyas for advisory or contract work.
4. **Curious general public** who land via a viral tool or social post.

Everything we ship has to read as *credible* to audience #1 within five seconds, while still feeling *human* to audience #4.

### Brand archetypes (Jung / Mark)
- **Primary:** *The Creator* — driven by craft, self-expression, and bringing new things into the world.
- **Secondary:** *The Sage* — values clarity, mastery, and sharing what's been learned.

We are **not** the Jester (too goofy), the Hero (too earnest), or the Everyman (too generic).

### Brand personality (Aaker)
- High **Competence** (reliable, intelligent, successful)
- Medium-high **Sophistication** (refined, premium, but not cold)
- Medium **Excitement** (imaginative, up-to-date, but not frantic)
- Low **Sincerity** in the cheesy sense — we don't do "wholesome." Dry, considered warmth instead.
- Low **Ruggedness** — this is not an outdoorsy or rough brand.

---

## 2. Voice & Tone

### The vibe in one paragraph
Imagine a slightly nerdy, well-dressed late-twenty-something on a clean metro — confident, carefree but intentional, knows their value, doesn't need to perform it. That's the voice. **Quiet authority. No hard sell.** A dry sense of humor that surfaces in microcopy and footers, never in headlines. We assume the reader is smart.

### Tone matrix (Nielsen Norman)
- **Funny ↔ Serious:** 70% serious, 30% dry-funny. Humor lives in 404 pages, empty states, and footers — never in value props.
- **Formal ↔ Casual:** Casual but precise. "We" and "I" both work. Contractions yes. Slang sparingly.
- **Respectful ↔ Irreverent:** Respectful, with occasional well-aimed irreverence (mostly toward bad UX, big-corp websites, and template aesthetics).
- **Enthusiastic ↔ Matter-of-fact:** Matter-of-fact. We don't use "amazing," "incredible," or excessive exclamation points. The work speaks.

### Writing rules
1. **Lead with the noun, not the adjective.** "A productivity app" beats "A revolutionary productivity app."
2. **Active voice. Short sentences. Then a longer one for rhythm.**
3. **No empty intensifiers.** Cut "really," "very," "truly," "literally."
4. **No buzzwords.** "Synergy," "leverage," "10x," "game-changing" — all banned.
5. **Specifics beat generics.** "A Slack bot that nudges you about your top three priorities daily" beats "An AI productivity assistant."
6. **Microcopy can be dry-funny.** Headlines, value props, and case study summaries stay sober.

### Microcopy examples

**404 page**
> Well, this is awkward.
> The page you're looking for either never existed or quietly retired. Want to head back?

**Empty state (no projects yet)**
> Nothing here yet. Worth fixing.

**Form submitted**
> Got it. I'll be in touch — usually within a day or two.

**Error toast**
> Something broke on my end. Try again, and if it keeps happening, tell me.

**Loading**
> Thinking... *(or for longer waits:)* Doing the thing.

### Words & phrases we use vs. don't

| ✓ Use | ✗ Avoid |
|---|---|
| Built, shipped, made | Crafted, curated (overused) |
| Tool, utility, app | Solution, platform |
| Work, project, case study | Portfolio piece |
| Get in touch, reach out | Connect, sync |
| I, we | The team (when there's no team) |

---

## 3. Visual Identity

### Aesthetic direction
**Refined-playful technical.** Think: Apple's restraint × Linear's precision × Anthropic's editorial warmth × occasional brutalist accents to keep things from getting too sterile.

The **default** is balanced, slightly spacious, soft-rounded, premium. Brutalist mode (thicker borders, hard offset shadows, monospace, exposed grids) is a **special section technique** — used for things like "behind the scenes," changelogs, technical deep-dives, or sidequest pages. Never the whole site.

### Color system

#### The signature
**Lime `#A8E10C`** is the protagonist. Used like neon signage — never wallpaper. A button. A dot. A single underline. A glow on the active nav item. If you're tempted to make a large surface lime, stop and use lime sparingly as an accent on a charcoal or paper-warm-white surface instead.

#### The full palette

| Role | Token | Hex | Where it shows up |
|---|---|---|---|
| **Signature** | `lime-400` | `#A8E10C` | Primary CTA, monogram dot, key emphasis |
| Lime hover | `lime-500` | `#94C90A` | Button hover state |
| Lime tint | `lime-100` | `#E8F9BC` | Selected backgrounds, highlights |
| **Secondary** | `lavender-400` | `#9C86D4` | Tags, secondary surfaces, quiet accents |
| Lavender tint | `lavender-100` | `#E6DFF7` | Card backgrounds in special sections |
| **Warm accent** | `rust-400` | `#D6692F` | Destructive actions, warm emphasis, illustrations |
| **Light mode bg** | `ink-25` | `#FBFAF7` | Default body — warm paper, never pure white |
| **Dark mode bg** | `ink-800` | `#181815` | Default dark body — warm charcoal, never pure black |
| **Body text** | `ink-800` (light mode) / `ink-25` (dark mode) | — | All long-form reading |
| **Muted text** | `ink-500` / `ink-300` | — | Secondary copy, captions, timestamps |

#### Color rules
- **One protagonist per screen.** Don't mix lime + lavender + rust in equal weights — pick which one is leading.
- **Dark text on lime, never white.** Lime is too light to carry white text legibly (fails AA). Use `ink-900` on lime.
- **Backgrounds are never pure white or pure black.** `ink-25` and `ink-800` are tuned slightly warm. This single rule prevents the "AI template" look more than any other.
- **Tints (`-50`, `-100`) for backgrounds, mids (`-400`) for accents, deeps (`-600`+) almost never used directly.**

### Typography

Five faces, each with a defined job. Mixing is intentional — never use more than three on a single page.

| Face | Where | Why |
|---|---|---|
| **Geist** (sans) | Body, UI labels, navigation, 95% of everything | Modern, technical, has stylistic alternates that read like Berkeley Mono's cleaner cousin |
| **Geist Mono** | Code, metadata (`v0.3 · 2 min read`), eyebrows (`// projects`), technical voice | Signals "made by someone who codes" without trying too hard |
| **Instrument Serif** | Italic display moments, the monogram, the occasional quote pull | Adds editorial warmth — keeps the brand from feeling cold-tech |
| **Sansita Swashed** | Sparingly — playful section dividers, a fun stat callout | The "I have a personality" face. Use **once per page maximum.** |
| **VT323** | Easter eggs, terminal/CLI vibes in technical sections, loading states | Pixel-retro. Use only when content is technical or playful. |

#### Type scale (Major Third, 1.250)
Sticking to scale prevents the "every heading a different size" amateur look.

```
text-3xs  10px  – legal, fine print
text-2xs  12px  – metadata, eyebrows
text-xs   13px  – captions, table cells
text-sm   14px  – secondary UI
text-base 16px  – body
text-lg   18px  – lead paragraph
text-xl   22px  – small heading / large UI
text-2xl  28px  – section heading
text-3xl  36px  – page heading
text-4xl  48px  – feature heading
text-5xl  64px  – hero (desktop)
text-6xl  88px  – hero display (sparingly)
```

#### Type rules
- **Tight tracking on display sizes** (`-0.02em` and below). Headlines should look like they're holding hands.
- **Optical kerning is on by default** via `font-feature-settings: "ss01", "cv11"` for Geist.
- **Italic Instrument Serif** is a *rhythm device* — drop one italic phrase into a sans heading to break up monotony. Example: *"Built for"* shipping fast.
- **Eyebrows use `//` prefix** in mono, lowercase, `text-2xs`, `tracking-wide`, `fg-muted`. Recurring tic. Keep it.

### Spacing & layout
- **8-point grid.** Use the spacing tokens. No `margin: 13px`.
- **Default density: balanced and slightly spacious.** Generous whitespace around hero areas, comfortable in content blocks.
- **Brutalist sections override:** thicker borders (`border-brutal`, 4px), tighter spacing, hard offset shadows. Used as accent treatment, not whole pages.
- **Container widths:** 1280px max for content. Hero sections can break to full-bleed.

### Corners & borders
- **Default radius: 8px (md)** for buttons and inputs. **12px (lg / card)** for cards. **16px+ (xl, 2xl)** for hero panels.
- **Borders are thin (1px) and subtle** by default — `border` token.
- **Brutalist mode:** 4px solid borders + offset shadow (e.g., `shadow-brutal-md`). Reserved for things like the "now" page, changelog, sidequest cards.
- **Pill shapes** for chips and tags only.

### Shadows
- **Default: soft and barely-there** (`shadow-sm` to `shadow-md`).
- **`shadow-lg` and `shadow-xl`** only for floating overlays (modals, popovers).
- **Brutalist offset shadows** (`shadow-brutal-md` etc.) for accent cards in special sections — pair with thick borders.
- **Glow shadows** (`shadow-glow-lime`) reserved for *one* hero element per page maximum. Used on the active state of the current project, the "currently building" indicator, etc.

### Glassmorphism
- Used for **navigation bars, modal backgrounds, and hover-revealed surfaces** that float over content.
- Recipe: `backdrop-filter: blur(20px) saturate(1.4)` + `--glass-bg-light/dark` + 1px `--glass-border`.
- Don't use glass on cards or large content surfaces — it muddies readability.
- **Fluted glass** (vertical line texture, used as a hero backdrop or section divider) is welcome but should appear on **no more than one section per page.**

### Motion
- **Default duration: 160ms (`fast`)**, easing `ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Micro-interactions everywhere.** Buttons translate 1px on press. Cards lift `2px` on hover. Links underline on hover with a 200ms reveal.
- **Page-load reveal:** stagger fade-up on hero elements (60ms increments). One orchestrated entrance beats scattered animations.
- **No bounce.** Spring easings only for occasional reveals (the lime dot when "currently building" updates, etc.).
- **Reduce-motion respected.** All animations honor `prefers-reduced-motion`.

### Iconography
- **Lucide** for UI icons. 1.5px stroke. 16px / 20px / 24px sizes only.
- **Emoji** allowed in the right context (case study eyebrows, sidequest tags, social cards). Don't sprinkle.
- **Custom icons** — when Lucide doesn't have what you need:
  - Stroke-based, not filled. **1.5px stroke** to match Lucide visual weight.
  - Single-color — inherits from `currentColor` so the surrounding context drives the color.
  - Built on a **24×24 grid** with key points snapping to multiples of 4.
  - **Optional lime accent dot** in one corner makes an icon feel "shrey.lab." Use this on icons that represent a tool you've built, never on generic UI icons.
  - No gradients, no shadows. Icons stay crisp.

### Image treatment (locked rule)
- **Default:** all imagery on the site is **black & white** (`grayscale(100%)` + `contrast(1.05)`).
- **On hover:** images transition back to **full color** over 400ms (`ease-out`). This is the system's most distinctive recurring micro-interaction.
- **Touch devices:** no hover, so images appear in full color by default (`@media (hover: none)`).
- **Opt-out class:** `.lab-image-color` — for images that must always be in color (charts, brand assets, screenshots where color carries meaning).
- **Default radius:** `radius-md` (8px). Hero images use `radius-lg` (12px).
- **Border:** 1px `--border` when on `--bg` (paper), no border when on `--bg-elevated`.

### Photography rules
- **For the personal/about-me shot:** medium shot or environmental portrait — never a tight headshot. Show context (a workspace, a metro, a doorway). Side-lit, slightly underexposed natural light. Real environments with depth, not plain walls. Off-center subject (rule of thirds). One signature accessory (glasses, a bag).
- **For case study imagery:** product screenshots in color (no filter), but framed inside a B&W "browser frame" if shown contextually. Process photos (sketches, sticky notes) get the B&W → saturate-on-hover treatment. Hero product shots earn full color.

---

## 4. The recurring signature

Every shrey.lab artifact carries **at least one** of these signals so that someone seeing two unrelated tools can tell they share a maker:

1. **The monogram** — soft-cornered charcoal square with italic `s` + lime dot. Lives in nav and footer.
2. **The lime dot.** Anywhere a period or separator could go (`shrey.lab`, `v0.3 · live`, `hello@…`), it's a literal lime circle. Tiny. Persistent.
3. **The `//` eyebrow.** Mono, lowercase, muted, above section headings. (`// projects`, `// now`, `// archive`)
4. **The italic break.** One *italicized phrase* in Instrument Serif inside an otherwise sans heading.
5. **The footer signature.** `built by shrey · {year}` with monogram. Mono. Always present.

**Use at least two of these per page.** It's the cheapest, most powerful way to make work feel like one studio's output.

---

## 5. Illustration & visual elements

When you need something more than UI icons — a hero illustration, an empty-state graphic, a sub-brand logo, a custom diagram — these are the rules.

### Default mode: geometric line art
- Built from simple shapes: circles, lines, soft rectangles, arcs.
- **1.5px–2px strokes** (matches the iconography weight).
- Single accent color — usually lime, occasionally lavender or rust. Stroke uses `currentColor`.
- Composed on the same 24-unit grid as icons, but at any size.
- Works in both light and dark mode by inheriting `currentColor`.
- Fast to generate (Claude/Figma/AI tools all handle this style well).

### Hero mode: 3D abstract objects
**Reserved for hero moments only — one per page maximum.** Used when something needs to feel expensive (the home hero, a major case study opener, a launch moment).
- Soft-rendered glass, lime liquid forms, abstract floating geometric shapes.
- Built in tools like Spline, Blender, or commissioned. Not vibe-codeable.
- Always sits on a charcoal or gradient-mesh background to maximize the premium feel.
- If you don't have a real 3D asset for a hero, fall back to default mode (geometric line art) — never use a stock photo.

### Illustration primitives
For composing custom illustrations fast, the kit ships with reusable SVG primitives: lime dots, lavender squares, rust lines, geometric arcs. Combine them rather than starting from scratch.

---

## 6. Data visualization

When a tool shows charts (productivity dashboards, metrics, analytics), these are the rules.

### Color order
Multi-series charts cycle through colors in this order — never invent a new order per chart:
1. `--chart-1` = lime-400 (the protagonist)
2. `--chart-2` = lavender-400
3. `--chart-3` = rust-400
4. `--chart-4` = ink-500 (a quiet neutral)
5. `--chart-5` = lime-200 (light lime tint)
6. `--chart-6` = lavender-200 (light lavender tint)

If a chart needs more than 6 series, the chart needs to be redesigned, not extended.

### Chart types
- **Line:** 2px stroke, no markers by default. For area variants, fill at 12% opacity under the line.
- **Bar:** bars at `radius-sm` (4px top corners only — flat at the baseline). 60% bar width.
- **Waffle / square grid:** the signature shrey.lab chart. A 10×10 grid (or any N×N) of small squares. Each square represents 1% (or 1/N²). Filled squares show the value, ghost squares (`--border`) show the remainder. Use this for proportions, percentages, "X out of Y" stats. **More distinctive than a pie chart and more intuitive.**
- **Stat callout:** when a single number tells the story, use a stat callout, not a chart. Big number in Geist sans 4xl, label in mono below.
- **Pie / donut:** avoided. Bar charts are clearer.

### Background, axes, grid
- No chart background fill — chart sits directly on `--bg` or `--bg-elevated`.
- Gridlines: `--chart-grid` at 50% opacity, dashed (`stroke-dasharray: 2 4`).
- Axis labels: Geist Mono, 11px, `--chart-axis` (= `--fg-muted`).
- No chart titles inside the chart — use a section heading + eyebrow above.

### Tooltips on hover
- Floating glass card (uses `--glass-bg-light` / `--glass-bg-dark` + backdrop blur).
- Content in Geist Mono. Lime line drops from cursor to x-axis to anchor the read.

### Empty state
A dashed-border placeholder with `// no data yet` in mono, lime dot pulsing in the corner.

---

## 7. Code blocks & syntax highlighting

When a case study or tool shows code, these are the rules.

### Visual treatment
- Background: `--code-bg` (= `ink-900`, slightly deeper than dark-mode bg, sits like a "well")
- Font: Geist Mono, 14px (`text-sm`), with `tracking-mono` letter-spacing
- Border radius: `radius-lg` (12px)
- Padding: `space-5` (24px)
- Optional filename tab above: `// app/page.tsx` in mono with a lime dot prefix

### Syntax colors
| Token | Color | Var |
|---|---|---|
| Keywords (`const`, `function`, `if`) | lime-400 | `--code-keyword` |
| Strings | lavender-300 | `--code-string` |
| Comments | ink-400, italic | `--code-comment` |
| Numbers / booleans | rust-300 | `--code-number` |
| Function names | lime-300 | `--code-function` |
| HTML/JSX tags | lavender-400 | `--code-tag` |
| Variables / identifiers | ink-25 | `--code-variable` |
| Operators / punctuation | ink-200 | `--code-operator` |

### Inline code
For `<code>` inside prose: warm tint background (`--bg-sunken`), rust foreground (`rust-500` light / `rust-300` dark), 1px border. Distinct from prose without being loud.

### Copy button
Top-right of every code block. Mono "copy" label. Turns lime + says "copied" for 2s after click.

---

## 8. Social share images (OG)

The 1200×630 image that appears when you paste a link to your tool on LinkedIn/Twitter/Slack.

### Template
- **Background:** `--bg-inverse` (warm charcoal `ink-800`). Optional gradient mesh for hero/case-study shares.
- **Top-left:** monogram (28px) + wordmark (Geist sans, medium weight)
- **Center-left, large:** page title in Geist sans, 72px, with **one italic Instrument Serif word** for the editorial break
- **Bottom-left:** Geist Mono small label — `// case study`, `// utility · 2026`, `// now playing`
- **Bottom-right:** single lime dot, tiny — the recurring signature
- Padding: 64px on all sides

### Implementation
For Next.js: use `@vercel/og` with the OG template HTML included in the kit (`og-template.html`). For static sites: render the template once per page via the included `og-render.js` script.

---

## 9. Motion language

Motion is a recurring signal — when interactions move the same way across all your tools, it ties them together. These are locked.

### Page-load reveal
- **Default (every page):** sequential fade-up. Each major section fades in 8px from below over 400ms, with a 60ms stagger between sections. By the time you scroll, everything has settled.
- **Home page only:** cinematic load. A lime line draws across the top of the hero in 600ms, then content fades up 200ms behind it. **One page only.**

### Scroll-triggered reveals
**None by default.** Once the page has loaded, scrolling feels calm and instant — no animations triggered by scroll position. Project galleries on the home page may use a one-time staggered card reveal as content enters the viewport, but that's the only exception.

### Hover orchestration
Cards and clickable elements animate **three things in concert** on hover (the shrey.lab signature hover):
1. The card lifts -2px Y, shadow deepens.
2. Any image inside saturates from B&W to color over 400ms.
3. The arrow `→` (if present) translates +2px X.

The choreography matters — three subtle shifts feel intentional in a way one big motion never does.

### Page transitions
**None.** Browser default. Page transitions add complexity, break back/forward expectations, and rarely add value. Skip them.

### Micro-interactions (the details that matter)
| Moment | Motion | Duration | Easing |
|---|---|---|---|
| Button press | translate Y +1px | 80ms | instant |
| Link hover | underline wipes in left-to-right | 240ms | ease-out |
| Input focus | border → lime + 3px lime glow ring | 160ms | ease-out |
| Toggle / switch | knob slides + bg crossfades | 240ms | ease-in-out |
| Toast in | slide from bottom-right with overshoot | 400ms | spring |
| Toast out | slide down + fade | 240ms | ease-out |
| Theme toggle | all colors crossfade (not swap) | 300ms | ease-out |
| Modal open | backdrop fades + dialog scales 0.96 → 1 | 240ms | ease-out |
| Accordion expand | height auto with content fade-in | 240ms | ease-out |
| Tooltip appear | fade + scale 0.96 → 1 | 160ms | ease-out |
| Image (B&W → color) | filter transition | 400ms | ease-out |

### Decorative motion (sparingly)
- **Pulsing lime dot** in the "currently building" status pill. 2s loop.
- **Skeleton shimmer** for loading states.
- **Cursor follower** — the lime dot follows the cursor on the home hero only, with slight delay and a faint glow trail. Reserved for one moment per site.

### Reduced motion
All motion respects `prefers-reduced-motion: reduce` — already wired in `tokens.css`. When reduced, durations collapse to 0.01ms (effectively instant).

---

## 10. Sub-brand system

When a tool you build (e.g. q-bot) becomes substantial enough to warrant its own visual identity, it can have one — but it stays inside the shrey.lab family.

### What a sub-brand can change
- **Its own name** (e.g. q-bot, parchment, kombucha-co)
- **Its own primary color** — q-bot might be lavender-led; parchment might be rust-led
- **Its own logo/mark** — usually a wordmark + a small custom symbol
- **A slight type personality** — e.g. q-bot might lean harder on Geist Mono; parchment might use Instrument Serif more freely

### What a sub-brand must keep
- **Geist** as the primary sans (Geist Mono for technical voice, Instrument Serif for editorial moments). Type system stays.
- **The same spacing scale, type scale, radii scale, motion language.** Bones don't change.
- **Soft-rounded corners, warm backgrounds.** Never pure white or pure black.
- **The `//` mono eyebrow convention.** Recurring tic stays.
- **The `built by shrey.lab` footer signature** with monogram. Always present.
- **Accessibility standards** — AA contrast, focus rings, semantic HTML, reduced-motion support.

### How sub-brands appear on shrey.lab
On the shrey.lab portfolio, a sub-brand gets a card in the work section. Clicking it opens a case study **in shrey.lab branding** (not the sub-brand's). The sub-brand's actual product (e.g. q-bot.com) lives elsewhere with its own identity, and a small "by shrey.lab" footer with the monogram.

In other words: **shrey.lab is the studio. Sub-brands are the products. The studio frames the product, not the other way around.**

---

## 11. Versioning policy

The brand kit ships with a version. As you ship more tools, you'll evolve the kit — change colors, add components, rename tokens. Versioning lets older projects keep working with their original kit version while newer projects use the latest.

- **Patch (v1.0 → v1.1):** new component added, bug fix, minor token tweak. **No project that uses the kit needs to change.**
- **Minor (v1.1 → v1.2):** new tokens added, new conventions, expanded scope. Old projects still work but won't have the new stuff unless updated.
- **Major (v1.x → v2.0):** breaking change — a token renamed, a color removed, a font swapped. **Every project using the kit needs to update or stay locked at v1.x.**

Each project that uses the kit declares which version it was built against (in its README or `package.json`). When a major version bumps, you decide per project whether to upgrade or leave it locked.

The current version is **v1.0**.

---

## 12. Accessibility (non-negotiable)

- **AA contrast minimum** for body text. AAA preferred for primary actions.
- **Focus rings on every interactive element** — lime ring (`--focus-ring`), 2px gap from element, 2px ring.
- **Hit targets ≥ 44×44px** for anything tappable on touch.
- **Honor `prefers-reduced-motion`** — already wired in `tokens.css`.
- **Honor `prefers-color-scheme`** — already wired.
- **Semantic HTML always.** `<button>` for buttons, `<a>` for links, headings in order, `alt` on every image.
- **Forms label everything.** Visible label or `aria-label`, error text linked via `aria-describedby`.
- **Skip-to-content link** on every page.

---

## 13. What never to do

- ❌ Pure white (`#FFFFFF`) backgrounds. Use `ink-25` (`#FBFAF7`).
- ❌ Pure black (`#000000`) text or backgrounds. Use `ink-800` or `ink-900`.
- ❌ Inter, Roboto, Arial, Helvetica, system-ui as primary fonts. (Fallbacks only.)
- ❌ Purple gradients on white. The 2023 AI-startup template look. Banned.
- ❌ Lime on lime. Lime as a background with lime text. Just don't.
- ❌ More than three font families on a page.
- ❌ Color images on the portfolio by default — they should be B&W with saturate-on-hover. (Exemption: charts, brand assets, screenshots where color carries meaning.)
- ❌ Pie or donut charts. Use bar charts or the waffle/square-grid chart instead.
- ❌ More than 6 series in a chart. If you need more, the chart needs to be redesigned.
- ❌ Scroll-triggered animations on every section. Reserved for project galleries on the home page only.
- ❌ Page transitions that intercept browser back/forward. Use browser default.
- ❌ Stock testimonials with stock photos. If we don't have a real testimonial, we don't have a testimonial section.
- ❌ Buzzwords (synergy, leverage, 10x, revolutionary, game-changing, AI-powered).
- ❌ Hero copy that performs ("Building the future of X"). State what it is.
- ❌ Pop-ups, exit-intent modals, newsletter walls. Ever.

---

## 14. File structure (when integrating into a project)

When you scaffold a new project (Next.js, plain HTML, anything), drop the brand kit in like this:

```
your-project/
├── shrey-lab/                    ← the brand kit (this folder, copied in)
│   ├── tokens/
│   │   ├── tokens.css            ← CSS variables, fonts, resets
│   │   └── tailwind.preset.js    ← Tailwind config preset
│   ├── components/               ← reusable React components (Button, Card, etc.)
│   ├── assets/                   ← logo, monogram, favicon SVGs
│   └── BRAND.md                  ← this file
├── app/ (or src/)                ← your project code
└── tailwind.config.js            ← imports from shrey-lab/tokens/tailwind.preset.js
```

**For a Next.js project:**

```js
// tailwind.config.js
const shreyLab = require('./shrey-lab/tokens/tailwind.preset.js');
module.exports = {
  presets: [shreyLab],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './shrey-lab/components/**/*.{ts,tsx}'],
};
```

```css
/* app/globals.css */
@import '../shrey-lab/tokens/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**For a plain HTML project:**

```html
<link rel="stylesheet" href="./shrey-lab/tokens/tokens.css">
<link rel="icon" href="./shrey-lab/assets/favicon.svg" type="image/svg+xml">
```

---

## 15. The prompt to paste into Claude Code / Antigravity / Kiro

When starting a new project, paste this into your IDE's CLAUDE.md, AGENTS.md, or system prompt:

> This project uses the **shrey.lab** brand system. Reference `./shrey-lab/BRAND.md` for full strategy and rules. Key constraints:
>
> - **Colors:** Lime `#A8E10C` is the signature, used sparingly as accent on warm-paper (`#FBFAF7`) or warm-charcoal (`#181815`) backgrounds. Lavender `#9C86D4` and rust `#D6692F` are supporting. Never pure white or pure black.
> - **Type:** Geist (sans) for 95% of everything. Geist Mono for technical voice. Instrument Serif italic for editorial moments. Sansita Swashed and VT323 used sparingly. Never Inter, Roboto, or system fonts as primary.
> - **Style:** Refined-playful technical. Apple-like restraint × occasional brutalist accents. Soft-rounded corners (8px / 12px), thin borders by default, soft shadows.
> - **Signature elements (use at least two per page):** the `s°` monogram, the lime dot wherever a period could go, `//` mono eyebrows above headings, an italic Instrument Serif phrase inside an otherwise-sans heading, a `built by shrey` footer.
> - **Voice:** Quiet authority. Dry humor in microcopy only. Never buzzwords. Never empty intensifiers. Lead with the noun.
> - **Accessibility:** AA contrast, focus rings on everything, semantic HTML, honor reduced-motion and color-scheme.
> - **Use Tailwind** with the preset at `./shrey-lab/tokens/tailwind.preset.js`. Use semantic color tokens (`bg`, `fg`, `accent`) over raw values. Use the spacing scale, the type scale, the radius scale — no magic numbers.
>
> See `BRAND.md` § 6 for the complete "what never to do" list.

---

*Document version 1.1 · last updated April 2026*
