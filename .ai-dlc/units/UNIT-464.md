# UNIT-464 — Act: Add zoom parameter to buildGameConfig and createGame

## Summary
Forward optional zoom into scale.zoom

## Description
Add an optional zoom argument to buildGameConfig and createGame so the game is created with the computed zoom.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/config.ts` · `buildGameConfig` · L10-L28
- **Do:** Add third parameter zoom: number = 1 and add zoom to the scale object next to mode and autoCenter.

```
scenes: Phaser.Types.Scenes.SceneType[], zoom = 1 ... scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, zoom }
```

- **Expected:** buildGameConfig(p, s, 3).scale.zoom === 3 and default is 1

### Step 2 — `game/frontend/src/phaser/createGame.ts` · `createGame` · L5-L10
- **Do:** Add third parameter zoom = 1 and pass it as the third argument to buildGameConfig.

```
return new Phaser.Game(buildGameConfig(parent, scenes, zoom));
```

- **Expected:** createGame forwards zoom to buildGameConfig

## Acceptance criteria
- buildGameConfig sets scale.zoom to the given zoom, default 1
- createGame forwards its zoom argument

## Definition of done
- Signatures updated and type-check clean
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-464.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-094
- Requirement: REQ-232
- Unit (Act): UNIT-464
- Unit (Verify): UNIT-466
- Status: completed
- Change: UPDATE
