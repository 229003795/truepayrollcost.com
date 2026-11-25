# W-4 pay-period boundary release — 2026-11-25

- URL: https://truepayrollcost.com/w4-paycheck-withholding-calculator/ (expanded existing page, no new calculator page)
- Change: added "26 or 27 paychecks in 2026? Check the anchor, not the year" section + interactive pay-period counter + one FAQ entry, and updated dateModified to 2026-11-25.
- Rationale: this page is the only property page Google has moved (3400% impressions growth). Extend it rather than creating a separate page.
- Core finding: a biweekly year has 26 or 27 paydays depending on the first-payday anchor, not the year number. A January 1 anchor yields 27 (last payday Dec 31); a January 2 anchor yields 26 (last payday Dec 18). Same result in 2025, 2026 and 2027; weekday changes, count does not. At the worksheet example of $181/check ($156 regular + $25 Step 4(c)), 27 periods = $4,887.00 vs 26 periods = $4,706.00.
- Measurement: Node.js v22.22.2, counting every 14th day from the first payday up to but not including January 1 of the following year.
- Asset: `downloads/w4-pay-periods-fixtures.csv` with 6 rows (2025–2027 × Jan 1 / Jan 2 anchors); each row checked for per-check × periods = annual estimate arithmetic consistency.
- Scope boundaries: this is a pay-period count and an annualization check, not a W-4 recommendation or an IRS percentage-method calculation. Existing source-check date (November 12, 2026) preserved; pay-period arithmetic checked November 25, 2026.
- Verification checklist: npm test, npm run build, page/CSV HTTP status, canonical, sitemap count (39 unchanged), no new page created.
