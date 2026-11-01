# DECISION_LOG.md

> Running log of non-trivial decisions during the shrey.lab build.
> Append, never edit. If a decision changes, add a new entry that supersedes the old one — the history matters.
>
> Format: date · decision · reasoning · superseded by (if applicable).

---

## 2026-04 · Initial planning session (pre-build)

### Domain: shrey.lab
- **Decision:** Go with `shrey.lab` over `shreyasjadhav.com` and `shreything.com`.
- **Reasoning:** `shrey.lab` is the brand kit's namespace and is distinctive (the `.lab` TLD signals a studio/experimentation surface). `shreyasjadhav.com` reads as a personal-name domain, which is fine but unmemorable. `shreything.com` is the old handle and carries the old portfolio's tone forward.

### Tech stack: Next.js 14 + Sanity + Vercel
- **Decision:** Locked stack. No alternatives.
- **Reasoning:** Brand kit's tokens already mapped to Tailwind. Next.js + Vercel native integration. Sanity v3 is mature, free for solo, schema-driven content.

### CMS architecture: separate Sanity Studio at studio.shrey.lab
- **Decision:** Sanity Studio hosted at `studio.shrey.lab` subdomain. Public site at `shrey.lab`. Both read/write the same Sanity content database.
- **Reasoning:**
  - Auth is harder than people think — Sanity ships proper auth for free.
  - Cleaner mental model: editing mode lives at a different URL than browsing.
  - Future-proof: adding collaborators in Sanity is zero code change.
  - Public site can keep running if Studio breaks.

### Calendar: Calendly (not Cal.com)
- **Decision:** Calendly embedded inline on `/contact`.
- **Reasoning:** Recruiters and hiring managers recognize Calendly. Cal.com integrates more cleanly with the brand visually but adds friction to the audience that matters most. The visual integration is solvable with embed CSS overrides; the recognition gap isn't.

### Old speculative case studies: cut entirely (not archived)
- **Decision:** Swiggy Dineout, EventBeep AI Guru, Neosurge, PassionBits, Jar App, Minus Hunger — all cut. No archive page.
- **Reasoning:** They're Figma prototypes, not real case studies. An archive page signals "couldn't bear to cut them" (small judgment leak). Figma share links break over time. Better to keep them private and potentially write one /writing post later titled "What I learned from doing six speculative case studies before I'd shipped anything real."

### /writing: launch empty
- **Decision:** No reframed pieces seeded at launch. Empty `/writing` with the empty-state microcopy from the voice doc.
- **Reasoning:** Forced content at launch reads as forced. Better to launch empty and earn the page over time. The empty state itself ("Nothing here yet. Worth fixing.") is on-brand.

### Featured case studies: three placeholders at launch
- **Decision:** Three placeholder cards on `/work` and homepage. Real eyebrows, real titles (drafted from inventory), real outcome sentences. Status: `in-progress`. Deep pages disabled.
- **Reasoning:** The brief bans "coming soon" placeholders. Placeholder cards with real content in card-level slots and a clear `→ in progress` indicator are honest, not unfinished. When a case study is ready, flip status in Sanity → live. This is also the right test of the schema design.

### Positioning: "I'm a product manager" (not a transition story)
- **Decision:** Site does not perform an operator-to-PM pivot narrative. Positions as a PM. Period. Amber Product Ops experience is texture, not transition.
- **Reasoning:** The pivot framing makes the site work too hard and undermines the quiet-authority register. The brand voice ("knows their value, doesn't perform it") aligns with the PM-period positioning. Range goes to /about as texture supporting the PM identity.

---

## 2026-05-01 · Starter docs created

### Skipped pre-inventory starter docs initially, then reversed
- **Decision:** Build the three starter docs (`CLAUDE.md`, `PROJECT_BRIEF.md`, this file) before the inventory dump completes. Inventory dump happens async via Notion questionnaire.
- **Reasoning:** Without `CLAUDE.md` in the repo, every new chat session starts from zero — context window fills with paste-backs. Starter docs are a 20-minute one-time cost that saves dozens of hours. Inventory was originally going to block this, but Notion questionnaire path lets both happen in parallel.

### Inventory questionnaire: Notion async path
- **Decision:** Inventory dump happens in a Notion page (created at `https://app.notion.com/p/352f4a058e71816e8a53f5d8ec9f17f9`), filled offline by Shreyas, pasted back in a fresh Claude chat to continue the build.
- **Reasoning:** Shreyas doesn't have time for a synchronous interview. The Notion doc has 9 sections, prioritized — Sections 1, 2, 8, 9 are the build-unblocking ones; 3–7 can be filled slower. Each section has prompts + examples to make offline filling easier.

### Project docs consolidated in Notion
- **Decision:** `CLAUDE.md`, `PROJECT_BRIEF.md`, and `DECISION_LOG.md` are mirrored as sub-pages under the inventory page in Notion. The repo copy remains the source of truth for the build; Notion is the human-readable mirror.
- **Reasoning:** Single Notion workspace = single place Shreyas opens to find anything project-related. The repo versions are what Claude Code and the deploy pipeline read; Notion is what humans browse. Maintain both — Notion lags repo by no more than a session.

### GitHub repo: private, at github.com/amoebashrey/shrey.lab
- **Decision:** Repo is private. Source of truth for code lives there. Claude in chat does not have direct GitHub access — work happens via artifacts that Shreyas commits locally. Claude Code (terminal) has direct repo access via local git when used.
- **Reasoning:** Private repo is fine pre-launch; can be flipped to public at launch when "View source" footer link goes live. No reason to expose work-in-progress drafts of case studies. Claude-in-chat → artifact → local commit is a clean handoff model that matches how Shreyas works.

### About-page photo: deferred, placeholder treatment at v1
- **Decision:** No photo for /about at v1 launch. Layout reserves the space with a mono `// photo coming` block at the correct dimensions per brand kit photography rules (medium/environmental, B&W-treatment-ready). Real photo drops in via Sanity when shot.
- **Reasoning:** Waiting on a photo blocks launch; launching without the slot designed-for blocks future photo drop-in. Reserved-space placeholder is the right middle ground — no layout shift when photo lands, no fake stand-in image either. Brand kit's photography rules (environmental, side-lit, off-center, one signature accessory) inform the eventual shoot.

### Domain: deferred — launch on `shrey-lab.vercel.app` subdomain
- **Decision:** Don't buy `shrey.lab` at v1 launch. Site deploys to Vercel's free `shrey-lab.vercel.app` subdomain. Custom domain is a flip-the-switch DNS config (5 min) when bought later.
- **Reasoning:** Shreyas wants to defer the ₹1,200/year cost until he sees the site working. Build does not block on this. Brand kit references to `shrey.lab` (wordmark, monogram, mock email `hello@shrey.lab`) stay intact — when domain is bought, no rebuild needed.
- **Flag for revisit at month 1:** the `.vercel.app` subdomain is a credibility tax for Persona 1 (Senior PM hiring manager). Recommendation stands to buy the domain before sending the site to any actual hiring manager. Decision can be reversed at any time without code changes.

### Contact email at launch: shreyasjadhav531@gmail.com
- **Decision:** Site uses Shreyas's existing Gmail (`shreyasjadhav531@gmail.com`) as the primary contact email at v1. No custom-domain email setup.
- **Reasoning:** Custom-domain email (`hello@shrey.lab`) requires owning the domain, which is deferred. Gmail works as a contact path. Email is a single string in `siteSettings` Sanity schema — flips in 30 seconds when domain + Workspace are set up.

### Build path: A (full shell with placeholders), not B (single sendable page)
- **Decision:** Build all 10 routes at v1. Pages that have no data yet show placeholder cards that don't link to deep pages. Deep pages render only when CMS has corresponding data with status `published`.
- **Reasoning:** Shreyas wants a complete site, not an incremental sendable artifact. Path A produces a full v0 he can iterate on as inventory fills in. Trade-off accepted: site won't be sendable to hiring managers until the first real case study is written, but the architecture will be ready for everything from day 1.

### Audience scope: global (not India-specific)
- **Decision:** Site optimizes for global Senior PM hiring managers (Stripe, Linear, Notion, Anthropic-tier), not the Indian market.
- **Reasoning:** Shreyas noted that India doesn't have a strong portfolio-site culture. True for many roles in India, but the goal is roles at companies whose hiring managers — even when hiring into Indian offices — read portfolios. Brief locked this audience in chat 1; reaffirming here so it's documented before any "should we Indianize this?" question comes up later.

---

## 2026-06-24 · Felix card + detail-page visual identity

### Felix gets real product imagery (kills the line-art placeholder)
- **Decision:** The Felix case-study card and `/work/felix` now use real assets — a clean capture of the live Slack-thread hero (`heyfelix.vercel.app`) plus the product mascot — instead of the geometric line-art placeholder. Card default is the product screenshot filling the existing `.lab-image` slot, with the mascot as a small glass brand-mark chip; the detail page adds the same screenshot as a captioned hero figure between the header and the body sections.
- **Reasoning:** The design audit flagged the line-art placeholder as the top "dated" tell — it made a shipped product read as unfinished. A real screenshot makes Felix the one card on `/work` that looks like a real product, which is exactly the signal Persona 1 (skeptical hiring manager) is scanning for. Assets are real, not fabricated (CLAUDE.md "no speculative content"). No new card layout or pattern — reused `CaseStudyCard`, the `.lab-image` B&W→color hover, and `.lab-glass`. Added an optional `image`/`brandMark` field to the `CaseStudy` type (mirrors the future Sanity `coverImage` field) so other studies adopt it by dropping in an asset.
- **Alternative kept available:** A `variant="mascot-tile"` option (mascot centered on a brand-tinted tile) is built into `CaseStudyCard` for the on-brand-mark presentation, pending Shreyas's pick between the two. Default ships the product-screenshot version.

---

## 2026-06-24 · Pune Bookies real visual + verified link

### Pune Bookies card + detail get the real homepage hero
- **Decision:** The Pune Bookies card and `/work/pune-bookies` now use a real capture of the live homepage hero (the gulmohar-tree mark + "Pune Bookies" wordmark + tagline, from `pune-bookies.vercel.app`). Same treatment as Felix — fills the existing `.lab-image` slot on the card, and sits as a captioned hero figure on the detail page. No separate brand-mark chip: the logo is already in the shot, so a chip would duplicate it (this is the deliberate difference from Felix, whose Slack-thread shot only shows a tiny avatar).
- **Reasoning:** Same audit fix as Felix — the line-art placeholder made a shipped site read as unfinished. Card + detail both link to the stable `https://pune-bookies.vercel.app` (not a `git-overhaul-…` preview URL), open in a new tab. Facts left as already written (verified against the repo at ~/Desktop/pune-bookies: Astro 6 + @astrojs/vercel, a `studio/` Sanity setup, a Drive→Sanity sync script — all evidenced).

---

## 2026-06-24 · Hubble internal-tool case study

### Hubble replaces the `amber-internal-ticketing` placeholder
- **Decision:** The placeholder `amber-internal-ticketing` entry ("Replacing a $20K vendor…", in-progress, featured) is rewritten as **Hubble** — the real, named version of that same internal ticketing project. Hubble is `status: 'internal'`, `featured: false`, `href: null`, with a written `/work/hubble` detail page. Avoids shipping two near-duplicate internal-ticketing cards. (Confirmed with Shreyas before writing.)
- **Reasoning:** The old placeholder led with a $20K cost metric; the brief for Hubble is explicit that the card stays qualitative (no metrics/cost) and that the framing is "owned and led the rebuild of an inherited tool" — NOT "solo-built." Keeping both would contradict that and duplicate the topic on `/work`.

### New `'internal'` status (shipped, no public link)
- **Decision:** Added `'internal'` to `CaseStudyStatus`. It links to the `/work/{slug}` detail page (via `SLUGS_WITH_DETAIL`), never links out, and shows a lavender status pill ("internal"). The detail page renders "// internal tool · no public link" in place of the "Visit live" button, and the bottom-bar visit link is omitted.
- **Reasoning:** Honest representation of a shipped internal tool. Lavender (the brand's supporting colour) distinguishes it from live (lime) and in-progress (rust) without inventing a new pattern — same glass pill, same dot.

### Designed Hubble mark (the one sanctioned fabrication)
- **Decision:** Hubble has no real brand assets, so the card uses a designed mark: a line-drawn telescope (Hubble's Slack icon is a telescope) on a lavender field with lime accent "stars", as `public/work/hubble-mark.svg`. Built only from the design-system palette (lavender field, ink strokes, lime accents echoing the placeholder's accent dot). It rides the existing `.lab-image` slot and B&W→color hover like any other card image — no new visual language, and explicitly not a fake product screenshot. The detail page carries no fabricated visuals.
- **Reasoning:** The brief sanctioned designing a mark here (and only here). Treating it as a normal card image keeps the treatment consistent with Felix/Pune Bookies.

---

## 2026-06-24 · Pune Bookies correction + brand-tile card + X links

### Pune Bookies: built from scratch, not a rebuild (factual correction)
- **Decision:** Rewrote the Pune Bookies card summary/result and the `/work/pune-bookies` detail narrative to say it was **designed and built from scratch**. Removed all "rebuild / re-house / re-house don't redesign / old site / pixel-for-pixel" language. Structure stated accurately: a reader-facing site, a separate brands/partnerships page, and a Sanity CMS for no-code editing. Role: "Built it — design, build, ship; partnerships, ops & community."
- **Reasoning:** Shreyas flagged the prior "re-housed/migration" framing as factually wrong. Corrected per his instruction; structure confirmed against the repo (`src/pages/index.astro` + `src/pages/brands.astro` + `src/lib/cms.ts`). Kept only the evidenced specifics (Astro + Sanity + Vercel, Lighthouse 100/100/100 + 93 perf, zero layout shift, reduced-motion, 375px). Supersedes the "Re-house, don't redesign" framing in the 2026-06-24 Pune Bookies entry above.

### Pune Bookies card: brand tile, not a screenshot
- **Decision:** The card no longer uses the homepage screenshot. New `cardStyle: 'brand-tile'` treatment centers the real gulmohar-tree logo (`favicon.svg` from the repo → `public/work/pune-bookies-mark.svg`) with the "Pune Bookies" wordmark below in the site's display type (Instrument Serif), on a calm warm-tinted tile. New `BrandLogoTile` in CaseStudyCard, same family as `MascotTile` — no new fonts, rides the existing `.lab-image` B&W→color hover. The detail page keeps the real homepage screenshot (only the card was flagged).
- **Reasoning:** The screenshot read as wonky/wobbly on the small card (the homepage tree uses watercolour displacement filters). A clean logo + wordmark is calmer and more intentional at card size.

### X / Twitter added wherever social links live
- **Decision:** Added X (`https://x.com/shreyasinpublic`) to the footer "// elsewhere" list (between LinkedIn and GitHub, "X ↗") and as a contact row on `/contact` ("// x · @shreyasinpublic · Open X ↗"), matching the existing link/label patterns. Also corrected the stale `twitter.creator` metadata in `layout.tsx` from `@shreything` to `@shreyasinpublic`. The About "// elsewhere" list is talks/press, not social links, so X was not added there.
- **Reasoning:** Match existing placements only; both themes; real anchors (keyboard-focusable).

---

## 2026-06-24 · Hubble rebuilt from the full brief (honesty-guarded)

### Hubble case study, rewritten to the pasted brief
- **Decision:** Reworked the Hubble entry and detail page from Shreyas's full brief. Supersedes the earlier 2026-06-24 Hubble entry. Key honesty guardrails, applied verbatim:
  - Role one-liner at the top, verbatim: *"Owned and led Hubble end-to-end — scoped it, diagnosed the failures, directed the build, and shipped it into live use."* Ownership framing — no "hand-coded / wrote every line" (implementation ran through AI agents under direction; the original code was someone else's).
  - **No company name** anywhere (dropped `client: 'amber'` → `'Internal'`). No metrics, no cost figures, no ticket-count numbers — all qualitative. Year → 2025. Status shipped · internal, no href, no screenshots, featured false.
- **Reasoning:** The brief is explicit that overstating authorship or adding unmeasured numbers is the fastest way to lose credibility. Selective, not a transcription of the source doc.

### Architecture rendered as a styled mono diagram (no ASCII)
- **Decision:** New `HubbleArchitecture` component renders the event path current-vs-target-V1 as two columns of mono-labelled, bordered nodes connected by ↓ arrows, on `.lab-glass`. Defects in rust, fixes in lime — all from the existing type system and tokens. It sits inside its narrative section ("// the architecture") and stacks to one column under 380px. Not raw ASCII, not a new visual language.
- **Reasoning:** The brief explicitly wanted the architecture kept and rendered cohesively in the existing system. Added an optional `roleLine` to the detail type for the verbatim ownership line under the title. Card keeps the designed telescope mark as the sanctioned placeholder (a real asset may be swapped into public/work/hubble-* later).

---

## 2026-07-04 · Visual-review fixes, round 1 (top-5 from the Fable 5 design review)

### Fonts self-hosted via next/font; kit's @import removed
- **Decision:** Removed the Google Fonts `@import` from `shrey-lab/tokens/tokens.css`; the app now consumes next/font's Geist/Geist Mono variables (globals.css re-points `--font-sans`/`--font-mono`; app tailwind.config.ts overrides `fontFamily`). The layout `<link>` now loads Instrument Serif only — Sansita Swashed and VT323 were downloaded on every page and used nowhere.
- **Reasoning:** Geist was double-loaded (next/font + render-blocking @import) and the hero FOUTed on the most important glyphs on the site. styleguide.html carries its own `<link>`, so the kit file stays standalone-safe. Re-add Sansita/VT323 per-page if `font-playful`/`font-pixel` ever get used.

### Case-study imagery via next/image
- **Decision:** Detail-page heroes and CaseStudyCard screenshots render through `next/image` (fill + sizes + q80; detail hero gets `priority`). SVG marks stay as plain `<img>` — the optimizer can't improve SVGs.
- **Reasoning:** `pune-bookies-hero.png` was 2.9MB served raw; it now serves ~100–200KB WebP with a proper srcset. `.lab-image > img` grayscale hover still applies (next/image renders a direct-child `<img>`).

### Hero: lime cinematic line + closed dead zone
- **Decision:** Added the kit's cinematic lime-line draw to the home hero as a standalone `.hero-lime-line` element (not `.lab-cinematic` on the section — its `> *` fade-up would double-animate with Stagger). The draw is gated on `html[data-intro-done]`, which IntroGate stamps when the intro finishes or is skipped. Hero `pb-16/20` → `pb-4/6`, HeroCTAs `mt-16/20` → `mt-10/12` (subline→CTA now ~72px, was ~160px).
- **Reasoning:** The brand's one above-the-fold lime moment was documented but never used, and the draw would otherwise be wasted underneath the first-visit intro overlay.

### Silent no-op utility classes repaired; StatusPill fixed and mounted
- **Decision:** The preset's CSS-var colors don't support Tailwind `/NN` opacity modifiers, so `border-fg/80`, `border-border-strong/30` (×3), `decoration-fg-muted/40` (×3), `text-fg-subtle/40`, and the undefined `duration-med` compiled to nothing — all replaced with real tokens (ghost buttons unified on the ResumeButton recipe: `border-border hover:border-border-strong`). StatusPill's animation referenced nonexistent `pulse-ring` keyframes → now `pulse-lime` on the dot itself, and the pill is mounted in the Footer left column ("currently building · shrey.lab") as the alive-and-shipping signal (Problem 5).
- **Reasoning:** Fix at the usage sites rather than adding `<alpha-value>` plumbing to the kit preset — no current design calls for translucent borders.

### In-progress Amber cards get designed brand-tile marks; CursorField scoped to home
- **Decision:** Both featured in-progress Amber studies use `cardStyle: 'brand-tile'` with new BRAND §5 line-art marks (`amber-white-label-mark.svg`: browser frame + embedded surface; `amber-listing-mark.svg`: listing-photo grid) on a paper plate so ink strokes survive dark mode. CursorField moved from the root layout to `app/page.tsx`.
- **Reasoning:** The homepage proof row read ⅓ real with generic placeholders. BRAND §9 reserves the cursor glow for the home hero — it was mounted globally, drifting behind case-study body text.

---

## 2026-07-04 · Visual-review fixes, round 2 (full sweep)

### Typography & copy precision
- **Decision:** Hero eyebrow → `// shreyas jadhav · amber · pune` (was echoing the H1's noun); H1 clamp capped at 88px (the scale's top — 96px was a token violation); Outcomes numbers moved from Geist Mono 5xl/6xl to sans medium 4xl/5xl `tabular-nums` (BRAND §6 stat callout); stray Geist `<em>`s replaced (`/work` intro's "not" → `.italic-break`, About's dropped); `/now`'s `dangerouslySetInnerHTML` replaced with a plain string; contact footer line reworded to `// whichever door — i reply within a day or two.` (old line was form-submitted microcopy with no form).
- **Reasoning:** All spec-vs-implementation drift; no new patterns.

### AA contrast + nav divider
- **Decision:** `text-fg-subtle` (ink-400, ~3.9:1) at 11–14px bumped to `text-fg-muted` in: footer view-source, FelixDemo `#support` + decision line, Hubble panel captions, both writing empty states, About caption. Decorative uses (placeholder art, arrows, thinking dots) keep fg-subtle. Nav divider `--nav-glass-border` → `--border`.
- **Reasoning:** BRAND §12 calls AA non-negotiable; the divider was imperceptible in light mode.

### Intro plays once ever, skip is a visible pill
- **Decision:** IntroGate `sessionStorage` → `localStorage` (same key); skip control upgraded from bare mono text to a bordered ghost pill.
- **Reasoning:** Persona 1 is a 60-second skimmer — a ~5s forced overlay is worth at most one showing, and the exit must read as a control.

### Signature link treatment + one empty-state recipe
- **Decision:** Inline prose links (About, both writing empty states) now use the kit's `.lab-link` lime underline wipe instead of three ad-hoc underline recipes; the homepage writing empty state is left-aligned to match `/writing`.
- **Reasoning:** The kit shipped the signature treatment unused; ad-hoc recipes also relied on broken `/40` modifiers.

### Homepage rhythm + brutalist weight
- **Decision:** NowTeaser rendered as the brutalist changelog card (border-3 + shadow-brutal-sm + mono list) matching `/now`'s register; `/now` + `/tools` cards bumped border-2 → border-3.
- **Reasoning:** Three same-gray prose teasers in a row read as monotony (review 4.1); 2px borders read mismatched against hard offset shadows (BRAND §3 brutalist = weight).

### About portrait (line-art, theme-aware)
- **Decision:** The dashed "// photo coming" box replaced with `AboutPortrait` — an inline-SVG environmental line drawing (monsoon window, laptop with lime cursor, books, kombucha bottle) in the same 3:4 slot; caption now `// the desk, pune · 2026 · photo coming`. Inline SVG so strokes ride `currentColor` across themes.
- **Reasoning:** BRAND §5 names line art as the no-photo fallback; a dashed placeholder was the weakest visual on the second-most-visited page. Real photo still drops in with no layout shift.

### Favicon outlined + apple-touch-icon
- **Decision:** favicon.svg's `<text font-family="Instrument Serif">` replaced with the actual outlined glyph path (extracted from the italic TTF via opentype.js — SVG favicons can't load webfonts, so tabs showed generic Times). Added 180×180 `apple-touch-icon.png` rendered from the same mark and registered in layout metadata.
- **Reasoning:** The monogram is the brand mark; it should be pixel-faithful everywhere it appears.

---

## 2026-10-20 · Tile-shark hero + top-right theme toggle

### Home hero becomes a centred tile-shark band
- **Decision:** The hero (`components/home/Hero.tsx`) is now one full-bleed band: centred copy (lime line, eyebrow, h1, sentence, "View work") over a canvas of sharks drawn as small rounded tiles (`components/home/TileSharkBackground.tsx` → `lib/tile-art/`, a framework-free renderer ported verbatim from the prototype). `HeroCTAs` is folded back into `Hero`. The band paints `--hero-bg`: pure `#fff` in light, `--ink-800` in dark; sharks recolour with the theme (`PALETTES.blue` / `PALETTES.blueNight`) via a 300ms crossfade matching the kit's theme transition.
- **Reasoning:** Ambient, decorative, seen once per visit — so it never reacts to scroll, pauses off-screen and on hidden tabs, renders a still frame under reduced motion, and caps DPR at 2. The copy sits on a solid `--hero-bg` plate: a full-opacity navy tile behind `#181815` text measures ~1.6:1, and lowering shark opacity was ruled out. The hero left `<Stagger>` for a CSS-only entrance (visible without JS, no hydration wait); it holds for the first-visit intro only when the head script stamps `data-intro-pending`.

### Theme toggle moves out of the nav pill
- **Decision:** `components/ThemeToggle.tsx`, fixed top-right in its own glass pill, mounted in `app/layout.tsx`; removed from `components/Nav.tsx`. Both icons render and CSS picks one from `data-theme`, so there's no mount placeholder.
- **Reasoning:** Asked for explicitly (top-right). With the hero copy centred, a separate control reads cleaner than a fifth item in the centred pill.

### One accent hue for the whole site, set by a slider
- **Decision:** `lib/accent.ts` builds every accent colour from one hue in OKLCH at the brand lime's lightness (L 0.839, C 0.212, gamut-fit by lowering chroma). It writes `--accent`, `--accent-hover`, `--accent-rgb` and overrides the kit's `--lime-400/500`, so the CTA, dots, links, focus ring, selection, cursor glow, nav wash and the tile sharks all share it. A vertical hue slider (`components/AccentSlider.tsx`) sits under the theme toggle (`components/SiteControls.tsx`); the choice persists in localStorage and is applied before paint. Default hue 126 = `#A8E10C`, so the site looks unchanged until someone moves it. Home on the slider returns to lime.
- **Reasoning:** Asked for explicitly: animals and CTA must match, one control recolours all of it. Equal OKLCH lightness keeps dark-on-accent text at AA for every hue. The lime is still the brand default; the slider makes it a preference, not a rebrand. Remaining fixed lime: the intro sphere's CSS texture and the kit's unused surface classes.

### Hero copy is lifted, not carded
- **Decision:** Dropped the solid plate behind the hero copy. `.hero-lift` puts a stacked halo of the page colour around the glyphs plus a faint drop; sharks swim freely and dim only right around the letters.
- **Reasoning:** The plate sliced sharks with a visible rectangle edge. The halo keeps the letter edges readable without a box. Trade-off: at a shark's darkest tiles the area between letter strokes is still tinted — check if it ever reads poorly.

---

## 2026-10-21 · Sharks steer around the copy; curated palettes; Bencho blocks

### Sharks avoid the hero copy instead of passing behind it
- **Decision:** No backing and no halo. The copy column (`[data-shark-avoid]`) is an obstacle for the shark canvas, padded by 0.3× the largest shark's length (bigger than its body thickness) plus each body's own fin reach. `lib/tile-art/motion.ts` (pure, testable) looks ahead along each shark's heading; if the path or body would reach the obstacle, the shark commits to a side and its turn rate eases (0.0005 rad/frame²) toward a cap sized to its length (turning radius 0.9 body lengths), so it reads as a calm swerve and the tail follows the nose. The side is sticky until the path is clear for 40 frames, so there's no jitter. A safety wall at half the pad nudges a body outward by ≤2px/frame on the rare frames steering alone would fall short. Sharks already inside (mount, resize) step out vertically.
- **Reasoning:** The halo still let dark tiles tint the text, and the plate sliced sharks with a box edge. Avoidance keeps full contrast with nothing visible around the text. Headless sim (40 runs × 5 min per width at 1440/768/390, uneven frame times): 0 frames with a body over the text, 1 quick side-switch total, 0 trapped sharks; the wall engaged on ~1% of frames. Live canvas sampling in Chrome confirmed 0 tiles under the copy in both themes at all three widths.

### Pause/play control on the hero
- **Decision:** `components/home/HeroSharks.tsx` adds a quiet icon button bottom-right of the hero, wired to the canvas's `paused` prop; label switches "Pause animation"/"Play animation"; choice persists in localStorage; hidden under reduced motion (the canvas is already still there).
- **Reasoning:** WCAG 2.2.2 — motion longer than 5s alongside content needs a pause.

### theme-color follows the toggle
- **Decision:** Dropped the media-query `themeColor` from `viewport`; one `<meta name="theme-color">` is set before paint by the head script and on toggle (`#ffffff` light — the hero band at the top — and `#181815` dark).

### Colour control snaps to curated palettes (Bencho Wake slider)
- **Decision:** The continuous hue slider is replaced by Bencho's Wake slider (MIT, adapted in `components/bencho/wake-slider/`), snapping to four palettes in `lib/accent.ts`: lime (default, brand), blue (prototype), slate, and lavender (proposed — the kit's own `--lavender-400`). Each palette's third shading stop is the accent, so CTA and sharks are one colour; dark-theme stops lift the back/flank in OKLCH. Dark text on every accent ≥ 6:1.
- **Reasoning:** Asked for explicitly; curated options keep every combination on-brand where a free hue range didn't. Lavender pending approval.

### 404 wordmark (Bencho Heat map)
- **Decision:** `components/bencho/heat-word/` (MIT notice kept) draws `shrey.lab` on the 404: grey at rest, melting into the active accent palette under the pointer. Shape cycling on click removed (role="img"); no melt-in under reduced motion.
- **Reasoning:** The 404 is where the brand allows play (CLAUDE.md voice rules); the heat colours come from the accent so it isn't a second colour system.

---

## 2026-11-01 · Phase 1: fix what loses visitors

Audience is now founders and teams hiring for project work (mostly via X DMs and outreach); the goal is to show how I think and build. No prices anywhere.

### Everything visible on first paint
- **Decision:** Removed the first-visit intro overlay (IntroGate/Intro, GSAP sequence, head-script gate, glass-sphere CSS). Stagger and FadeUp are CSS, and every entrance (hero, sections) is transform-only — content is readable on the first frame, with or without JavaScript (verified with scripts disabled at 390 and 1440).
- **Reasoning:** Visitors from an X link on a phone saw an overlay, then sections that stayed blank until hydration.

### Numbers strip renders real values
- **Decision:** Removed the count-up; the strip is a server component and the HTML holds "~50%", "18%", "$20K". It can't show 0.

### One source for who I am and how to reach me
- **Decision:** `lib/site.ts` holds the name, role ("Product Associate at Amber, joining super.money as APM"), email, X and the booking URL. Hero, `<title>`, description, About, the new OG image (`app/opengraph-image.tsx`; the old `/api/og` never existed) and contact all read from it. "Product manager" is gone everywhere.
- **Booking:** Cal.com placeholder (`BOOKING_URL`, flagged `REPLACE-ME`) — must be replaced before deploying.

### Hidden until real
- **Decision:** In-progress case studies (both Amber cards) are filtered out (`PUBLISHED_CASE_STUDIES`). /writing, /now and /tools return 404, and their homepage sections, footer links, the 404's writing link and the "currently building" pill are gone. The nav's Resume button is removed: /resume.pdf doesn't exist, so it opened an empty modal.
- **Reasoning:** CLAUDE.md: no "coming soon". Old pages are in git history at 7f46f2e.

---

## 2026-11-01 · Hero: dinosaur footprints replace the sharks

### Tile footprints (style B)
- **Decision:** Two theropods walk the hero in opposite directions (`lib/tile-art/footprints.ts`), drawn in the hero's small rounded tiles (5px). The big one (58px prints) steps every 1.1s and travels 72px per step; the small one (38px) every 0.72s and 48px per step. Prints alternate feet with a slight toe-out, land with a press (scale 1.05→1 + fade-in over 220ms) and fade out behind, about 10 per trail. A walker that leaves the hero respawns from its edge at a new height, in a lane that crosses without meeting an obstacle.
- **Steering:** walkers reuse the shark obstacle logic (`lib/tile-art/motion.ts`); each walker's steered body covers the prints it lays. Clearance: 48px around the copy, 12px around the nav and colour pill. Obstacles whose free corridor is narrower than 1.5 bodies merge (otherwise a walker can wedge between the nav and the copy). Stronger level-out bias so trails cross rather than detour.
- **Verified:** headless sim, 3 × 6 runs × 5 min at 1440/768/390 — 0 prints over the copy or under the chrome, ~9–10 prints per trail, headings within ~37° of horizontal 99% of the time. Live in Chrome: 0 tiles under the copy in both themes at 1440 and 390; reduced motion holds two still trails; 60fps (p95 frame 16.8ms) at 1440.
- **Renderer:** generalised to scenes (`TileScene`); the shark shape and components are removed.
- **Trade-off:** at desktop sizes the colour pill closes the lane above the headline, so both trails use the band under the button.

---

## Template for future entries

```
## YYYY-MM-DD · [short topic]

### [Decision name]
- **Decision:** [what was decided, in one sentence]
- **Reasoning:** [why — what alternatives were considered, why this one won]
- **Superseded by:** [link to later entry if this decision was reversed; otherwise omit]
```

---

*shrey.lab — DECISION_LOG.md — created 05.01.26 — append-only*
