# UNIT-846 — Act: Render the framed event log and confirm App wiring

## Summary
Replace bare history list with framed scrolling log.

## Description
Rebuild the history section in StoryPanel and verify App passes real state.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel history section` · L30-L34
- **Do:** Wrap the history in <section className='sf-frame-plaque max-h-40 overflow-y-auto p-2' aria-label='Event log'> with h2 'Event log'; keep <ol aria-label='Story history'> mapping history to li; when history.length === 0 render <p>Nothing has happened yet</p> instead of the ol.
- **Expected:** Log region renders entries or the empty message.

### Step 2 — `game/frontend/src/App.tsx` · `App story prop` · L94-L102
- **Do:** Confirm StoryPanel receives game.state.history, game.state.inventory and game.choose unchanged; make no edit unless a prop differs from the StoryPanelProps contract.
- **Expected:** App wiring keeps passing real state.

## Acceptance criteria
- Log has sf-frame-plaque and max-h scroll
- Empty message shown
- No legacy stone/amber classes remain

## Definition of done
- Log renders from history
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-846.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-170
- Requirement: REQ-424
- Unit (Act): UNIT-846
- Unit (Verify): UNIT-849
- Status: completed
- Change: UPDATE
