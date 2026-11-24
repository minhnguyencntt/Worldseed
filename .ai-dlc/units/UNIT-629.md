# UNIT-629 — Verify: Dialog wrapper unit tests

## Summary
Test ui/dialog.tsx parts

## Description
Unit tests for the wrapper using testing-library in jsdom.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/dialogUi.test.tsx` · `new: describe('Dialog wrapper')` · new
- **Do:** Start with // @vitest-environment jsdom. Render <Dialog open><DialogContent className='x-test'><DialogTitle>T</DialogTitle><DialogDescription>D</DialogDescription></DialogContent></Dialog>. Add three tests: getByRole('dialog') exists; the dialog has accessible name 'T' (toHaveAccessibleName) and description 'D' (toHaveAccessibleDescription); the dialog element has class x-test.
- **Run:** `cd game/frontend && npx vitest run tests/dialogUi.test.tsx`
- **Expected:** 3 tests pass

## Acceptance criteria
- Given an open Dialog with title and description, then role dialog has the accessible name and description
- Given a className on DialogContent, then the dialog element carries that class

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-629.md`

## Links
- Evidence: EVD-126
- Requirement: REQ-313
- Unit (Act): UNIT-626
- Unit (Verify): UNIT-629
- Status: completed
- Change: UPDATE
