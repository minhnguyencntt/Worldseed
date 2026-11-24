# UNIT-611 — Verify: Second NPC scene parses and validates unit tests

## Summary
Unit tests for schema and validateWorld acceptance of a second NPC

## Description
Write game/tests/npcSceneValid.test.ts with in-memory scene and world, no fs.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/npcSceneValid.test.ts` · `new: second NPC schema parses` · new
- **Do:** Build a scene object with characters boy and npc (position, scale 1, layer characters, idle animation ref character:npc/idle), call sceneSchema.safeParse and assert success true and data.characters length 2.
- **Run:** `cd game && npx vitest run tests/npcSceneValid.test.ts -t "schema parses"`
- **Expected:** Test passes: two characters parsed

### Step 2 — `game/tests/npcSceneValid.test.ts` · `new: validateWorld accepts second NPC` · new
- **Do:** Call validateWorld with world.characters [boy, npc] and the same scene cast to SceneDef inside scenes; assert result toEqual [].
- **Run:** `cd game && npx vitest run tests/npcSceneValid.test.ts -t "validateWorld accepts"`
- **Expected:** Test passes with empty error array

## Acceptance criteria
- sceneSchema accepts boy plus npc
- validateWorld returns []

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-611.md`

## Links
- Evidence: EVD-123
- Requirement: REQ-304
- Unit (Act): UNIT-608
- Unit (Verify): UNIT-611
- Status: approved
- Change: UPDATE
