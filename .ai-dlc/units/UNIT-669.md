# UNIT-669 — Verify: History loading state and derived remaining unit tests

## Summary
Unit tests for loading text and remaining derivation

## Description
Test the loading state and that remaining is derived from history with listMine mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryLoading.test.tsx` · `new: contribution history loading tests` · new
- **Do:** Create jsdom test file mocking listMine (importOriginal pattern). Test 1: listMine returns a never-resolving promise; assert getByText('Loading your suggestions…'). Test 2: listMine resolves two items built from contributionFixture in game/frontend/tests/fixtures/api.ts (mirrors contributionJSON in backend/internal/contribution/handler.go) with distinct prompts; await findByText of the first prompt, assert loading text absent and 'Contributions left: 3' present.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistoryLoading.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Loading text asserted while listMine is pending
- Remaining count asserted after resolve with 2 items

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-669.md`

## Links
- Evidence: EVD-134
- Requirement: REQ-333
- Unit (Act): UNIT-666
- Unit (Verify): UNIT-669
- Status: approved
- Change: UPDATE
