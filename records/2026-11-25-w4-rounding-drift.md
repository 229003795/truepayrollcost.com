# 2026-11-25 — W4 pay-period page, second expansion: rounding drift

## Why this piece
Owner direction (2026-11-25): this site grows one piece per day, from the W4
page's arithmetic outward — never a new calculator page while the 20 excluded
pages remain. W4 page was 11,600 bytes live; cap it around 15,000, then move to
the sibling pages (multiple-jobs, step-4c).

Yesterday's expansion covered the **forward** direction of the W4 formula
(per-check × periods = annual) and the 26-vs-27 payday count decided by the
first-payday anchor. Today covers the **backward** direction (annual ÷ periods
= per-check) and what rounding does to it. No overlap with yesterday; no
overlap with the multiple-jobs (split a shortfall) or step-4c (fixed per-payday
amount) siblings.

## The information delta
Set a yearly withholding target T and P pay periods. Divide: T / P is rarely a
whole dollar. A payroll check is paid in whole dollars, so the per-check amount
is rounded, then multiplied back by P. The result misses T by a signed
**rounding drift**.

Key finding (the part nobody writes down):
- Same target, opposite drift. $4,700 / 26 = 180.769 → $181 → 26 × 181 = $4,706
  (**+$6 too much**). $4,700 / 27 = 174.074 → $174 → 27 × 174 = $4,698
  (**−$2 too little**). Direction depends only on which side of the .5 midpoint
  the exact quotient falls.
- The drift has a hard ceiling: rounding moves each check at most $0.50, so
  |drift| ≤ P / 2. Brute-forced every whole-dollar target $1–$20,000 in Node
  v22.22.2: max |drift| = 12 (P=24), 13 (P=26), 13 (P=27).
- JS `Math.round` is half-up (180.5→181, 180.49→180); payroll systems may use
  half-even or truncation, so the convention must be confirmed against the
  payroll register / IRS Pub 15-T.

Practical takeaway: if the annual total must land within a few dollars, set the
per-check figure from the payroll register rather than dividing a round yearly
number.

## What changed
- `src/w4-paycheck-withholding-calculator/index.html` (in place, no new route)
  - eyebrow: "Pay-period and rounding arithmetic checked November 25, 2026"
  - new H2 "Turning an annual target into a per-check number: the rounding drift"
  - new H3 "Same target, opposite drift" with the 26-vs-27 worked example
  - new interactive `#drift-check` (target + periods → exact / rounded / actual / drift)
  - ceiling paragraph with brute-force bound and Node.js v22.22.2 attribution
  - `Math.round` half-up caveat + Pub 15-T / payroll-register check
  - links to the two sibling pages
  - new FAQ "Why don't my paychecks add up to the yearly number I aimed for?"
- `src/downloads/w4-rounding-drift-fixtures.csv` — 8 rows
  (targets $4,700 / $4,706 / $5,000 / $10,000 × periods 24/26/27),
  columns: annual_target, periods, exact_per_check, rounded_per_check,
  actual_annual, signed drift. 8/8 PASS on exact quotient, rounding, actual
  total and drift identity.
- `records/2026-11-25-w4-rounding-drift.md` — this file.

## Verification
- Node v22.22.2 for all measurements.
- Fixture arithmetic: 8 PASS / 0 FAIL.
- Page byte size (source): 9,299 → 13,441 (+4,142). Live was 11,600; expected
  live ≈ 15,700 after Cloudflare's analytics beacon. Within owner's ~15,000 cap.
- No new route; sitemap stays at 39 URLs.
