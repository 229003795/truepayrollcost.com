# Site presentation baseline

The homepage is the quote tool. Keep its positioning, field labels, where-to-copy help, equations and unknown-versus-zero rules intact when styling it.

## Shared frame

`scripts/site-shell.mjs` supplies the same header and footer to all four published pages at build time. `src/assets/frame.css` owns their styling. Do not replace navigation dynamically in `design.js`.

Header: brand and a short functional descriptor; Calculator, Method, Checklist and Sources. It may stick at the top; the footer stays in normal document flow. Comparisons and the Gusto worked example live in the footer, not the primary navigation. Link only to existing sections or pages.

Footer: tool resources, evidence/privacy, and worked examples/comparisons. Dates belong beside the figures they verify; never present a layout release date as a fresh pricing check. Do not invent contact details, credentials, affiliate links or unbuilt policy pages.

## Homepage order and hierarchy

1. Locked positioning and a compact three-row result preview, with a visible example label and official source/date.
2. Fully expanded quote inputs and result/checklist, directly beneath the preview.
3. Cost method, official sources, switching questions, about/privacy explanation.

Group fields by subscription, setup/annual fees/renewal, and internal work. These are visual groups, not steps. Preserve field order and label/helper associations. All fields remain visible on mobile.

Cash outlay, internal cost and total each occupy a separate row. Use tabular numerals; monetary results are large, unresolved amounts use smaller readable text. A published-rate cash example is a confirmed subtotal, never a fabricated complete bill. The main calculation button is the strongest action; copy and print are secondary actions directly after the confirmation list.

## Visual language

White and very light gray surfaces, navy text, one restrained blue accent, thin borders, modest radii, sans-serif typography. No floating marketing cards, provider logos in the workflow, rankings as the primary visual, arbitrary scores, animation or oversized slogan treatment.

## Research informing this layout

- PayrollRate, inspected 2026-10-23: clear navigation and organized footer are useful references; its ranking/offer funnel and decorative hero are unsuitable for this tool. https://www.payrollrate.com/
- GOV.UK navigation guidance: prioritize useful top-level destinations; navigation is not a sitemap. Only the principle is used, not government branding/components. https://design-system.service.gov.uk/patterns/navigate-a-service/
- Nielsen Norman Group form guidance: group related fields, keep labels near inputs, preserve explicit labels. https://www.nngroup.com/articles/web-form-design/

Before publishing, verify the unchanged calculation tests, shared links, all four pages' frame and links, and mobile widths from 320 to 430 pixels. Preserve the clean print-only checklist.
