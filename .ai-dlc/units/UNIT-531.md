# UNIT-531 — Act: Remove the duplicate sceneObjects field from BootScene

## Summary
Delete the second private sceneObjects declaration

## Description
Delete line 23 of BootScene.ts, which repeats the field on line 22.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene` · L22-L23
- **Do:** Remove the second `private sceneObjects: SceneObject[] = [];` at L23 and keep the one at L22.

```
two identical field lines -> one `private sceneObjects: SceneObject[] = [];`
```

- **Expected:** Exactly one private sceneObjects field in the class

## Acceptance criteria
- Given BootScene.ts, when read, then one private sceneObjects field exists
- Given the class, when compiled, then no duplicate member error occurs

## Definition of done
- Line 23 removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-531.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-107
- Requirement: REQ-266
- Unit (Act): UNIT-531
- Unit (Verify): UNIT-533
- Status: approved
- Change: UPDATE
