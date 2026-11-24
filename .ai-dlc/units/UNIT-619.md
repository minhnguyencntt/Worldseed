# UNIT-619 — Verify: App round loading, empty, error and retry unit tests

## Summary
App tests with getCurrentRound mocked for success, 404, 500, network and retry

## Description
Mock ./api/client getCurrentRound; no network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appRound.test.tsx` · `new: App round states` · new
- **Do:** vi.mock('../src/api/client', importActual with getCurrentRound as vi.fn()). Reuse the mock setup and Begin click from tests/appHeader.test.tsx. Cases: pending promise shows 'Loading round…'; roundFixture shows 'round-1' and 'OPEN'; reject new ApiError(404,'404 Not Found') shows 'No active round' and no alert; reject ApiError(500,'500 x') shows alert containing 'Round service returned 500'; reject TypeError shows 'Could not reach the server'; reject then resolve roundFixture, click Retry, assert 'round-1' appears and getCurrentRound called twice.
- **Run:** `cd game/frontend && npx vitest run tests/appRound.test.tsx`
- **Expected:** All six cases pass

### Step 2 — `game/frontend/tests/appRound.test.tsx` · `describeRoundError tests` · new
- **Do:** Add direct unit tests of describeRoundError for ApiError with and without detail, TypeError, and a plain string input.
- **Run:** `cd game/frontend && npx vitest run tests/appRound.test.tsx -t describeRoundError`
- **Expected:** Messages match the mapping

## Acceptance criteria
- Loading and success states are each asserted with getCurrentRound mocked
- Empty (404) and error (500, network) states are each asserted
- Retry after a failure reloads the round and shows it

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-619.md`

## Links
- Evidence: EVD-124
- Requirement: REQ-309
- Unit (Act): UNIT-616
- Unit (Verify): UNIT-619
- Status: completed
- Change: UPDATE
