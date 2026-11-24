# UNIT-853 — Act: Delete ActionMenu and leftover hotspot-path styles

## Summary
Remove ActionMenu.tsx and any .action-menu CSS.

## Description
After ObjectOverlay replaced it, delete the unanchored ActionMenu component and remaining references.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ActionMenu.tsx` · `ActionMenu` · L1-L27
- **Do:** Delete the file; it is no longer imported by App.tsx after the ObjectOverlay swap.
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** no unresolved ActionMenu import

### Step 2 — `game/frontend/src/styles.css` · `.action-menu rules` · search
- **Do:** Remove any .action-menu and .actions selectors if present; leave Tailwind directives untouched.
- **Run:** `cd game/frontend && grep -n 'action-menu' src/styles.css`
- **Expected:** no matches

## Acceptance criteria
- ActionMenu.tsx is gone
- No import of ActionMenu remains

## Definition of done
- tsc passes without ActionMenu
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-853.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-171
- Requirement: REQ-428
- Unit (Act): UNIT-853
- Unit (Verify): UNIT-857
- Status: completed
- Change: UPDATE
