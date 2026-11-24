# UNIT-280 — Act: Rebuild GameLayout with Tailwind and the UI store

## Summary
Replace local drawer state and grid CSS

## Description
Rewrite GameLayout to use useUiStore and Tailwind utility classes; remove the old grid and story-panel layout rules from styles.css.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L1-L21
- **Do:** Remove useState import; read drawerOpen and toggleDrawer from useUiStore; set root div className 'game-layout h-screen w-screen overflow-hidden grid grid-cols-1 md:grid-cols-[4fr_1fr]'; main className 'scene-area relative min-h-0 overflow-hidden'; aside className cn('story-panel overflow-y-auto min-h-0 md:static md:translate-y-0 fixed inset-x-0 bottom-0 max-h-[50vh] transition-transform', drawerOpen ? 'drawer-open translate-y-0' : 'translate-y-[calc(100%-3rem)]'); toggle button onClick toggleDrawer keeping aria-expanded={drawerOpen} and text Story

```
const drawerOpen = useUiStore((s) => s.drawerOpen); const toggleDrawer = useUiStore((s) => s.toggleDrawer);
```

- **Expected:** Layout renders with the specified classes

### Step 2 — `game/frontend/src/styles.css` · `.game-layout, .story-panel, @media (max-width: 768px)` · L4-L33
- **Do:** Delete the .game-layout, .story-panel and mobile media-query blocks (now Tailwind), and add 'html, body, #root { height: 100%; margin: 0; overflow: hidden; }' after the directives
- **Expected:** No duplicate layout rules; contribution-sheet rules intact

## Acceptance criteria
- GameLayout reads drawerOpen from the store
- Layout classes match the requirement

## Definition of done
- Compiles; no local useState in GameLayout
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-280.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-056
- Requirement: REQ-141
- Unit (Act): UNIT-280
- Unit (Verify): UNIT-284
- Status: completed
- Change: UPDATE
