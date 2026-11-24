# UNIT-398 — Verify: Typed event bus delivery unit tests

## Summary
Unit tests for subscribe, unsubscribe, clear and no phaser import.

## Description
Test createEventBus from REQ2 criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserEvents.test.ts` · `new: event bus tests` · new
- **Do:** Add tests: (1) phaserToReact.on('objectClick', fn); emit('objectClick',{id:'bookshelf'}); expect fn toHaveBeenCalledWith({id:'bookshelf'}) once; (2) call the returned unsubscribe, emit again, expect still one call; (3) subscribe on reactToPhaser 'transitionTo', call clear(), emit, expect no call; (4) read src/phaser/events.ts with node:fs and assert it does not contain "from 'phaser'".
- **Run:** `cd game/frontend && npx vitest run tests/phaserEvents.test.ts`
- **Expected:** All four tests pass.

## Acceptance criteria
- Given emit objectClick, Then the listener gets the payload once.
- Given unsubscribe, Then no further calls.

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-398.md`

## Links
- Evidence: EVD-078
- Requirement: REQ-198
- Unit (Act): UNIT-395
- Unit (Verify): UNIT-398
- Status: completed
- Change: UPDATE
