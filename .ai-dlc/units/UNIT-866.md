# UNIT-866 — Verify: empty and unknown scene transition ignored unit tests

## Summary
Test BootScene guard

## Description
With Phaser faked, emit transitionTo with '' and an unknown id.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransitionIgnore.test.ts` · `new: transitionTo ignored` · new
- **Do:** Create the scene as bootSceneTransition.test.ts does with scene.get returning null; call create(); reactToPhaser.emit('transitionTo',{sceneId:''}) then {sceneId:'nope'}; assert cameras.main.fadeOut and scene.start were never called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransitionIgnore.test.ts`
- **Expected:** Both ignored assertions pass

## Acceptance criteria
- Given '' emitted, then fadeOut and scene.start are not called
- Given an unknown id with scene.get returning null, then they are not called

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-866.md`

## Links
- Evidence: EVD-172
- Requirement: REQ-432
- Unit (Act): UNIT-861
- Unit (Verify): UNIT-866
- Status: completed
- Change: UPDATE
