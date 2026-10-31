# Quote state repair — 2026-10-31

Authorized scope: fix Included filing-fee state and stale result presentation. Base50842ea; isolated checkout. No new page, rate changes or GSC actions.

Included state:
- New explicit tax/year-end Included checkbox. Checking clears and disables the separate fee input; unchecking restores a blank pending input.
- Calculation retains taxAnnualIncluded metadata, uses no additional filing charge, excludes this field from pending, and rejects conflicting included+amount data. Explicit entered zero remains distinguishable from Included.
- URL/local storage persist quote_annual_filing_included independently from the still-blank amount. Legacy shared links remain unchecked instead of inheriting recipient storage.
- Copy/print input ledger says Included in plan — no extra charge; it does not show this input as pending or as a user-entered0. Switching presets clears the confirmation.

Stale state:
- Input/change replaces ticket amounts with Recalculate to update and hides old full-output content behind an explicit message.
- Export buttons remain disabled until recalculation. An invalid browser-print path produces a recalculate instruction sheet rather than previous amounts combined with new input fields.
- Successful calculation restores valid results and exports.

Validation:
-34 unit tests pass, including Included vs unknown/explicit0/conflict and URL/storage/legacy-link cases.
- DOM integration (local linkedom, no browser rendering): default948; full1228+50=1278; Included switches, copy text and printable ledger; stale masking; invalid printing; empty state; QuickBooks1314; ADPunknown; preset reset.
- Build17 pages. Run npm test; npm run build; install linkedom with npm install --no-save --package-lock=false and run node scripts/home-reading-dom-check.mjs for integration. No production dependency added.
- Actual screen rendering remains unverified under existing-window constraints. Deployment verified separately after main push.
