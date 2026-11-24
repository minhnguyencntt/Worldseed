# UNIT-755 — Verify: BootScene fades out and starts the scene on transitionTo unit tests

## Summary
Unit tests with Phaser mocked prove the transitionTo fade-out and scene start.

## Description
Write a new unit test file with a fake Phaser (modeled on game/frontend/tests/bootScenePlayAnimation.test.ts) whose cameras.main exposes fadeOut and once spies, whose scene exposes start, and which provides Cameras.Scene2D.Events.FADE_OUT_COMPLETE = 'camerafadeoutcomplete'. No browser or real Phaser is used.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransition.test.ts` · `new: vi.mock('phaser') fake scene` · new
- **Do:** Copy the phaser and content mocks from bootScenePlayAnimation.test.ts. Extend the fake Scene with cameras = { main: { fadeIn: vi.fn(), fadeOut: vi.fn(), once: vi.fn() } }, scene = { start: vi.fn() }, and add Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } } to the default export.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts -t 'fades the camera out'`
- **Expected:** BootScene can be constructed and create() runs against the fake.

### Step 2 — `game/frontend/tests/bootSceneTransition.test.ts` · `describe('BootScene transitionTo') beforeEach` · new
- **Do:** In beforeEach call reactToPhaser.clear(), build a BootScene, set up a store state as bootScenePlayAnimation.test.ts does, and call create().
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts -t 'fades the camera out'`
- **Expected:** Scene subscribed with a clean bus.

### Step 3 — `game/frontend/tests/bootSceneTransition.test.ts` · `it('fades the camera out on transitionTo')` · new
- **Do:** Emit reactToPhaser.emit('transitionTo', { sceneId: 'library' }); assert cameras.main.fadeOut toHaveBeenCalledTimes(1) and toHaveBeenCalledWith(TRANSITION_FADE_MS) imported from BootScene; assert scene.start not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts -t 'fades the camera out'`
- **Expected:** Test passes.

### Step 4 — `game/frontend/tests/bootSceneTransition.test.ts` · `it('starts the scene only after fade-out completes')` · new
- **Do:** Emit transitionTo { sceneId: 'library' }; read the callback from cameras.main.once.mock.calls where call[0] === 'camerafadeoutcomplete'; assert scene.start not called; invoke the callback; assert scene.start toHaveBeenCalledTimes(1) with 'library'.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts -t 'only after fade-out'`
- **Expected:** Test passes.

### Step 5 — `game/frontend/tests/bootSceneTransition.test.ts` · `it('does nothing without a transitionTo event')` · new
- **Do:** Without emitting, assert fadeOut and scene.start were not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts`
- **Expected:** All three tests pass.

## Acceptance criteria
- fadeOut is called once with TRANSITION_FADE_MS after transitionTo is emitted.
- scene.start is not called before the fade-out-complete callback runs and is called once with the sceneId afterwards.
- Nothing is called when transitionTo was not emitted.

## Definition of done
- Tests pass in seconds using only the named file
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-755.md`

## Links
- Evidence: EVD-153
- Requirement: REQ-377
- Unit (Act): UNIT-754
- Unit (Verify): UNIT-755
- Status: completed
- Change: NEW
