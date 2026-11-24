# UNIT-664 — Verify: Send loading label unit tests

## Summary
Unit tests assert the 'Sending…' label while pending and 'Send' after settle.

## Description
New test file using mocked submitContribution with a controllable deferred promise.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionLoadingLabel.test.tsx` · `new: ContributionSheet loading label` · new
- **Do:** Create the suite with the vi.mock block from tests/contributionQuotaGate.test.tsx. Test 1: type 'hello', submitMock returns a manually controlled promise, fireEvent.submit the form, assert screen.getByRole('button',{name:'Sending…'}) exists with aria-busy true; resolve with contributionFixture (tests/fixtures/api) and waitFor getByRole('button',{name:'Send'}). Test 2: same with submitMock.mockRejectedValue(new Error('x')) and assert the label returns to 'Send'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionLoadingLabel.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Button name is 'Sending…' with aria-busy true while the request is pending.
- Button name is 'Send' again after the request resolves and after it rejects.

## Definition of done
- Loading label tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-664.md`

## Links
- Evidence: EVD-133
- Requirement: REQ-331
- Unit (Act): UNIT-661
- Unit (Verify): UNIT-664
- Status: completed
- Change: UPDATE
