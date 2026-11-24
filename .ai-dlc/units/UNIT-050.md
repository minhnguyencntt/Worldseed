# UNIT-050 — Verify: Hotspot click opens the action menu unit tests

## Summary
Unit tests for hotspot-to-menu flow with mocked storage

## Description
Write tests/appFlow.test.tsx with an in-memory mock of runtime/storage and assert the menu flow.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appFlow.test.tsx` · `new: storage mock + describe('App flow: action menu')` · new
- **Do:** Create the file with '// @vitest-environment jsdom', and vi.mock('../src/runtime/storage') factory whose readSaved returns a module-level `saved` variable (initially null) and writeSaved assigns `saved = state` and returns true; add beforeEach resetting saved to null and afterEach(cleanup). Add helper begin() that renders <App/> and clicks the Begin button.

```
let saved: unknown = null;
vi.mock('../src/runtime/storage', () => ({ readSaved: () => saved, writeSaved: (s: unknown) => { saved = s; return true; } }));
```

- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx -t 'action menu'`
- **Expected:** File is collected with the mock active.

### Step 2 — `game/frontend/tests/appFlow.test.tsx` · `it('opens the Bookshelf menu on hotspot click')` · new
- **Do:** Call begin(); assert screen.queryByRole('region',{name:'Bookshelf'}) is null; click button 'Bookshelf'; assert the region named 'Bookshelf' has attribute data-object-id='bookshelf' and within it buttons Inspect, Push, Search, Leave exist.
- **Run:** `cd game/frontend && npx vitest run tests/appFlow.test.tsx -t 'action menu'`
- **Expected:** Test passes.

## Acceptance criteria
- Given Begin clicked, when Bookshelf clicked, then region Bookshelf has data-object-id bookshelf and four action buttons
- Given Begin clicked and nothing selected, then no region named Bookshelf exists

## Definition of done
- Tests pass with the command below
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-050.md`

## Links
- Evidence: EVD-010
- Requirement: REQ-024
- Unit (Act): UNIT-047
- Unit (Verify): UNIT-050
- Status: completed
- Change: UPDATE
