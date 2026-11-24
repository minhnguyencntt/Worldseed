# UNIT-521 — Verify: preload.test.ts planner and resolver unit tests

## Summary
Tests for planPreload dedup, unknown refs and resolveTextureKey in preload.test.ts

## Description
Create game/tests/preload.test.ts with in-memory manifest tests for the planner and resolver.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preload.test.ts` · `new: describe('planPreload')` · new
- **Do:** Create the file importing planPreload and resolveTextureKey, define manifest with asset A, and add tests: dedupe (two objects asset A -> load ['A'], unknown []) and unknown (object Z plus dust effect Y -> unknown ['Z','Y'], load [])
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t planPreload`
- **Expected:** Dedupe and unknown tests pass

### Step 2 — `game/tests/preload.test.ts` · `new: describe('resolveTextureKey')` · after planPreload describe
- **Do:** Add tests: id 'A' returns 'A'; id 'nope' and undefined return 'fallback:missing'
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t resolveTextureKey`
- **Expected:** Three resolver tests pass

## Acceptance criteria
- Given duplicate refs, when planned, then load has the asset once
- Given unknown refs, when planned, then unknown lists them in order
- Given unknown id, when resolved, then fallback key returned

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-521.md`

## Links
- Evidence: EVD-105
- Requirement: REQ-259
- Unit (Act): UNIT-518
- Unit (Verify): UNIT-521
- Status: completed
- Change: NEW
