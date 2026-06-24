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
