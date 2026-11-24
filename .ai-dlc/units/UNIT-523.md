# UNIT-523 — Verify: preload.test.ts BootScene planner and fallback unit tests

## Summary
BootScene preload and resolveKey tests with mocked Phaser

## Description
Add BootScene tests to game/tests/preload.test.ts mirroring the mocking pattern of game/frontend/tests/bootScenePreload.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preload.test.ts` · `new: vi.mock block` · top of file
- **Do:** Add vi.mock for 'phaser' (default Scene class with events={once:vi.fn()}, Scenes.Events.SHUTDOWN), for the frontend src/runtime/content (scene with objects/bed and objects/ghost, manifest with objects/bed and objects/desk), and stub modules for store/gameStore, phaser/events and phaser/effectContext
- **Run:** `cd game && npx vitest run tests/preload.test.ts`
- **Expected:** File loads without resolution errors

### Step 2 — `game/tests/preload.test.ts` · `new: describe('BootScene')` · after resolveTextureKey describe
- **Do:** Import BootScene and FALLBACK_KEY from ../frontend/src/phaser/BootScene; stub boot.load={image,on} and boot.make.graphics fake; test preload calls image once with ('objects/bed','assets/<manifest path>') and warns 'unknown asset ref: objects/ghost'; test resolveKey('nope') and a loaderror-failed id return FALLBACK_KEY
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t BootScene`
- **Expected:** BootScene tests pass

## Acceptance criteria
- Given known bed and unknown ghost refs, when preload runs, then load.image is called once for objects/bed and console.warn names objects/ghost
- Given unknown id, when resolveKey runs, then FALLBACK_KEY returned
- Given loaderror on a known id, when resolveKey runs, then FALLBACK_KEY returned

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-523.md`

## Links
- Evidence: EVD-105
- Requirement: REQ-261
- Unit (Act): UNIT-520
- Unit (Verify): UNIT-523
- Status: completed
- Change: NEW
