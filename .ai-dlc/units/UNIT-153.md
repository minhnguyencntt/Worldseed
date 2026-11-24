# UNIT-153 — Verify: Retry and Reject 401 return to the token gate unit tests

## Summary
Add Retry 401 and Reject 401 AdminApp tests

## Description
Add two tests to the existing 'AdminApp execution action errors' describe in adminActions.test.tsx using stubActionFetch.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminActions.test.tsx` · `it: retry endpoint returns 401 shows the token gate` · after L205
- **Do:** Add a test that calls stubActionFetch([failedExecutionFixture], () => json({ error: 'unauthorized' }, 401)), renders AdminApp, enters token 'secret', clicks the Retry button, then asserts findByRole('alert') has text 'Invalid token' and getByLabelText('Admin token') is present.

```
stubActionFetch([failedExecutionFixture], () => json({ error: 'unauthorized' }, 401));
```

- **Run:** `npx vitest run tests/adminActions.test.tsx -t "retry endpoint returns 401"`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/adminActions.test.tsx` · `it: reject endpoint returns 401 shows the token gate` · after L205
- **Do:** Add a test with awaiting = { ...executionFixture, status: 'AWAITING_APPROVAL' }, stubActionFetch([awaiting], () => json({ error: 'unauthorized' }, 401)), click the Reject button, then assert the alert 'Invalid token' and the 'Admin token' field.
- **Run:** `npx vitest run tests/adminActions.test.tsx -t "reject endpoint returns 401"`
- **Expected:** Test passes

## Acceptance criteria
- Given Retry returns 401, then the gate shows 'Invalid token'
- Given Reject returns 401, then the gate shows 'Invalid token'

## Definition of done
- Both tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-153.md`

## Links
- Evidence: EVD-033
- Requirement: REQ-076
- Unit (Act): UNIT-151
- Unit (Verify): UNIT-153
- Status: completed
- Change: UPDATE
