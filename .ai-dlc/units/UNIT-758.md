# UNIT-758 — Verify: transitionTo unsubscribe is stored and restart yields one handler

## Summary
Unit tests for single fade after create and after restart

## Description
Add tests with Phaser mocked, copying the vi.mock setup from tests/bootSceneTransition.test.ts (camera with fadeOut and once spies, scene.start spy).

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransitionStore.test.ts` · `new: describe('BootScene transitionTo subscription handle')` · new
- **Do:** Create the file reusing the phaser and content vi.mock blocks from bootSceneTransition.test.ts; in beforeEach call reactToPhaser.clear(), set useGameStore state with createInitialState, then new BootScene().create()
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionStore.test.ts`
- **Expected:** File loads with the mocks

### Step 2 — `game/frontend/tests/bootSceneTransitionStore.test.ts` · `it('fades out exactly once per transitionTo after create')` · new
- **Do:** Emit reactToPhaser.emit('transitionTo', { sceneId: 'library' }) once and assert boot.cameras.main.fadeOut toHaveBeenCalledTimes(1)
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionStore.test.ts -t 'exactly once per transitionTo'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/bootSceneTransitionStore.test.ts` · `it('fades out once on the new scene after shutdown and re-create')` · new
- **Do:** Run the SHUTDOWN callback found in boot.events.once.mock.calls (name 'shutdown'), create a second BootScene and call create(), emit transitionTo { sceneId: 'library' } once, assert the second scene's fadeOut was called once and the first scene's fadeOut was not called again
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionStore.test.ts -t 're-create'`
- **Expected:** Test passes: no duplicate handler

## Acceptance criteria
- One emit after create gives one fadeOut
- One emit after shutdown plus re-create gives one fadeOut on the new scene

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-758.md`

## Links
- Evidence: EVD-154
- Requirement: REQ-378
- Unit (Act): UNIT-756
- Unit (Verify): UNIT-758
- Status: completed
- Change: UPDATE
