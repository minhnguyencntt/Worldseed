# UNIT-630 — Verify: ContributionSheet dialog behavior unit tests

## Summary
Test Escape, labelling and closed state

## Description
Unit tests for the Radix-based sheet with fetch stubbed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionDialog.test.tsx` · `new: describe('ContributionSheet dialog')` · new
- **Do:** Add jsdom header and a stubFetch helper copied from tests/contribution.test.tsx returning 200 with []. Tests: (1) open with onClose=vi.fn(), fireEvent.keyDown(dialog,{key:'Escape'}), expect onClose called once; (2) getByRole('dialog') has accessible name 'Suggest What Happens Next' and description containing 'Ideas are considered when the Round closes.'; (3) open={false} gives queryByRole('dialog') null; (4) clicking the Close button calls onClose; (5) typing in Your idea and clicking Send still posts, proving flows are intact.
- **Run:** `cd game/frontend && npx vitest run tests/contributionDialog.test.tsx tests/contribution.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Given the sheet is open, when Escape is pressed, then onClose is called once
- Given the sheet is open, then the dialog has the title name, a description and a working Close button
- Given open is false, then no dialog is rendered

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-630.md`

## Links
- Evidence: EVD-126
- Requirement: REQ-314
- Unit (Act): UNIT-627
- Unit (Verify): UNIT-630
- Status: completed
- Change: UPDATE
