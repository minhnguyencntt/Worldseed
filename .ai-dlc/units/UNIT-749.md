# UNIT-749 — Verify: playAnimation unsubscribe on shutdown unit tests

## Summary
Unit tests that shutdown releases the playAnimation subscription

## Description
Run the captured SHUTDOWN callback and assert later events are ignored.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScenePlayAnimationShutdown.test.ts` · `new: describe('BootScene playAnimation shutdown')` · new
- **Do:** Reuse the phaser/content mocks; call create(); take the callback passed to scene.events.once('shutdown', cb) and invoke it; record sprite.play call count; emit reactToPhaser 'playAnimation' {target:'boy', name:'interact'} and assert count unchanged; also assert a spy handler registered before create is unaffected.
- **Run:** `cd game/frontend && npx vitest run tests/bootScenePlayAnimationShutdown.test.ts`
- **Expected:** Tests pass; no play call after shutdown

## Acceptance criteria
- Handler is removed after shutdown
- play not called after shutdown

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-749.md`

## Links
- Evidence: EVD-151
- Requirement: REQ-374
- Unit (Act): UNIT-747
- Unit (Verify): UNIT-749
- Status: completed
- Change: UPDATE
