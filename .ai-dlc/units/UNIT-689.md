# UNIT-689 — Verify: History loading and empty message test ids unit tests

## Summary
Unit tests assert loading and empty test ids

## Description
Add unit tests with mocked listMine asserting the loading and empty test ids.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryStatus.test.tsx` · `new test: shows loading test id while history pending` · after last test
- **Do:** Mock listMine with a never-resolving promise, render ContributionSheet open, assert getByTestId('contribution-history-loading') has text 'Loading your suggestions…' and queryByTestId('contribution-success') is null
- **Run:** `npx vitest run tests/contributionHistoryStatus.test.tsx`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/contributionHistoryEmpty.test.tsx` · `new test: shows empty test id` · after last test
- **Do:** Mock listMine to resolve [], render the sheet, assert await findByTestId('contribution-history-empty') is present and queryByTestId('contribution-history-loading') is null
- **Run:** `npx vitest run tests/contributionHistoryEmpty.test.tsx`
- **Expected:** Test passes

## Acceptance criteria
- Pending listMine shows contribution-history-loading and no contribution-success
- Resolved empty list shows contribution-history-empty

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-689.md`

## Links
- Evidence: EVD-139
- Requirement: REQ-343
- Unit (Act): UNIT-686
- Unit (Verify): UNIT-689
- Status: completed
- Change: UPDATE
