# UNIT-123 — Verify: deriveStage unit tests

## Summary
Unit tests for deriveStage mapping and no-regression rule

## Description
Pure-function tests for deriveStage written from R1's acceptance criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/deriveStage.test.ts` · `new: describe('deriveStage')` · new
- **Do:** Create the test file importing deriveStage from '../src/components/LifecycleStepper' and executionFixture from './fixtures/api' (mirrors execution.Execution JSON in backend/internal/execution/execution.go). Add it.each cases (roundStatus, executionStatus, expected): ('OPEN',undefined,'OPEN'), ('CLOSED','RUNNING','DEVELOPING'), ('CLOSED','AWAITING_APPROVAL','PUBLISHING'), ('CLOSED','APPROVED','PUBLISHING'), ('CLOSED','COMPLETED','COMPLETED'), ('CLOSED','FAILED','CLOSED'), ('CLOSED','QUEUED','CLOSED'), ('PUBLISHING','RUNNING','PUBLISHING'), ('BUILDING','RUNNING','BUILDING'). Add one test calling deriveStage('CLOSED', executionFixture.status) expecting 'DEVELOPING'.
- **Run:** `cd game/frontend && npx vitest run tests/deriveStage.test.ts`
- **Expected:** All deriveStage cases pass.

## Acceptance criteria
- CLOSED+RUNNING→DEVELOPING
- OPEN without execution→OPEN
- PUBLISHING+RUNNING→PUBLISHING

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-123.md`

## Links
- Evidence: EVD-024
- Requirement: REQ-061
- Unit (Act): UNIT-121
- Unit (Verify): UNIT-123
- Status: completed
- Change: UPDATE
