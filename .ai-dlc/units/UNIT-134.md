# UNIT-134 — Verify: rejectExecution unit tests with mocked fetch

## Summary
Unit tests prove rejectExecution sends POST to the reject endpoint with Bearer token and surfaces ApiError.

## Description
Add tests in game/frontend/tests/executions.test.ts using a stubbed global fetch. The fixture is executionFixture from tests/fixtures/api.ts, which mirrors execution.Execution in backend/internal/execution/execution.go.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executions.test.ts` · `import block` · L2-L7
- **Do:** Add rejectExecution to the named import from '../src/api/client'.
- **Run:** `cd game/frontend && npx vitest run tests/executions.test.ts`
- **Expected:** File compiles with the new import and the existing tests still pass.

### Step 2 — `game/frontend/tests/executions.test.ts` · `new: describe('rejectExecution')` · after L42
- **Do:** Add describe('rejectExecution') with afterEach vi.unstubAllGlobals(). Test 1 stubs fetch to resolve new Response(JSON.stringify(executionFixture), {status: 200}), calls rejectExecution('tok','exec-1'), asserts the result toEqual executionFixture, fetch called once, URL '/api/v1/admin/executions/exec-1/reject', init.method 'POST' and Authorization header 'Bearer tok'. Test 2 stubs a 401 Response, awaits rejectExecution('bad','exec-1').catch(e => e), and asserts instanceof ApiError with status 401. The fixture comes from tests/fixtures/api.ts executionFixture, matching execution.Execution in backend/internal/execution/execution.go.
- **Run:** `cd game/frontend && npx vitest run tests/executions.test.ts -t rejectExecution`
- **Expected:** Both rejectExecution tests pass.

## Acceptance criteria
- Given token 'tok' and id 'exec-1', when rejectExecution runs, then fetch is called once with URL /api/v1/admin/executions/exec-1/reject, method POST and Bearer tok.
- Given a 200 response carrying executionFixture, when it resolves, then the result equals executionFixture.
- Given a 401 response, when it runs, then it rejects with ApiError status 401.

## Definition of done
- New describe block passes.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-134.md`

## Links
- Evidence: EVD-027
- Requirement: REQ-067
- Unit (Act): UNIT-133
- Unit (Verify): UNIT-134
- Status: completed
- Change: NEW
