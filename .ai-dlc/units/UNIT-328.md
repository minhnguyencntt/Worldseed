# UNIT-328 — Verify: HeaderOverlay store-wired controls unit tests

## Summary
Unit tests for sound and settings against the real store

## Description
Write unit tests from REQ2 using the real uiStore.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerOverlayControls.test.tsx` · `new: HeaderOverlay controls` · new
- **Do:** Create describe 'HeaderOverlay controls' with beforeEach resetting the store. Test 'sound button toggles soundEnabled': render with roundFixture (from ./fixtures/api, mirroring Round in src/api/client.ts), click getByRole('button',{name:'Toggle sound'}), assert useUiStore.getState().soundEnabled false and aria-pressed 'false'. Test 'settings button opens settings': click getByRole('button',{name:'Settings'}), assert settingsOpen true.
- **Run:** `cd game/frontend && npx vitest run tests/headerOverlayControls.test.tsx`
- **Expected:** Both tests pass

## Acceptance criteria
- Clicks flip store flags
- Both control tests pass against the real store

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-328.md`

## Links
- Evidence: EVD-065
- Requirement: REQ-163
- Unit (Act): UNIT-325
- Unit (Verify): UNIT-328
- Status: completed
- Change: UPDATE
