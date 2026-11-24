# UNIT-636 — Verify: Max length counter and over-limit unit tests

## Summary
Unit tests for counter and length gating

## Description
Prove the counter, the over-limit message and the boundary at exactly 500 characters.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionValidation.test.tsx` · `test: counter text` · after blank tests
- **Do:** Type 'hello' into the textarea and assert screen.getByText('5/500') is present.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t counter`
- **Expected:** Counter assertion passes

### Step 2 — `game/frontend/tests/contributionValidation.test.tsx` · `test: length boundary` · after counter test
- **Do:** Type 'a'.repeat(501): assert getByText('Idea is too long') and Send disabled; then change to 'a'.repeat(500): assert queryByText('Idea is too long') is null and Send enabled.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t boundary`
- **Expected:** 501 blocked, 500 allowed

## Acceptance criteria
- Counter shows N/500
- 501 chars blocks, 500 chars allows

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-636.md`

## Links
- Evidence: EVD-127
- Requirement: REQ-317
- Unit (Act): UNIT-633
- Unit (Verify): UNIT-636
- Status: approved
- Change: UPDATE
