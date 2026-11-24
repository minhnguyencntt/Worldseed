# UNIT-671 — Verify: History error and Retry unit tests

## Summary
Unit tests for error alert and Retry

## Description
Test error rendering and that Retry re-calls listMine and recovers.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryError.test.tsx` · `new: contribution history error tests` · new
- **Do:** Create jsdom test file mocking listMine. Test 1: mockRejectedValueOnce(new Error('boom')); await findByText('Could not load your suggestions') and assert button named Retry exists. Test 2: first call rejects, second resolves [contributionFixture] from tests/fixtures/api.ts (mirrors backend contributionJSON); click Retry; await findByText(contributionFixture.prompt); assert listMine toHaveBeenCalledTimes(2) and the error text is gone.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryError.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Alert and Retry asserted on rejection
- Retry calls listMine twice and shows list

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-671.md`

## Links
- Evidence: EVD-134
- Requirement: REQ-335
- Unit (Act): UNIT-668
- Unit (Verify): UNIT-671
- Status: approved
- Change: UPDATE
