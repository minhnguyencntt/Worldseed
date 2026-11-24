# UNIT-613 — Verify: Invalid NPC reference rejected unit tests

## Summary
Unit tests that validateWorld rejects an unknown NPC id

## Description
Write game/tests/npcSceneInvalid.test.ts using in-memory data.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/npcSceneInvalid.test.ts` · `new: rejects unknown NPC id` · new
- **Do:** Build a world listing only boy and a scene with characters boy and ghost; call validateWorld and assert toEqual ['scenes[bedroom].characters[1].id: unknown character ghost'].
- **Run:** `cd game && npx vitest run tests/npcSceneInvalid.test.ts`
- **Expected:** Test passes with exactly one error

## Acceptance criteria
- Unknown ghost NPC yields exact path-tagged error
- Valid first NPC adds no error

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-613.md`

## Links
- Evidence: EVD-123
- Requirement: REQ-306
- Unit (Act): UNIT-610
- Unit (Verify): UNIT-613
- Status: approved
- Change: UPDATE
