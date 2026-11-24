# UNIT-552 — Act: Type the manifest asset callback in BootScene.preload

## Summary
Remove implicit any at BootScene.ts L42

## Description
Annotate the find callback parameter with the manifest asset element type.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload` · L42
- **Do:** Add an explicit type to the callback parameter a of manifest.assets.find

```
manifest.assets.find((a: (typeof manifest.assets)[number]) => a.id === id)
```

- **Expected:** tsc --noEmit prints no error for BootScene.ts

## Acceptance criteria
- Given the annotated callback, When tsc runs, Then no TS7006 at BootScene.ts L42
- Given preload, When run, Then the same images load

## Definition of done
- Callback typed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-552.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-111
- Requirement: REQ-277
- Unit (Act): UNIT-552
- Unit (Verify): UNIT-556
- Status: approved
- Change: NEW
