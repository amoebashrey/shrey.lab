# CHANGELOG

> Human-readable log of every shipped change. Pairs with `docs/DECISION_LOG.md` (which captures the *why* behind decisions) and git tags (which provide the rollback point).
>
> Format: `vX.Y` heading, dated, with one bullet per shipped change. Each bullet maps to a single git commit; the `git rev` reference makes it trivial to revert.
>
> To roll back: `git checkout vX.Y` (working tree only) or `git revert <sha>` (single change).

---

## v0.2 — 2026-05-03 — Restraint pivot (in progress)

Surgical homepage + global-layout changes. Each bullet is one git commit; revert with `git revert <sha>` or roll the working tree back with `git checkout v0.1`.

- **hero**: replaced single long sentence with restrained 3-line title (Geist + two Instrument-Serif italic lines). Removed the Amber/FamPay sub-paragraph and the in-hero status pill. Extracted CTAs to a separate `HeroCTAs` component below the title with 64px+ breathing room. Resolves BUG-002 (hero too long) and BUG-003 (Amber-as-identity overclaim).
  - **hero (correction)**: hierarchy fix — only "Product manager." stays at display scale; the supporting sentence drops to ~28px italic Instrument Serif as one flowing line. Earlier version had all three lines at display scale, which made the hero consume the entire fold.

---

## v0.1 — 2026-05-01 — Foundation chunk

Baseline scaffold. Everything below ships as a working Next.js 14 site with placeholder content.

- Next.js 14 + App Router + TypeScript scaffolding
- Tailwind config consuming brand kit preset
- Root layout with theme toggle, FOUC prevention, Geist + Instrument Serif font loading
- Top nav (4 items: Work · Writing · About · Contact) + glass on scroll
- Footer (signature + secondary nav + contact + view source)
- Homepage with all locked sections (hero, outcomes, featured work, about teaser, latest writing, now teaser)
- `/work` index with placeholder cards · `/work/[slug]` 404s until CMS lands
- `/writing` index empty state · `/writing/[slug]` 404s
- `/about` photo placeholder + story stub
- `/now` brutalist treatment, locked format
- `/tools` empty state · `/tools/[slug]` 404s
- `/contact` three equal options (email · calendar · resume)
- Custom 404 in shrey.lab voice
- Resume modal (inline PDF, not Drive link)

---
