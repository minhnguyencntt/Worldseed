# UNIT-420 — Verify: phaserPinProblems unit tests

## Summary
Prove the helper passes 3.90.x and fails 4.x

## Description
Write unit tests for phaserPinProblems with in-memory objects shaped like package.json and package-lock.json (lockfileVersion 3).

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserPinHelper.test.ts` · `new: describe('phaserPinProblems')` · new
- **Do:** Add test 'returns no problems for 3.90.x' passing pkg {dependencies:{phaser:'~3.90.0'}} and lock {packages:{'':{dependencies:{phaser:'~3.90.0'}},'node_modules/phaser':{version:'3.90.0'}}}, asserting toEqual([]); shape mirrors game/frontend/package-lock.json lockfileVersion 3
- **Run:** `npx vitest run tests/phaserPinHelper.test.ts`
- **Expected:** Returns []

### Step 2 — `game/frontend/tests/phaserPinHelper.test.ts` · `it('reports 4.x in each field')` · after the first test
- **Do:** Add tests passing '^4.2.1' as pkg phaser, '^4.2.1' as lock root specifier, and '4.2.1' as lock entry version in turn; assert each result has length >= 1 and contains the field name text ('package.json', 'lockfile root', 'node_modules/phaser'); add a missing-entry case asserting a problem is returned
- **Run:** `npx vitest run tests/phaserPinHelper.test.ts`
- **Expected:** Each 4.x case returns a non-empty problem list

## Acceptance criteria
- 3.90.x inputs return []
- 4.x in each field is reported

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-420.md`

## Links
- Evidence: EVD-084
- Requirement: REQ-209
- Unit (Act): UNIT-418
- Unit (Verify): UNIT-420
- Status: completed
- Change: UPDATE
