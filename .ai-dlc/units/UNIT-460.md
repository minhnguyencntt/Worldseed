# UNIT-460 — Act: Extract render constant and add autoRound in buildGameConfig

## Summary
Add PIXEL_ART_RENDER constant and scale.autoRound

## Description
Edit config.ts so render settings come from an exported constant and scale has autoRound true.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/config.ts` · `new: PIXEL_ART_RENDER` · after L4
- **Do:** Add an exported constant PIXEL_ART_RENDER with pixelArt true, roundPixels true, antialias false, typed as Phaser.Types.Core.RenderConfig.

```
export const PIXEL_ART_RENDER: Phaser.Types.Core.RenderConfig = { pixelArt: true, roundPixels: true, antialias: false };
```

- **Expected:** Constant exported from config.ts

### Step 2 — `game/frontend/src/phaser/config.ts` · `buildGameConfig` · L10-L30
- **Do:** Replace the inline render object with a spread of PIXEL_ART_RENDER and add autoRound: true to the scale object.

```
render: { ...PIXEL_ART_RENDER }, scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, autoRound: true }
```

- **Expected:** Returned config has render keys and scale.autoRound true

## Acceptance criteria
- render equals the constant with pixelArt, roundPixels true and antialias false
- scale.autoRound is true

## Definition of done
- config.ts compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-460.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-093
- Requirement: REQ-230
- Unit (Act): UNIT-460
- Unit (Verify): UNIT-462
- Status: approved
- Change: UPDATE
