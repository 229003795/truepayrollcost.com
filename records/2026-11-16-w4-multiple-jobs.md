# 2026-11-16 — W-4 multiple jobs withholding calculator

- Target: split an estimated annual shortfall between two jobs using each job's remaining paydays.
- URL: https://truepayrollcost.com/w4-multiple-jobs-withholding-calculator/
- Example: $1,200 split 50/50 gives Job A $600/20 = $30 and Job B $600/12 = $50 per paycheck.
- Boundary: allocation arithmetic only; does not determine the underlying annual tax shortfall or run IRS tables.
- Official source checked November 16, 2026: IRS Publication 505 and Publication 15-T.
- Build: `npm run build` — 31 published pages; `npm test` — 45 passed, 0 failed.
- Live: page HTTP 200 (6,793 bytes), CSV HTTP 200 (351 bytes), sitemap HTTP 200 with 31 URLs and route present.
- Commit: `ac0a3e1` pushed to `main`.
