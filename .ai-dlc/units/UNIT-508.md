# UNIT-508 — Verify: planPreload unit tests

## Summary
Unit tests for planPreload dedupe and unknown reporting.

## Description
Write tests from the REQ1 spec using in-memory manifests and scenes only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/planPreload.test.ts` · `new: describe('planPreload')` · new
- **Do:** Create the test file. Define manifest = { version: 1, assets: [{ id: 'A', ... }] } using entries that satisfy AssetEntry from src/assets/manifest/schema.ts. Add test 'dedupes': a scene with two objects that both use asset 'A' gives load ['A'] and unknown []. Add test 'reports unknown': one object with asset 'Z' and one dust effect with asset 'Y' gives unknown ['Z','Y'] and load []. Add test 'empty': validScene gives load [] and unknown [].
- **Run:** `cd game && npx vitest run tests/planPreload.test.ts -t planPreload`
- **Expected:** All planPreload tests pass

## Acceptance criteria
- Dedupe, unknown and empty cases are asserted
- The tests pass

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-508.md`

## Links
- Evidence: EVD-102
- Requirement: REQ-253
- Unit (Act): UNIT-506
- Unit (Verify): UNIT-508
- Status: completed
- Change: UPDATE
