# UNIT-149 — Verify: Approve, Retry and Reject 401 return to the token gate without stale action error

## Summary
Unit tests for 401 on all three actions and for clearing a prior action error.

## Description
Add tests to the existing adminActions test file using the stubActionFetch helper and fixtures from tests/fixtures/api.ts, which mirror the backend handlers for /api/v1/admin/executions/{id}/{approve|retry|reject}.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminActions.test.tsx` · `new: it retry 401 returns to gate` · after L205
- **Do:** Add a test using failedExecutionFixture and stubActionFetch returning json({error:'unauthorized'},401); render AdminApp, enterToken('secret'), click the Retry button and assert findByRole('alert') has text 'Invalid token' and getByLabelText('Admin token') is present.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t "retry endpoint returns 401"`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/adminActions.test.tsx` · `new: it reject 401 returns to gate` · after L205
- **Do:** Same as the retry test but with executionFixture status 'AWAITING_APPROVAL', clicking the Reject button.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t "reject endpoint returns 401"`
- **Expected:** Test passes.

### Step 3 — `game/frontend/tests/adminActions.test.tsx` · `new: it 401 clears prior action error` · after L205
- **Do:** Stub the approve action to return 500 {error:'boom'} on the first call and 401 on the second. Click Approve twice, enter 'secret' at the gate again, and assert that no alert with text 'boom' appears in the Execution region.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t "clears prior action error"`
- **Expected:** Test passes.

## Acceptance criteria
- Retry and reject 401 each show the Admin token field with 'Invalid token'.
- A prior 500 error is not shown after a 401 and token re-entry.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-149.md`

## Links
- Evidence: EVD-032
- Requirement: REQ-074
- Unit (Act): UNIT-147
- Unit (Verify): UNIT-149
- Status: completed
- Change: UPDATE
