# UNIT-142 — Verify: AdminApp execution action error display unit tests

## Summary
Unit tests with a mocked fetch for failed actions, 401 and error clearing

## Description
Extend tests/adminActions.test.tsx with failure cases using the same URL-routing fetch stub.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminActions.test.tsx` · `it('shows an alert when the action fails')` · new
- **Do:** Make the stub answer the approve POST with json({error:'boom'}, 500). Render, enter token 'secret', click Approve, then use findByRole on the Execution region and assert within it an alert whose text contains '500'.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t "action fails"`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/adminActions.test.tsx` · `it('returns to the token gate on 401')` · new
- **Do:** Make the stub answer the approve POST with json({error:'unauthorized'}, 401). Click Approve and assert findByLabelText('Admin token') and the text 'Invalid token' are present.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t 401`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/adminActions.test.tsx` · `it('clears the action error after a successful action')` · new
- **Do:** The stub answers the first approve POST with 500 and the second with json(awaitingExecutionFixture). Click Approve twice, awaiting the alert after the first click. Then waitFor that the alert no longer exists in the Execution region.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t clears`
- **Expected:** Test passes

## Acceptance criteria
- A 500 from an action shows an alert in the Execution region
- A 401 from an action shows the token gate with Invalid token
- A later successful action clears the alert

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-142.md`

## Links
- Evidence: EVD-030
- Requirement: REQ-071
- Unit (Act): UNIT-140
- Unit (Verify): UNIT-142
- Status: completed
- Change: UPDATE
