# UNIT-098 — Verify: Admin execution routes reject missing and wrong tokens unit tests

## Summary
Server-level tests that all eight admin routes, including retry and approve, reject missing and wrong tokens.

## Description
Walk the real router and the route table to prove every admin route is protected and listed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `new: TestNew_AllAdminRoutesRejectMissingAndWrongToken` · after L286
- **Do:** Build server with token 'tok'. For each route in adminRoutes(&execution.Handler{}, &admin.RoundHandler{}) with {id} replaced by ID-1, assert 401 with no header and with 'Bearer wrong'; assert not 401 with 'Bearer tok' for POST /executions/ID-1/retry and /approve.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AllAdminRoutesRejectMissingAndWrongToken`
- **Expected:** All 8 routes yield 401 unauthenticated; retry and approve are not 401 with tok.

### Step 2 — `backend/internal/server/server_test.go` · `new: TestNew_AdminRoutesMatchTable` · after the new test
- **Do:** Type-assert New(cfg, log) to chi.Routes, chi.Walk it collecting method+route for routes starting with /api/v1/admin, and assert the set equals adminRoutes entries prefixed with /api/v1/admin.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoutesMatchTable`
- **Expected:** Walked routes equal the table; no unlisted admin route.

## Acceptance criteria
- All eight admin routes return 401 for missing and wrong tokens.
- retry and approve with 'Bearer tok' are not 401.
- Every /api/v1/admin route in the chi router is in adminRoutes.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-098.md`

## Links
- Evidence: EVD-019
- Requirement: REQ-049
- Unit (Act): UNIT-096
- Unit (Verify): UNIT-098
- Status: completed
- Change: UPDATE
