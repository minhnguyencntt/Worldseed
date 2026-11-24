# UNIT-414 — Act: Document the 3.90 API targets in config.ts and createGame.ts

## Summary
Keep 3.90 APIs in config and factory and state the target

## Description
The audit found only 3.90 APIs in config.ts and createGame.ts. Add a comment naming the 3.90 constants used so a later change to a 4-only API is visible. Do not change behavior.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/config.ts` · `buildGameConfig` · L11-L30
- **Do:** Add a comment above buildGameConfig stating that Phaser 3.90 APIs are used: Phaser.AUTO, Phaser.Scale.FIT, Phaser.Scale.CENTER_BOTH and render.pixelArt/roundPixels/antialias.

```
// Phaser 3.90 target: Phaser.AUTO, Phaser.Scale.FIT, Phaser.Scale.CENTER_BOTH, render.pixelArt/roundPixels/antialias.
```

- **Expected:** Comment present; config object unchanged.

### Step 2 — `game/frontend/src/phaser/createGame.ts` · `createGame` · L4-L10
- **Do:** Change the existing comment above createGame to also say it constructs a Phaser 3.90 Phaser.Game and uses no Phaser 4-only API.

```
// Single seam for constructing the Phaser 3.90 game (no Phaser 4-only APIs); tests mock this module.
```

- **Expected:** createGame body unchanged.

## Acceptance criteria
- Given config.ts, when read, then a comment states that Phaser.AUTO, Phaser.Scale.FIT and render.pixelArt are the 3.90 APIs in use.
- Given createGame.ts, when read, then it still returns new Phaser.Game(buildGameConfig(parent, scenes)).

## Definition of done
- Comments added and the existing tests/phaserConfig.test.ts still passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-414.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-083
- Requirement: REQ-207
- Unit (Act): UNIT-414
- Unit (Verify): UNIT-416
- Status: completed
- Change: UPDATE
