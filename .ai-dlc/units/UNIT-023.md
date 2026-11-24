# UNIT-023 — Verify: Bedroom content validity unit tests

## Summary
Tests that the shipped content loads, validates and has required objects

## Description
Load the real content files with loadWorld and assert required structure.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/content.test.ts` · `new: bedroom content tests` · new
- **Do:** Add tests using loadWorld(resolve(__dirname,'../content/worlds/the-boys-room')): 'content has no reference errors' asserts validateWorld returns []; 'opening dialogue text' asserts the intro node text equals "I don't know what to do next. What should we do?" and speaker 'boy'; 'has required objects' asserts object ids include bed, bookshelf, desk, old-computer, window, door; 'bookshelf search sets flag' calls performAction on an initial state and asserts flags.secret_door_open true.
- **Run:** `cd backend/game && npx vitest run tests/content.test.ts`
- **Expected:** All four tests pass.

## Acceptance criteria
- Given shipped content, when validated, then no errors.
- Given the scene, then required objects and opening text exist.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-023.md`

## Links
- Evidence: EVD-004
- Requirement: REQ-011
- Unit (Act): UNIT-019
- Unit (Verify): UNIT-023
- Status: completed
- Change: UPDATE
