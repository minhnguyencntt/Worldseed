# UNIT-659 — Verify: Zero-quota tests assert disabled Send, message and no submit

## Summary
Rewrite contributionQuotaGate and contributionQuotaMessage tests to assert real gating

## Description
Context: both test files render the real sheet with listMine mocked to return 5 contributions. Expected result: tests fail if the disabled prop, message or guard is removed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionQuotaGate.test.tsx` · `describe quota gate tests` · L1-L78
- **Do:** Ensure tests await the history load, assert Send button .disabled is true, call fireEvent.submit on the form with text set, and assert submitMock toHaveBeenCalledTimes(0)
- **Run:** `npx vitest run tests/contributionQuotaGate.test.tsx`
- **Expected:** Tests pass; removing disabled or the remaining guard makes them fail

### Step 2 — `game/frontend/tests/contributionQuotaMessage.test.tsx` · `describe quota message tests` · L1-L59
- **Do:** Ensure tests assert the alert text 'You have used all your suggestions this round' appears at zero quota and is absent when fewer than 5 entries are returned
- **Run:** `npx vitest run tests/contributionQuotaMessage.test.tsx`
- **Expected:** Tests pass; removing the quota paragraph makes them fail

## Acceptance criteria
- With 5 history entries Send is disabled and the quota message text is shown
- fireEvent.submit on the form leaves submitContribution with 0 calls

## Definition of done
- Both quota test files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-659.md`

## Links
- Evidence: EVD-132
- Requirement: REQ-329
- Unit (Act): UNIT-656
- Unit (Verify): UNIT-659
- Status: approved
- Change: UPDATE
