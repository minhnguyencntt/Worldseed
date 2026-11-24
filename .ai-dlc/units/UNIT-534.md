# UNIT-534 — Act: Remove the duplicate SceneObject import from BootScene.ts

## Summary
Delete the second SceneObject import line

## Description
Delete line 14 of BootScene.ts, which repeats the import on line 12. No other code changes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `module imports (SceneObject type import)` · L12-L14
- **Do:** Delete the second line `import type { SceneObject } from '@game/entities/SceneObject';` at L14, keeping the one at L12 and the createPhaserRenderContext import at L13.

```
import type { SceneObject } from '@game/entities/SceneObject';
import { createPhaserRenderContext } from './renderContext';
import type { SceneObject } from '@game/entities/SceneObject';  // delete this line
```

- **Expected:** BootScene.ts has exactly one `import type { SceneObject }` line.

## Acceptance criteria
- Given BootScene.ts, when imports are listed, then `import type { SceneObject }` appears once.
- Given the edit, when the file is compiled, then no duplicate identifier error for SceneObject is reported.

## Definition of done
- L14 duplicate import deleted
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-534.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-108
- Requirement: REQ-267
- Unit (Act): UNIT-534
- Unit (Verify): UNIT-536
- Status: completed
- Change: NEW
