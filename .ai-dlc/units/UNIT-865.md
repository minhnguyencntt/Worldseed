# UNIT-865 — Verify: transitionTo emitted on scene change and fade on a valid scene unit tests

## Summary
Test App emission and BootScene fade

## Description
App test with a mocked performAction scene change; BootScene test for the fade of a registered scene.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appTransition.test.tsx` · `new: App emits transitionTo` · new
- **Do:** Use the mock header of appObjectClick.test.tsx; vi.mock('@game/engine/scene') keeping getSceneView real via importActual and replacing performAction to return {...prev, currentScene:'hallway'}; spy reactToPhaser.emit; click Inspect on bookshelf; assert emit called with 'transitionTo', { sceneId: 'hallway' }; add a second test where performAction returns prev and assert no transitionTo call.
- **Run:** `cd game/frontend && npx vitest run tests/appTransition.test.tsx`
- **Expected:** Both tests pass

### Step 2 — `game/frontend/tests/bootSceneTransition.test.ts` · `transitionTo fade test` · existing test
- **Do:** Make the fake scene expose scene.get returning an object for the requested id (add get: vi.fn(() => ({})) to the Object.assign scene stub) and keep the assertion that fadeOut is called with TRANSITION_FADE_MS and scene.start fires after the captured callback runs.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts`
- **Expected:** Fade on valid scene passes

## Acceptance criteria
- Given an action moving currentScene, when run, then transitionTo is emitted
- Given a registered scene id, when transitionTo arrives, then cameras.main.fadeOut runs and scene.start follows the FADE_OUT_COMPLETE callback

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-865.md`

## Links
- Evidence: EVD-172
- Requirement: REQ-431
- Unit (Act): UNIT-860
- Unit (Verify): UNIT-865
- Status: completed
- Change: UPDATE
