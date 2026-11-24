# UNIT-043 — Verify: App intro gate unit tests

## Summary
Unit tests for App showing the intro first and dismissing it

## Description
Write game/frontend/tests/app.test.tsx covering the intro gate with jsdom and the real components; localStorage is jsdom's and is cleared by tests/setup.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/app.test.tsx` · `new: App intro gate` · new
- **Do:** Create the file with '// @vitest-environment jsdom', imports of render/screen/fireEvent/cleanup from @testing-library/react and App from '../src/App'. Add describe('App intro gate') with afterEach(cleanup) and test 'Given a fresh render, then the intro and Begin button show and no hotspot exists': render(<App />), assert screen.getByText('What should I do?') and screen.getByRole('button',{name:'Begin'}) are in the document and screen.queryByRole('button',{name:'Bed'}) is null.
- **Run:** `cd game/frontend && npx vitest run tests/app.test.tsx -t 'intro gate'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/app.test.tsx` · `test: Begin dismisses intro` · after the first test
- **Do:** Add test 'Given Begin is clicked, then the intro is removed': render(<App />), fireEvent.click(screen.getByRole('button',{name:'Begin'})), assert screen.queryByText('What should I do?') is null.
- **Run:** `cd game/frontend && npx vitest run tests/app.test.tsx -t 'intro is removed'`
- **Expected:** Test passes

## Acceptance criteria
- Given fresh render, the intro text and Begin button show with no hotspots
- Given Begin clicked, the intro is gone

## Definition of done
- Intro gate tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-043.md`

## Links
- Evidence: EVD-008
- Requirement: REQ-021
- Unit (Act): UNIT-041
- Unit (Verify): UNIT-043
- Status: completed
- Change: UPDATE
