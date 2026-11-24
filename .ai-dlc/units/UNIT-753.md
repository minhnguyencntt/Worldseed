# UNIT-753 — Verify: transitionTo unsubscribe on shutdown unit tests

## Summary
Unit tests that transitionTo is ignored after SHUTDOWN and other subscribers stay active

## Description
Add a test file modelled on bootScenePlayAnimationShutdown.test.ts asserting no fade after shutdown.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransitionToShutdown.test.ts` · `new: BootScene transitionTo shutdown` · new
- **Do:** Create the file with the same mocks as bootSceneTransitionTo.test.ts. In beforeEach subscribe otherHandler via reactToPhaser.on('transitionTo') then boot.create(). Test 1: run the shutdown callback found in events.once mock calls, clear fadeOut mock, emit transitionTo { sceneId: 'library' }, assert fadeOut not called. Test 2: after shutdown, emit and assert otherHandler toHaveBeenCalledWith({ sceneId: 'library' }).
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionToShutdown.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- No fadeOut after the SHUTDOWN callback
- Pre-registered transitionTo subscriber still receives events

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-753.md`

## Links
- Evidence: EVD-152
- Requirement: REQ-376
- Unit (Act): UNIT-751
- Unit (Verify): UNIT-753
- Status: approved
- Change: UPDATE
