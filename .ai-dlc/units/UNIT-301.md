# UNIT-301 — Verify: Drawer and modal store unit tests

## Summary
Unit tests for drawer and modal state.

## Description
Test drawer and modal defaults and actions on useUiStore.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreDrawerModal.test.ts` · `new: describe('uiStore drawer and modal')` · new
- **Do:** Create tests: 'defaults' asserts drawerOpen false and modal null; 'toggleDrawer' calls useUiStore.getState().toggleDrawer() twice asserting true then false; 'openModal/closeModal' asserts modal 'contribution' then null. Capture initial state in beforeEach via useUiStore.getState and restore with setState.
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreDrawerModal.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Defaults asserted
- Actions asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-301.md`

## Links
- Evidence: EVD-060
- Requirement: REQ-149
- Unit (Act): UNIT-298
- Unit (Verify): UNIT-301
- Status: completed
- Change: NEW
