# UNIT-759 — Verify: transitionTo ignored after SHUTDOWN while other subscribers stay active

## Summary
Unit tests for the SHUTDOWN release of transitionTo

## Description
Mirror tests/bootScenePlayAnimationShutdown.test.ts for transitionTo with Phaser mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransitionShutdown.test.ts` · `new: describe('BootScene transitionTo shutdown')` · new
- **Do:** Create the file with the phaser mock from bootSceneTransition.test.ts; subscribe otherHandler = vi.fn() via reactToPhaser.on('transitionTo', ...) before new BootScene().create(); add a runShutdown helper that finds the 'shutdown' callback in boot.events.once.mock.calls and calls it
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionShutdown.test.ts`
- **Expected:** File loads

### Step 2 — `game/frontend/tests/bootSceneTransitionShutdown.test.ts` · `it('ignores transitionTo after the SHUTDOWN callback runs')` · new
- **Do:** Call runShutdown(), emit transitionTo { sceneId: 'library' }, assert fadeOut and scene.start were not called
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionShutdown.test.ts -t 'ignores transitionTo'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/bootSceneTransitionShutdown.test.ts` · `it('keeps other transitionTo subscribers active after shutdown')` · new
- **Do:** Call runShutdown(), emit transitionTo with payload { sceneId: 'library' }, assert otherHandler toHaveBeenCalledWith(payload) and fadeOut not called
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionShutdown.test.ts -t 'other transitionTo subscribers'`
- **Expected:** Test passes

## Acceptance criteria
- No fadeOut or scene.start after shutdown
- A pre-existing subscriber still receives transitionTo

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-759.md`

## Links
- Evidence: EVD-154
- Requirement: REQ-379
- Unit (Act): UNIT-757
- Unit (Verify): UNIT-759
- Status: completed
- Change: UPDATE
