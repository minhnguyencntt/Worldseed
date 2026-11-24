# UNIT-657 — Verify: Blank-text validation tests assert real dialog behaviour

## Summary
Rewrite contributionBlank tests to assert alert text, aria wiring and zero submit calls

## Description
Context: tests/contributionBlank.test.tsx renders the real sheet with the API client mocked. Desired behavior: every test asserts message text and submitContribution call count. Expected result: tests fail if the blank guard is removed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionBlank.test.tsx` · `describe('ContributionSheet blank submit')` · L29-L94
- **Do:** Keep the five tests; ensure the empty and whitespace tests use getByRole('alert').textContent toBe 'Enter an idea first' and expect(submitMock).toHaveBeenCalledTimes(0); ensure the valid test asserts toHaveBeenCalledWith('hello') and queryByText('Enter an idea first') is null
- **Run:** `npx vitest run tests/contributionBlank.test.tsx`
- **Expected:** 5 tests pass; with the blank guard removed from handleSubmit the first two fail

## Acceptance criteria
- Empty and whitespace-only submit show 'Enter an idea first' and submitContribution is called 0 times
- Typing clears the alert and aria-invalid; a valid trimmed idea is sent as 'hello' once

## Definition of done
- contributionBlank.test.tsx passes and each test asserts a message or call count
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-657.md`

## Links
- Evidence: EVD-132
- Requirement: REQ-327
- Unit (Act): UNIT-654
- Unit (Verify): UNIT-657
- Status: approved
- Change: UPDATE
