# UNIT-097 — Verify: Admin round routes reject missing and wrong tokens unit tests

## Summary
Server-level tests for round routes with missing and wrong tokens.

## Description
Extend server_test.go with wrong-token coverage for the round routes using httptest and a temp dir.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `new: TestNew_AdminRoundRoutesRejectMissingAndWrongToken` · after L286
- **Do:** Build the server as in TestNew_AdminRoundsRequireToken (token 'tok', t.TempDir repo). Iterate adminRoundRoutes(&admin.RoundHandler{}) replacing {id} with ROUND-0000001; for each, request with no Authorization header and with 'Bearer wrong'; assert rec.Code == 401. Import the admin package.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundRoutesRejectMissingAndWrongToken`
- **Expected:** Test passes with 5 routes x 2 cases all 401.

### Step 2 — `backend/internal/server/server_test.go` · `new: TestAdminRoundRoutes_Table` · after the new test
- **Do:** Assert adminRoundRoutes returns exactly the five method+pattern pairs: POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id}, GET /rounds/{id}/contributions.
- **Run:** `cd backend && go test ./internal/server -run TestAdminRoundRoutes_Table`
- **Expected:** Table matches the five pairs.

## Acceptance criteria
- Round routes return 401 without a token.
- Round routes return 401 with 'Bearer wrong'.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-097.md`

## Links
- Evidence: EVD-019
- Requirement: REQ-048
- Unit (Act): UNIT-095
- Unit (Verify): UNIT-097
- Status: completed
- Change: UPDATE
