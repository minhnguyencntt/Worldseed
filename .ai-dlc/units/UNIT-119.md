# UNIT-119 — Verify: listExecutions unit tests with mocked fetch

## Summary
Unit tests for listExecutions request and error behavior

## Description
Add game/frontend/tests/executions.test.ts testing listExecutions with a stubbed global fetch.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executions.test.ts` · `new: describe('listExecutions')` · new
- **Do:** Create the test file importing listExecutions, ApiError from ../src/api/client and executionFixture from ./fixtures/api. Add test 'sends GET with Bearer token and returns the array': vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([executionFixture]), {status:200}))), call listExecutions('tok'), assert result equals [executionFixture], URL is '/api/v1/admin/executions', and new Headers(init.headers).get('Authorization') is 'Bearer tok'. Add test 'rejects with ApiError 401': fetch returns status 401, assert rejects with ApiError and status 401. Unstub globals in afterEach.
- **Run:** `cd game/frontend && npx vitest run tests/executions.test.ts -t listExecutions`
- **Expected:** Both listExecutions tests pass

## Acceptance criteria
- Test asserts URL, Bearer header and parsed array
- Test asserts ApiError status 401 on a 401 response

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-119.md`

## Links
- Evidence: EVD-023
- Requirement: REQ-059
- Unit (Act): UNIT-117
- Unit (Verify): UNIT-119
- Status: completed
- Change: UPDATE
