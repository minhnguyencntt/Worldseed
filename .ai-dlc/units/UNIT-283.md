# UNIT-283 — Verify: UI store action unit tests

## Summary
Unit tests for every store action

## Description
Test the store with no mocks needed beyond resetting state.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStore.test.ts` · `new: describe('useUiStore')` · new
- **Do:** Add beforeEach that captures initial state via useUiStore.getState() and restores with setState(initial, true); add test 'initial state' asserting drawerOpen false, modal null, soundEnabled true, settingsOpen false
- **Run:** `npx vitest run tests/uiStore.test.ts -t 'initial state'`
- **Expected:** test passes

### Step 2 — `game/frontend/tests/uiStore.test.ts` · `it('toggles drawer and sets it')` · new
- **Do:** Call toggleDrawer twice asserting true then false; call setDrawerOpen(true) asserting true
- **Run:** `npx vitest run tests/uiStore.test.ts -t 'toggles drawer'`
- **Expected:** test passes

### Step 3 — `game/frontend/tests/uiStore.test.ts` · `it('modal, sound and settings actions')` · new
- **Do:** openModal('contribution') -> modal 'contribution'; closeModal -> null; toggleSound -> soundEnabled false; setSettingsOpen(true) -> settingsOpen true
- **Run:** `npx vitest run tests/uiStore.test.ts -t 'modal, sound'`
- **Expected:** test passes

## Acceptance criteria
- Every action asserted
- Initial state asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-283.md`

## Links
- Evidence: EVD-056
- Requirement: REQ-140
- Unit (Act): UNIT-279
- Unit (Verify): UNIT-283
- Status: completed
- Change: UPDATE
