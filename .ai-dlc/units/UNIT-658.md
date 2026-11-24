# UNIT-658 — Verify: Max-length tests assert counter text and blocked submit

## Summary
Rewrite contributionMaxLength tests to assert counter, alert and zero submit calls

## Description
Context: tests/contributionMaxLength.test.tsx renders the real sheet with the client mocked. Expected result: tests fail if the counter or overLimit guard is removed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionMaxLength.test.tsx` · `describe max length tests` · L1-L130
- **Do:** Ensure tests assert getByText('3 / 500') after typing 'abc', getByRole('alert').textContent toBe 'Too long: 501 / 500' after submit of 501 chars, expect(submitMock).not.toHaveBeenCalled(), and a 500-char case expects toHaveBeenCalledTimes(1)
- **Run:** `npx vitest run tests/contributionMaxLength.test.tsx`
- **Expected:** All tests pass; removing 'if (overLimit) return;' makes the 501-char test fail

## Acceptance criteria
- Counter shows '3 / 500' after typing 'abc'
- 501 characters plus Send shows 'Too long: 501 / 500' and submitContribution called 0 times; exactly 500 characters is submitted

## Definition of done
- contributionMaxLength.test.tsx passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-658.md`

## Links
- Evidence: EVD-132
- Requirement: REQ-328
- Unit (Act): UNIT-655
- Unit (Verify): UNIT-658
- Status: approved
- Change: UPDATE
