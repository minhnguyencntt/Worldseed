# UNIT-237 — Verify: Admin routes are round-only and no execution import remains unit tests

## Summary
Update server tests to the round-only route table and assert no execution import.

## Description
server_test.go imports internal/execution and calls adminRoutes; update it to adminRoundRoutes and drop execution token cases.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `import block` · L19
- **Do:** Remove the internal/execution import.
- **Run:** `cd backend && go test ./internal/server -run 'TestNew_AllAdminRoutesRejectMissingAndWrongToken|TestNew_AdminRoutesMatchTable|TestNoExecutionImports'`
- **Expected:** No execution import in tests.

### Step 2 — `backend/internal/server/server_test.go` · `TestNew_AllAdminRoutesRejectMissingAndWrongToken` · L452-L502
- **Do:** Replace adminRoutes(&execution.Handler{}, &admin.RoundHandler{}) with adminRoundRoutes(&admin.RoundHandler{}) and delete the trailing loop over the /executions/ID-1/retry and approve paths; update the doc comment to say round routes.

```
adminRoutes(&execution.Handler{}, &admin.RoundHandler{}) -> adminRoundRoutes(&admin.RoundHandler{})
```

- **Run:** `cd backend && go test ./internal/server -run 'TestNew_AllAdminRoutesRejectMissingAndWrongToken|TestNew_AdminRoutesMatchTable|TestNoExecutionImports'`
- **Expected:** Every round route returns 401 without or with a wrong token.

### Step 3 — `backend/internal/server/server_test.go` · `TestNew_AdminRoutesMatchTable` · L506-L545
- **Do:** Replace adminRoutes(&execution.Handler{}, &admin.RoundHandler{}) with adminRoundRoutes(&admin.RoundHandler{}) and rename mentions of adminRoutes to adminRoundRoutes.
- **Run:** `cd backend && go test ./internal/server -run 'TestNew_AllAdminRoutesRejectMissingAndWrongToken|TestNew_AdminRoutesMatchTable|TestNoExecutionImports'`
- **Expected:** Walked routes equal the five round routes.

### Step 4 — `backend/internal/server/removed_code_test.go` · `new: TestNoExecutionImports` · after TestExecutionPackageRemoved
- **Do:** Add TestNoExecutionImports that walks ../.. for *.go files (skipping this file) and fails if any contains "internal/execution".
- **Run:** `cd backend && go test ./internal/server -run 'TestNew_AllAdminRoutesRejectMissingAndWrongToken|TestNew_AdminRoutesMatchTable|TestNoExecutionImports'`
- **Expected:** All three tests pass.

## Acceptance criteria
- Given server.New, when walked with chi.Walk, then admin routes equal adminRoundRoutes exactly.
- Given all round admin routes, when called without or with wrong token, then 401.
- Given backend Go files, when scanned, then none import internal/execution.

## Definition of done
- Server package tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-237.md`

## Links
- Evidence: EVD-046
- Requirement: REQ-118
- Unit (Act): UNIT-234
- Unit (Verify): UNIT-237
- Status: completed
- Change: UPDATE
