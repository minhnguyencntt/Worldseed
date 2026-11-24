# UNIT-120 — Verify: Current-Round lookup unit tests with mocked fetch

## Summary
Unit tests for findExecutionForRound and getCurrentRoundExecution

## Description
Extend tests/executions.test.ts to cover the pure helper and the async lookup with a URL-routing fetch stub.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executions.test.ts` · `new: describe('findExecutionForRound')` · after the listExecutions describe
- **Do:** Add tests: (1) list [{...executionFixture,id:'a',round_id:'round-1'},{...executionFixture,id:'b',round_id:'round-2'}] with 'round-1' returns id 'a'; (2) roundId 'round-9' returns undefined; (3) two round-1 entries with updated_at '2026-01-01T00:00:10Z' and '2026-01-01T00:00:50Z' returns the later one.
- **Run:** `cd game/frontend && npx vitest run tests/executions.test.ts -t findExecutionForRound`
- **Expected:** Three helper tests pass

### Step 2 — `game/frontend/tests/executions.test.ts` · `new: describe('getCurrentRoundExecution')` · after the findExecutionForRound describe
- **Do:** Stub global fetch with a URL-routing vi.fn: '/api/v1/worlds/the-boys-room/round/current' returns roundFixture JSON, '/api/v1/admin/executions' returns [{...executionFixture,round_id:'round-2',id:'x'},{...executionFixture,id:'exec-1'}]. Assert getCurrentRoundExecution('tok') resolves to the entry with id 'exec-1' and that fetch was called with both URLs. Add a case where the list has only round-2 and assert undefined.
- **Run:** `cd game/frontend && npx vitest run tests/executions.test.ts -t getCurrentRoundExecution`
- **Expected:** Both async lookup tests pass

## Acceptance criteria
- Test asserts match by round_id, undefined when none, newest on tie
- Test asserts the async lookup uses the current round id

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-120.md`

## Links
- Evidence: EVD-023
- Requirement: REQ-060
- Unit (Act): UNIT-118
- Unit (Verify): UNIT-120
- Status: completed
- Change: UPDATE
