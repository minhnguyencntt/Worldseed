# UNIT-357 — Verify: Object and world schema unit tests

## Summary
Unit tests for content schema

## Description
Prove R1 acceptance criteria with unit tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/contentSchema.test.ts` · `new: describe('objectSchema')` · new
- **Do:** Add tests: (1) full valid object with layer 'furniture', position {x:620,y:350}, scale 2, interactionBounds {x:0,y:0,width:32,height:64}, visibleWhen [{flag:'a'}], persistentState {flag:'a'} -> parseWorldContent('scene', scene wrapping it).ok true; (2) layer 'sky' -> ok false and an error path ending in 'layer'; (3) no position -> error path ending in 'position'; (4) scale omitted -> data.objects[0].scale === 1.
- **Run:** `cd game && npx vitest run tests/contentSchema.test.ts`
- **Expected:** All four tests pass

## Acceptance criteria
- Valid object passes
- Invalid layer and missing position produce path-named errors
- scale defaults to 1

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-357.md`

## Links
- Evidence: EVD-070
- Requirement: REQ-177
- Unit (Act): UNIT-354
- Unit (Verify): UNIT-357
- Status: completed
- Change: UPDATE
