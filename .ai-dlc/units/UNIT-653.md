# UNIT-653 — Verify: Zero-quota Send disabled and submit blocked unit tests

## Summary
Unit tests for disabled Send and no backend call at 0

## Description
Write tests with the backend mocked proving Send is disabled and submitContribution is never called at zero quota, and still called above 0.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionQuotaGate.test.tsx` · `new: ContributionSheet zero-quota gating` · new
- **Do:** Create the test file mocking ../src/api/client as in contributionMaxLength.test.tsx. Test 1: listMine resolves 5 items from contributionFixture (tests/fixtures/api, matching listMine's return type), await the message, assert getByRole('button',{name:'Send'}) is disabled. Test 2: same setup, type 'hello' in 'Your idea', fireEvent.submit on the form, assert submitContribution not called. Test 3: listMine resolves 1 item, type 'hello', click Send, assert submitContribution toHaveBeenCalledTimes(1) with 'hello'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionQuotaGate.test.tsx`
- **Expected:** All three tests pass

## Acceptance criteria
- Send is disabled at remaining 0
- fireEvent.submit at 0 does not call submitContribution
- Submit above 0 calls submitContribution once

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-653.md`

## Links
- Evidence: EVD-131
- Requirement: REQ-326
- Unit (Act): UNIT-651
- Unit (Verify): UNIT-653
- Status: completed
- Change: NEW
