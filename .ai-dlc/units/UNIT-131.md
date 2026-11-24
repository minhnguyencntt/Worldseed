# UNIT-131 — Verify: ExecutionPanel Reject control unit tests

## Summary
Test Reject visibility and callback

## Description
Unit tests for the Reject button in ExecutionPanel.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/actions.test.tsx` · `it('shows a Reject button ...')` · after L29
- **Do:** Add test: render panel with status AWAITING_APPROVAL and an onReject vi.fn(); click getByRole('button',{name:'Reject'}); assert onReject called once with the execution id. Add second test: status FAILED with onReject provided; assert queryByRole('button',{name:'Reject'}) is null.
- **Run:** `cd game/frontend && npx vitest run tests/actions.test.tsx -t Reject`
- **Expected:** Reject tests pass

## Acceptance criteria
- Reject click passes id
- Reject absent for FAILED

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-131.md`

## Links
- Evidence: EVD-026
- Requirement: REQ-065
- Unit (Act): UNIT-128
- Unit (Verify): UNIT-131
- Status: completed
- Change: UPDATE
