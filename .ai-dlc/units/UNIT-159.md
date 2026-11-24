# UNIT-159 — Verify: Create round duration request unit tests

## Summary
Unit tests that duration is sent and 401 returns to the gate

## Description
Test createRound and the Create round button with mocked fetch.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminCreateRound.test.tsx` · `new: Create round` · new
- **Do:** Create jsdom test file using the stubFetch pattern of tests/admin.test.tsx with roundFixture and worldFixture from tests/fixtures/api.ts (backend contract: createRoundRequest in backend/internal/admin/rounds.go). Test 1: enter token secret, change Duration (hours) to 12, click Create round, find the POST to /api/v1/admin/rounds, assert method POST, Bearer secret, JSON body equals {world_id:'the-boys-room', duration:'12h'}. Test 2: the create POST returns 401 json; assert the Admin token input is shown again.
- **Run:** `cd game/frontend && npx vitest run tests/adminCreateRound.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Body has world_id and duration 12h.
- 401 returns to token gate.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-159.md`

## Links
- Evidence: EVD-034
- Requirement: REQ-079
- Unit (Act): UNIT-156
- Unit (Verify): UNIT-159
- Status: completed
- Change: UPDATE
