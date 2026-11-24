# UNIT-713 — Verify: focusChange and menuClose events deliver payloads

## Summary
Unit tests for the two new events

## Description
Extend the event bus unit tests so both new events are delivered to subscribers and can be unsubscribed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserEvents.test.ts` · `describe('phaserToReact keyboard events')` · after last test in file
- **Do:** Add test 'delivers focusChange': subscribe a vi.fn() with phaserToReact.on('focusChange', h), emit {id:'bookshelf'}, assert h toHaveBeenCalledWith({id:'bookshelf'}). Add test 'menuClose unsubscribes': subscribe h, emit {} once, call the returned unsubscribe, emit again, assert h toHaveBeenCalledTimes(1).
- **Run:** `cd game/frontend && npx vitest run tests/phaserEvents.test.ts`
- **Expected:** Both new tests pass.

## Acceptance criteria
- focusChange payload reaches the handler.
- menuClose reaches the handler once and not after unsubscribe.

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-713.md`

## Links
- Evidence: EVD-143
- Requirement: REQ-355
- Unit (Act): UNIT-710
- Unit (Verify): UNIT-713
- Status: completed
- Change: UPDATE
