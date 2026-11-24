# UNIT-570 — Act: Confirm BootScene default-imports phaser for the alias

## Summary
Confirm BootScene import resolves through a bare phaser specifier

## Description
No product change is expected: BootScene.ts already uses `import Phaser from 'phaser'` (L1) and extends Phaser.Scene (L19). This unit confirms that and leaves vitest.config.ts to the Verify unit.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene (module import)` · L1
- **Do:** Check that L1 reads `import Phaser from 'phaser';` and change nothing if so; do not edit any config file

```
import Phaser from 'phaser';  // unchanged
```

- **Expected:** BootScene.ts still default-imports phaser, so the alias in vitest.config.ts applies

## Acceptance criteria
- Given BootScene.ts, when read, then L1 is import Phaser from 'phaser'
- Given the diff, when reviewed, then vitest.config.ts is untouched by this unit

## Definition of done
- BootScene import confirmed unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-570.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-114
- Requirement: REQ-285
- Unit (Act): UNIT-570
- Unit (Verify): UNIT-571
- Status: completed
- Change: UPDATE
