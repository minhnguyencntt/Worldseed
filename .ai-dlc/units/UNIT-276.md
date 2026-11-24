# UNIT-276 — Verify: LifecycleStepper has no execution helpers and still renders stages

## Summary
Replace the deriveStage test with a stepper export and render test

## Description
Replace game/frontend/tests/deriveStage.test.ts, which imports the removed deriveStage, with a test of the remaining module.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/deriveStage.test.ts` · `describe('deriveStage')` · L1-L22
- **Do:** Delete this file, because deriveStage no longer exists and the import would fail.
- **Run:** `git rm game/frontend/tests/deriveStage.test.ts`
- **Expected:** The file is removed.

### Step 2 — `game/frontend/tests/lifecycleStepper.test.tsx` · `new: describe('LifecycleStepper module')` · new
- **Do:** Add three tests. (1) import * as mod from '../src/components/LifecycleStepper'; assert (mod as Record<string, unknown>).deriveStage is undefined and mod.stageIndex('CLOSED') is 1. (2) render <LifecycleStepper status="CLOSED" /> and assert the li with text CLOSED has aria-current='step' and the OPEN li has data-state='done'. (3) read ../src/components/LifecycleStepper.tsx with readFileSync and assert its lowercased text does not contain 'execution'.
- **Run:** `cd game/frontend && npx vitest run tests/lifecycleStepper.test.tsx`
- **Expected:** 3 tests pass.

## Acceptance criteria
- Given the module namespace, when deriveStage is read, then it is undefined
- Given status CLOSED, when the stepper renders, then the CLOSED step is current
- Given the source file, when it is read, then it has no 'execution' text

## Definition of done
- The new test passes and deriveStage.test.ts is deleted
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-276.md`

## Links
- Evidence: EVD-055
- Requirement: REQ-137
- Unit (Act): UNIT-274
- Unit (Verify): UNIT-276
- Status: completed
- Change: UPDATE
