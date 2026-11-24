# UNIT-559 — Act: Type the asset callback in BootScene.preload

## Summary
Give 'a' in manifest.assets.find an explicit type

## Description
Annotate the find callback parameter in BootScene.preload with the manifest asset entry type.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload` · L42
- **Do:** Add a type import for the manifest asset entry type exported from '@game/assets/manifest' and annotate the parameter 'a' in manifest.assets.find.

```
(a) => a.id === id -> (a: AssetEntry) => a.id === id
```

- **Expected:** TS7006 no longer reported at line 42

## Acceptance criteria
- No TS7006 at BootScene.ts line 42
- Preload still loads image assets

## Definition of done
- Callback typed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-559.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-112
- Requirement: REQ-280
- Unit (Act): UNIT-559
- Unit (Verify): UNIT-562
- Status: completed
- Change: UPDATE
