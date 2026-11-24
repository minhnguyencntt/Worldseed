# UNIT-691 — Verify: History error alert and Retry unit tests

## Summary
Unit tests assert error test id and Retry

## Description
Add unit tests asserting the error test id, Retry button and return to loading.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryRetry.test.tsx` · `new test: error test id and Retry` · after last test
- **Do:** Mock listMine to reject once then never resolve; render sheet; assert findByTestId('contribution-history-error') exists and button 'Retry' exists; click Retry; assert getByTestId('contribution-history-loading') is shown and listMine toHaveBeenCalledTimes(2)
- **Run:** `npx vitest run tests/contributionHistoryRetry.test.tsx`
- **Expected:** Test passes

## Acceptance criteria
- Rejected listMine shows contribution-history-error and Retry
- Retry shows loading again and calls listMine twice

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-691.md`

## Links
- Evidence: EVD-139
- Requirement: REQ-345
- Unit (Act): UNIT-688
- Unit (Verify): UNIT-691
- Status: completed
- Change: UPDATE
