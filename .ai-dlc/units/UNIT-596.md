# UNIT-596 — Verify: characterClick event type unit tests

## Summary
Unit-test delivery of the typed characterClick event on the bus.

## Description
Add tests to the existing phaserEvents suite proving characterClick delivery and isolation from objectClick.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserEvents.test.ts` · `new: it('delivers characterClick payload once and not to objectClick handlers')` · after L30
- **Do:** Add a test subscribing vi.fn() handlers to phaserToReact 'characterClick' and 'objectClick', emit characterClick with { id: 'boy' }, assert characterClick handler called once with { id: 'boy' } and objectClick handler not called; then unsubscribe and call phaserToReact.clear().
- **Run:** `cd game/frontend && npx vitest run tests/phaserEvents.test.ts`
- **Expected:** phaserEvents suite passes including the new characterClick test.

## Acceptance criteria
- Given a characterClick handler, When emitted with { id: 'boy' }, Then it is called once with that payload.
- Given an objectClick handler, When characterClick is emitted, Then the objectClick handler is not called.

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-596.md`

## Links
- Evidence: EVD-119
- Requirement: REQ-297
- Unit (Act): UNIT-594
- Unit (Verify): UNIT-596
- Status: completed
- Change: UPDATE
