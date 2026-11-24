# UNIT-871 — Verify: describeRoundError SyntaxError unit tests

## Summary
Unit test the explained message and App header display

## Description
Add tests in appRound.test.tsx for the SyntaxError branch and for the header showing it when getCurrentRound rejects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appRound.test.tsx` · `describe('describeRoundError')` · L109-L126
- **Do:** Add an it that calls describeRoundError(new SyntaxError("Unexpected token '<'")) and expects 'Round service returned an unexpected response (not JSON)'.
- **Run:** `cd game/frontend && npx vitest run tests/appRound.test.tsx -t describeRoundError`
- **Expected:** New test passes; existing four describeRoundError tests still pass.

### Step 2 — `game/frontend/tests/appRound.test.tsx` · `describe('App round states')` · after L40
- **Do:** Add an it that does mockedGetCurrentRound.mockRejectedValue(new SyntaxError('Unexpected token <')), renders App, clicks Begin, and awaits the text 'Round service returned an unexpected response (not JSON)' while asserting queryByText(/Unexpected token/) is null. Follow the begin-click pattern of the neighbouring tests.
- **Run:** `cd game/frontend && npx vitest run tests/appRound.test.tsx`
- **Expected:** The header shows the explained message and no parser text.

## Acceptance criteria
- SyntaxError maps to the explained text
- Header does not show the raw parser message

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-871.md`

## Links
- Evidence: EVD-173
- Requirement: REQ-435
- Unit (Act): UNIT-869
- Unit (Verify): UNIT-871
- Status: completed
- Change: UPDATE
