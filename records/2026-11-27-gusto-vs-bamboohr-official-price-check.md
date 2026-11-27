# Official price check — Gusto vs BambooHR — checked 2026-11-27

All figures below were read directly from vendor-owned pages with WebFetch on 2026-11-27. No third-party review price is used as evidence for a vendor number. Fields that could not be confirmed from a first-party page are written as **待确认**, not estimated.

## Gusto — official pages read

### Primary source used for this page: https://gusto.com/pricing

Read twice on 2026-11-27 with the same result. Page title: "Gusto Pricing, Plans & Fees (2026) | How Much Does Gusto Cost?".

| Plan name as printed | Base monthly fee | Per-person monthly fee | Scope line printed on the card |
|---|---|---|---|
| `simple` | `$49/mo` | `+ $6/mo per person` | "Run basic payroll in one state." |
| `plus` (BEST VALUE) | `$80/mo` | `+ $12/mo per person` | "Confidently pay a mixed workforce and expand in new states." |
| `premium` | `$180/mo` | `+ $22/mo per person` | "A named advisor as you scale, with built-in compliance, HR guidance, and financial tools." |

The same page states "Unlimited payrolls per month" and "Tax filings and payments" under popular features for Simple; the plan comparison marks payroll administration, direct deposits or printable checks, tax filings and payments, payroll approvals, and domestic contractor payments as "Applicable" on all three plans. It also states "No contracts. Free account setup. Switch or cancel anytime."

This matches the rates already published on this site (`/gusto-pricing/`, `/gusto-vs-onpay/`), so this is the source used for the new page's five-worker math.

### Conflict found on a second official URL: https://gusto.com/product/pricing

Read twice on 2026-11-27 with the same result, same page title, but different plan cards:

| Plan name | Base monthly fee | Per-person monthly fee |
|---|---|---|
| `simple` | `$49/mo` | `+ $7/mo per person` |
| `plus` | `$99/mo` | `+ $12/mo per person` |
| `premium` | `$179/mo` | `+ $22/mo per person` |

Both URLs are vendor-owned; both were fetched twice; neither displayed an offer or region note in the fetched body. **The reason for the difference is 待确认** (possible variant/offer allocation; the fetched body gave no explanation). Consequence: the new page uses the `https://gusto.com/pricing` figures for batch consistency and cites that exact URL with the checked date. A future maintenance pass should re-check both URLs and reconcile before changing the published math. This conflict is not hidden on the page: the official-sources section links the exact URL used.

Also read: https://gusto.com/product/price/simple returned only "Get unlimited access and don't pay a cent until you run payroll." — no rate card in the fetched body, so it is not used as a price source.

### Gusto figure used on the new page

- Simple: `($49 + $6 × 5) × 12 = $948/year`
- Plus: `($80 + $12 × 5) × 12 = $1,680/year`
- Premium: `($180 + $22 × 5) × 12 = $3,480/year`

These are subscription-only subtotals before add-ons, wages, employer taxes, benefits, and internal time.

## BambooHR — official page read

### https://www.bamboohr.com/pricing

Read multiple times on 2026-11-27. Page title: "BambooHR Plans and Pricing".

Verbatim statements actually present in the fetched body:

- "Comprehensive. Take care of everything HR, payroll, and benefits in one platform."
- "Flexible. Find the perfect fit with multiple plan options and add-ons."
- "One low monthly payment. Pay per employee, per month. Automatic volume discounts."
- Plan cards: `Core` — **`$10` USD* per employee/month**; `Pro` — **`$17` USD* per employee/month**; `Elite` — **`$25` USD* per employee/month**. Each card has a **"Get Quote"** action.
- Star footnote is present as an asterisk after each price but **the footnote text was not present in the fetched body → 待确认**.
- Core includes "Employee Records", "Custom Report Builder", "Workflows and Approvals", "Time-Off Management", "Benefits Tracking", "eNPS"; Pro adds "360º Review Cycles", "1:1s", "Recognition & Rewards"; Elite adds "Compensation Planning", "Salary Benchmarking", "Customizable Dashboards".
- No payroll add-on dollar price appeared in the fetched body. No small-team flat-floor amount appeared in the fetched body.

**What this means:** BambooHR does publish per-employee *list* rates for its HR plans ($10/$17/$25), and the page routes every plan to "Get Quote" and states automatic volume discounts. It does **not** publish a payroll price on this page. The widely repeated "flat $250/mo for 25 or fewer" floor appears in third-party pages but **not** in the official body I read → **待确认; not used on the new page**. Promotions mentioned only in third-party pages (e.g. a 2026 payroll fee promotion and a 15% Payroll + Benefits Administration discount) are likewise **待确认 from a first-party page** and are not used as numbers.

### https://www.bamboohr.com/platform/payroll

Official product page read on 2026-11-27. It describes payroll for "US-based employees", "STATE & FEDERAL TAX FILING", W-2 creation, direct deposit, multi-rate payroll, "Managed Payroll Services", and a "Request a Demo" action. **No price and no quote amount are published in the fetched body → payroll price 待确认.** This is a product-capability page, not a price list. The presence of a separate payroll product page, alongside the pricing page's "add-ons" wording, supports treating payroll as a separately purchased product rather than part of the quoted HR-plan subscription — but the exact commercial packaging (add-on vs separate subscription) is **待确认 in the quote**.

### https://www.bamboohr.com/partner-programs/referral-program

Official page read on 2026-11-27 to check the "partner/referral" angle. It is a **referral partner program**, not a product price page: "Earn by Referring BambooHR", "Up to 30% Commission from activated referrals or commissions as client discounts", "Exclusive, referral-only discounts on implementation", "Custom trial, demo, and homepage URLs specific to your partner account".

Relevance: a third-party comparison page in the top-ten audit links its "BambooHR pricing" cards to this referral URL. That is a **referral/channel link, not a published price source**. Any discount obtained through a referral partner is account-specific → **待确认**, and no referral discount is used in the page math.

Two guessed official subpages, https://www.bamboohr.com/pricing/add-ons and https://www.bamboohr.com/platform/payroll/pricing, both returned "Oops. Looks like this page is out on PTO." (Not Found). They are not used as sources.

## Summary of confirmed vs unconfirmed

| Field | Status | Source |
|---|---|---|
| Gusto Simple `$49/mo + $6/person`; Plus `$80 + $12`; Premium `$180 + $22` | **Confirmed** | gusto.com/pricing, fetched twice 2026-11-27 |
| Gusto payroll and tax filing included in every plan; Simple one state | **Confirmed** | gusto.com/pricing, fetched 2026-11-27 |
| Gusto variant `$49 + $7` / `$99 + $12` / `$179 + $22` on gusto.com/product/pricing | **Confirmed as a discrepancy**; cause 待确认 | gusto.com/product/pricing, fetched twice 2026-11-27 |
| BambooHR Core `$10` / Pro `$17` / Elite `$25` USD per employee/month, asterisk, "Get Quote" | **Confirmed as published list rates** | bamboohr.com/pricing, fetched 2026-11-27 |
| BambooHR asterisk footnote text | **待确认** | not present in fetched body |
| BambooHR automatic volume discounts | **Confirmed as a statement**; amount/terms 待确认 | bamboohr.com/pricing |
| BambooHR small-team flat floor (e.g. `$250/mo`) | **待确认** | absent from official body; third-party only |
| BambooHR payroll price / add-on price | **待确认** | absent from bamboohr.com/pricing and /platform/payroll |
| BambooHR promotion / 15% bundle discount / referral-only discounts | **待确认 from first-party price page** | referral page confirms referral program exists, not its price effect |
| Whether payroll is an add-on vs a separate subscription line | **待确认 in quote** | official pages show a separate payroll product and "add-ons" wording, no packaging detail |

## Rule applied to the published page

Only the confirmed Gusto subscription formula is annualized. The BambooHR list rates are shown as printed, with their "Get Quote" and volume-discount conditions attached, and are **not** annualized into a side-by-side cost verdict. The page judges **product range and scope**, not which option is cheaper.
