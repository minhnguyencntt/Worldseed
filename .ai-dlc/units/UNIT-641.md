# UNIT-641 — Verify: Blank message clears on typing and valid submit unit tests

## Summary
Unit tests for clearing the message and still submitting valid text

## Description
Prove with mocked client that the message clears on typing and a trimmed valid idea is posted.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionBlank.test.tsx` · `it: typing clears the blank message` · new
- **Do:** Add test: click Send with empty text so the alert shows, then fireEvent.change the textarea to 'a'; assert screen.queryByRole('alert') is null and the textarea aria-invalid is not 'true'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx -t "typing clears"`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/contributionBlank.test.tsx` · `it: valid idea after a blank attempt is sent trimmed` · new
- **Do:** Add test with submitContribution mocked to resolve: click Send blank, change textarea to '  hello  ', click Send; await waitFor submitContribution toHaveBeenCalledTimes(1) and toHaveBeenCalledWith('hello'); assert no alert with text 'Enter an idea first'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx -t "sent trimmed"`
- **Expected:** Test passes.

## Acceptance criteria
- Typing removes the alert
- Valid submit posts the trimmed prompt once and no blank alert remains

## Definition of done
- Tests pass in isolation
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-641.md`

## Links
- Evidence: EVD-128
- Requirement: REQ-320
- Unit (Act): UNIT-639
- Unit (Verify): UNIT-641
- Status: completed
- Change: UPDATE
