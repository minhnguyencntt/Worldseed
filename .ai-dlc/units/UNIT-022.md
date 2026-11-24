# UNIT-022 — Verify: Loader and reference validator unit tests

## Summary
Tests for loadWorld and validateWorld with invalid fixtures

## Description
Test loader and validator using temp directories and in-memory objects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/validator.test.ts` · `new: validateWorld invalid reference tests` · new
- **Do:** Create fixtures backend/game/tests/fixtures/invalid-world.ts exporting a WorldDef (characters [boy], flags [a]) and a SceneDef containing goto_scene 'nowhere', say by 'ghost', set_flag 'zzz', and discover 'nope'; add test in validator.test.ts asserting validateWorld output contains 'unknown scene: nowhere', 'unknown character: ghost', 'unknown flag: zzz', 'unknown object: nope'.
- **Run:** `cd backend/game && npx vitest run tests/validator.test.ts -t 'invalid'`
- **Expected:** Test passes.

### Step 2 — `backend/game/tests/validator.test.ts` · `new: loadWorld tests` · new
- **Do:** Add tests that write a minimal world.yaml and scenes/s.yaml to fs.mkdtempSync(os.tmpdir()) and assert loadWorld returns scenes.s; and a test with world.yaml listing a missing scene asserting the thrown message contains 's2.yaml'; and a valid-fixture test asserting validateWorld returns [].
- **Run:** `cd backend/game && npx vitest run tests/validator.test.ts -t 'loadWorld|valid'`
- **Expected:** Tests pass.

## Acceptance criteria
- Given invalid fixtures, when validated, then each bad reference produces its error.
- Given a missing file, when loaded, then an error names the file.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-022.md`

## Links
- Evidence: EVD-004
- Requirement: REQ-010
- Unit (Act): UNIT-018
- Unit (Verify): UNIT-022
- Status: completed
- Change: UPDATE
