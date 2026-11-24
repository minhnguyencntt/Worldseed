# UNIT-708 — Verify: highlightObject focuses scene objects and unsubscribes on shutdown

## Summary
Unit tests for BootScene highlightObject handling

## Description
Fake scene objects with focus/blur spies and mocked Phaser.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneHighlight.test.ts` · `new: describe('BootScene highlightObject')` · new
- **Do:** Reuse mocks from bootSceneSync.test.ts; buildScene returns two fakes with spec ids 'bookshelf' and 'door', each with focus, blur, sync, destroy, onInteract, onHover spies. After boot.create(), emit reactToPhaser highlightObject {id:'door'} and assert door.focus and bookshelf.blur called; emit {id:null} and assert both blur called; run the SHUTDOWN callback from boot.events.once mock, clear spies, emit again and assert no focus/blur calls.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneHighlight.test.ts`
- **Expected:** All three assertions groups pass

## Acceptance criteria
- Focus and blur by id
- Null clears all
- No effect after shutdown

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-708.md`

## Links
- Evidence: EVD-142
- Requirement: REQ-353
- Unit (Act): UNIT-705
- Unit (Verify): UNIT-708
- Status: approved
- Change: UPDATE
