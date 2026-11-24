# UNIT-241 — Verify: Execution, approve and retry routes are absent and admin table is round-only unit tests

## Summary
Unit tests prove removed routes are unreachable

## Description
Add tests in server_test.go using New with a temp-dir config and the shared adminRoundRoutes table; no real server or network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `new: TestNew_ExecutionRoutesAbsent` · after L560
- **Do:** Build the handler as TestNew_AdminRoundsAreMounted does (same config helper, t.TempDir repo, admin token). For each of GET /api/v1/admin/executions, POST /api/v1/admin/executions/x/approve, POST /api/v1/admin/executions/x/retry, send the request with Authorization Bearer admin token via httptest.NewRecorder and assert the code is 404 or 405

```
for _, c := range []struct{m,p string}{{"GET","/api/v1/admin/executions"},{"POST","/api/v1/admin/executions/x/approve"},{"POST","/api/v1/admin/executions/x/retry"}} { ... if rec.Code != 404 && rec.Code != 405 { t.Fatalf(...) } }
```

- **Run:** `cd backend && go test ./internal/server -run TestNew_ExecutionRoutesAbsent`
- **Expected:** Test passes

### Step 2 — `backend/internal/server/server_test.go` · `TestAdminRoundRoutes_Table` · L534-L558
- **Do:** Assert len(adminRoundRoutes(&admin.RoundHandler{})) == 5 and that no Pattern contains the substring "execution"

```
if len(rts) != 5 { t.Fatalf("want 5 routes, got %d", len(rts)) }
```

- **Run:** `cd backend && go test ./internal/server -run TestAdminRoundRoutes_Table`
- **Expected:** Test passes with five routes and no execution pattern

## Acceptance criteria
- Execution/approve/retry paths with the admin token return 404 or 405
- adminRoundRoutes has exactly five round routes

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-241.md`

## Links
- Evidence: EVD-047
- Requirement: REQ-119
- Unit (Act): UNIT-238
- Unit (Verify): UNIT-241
- Status: completed
- Change: UPDATE
