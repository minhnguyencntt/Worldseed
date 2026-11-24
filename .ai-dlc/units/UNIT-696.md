# UNIT-696 — Verify: Submit success, API error and quota exhausted unit tests

## Summary
New test file asserting the three submit outcomes with fetch mocked

## Description
Write game/frontend/tests/contributionSheetSubmit.test.tsx with fetch stubbed, covering success, 500, 409 and quota exhausted.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSheetSubmit.test.tsx` · `new: describe('ContributionSheet submit outcomes')` · new
- **Do:** Create the file with the jsdom pragma, the json/stubFetch helpers copied from contributionDialog.test.tsx, and a render helper for <ContributionSheet open onClose={vi.fn()} roundId="round-1" />. GET routes return json(200, []). Fixture: contributionFixture from game/frontend/tests/fixtures/api.ts, which mirrors contributionJSON in backend/internal/contribution/handler.go.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetSubmit.test.tsx`
- **Expected:** File is collected by vitest

### Step 2 — `game/frontend/tests/contributionSheetSubmit.test.tsx` · `it('success shows contribution-success')` · new
- **Do:** POST route returns json(201, contributionFixture). Type 'Look behind the shelf' into label 'Your idea', click Send, assert findByTestId('contribution-success') has text 'Suggestion sent' and queryByTestId('contribution-error') is null.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetSubmit.test.tsx -t success`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/contributionSheetSubmit.test.tsx` · `it('500 and 409 show contribution-error')` · new
- **Do:** Two tests: POST returns json(500,{error:'boom'}) and asserts contribution-error text 'Could not send'; POST returns json(409,{error:'limit'}) and asserts text 'Limit reached or duplicate idea'; both assert contribution-success is absent.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetSubmit.test.tsx -t error`
- **Expected:** Both tests pass

### Step 4 — `game/frontend/tests/contributionSheetSubmit.test.tsx` · `it('quota exhausted')` · new
- **Do:** GET returns json(200, five contributions built by spreading contributionFixture with distinct id and prompt). Assert findByTestId('contribution-quota') has text 'You have used all your suggestions this round', 'Send' button is disabled and no POST was made on the fetch mock.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetSubmit.test.tsx`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Success, 500, 409 and quota tests pass
- No real network is used

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-696.md`

## Links
- Evidence: EVD-140
- Requirement: REQ-346
- Unit (Act): UNIT-692
- Unit (Verify): UNIT-696
- Status: approved
- Change: UPDATE
