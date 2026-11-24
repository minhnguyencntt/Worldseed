# UNIT-307 — Verify: Drawer and modal store unit tests

## Summary
Unit tests for drawer and modal actions

## Description
Write unit tests that import the real useUiStore and assert drawer and modal state changes. Nothing from the store is mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreDrawerModal.test.ts` · `new: describe('uiStore drawer and modal')` · new
- **Do:** Import { useUiStore } from '../src/store/uiStore'. In beforeEach call useUiStore.setState(useUiStore.getInitialState(), true). Add test 'starts closed' asserting drawerOpen false and modal null. Add 'toggleDrawer flips' calling getState().toggleDrawer() twice and asserting true then false. Add 'openModal and closeModal' asserting modal 'contribution' then null.
- **Run:** `npx vitest run tests/uiStoreDrawerModal.test.ts`
- **Expected:** 3 tests pass

## Acceptance criteria
- Given a reset store, when toggleDrawer is called twice, then drawerOpen is true then false
- Given a reset store, when openModal('contribution') then closeModal are called, then modal is 'contribution' then null

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-307.md`

## Links
- Evidence: EVD-061
- Requirement: REQ-152
- Unit (Act): UNIT-304
- Unit (Verify): UNIT-307
- Status: completed
- Change: NEW
