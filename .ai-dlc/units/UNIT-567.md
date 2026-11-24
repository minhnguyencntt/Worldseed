# UNIT-567 — Verify: frontend zod declaration unit tests

## Summary
Test package.json declares zod

## Description
Write a unit test reading package.json files from disk.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/zodDependency.test.ts` · `new: zod dependency declaration` · new
- **Do:** Create tests reading ../package.json and ../../package.json via readFileSync with fileURLToPath(new NodeURL(...)); test 1 asserts frontend dependencies.zod matches /^\^3\.23\.\d+$/; test 2 asserts it equals the game package.json dependencies.zod.
- **Run:** `cd game/frontend && npx vitest run tests/zodDependency.test.ts`
- **Expected:** 2 tests pass

## Acceptance criteria
- zod range asserted
- ranges equal

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-567.md`

## Links
- Evidence: EVD-113
- Requirement: REQ-282
- Unit (Act): UNIT-564
- Unit (Verify): UNIT-567
- Status: approved
- Change: UPDATE
