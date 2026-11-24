# UNIT-253 — Verify: Client and fixtures carry no execution code unit tests

## Summary
Tests prove the client exports no execution symbols and the suite and type-check pass

## Description
Delete execution-only tests and fixtures; add a test asserting client exports.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executions.test.ts` · `whole file` · whole file
- **Do:** Delete; it tests removed client execution functions

```
git rm game/frontend/tests/executions.test.ts game/frontend/tests/adminExecution.test.tsx game/frontend/tests/adminActions.test.tsx
```

- **Run:** `cd game/frontend && npx vitest run tests/clientNoExecution.test.ts tests/deriveStage.test.ts && npm run typecheck`
- **Expected:** Three execution-only test files removed

### Step 2 — `game/frontend/tests/fixtures/api.ts` · `executionFixture, failedExecutionFixture` · L40-L53
- **Do:** Delete both exports and their comments
- **Run:** `cd game/frontend && npx vitest run tests/clientNoExecution.test.ts tests/deriveStage.test.ts && npm run typecheck`
- **Expected:** No execution fixtures

### Step 3 — `game/frontend/tests/deriveStage.test.ts` · `deriveStage tests` · L1-L25
- **Do:** Remove the executionFixture import and the 'given the execution fixture status' test (L23-L25); keep the it.each table
- **Run:** `cd game/frontend && npx vitest run tests/clientNoExecution.test.ts tests/deriveStage.test.ts && npm run typecheck`
- **Expected:** deriveStage tests still pass

### Step 4 — `game/frontend/tests/clientNoExecution.test.ts` · `new: client has no execution exports` · new
- **Do:** Add test importing * as client from '../src/api/client' and expecting Object.keys(client).filter(k => /execution/i.test(k)) toEqual([])

```
import * as client from '../src/api/client';
it('exports nothing execution-related', () => {
  expect(Object.keys(client).filter((k) => /execution/i.test(k))).toEqual([]);
});
```

- **Run:** `cd game/frontend && npx vitest run tests/clientNoExecution.test.ts tests/deriveStage.test.ts && npm run typecheck`
- **Expected:** Test passes

## Acceptance criteria
- client module has no execution exports
- deriveStage tests no longer need executionFixture
- typecheck passes

## Definition of done
- Suite and tsc green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-253.md`

## Links
- Evidence: EVD-049
- Requirement: REQ-126
- Unit (Act): UNIT-250
- Unit (Verify): UNIT-253
- Status: completed
- Change: UPDATE
