# UNIT-645 — Verify: Over-limit message and submit block unit tests

## Summary
Unit tests prove the over-limit message and blocked submit

## Description
Extend the max-length test file with over-limit cases using the mocked client.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionMaxLength.test.tsx` · `describe: over limit` · after the counter tests
- **Do:** Add tests with 'a'.repeat(n): (1) n=501 and Send click -> getByRole('alert').textContent is 'Too long: 501 / 500', textarea aria-invalid is 'true', submitMock not called, textarea value still 501 chars; (2) n=500 -> queryByText(/Too long/) is null and, after Send click with submitMock resolving contributionFixture, submitMock called once with the 500-char string; (3) change from 501 to 500 chars removes the message; (4) 500 characters plus surrounding spaces still submits
- **Run:** `cd game/frontend && npx vitest run tests/contributionMaxLength.test.tsx -t over`
- **Expected:** All over-limit tests pass

### Step 2 — `game/frontend/tests/contributionBlank.test.tsx` · `existing suite` · L1-L60
- **Do:** Run unchanged to confirm blank behavior is preserved
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx`
- **Expected:** Existing blank tests still pass

## Acceptance criteria
- 501 chars shows message and blocks submit
- 500 chars submits

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-645.md`

## Links
- Evidence: EVD-129
- Requirement: REQ-322
- Unit (Act): UNIT-643
- Unit (Verify): UNIT-645
- Status: completed
- Change: UPDATE
