# UNIT-322 — Verify: App header round states unit tests

## Summary
App renders header for ready, loading and failed round

## Description
Add tests/appHeader.test.tsx with getCurrentRound mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appHeader.test.tsx` · `new: describe App header` · new
- **Do:** Mock getCurrentRound. Render App, click the Begin control used in tests/appFlow.test.tsx to pass the intro. Case resolved(roundFixture): await findByText('round-1') and getByText('OPEN'). Case never-resolving promise: getByText('Loading round…'). Case rejected(new Error('HTTP 500')): await findByRole('alert') toHaveTextContent('Round status unavailable: HTTP 500'); queryByText('Round unavailable') null.
- **Run:** `npx vitest run tests/appHeader.test.tsx`
- **Expected:** All three cases pass

## Acceptance criteria
- Ready state asserts round id and status are shown
- Pending state asserts 'Loading round…' is shown
- Rejected state asserts an alert with 'Round status unavailable: HTTP 500' and no 'Round unavailable' text

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-322.md`

## Links
- Evidence: EVD-064
- Requirement: REQ-160
- Unit (Act): UNIT-319
- Unit (Verify): UNIT-322
- Status: completed
- Change: UPDATE
