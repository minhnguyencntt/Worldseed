# UNIT-020 — Act: Implement state serialization with validation

## Summary
Add serializeState and deserializeState

## Description
Add persistence module over GameState.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/src/state/persistence.ts` · `new: serializeState` · new
- **Do:** Export serializeState(state:GameState):string returning JSON.stringify(state).
- **Expected:** Returns JSON text.

### Step 2 — `backend/game/src/state/persistence.ts` · `new: deserializeState` · new
- **Do:** Export deserializeState(json:string):GameState; JSON.parse it, throw Error('Invalid game state: <field>') unless currentScene is a string, inventory/discoveredObjects/completedQuests/history are arrays, flags and relationships are objects, and activeDialogue is string or null; return the parsed object.
- **Expected:** Valid input round-trips; invalid input throws.

## Acceptance criteria
- Given state, when round-tripped, then equal.
- Given invalid input, when parsed, then it throws.

## Definition of done
- Typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-020.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-004
- Requirement: REQ-012
- Unit (Act): UNIT-020
- Unit (Verify): UNIT-024
- Status: completed
- Change: UPDATE
