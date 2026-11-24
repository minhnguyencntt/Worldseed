# UNIT-146 — Verify: AdminApp execution action error display unit tests

## Summary
Mocked-fetch tests for actionError, 401 and clearing.

## Description
Extend tests/adminActions.test.tsx with failure cases.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminActions.test.tsx` · `describe: AdminApp execution action errors` · new
- **Do:** Add tests using fixtures from tests/fixtures/api.ts: (1) retry endpoint returns 500 JSON {error:'boom'} and asserts the Execution region shows that message in role alert; (2) approve endpoint returns 401 and asserts the 'Admin token' field is shown again with 'Invalid token'; (3) first action fails then second succeeds and asserts the earlier message is gone; (4) fetch rejecting with a non-Error value asserts 'Request failed'.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx && npx tsc --noEmit`
- **Expected:** All tests pass and typecheck reports no errors.

## Acceptance criteria
- 500 message shown
- 401 returns to the token gate
- Old error cleared on new action

## Definition of done
- Tests and npm run typecheck pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-146.md`

## Links
- Evidence: EVD-031
- Requirement: REQ-073
- Unit (Act): UNIT-144
- Unit (Verify): UNIT-146
- Status: completed
- Change: NEW
