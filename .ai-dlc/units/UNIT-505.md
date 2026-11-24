# UNIT-505 — Verify: BootScene preload and fallback unit tests

## Summary
Unit tests for BootScene preload with Phaser mocked

## Description
Extend the Phaser mock like game/frontend/tests/bootSceneEffects.test.ts with load.image, load.spritesheet and load.on fakes; mock @game/engine/preload planPreload.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScenePreload.test.ts` · `new: preload queues planned entries` · new
- **Do:** Mock planPreload to return one image entry and one spritesheet entry; call new BootScene().preload() with fake load; assert load.image and load.spritesheet called with the entry ids and '/assets/' urls.
- **Run:** `cd game/frontend && npx vitest run tests/bootScenePreload.test.ts -t queues`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/bootScenePreload.test.ts` · `new: loaderror records failed key` · new
- **Do:** Capture the handler passed to load.on('loaderror'), invoke it with {key:'a'}, and assert the scene marks 'a' failed and that create() generates the fallback texture.
- **Run:** `cd game/frontend && npx vitest run tests/bootScenePreload.test.ts -t loaderror`
- **Expected:** Test passes

## Acceptance criteria
- preload test asserts load.image and load.spritesheet are called for planned entries
- loaderror test asserts the key is recorded and the fallback texture is generated

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-505.md`

## Links
- Evidence: EVD-101
- Requirement: REQ-252
- Unit (Act): UNIT-503
- Unit (Verify): UNIT-505
- Status: approved
- Change: UPDATE
