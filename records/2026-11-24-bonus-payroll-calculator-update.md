# Bonus payroll calculator update — 2026-11-24

- URL: https://truepayrollcost.com/bonus-payroll-calculator/
- Keyword: `bonus payroll calculator`
- Topic: employer-side bonus cost by the employee's wage-base position, plus the FLSA overtime true-up.
- This is an **update to the November 23, 2026 page, not a new page**. URL, canonical, keyword focus and first-screen fixture are unchanged; the page was extended in place. No new page shipped on November 24 — the scheduled 08:30 pipeline heartbeat chose `DONT_NOTIFY` and skipped the day's work, and this update was made afterwards on the owner's instruction to read the competitor bodies first.
- Also fixed in the same pass: the page had no `<footer>` element, so it rendered without the site footer navigation; and the calculator printed `$1076.50` while the page's own text said `$1,076.50`. Both corrected. The number format now matches the house `toLocaleString` pattern already used by the employer payroll taxes and gross-up pages.

## Research method and its limitation

- The owner required the top-10 competitor bodies for the keyword to be read before deciding whether to supplement the page. They have now been read, and the result changed the page.
- **Limitation, stated honestly:** the ranked candidate list was collected from a web-search provider on November 24, 2026, **not** from the signed-in Google Chrome profile. The browser-skill extension did not attach to any running Chrome instance in this session (`bsk browsers` returned 0 browsers connected, and the daemon could not bind one), and the standing rules forbid starting a new browser window or profile. This is therefore a provider ranking on one date, **not** a verified signed-in Chrome result set and **not** a verified physical US-location result set.
- **Counts:** 15 distinct candidate URLs surfaced across three queries. 13 are US-relevant; 2 are non-US (a UK PAYE bonus calculator and a Solomon Islands PAYE guide) and are excluded from the US comparison. By type: **6 employee-side take-home or withholding calculators that compute no employer cost, 1 bonus-amount-only calculator that computes no tax and no employer cost, 3 employer-side calculators, 3 employer guides, 2 non-US pages.**
- **How each was read:** 3 of the 15 were fetched directly and read as the live page (CPA Firm South Florida, employercost.com, FirstHR). The other 12 were read from the search provider's body excerpts, which carried each page's main body text in substance rather than a title-only snippet. No candidate was counted on its title alone. The three directly fetched pages are the ones the findings below quote.
- No page was quoted, paraphrased or reproduced on our page. The page names no competitor.

## Candidates read

| # | URL | Type |
| --- | --- | --- |
| 1 | neocalculators.com/bonus-payroll-calculator-2 | employee take-home |
| 2 | ultimatefinancecalculator.com/calculators/bonus-calculator | employee take-home |
| 3 | neocalculators.com?p=7265/ | employee take-home |
| 4 | madyhr.ai/us/resources/tools/bonus-calculator | employee take-home |
| 5 | bravecalculator.com/?p=19397 | bonus amount only — no tax, no employer cost |
| 6 | onlinetoolkit.co/payroll-burden-calculator/ | employer-side calculator (annual burden, prior SS wages input) |
| 7 | onpay.com/payroll/calculator-tax-rates/ | employee gross-to-net hub, incl. bonus calculators |
| 8 | 777calculator.com/adp-calculator | employer-side calculator (ADP-style, bonus + employer cost) |
| 9 | brittaxcalc.store/bonus-tax/ | non-US (UK PAYE) |
| 10 | employercost.com/employer-payroll-tax-calculator | employer-side calculator, bonus wage-cap table |
| 11 | payhroll.com/blog/bonus-payroll-taxes | employer guide |
| 12 | ird.gov.sb — A Guide for Employers: Taxing Bonus Payments | non-US (Solomon Islands PAYE) |
| 13 | firsthr.app/blog/payroll/how-are-bonuses-taxed | employer guide |
| 14 | ustaxcalculators.com/calculators/bonus-and-commission-withholding | employee withholding estimator |
| 15 | cpafirmsouthflorida.com/?p=3924 | employer guide |

## What the reading showed

- **The plain 7.65% multiply is not an exclusive increment.** CPA Firm South Florida (read directly) publishes the identical **$1,076.50** total employer cost for a $1,000 bonus in its gross-versus-net table. FirstHR (read directly) gives "roughly **$5,383**" for a $5,000 bonus. The fixture is therefore not claimed as an exclusive increment anywhere on the page, and the page states the condition it holds under instead.
- **Six of the fifteen are employee-side take-home or withholding calculators that compute no employer cost at all**, and a seventh computes only the bonus amount from salary and percentage. They answer what the employee keeps, not what the employer pays.
- **The independent gap this page now occupies:** an employer-side bonus cost model that is position-aware across the employer's wage bases at once — the same bonus costs the employer different amounts depending on where that employee's 2026 wage bases already stand — together with the overtime true-up a nondiscretionary bonus can create. The one candidate with a bonus wage-cap table (employercost.com) covers the FICA increment only; the one with the full employer worksheet columns (FirstHR) publishes a worksheet, not the arithmetic. No candidate in the set does both.

## Official sources checked November 24, 2026

- IRS Topic 751 (https://www.irs.gov/taxtopics/tc751) — Social Security 6.2% employer / 6.2% employee; Medicare 1.45% employer / 1.45% employee; "For earnings in 2026, this base limit is $184,500"; "There's no wage base limit for Medicare tax"; Additional Medicare tax 0.9% on wages an employer pays above $200,000, with no employer match.
- IRS Publication 15 (https://www.irs.gov/publications/p15), section 7 — the optional flat 22% rate may be used only if the supplemental wage is identified separately from the regular wage payment **and** the employer withheld income tax on the employee's regular wages on a regular basis during the year, or the employee had income tax withheld in the immediately preceding calendar year; otherwise the aggregate method applies. An employer must withhold at the highest rate of 37% on any supplemental wage paid to an employee during the calendar year if the wages paid to that employee during the calendar year exceed $1 million. The 2026 Social Security wage base is $184,500.
- DOL Fact Sheet #56C, "Bonuses under the Fair Labor Standards Act (FLSA)" (https://www.dol.gov/agencies/whd/fact-sheets/56c-bonuses, fact sheet dated December 2019) — a discretionary bonus is excludable from the regular rate only if all three statutory requirements are met; "The label assigned to the bonus and the reason for the bonus do not conclusively determine whether a bonus is discretionary"; nondiscretionary bonuses must be included in the regular rate of pay; the regular rate is total compensation for the week divided by total hours worked and overtime already paid is recalculated and topped up; a discretionary bonus "may not be credited towards overtime compensation due under the FLSA."

## Arithmetic added

- Employer FICA on a bonus = 6.2% × the part of the bonus still below the employee's 2026 Social Security wage base, plus 1.45% × the whole bonus (no Medicare cap).
- New three-position $5,000 table: $170,000 already paid → $14,500 room → $310.00 Social Security + $72.50 Medicare = $5,382.50; $180,000 already paid → $4,500 room → $279.00 + $72.50 = $5,351.50; $186,000 already paid → $0 room → $0.00 + $72.50 = $5,072.50. Employer Medicare is $72.50 in every case; employer Social Security falls from $310.00 to $0.00, a $310.00 difference.
- $1,000 bonus below the wage base: $62.00 Social Security + $14.50 Medicare = **$1,076.50**. Above the wage base: $0.00 Social Security + $14.50 Medicare = **$1,014.50**.
- Federal unemployment tax: 0.6% on the first $7,000 of the employee's 2026 wages with the full state credit — $30.00 on a $5,000 bonus if the employee has not yet reached $7,000 of FUTA wages, $0.00 if they have, partial in between. A state's credit reduction can raise the rate above 0.6%, so the figure comes from the employer's notice. Kept as an entered amount, consistent with the employer payroll taxes page; no FUTA field was added to this page's calculator.
- Overtime true-up worked example (self-calculated, non-exempt): $20.00/hour, 45 hours in the week, $500.00 nondiscretionary bonus covering the period. Straight time $20.00 × 45 = $900.00; total compensation $900.00 + $500.00 = $1,400.00; regular rate $1,400.00 ÷ 45 = $31.1111… → $31.11; half-time premium $31.1111… × 0.5 = $15.5555… → $15.56; overtime hours 45 − 40 = 5; overtime compensation due $15.5555… × 5 = $77.7777… → $77.78; total due $900.00 + $500.00 + $77.78 = $1,477.78. Without the bonus in the regular rate the overtime already due would have been $900.00 ÷ 45 = $20.00, half-time $10.00, $10.00 × 5 = $50.00. Including the bonus in the regular rate adds $27.78 of extra overtime premium on top of the $500.00 bonus.

## CSV rows added

- `downloads/bonus-payroll-calculator-examples.csv` rewritten with the `ss_wages_already_paid_2026` column and five calculation rows: (1000, 0) = $1,076.50; (1000, 186000) = $1,014.50; (5000, 0) = $5,382.50; (5000, 180000) = $5,351.50; (5000, 186000) = $5,072.50. Six fields on every line, header plus five rows.

## Scope boundaries kept

- State unemployment, workers' compensation, benefits, local taxes and the overtime true-up stay pending or separate; none is filled in as zero.
- The Additional Medicare tax has no employer match, so it does not enter the employer cost.
- The overtime true-up applies only to a non-exempt employee and only when the bonus is nondiscretionary; it depends on hours the page cannot know, so it stays pending until the employer has the employee's hours and the period the bonus covers.
- The 22% and 37% figures are employee withholding, not employer cost and not the employee's final tax.

## Verification performed

- Build: 39 published pages; sitemap still 39 URLs — no route added or removed, this is an in-place page update; `npm test` — 45 passed, 0 failed.
- Calculator script re-read from the built HTML and executed against a stubbed DOM for six cases: $1,000 below the base → $62.00 / $14.50 / $1,076.50; $1,000 above the base → $0.00 / $14.50 / $1,014.50; $5,000 at $0 / $180,000 / $186,000 already paid → $5,382.50 / $5,351.50 / $5,072.50; and the crossing case $182,000 already paid → $155.00 + $72.50 = $5,227.50, which independently reproduces the figure published by employercost.com for the same position.
- Built page: canonical correct, site footer injected, all six source entries carry "checked November 24, 2026", internal links to `/employer-payroll-taxes/`, `/gross-up-calculator/` and `/supplemental-tax-rates/` present.
- Site-wide sweep before publishing: all 39 sitemap routes returned HTTP 200, assets and both CSVs returned 200, `robots.txt` 200, an unknown path returned 404.
- Live verification after push is required before this is counted as published.
