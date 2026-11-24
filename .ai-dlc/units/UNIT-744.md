# UNIT-744 — Verify: BootScene handles playAnimation and transitionTo unit tests

## Summary
Unit tests with Phaser mocked prove BootScene reacts to the React bus

## Description
Add a test file modelled on bootSceneCharacters.test.ts with the fake Phaser, emitting reactToPhaser events.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneReactEvents.test.ts` · `new: bootSceneReactEvents` · new
- **Do:** Create the file copying the vi.mock('phaser') fake, content mock and setup from bootSceneCharacters.test.ts (L1-L120). Add test 'playAnimation interact plays interact then idle': create BootScene, run create(), reactToPhaser.emit('playAnimation',{target:'boy',name:'interact'}), assert sprite.play was called with the interact key 'character:boy-interact:interact', invoke the captured ANIMATION_COMPLETE callback and assert play called with 'character:boy:idle'.
- **Run:** `npx vitest run tests/bootSceneReactEvents.test.ts -t playAnimation`
- **Expected:** playAnimation test passes

### Step 2 — `game/frontend/tests/bootSceneReactEvents.test.ts` · `transitionTo and shutdown tests` · new
- **Do:** Add test 'transitionTo replays the fade': emit reactToPhaser 'transitionTo' {sceneId:'bedroom'} and assert cameras.main.fadeIn was called twice (create plus event) with the transition durationMs. Add test 'ignores events after shutdown': invoke the SHUTDOWN callback captured from events.once, clear spies, emit both events, assert sprite.play and fadeIn were not called.
- **Run:** `npx vitest run tests/bootSceneReactEvents.test.ts`
- **Expected:** All three tests pass

## Acceptance criteria
- playAnimation interact plays the interact key then idle
- transitionTo calls cameras.main.fadeIn with the authored duration
- Events after SHUTDOWN do nothing

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-744.md`

## Links
- Evidence: EVD-150
- Requirement: REQ-371
- Unit (Act): UNIT-742
- Unit (Verify): UNIT-744
- Status: approved
- Change: UPDATE
