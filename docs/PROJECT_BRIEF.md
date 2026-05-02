# PROJECT_BRIEF.md

> The canonical, locked specification for the shrey.lab portfolio site.
> If this conflicts with the brand kit, this wins (it's project-specific and more recent).
> If this conflicts with itself, the most recent edit wins (see git history).

---

## The goal

**Land a Senior PM offer at a top product company within 6 months.**

"Top product company" means Stripe, Linear, Notion, Anthropic, Figma, Vercel, Ramp, and similar — companies where product craft is the defining cultural value, and where Senior PM compensation lands at the top of the market.

Every other goal — being a mentee resource, building personal brand, growing audience, looking creative — is **secondary**. If a design choice helps any secondary goal and hurts the hiring goal, the hiring goal wins.

---

## Audience priority

Optimized in this exact order. Never invert.

1. **Senior PM hiring manager.** 35–50 years old. Has read 10,000 portfolios. 60–120 second skim on a Tuesday afternoon. Skeptical of cuteness, rewards clarity and earned personality.
2. **Recruiter.** 20–40 second scan. Wants role, instant resume, contact path.
3. **Peer PM cold-DM'd for a referral.** 3–5 minute read. Verifying Shreyas is worth the referral credit.
4. **Mentee/student.** Wants the path, the journey. **Deprioritized.** If a design choice helps Persona 1 and hurts Persona 4 — hurt Persona 4.

---

## Strategic positioning

**Shreyas is a product manager.** Period.

Two years of Product Ops at Amber (global student housing marketplace) is *texture* underneath the PM identity, not a transition narrative. The site does not perform a pivot story. It does not say "former ops person, now PM." It says "I'm a PM," and the work proves it.

Multi-domain founder background (Rada community 300+ members across 4 countries; Sattva Kombucha 7-SKU brand ₹1L+ revenue; The Cultured Cult 700+ students) signals range and execution intensity, but lives on `/about` as texture supporting the PM identity — never on the homepage as a competing narrative.

**NOT positioning as:** generalist creative, designer-PM, quirky-personality-first, "more than just a PM."

---

## The seven core problems the site must solve

(In priority order. Every page either advances or undermines these.)

1. **Establish PM seniority and category in 60 seconds.** A skeptical hiring manager has to leave the homepage knowing: (a) you're a PM, (b) the level you're operating at, (c) the kind of products you ship. Three concrete metrics, three case studies, one positioning sentence. No throat-clearing.
2. **Prove decision-making, not just delivery.** The Decision section of every case study is the most important content on the entire site. Senior PMs are paid for the tradeoff column, not the deliverable column.
3. **Make every metric audit-proof.** Every number gets a timeframe and a caveat. "18% lift in booking conversions over 6 weeks post-launch" beats "improved engagement."
4. **Show range without diluting the PM positioning.** Founder ventures, community work, food science, vibe-coded tools — all earn their place by serving Persona 3 (peer PM weighing a referral) on `/about`, `/tools`, `/writing`, `/now`. Never the homepage.
5. **Make the site itself the strongest case study.** Typography, motion, microcopy, accessibility, the 404 — all of it gets graded. The brand kit handles 80% if not fought.
6. **Eliminate friction to the next step.** Resume in an inline modal (not a Drive link). Calendar link, email, on every page. No 20-second scan ends in a dead-end.
7. **Survive the wrong-landing-page problem.** A meaningful share of qualified traffic lands on `/work/[slug]` first (LinkedIn shares, recruiter referrals to a specific case study). Every case study page also functions as a homepage — clear contact path, clear "more work" link, no orphans.

---

## Tech stack (locked)

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | Next.js 14, App Router, TypeScript | Modern, server components, edge functions, Vercel-native |
| Styling | Tailwind + brand kit preset | Brand kit's tokens already mapped |
| CMS | Sanity v3, hosted at `studio.shrey.lab` | Real CMS for free, structured content, Sanity handles auth |
| Hosting | Vercel | Edge OG generation, ISR, painless deploys |
| Domain | `shrey.lab` | Locked |
| Calendar | Calendly (embedded inline) | Recruiters know it, embed is clean |
| Analytics | Vercel Analytics | Built-in, free, sufficient at launch |
| Email | TBD — recommend `hello@shrey.lab` via Google Workspace | Gmail in footer leaks credibility |
| Source | GitHub, public repo | "View source" link in footer is a craft signal |

---

## Routes (locked)

```
/                      Homepage
/work                  Case studies index
/work/[slug]           Individual case study (locked template, see below)
/writing               Articles index
/writing/[slug]        Individual article
/tools                 Vibe-coded projects (NOT in top nav)
/tools/[slug]          Individual tool page (only for tools warranting depth)
/about                 Long-form journey, founder ventures live here
/now                   Single page, monthly updated (NOT in top nav)
/contact               Quiet conversion page (calendar + email + resume)
/rss.xml               RSS feed for /writing
/sitemap.xml           Auto-generated sitemap
/404                   Custom 404 in shrey.lab voice
studio.shrey.lab       Sanity Studio (CMS), separate subdomain
```

**Top nav (4 items only):** Work · Writing · About · Contact.

The wordmark `shrey°lab` on the left is "home" — there is no Home nav item. Theme toggle on the right.

---

## Homepage information hierarchy (locked)

**Above the fold:**
1. Monogram + nav (4 items) + theme toggle
2. Hero positioning sentence — credibility-first format: "I'm an X who has shipped Y for Z." One supporting line. Two CTAs: "View work →" (primary, lime) and "Resume (PDF)" (secondary, opens inline modal). To be drafted from inventory.
3. Status pill under hero: `● currently building [thing] · pune`

**Below the fold, in this exact order:**
4. **Outcomes strip** — three concrete metric statements tied to ships. NOT three skills. NOT three values. Three numbers with timeframes.
5. **Featured work** — three real case studies. Each: B&W image (saturate on hover), eyebrow `// case study · YYYY · context`, declarative title, one-line outcome, `→ read`.
6. **About paragraph** — 60–80 words, no photo, bridges credentials to character, ends with one human detail. Photo lives on `/about`.
7. **Latest writing** — three articles with date + read time. (Empty at launch, fill over time.)
8. **Now teaser** — one paragraph ending with `→ what I'm working on now`.
9. **Footer** — three columns: signature/wordmark, secondary nav, contact + social.

---

## Case study template (LOCKED — every case study uses this exact shape)

1. **Eyebrow:** `// case study · {year} · {company}`
2. **Declarative title** — NOT cute. "Reducing escalation tickets by 38% in 90 days" beats "How I tamed the chaos."
3. **Outcome sentence** — what happened, in numbers, in one line, above the fold.
4. **Meta strip:** role · timeline · team size · my contribution.
5. **The problem** — what was actually broken, including stakeholder politics. 100–150 words.
6. **The decision** — the tradeoff. What did I choose NOT to do, and why? **This is the part hiring managers read carefully. Write it longest, write it first.**
7. **The build** — process, screenshots in B&W browser frames, optionally one quote from a real teammate (with their permission).
8. **The outcome** — numbers, timeframes, caveats.
9. **What I'd do differently** — one paragraph, self-aware not self-flagellating.
10. **Tags + next case study link.**

**Anti-patterns banned:** "challenge / approach / impact" template, Lottie animations, vague metrics, unattributed quotes, fake testimonials, speculative case studies presented as real ones.

Every case study page also has a sticky-ish "back to work" + "contact" mini-bar at the bottom — solves Problem 7 (wrong-landing-page).

---

## /now page format (LOCKED)

```
// last updated MM.DD.YY

Currently building [one specific thing] for [one reason].

Shipped this month
— thing 1
— thing 2

Learning
— concept / book / tool

Reading
— book + author

Listening to (optional)
— podcast / album

Pune, this month: [one seasonal/local detail]
```

Under 300 words. Updated monthly with timestamp. Brutalist treatment from the brand kit is fair game on this page.

---

## /about page (LOCKED structure)

1. Photo (B&W, environmental, side-lit, off-center, NOT a headshot — see BRAND.md photography rules)
2. Long-form story, ~600–800 words, roughly chronological:
   - Where Shreyas is now (PM at Amber)
   - What came before, why product
   - Founder ventures (Rada, Sattva, Cultured Cult) inline as PM-relevant texture, one paragraph each — what each taught about distribution / retention / community / shipping
   - The throughline
3. "What I'm into right now" — short side-section: reading, watching, building, listening to. Updated quarterly.
4. Contact CTA — Calendly link + email, in a quiet card.
5. Small mono `// elsewhere` sidebar — TEDx talks, keynotes, articles in Femina/TOI/Sakal, awards. Not its own section.

---

## /contact page

Three options, presented equally:
1. Email (with one-line copy: "If it's a hiring conversation, here's what to include")
2. Calendly embed (15-min intro slot)
3. Resume (PDF) — same modal as the homepage CTA, embedded inline

No form. The voice doc says "Got it. I'll be in touch — usually within a day or two." That's the success state if a form is ever added later.

---

## /tools page

Not in top nav. Linked from footer and (when relevant) from the homepage About paragraph.

Grid of small project cards. Each: small screenshot (color allowed here — exemption per brand kit), title, one-sentence description, status pill (`● live` / `archived` / `private`), external link if live, source link if open.

Brutalist treatment from the brand kit is allowed here — thicker borders, hard offset shadows, monospace. Brutalist as a section technique, not the whole site.

`/tools/[slug]` only exists for tools warranting deeper write-ups (e.g., q-bot if it grows, anything that becomes a sub-brand). Most tools live as cards.

---

## What's explicitly cut

- ❌ Speculative case studies from old portfolio: Swiggy Dineout, EventBeep AI Guru, Neosurge, PassionBits, Jar App, Minus Hunger. Not archived, not linked, not mentioned. (May become a single /writing post later: "What I learned from doing six speculative case studies.")
- ❌ "Trusted by" logo strip (Rada and KeepMovingMovement were communities Shreyas co-founded — not real client logos).
- ❌ "More Than Just a PM" homepage sprawl.
- ❌ Stock testimonials.
- ❌ FAQ section.
- ❌ /tools in top nav.
- ❌ Filter UI on /work (defer until ≥6 case studies).
- ❌ "Coming soon" placeholders.
- ❌ Animated landing transitions (cinematic load is for home hero only, already in kit).
- ❌ "Skills / Superpowers" list.
- ❌ Photo on homepage.

---

## What was explicitly added (vs. the original brief)

- Per-page OG image generation via `@vercel/og` — uses the OG template from styleguide.html section 13.
- RSS feed at `/rss.xml` for `/writing`.
- "View source" footer link to GitHub repo.
- 404 page using shrey.lab voice (drafted in styleguide.html section 15).
- `prefers-reduced-motion` handling (already in tokens.css).
- PDF resume must be inline-viewable (modal with embedded PDF), not a Drive link.

---

## Sanity schemas (build first)

- **`caseStudy`** — title, slug, year, company, role, timeline, teamSize, myContribution, outcomeSentence, problemBlock, decisionBlock, buildBlock, outcomeBlock, reflectionBlock, heroImage, screenshots[], ogImage, tags[], status (`draft` | `in-progress` | `published`), ordering
- **`article`** — title, slug, publishedAt, readingTime (computed), body (portable text), heroImage, ogImage, tags[]
- **`tool`** — title, slug, status (`live` | `archived` | `private` | `in-progress`), description, screenshot, externalLink, sourceLink, hasDeepPage (boolean), body? (portable text, only if hasDeepPage)
- **`nowEntry`** — month, year, currentlyBuilding, shipped[], learning[], reading[], listening[], puneNote, lastUpdated
- **`siteSettings`** — heroSentence, heroSupporting, currentlyBuildingPill, contactEmail, calendlyLink, socialLinks (LinkedIn, GitHub, Twitter/X), resumeFile (PDF asset), githubRepoUrl

The `caseStudy.status` field is critical for the placeholder treatment at launch:
- `draft` — invisible to public site
- `in-progress` — card visible on `/work` with "→ in progress" instead of "→ read"; deep page returns 404
- `published` — card visible, deep page live, link active

---

## Featured work at launch (locked)

Three placeholder cards on `/work` and the homepage. Real eyebrows, real titles (drafted from inventory), real outcome sentences. Status: `in-progress`. Cards visible, deep pages disabled until inventory is filled and case studies are written.

The three slots, candidates locked from the resume + first-pass review:

1. **University white-label channel** (Amber, 2024–25) — strategic reframe case study; ~50% conversion, zero paid CAC.
2. **Property listing conversion (image-driven UX)** (Amber, 2024) — diagnosis → ship → measure case study; 18% booking lift.
3. **Internal ticketing tool (Suptask replacement)** (Amber, 2024) — build-vs-buy tradeoff case study; $20K/yr saved.

Final case study list confirmed after inventory dump.

---

## Pending decisions (unblock from inventory)

- [ ] Currently-building text for homepage status pill
- [ ] Hero sentence — three variants drafted from inventory specifics
- [ ] Email decision (Gmail vs. custom domain)
- [x] About-page photo — deferred; placeholder treatment at v1, real photo drops in later via Sanity
- [ ] Calendly meeting type URL
- [x] GitHub repo — private at `github.com/amoebashrey/shrey.lab.git` (will flip to public at launch for "View source" link)
- [ ] Confirm target companies and target role level
- [ ] Confirm three featured case studies after inventory review

---

## Build sequence (locked)

1. ✅ Brand kit complete (`./shrey-lab/`)
2. ✅ Project brief locked (this document)
3. ⏳ Inventory dump (Notion: see questionnaire at `https://app.notion.com/p/352f4a058e71816e8a53f5d8ec9f17f9`)
4. ⏳ Lock placeholder case study titles + outcome sentences from inventory
5. ⏳ Draft three hero sentence variants
6. ⏳ Scaffold project: Next.js + Tailwind + brand kit + Sanity
7. ⏳ Sanity schemas + Studio deployment
8. ⏳ Homepage build
9. ⏳ Case study template + /work index
10. ⏳ /about, /now, /contact
11. ⏳ /tools, /writing
12. ⏳ 404, OG images, RSS, sitemap
13. ⏳ Domain wire-up + first deploy to Vercel
14. ⏳ Resume v1 (parallel workstream from inventory)

---

*shrey.lab — PROJECT_BRIEF.md — v1.0 — locked 05.01.26*
