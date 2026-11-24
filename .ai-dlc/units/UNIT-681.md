# UNIT-681 — Verify: Empty history message unit tests

## Summary
Unit tests for showing and hiding the empty history message

## Description
Write unit tests from the spec with listMine and submitContribution mocked via vi.mock of ../src/api/client, following tests/contributionHistoryStatus.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryEmpty.test.tsx` · `new: describe('history empty state')` · new
- **Do:** Create the file with '// @vitest-environment jsdom', mock '../src/api/client' via vi.mock(importOriginal) replacing listMine and submitContribution with vi.fn(), reset mocks in beforeEach and cleanup in afterEach, and render <ContributionSheet open onClose={vi.fn()} roundId="round-1" />. Submission responses use contributionFixture from tests/fixtures/api.ts, which mirrors the Contribution type returned by submitContribution in src/api/client.ts.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryEmpty.test.tsx`
- **Expected:** File is collected by vitest.

### Step 2 — `game/frontend/tests/contributionHistoryEmpty.test.tsx` · `it('shows the empty message when history loads empty')` · new
- **Do:** Mock listMine to resolve []; render; assert await screen.findByText('No suggestions yet this round') is truthy.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryEmpty.test.tsx -t 'shows the empty message'`
- **Expected:** Test passes.

### Step 3 — `game/frontend/tests/contributionHistoryEmpty.test.tsx` · `it('hides the empty message after an entry is added')` · new
- **Do:** Mock listMine to resolve [] and submitContribution to resolve contributionFixture; render, wait for the empty message, type 'A new idea' into the textbox labelled 'Your idea' with userEvent or fireEvent, click Send; assert the message is gone (waitFor queryByText is null) and 'A new idea' is listed.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryEmpty.test.tsx -t 'hides the empty message'`
- **Expected:** Test passes.

### Step 4 — `game/frontend/tests/contributionHistoryEmpty.test.tsx` · `it('does not show the empty message while loading or on error')` · new
- **Do:** Case 1: listMine returns a never-resolving promise; assert queryByText('No suggestions yet this round') is null. Case 2: listMine rejects; await the alert 'Could not load your suggestions' and assert the empty message is null. Also assert that a non-empty history ([contributionFixture]) does not show it.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryEmpty.test.tsx`
- **Expected:** All tests in the file pass.

## Acceptance criteria
- Empty ready state shows the message.
- Adding an entry hides it.
- Loading and error states do not show it.

## Definition of done
- New tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-681.md`

## Links
- Evidence: EVD-137
- Requirement: REQ-340
- Unit (Act): UNIT-680
- Unit (Verify): UNIT-681
- Status: completed
- Change: UPDATE
