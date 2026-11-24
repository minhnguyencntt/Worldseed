# UNIT-537 — Verify: BootScene single sceneObjects field and unchanged sync unit tests

## Summary
Unit tests fail while a duplicate sceneObjects field exists and sync still works

## Description
Add a vitest unit test counting sceneObjects declarations in BootScene.ts, and re-run the existing sync tests to prove behavior is unchanged.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneSingleField.test.ts` · `new: describe('BootScene fields')` · new
- **Do:** Create the test file. Read ../src/phaser/BootScene.ts with readFileSync (node:fs, utf8). Test 'declares sceneObjects exactly once': count matches of /^\s*private sceneObjects:/gm and expect length toBe(1).

```
const matches = src.match(/^\s*private sceneObjects:/gm) ?? [];
expect(matches).toHaveLength(1);
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneSingleField.test.ts`
- **Expected:** Test passes after ACT2; fails with length 2 if the duplicate field is restored.

### Step 2 — `game/frontend/tests/bootSceneSync.test.ts` · `existing suite (no edits)` · new
- **Do:** Run the existing bootSceneSync suite unchanged to confirm sync and objectClick forwarding still pass after the field removal.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneSync.test.ts`
- **Expected:** All existing bootSceneSync tests pass.

## Acceptance criteria
- Given the duplicate field is present, when the test runs, then it fails.
- Given ACT2 is applied, when the test runs, then it passes and bootSceneSync tests still pass.

## Definition of done
- Test added and passing after ACT2; sync tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-537.md`

## Links
- Evidence: EVD-108
- Requirement: REQ-268
- Unit (Act): UNIT-535
- Unit (Verify): UNIT-537
- Status: completed
- Change: NEW
