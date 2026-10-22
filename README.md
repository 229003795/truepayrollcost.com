# True Payroll Cost

Independent source for truepayrollcost.com. Small-business payroll software costs, quote scope, and switching work.

## Build

Node.js 20+. No dependencies. Run `npm test` and `npm run build`. Cloudflare Pages: production branch `main`, build command `npm run build`, output directory `dist`.

## Add a page

Add an English HTML file under `src/` (directory pages use `index.html`). The build discovers every HTML page except `404.html`, emits each public URL with `lastmod` from its latest Git commit date, and regenerates sitemap and the three-line robots file. No SPA fallback: top-level 404.html preserves unknown-path HTTP 404.

## Content and calculations

The worksheet uses only visitor-entered assumptions. It does not preload vendor quotes. Provider facts link to official pages with a review date. Tests use clearly labeled synthetic arithmetic fixtures, not market data.

## Analytics

Cloudflare Web Analytics is the only traffic measurement source. Worksheet input values are processed locally and not emitted as analytics events.
