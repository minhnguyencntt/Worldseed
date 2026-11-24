# UNIT-679 — Verify: Loading message only during in-flight history and 401-retry test still passes

## Summary
Unit tests for loading visibility with and without a round id

## Description
Add unit tests for ContributionSheet history loading visibility, with listMine mocked, and re-run the existing 401-retry test.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryLoadingVisibility.test.tsx` · `new: describe('history loading visibility')` · new
- **Do:** Create the file with the jsdom pragma and the vi.mock of '../src/api/client' (listMine, submitContribution as vi.fn) copied from contributionHistoryStatus.test.tsx lines 1-16. Add test 'hides loading when roundId is empty': render <ContributionSheet open onClose={vi.fn()} roundId="" />, assert screen.queryByText('Loading your suggestions…') is null, assert getByRole('list',{name:'Your suggestions'}) exists, and assert listMine was not called.
- **Run:** `npx vitest run tests/contributionHistoryLoadingVisibility.test.tsx`
- **Expected:** Test passes: no loading text, list present, listMine not called

### Step 2 — `game/frontend/tests/contributionHistoryLoadingVisibility.test.tsx` · `it('shows loading and the list while listMine is pending')` · new
- **Do:** Mock listMine with mockReturnValue(new Promise(() => {})), render with roundId="round-1", assert getByText('Loading your suggestions…') is present and getByRole('list',{name:'Your suggestions'}) is present.
- **Run:** `npx vitest run tests/contributionHistoryLoadingVisibility.test.tsx`
- **Expected:** Test passes: both loading text and list visible

### Step 3 — `game/frontend/tests/contribution.test.tsx` · `it('Given the server answers 401 once ...')` · L87-L112
- **Do:** Do not edit; run this existing test to confirm it passes with the Act change.
- **Run:** `npx vitest run tests/contribution.test.tsx -t "answers 401 once"`
- **Expected:** The 401-retry test passes with the three ordered POST calls and 'Sent' in the list

## Acceptance criteria
- Test asserts the loading text is absent when roundId is ''
- Test asserts loading text and list both present while listMine is pending
- Existing 401-retry test passes unchanged

## Definition of done
- New tests pass
- tests/contribution.test.tsx passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-679.md`

## Links
- Evidence: EVD-136
- Requirement: REQ-339
- Unit (Act): UNIT-678
- Unit (Verify): UNIT-679
- Status: approved
- Change: UPDATE
