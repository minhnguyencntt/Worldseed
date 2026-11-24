# UNIT-493 — Verify: BootScene effect wiring and Phaser context unit tests

## Summary
Mocked Phaser tests for effect context and BootScene

## Description
Mock phaser and ../src/engine/buildEffects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneEffects.test.ts` · `new: BootScene effects tests` · new
- **Do:** vi.mock('phaser') as in bootScene.test.ts and vi.mock('@game/engine/buildEffects') returning handles with destroy vi.fn(); create BootScene, call create(); assert buildEffects called with the scene from ../src/runtime/content; capture the SHUTDOWN callback passed to events.once and invoke it; assert each handle destroy called
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** tests pass

### Step 2 — `game/frontend/tests/bootSceneEffects.test.ts` · `playTransition test` · new
- **Do:** Call createPhaserEffectContext with a fake scene {cameras:{main:{fadeIn:vi.fn()}},add:{rectangle,particles}} and assert playTransition(400) calls fadeIn(400) and createEffect for ambientLight calls add.rectangle with depth set
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts -t playTransition`
- **Expected:** test passes

## Acceptance criteria
- BootScene wiring and shutdown cleanup are asserted
- Phaser context fade and ambient light creation are asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-493.md`

## Links
- Evidence: EVD-098
- Requirement: REQ-246
- Unit (Act): UNIT-490
- Unit (Verify): UNIT-493
- Status: completed
- Change: UPDATE
