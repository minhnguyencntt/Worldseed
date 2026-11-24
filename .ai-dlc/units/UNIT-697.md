# UNIT-697 — Verify: History loading, empty, error and list unit tests

## Summary
New test file for the four history states with fetch mocked

## Description
Write game/frontend/tests/contributionSheetHistory.test.tsx covering loading, empty, error with Retry and populated list.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSheetHistory.test.tsx` · `new: describe('ContributionSheet history states')` · new
- **Do:** Create the file with jsdom pragma and json/stubFetch helpers as in contributionDialog.test.tsx. Fixture contributionFixture from game/frontend/tests/fixtures/api.ts mirrors contributionJSON in backend/internal/contribution/handler.go.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetHistory.test.tsx`
- **Expected:** File collected

### Step 2 — `game/frontend/tests/contributionSheetHistory.test.tsx` · `it('loading and empty')` · new
- **Do:** Test 1: fetch stub returns a never-resolving promise; assert getByTestId('contribution-history-loading') present. Test 2: GET returns json(200, []); assert findByTestId('contribution-history-empty') has 'No suggestions yet this round' and loading is gone.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetHistory.test.tsx -t "loading and empty"`
- **Expected:** Both tests pass

### Step 3 — `game/frontend/tests/contributionSheetHistory.test.tsx` · `it('error then Retry recovers')` · new
- **Do:** First GET returns json(500,{error:'x'}), the second json(200,[contributionFixture]). Assert findByTestId('contribution-history-error') has 'Could not load your suggestions', click Retry, then assert the error id disappears and the list shows the fixture prompt.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetHistory.test.tsx -t Retry`
- **Expected:** Retry test passes

### Step 4 — `game/frontend/tests/contributionSheetHistory.test.tsx` · `it('list renders entries as Sent')` · new
- **Do:** GET returns two contributions with prompts 'A' and 'B'. Within findByTestId('contribution-history-list') assert both texts and two 'Sent' labels, and that contribution-history-empty is absent.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetHistory.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Four state tests pass
- No real network is used

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-697.md`

## Links
- Evidence: EVD-140
- Requirement: REQ-347
- Unit (Act): UNIT-693
- Unit (Verify): UNIT-697
- Status: approved
- Change: UPDATE
