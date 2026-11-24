# UNIT-535 — Act: Remove the duplicate sceneObjects field from BootScene

## Summary
Delete the second sceneObjects field declaration

## Description
Delete line 23 of BootScene.ts, which repeats the field on line 22. No other code changes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene (field sceneObjects)` · L22-L23
- **Do:** Delete the second `private sceneObjects: SceneObject[] = [];` line at L23, keeping the declaration at L22 (line numbers shift by one if ACT1 was applied first; delete the later of the two identical lines).

```
private sceneObjects: SceneObject[] = [];
private sceneObjects: SceneObject[] = [];  // delete this line
```

- **Expected:** BootScene has exactly one `private sceneObjects` declaration.

## Acceptance criteria
- Given the BootScene class, when members are listed, then `sceneObjects` is declared once.
- Given the edit, when the file is compiled, then no duplicate member error for sceneObjects is reported.

## Definition of done
- L23 duplicate field deleted
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-535.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-108
- Requirement: REQ-268
- Unit (Act): UNIT-535
- Unit (Verify): UNIT-537
- Status: completed
- Change: NEW
