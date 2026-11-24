# UNIT-872 — Act: Add base typography and dialog/backdrop CSS to styles.css

## Summary
Add a base layer and the sf-fullscreen-bg and sf-dialog classes.

## Description
Edit src/styles.css to add body base rules, heading fonts, and shared classes for the full-screen backdrop and centered dialog used by later units.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/styles.css` · `body / h1 / h2 base rules` · after L8
- **Do:** Insert base rules setting body background, colour, VT323 body font at 20px with line-height 1.3, and Press Start 2P for h1 and h2 with a smaller size.

```
body { background: var(--sf-color-ink-1); color: var(--sf-color-parchment-5); font-family: var(--sf-font-body); font-size: 20px; line-height: 1.3; }
h1, h2 { font-family: var(--sf-font-pixel); font-size: var(--sf-size-md); line-height: 1.5; margin: 0 0 var(--sf-space-2); }
```

- **Expected:** Every page has dark background, light text and VT323 body font.

### Step 2 — `game/frontend/src/styles.css` · `.sf-fullscreen-bg and .sf-dialog` · after L72
- **Do:** Append .sf-fullscreen-bg (fixed-size full viewport, centered flex, wall.png cover backdrop over ink-1, pixelated) and .sf-dialog (width min(90vw, 640px), max-height 60vh, overflow-y auto, padding var(--sf-space-4)).

```
.sf-fullscreen-bg { min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; background: var(--sf-color-ink-1) url('/assets/worlds/the-boys-room/room/wall.png') center / cover no-repeat; image-rendering: pixelated; }
.sf-dialog { width: min(90vw, 640px); max-height: 60vh; overflow-y: auto; padding: var(--sf-space-4); }
```

- **Expected:** Both classes exist and can be applied by components.

## Acceptance criteria
- styles.css sets body background ink-1, color parchment-5, VT323 20px
- styles.css defines .sf-fullscreen-bg and .sf-dialog

## Definition of done
- Rules present in styles.css
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-872.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-174
- Requirement: REQ-436
- Unit (Act): UNIT-872
- Unit (Verify): UNIT-876
- Status: approved
- Change: NEW
