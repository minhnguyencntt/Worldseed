# UNIT-849 — Verify: Event log and App-fed StoryPanel unit tests

## Summary
Unit tests for the log region and App passing game state.

## Description
Test log markup and that App feeds the panel with real store state with PhaserHost and API mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/storyPanelLog.test.tsx` · `new: StoryPanel event log` · new
- **Do:** Render StoryPanel with history ['a','b'] and assert Story history items read a, b in order within the Event log region; with [] assert text 'Nothing has happened yet' and no Story history list.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelLog.test.tsx`
- **Expected:** Log tests pass.

### Step 2 — `game/frontend/tests/frameKit.test.tsx` · `story panel frame assertions` · L95-L end
- **Do:** Update assertions to expect sf-frame-panel on root, sf-frame-plaque on the Event log region and sf-frame-slot on inventory slots, and assert root className contains neither bg-stone-900 nor border-amber-900.
- **Run:** `cd game/frontend && npx vitest run tests/frameKit.test.tsx`
- **Expected:** frameKit tests pass.

### Step 3 — `game/frontend/tests/appFlow.test.tsx` · `App playing view` · existing playing-view test
- **Do:** After clicking Begin with vi.mock of ../src/components/PhaserHost and ../src/api/client (getCurrentRound resolved with the Round type fixture from the client types), assert the Event log region, Inventory region with six slots and Dialogue region exist.
- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx`
- **Expected:** App flow test passes with the rebuilt panel.

## Acceptance criteria
- Log order and empty message asserted
- App renders panel with state history and inventory

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-849.md`

## Links
- Evidence: EVD-170
- Requirement: REQ-424
- Unit (Act): UNIT-846
- Unit (Verify): UNIT-849
- Status: completed
- Change: UPDATE
