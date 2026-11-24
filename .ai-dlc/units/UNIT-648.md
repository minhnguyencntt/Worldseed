# UNIT-648 — Verify: Zero-quota inline message unit tests

## Summary
Unit tests for the quota message

## Description
Write unit tests from REQ1 using mocked listMine and submitContribution.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionQuota.test.tsx` · `new: ContributionSheet quota message` · new
- **Do:** Create the test file with the vi.mock setup copied from contributionMaxLength.test.tsx, mocking listMine and submitContribution. Add test 'shows the quota message at zero remaining': listMineMock resolves 5 copies of contributionFixture with distinct prompt values, render the sheet, await screen.findByText('You have used all your suggestions this round') and assert it. Add test 'hides the message with quota left': listMineMock resolves [contributionFixture], render, wait for the 'Sent' label, assert queryByText of the message is null. Import contributionFixture from tests/fixtures/api.ts, which mirrors the Contribution type in src/api/client.ts.
- **Run:** `cd game/frontend && npx vitest run tests/contributionQuota.test.tsx -t "quota message"`
- **Expected:** Both tests pass.

## Acceptance criteria
- Message visible with 5 history entries
- Message absent with 1 history entry

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-648.md`

## Links
- Evidence: EVD-130
- Requirement: REQ-323
- Unit (Act): UNIT-646
- Unit (Verify): UNIT-648
- Status: approved
- Change: UPDATE
