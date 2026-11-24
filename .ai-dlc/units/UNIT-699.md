# UNIT-699 — Verify: Escape, focus trap and focus restore unit tests

## Summary
New test file for keyboard and focus behaviour

## Description
Write game/frontend/tests/contributionSheetKeyboard.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionSheetKeyboard.test.tsx` · `new: describe('ContributionSheet keyboard and focus')` · new
- **Do:** Create the file with jsdom pragma, json/stubFetch helpers as in contributionDialog.test.tsx, and a Harness component holding open state with a trigger <button ref={ref}>Trigger</button>, an outside <button>Outside</button>, and <ContributionSheet open={open} onClose={() => setOpen(false)} roundId="round-1" returnFocusRef={ref} />.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetKeyboard.test.tsx`
- **Expected:** File collected

### Step 2 — `game/frontend/tests/contributionSheetKeyboard.test.tsx` · `it('Escape closes')` · new
- **Do:** Render ContributionSheet directly with onClose=vi.fn(); fireEvent.keyDown(getByRole('dialog'), {key:'Escape'}); waitFor onClose called once.
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetKeyboard.test.tsx -t Escape`
- **Expected:** Escape test passes

### Step 3 — `game/frontend/tests/contributionSheetKeyboard.test.tsx` · `it('focus trap pulls focus back inside')` · new
- **Do:** Render Harness open; call getByText('Outside').focus(); waitFor expect(getByRole('dialog').contains(document.activeElement)).toBe(true).
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetKeyboard.test.tsx -t trap`
- **Expected:** Focus trap test passes

### Step 4 — `game/frontend/tests/contributionSheetKeyboard.test.tsx` · `it('focus restores to trigger')` · new
- **Do:** Render Harness closed, focus Trigger, open it, click getByTestId('contribution-close'), waitFor expect(document.activeElement).toBe(trigger).
- **Run:** `cd game/frontend && npx vitest run tests/contributionSheetKeyboard.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Escape, trap and restore tests pass
- No real network is used

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-699.md`

## Links
- Evidence: EVD-140
- Requirement: REQ-349
- Unit (Act): UNIT-695
- Unit (Verify): UNIT-699
- Status: approved
- Change: UPDATE
