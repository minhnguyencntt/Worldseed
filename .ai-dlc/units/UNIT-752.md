# UNIT-752 — Verify: BootScene fades out and starts the scene on transitionTo unit tests

## Summary
Unit tests for transitionTo fade and scene start with Phaser mocked

## Description
Add a test file modelled on bootScenePlayAnimation.test.ts with Phaser mocked, asserting fadeOut and scene.start behavior.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransitionTo.test.ts` · `new: BootScene transitionTo` · new
- **Do:** Create the file with the phaser mock extended as described and a describe block with two tests. Test 1: after boot.create(), reactToPhaser.emit('transitionTo', { sceneId: 'library' }) and assert cameras.main.fadeOut toHaveBeenCalledTimes(1). Test 2: after the emit, take the callback registered via cameras.main.once for 'camerafadeoutcomplete', invoke it, and assert scene.start toHaveBeenCalledWith('library') and that it was not called before invoking.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionTo.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- fadeOut called with the duration when transitionTo emitted
- scene.start called with sceneId after FADE_OUT_COMPLETE

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-752.md`

## Links
- Evidence: EVD-152
- Requirement: REQ-375
- Unit (Act): UNIT-750
- Unit (Verify): UNIT-752
- Status: approved
- Change: UPDATE
