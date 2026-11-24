# UNIT-665 — Verify: Inline success and error feedback unit tests

## Summary
Unit tests assert the success status message, mutual exclusivity with errors and clearing on typing.

## Description
New test file with mocked submitContribution; error case uses ApiError from the real client module via importOriginal.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSuccessFeedback.test.tsx` · `new: ContributionSheet inline feedback` · new
- **Do:** Create the suite with the vi.mock block from tests/contributionQuotaGate.test.tsx. Test 1: submitMock resolves contributionFixture (tests/fixtures/api); type 'hello', submit the form; await screen.findByRole('status') with text 'Suggestion sent' and assert queryByRole('alert') is null. Test 2: submitMock rejects with the 429 ApiError built as in tests/contribution.test.tsx L69; assert alert text 'Slow down, try again shortly' and queryByRole('status') is null. Test 3: after success, fireEvent.change the textarea to 'more' and assert queryByRole('status') is null.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSuccessFeedback.test.tsx`
- **Expected:** All three tests pass.

## Acceptance criteria
- After a resolved send a role=status 'Suggestion sent' shows and no alert is present.
- After a 429 the slow-down alert shows with no success message, and typing clears the success message.

## Definition of done
- Feedback tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-665.md`

## Links
- Evidence: EVD-133
- Requirement: REQ-332
- Unit (Act): UNIT-662
- Unit (Verify): UNIT-665
- Status: completed
- Change: UPDATE
