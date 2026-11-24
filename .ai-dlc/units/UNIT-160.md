# UNIT-160 — Verify: Contribution-limit field disabled unit tests

## Summary
Unit test that the limit input is disabled and never sent

## Description
Test AdminApp renders the input disabled with the note.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminLimit.test.tsx` · `new: contribution limit field` · new
- **Do:** Create jsdom test using the stubFetch pattern of tests/admin.test.tsx with roundFixture (backend contract world.Round). Enter token secret; assert screen.getByLabelText('Max contributions per player') is disabled and getByText(/server configuration/) is present; click Create round and assert no fetch body string contains 'max'.
- **Run:** `cd game/frontend && npx vitest run tests/adminLimit.test.tsx`
- **Expected:** Test passes.

## Acceptance criteria
- Disabled input and note.
- No request body contains the limit.

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-160.md`

## Links
- Evidence: EVD-034
- Requirement: REQ-080
- Unit (Act): UNIT-157
- Unit (Verify): UNIT-160
- Status: completed
- Change: UPDATE
