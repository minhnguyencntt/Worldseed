# UNIT-150 — Verify: No stale round or execution data after a 401 and token re-entry

## Summary
Unit test that the gate hides round and execution content after a 401.

## Description
Add tests to the adminActions test file with the same fetch stub and fixtures.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminActions.test.tsx` · `new: it 401 hides execution region` · after L205
- **Do:** With the approve action returning 401, click Approve and assert queryByRole('region',{name:'Execution'}) is null while the Admin token field is shown.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t "hides execution region"`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/adminActions.test.tsx` · `new: it re-entry reloads data` · after L205
- **Do:** After the 401, call enterToken('secret') and assert findByRole('region',{name:'Execution'}) appears and the number of fetch calls to the executions URL has increased.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t "re-entry reloads data"`
- **Expected:** Test passes.

## Acceptance criteria
- After a 401 no 'Execution' region is rendered.
- After re-entry the data is loaded again from the new responses.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-150.md`

## Links
- Evidence: EVD-032
- Requirement: REQ-075
- Unit (Act): UNIT-148
- Unit (Verify): UNIT-150
- Status: completed
- Change: UPDATE
