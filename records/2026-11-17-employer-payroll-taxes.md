# 2026-11-17 — Employer payroll taxes calculator

- Keyword: `employer payroll taxes` (user-authorized US twelve-month average 1,900).
- URL: https://truepayrollcost.com/employer-payroll-taxes/
- Example: $60,000 wages → $3,720 employer Social Security + $870 Medicare + $42 entered FUTA = $4,632 federal subtotal.
- Boundary: state/local taxes, benefits and unconfirmed FUTA facts remain separate or pending; employee withholding is excluded.
- Official sources checked November 17, 2026: IRS Publication 15, IRS Topic 751, and SSA 2026 Fast Facts.
- Build: `npm run build` — 32 published pages; `npm test` — 45 passed, 0 failed.
- Live: page HTTP 200 (7,007 bytes), CSV HTTP 200 (352 bytes), sitemap HTTP 200 with 32 URLs and route present.
- Disk recovery: cleared regenerable npm cache after ENOSPC; no source files removed.
- Commit: `479ab37` pushed to `main`.
