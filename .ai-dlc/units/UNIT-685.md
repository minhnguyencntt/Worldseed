# UNIT-685 — Verify: Retry returns to the loading state and reloads unit tests

## Summary
Unit tests for Retry loading state and refetch

## Description
Test that after Retry the loading message shows while pending, listMine is called twice, and a second failure shows the error again.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryRetryLoading.test.tsx` · `new: describe('retry returns to loading')` · new
- **Do:** Create jsdom test file with the same vi.mock of ../src/api/client as tests/contributionHistoryRetry.test.tsx. Test 'shows loading while retry pending': first listMine rejects, second returns a never-resolving promise; click Retry; assert getByText('Loading your suggestions…') present, queryByText('Could not load your suggestions') null, queryByRole('button',{name:'Retry'}) null, listMine called 2 times. Test 'second failure shows error again': mockRejectedValueOnce twice; click Retry; assert findByRole('alert') has the error text and Retry button is present again.
- **Run:** `npx vitest run tests/contributionHistoryRetryLoading.test.tsx`
- **Expected:** Both tests pass

## Acceptance criteria
- Pending retry shows loading and hides error and Retry
- listMine called twice
- Second rejection shows error and Retry again

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-685.md`

## Links
- Evidence: EVD-138
- Requirement: REQ-342
- Unit (Act): UNIT-683
- Unit (Verify): UNIT-685
- Status: approved
- Change: UPDATE
