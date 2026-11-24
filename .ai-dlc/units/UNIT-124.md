# UNIT-124 — Verify: AdminApp lifecycle stepper unit tests with mocked fetch

## Summary
Tests AdminApp stepper stage for OPEN, RUNNING execution, 404 and 401 with a stubbed fetch

## Description
Component tests written from R2's acceptance criteria; fetch is a vi.fn stub, no network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminStepper.test.tsx` · `new: describe('AdminApp lifecycle stepper')` · new
- **Do:** Create the file with `// @vitest-environment jsdom`, modelled on tests/admin.test.tsx (json helper, enterToken helper, vi.stubGlobal('fetch')). Import roundFixture, adminContributionFixture, executionFixture from './fixtures/api' (round shape mirrors world.Round JSON; execution shape mirrors execution.Execution in backend/internal/execution/execution.go). Stub routes: current round URL → roundFixture; with Bearer secret: admin round URL → round under test, contributions URL → [adminContributionFixture], '/api/v1/admin/executions' → configurable response. Tests: (1) round OPEN, executions [] → within list 'Round lifecycle' the single [aria-current=step] text is 'OPEN'; (2) round {…roundFixture,status:'CLOSED'}, executions [executionFixture with status RUNNING] → current step 'DEVELOPING'; (3) executions responds 404, round OPEN → current step 'OPEN' and screen.queryByRole('alert') is null; (4) executions responds 401 → findByRole('alert') has text 'Invalid token'.
- **Run:** `cd game/frontend && npx vitest run tests/adminStepper.test.tsx`
- **Expected:** All four tests pass without network.

## Acceptance criteria
- OPEN current step
- DEVELOPING for RUNNING execution
- 404 tolerated
- 401 shows Invalid token

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-124.md`

## Links
- Evidence: EVD-024
- Requirement: REQ-062
- Unit (Act): UNIT-122
- Unit (Verify): UNIT-124
- Status: completed
- Change: UPDATE
