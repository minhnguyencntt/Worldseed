# UNIT-684 — Verify: History error message and Retry button unit tests

## Summary
Unit tests for error alert and Retry presence

## Description
Add unit tests for the error state rendering with listMine mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryErrorRetry.test.tsx` · `new: describe('history error message')` · new
- **Do:** Create jsdom test file mirroring tests/contributionHistoryRetry.test.tsx mocks. Test 'shows error and Retry': listMine.mockRejectedValueOnce(new Error('x')), render <ContributionSheet open onClose={vi.fn()} roundId="round-1" />, assert findByRole('alert') has text 'Could not load your suggestions' and getByRole('button',{name:'Retry'}) exists. Test 'hides both on success': mockResolvedValueOnce([]), wait for loading text to vanish, assert queryByRole('button',{name:'Retry'}) is null and the error text is absent. Fixture data comes from tests/fixtures/api.ts, which mirrors the listMine response type in src/api/client.ts.
- **Run:** `npx vitest run tests/contributionHistoryErrorRetry.test.tsx`
- **Expected:** Both tests pass

## Acceptance criteria
- Rejected listMine shows the alert text and Retry
- Resolved listMine shows neither

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-684.md`

## Links
- Evidence: EVD-138
- Requirement: REQ-341
- Unit (Act): UNIT-682
- Unit (Verify): UNIT-684
- Status: approved
- Change: UPDATE
