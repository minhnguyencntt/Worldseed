# UNIT-051 — Verify: Action and choice update the story unit tests

## Summary
Unit tests for action and dialogue choice updating story

## Description
Add tests in tests/appFlow.test.tsx for Search and dialogue choice flows with mocked storage.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appFlow.test.tsx` · `it('Search adds the hidden door text to the story history')` · after the action menu describe
- **Do:** Call begin(); click 'Bookshelf' then 'Search'; assert getByRole('list',{name:'Story history'}) toHaveTextContent('A hidden door swings open behind the books.').
- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx -t 'story'`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/appFlow.test.tsx` · `it('choosing a dialogue option closes the dialogue and records it')` · after the Search test
- **Do:** Call begin(); assert region 'Dialogue' exists; click button 'Look around the room'; assert queryByRole('region',{name:'Dialogue'}) is null and the Story history list toHaveTextContent('Look around the room').
- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx -t 'story'`
- **Expected:** Test passes.

## Acceptance criteria
- Given Bookshelf menu, when Search clicked, then Story history list has the hidden door text
- Given opening dialogue, when Look around the room clicked, then region Dialogue is gone and history has the text

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-051.md`

## Links
- Evidence: EVD-010
- Requirement: REQ-025
- Unit (Act): UNIT-048
- Unit (Verify): UNIT-051
- Status: completed
- Change: UPDATE
