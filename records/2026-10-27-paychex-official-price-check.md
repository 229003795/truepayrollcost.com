# Paychex official price check — 2026-10-27 (Asia/Shanghai)

Page: /paychex-pricing/ (batch 1, item 1 of `2026-10-27-vendor-cost-batch-1.md`).

## Why this record is unusual

Paychex does **not** publish a rate card. Every pricing surface on paychex.com resolves to
`Request Pricing` / `Get a Quote` at `/contact/sales`. The single most valuable official fact for this
page is therefore the **shape of the quote**, not a number: which billing units Paychex uses, which
plan tiers exist, and which costs Paychex states as industry ranges rather than as its own prices.

Everything below was read from paychex.com (or a Paychex-owned domain) on **2026-10-27**.

## Access constraint (recorded so it is not mistaken for a missing check)

`www.paychex.com` returns **Cloudflare Error 1009** to this machine's IP (region KR):
"The owner of this website (www.paychex.com) has banned the country or region your IP address is in (KR)."
Verified in the logged-in Chrome (tab title `Access denied | www.paychex.com used Cloudflare to restrict access`)
and by direct request (`403` on `www.paychex.com/articles/...` and `www.paychex.com/employer-resources`;
`paychex.com` without `www` did not connect at all).

The official pages were therefore read through a text-rendering proxy that fetched paychex.com itself.
Content below is paychex.com's own text (page titles, headings, verbatim sentences), not a third-party
summary. `/payroll/pricing` returns **404 — Page Not Found** on paychex.com itself: that path is dead
upstream, so no price can exist there.

Paychex-owned domain that was **not** blocked and was read directly:
`https://www.surepayroll.com/pricing` — HTTP 200, 422,696 bytes. Page footer reads
"© 2026 A Paychex Company". This is a Paychex subsidiary product with its own published rates.

## Official facts — paychex.com (read 2026-10-27)

### Plan structure (source: /payroll/compare-payroll-solutions)

Paychex Flex payroll packages, four tiers, each with **no published price**:

| Tier | Official label | Price on page |
| --- | --- | --- |
| Basic | Essential Payroll & HR | Request Pricing |
| Foundations | AI & HR Features — marked "Best Value" | Request Pricing |
| Advanced | Enhanced Service Needs | Request Pricing |
| Complete | Premium Services | Request Pricing |

Page also states: "Payroll, benefits, compliance, and HR, all in one place.",
"Need help choosing? Call (855) 433-8741". "Get a Free Quote" → `/contact/sales`.
Sales line: 855-263-1021.

### Industry cost ranges (source: /articles/payroll-taxes/payroll-costs-for-small-businesses)

Verbatim, checked 2026-10-27:
- "Generally, businesses can expect to spend between **$30 and $100 per person each month** for outsourcing payroll services."
- "Payroll processing services typically charge a **per-employee fee per month** and recurring costs for the service itself."
- "Businesses can expect to spend between **$30 and $100 per employee per month** with a payroll service provider."
- "Look for upfront, transparent pricing when comparing providers."
- Rule of thumb: total payroll cost can be about **1.25 to 1.4 times** an employee's base pay. At $30/hour base pay → **$37.50 to $42** per hour total cost.

### Single-employee cost (source: /articles/payroll-taxes/payroll-for-one-employee)

Verbatim, checked 2026-10-27:
- "you can expect to pay between **$30 and $100 per month**, depending on whether you use software or a full-service payroll service provider."
- "The employee pay schedule matters, too — **weekly runs often cost more than bi-weekly or monthly ones**, and extras like direct deposit, or tax filing services can add to the bill."
- On-demand pay: flat, **per-transaction fee**, not a monthly rate.

### Product pages that confirm the quote flow

- `/payroll/one-employee-payroll` — "One employee today. A team of five tomorrow. Paychex Flex handles both." Sales-assisted: "We'll Go Over Pricing and How One Employee Payroll Can Help". No published price.
- `/payroll/small-business-payroll` — "All-in-one payroll software with flexible customer support options." "Get a Quote Now". No published price.
- Section index at `/payroll/compare-payroll-solutions` shows the payroll product line: Paychex Flex (Payroll & HR), Paychex Oasis, Paychex Flex HR Essentials, SurePayroll, Paychex Essentials, Paychex Now. SurePayroll is the only one of these with a public rate card.

### Corporate facts (source: /payroll/compare-payroll-solutions, footer)

"© 2026 Paychex Inc. All Rights Reserved." (Paychex Inc. is the parent entity; SurePayroll brands itself
"A Paychex Company".)

## Official facts — surepayroll.com (Paychex subsidiary, read 2026-10-27)

Source: `https://www.surepayroll.com/pricing`, HTTP 200, checked 2026-10-27.

**Small Business Payroll**
- "Unlimited payroll runs, one predictable price" — **starting at $29/month** (Small Business tab)
- Per-worker charge: **$7/worker** (page calculator shows "($7/worker)")
- Multi-state payroll: **$9.99/month**, first state included
- Page's own comparison line: "Others charge between $50-$90/mo for 2 employees in one state."
- Household tab shows **starting at $39/month** for the Small Business tier

**Year-end forms (annual, not monthly)**
- "Year-end W-2 and 1099-NEC forms are billed annually – not monthly – at a **$50 base fee plus $5 per form**."

**Nanny & Household**
- Listed price **$45**, promotional **$39 /mo**, "Includes one employee"

**Add-ons**
- Accounting software integration: **$4.99/month**
- Timeclock software integration: **options start at $5/month + $3 per employee**
- 401(k) plans: "Customized quotes available based on plan selection"
- Employment law: "Plans start at $30/month"

**Promotional terms**
- "During your first 12 months with SurePayroll, every alternating month will be free."
- Also advertised elsewhere on the page: "Get your FREE months when you start today", "Get 6 months FREE".
  *The promotional entitlement is stated with different wordings in different parts of the same page, so the
  exact count and the end condition must be confirmed on a written quote before it enters a budget.*

**Support**
- Sales 877-954-7873 · Service 877-956-7873

## What this page therefore may and may not claim

May claim, as dated official facts:
1. Paychex Flex is quote-based; four tiers exist (Basic / Foundations / Advanced / Complete) with no published price.
2. Paychex's own stated market range is **$30–$100 per employee per month** for outsourced payroll.
3. Paychex's own stated single-employee range is **$30–$100 per month**.
4. Paychex's own stated total-cost multiplier is **1.25×–1.4×** base pay (i.e. $30/hour → $37.50–$42/hour).
5. Pay frequency and add-ons (direct deposit, tax filing) move the bill.
6. SurePayroll, a Paychex company, publishes a flat rate card: $29/mo base + $7/worker, $9.99/mo multi-state,
   $50 + $5/form annual year-end fee, $39/mo household tier including one employee.

May NOT claim:
- Any Paychex Flex dollar amount. No such number exists on paychex.com.
- A Paychex setup fee, per-employee Flex rate, or annual fee. Not published anywhere on paychex.com.
- That the SurePayroll rate card is the Paychex Flex rate card. They are separate products with separate pricing.

## Editorial consequence for the page

The page must be a **quote-unit and evidence tool**, not a price table:
- First screen answers "what Paychex will not publish, and what to ask for" with the dated ranges above.
- The worked arithmetic uses Paychex's own published ranges and the SurePayroll published card as an
  anchored comparable — labelled as a different product, never as "Paychex pricing".
- Every unknown stays "awaiting quote". No field is pre-filled with a guessed Paychex number.
- A written-quote confirmation checklist is the deliverable, because with a quote-based vendor the
  deliverable that matters is a signed scope.

## Related

- Top-10 audit for this page: `records/2026-10-27-paychex-top10-audit.md`
- Batch order and keyword budget: `records/2026-10-27-vendor-cost-batch-1.md` (in the working records folder, not this repo)
