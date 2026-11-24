# UNIT-856 — Verify: keyboard flow and ARIA labels unit tests

## Summary
Unit tests for live region, labels, focus move and Escape.

## Description
Test the overlay a11y with the store seeded and the event bus spied.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/objectOverlayA11y.test.tsx` · `new: ObjectOverlay a11y tests` · new
- **Do:** jsdom test: render ObjectOverlay for 'bookshelf'; assert role=status text contains the content name and action labels; assert each button aria-label equals `${label} ${name}`; with focus flag assert document.activeElement is the first button; userEvent Tab moves to the second button; press Enter on a button and assert onAction spy called; press Escape and assert phaserToReact.emit spy called with ('menuClose',{}).
- **Run:** `cd game/frontend && npx vitest run tests/objectOverlayA11y.test.tsx`
- **Expected:** all a11y tests pass

## Acceptance criteria
- Live region, aria-labels, focus move and Escape asserted in one a11y test file
- Enter on an action button calls onAction and Escape emits menuClose

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-856.md`

## Links
- Evidence: EVD-171
- Requirement: REQ-427
- Unit (Act): UNIT-852
- Unit (Verify): UNIT-856
- Status: completed
- Change: UPDATE
