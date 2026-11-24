# UNIT-612 — Verify: Second NPC spawn and idle animation unit tests

## Summary
Unit tests for manifest idle resolution and BootScene NPC spawn

## Description
Write game/tests/npcIdle.test.ts for the resolver and game/frontend/tests/bootSceneNpc.test.ts for spawn, mocking Phaser and content like bootSceneCharacters.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/npcIdle.test.ts` · `new: resolves NPC idle from manifest` · new
- **Do:** Create an in-memory manifest with a character:npc spritesheet defining idle, a CharacterSpec with idle ref character:npc/idle, call resolveCharacterAnimation(spec,'idle',manifest) and characterAnimationKey on the result; assert asset character:npc and key 'character:npc:idle'.
- **Run:** `cd game && npx vitest run tests/npcIdle.test.ts`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/bootSceneNpc.test.ts` · `new: spawns second NPC` · new
- **Do:** Copy the vi.mock('phaser') and vi.mock('../src/runtime/content') setup from bootSceneCharacters.test.ts, add npc to world.characters, scene.characters and manifest; call new BootScene().create() and assert add.sprite called twice and the second sprite's play was called with 'character:npc:idle'.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneNpc.test.ts`
- **Expected:** Test passes: two sprites, NPC idle key played

## Acceptance criteria
- Resolver returns character:npc idle
- BootScene creates two sprites and NPC plays character:npc:idle

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-612.md`

## Links
- Evidence: EVD-123
- Requirement: REQ-305
- Unit (Act): UNIT-609
- Unit (Verify): UNIT-612
- Status: approved
- Change: UPDATE
