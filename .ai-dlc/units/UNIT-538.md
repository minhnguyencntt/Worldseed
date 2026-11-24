# UNIT-538 — Act: Type the manifest asset callback in BootScene.preload

## Summary
Annotate parameter a in manifest.assets.find

## Description
BootScene.preload uses manifest.assets.find((a) => ...) which is implicitly any under mocks; give it an explicit type so mocked content shapes compile.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload` · L35-L40
- **Do:** Import type AssetEntry from '@game/content/schema' at the top and annotate the find callback parameter as (a: AssetEntry).

```
manifest.assets.find((a) -> manifest.assets.find((a: AssetEntry)
```

- **Expected:** The line has an explicit parameter type and behavior is unchanged

## Acceptance criteria
- Given BootScene.preload, When compiled, Then no implicit any on a
- Given preload runs, When an image asset is planned, Then it is loaded as before

## Definition of done
- Callback parameter typed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-538.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-109
- Requirement: REQ-269
- Unit (Act): UNIT-538
- Unit (Verify): UNIT-541
- Status: approved
- Change: UPDATE
