# UNIT-236 — Verify: internal/execution is gone unit tests

## Summary
Filesystem unit test proving the execution package is deleted.

## Description
Add a unit test that stats backend/internal/execution.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/removed_code_test.go` · `new: TestExecutionPackageRemoved` · after TestWorkerModuleRemoved
- **Do:** Add TestExecutionPackageRemoved asserting os.Stat("../execution") returns an error satisfying os.IsNotExist.

```
if _, err := os.Stat("../execution"); !os.IsNotExist(err) { t.Fatalf("execution still exists: %v", err) }
```

- **Run:** `cd backend && go test ./internal/server -run TestExecutionPackageRemoved`
- **Expected:** Test passes.

## Acceptance criteria
- Given the backend tree, when ../execution is stat'ed, then it is not found.
- Given the test, when run, then it passes without touching the network.

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-236.md`

## Links
- Evidence: EVD-046
- Requirement: REQ-117
- Unit (Act): UNIT-233
- Unit (Verify): UNIT-236
- Status: completed
- Change: UPDATE
