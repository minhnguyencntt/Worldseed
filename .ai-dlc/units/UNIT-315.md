# UNIT-315 — Act: Drive the mobile drawer from useUiStore and delete legacy layout CSS

## Summary
Use drawerOpen/toggleDrawer, Tailwind drawer classes, remove legacy rules

## Description
Replace the local useState drawer in GameLayout with useUiStore selectors, style the aside as a fixed bottom drawer below md with data-state, hide the toggle at md and up, pad the scene for the handle, and delete the .game-layout, .story-panel and media-query rules from styles.css.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L1-L28
- **Do:** Remove the useState import and local drawerOpen; import useUiStore from '../store/uiStore' and read drawerOpen and toggleDrawer via selectors; set the Button onClick to toggleDrawer and add className 'md:hidden'.

```
const drawerOpen = useUiStore((s) => s.drawerOpen);
const toggleDrawer = useUiStore((s) => s.toggleDrawer);
```

- **Expected:** Clicking Story flips store drawerOpen.

### Step 2 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout motion.aside` · L12-L24
- **Do:** Remove the legacy className ternary; set data-state to open or closed and apply Tailwind drawer classes; add pb-12 md:pb-0 to the main.

```
<motion.aside data-state={drawerOpen ? 'open' : 'closed'} className={cn('fixed inset-x-0 bottom-0 z-20 max-h-[50vh] overflow-y-auto bg-background transition-transform duration-300 md:static md:h-screen md:max-h-none md:translate-y-0', drawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3rem)]')}>
```

- **Expected:** Aside shows data-state open/closed and drawer classes.

### Step 3 — `game/frontend/src/styles.css` · `.game-layout, .story-panel, @media (max-width: 768px)` · L7-L38
- **Do:** Delete the .game-layout rule, .story-panel rule and the whole @media (max-width: 768px) block; leave :root and .contribution-sheet rules untouched.
- **Expected:** grep finds none of game-layout, story-panel or max-width: 768px in styles.css.

## Acceptance criteria
- GameLayout reads drawerOpen and toggleDrawer from useUiStore and has no useState.
- The aside carries data-state open/closed and translate classes; the scene main has pb-12 md:pb-0.
- styles.css no longer has the legacy rules; .contribution-sheet rules remain.

## Definition of done
- Store-driven drawer; legacy CSS gone
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-315.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-063
- Requirement: REQ-158
- Unit (Act): UNIT-315
- Unit (Verify): UNIT-317
- Status: completed
- Change: UPDATE
