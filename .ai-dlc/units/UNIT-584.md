# UNIT-584 — Verify: Object action state transition and inventory unit tests

## Summary
Actions change flags and inventory

## Description
Test performAction on all five key objects with the real scene.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/objectActions.test.ts` · `new: describe contextual actions` · new
- **Do:** From createInitialState: performAction(bed,search) -> inventory ['old-key']; repeating keeps one item; (old-computer,search) -> flags.computer_on true; (window,inspect) -> flags.window_seen true; (bookshelf,search) -> flags.secret_door_open true; (door,leave) on fresh state returns identical state, after bed search sets flags.door_unlocked true.
- **Run:** `cd game/frontend && npx vitest run tests/objectActions.test.ts`
- **Expected:** All pass

## Acceptance criteria
- Bed adds old-key
- Computer, window and bookshelf set flags
- Door gated by old-key

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-584.md`

## Links
- Evidence: EVD-116
- Requirement: REQ-291
- Unit (Act): UNIT-580
- Unit (Verify): UNIT-584
- Status: completed
- Change: UPDATE
