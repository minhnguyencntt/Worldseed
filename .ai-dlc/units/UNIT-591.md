# UNIT-591 — Verify: BootScene NPC spawn and characterClick unit tests

## Summary
Unit tests with Phaser mocked for multi-NPC spawn and click events.

## Description
Extend the Phaser-mocked character suite with a second NPC that has an interaction.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneCharacters.test.ts` · `vi.mock('../src/runtime/content') scene fixture` · L69-L88
- **Do:** Append a second character to scene.characters: id 'shopkeeper', position {x:60,y:120}, scale 1, layer 'characters', animations.idle reusing {asset:'character:boy',animation:'idle'}, interaction {dialogue:'greet',events:[]}; add {id:'shopkeeper',name:'Shopkeeper'} to world.characters.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts -t 'spawns one sprite'`
- **Expected:** Fixture has a boy without interaction and an NPC with interaction.

### Step 2 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: it('spawns one sprite per scene character')` · after the last it
- **Do:** Create BootScene, call create(), assert add.sprite was called twice with first two args (150,140) and (60,120), and play was called on both sprites.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts -t 'spawns one sprite'`
- **Expected:** Test passes.

### Step 3 — `game/frontend/tests/bootSceneCharacters.test.ts` · `new: it('emits characterClick only for NPCs with interaction')` · after the previous it
- **Do:** Subscribe with phaserToReact.on('characterClick', spy). Using pointerDownOn(sprite) invoke the shopkeeper listener and assert spy called once with {id:'shopkeeper',dialogue:'greet'}; invoke the boy listener and assert spy still called once.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneCharacters.test.ts -t 'emits characterClick'`
- **Expected:** Test passes.

## Acceptance criteria
- Two sprites spawn at their positions and idle.
- characterClick emitted only for NPCs with interaction.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-591.md`

## Links
- Evidence: EVD-117
- Requirement: REQ-295
- Unit (Act): UNIT-588
- Unit (Verify): UNIT-591
- Status: approved
- Change: UPDATE
