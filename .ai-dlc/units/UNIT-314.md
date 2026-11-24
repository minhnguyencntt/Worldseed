# UNIT-314 — Act: Apply Tailwind desktop layout classes and overflow rules

## Summary
Rewrite GameLayout root/main/aside classes and add html/body/#root overflow rules

## Description
Replace the legacy class names on GameLayout's root, main and aside with Tailwind utilities for the 80/20 split and independent story scrolling, and add the overflow rules for html, body and #root to styles.css.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L7-L28
- **Do:** Replace className 'game-layout' on the root div with the Tailwind string, 'scene-area' on main with 'relative min-w-0 overflow-hidden', and add 'overflow-y-auto md:h-screen' to the aside classes.

```
<div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-[4fr_1fr]">
<main className="relative min-w-0 overflow-hidden">
```

- **Expected:** Root div has grid, h-screen, overflow-hidden and md:grid-cols-[4fr_1fr]; main has min-w-0.

### Step 2 — `game/frontend/src/styles.css` · `new: html, body, #root rule` · after L5
- **Do:** Add a rule giving html, body and #root height 100% and overflow hidden to prevent page scroll.

```
html, body, #root { height: 100%; overflow: hidden; }
```

- **Expected:** Stylesheet contains the html, body, #root rule.

## Acceptance criteria
- GameLayout root has grid h-screen w-full overflow-hidden grid-cols-1 md:grid-cols-[4fr_1fr].
- The aside has overflow-y-auto and md:h-screen; the main has min-w-0.
- styles.css sets html, body and #root to height 100% and overflow hidden.

## Definition of done
- Classes applied; build type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-314.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-063
- Requirement: REQ-157
- Unit (Act): UNIT-314
- Unit (Verify): UNIT-316
- Status: completed
- Change: UPDATE
