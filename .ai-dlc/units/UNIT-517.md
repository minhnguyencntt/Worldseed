# UNIT-517 — Verify: preload.test.ts BootScene planner and fallback unit tests

## Summary
Add BootScene cases with phaser and content mocked

## Description
Extend game/tests/preload.test.ts with a BootScene block mirroring the mocking pattern in game/frontend/tests/bootScenePreload.test.ts (the BootScene.preload and resolveKey contract in game/frontend/src/phaser/BootScene.ts).

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preload.test.ts` · `new: BootScene mocks` · top of file, before imports of BootScene
- **Do:** Add vi.mock('phaser') returning default { Scene: class { events = { once: vi.fn() } }, Scenes: { Events: { SHUTDOWN: 'shutdown' } } } and vi.mock('../frontend/src/runtime/content') returning a scene with objects asset 'objects/bed' and 'objects/ghost' and a manifest declaring only 'objects/bed' (path 'worlds/the-boys-room/furniture/bed.svg', type 'image'). Import BootScene from '../frontend/src/phaser/BootScene'.
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t 'BootScene'`
- **Expected:** BootScene imports under node env without real Phaser

### Step 2 — `game/tests/preload.test.ts` · `new: describe('BootScene uses planner and fallback')` · after resolver describe
- **Do:** Build a BootScene, stub boot.load = { image: vi.fn(), on: vi.fn() } and boot.make = { graphics } returning a chainable fake with generateTexture and destroy as vi.fn(); spy console.warn. Call preload() and assert image called once with ('objects/bed','assets/worlds/the-boys-room/furniture/bed.svg'), warn called with 'unknown asset ref: objects/ghost', generateTexture called with ('fallback:missing',8,8). Assert resolveKey('objects/ghost') and resolveKey('nope') equal 'fallback:missing' and resolveKey('objects/bed') equals 'objects/bed'.
- **Run:** `cd game && npx vitest run tests/preload.test.ts`
- **Expected:** All BootScene assertions pass

## Acceptance criteria
- Only the known referenced asset is loaded
- Unknown ref triggers console.warn
- Fallback key used for unknown or failed ids

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-517.md`

## Links
- Evidence: EVD-104
- Requirement: REQ-258
- Unit (Act): UNIT-515
- Unit (Verify): UNIT-517
- Status: approved
- Change: UPDATE
