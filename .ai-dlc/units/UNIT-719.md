# UNIT-719 — Verify: gameStore focus field and action unit tests

## Summary
Unit tests for the default and setter of focusedObjectId

## Description
Test the real store with no mocks; it has no external dependencies.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gameStoreFocus.test.ts` · `new: gameStore focus defaults and setter` · new
- **Do:** Create the file importing useGameStore. In beforeEach call useGameStore.setState({ focusedObjectId: null }). Add test 'defaults focusedObjectId to null' asserting getState().focusedObjectId is null. Add test 'setFocusedObject sets then clears' calling setFocusedObject('bookshelf') asserting 'bookshelf', then setFocusedObject(null) asserting null.
- **Run:** `cd game/frontend && npx vitest run tests/gameStoreFocus.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- Default is null
- Setter sets and clears the id

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-719.md`

## Links
- Evidence: EVD-144
- Requirement: REQ-358
- Unit (Act): UNIT-716
- Unit (Verify): UNIT-719
- Status: approved
- Change: UPDATE
