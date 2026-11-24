# UNIT-649 — Verify: Zero-quota Send disabled and submit blocked unit tests

## Summary
Unit tests for disabled Send and blocked submit

## Description
Write unit tests from REQ2 with mocked client.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionQuota.test.tsx` · `describe: ContributionSheet zero-quota gating` · new
- **Do:** Add a describe block with three tests. (1) listMineMock resolves 5 distinct contributions; await the message, then assert screen.getByRole('button', {name: 'Send'}) has disabled true. (2) Same setup, type 'hello' via fireEvent.change on label 'Your idea', fireEvent.submit the form (closest('form') of the textarea), assert submitMock not called. (3) listMineMock resolves 4 contributions, submitMock resolves contributionFixture, type 'hello', click Send, assert submitMock called once with 'hello'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionQuota.test.tsx -t "zero-quota gating"`
- **Expected:** All three tests pass.

## Acceptance criteria
- Send disabled at 0 remaining
- submitContribution not called on form submit at 0 remaining
- submit works with 1 remaining

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-649.md`

## Links
- Evidence: EVD-130
- Requirement: REQ-324
- Unit (Act): UNIT-647
- Unit (Verify): UNIT-649
- Status: approved
- Change: UPDATE
