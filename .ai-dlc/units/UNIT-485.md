# UNIT-485 — Verify: Interaction helper unit tests

## Summary
Unit tests for interaction.ts

## Description
Write TDD unit tests from REQ1 acceptance criteria using inline ObjectSpec objects and the valid-world fixture state.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/interaction.test.ts` · `new: describe('pointInBounds')` · new
- **Do:** Add tests: spec with position (100,200), scale 2, bounds {0,0,40,80}; assert (110,210) true, (190,210) false (right edge excluded), (99,210) false; spec without interactionBounds returns false
- **Run:** `cd game && npx vitest run tests/interaction.test.ts -t pointInBounds`
- **Expected:** pointInBounds assertions pass

### Step 2 — `game/tests/interaction.test.ts` · `new: describe('availableActions')` · new
- **Do:** Build a spec from validScene.objects[0] (tests/fixtures/valid-world.ts) with two actions, one with conditions [{flag:'a'}]; with createInitialState assert only the unguarded action, after setFlag(state,'a',true) assert both in authored order
- **Run:** `cd game && npx vitest run tests/interaction.test.ts -t availableActions`
- **Expected:** Filtering follows state flags

### Step 3 — `game/tests/interaction.test.ts` · `new: describe('isActivationKey and nextFocusIndex')` · new
- **Do:** Assert isActivationKey('Enter') and (' ') true, ('a') false; nextFocusIndex(3,2,1)=0, (3,0,-1)=2, (0,0,1)=-1
- **Run:** `cd game && npx vitest run tests/interaction.test.ts -t 'isActivationKey'`
- **Expected:** All assertions pass

## Acceptance criteria
- Hit, miss and no-bounds cases pass
- Condition filtering, key and focus wrap cases pass

## Definition of done
- interaction.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-485.md`

## Links
- Evidence: EVD-097
- Requirement: REQ-241
- Unit (Act): UNIT-482
- Unit (Verify): UNIT-485
- Status: completed
- Change: UPDATE
