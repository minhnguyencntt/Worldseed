# UNIT-670 — Verify: History empty state unit tests

## Summary
Unit tests for empty message

## Description
Test empty message with an empty history and its removal after submit.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryEmpty.test.tsx` · `new: contribution history empty tests` · new
- **Do:** Create jsdom test file mocking listMine to resolve [] and submitContribution to resolve a contributionFixture (tests/fixtures/api.ts, mirrors backend contributionJSON). Test 1: await findByText('No suggestions yet this round') and assert 'Contributions left: 5'. Test 2: type 'Open the door' into 'Your idea', click Send, await findByText('Suggestion sent'), assert empty message is absent.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryEmpty.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Empty message and 5 left asserted
- Message disappears after submit

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-670.md`

## Links
- Evidence: EVD-134
- Requirement: REQ-334
- Unit (Act): UNIT-667
- Unit (Verify): UNIT-670
- Status: approved
- Change: UPDATE
