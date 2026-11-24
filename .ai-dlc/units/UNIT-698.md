# UNIT-698 — Verify: Empty and over-length validation unit tests

## Summary
New test file for validation with fetch mocked

## Description
Write game/frontend/tests/contributionSheetValidation.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSheetValidation.test.tsx` · `new: describe('ContributionSheet validation')` · new
- **Do:** Create the file with jsdom pragma and json/stubFetch helpers as in contributionDialog.test.tsx; GET returns json(200, []), POST returns json(201, contributionFixture) from game/frontend/tests/fixtures/api.ts (mirrors contributionJSON in backend/internal/contribution/handler.go). Add helper postCalls(fetchMock) filtering calls to /api/v1/contributions.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetValidation.test.tsx`
- **Expected:** File collected

### Step 2 — `game/frontend/tests/contributionSheetValidation.test.tsx` · `it('empty text is rejected')` · new
- **Do:** Submit the form via fireEvent.submit on the form containing 'Your idea' with empty value; assert contribution-validation-blank text 'Enter an idea first' and postCalls length 0.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetValidation.test.tsx -t empty`
- **Expected:** Empty text test passes

### Step 3 — `game/frontend/tests/contributionSheetValidation.test.tsx` · `it('501 chars blocked, 500 sent')` · new
- **Do:** Type 'a'.repeat(501): assert contribution-validation-limit text 'Too long: 501 / 500', Send disabled, submit form, postCalls length 0. Change to 'a'.repeat(500): limit element absent, click Send, waitFor postCalls length 1.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetValidation.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Blank, 501 and 500 tests pass
- No POST is made for blank or 501-character text

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-698.md`

## Links
- Evidence: EVD-140
- Requirement: REQ-348
- Unit (Act): UNIT-694
- Unit (Verify): UNIT-698
- Status: approved
- Change: UPDATE
