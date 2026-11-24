# UNIT-509 — Verify: resolveTextureKey unit tests

## Summary
Unit tests for resolveTextureKey fallback behavior.

## Description
Write tests from the REQ2 spec using an in-memory manifest only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/resolveTextureKey.test.ts` · `new: describe('resolveTextureKey')` · new
- **Do:** Create the test file with a manifest that holds one asset with id 'A'. Add test 'known' expecting resolveTextureKey('A', manifest, 'fallback:missing') to equal 'A'. Add test 'unknown' expecting resolveTextureKey('nope', manifest, 'fallback:missing') to equal 'fallback:missing'. Add test 'undefined' expecting resolveTextureKey(undefined, manifest, 'fallback:missing') to equal 'fallback:missing'.
- **Run:** `cd game && npx vitest run tests/resolveTextureKey.test.ts`
- **Expected:** All 3 tests pass

## Acceptance criteria
- Known, unknown and undefined ids are asserted
- The tests pass

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-509.md`

## Links
- Evidence: EVD-102
- Requirement: REQ-254
- Unit (Act): UNIT-507
- Unit (Verify): UNIT-509
- Status: completed
- Change: UPDATE
