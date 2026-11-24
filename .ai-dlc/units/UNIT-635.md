# UNIT-635 — Verify: Blank-text validation unit tests

## Summary
Unit tests for blank prompt blocking

## Description
Prove blank and whitespace-only prompts are blocked and never posted.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionValidation.test.tsx` · `new: ContributionSheet blank validation` · new
- **Do:** Create the file with jsdom pragma and a stubFetch helper copied from contributionDialog.test.tsx; add test 'Given empty text, then Send is disabled' rendering ContributionSheet with roundId '' and asserting getByRole('button',{name:'Send'}) is disabled.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t blank`
- **Expected:** Disabled assertion passes

### Step 2 — `game/frontend/tests/contributionValidation.test.tsx` · `test: whitespace submit blocked` · new
- **Do:** Type '   ' into the 'Your idea' textarea with fireEvent.change, fireEvent.submit the form, assert the fetch mock was never called and getByRole('alert') has text 'Write your idea before sending'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t whitespace`
- **Expected:** No fetch call and message shown

## Acceptance criteria
- Send disabled for empty and whitespace text
- Form submit with whitespace shows message and no fetch POST

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-635.md`

## Links
- Evidence: EVD-127
- Requirement: REQ-316
- Unit (Act): UNIT-632
- Unit (Verify): UNIT-635
- Status: approved
- Change: UPDATE
