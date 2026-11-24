# UNIT-044 — Verify: App playing view unit tests

## Summary
Unit tests for hotspot, action and dialogue flow through App

## Description
Extend game/frontend/tests/app.test.tsx with tests for the playing view using the real useGame against jsdom localStorage (cleared by tests/setup.ts) and the bedroom.yaml content bundled by content.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/app.test.tsx` · `test: playing view renders` · after the intro tests
- **Do:** Add describe('App playing view') with afterEach(cleanup) and a helper begin() that renders <App /> and clicks the Begin button. Add test 'Given Begin clicked, then scene, hotspots, Story toggle and opening dialogue render': call begin(), assert screen.getByRole('img',{name:'Bedroom'}), screen.getByRole('button',{name:'Bookshelf'}), screen.getByRole('button',{name:'Story'}) and screen.getByText("I don't know what to do next. What should we do?") exist.
- **Run:** `cd game/frontend && npx vitest run tests/app.test.tsx -t 'opening dialogue render'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/app.test.tsx` · `test: hotspot opens action menu` · after previous test
- **Do:** Add test 'Given the game view, when Bookshelf is clicked, then Inspect, Push, Search and Leave buttons appear': begin(), fireEvent.click(getByRole('button',{name:'Bookshelf'})), assert getByRole('button',{name:'Inspect'}), 'Push', 'Search', 'Leave' exist.
- **Run:** `cd game/frontend && npx vitest run tests/app.test.tsx -t 'Search and Leave'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/app.test.tsx` · `test: search updates history and door` · after previous test
- **Do:** Add test 'Given Bookshelf menu, when Search is clicked, then history shows the hidden door text and the hotspot is open': begin(), click Bookshelf, click Search, assert screen.getByText('A hidden door swings open behind the books.') exists and the Bookshelf button has attribute data-open='true'.
- **Run:** `cd game/frontend && npx vitest run tests/app.test.tsx -t 'hidden door text'`
- **Expected:** Test passes

### Step 4 — `game/frontend/tests/app.test.tsx` · `test: dialogue choice recorded` · after previous test
- **Do:** Add test 'Given the opening dialogue, when Look around the room is clicked, then dialogue closes and history keeps the choice': begin(), the Choose button text count: click getByRole('button',{name:'Look around the room'}); then assert screen.queryByRole('button',{name:'Look around the room'}) is null and screen.getByRole('list',{name:'Story history'}) toHaveTextContent('Look around the room').
- **Run:** `cd game/frontend && npx vitest run tests/app.test.tsx`
- **Expected:** All app tests pass

## Acceptance criteria
- After Begin the scene, hotspots, toggle and opening dialogue render
- Hotspot click opens the action menu
- Search records history and opens the bookshelf
- Dialogue choice is recorded

## Definition of done
- All app tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-044.md`

## Links
- Evidence: EVD-008
- Requirement: REQ-022
- Unit (Act): UNIT-042
- Unit (Verify): UNIT-044
- Status: completed
- Change: UPDATE
