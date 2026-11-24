# UNIT-818 — Verify: Vite publicDir and BootScene PNG preload without fallback

## Summary
Unit tests for publicDir, preload calls, resolveKey and animation creation with Phaser mocked

## Description
Phaser is mocked as in bootScenePreload.test.ts; the real manifest and scene are used.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/viteConfig.test.ts` · `new: it('serves game/public')` · new
- **Do:** Import default config from '../vite.config' and expect config.publicDir (normalised slashes) to end with '/game/public'.
- **Run:** `cd game/frontend && npx vitest run tests/viteConfig.test.ts`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/bootScenePngPreload.test.ts` · `new: describe('BootScene PNG preload')` · new
- **Do:** Copy the phaser vi.mock and graphics helper from tests/bootScenePreload.test.ts but do not mock '../src/runtime/content'. Tests: (1) preload() calls load.image with ('room/wall', 'assets/worlds/the-boys-room/room/wall.png') and load.spritesheet with ('character:boy-sheet', 'assets/worlds/the-boys-room/characters/boy-sheet.png', {frameWidth:32, frameHeight:48}); (2) no load call path ends '.svg'; (3) for every asset id in planPreload(scene, manifest).load, scene.resolveKey(id) equals id, not FALLBACK_KEY; (4) with a mocked anims.create, ensureAnim for character:boy-sheet idle, walk, interact receives generateFrameNumbers frames arrays of length 4, 6 and 4 and repeat 0 for interact.
- **Run:** `cd game/frontend && npx vitest run tests/bootScenePngPreload.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- publicDir ends in game/public
- Preload loads PNG paths
- resolveKey never returns fallback
- Animation frames are 4, 6, 4

## Definition of done
- Both pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-818.md`

## Links
- Evidence: EVD-165
- Requirement: REQ-408
- Unit (Act): UNIT-814
- Unit (Verify): UNIT-818
- Status: completed
- Change: UPDATE
