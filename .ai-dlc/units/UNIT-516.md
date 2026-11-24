# UNIT-516 — Verify: preload.test.ts planner and resolver unit tests

## Summary
Create preload.test.ts with dedup, unknown and fallback-key cases

## Description
Create game/tests/preload.test.ts with an in-memory manifest and the valid-world fixture; no filesystem or Phaser involved.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preload.test.ts` · `new: describe('planPreload dedup and unknown')` · new
- **Do:** Create the file importing planPreload from '../src/engine/planPreload', validScene from './fixtures/valid-world' and an in-memory manifest with one asset id 'A'. Add test 'dedupes' (two objects asset 'A' => load ['A'], unknown []) and test 'reports unknown' (object asset 'Z' and dust effect asset 'Y' => unknown ['Z','Y'], load []).
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t 'planPreload'`
- **Expected:** Both tests pass

### Step 2 — `game/tests/preload.test.ts` · `new: describe('resolveTextureKey fallback')` · after planner describe
- **Do:** Add tests: resolveTextureKey('Z', manifest, 'fb') === 'fb'; resolveTextureKey(undefined, manifest, 'fb') === 'fb'; resolveTextureKey('A', manifest, 'fb') === 'A'.
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t 'resolveTextureKey'`
- **Expected:** Fallback key returned for unknown or undefined id

## Acceptance criteria
- Dedup, unknown and fallback-key tests pass
- Tests use only in-memory data

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-516.md`

## Links
- Evidence: EVD-104
- Requirement: REQ-257
- Unit (Act): UNIT-514
- Unit (Verify): UNIT-516
- Status: approved
- Change: UPDATE
