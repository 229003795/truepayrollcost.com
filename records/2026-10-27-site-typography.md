# October27 site typography alignment
User asked full-site orderly text and primary/secondary hierarchy after homepage split intro screenshot.
Changed only frame.css screen typography plus frameVersion for cache invalidation. No article wording, prices, formulas,links,inputs or calculator code changed. Existing home-layout.css remains; higher-specificity intro override puts eyebrow/title/lead/subnote into single left-aligned reading order.
Hierarchy:desktop H1clamp32–44/700;mobile30;section24–30;subheading20;articlebody16;source/caption14;homepagelead17;support14;inputhelp15;amountstylesretained. ConsistentArial/systemfont,no webfont.
Isolated clone work/type-release-20261027. Build11pages. ExistingChrome inspected11routes desktop and390mobile,all no document overflow. Found two comparison h1 overrides58,corrected to shared44desktop/30mobile. Home default948 preserved;all intro items sameleft edge. Screen rules exclude print. No new page.
Production verification follows deployment. Local previewserverchange not included in commit.
