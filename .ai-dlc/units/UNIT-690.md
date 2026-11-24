# UNIT-690 — Verify: Success feedback targets its own test id unit tests

## Summary
Update contributionSuccessFeedback tests to use the success test id

## Description
Replace ambiguous role queries with test id queries in the success feedback test.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSuccessFeedback.test.tsx` · `ContributionSheet inline feedback tests` · L54, L65, L73, L77
- **Do:** Replace findByRole('status') with findByTestId('contribution-success') at L54 and L73, and queryByRole('status') with queryByTestId('contribution-success') at L65 and L77; keep text assertion SUCCESS_MESSAGE and alert assertions

```
expect(await screen.findByTestId('contribution-success')).toHaveTextContent(SUCCESS_MESSAGE);
```

- **Run:** `npx vitest run tests/contributionSuccessFeedback.test.tsx`
- **Expected:** All 3 tests pass

## Acceptance criteria
- Success test uses contribution-success
- 429 and edit tests assert it is absent

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-690.md`

## Links
- Evidence: EVD-139
- Requirement: REQ-344
- Unit (Act): UNIT-687
- Unit (Verify): UNIT-690
- Status: completed
- Change: UPDATE
