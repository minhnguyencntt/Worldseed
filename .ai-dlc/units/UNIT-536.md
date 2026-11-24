# UNIT-536 — Verify: BootScene has a single SceneObject import unit tests

## Summary
Unit test fails while a duplicate SceneObject import exists

## Description
Add a vitest unit test reading BootScene.ts source text and asserting a single SceneObject import, so it fails when the duplicate is present.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneSingleImport.test.ts` · `new: describe('BootScene imports')` · new
- **Do:** Create the test file. Read ../src/phaser/BootScene.ts with readFileSync (node:fs, utf8) via fileURLToPath(new URL(...)). Test 1 'imports SceneObject exactly once': count matches of /^import type \{ SceneObject \}/gm and expect length toBe(1). Test 2 'still imports createPhaserRenderContext': expect source toContain("import { createPhaserRenderContext } from './renderContext';").

```
const matches = src.match(/^import type \{ SceneObject \}/gm) ?? [];
expect(matches).toHaveLength(1);
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneSingleImport.test.ts`
- **Expected:** Both tests pass after ACT1; test 1 fails with length 2 if the duplicate import is restored.

## Acceptance criteria
- Given the duplicate import is present, when the test runs, then it fails.
- Given ACT1 is applied, when the test runs, then it passes.

## Definition of done
- Test added and passing after ACT1
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-536.md`

## Links
- Evidence: EVD-108
- Requirement: REQ-267
- Unit (Act): UNIT-534
- Unit (Verify): UNIT-536
- Status: completed
- Change: NEW
