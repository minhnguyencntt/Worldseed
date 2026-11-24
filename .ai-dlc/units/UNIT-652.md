# UNIT-652 — Verify: Zero-quota inline message unit tests

## Summary
Unit tests for message present at 0 and absent above 0

## Description
Write TDD-style tests for the zero-quota message with submitContribution and listMine mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionQuotaMessage.test.tsx` · `new: ContributionSheet zero-quota message` · new
- **Do:** Create the test file with jsdom pragma, vi.mock of ../src/api/client (importOriginal, submitContribution and listMine as vi.fn). Add test 'shows the message when 5 sent contributions exist' resolving listMine with 5 items built from contributionFixture in tests/fixtures/api (shape matches the Contribution type returned by listMine in src/api/client.ts), using findByText for 'You have used all your suggestions this round'. Add test 'omits the message with 1 sent contribution' resolving listMine with 1 item and asserting queryByText returns null after the list renders.
- **Run:** `cd game/frontend && npx vitest run tests/contributionQuotaMessage.test.tsx`
- **Expected:** Both tests pass

## Acceptance criteria
- Test asserts message present with 5 sent entries
- Test asserts message absent with 1 sent entry

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-652.md`

## Links
- Evidence: EVD-131
- Requirement: REQ-325
- Unit (Act): UNIT-650
- Unit (Verify): UNIT-652
- Status: completed
- Change: NEW
