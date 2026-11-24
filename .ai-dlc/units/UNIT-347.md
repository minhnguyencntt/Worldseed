# UNIT-347 — Verify: Manifest loader dangling-reference and missing-asset unit tests

## Summary
Unit tests for loader behaviors with fake exists

## Description
Test the manifest loader behaviors using fake exists functions and inline fixtures.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestLoader.test.ts` · `new: describe('loadManifest')` · new
- **Do:** Tests: valid data with exists=()=>true gives empty errors/missing/dangling; exists=()=>false lists all ids in missing and does not throw; scene object with asset 'nope' appears in dangling; manifestData {} yields non-empty errors and manifest null; manifestData undefined does not throw
- **Run:** `cd game && npx vitest run tests/manifestLoader.test.ts -t loadManifest`
- **Expected:** Loader tests pass

### Step 2 — `game/tests/manifestLoader.test.ts` · `new: describe('resolveAsset')` · after previous describe
- **Do:** Tests: present asset returns its entry; id in missing returns FALLBACK_ASSET; unknown id returns FALLBACK_ASSET
- **Run:** `cd game && npx vitest run tests/manifestLoader.test.ts -t resolveAsset`
- **Expected:** Fallback tests pass

## Acceptance criteria
- Missing, dangling and invalid-data cases are asserted
- Fallback resolution for missing assets is asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-347.md`

## Links
- Evidence: EVD-068
- Requirement: REQ-173
- Unit (Act): UNIT-344
- Unit (Verify): UNIT-347
- Status: completed
- Change: UPDATE
