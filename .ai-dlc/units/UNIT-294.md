# UNIT-294 — Verify: Drawer and modal store unit tests

## Summary
Unit tests for drawer and modal state.

## Description
Write tests/uiStore.test.ts cases for drawer and modal behavior using useUiStore.setState reset between tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStore.test.ts` · `new: describe('useUiStore drawer and modal')` · new
- **Do:** Create the file; beforeEach resets via useUiStore.setState({ drawerOpen: false, activeModal: null }). Tests: defaults are false/null; toggleDrawer twice gives true then false; openModal('contribution') then closeModal() gives 'contribution' then null; setDrawerOpen(true) sets true.
- **Run:** `cd game/frontend && npx vitest run tests/uiStore.test.ts`
- **Expected:** All drawer and modal tests pass

## Acceptance criteria
- Given a reset store, When toggleDrawer runs twice, Then drawerOpen is true then false
- Given a reset store, When openModal then closeModal run, Then activeModal is 'contribution' then null

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-294.md`

## Links
- Evidence: EVD-058
- Requirement: REQ-146
- Unit (Act): UNIT-292
- Unit (Verify): UNIT-294
- Status: completed
- Change: UPDATE
