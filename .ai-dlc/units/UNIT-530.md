# UNIT-530 — Act: Remove the duplicate SceneObject import from BootScene.ts

## Summary
Delete the second import type SceneObject line

## Description
Delete line 14 of BootScene.ts, which repeats the import on line 12.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `module imports` · L12-L14
- **Do:** Remove the second `import type { SceneObject } from '@game/entities/SceneObject';` at L14 and keep the one at L12.

```
line 12 and 14 identical import -> only line 12 remains
```

- **Expected:** Exactly one import type { SceneObject } line in the file

## Acceptance criteria
- Given BootScene.ts, when read, then one SceneObject import exists
- Given the file, when compiled, then no duplicate import error occurs

## Definition of done
- Line 14 removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-530.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-107
- Requirement: REQ-265
- Unit (Act): UNIT-530
- Unit (Verify): UNIT-532
- Status: approved
- Change: UPDATE
