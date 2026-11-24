# UNIT-243 — Verify: Server package has no execution or worker references and tests stay green unit tests

## Summary
Guard tests prove removal and that remaining tests pass offline

## Description
Extend removed_code_test.go so scanning server sources also rejects execution handler identifiers, and run the package tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/removed_code_test.go` · `new: TestServerHasNoExecutionWiring` · after L76
- **Do:** Read server.go and rounds_adapter.go with os.ReadFile and assert neither contains "execution." nor "ExecutionHandler" nor "storyforge/worker"

```
for _, f := range []string{"server.go","rounds_adapter.go"} { b,_ := os.ReadFile(f); if strings.Contains(string(b), "ExecutionHandler") { t.Errorf(...) } }
```

- **Run:** `cd backend && go test ./internal/server -run 'TestServerHasNoExecutionWiring|TestNoExecutionImports|TestWorkerModuleRemoved|TestExecutionPackageRemoved'`
- **Expected:** All four guard tests pass

### Step 2 — `backend/internal/server/server_test.go` · `package server tests` · L1-L586
- **Do:** Run the full server package tests to confirm they pass with no execution test
- **Run:** `cd backend && go test ./internal/server`
- **Expected:** ok for the server package

## Acceptance criteria
- Scan fails on internal/execution, storyforge/worker or ExecutionHandler in server sources
- Package tests pass

## Definition of done
- Guards pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-243.md`

## Links
- Evidence: EVD-047
- Requirement: REQ-121
- Unit (Act): UNIT-240
- Unit (Verify): UNIT-243
- Status: completed
- Change: UPDATE
