# UNIT-624 — Verify: Submit validation, quota and submit-state unit tests

## Summary
Unit tests for validation and feedback with fetch mocked

## Description
Test empty, over-length, exhausted, loading, success and API error paths.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionValidation.test.tsx` · `test: empty and over-length` · new
- **Do:** Create the file with jsdom env and a stubFetch helper. Render <ContributionSheet open onClose roundId=''> (empty id skips history). Test 1: click Send with empty textarea; assert alert 'Enter an idea before sending' and fetch not called. Test 2: change textarea to 'a'.repeat(501), click Send; assert alert contains '500 characters' and fetch not called.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t "empty|over-length"`
- **Expected:** Both tests pass

### Step 2 — `game/frontend/tests/contributionValidation.test.tsx` · `test: quota exhausted` · new
- **Do:** Stub GET history to return 5 contributions built from contributionFixture with distinct prompts; render with roundId 'round-1'; await 'No contributions left'; assert textarea and Send button are disabled and fetch was called only for the history GET.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t "exhausted"`
- **Expected:** Form disabled and no POST made

### Step 3 — `game/frontend/tests/contributionValidation.test.tsx` · `test: loading, success and API error` · new
- **Do:** Success: POST resolves via a deferred promise; click Send with valid text; assert button is disabled with text 'Sending…', resolve, then assert role=status 'Idea sent'. Error: POST returns 429 JSON {error:'rate limited'}; assert alert 'Slow down, try again shortly'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t "success|API error"`
- **Expected:** Loading, success and error states asserted

## Acceptance criteria
- No fetch on invalid input
- Exhausted disables form
- Loading, success and error states asserted

## Definition of done
- New test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-624.md`

## Links
- Evidence: EVD-125
- Requirement: REQ-311
- Unit (Act): UNIT-621
- Unit (Verify): UNIT-624
- Status: approved
- Change: UPDATE
