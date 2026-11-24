# UNIT-027 — Verify: loadWorld strict loading unit tests

## Summary
Unit tests for loader.ts loadWorld error and success paths using temp directories.

## Description
Context: loadWorld now checks fields and scene ids. Desired behavior: tests assert each error and the array result using files in an os temp dir only. Expected result: tests/loader.test.ts passes.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/loader.test.ts` · `new: makeWorldDir` · new
- **Do:** Create the file importing describe, it, expect from vitest, fs, os, path and loadWorld from '../src/content/loader'; add helper makeWorldDir(files: Record<string,string>) that mkdtemps a dir and writes each relative path with mkdirSync recursive.
- **Run:** `npx tsc --noEmit`
- **Expected:** Typecheck passes with the new test file and helper compiling.

### Step 2 — `backend/game/tests/loader.test.ts` · `new: describe loadWorld; it 'throws when id is missing'` · new
- **Do:** Write world.yaml without the id line (title W, startScene s, scenes [s], characters [], flags []) plus a valid scenes/s.yaml, and expect(() => loadWorld(dir)).toThrow(/id/).
- **Run:** `npx vitest run tests/loader.test.ts -t "id is missing"`
- **Expected:** Test passes.

### Step 3 — `backend/game/tests/loader.test.ts` · `it 'throws naming s2.yaml and on scene id mismatch'; it 'returns scenes array'` · new
- **Do:** Add three tests: world listing s and s2 with only s.yaml expects toThrow(/s2\.yaml/); s.yaml declaring `id: other` expects toThrow(/expected s/); a valid world expects Array.isArray(loaded.scenes) and loaded.scenes[0].id toBe 's'.
- **Run:** `npx vitest run tests/loader.test.ts`
- **Expected:** All four tests pass.

## Acceptance criteria
- Missing id in world.yaml makes loadWorld throw /id/
- Missing s2.yaml makes loadWorld throw /s2\.yaml/
- Scene id mismatch makes loadWorld throw /expected s/
- Valid files give an array scenes with scenes[0].id === 's'

## Definition of done
- npx vitest run tests/loader.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-027.md`

## Links
- Evidence: EVD-005
- Requirement: REQ-013
- Unit (Act): UNIT-025
- Unit (Verify): UNIT-027
- Status: completed
- Change: UPDATE
