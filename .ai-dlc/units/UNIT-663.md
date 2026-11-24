# UNIT-663 — Verify: Send disabled for blank, over-limit, zero-quota and in-flight unit tests

## Summary
Unit tests assert every disabled condition and fix existing tests that clicked a now-disabled Send.

## Description
New test file with mocked ../src/api/client (submitContribution, listMine) following the pattern in tests/contributionQuotaGate.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSubmitDisabled.test.tsx` · `new: ContributionSheet Send disabled states` · new
- **Do:** Create the suite with the vi.mock block copied from tests/contributionQuotaGate.test.tsx. Tests: (1) listMine resolves [], no text -> Send disabled; (2) type '   ' -> disabled; (3) type 'x'.repeat(MAX_PROMPT_LENGTH+1) -> disabled; (4) listMine resolves historyOf(MAX_PER_PLAYER) using contributionFixture from tests/fixtures/api -> disabled with valid text; (5) type 'hello', submitMock returns a never-resolving promise, fireEvent.submit the form -> Send disabled; (6) type 'hello' with quota -> enabled.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSubmitDisabled.test.tsx`
- **Expected:** All six tests pass.

### Step 2 — `game/frontend/tests/contributionBlank.test.tsx` · `blank submit tests (L35-L60)` · L35-L60
- **Do:** Replace fireEvent.click on the Send button with fireEvent.submit on the form element (screen.getByRole('button',{name:'Send'}).closest('form')) in tests that expect 'Enter an idea first', since Send is now disabled for blank text.
- **Run:** `cd game/frontend && npx vitest run tests/contributionBlank.test.tsx`
- **Expected:** Blank tests still assert the inline message and zero submit calls.

### Step 3 — `game/frontend/tests/contributionMaxLength.test.tsx` · `over-limit tests (L85-L125)` · L85-L125
- **Do:** Where a test clicks Send with over-limit text, use fireEvent.submit on the form instead and keep the assertions that submitMock is not called.
- **Run:** `cd game/frontend && npx vitest run tests/contributionMaxLength.test.tsx`
- **Expected:** Over-limit tests pass against the disabled button.

## Acceptance criteria
- Send is disabled for blank, whitespace-only, over-limit and zero-quota states.
- Send is disabled while a submission is pending and enabled for valid text with quota.

## Definition of done
- New tests pass; adapted existing tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-663.md`

## Links
- Evidence: EVD-133
- Requirement: REQ-330
- Unit (Act): UNIT-660
- Unit (Verify): UNIT-663
- Status: completed
- Change: UPDATE
