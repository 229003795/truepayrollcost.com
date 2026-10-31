# Homepage reading hierarchy — 2026-10-31

User authorized implementation after the Rippling comparison. One existing homepage optimized, zero new pages. Isolated worktree based on origin/main d0b6d23; existing uncommitted files in the Rippling checkout untouched.

Changes:
- Homepage-only stylesheet now loads last, with a single layout definition: preset selection, three result cards, primary action, separate missing-input list and expandable pricing/calculation explanation. Official source/date remains visible.
- Short pending state replaces the long missing-field sentence in the total slot. Detailed missing fields remain visible in the dedicated list and confirmation checklist.
- Input borders #7d8fa2; consistent label/control spacing and button alignment; narrow layouts stack cards and inputs.
- Three vendor bridge sections grouped into one resource section; their original paragraph text and links retained.
- No rates, calculation core, preset values, storage/URL rules, or export module changes. Shared design script changes are scoped to homepage annualBreakdown rendering.

Validation:
- node syntax checks passed for design.js and calculator.mjs.
- npm test: 32 passed, zero failures.
- npm run build: 17 pages, no new URL.
- DOM integration using linkedom: default948; full cash1228 + internal50 =1278; explicit blank state; QuickBooks1314; ADP unknown; source/date, details, missing list and vendor links. This is not rendered-browser/mobile QA.
- Reproduce DOM integration: npm install --no-save --package-lock=false linkedom; npm run build; node scripts/home-reading-dom-check.mjs. linkedom is a local test-only dependency, not a production asset or package.json change.

Deployment: use existing main -> Cloudflare Pages Git integration. Live verification evidence saved after deployment separately. No GSC requests, no sitemap resubmission, no new article, no browser windows created.

Remaining limitation: specified BrowserSkill instance has no reusable session, while session start creates a prohibited Agent Window. Desktop/mobile visual inspection remains unverified; do not mark it passed.
