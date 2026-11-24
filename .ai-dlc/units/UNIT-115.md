# UNIT-115 — Verify: Lifecycle stepper renders each stage unit tests

## Summary
Tests for every stage state and execution panel fields

## Description
Pure component unit tests, no fetch needed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: executionFixture` · after adminContributionFixture
- **Do:** Export executionFixture shaped like Execution in backend/internal/execution/execution.go (id,world_id,round_id,status,error,updated_at json keys)
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Type-checks

### Step 2 — `game/frontend/tests/stepper.test.tsx` · `new: describe('LifecycleStepper and ExecutionPanel')` · new
- **Do:** Tests: it.each over the seven STAGES renders LifecycleStepper status=stage and asserts exactly one li has aria-current 'step' with that text; status 'DEVELOPING' asserts OPEN..ANALYZING data-state done and TESTING..COMPLETED pending; status 'BUILDING' marks TESTING current; ExecutionPanel with executionFixture error 'build failed' shows 'Failure reason: build failed'; without log/tests/release fields shows 'Not available' three times; contributionCount 3 shows 'Contributions: 3'
- **Run:** `cd game/frontend && npx vitest run tests/stepper.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Each of seven statuses marks one current
- DEVELOPING marks earlier done and later pending
- Failure and fallback texts render

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-115.md`

## Links
- Evidence: EVD-022
- Requirement: REQ-057
- Unit (Act): UNIT-110
- Unit (Verify): UNIT-115
- Status: completed
- Change: UPDATE
