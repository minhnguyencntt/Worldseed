# UNIT-640 — Verify: Blank and whitespace-only submit shows the inline message unit tests

## Summary
Unit tests for the blank branch with the API client mocked

## Description
Prove with mocked client that blank text shows the alert and never calls submitContribution.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionBlank.test.tsx` · `new: test setup` · new
- **Do:** Create the file; vi.mock '../src/api/client' spreading importActual and replacing submitContribution and listMine with vi.fn. listMine resolves with the list from the fixture in game/frontend/tests/fixtures/api.ts (contributionFixture), which mirrors the Contribution type returned by listMine in game/frontend/src/api/client.ts; do not inline the payload. Render <ContributionSheet open onClose={vi.fn()} roundId="ROUND-0000001" /> and call cleanup in afterEach.
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx`
- **Expected:** File loads with mocks in place.

### Step 2 — `game/frontend/tests/contributionBlank.test.tsx` · `it: empty text shows 'Enter an idea first' and does not submit` · new
- **Do:** Add test: click the 'Send' button with the textarea empty; assert screen.getByRole('alert') has text 'Enter an idea first' and submitContribution toHaveBeenCalledTimes(0).
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx -t "empty text"`
- **Expected:** Test passes.

### Step 3 — `game/frontend/tests/contributionBlank.test.tsx` · `it: whitespace-only text shows the message and does not submit` · new
- **Do:** Add test: fireEvent.change the textarea (label 'Your idea') to '   \n  ', click Send; assert the alert text 'Enter an idea first' and submitContribution not called.
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx -t "whitespace-only"`
- **Expected:** Test passes.

### Step 4 — `game/frontend/tests/contributionBlank.test.tsx` · `it: textarea is marked invalid and described by the alert` · new
- **Do:** Add test: after blank Send assert the textarea has attribute aria-invalid='true' and aria-describedby equal to the alert element id.
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx -t "marked invalid"`
- **Expected:** Test passes.

## Acceptance criteria
- Empty submit shows alert and no API call
- Whitespace-only submit shows alert and no API call
- Textarea has aria-invalid and aria-describedby

## Definition of done
- Tests pass in isolation
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-640.md`

## Links
- Evidence: EVD-128
- Requirement: REQ-319
- Unit (Act): UNIT-638
- Unit (Verify): UNIT-640
- Status: completed
- Change: UPDATE
