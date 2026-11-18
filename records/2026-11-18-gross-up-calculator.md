# 2026-11-18 gross-up calculator

- URL: https://truepayrollcost.com/gross-up-calculator/
- Keyword: gross up calculator (user-authorized, US monthly average 1,600; low competition)
- Scope: employer supplemental-payment gross-up; target net plus confirmed withholding, employer Social Security and Medicare; unknown FUTA/state/local/benefit costs remain pending.
- Source dates: IRS Publication 15, IRS Publication 15-T, and SSA 2026 Fast Facts checked November 18, 2026.
- Example: $1,000 target net + $250 entered withholding = $1,250 gross; employer Social Security $77.50; Medicare $18.13; known subtotal $1,345.63.
- Verification: local build produced 33 pages; `npm test` passed 45/45. After deployment, page HTTP 200 (7,627 bytes), CSV HTTP 200 (472 bytes, text/csv), canonical exact, formula present, and sitemap contains `/gross-up-calculator/`.
- Commit: da42232 (pushed to main); Cloudflare production verified after propagation.
