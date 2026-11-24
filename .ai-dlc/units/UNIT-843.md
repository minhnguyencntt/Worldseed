# UNIT-843 — Verify: Header loading, error, retry, empty and icon control unit tests

## Summary
Unit tests cover each pill state and the icon controls.

## Description
New test file asserting REQ3 criteria with the real uiStore.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerKitStates.test.tsx` · `new: describe('HeaderOverlay pill states')` · new
- **Do:** Create tests: (1) render <HeaderOverlay worldTitle="W" loading />; expect getByTestId('round-pill') data-state loading, text Loading round…, queryByRole('timer') null. (2) render with error="Round service returned 500" and onRetry=vi.fn(); expect pill data-state error, getByRole('alert') text 'Round unavailable: Round service returned 500'; click button Retry; expect onRetry called once. (3) render with nothing; expect data-state empty and 'No active round'. (4) beforeEach useUiStore.setState({soundEnabled:true,settingsOpen:false}); render with roundFixture; within getByRole('group',{name:'Header controls'}) click Toggle sound and Settings; expect store soundEnabled false and settingsOpen true.
- **Run:** `cd game/frontend && npx vitest run tests/headerKitStates.test.tsx tests/headerOverlayStates.test.tsx tests/headerRetry.test.tsx tests/headerOverlayControls.test.tsx`
- **Expected:** New and existing header state tests pass.

## Acceptance criteria
- Loading, error, retry and empty pill state tests pass.
- The sound and settings icon test changes the real uiStore and passes.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-843.md`

## Links
- Evidence: EVD-169
- Requirement: REQ-421
- Unit (Act): UNIT-840
- Unit (Verify): UNIT-843
- Status: completed
- Change: UPDATE
