# UNIT-251 — Verify: ExecutionPanel and its tests are gone unit tests

## Summary
Tests prove no ExecutionPanel file or import remains and LifecycleStepper tests pass

## Description
Remove tests bound to ExecutionPanel and add a unit test asserting the component file is absent.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/actions.test.tsx` · `whole file` · whole file
- **Do:** Delete the file; it only tests ExecutionPanel with approveExecution/retryExecution

```
git rm game/frontend/tests/actions.test.tsx
```

- **Run:** `cd game/frontend && npx vitest run tests/noExecutionPanel.test.ts tests/stepper.test.tsx`
- **Expected:** File removed

### Step 2 — `game/frontend/tests/executionReject.test.tsx` · `whole file` · whole file
- **Do:** Delete the file; it only tests the ExecutionPanel Reject button

```
git rm game/frontend/tests/executionReject.test.tsx
```

- **Run:** `cd game/frontend && npx vitest run tests/noExecutionPanel.test.ts tests/stepper.test.tsx`
- **Expected:** File removed

### Step 3 — `game/frontend/tests/stepper.test.tsx` · `describe('ExecutionPanel')` · L47-L65
- **Do:** Delete the ExecutionPanel describe block, the ExecutionPanel and executionFixture imports (L3, L5) and the failedExecution constant (L15); keep the LifecycleStepper describe block and its imports

```
remove describe('ExecutionPanel', ...) and unused imports
```

- **Run:** `cd game/frontend && npx vitest run tests/noExecutionPanel.test.ts tests/stepper.test.tsx`
- **Expected:** File has only LifecycleStepper tests

### Step 4 — `game/frontend/tests/noExecutionPanel.test.ts` · `new: no ExecutionPanel file` · new
- **Do:** Add test 'ExecutionPanel.tsx is deleted' using existsSync(join(process.cwd(),'src/components/ExecutionPanel.tsx')) and expect false

```
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';
it('ExecutionPanel.tsx is deleted', () => {
  expect(existsSync(join(process.cwd(), 'src/components/ExecutionPanel.tsx'))).toBe(false);
});
```

- **Run:** `cd game/frontend && npx vitest run tests/noExecutionPanel.test.ts tests/stepper.test.tsx`
- **Expected:** Test passes

## Acceptance criteria
- Deleted test files stay deleted
- stepper.test.tsx has only LifecycleStepper tests and passes
- A new test asserts ExecutionPanel.tsx does not exist

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-251.md`

## Links
- Evidence: EVD-049
- Requirement: REQ-124
- Unit (Act): UNIT-248
- Unit (Verify): UNIT-251
- Status: completed
- Change: UPDATE
