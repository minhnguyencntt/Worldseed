# UNIT-864 — Verify: interact animation emitted on an action unit tests

## Summary
Test App emits playAnimation on action

## Description
Render App with Phaser mocked, spy on reactToPhaser.emit.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appInteract.test.tsx` · `new: App emits playAnimation on action` · new
- **Do:** Copy the mock header of tests/appObjectClick.test.tsx; vi.spyOn(reactToPhaser,'emit'); render App, click Begin, emit phaserToReact objectClick for 'bookshelf' inside act(), click the Inspect button, assert emit was called with 'playAnimation', { target: 'boy', name: 'interact' }.
- **Run:** `cd game/frontend && npx vitest run tests/appInteract.test.tsx`
- **Expected:** Spy assertion passes

## Acceptance criteria
- Given a selected bookshelf, when Inspect is clicked, then playAnimation boy interact is emitted once
- Given the action, when clicked, then the story history grows

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-864.md`

## Links
- Evidence: EVD-172
- Requirement: REQ-430
- Unit (Act): UNIT-859
- Unit (Verify): UNIT-864
- Status: completed
- Change: UPDATE
