# Site alignment repair — 2026-10-31

User supplied a screenshot of misalignment in the homepage worksheet and authorized a site-wide check and repair.
Base: origin/main36bb46b, isolated worktree. No prior uncommitted work included.

Repairs:
- Removed the homepage label min-height3em that inserted a blank band before single-line inputs.
- Removed sticky/max-height/internal scrolling from the homepage cost-result; result and form now use normal page flow.
- Homepage fieldset legends are placed within their card, with the same20px inset,20px heading and1.4 line-height as the result heading; legend+body clearing prevents overlap.
- Shared screen-only alignment stylesheet: prevent grid-child minimum widths from causing overflow, allow long result strings to wrap on narrow screens, wrap ticket statuses, normalize select controls and preserve checkbox/radio sizing.
- Kept table/diagram scrolling inside their existing wrappers. Did not change any numeric content, rates, math or calculator scripts.

Checks:
- npm test:32 passed.
- npm run build:17 pages.
- All17 built pages checked for a single canonical, duplicate IDs, replacement characters and actual inclusion of the shared stylesheet. Evidence:2026-10-31-site-alignment-audit.json.
- BrowserSkill specified instance online, zero existing sessions. No new Agent Window permitted. No rendered desktop/mobile geometry pass is claimed; supplied screenshot and source evidence identify the repaired rules.
- Publish through existing main->Cloudflare Pages integration, then verify live responses and stylesheet identities. No new article or GSC action.
