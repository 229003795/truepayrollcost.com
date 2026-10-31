# Homepage illustrated example — 2026-10-31

User approved one quote-to-annual-cost illustration, between the first-screen calculator and detailed inputs.
Base origin/main123ec3c, isolated worktree. One homepage optimized; no new article.

Implementation: responsive HTML/CSS figure, not a bitmap screenshot. Left quote-input card, directional SVG arrow, right annual-subtotal card. Mobile stacks top-to-bottom; text remains selectable and accessible. Decorative SVGs are aria-hidden. No images/fonts/libraries loaded externally.

Numbers: Gusto Simple49/month +6/person/month verified against https://gusto.com/product/pricing on October31,2026 (web text lines35–37). Five people is explicitly illustrative.49+6*5=79;79*12=948. The illustration is fixed and explicitly separate from saved/edited calculator values. It does not imply that unknown setup/extras/internal costs are zero or that948 is a full bill.

Checks: build17 pages; static placement, arithmetic, example label, source/date and pending terms verified. No calculation scripts or rate data altered. Browser visual testing remains unavailable under current existing-window constraints; do not claim it passed.

Publication: existing main-to-Cloudflare Pages Git deployment; online result must be checked after push. No GSC actions.
