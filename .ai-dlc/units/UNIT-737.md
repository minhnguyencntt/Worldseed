# UNIT-737 — Verify: Store changes after shutdown do not reach the scene unit tests

## Summary
Unit tests that the subscription is released on shutdown.

## Description
Add tests/bootSceneShutdownUnsubscribe.test.ts with the same mocks, asserting no scene calls after shutdown.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneShutdownUnsubscribe.test.ts` · `new: BootScene shutdown unsubscribe` · new
- **Do:** Reuse mocks from tests/bootSceneFocusClear.test.ts. Test 'ignores store changes after shutdown': boot.create(), invoke the 'shutdown' callback, vi.clearAllMocks on fake, call useGameStore.getState().setFocusedObject('bookshelf'); assert fake.focus and fake.sync not called. Test 'focus reset does not trigger sync': spy on boot.onStateChange via vi.spyOn, invoke shutdown, assert the spy was not called after the shutdown callback returned.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneShutdownUnsubscribe.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- After shutdown setFocusedObject does not call focus on objects.
- State updates after shutdown do not call sync.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-737.md`

## Links
- Evidence: EVD-148
- Requirement: REQ-368
- Unit (Act): UNIT-735
- Unit (Verify): UNIT-737
- Status: approved
- Change: UPDATE
