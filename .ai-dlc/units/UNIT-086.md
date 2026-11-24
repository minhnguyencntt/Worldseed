# UNIT-086 — Verify: Admin round route wiring unit tests

## Summary
Server-level tests for mounted routes, auth and scheduler config

## Description
Run and extend server tests using httptest handlers and a temp repo; no live ports.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `TestNew_AdminRoundsAreMounted` · L286-L318
- **Do:** Keep the existing test unchanged; it requests POST /rounds, POST /rounds/ROUND-0000001/open and /close, GET /rounds/ROUND-0000001 and /contributions with Bearer tok and asserts status != 404.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundsAreMounted`
- **Expected:** PASS for all five subtests

### Step 2 — `backend/internal/server/server_test.go` · `new: TestNewScheduler_UsesConfig` · after L318
- **Do:** Build cfg with Round.SchedulerInterval 7s and Storage.RepoPath t.TempDir(); call NewScheduler(cfg) and assert Interval == 7*time.Second and Controller and Rounds are non-nil.
- **Run:** `cd backend && go test ./internal/server -run TestNewScheduler_UsesConfig`
- **Expected:** TestNewScheduler_UsesConfig passes

### Step 3 — `backend/internal/server/server_test.go` · `TestNew_AdminRoundsRequireToken` · L240-L277
- **Do:** Keep the existing assertions that requests without Authorization are rejected with 401, covering the round paths.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundsRequireToken`
- **Expected:** TestNew_AdminRoundsRequireToken passes

## Acceptance criteria
- Routes not 404 with token
- 401 without token
- NewScheduler uses configured interval

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-086.md`

## Links
- Evidence: EVD-016
- Requirement: REQ-043
- Unit (Act): UNIT-084
- Unit (Verify): UNIT-086
- Status: completed
- Change: UPDATE
